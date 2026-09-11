import { PatientCase, ClaimValidationReport, ClinicalCheckItem } from "./types";
import { icd10Catalog, fornasMedicines } from "./clinical-database";

export function validateBpjsClaim(patientCase: PatientCase): ClaimValidationReport {
  const checks: ClinicalCheckItem[] = [];
  const auditFlags: string[] = [];
  const recommendedFixes: string[] = [];

  let score = 100;

  // 1. Validasi Kode Diagnosa ICD-10
  const icdInfo = icd10Catalog.find(i => i.code === patientCase.primaryIcd);
  if (icdInfo) {
    checks.push({
      id: "icd_valid",
      name: "Validitas Kode ICD-10 Primer",
      category: "Diagnosa",
      passed: true,
      message: `Kode ${icdInfo.code} valid terdaftar sebagai ${icdInfo.name} (${icdInfo.chapter}).`,
      severity: "PASS"
    });
  } else {
    score -= 40;
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
  for (const prescribed of patientCase.medications) {
    const medInfo = fornasMedicines.find(m => m.id === prescribed.medicineId || m.name.toLowerCase().includes(prescribed.name.toLowerCase()));

    if (!medInfo) {
      score -= 20;
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

    // Cek Level Faskes (FKTP vs FKRTL)
    if (medInfo.fornasLevel === "FKRTL") {
      score -= 35;
      checks.push({
        id: `med_tier_${prescribed.medicineId}`,
        name: `Restriksi Faskes Obat: ${medInfo.name}`,
        category: "Kelayakan FKTP",
        passed: false,
        message: `PELANGGARAN FORNAS: '${medInfo.name}' adalah obat restriksi Rumah Sakit / FKRTL. Klaim faskes primer berisiko DISPUTE atau DITOLAK.`,
        severity: "CRITICAL"
      });
      auditFlags.push(`Resep obat FKRTL (${medInfo.name}) di FKTP tanpa surat rujukan.`);
      recommendedFixes.push(`Rujuk pasien ke FKRTL jika butuh '${medInfo.name}', atau substitusi dengan obat antibiotik lini pertama FKTP (misal Amoxicillin).`);
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
      checks.push({
        id: `med_incompatible_${prescribed.medicineId}`,
        name: `Indikasi Klinis Diagnosa vs Obat (${medInfo.name})`,
        category: "Diagnosa",
        passed: false,
        message: `Obat '${medInfo.name}' tidak lazim untuk diagnosa primer '${icdInfo.name}' tanpa diagnosa sekunder komorbid.`,
        severity: "CRITICAL"
      });
      auditFlags.push(`Mismatch klinis: ${icdInfo.code} dengan terapi ${medInfo.name}.`);
      recommendedFixes.push(`Tambahkan diagnosa sekunder pendukung jika pasien memiliki penyakit penyerta, atau hapus resep '${medInfo.name}'.`);
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
    primaryDiagnosis: icdInfo ? `${icdInfo.code} - ${icdInfo.name}` : patientCase.primaryIcd,
    score: finalScore,
    status,
    checks,
    auditFlags,
    recommendedFixes,
    estimatedClaimAmount: patientCase.claimAmount
  };
}
