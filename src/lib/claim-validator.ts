import {
  PatientCase,
  ClaimValidationReport,
  ClinicalCheckItem,
  BatchAuditReport,
  IssueBreakdown,
  IssueCategoryKey
} from "./types";
import { icd10Catalog, fornasMedicines } from "./clinical-database";

export function validateBpjsClaim(
  patientCase: PatientCase,
  referenceDate?: string
): ClaimValidationReport {
  const checks: ClinicalCheckItem[] = [];
  const auditFlags: string[] = [];
  const recommendedFixes: string[] = [];
  const issueCategoriesSet = new Set<IssueCategoryKey>();

  let score = 100;

  // 1. Validasi Kode Diagnosa ICD-10 & Kelayakan Kompetensi FKTP
  const icdInfo = icd10Catalog.find(i => i.code === patientCase.primaryIcd);
  if (icdInfo) {
    if (icdInfo.isFktpCompetent) {
      checks.push({
        id: "icd_valid",
        name: "Validitas Kode ICD-10 Primer",
        category: "Diagnosa",
        passed: true,
        message: `Kode ${icdInfo.code} valid terdaftar sebagai ${icdInfo.name} (${icdInfo.chapter}). Termasuk 144 SKDI 4A kompetensi FKTP.`,
        severity: "PASS"
      });
    } else {
      score -= 55;
      issueCategoriesSet.add("nonFktpDiagnosis");
      checks.push({
        id: "icd_non_fktp",
        name: "Kelayakan Kompetensi Faskes Primer",
        category: "Kelayakan FKTP",
        passed: false,
        message: `PERINGATAN NON-KOMPETENSI: Diagnosis '${icdInfo.code} - ${icdInfo.name}' bukan wewenang tuntas FKTP (harus dirujuk ke FKRTL). Potensi klaim ditolak verifikator BPJS.`,
        severity: "CRITICAL"
      });
      auditFlags.push(`Diagnosa non-kompetensi FKTP (${icdInfo.code}). Wajib surat rujukan FKRTL.`);
      recommendedFixes.push("Rujuk pasien ke Rumah Sakit / FKRTL atau perbaiki diagnosis jika ada indikasi primer faskes 1.");
    }
  } else {
    score -= 55;
    issueCategoriesSet.add("nonFktpDiagnosis");
    checks.push({
      id: "icd_valid",
      name: "Validitas Kode ICD-10 Primer",
      category: "Diagnosa",
      passed: false,
      message: `Kode diagnosa '${patientCase.primaryIcd}' tidak ditemukan dalam katalog 144 Penyakit FKTP BPJS.`,
      severity: "CRITICAL"
    });
    auditFlags.push("Kode ICD-10 tidak valid di tingkat Faskes Primer (FKTP).");
    recommendedFixes.push("Koreksi kode ICD-10 menggunakan standar 144 diagnosis kompetensi dokter umum FKTP.");
  }

  // 2. Evaluasi Peresepan Obat terhadap Fornas FKTP
  const medClassOccurrences: Record<string, string[]> = {};

  for (const prescribed of patientCase.medications) {
    const medInfo = fornasMedicines.find(
      m => m.id === prescribed.medicineId || m.name.toLowerCase().includes(prescribed.name.toLowerCase())
    );

    if (!medInfo) {
      score -= 20;
      issueCategoriesSet.add("fornasViolations");
      checks.push({
        id: `med_unknown_${prescribed.medicineId}`,
        name: `Katalog Fornas: ${prescribed.name}`,
        category: "Obat Fornas",
        passed: false,
        message: `Obat '${prescribed.name}' tidak tercantum dalam Formularium Nasional BPJS.`,
        severity: "WARNING"
      });
      auditFlags.push(`Obat non-Fornas berpotensi tidak ditanggung klaim BPJS (${prescribed.name}).`);
      recommendedFixes.push(`Ganti '${prescribed.name}' dengan padanan generik resmi Fornas FKTP.`);
      continue;
    }

    // Catat kelas farmakologi untuk evaluasi duplikasi terapi
    const pharmClass = medInfo.pharmacologyClass || medInfo.category;
    if (!medClassOccurrences[pharmClass]) {
      medClassOccurrences[pharmClass] = [];
    }
    medClassOccurrences[pharmClass].push(medInfo.name);

    // Cek Level Faskes (FKTP vs FKRTL)
    if (medInfo.fornasLevel === "FKRTL") {
      score -= 35;
      issueCategoriesSet.add("fornasViolations");
      checks.push({
        id: `med_tier_${prescribed.medicineId}`,
        name: `Restriksi Faskes Obat: ${medInfo.name}`,
        category: "Kelayakan FKTP",
        passed: false,
        message: `PELANGGARAN FORNAS: '${medInfo.name}' adalah obat restriksi Rumah Sakit / FKRTL. Klaim faskes primer berisiko DISPUTE atau DITOLAK.`,
        severity: "CRITICAL"
      });
      auditFlags.push(`Resep obat FKRTL (${medInfo.name}) di FKTP tanpa surat rujukan.`);
      recommendedFixes.push(`Rujuk pasien ke FKRTL jika butuh '${medInfo.name}', atau substitusi dengan obat antibiotik/lini pertama FKTP.`);
    } else {
      checks.push({
        id: `med_tier_${prescribed.medicineId}`,
        name: `Kepatuhan Fornas FKTP: ${medInfo.name}`,
        category: "Obat Fornas",
        passed: true,
        message: `Obat sesuai peruntukan Faskes Tingkat 1 (${medInfo.genericName}).`,
        severity: "PASS"
      });
    }

    // Cek Batasan Durasi Hari (Days Supply)
    if (prescribed.days > medInfo.maxDaysSupply) {
      score -= 15;
      issueCategoriesSet.add("fornasViolations");
      checks.push({
        id: `med_days_${prescribed.medicineId}`,
        name: `Durasi Peresepan (${medInfo.name})`,
        category: "Restriksi BPJS",
        passed: false,
        message: `Jumlah hari (${prescribed.days} hari) melebihi batas Fornas (${medInfo.maxDaysSupply} hari). Catatan: ${medInfo.restrictionNote}`,
        severity: "WARNING"
      });
      auditFlags.push(`Peresepan ${medInfo.name} melebihi batas maksimal Fornas.`);
      recommendedFixes.push(`Kurangi jumlah hari peresepan menjadi maksimal ${medInfo.maxDaysSupply} hari.`);
    }

    // Cek Kesesuaian Indikasi Medis (ICD-10 vs Obat)
    if (icdInfo && icdInfo.incompatibleMeds.includes(medInfo.id)) {
      score -= 25;
      issueCategoriesSet.add("fornasViolations");
      checks.push({
        id: `med_incompatible_${prescribed.medicineId}`,
        name: `Indikasi Klinis Diagnosa vs Obat (${medInfo.name})`,
        category: "Diagnosa",
        passed: false,
        message: `Obat '${medInfo.name}' tidak lazim untuk diagnosa primer '${icdInfo.name}' tanpa diagnosa sekunder komorbid.`,
        severity: "CRITICAL"
      });
      auditFlags.push(`Mismatch klinis: ${icdInfo.code} dengan terapi ${medInfo.name}.`);
      recommendedFixes.push(`Tambahkan diagnosa sekunder pendukung jika pasien memiliki komorbid, atau hapus resep '${medInfo.name}'.`);
    }
  }

  // 3. Evaluasi Polifarmasi Tidak Rasional
  if (patientCase.medications.length >= 5) {
    score -= 25;
    issueCategoriesSet.add("irrationalPolypharmacy");
    checks.push({
      id: "polypharmacy_excess",
      name: "Rasionalitas Peresepan (Polifarmasi)",
      category: "Polifarmasi",
      passed: false,
      message: `PERINGATAN POLIFARMASI: Pasien diresepkan ${patientCase.medications.length} jenis obat sekaligus pada rawat jalan faskes 1 tanpa komorbid berat.`,
      severity: "WARNING"
    });
    auditFlags.push(`Polifarmasi ${patientCase.medications.length} obat rawat jalan faskes primer.`);
    recommendedFixes.push("Tinjau ulang polifarmasi: batasi resep hanya untuk obat esensial gejala utama.");
  }

  // Cek duplikasi terapi golongan yang sama (e.g. 2 NSAID atau 2 Antibiotik)
  for (const [pClass, meds] of Object.entries(medClassOccurrences)) {
    if (meds.length > 1 && pClass !== "Analgesic-Antipyretic") {
      score -= 20;
      issueCategoriesSet.add("irrationalPolypharmacy");
      checks.push({
        id: `polypharmacy_duplicate_${pClass}`,
        name: `Duplikasi Golongan Farmakologi (${pClass})`,
        category: "Polifarmasi",
        passed: false,
        message: `DUPLIKASI TERAPI: Ditemukan peresepan ganda pada kelas '${pClass}': ${meds.join(", ")}. Berisiko adverse effect dan dispute BPJS.`,
        severity: "CRITICAL"
      });
      auditFlags.push(`Duplikasi golongan obat: ${meds.join(" + ")}.`);
      recommendedFixes.push(`Pilih salah satu obat dari kelas '${pClass}' untuk mencegah efek samping ganda.`);
    }
  }

  // 4. Validasi Kesesuaian SEP (Surat Eligibilitas Peserta) & Kelengkapan Berkas
  const sep = patientCase.sepNumber?.trim();
  if (!sep) {
    score -= 30;
    issueCategoriesSet.add("sepMismatch");
    checks.push({
      id: "sep_missing",
      name: "Nomor SEP Faskes",
      category: "Kesesuaian SEP",
      passed: false,
      message: "Nomor SEP (Surat Eligibilitas Peserta) tidak terisi. Berkas klaim wajib memiliki nomor SEP resmi.",
      severity: "CRITICAL"
    });
    auditFlags.push("Nomor SEP kosong.");
    recommendedFixes.push("Terbitkan atau input nomor SEP valid dari V-Claim BPJS.");
  } else if (sep.startsWith("INVALID") || sep.length < 10) {
    score -= 25;
    issueCategoriesSet.add("sepMismatch");
    checks.push({
      id: "sep_invalid_format",
      name: "Format Penomoran SEP",
      category: "Kesesuaian SEP",
      passed: false,
      message: `Format nomor SEP '${sep}' tidak sesuai standar 19 digit BPJS Kesehatan.`,
      severity: "CRITICAL"
    });
    auditFlags.push(`Format nomor SEP '${sep}' tidak standar.`);
    recommendedFixes.push("Sinkronkan nomor SEP langsung dengan sistem bridging BPJS.");
  }

  if (patientCase.sepDate && patientCase.serviceDate && patientCase.sepDate !== patientCase.serviceDate) {
    score -= 20;
    issueCategoriesSet.add("sepMismatch");
    checks.push({
      id: "sep_date_mismatch",
      name: "Kesesuaian Tanggal SEP vs Pelayanan",
      category: "Kesesuaian SEP",
      passed: false,
      message: `Tanggal SEP (${patientCase.sepDate}) tidak sama dengan tanggal pelayanan (${patientCase.serviceDate}). Berisiko klaim pending/dispute tanggal.`,
      severity: "WARNING"
    });
    auditFlags.push("Mismatch tanggal penerbitan SEP vs tanggal tindakan.");
    recommendedFixes.push("Sesuaikan tanggal pelayanan di SIMKlinik agar sinkron dengan tanggal penerbitan SEP.");
  }

  if (patientCase.claimAmount > 200_000 && (!patientCase.procedures || patientCase.procedures.length === 0)) {
    score -= 20;
    issueCategoriesSet.add("sepMismatch");
    checks.push({
      id: "procedure_missing_high_claim",
      name: "Bukti Tindakan & Pemeriksaan Penunjang",
      category: "Kesesuaian SEP",
      passed: false,
      message: `Klaim bernilai Rp ${patientCase.claimAmount.toLocaleString("id-ID")} tidak memiliki lampiran tindakan atau pemeriksaan penunjang.`,
      severity: "WARNING"
    });
    auditFlags.push("Tindakan medis kosong pada klaim melebihi tarif dasar.");
    recommendedFixes.push("Lampirkan rincian tindakan medis atau pemeriksaan fisik penunjang yang dilakukan.");
  }

  // Cek Batas Waktu Pengajuan Klaim SEP (Maksimal 15 Hari Kalender sejak pelayanan)
  const auditDateStr =
    referenceDate ||
    (typeof window !== "undefined"
      ? new Date().toISOString().split("T")[0]
      : "2026-09-12");

  if (patientCase.serviceDate) {
    const serviceTime = new Date(patientCase.serviceDate).getTime();
    const auditTime = new Date(auditDateStr).getTime();
    if (!isNaN(serviceTime) && !isNaN(auditTime)) {
      const diffDays = Math.floor((auditTime - serviceTime) / (1000 * 60 * 60 * 24));
      if (diffDays > 15) {
        score -= 35;
        issueCategoriesSet.add("sepMismatch");
        checks.push({
          id: "sep_expired_15_days",
          name: "Batas Waktu Pengajuan SEP (Maks 15 Hari Kalender)",
          category: "Kesesuaian SEP",
          passed: false,
          message: `KADALUWARSA PENGAJUAN KLAIM (>15 HARI): Tanggal pelayanan (${patientCase.serviceDate}) telah melewati batas 15 hari kalender VClaim BPJS (selisih ${diffDays} hari dari tanggal audit ${auditDateStr}). Berkas berisiko DISPUTE KADALUWARSA atau DITOLAK.`,
          severity: "CRITICAL"
        });
        auditFlags.push(`Klaim kadaluwarsa >15 hari (${diffDays} hari sejak pelayanan).`);
        recommendedFixes.push(
          "Ajukan surat permohonan dispensasi pembukaan kunci SEP kolektif ke verifikator BPJS Kesehatan KC setempat atau lakukan rekonsiliasi klaim susulan."
        );
      } else {
        checks.push({
          id: "sep_submission_deadline",
          name: "Batas Waktu Pengajuan SEP (Maks 15 Hari Kalender)",
          category: "Kesesuaian SEP",
          passed: true,
          message: `Tanggal pelayanan masih dalam batas aman pengajuan klaim (${Math.max(0, diffDays)} hari dari tanggal audit).`,
          severity: "PASS"
        });
      }
    }
  }

  // Tentukan Status Kelayakan Klaim
  const finalScore = Math.max(0, score);
  let status: "LAYAK_CAIR" | "RISIKO_DISPUTE" | "POTENSI_DITOLAK" = "LAYAK_CAIR";

  if (finalScore >= 80 && !checks.some(c => c.severity === "CRITICAL")) {
    status = "LAYAK_CAIR";
  } else if (finalScore >= 50) {
    status = "RISIKO_DISPUTE";
  } else {
    status = "POTENSI_DITOLAK";
  }

  return {
    caseId: patientCase.id,
    patientName: patientCase.patientName,
    bpjsNumber: patientCase.bpjsNumber,
    sepNumber: patientCase.sepNumber || "-",
    primaryDiagnosis: icdInfo ? `${icdInfo.code} - ${icdInfo.name}` : patientCase.primaryIcd,
    score: finalScore,
    status,
    checks,
    auditFlags,
    recommendedFixes,
    estimatedClaimAmount: patientCase.claimAmount,
    issueCategories: Array.from(issueCategoriesSet)
  };
}

export function auditBatchClaims(cases: PatientCase[], referenceDate?: string): BatchAuditReport {
  const claimReports = cases.map(c => validateBpjsClaim(c, referenceDate));

  let layakCairCount = 0;
  let layakCairAmount = 0;
  let risikoDisputeCount = 0;
  let risikoDisputeAmount = 0;
  let potensiDitolakCount = 0;
  let potensiDitolakAmount = 0;
  let totalClaimAmount = 0;

  // Issue categorisation accumulators
  let nonFktpCount = 0;
  let nonFktpAmount = 0;
  let fornasCount = 0;
  let fornasAmount = 0;
  let polyCount = 0;
  let polyAmount = 0;
  let sepCount = 0;
  let sepAmount = 0;

  for (const report of claimReports) {
    totalClaimAmount += report.estimatedClaimAmount;

    if (report.status === "LAYAK_CAIR") {
      layakCairCount += 1;
      layakCairAmount += report.estimatedClaimAmount;
    } else if (report.status === "RISIKO_DISPUTE") {
      risikoDisputeCount += 1;
      risikoDisputeAmount += report.estimatedClaimAmount;
    } else {
      potensiDitolakCount += 1;
      potensiDitolakAmount += report.estimatedClaimAmount;
    }

    if (report.issueCategories.includes("nonFktpDiagnosis")) {
      nonFktpCount += 1;
      nonFktpAmount += report.estimatedClaimAmount;
    }
    if (report.issueCategories.includes("fornasViolations")) {
      fornasCount += 1;
      fornasAmount += report.estimatedClaimAmount;
    }
    if (report.issueCategories.includes("irrationalPolypharmacy")) {
      polyCount += 1;
      polyAmount += report.estimatedClaimAmount;
    }
    if (report.issueCategories.includes("sepMismatch")) {
      sepCount += 1;
      sepAmount += report.estimatedClaimAmount;
    }
  }

  const totalClaimsCount = cases.length;
  const safeTotal = totalClaimsCount > 0 ? totalClaimsCount : 1;

  const issueBreakdown: IssueBreakdown = {
    nonFktpDiagnosis: {
      issueKey: "nonFktpDiagnosis",
      title: "Diagnosa Non-Kompetensi FKTP",
      description: "Diagnosis di luar 144 SKDI 4A atau kasus spesialistik yang wajib dirujuk ke Rumah Sakit.",
      count: nonFktpCount,
      totalAmount: nonFktpAmount,
      percentage: Number(((nonFktpCount / safeTotal) * 100).toFixed(1)),
      recommendation: "Koreksi kode ICD-10 menjadi diagnosa primer kompetensi dokter umum atau lengkapi surat rujukan FKRTL."
    },
    fornasViolations: {
      issueKey: "fornasViolations",
      title: "Pelanggaran Fornas (Obat & Kuota Hari)",
      description: "Resep obat restriksi FKRTL (RS), melebihi batas maksimal hari supply, atau indikasi obat tidak cocok dengan ICD.",
      count: fornasCount,
      totalAmount: fornasAmount,
      percentage: Number(((fornasCount / safeTotal) * 100).toFixed(1)),
      recommendation: "Substitusi obat restriksi FKRTL dengan obat Fornas FKTP dan pangkas durasi hari resep sesuai plafon."
    },
    irrationalPolypharmacy: {
      issueKey: "irrationalPolypharmacy",
      title: "Polifarmasi Tidak Rasional",
      description: "Peresepan >= 5 macam obat rawat jalan faskes 1 atau duplikasi golongan farmakologi identik (misal dobel NSAID).",
      count: polyCount,
      totalAmount: polyAmount,
      percentage: Number(((polyCount / safeTotal) * 100).toFixed(1)),
      recommendation: "Rasionalisasi resep: eliminasi obat simptomatik berlebih dan pilih satu analgesik/antibiotik tunggal."
    },
    sepMismatch: {
      issueKey: "sepMismatch",
      title: "Ketidaksesuaian SEP & Administrasi",
      description: "Nomor SEP kosong/format salah, mismatch tanggal SEP vs tanggal pelayanan, atau klaim tinggi tanpa bukti tindakan.",
      count: sepCount,
      totalAmount: sepAmount,
      percentage: Number(((sepCount / safeTotal) * 100).toFixed(1)),
      recommendation: "Sinkronkan ulang nomor dan tanggal SEP melalui bridging V-Claim serta lampirkan rincian tindakan medis."
    }
  };

  const totalDisputeRiskAmount = risikoDisputeAmount + potensiDitolakAmount;

  return {
    totalClaimsCount,
    totalClaimAmount,
    layakCairCount,
    layakCairAmount,
    risikoDisputeCount,
    risikoDisputeAmount,
    potensiDitolakCount,
    potensiDitolakAmount,
    passRatio: {
      layakCairPct: Number(((layakCairCount / safeTotal) * 100).toFixed(1)),
      risikoDisputePct: Number(((risikoDisputeCount / safeTotal) * 100).toFixed(1)),
      potensiDitolakPct: Number(((potensiDitolakCount / safeTotal) * 100).toFixed(1))
    },
    totalDisputeRiskAmount,
    issueBreakdown,
    claimReports
  };
}

export function generateAuditCsv(report: BatchAuditReport): string {
  const headers = [
    "No",
    "ID Kasus",
    "No Pasien",
    "Nama Pasien",
    "No Kartu BPJS",
    "No SEP",
    "Diagnosa Primer",
    "Skor Kepatuhan",
    "Status Kelayakan",
    "Nilai Klaim (Rp)",
    "Jumlah Isu",
    "Kategori Isu",
    "Rekomendasi Perbaikan"
  ];

  const rows = report.claimReports.map((c, idx) => {
    const issues = c.issueCategories.join("; ");
    const fixes = c.recommendedFixes.join(" | ");
    return [
      idx + 1,
      `"${c.caseId}"`,
      `"${c.caseId}"`,
      `"${c.patientName.replace(/"/g, '""')}"`,
      `"${c.bpjsNumber}"`,
      `"${c.sepNumber || "-"}"`,
      `"${c.primaryDiagnosis.replace(/"/g, '""')}"`,
      c.score,
      `"${c.status}"`,
      c.estimatedClaimAmount,
      c.auditFlags.length,
      `"${issues}"`,
      `"${fixes.replace(/"/g, '""')}"`
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
