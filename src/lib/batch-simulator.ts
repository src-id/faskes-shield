import { PatientCase } from "./types";

export const simulated50BatchCases: PatientCase[] = [
  // 1-10: Kasus Terstandar / Mayoritas Layak Cair (Hipertensi, ISPA, Gastritis, DM2, Diare)
  {
    id: "batch-01",
    patientNo: "RM-2026-0001",
    patientName: "Bpk. Bambang Sutrisno",
    age: 54,
    gender: "L",
    bpjsNumber: "0001293847102",
    sepNumber: "0115R0010926V00001",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol tensi rutin, kepala agak tegang, riwayat HT teratur kontrol.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1 pagi" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1 k/p" }
    ],
    procedures: ["Pemeriksaan Tanda Vital", "Edukasi Gaya Hidup"],
    claimAmount: 185_000
  },
  {
    id: "batch-02",
    patientNo: "RM-2026-0002",
    patientName: "Ibu Siti Aminah",
    age: 29,
    gender: "P",
    bpjsNumber: "0002384910293",
    sepNumber: "0115R0010926V00002",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Batuk pilek lendir encer 3 hari, demam sumeng.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1 habiskan" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1 jika demam" }
    ],
    procedures: ["Pemeriksaan Fisik Dokter Umum"],
    claimAmount: 150_000
  },
  {
    id: "batch-03",
    patientNo: "RM-2026-0003",
    patientName: "Bpk. Hendra Gunawan",
    age: 48,
    gender: "L",
    bpjsNumber: "0003495820194",
    sepNumber: "0115R0010926V00003",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Perih lambung setelah telat makan, mual dan begah.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1 kunyah ac" },
      { medicineId: "MED-07", name: "Omeprazole 20mg Kapsul", quantity: 7, days: 7, signa: "1x1 pagi ac" }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 165_000
  },
  {
    id: "batch-04",
    patientNo: "RM-2026-0004",
    patientName: "Ibu Ratna Juwita",
    age: 51,
    gender: "P",
    bpjsNumber: "0004506931205",
    sepNumber: "0115R0010926V00004",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol gula darah bulanan pasien PRB aktif, kondisi stabil.",
    primaryIcd: "E11.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-05", name: "Metformin 500mg Tablet", quantity: 60, days: 30, signa: "2x1 dc" }
    ],
    procedures: ["Cek GDS Strip", "Pemeriksaan Tekanan Darah"],
    claimAmount: 195_000
  },
  {
    id: "batch-05",
    patientNo: "RM-2026-0005",
    patientName: "Bpk. Ahmad Fauzi",
    age: 38,
    gender: "L",
    bpjsNumber: "0005617042316",
    sepNumber: "0115R0010926V00005",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "BAB cair 4 kali sejak kemarin malam, tidak ada lendir darah.",
    primaryIcd: "A09",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 10, days: 3, signa: "3x1 ac" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1 k/p" }
    ],
    procedures: ["Edukasi Rehidrasi Oralit"],
    claimAmount: 140_000
  },
  {
    id: "batch-06",
    patientNo: "RM-2026-0006",
    patientName: "Ibu Nurul Hidayah",
    age: 24,
    gender: "P",
    bpjsNumber: "0006728153427",
    sepNumber: "0115R0010926V00006",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Gatal kemerahan di lipatan siku dan leher setelah kena debu.",
    primaryIcd: "L20.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-13", name: "Cetirizine 10mg Tablet", quantity: 5, days: 5, signa: "1x1 malam" }
    ],
    procedures: ["Pemeriksaan Kulit"],
    claimAmount: 135_000
  },
  {
    id: "batch-07",
    patientNo: "RM-2026-0007",
    patientName: "Bpk. Slamet Riyadi",
    age: 42,
    gender: "L",
    bpjsNumber: "0007839264538",
    sepNumber: "0115R0010926V00007",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Sakit gigi geraham bawah berdenyut, gusi sedikit bengkak.",
    primaryIcd: "K02.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-10", name: "Asam Mefenamat 500mg Tablet", quantity: 10, days: 3, signa: "3x1 pc" }
    ],
    procedures: ["Pemeriksaan Gigi dan Mulut"],
    claimAmount: 160_000
  },
  {
    id: "batch-08",
    patientNo: "RM-2026-0008",
    patientName: "Ibu Sri Wahyuni",
    age: 58,
    gender: "P",
    bpjsNumber: "0008940375649",
    sepNumber: "0115R0010926V00008",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol rutin tekanan darah tinggi tensi 145/90 mmHg.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-04", name: "Captopril 25mg Tablet", quantity: 60, days: 30, signa: "2x1 tab 1 jam ac" }
    ],
    procedures: ["Pemeriksaan Tanda Vital"],
    claimAmount: 175_000
  },
  {
    id: "batch-09",
    patientNo: "RM-2026-0009",
    patientName: "Bpk. Joko Prasetyo",
    age: 33,
    gender: "L",
    bpjsNumber: "0009051486750",
    sepNumber: "0115R0010926V00009",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Batuk berdahak sudah 3 hari, pilek, badan pegal.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik Dokter"],
    claimAmount: 150_000
  },
  {
    id: "batch-10",
    patientNo: "RM-2026-0010",
    patientName: "Ibu Endang Sulastri",
    age: 46,
    gender: "P",
    bpjsNumber: "0000162597861",
    sepNumber: "0115R0010926V00010",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kembung, mual, ulu hati panas terutama malam hari.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1 kunyah ac" }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 145_000
  },

  // 11-18: KELOMPOK ISU 1: Diagnosa Non-Kompetensi FKTP (Perlu Rujukan Spesialis / Bukan 144 SKDI 4A)
  {
    id: "batch-11",
    patientNo: "RM-2026-0011",
    patientName: "Bpk. Sukirman Wiryo",
    age: 63,
    gender: "L",
    bpjsNumber: "0001273608972",
    sepNumber: "0115R0010926V00011",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Bicara pelo tiba-tiba, kelemahan anggota gerak kanan sejak pagi.",
    primaryIcd: "I64", // Stroke Akut (Non-Kompetensi FKTP)
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 10, days: 10, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Neurologis Singkat"],
    claimAmount: 380_000
  },
  {
    id: "batch-12",
    patientNo: "RM-2026-0012",
    patientName: "Ibu Kartini Wulandari",
    age: 67,
    gender: "P",
    bpjsNumber: "0002384719083",
    sepNumber: "0115R0010926V00012",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Pandangan kedua mata buram berasap perlahan sudah 6 bulan.",
    primaryIcd: "H25.9", // Katarak Senilis (Non-Kompetensi FKTP)
    secondaryIcd: [],
    medications: [],
    procedures: ["Pemeriksaan Visus Mata"],
    claimAmount: 220_000
  },
  {
    id: "batch-13",
    patientNo: "RM-2026-0013",
    patientName: "Ibu Dian Sastro",
    age: 36,
    gender: "P",
    bpjsNumber: "0003495820194",
    sepNumber: "0115R0010926V00013",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Nyeri panggul bawah kiri kronis, haid tidak teratur.",
    primaryIcd: "N83.2", // Kista Ovarium (Non-Kompetensi FKTP)
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Palpasi Pelvik"],
    claimAmount: 260_000
  },
  {
    id: "batch-14",
    patientNo: "RM-2026-0014",
    patientName: "Bpk. Mulyono Harjo",
    age: 55,
    gender: "L",
    bpjsNumber: "0004506931205",
    sepNumber: "0115R0010926V00014",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Benjolan di selangkangan kanan saat mengejan atau angkat berat.",
    primaryIcd: "K40.9", // Hernia Inguinalis (Non-Kompetensi FKTP)
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik Bedah"],
    claimAmount: 290_000
  },
  {
    id: "batch-15",
    patientNo: "RM-2026-0015",
    patientName: "Bpk. Danang Kusuma",
    age: 49,
    gender: "L",
    bpjsNumber: "0005617042316",
    sepNumber: "0115R0010926V00015",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Nyeri dada menjalar ke lengan kiri, riwayat PJK lama.",
    primaryIcd: "I20.9", // Angina Pektoris tidak terdaftar di katalog FKTP
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik"],
    claimAmount: 310_000
  },

  // 16-25: KELOMPOK ISU 2: Pelanggaran Fornas (Resep FKRTL / Melebihi Kuota Hari / Indikasi Mismatch)
  {
    id: "batch-16",
    patientNo: "RM-2026-0016",
    patientName: "Ibu Maya Estianty",
    age: 31,
    gender: "P",
    bpjsNumber: "0006728153427",
    sepNumber: "0115R0010926V00016",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Radang tenggorokan hebat, batuk pilek 4 hari minta antibiotik paten.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-09", name: "Cefixime 100mg Kapsul", quantity: 10, days: 5, signa: "2x1" }, // FKRTL
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik Dasar"],
    claimAmount: 275_000
  },
  {
    id: "batch-17",
    patientNo: "RM-2026-0017",
    patientName: "Bpk. Rahmat Basuki",
    age: 62,
    gender: "L",
    bpjsNumber: "0007839264538",
    sepNumber: "0115R0010926V00017",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol tensi minta obat pengencer darah jantung.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" },
      { medicineId: "MED-12", name: "Clopidogrel 75mg Tablet", quantity: 30, days: 30, signa: "1x1" } // FKRTL
    ],
    procedures: ["Pemeriksaan Tekanan Darah"],
    claimAmount: 395_000
  },
  {
    id: "batch-18",
    patientNo: "RM-2026-0018",
    patientName: "Anak Kevin Pratama",
    age: 8,
    gender: "L",
    bpjsNumber: "0008940375649",
    sepNumber: "0115R0010926V00018",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Batuk pilek demam, minta persediaan antibiotik 2 minggu.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 42, days: 14, signa: "3x1" }, // Melebihi kuota 5 hari
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 20, days: 7, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik Anak"],
    claimAmount: 210_000
  },
  {
    id: "batch-19",
    patientNo: "RM-2026-0019",
    patientName: "Ibu Titik Sandhora",
    age: 50,
    gender: "P",
    bpjsNumber: "0009051486750",
    sepNumber: "0115R0010926V00019",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Perih ulu hati parah minta omeprazole sebulan penuh.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-07", name: "Omeprazole 20mg Kapsul", quantity: 30, days: 30, signa: "1x1" }, // Max 7 hari
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 30, days: 10, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 240_000
  },
  {
    id: "batch-20",
    patientNo: "RM-2026-0020",
    patientName: "Bpk. Gatot Subroto",
    age: 44,
    gender: "L",
    bpjsNumber: "0000162597861",
    sepNumber: "0115R0010926V00020",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Sakit lambung tapi diresepkan obat antidiabetes tanpa riwayat DM.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 10, days: 10, signa: "1x1" } // Mismatch indikasi
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 190_000
  },

  // 21-28: KELOMPOK ISU 3: Polifarmasi Tidak Rasional (>4 obat atau Duplikasi Golongan Sama)
  {
    id: "batch-21",
    patientNo: "RM-2026-0021",
    patientName: "Ibu Wati Hartati",
    age: 52,
    gender: "P",
    bpjsNumber: "0001273608972",
    sepNumber: "0115R0010926V00021",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Keluhan campur: pusing, batuk, lambung perih, badan linu, gatal.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" },
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-08", name: "Salbutamol 2mg Tablet", quantity: 10, days: 5, signa: "2x1" },
      { medicineId: "MED-13", name: "Cetirizine 10mg Tablet", quantity: 5, days: 5, signa: "1x1" },
      { medicineId: "MED-14", name: "Dexamethasone 0.5mg Tablet", quantity: 10, days: 5, signa: "2x1" }
    ], // 6 obat sekaligus: Polifarmasi berat
    procedures: ["Pemeriksaan Multi-sistem"],
    claimAmount: 320_000
  },
  {
    id: "batch-22",
    patientNo: "RM-2026-0022",
    patientName: "Bpk. Herman Susilo",
    age: 47,
    gender: "L",
    bpjsNumber: "0002384719083",
    sepNumber: "0115R0010926V00022",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Sakit gigi hebat disertai nyeri leher.",
    primaryIcd: "K02.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-10", name: "Asam Mefenamat 500mg Tablet", quantity: 10, days: 3, signa: "3x1" },
      { medicineId: "MED-11", name: "Ibuprofen 400mg Tablet", quantity: 10, days: 3, signa: "3x1" }, // Duplikasi NSAID
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Gigi"],
    claimAmount: 195_000
  },
  {
    id: "batch-23",
    patientNo: "RM-2026-0023",
    patientName: "Ibu Anisa Pohan",
    age: 35,
    gender: "P",
    bpjsNumber: "0003495820194",
    sepNumber: "0115R0010926V00023",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Flu, batuk, pusing, alergi dingin, sesak ringan.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" },
      { medicineId: "MED-08", name: "Salbutamol 2mg Tablet", quantity: 10, days: 5, signa: "2x1" },
      { medicineId: "MED-13", name: "Cetirizine 10mg Tablet", quantity: 5, days: 5, signa: "1x1" },
      { medicineId: "MED-14", name: "Dexamethasone 0.5mg Tablet", quantity: 10, days: 5, signa: "2x1" }
    ], // 5 jenis obat polifarmasi
    procedures: ["Pemeriksaan Fisik Lengkap"],
    claimAmount: 260_000
  },
  {
    id: "batch-24",
    patientNo: "RM-2026-0024",
    patientName: "Bpk. Suhendra Bakti",
    age: 56,
    gender: "L",
    bpjsNumber: "0004506931205",
    sepNumber: "0115R0010926V00024",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Hipertensi tidak terkontrol, minta dobel obat tensi dari faskes.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" },
      { medicineId: "MED-04", name: "Captopril 25mg Tablet", quantity: 60, days: 30, signa: "2x1" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 20, days: 7, signa: "3x1" },
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 20, days: 7, signa: "3x1" },
      { medicineId: "MED-13", name: "Cetirizine 10mg Tablet", quantity: 10, days: 10, signa: "1x1" }
    ], // 5 obat kombinasi
    procedures: ["Pemeriksaan Tanda Vital"],
    claimAmount: 285_000
  },

  // 25-32: KELOMPOK ISU 4: Ketidaksesuaian SEP (Format SEP invalid, Beda tanggal SEP vs Layanan, Tindakan nihil pada klaim tinggi)
  {
    id: "batch-25",
    patientNo: "RM-2026-0025",
    patientName: "Bpk. Arif Rahman",
    age: 41,
    gender: "L",
    bpjsNumber: "0005617042316",
    sepNumber: "INVALID-SEP-123", // Format SEP tidak sesuai standar BPJS
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Keluhan ISPA demam batuk pilek.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik Dokter"],
    claimAmount: 150_000
  },
  {
    id: "batch-26",
    patientNo: "RM-2026-0026",
    patientName: "Ibu Desi Ratnasari",
    age: 39,
    gender: "P",
    bpjsNumber: "0006728153427",
    sepNumber: "0115R0010926V00026",
    sepDate: "2026-08-20", // Pelayanan lebih dari 15 hari kalender (>15 hari expired)
    serviceDate: "2026-08-20",
    complaints: "Kontrol gastritis berkas lama tertahan lebih dari 15 hari kalender.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 155_000
  },
  {
    id: "batch-27",
    patientNo: "RM-2026-0027",
    patientName: "Bpk. Zainal Abidin",
    age: 50,
    gender: "L",
    bpjsNumber: "0007839264538",
    sepNumber: "", // Nomor SEP kosong
    sepDate: "",
    serviceDate: "2026-09-12",
    complaints: "Pemeriksaan darah dan kontrol tensi rutin.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Tanda Vital"],
    claimAmount: 210_000
  },
  {
    id: "batch-28",
    patientNo: "RM-2026-0028",
    patientName: "Ibu Rina Gunawan",
    age: 45,
    gender: "P",
    bpjsNumber: "0008940375649",
    sepNumber: "0115R0010926V00028",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Klaim besar tapi berkas tindakan pemeriksaan nihil.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: [], // Tindakan kosong padahal klaim tinggi
    claimAmount: 350_000
  },

  // 29-50: Kasus-Kasus Variasi FKTP Tambahan (Kombinasi Compliant & Borderline)
  {
    id: "batch-29",
    patientNo: "RM-2026-0029",
    patientName: "Bpk. Bagus Santoso",
    age: 34,
    gender: "L",
    bpjsNumber: "0009051486750",
    sepNumber: "0115R0010926V00029",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Gatal alergi makanan laut.",
    primaryIcd: "L20.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-13", name: "Cetirizine 10mg Tablet", quantity: 5, days: 5, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Fisik Alergi"],
    claimAmount: 140_000
  },
  {
    id: "batch-30",
    patientNo: "RM-2026-0030",
    patientName: "Ibu Yuni Shara",
    age: 49,
    gender: "P",
    bpjsNumber: "0000162597861",
    sepNumber: "0115R0010926V00030",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol DM rutin, gula darah puasa 130 mg/dL.",
    primaryIcd: "E11.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-05", name: "Metformin 500mg Tablet", quantity: 60, days: 30, signa: "2x1" }
    ],
    procedures: ["Pemeriksaan Gula Darah"],
    claimAmount: 190_000
  },
  {
    id: "batch-31",
    patientNo: "RM-2026-0031",
    patientName: "Bpk. Anton Medika",
    age: 27,
    gender: "L",
    bpjsNumber: "0001273608972",
    sepNumber: "0115R0010926V00031",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "ISPA ringan tanpa demam tinggi.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik"],
    claimAmount: 130_000
  },
  {
    id: "batch-32",
    patientNo: "RM-2026-0032",
    patientName: "Ibu Lilis Suryani",
    age: 53,
    gender: "P",
    bpjsNumber: "0002384719083",
    sepNumber: "0115R0010926V00032",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Tekanan darah 140/90, riwayat rutin minum amlodipine.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Tekanan Darah"],
    claimAmount: 180_000
  },
  {
    id: "batch-33",
    patientNo: "RM-2026-0033",
    patientName: "Bpk. Dedi Mizwar",
    age: 60,
    gender: "L",
    bpjsNumber: "0003495820194",
    sepNumber: "0115R0010926V00033",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Gastritis kambuh setelah minum kopi pekat.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 145_000
  },
  {
    id: "batch-34",
    patientNo: "RM-2026-0034",
    patientName: "Ibu Poppy Dharsono",
    age: 40,
    gender: "P",
    bpjsNumber: "0004506931205",
    sepNumber: "0115R0010926V00034",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Sakit gigi lubang geraham atas.",
    primaryIcd: "K02.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-10", name: "Asam Mefenamat 500mg Tablet", quantity: 10, days: 3, signa: "3x1" },
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Gigi"],
    claimAmount: 160_000
  },
  {
    id: "batch-35",
    patientNo: "RM-2026-0035",
    patientName: "Bpk. Taufik Hidayat",
    age: 31,
    gender: "L",
    bpjsNumber: "0005617042316",
    sepNumber: "0115R0010926V00035",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Diare akut cair 3x, turgor baik, tidak dehidrasi.",
    primaryIcd: "A09",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Edukasi Kebersihan Makanan"],
    claimAmount: 135_000
  },
  {
    id: "batch-36",
    patientNo: "RM-2026-0036",
    patientName: "Ibu Christine Hakim",
    age: 65,
    gender: "P",
    bpjsNumber: "0006728153427",
    sepNumber: "0115R0010926V00036",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol rutin hipertensi faskes 1.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Tanda Vital"],
    claimAmount: 180_000
  },
  {
    id: "batch-37",
    patientNo: "RM-2026-0037",
    patientName: "Bpk. Gunawan Mohamad",
    age: 57,
    gender: "L",
    bpjsNumber: "0007839264538",
    sepNumber: "0115R0010926V00037",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Batuk berdahak pilek hidung tersumbat.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Fisik"],
    claimAmount: 150_000
  },
  {
    id: "batch-38",
    patientNo: "RM-2026-0038",
    patientName: "Ibu Vina Panduwinata",
    age: 59,
    gender: "P",
    bpjsNumber: "0008940375649",
    sepNumber: "0115R0010926V00038",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol diabetes rutin, gula darah stabil.",
    primaryIcd: "E11.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-05", name: "Metformin 500mg Tablet", quantity: 60, days: 30, signa: "2x1" }
    ],
    procedures: ["Cek Gula Darah Strip"],
    claimAmount: 195_000
  },
  {
    id: "batch-39",
    patientNo: "RM-2026-0039",
    patientName: "Bpk. Fariz RM",
    age: 46,
    gender: "L",
    bpjsNumber: "0009051486750",
    sepNumber: "0115R0010926V00039",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Perut kembung asam lambung naik.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-07", name: "Omeprazole 20mg Kapsul", quantity: 7, days: 7, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 165_000
  },
  {
    id: "batch-40",
    patientNo: "RM-2026-0040",
    patientName: "Ibu Hetty Koes Endang",
    age: 61,
    gender: "P",
    bpjsNumber: "0000162597861",
    sepNumber: "0115R0010926V00040",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Hipertensi kontrol teratur tensi 135/85.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-04", name: "Captopril 25mg Tablet", quantity: 60, days: 30, signa: "2x1" }
    ],
    procedures: ["Pemeriksaan Tekanan Darah"],
    claimAmount: 175_000
  },
  {
    id: "batch-41",
    patientNo: "RM-2026-0041",
    patientName: "Bpk. Iwan Fals",
    age: 50,
    gender: "L",
    bpjsNumber: "0001273608972",
    sepNumber: "0115R0010926V00041",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Flu pilek batuk serak 2 hari.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-01", name: "Amoxicillin 500mg Kapsul", quantity: 15, days: 5, signa: "3x1" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Tenggorokan"],
    claimAmount: 150_000
  },
  {
    id: "batch-42",
    patientNo: "RM-2026-0042",
    patientName: "Ibu Nia Daniaty",
    age: 43,
    gender: "P",
    bpjsNumber: "0002384719083",
    sepNumber: "0115R0010926V00042",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Gatal di tangan kulit kering mengelupas.",
    primaryIcd: "L20.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-13", name: "Cetirizine 10mg Tablet", quantity: 5, days: 5, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Kulit"],
    claimAmount: 135_000
  },
  {
    id: "batch-43",
    patientNo: "RM-2026-0043",
    patientName: "Bpk. Ebiet G Ade",
    age: 64,
    gender: "L",
    bpjsNumber: "0003495820194",
    sepNumber: "0115R0010926V00043",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol tensi bulanan Program Rujuk Balik.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Tanda Vital"],
    claimAmount: 180_000
  },
  {
    id: "batch-44",
    patientNo: "RM-2026-0044",
    patientName: "Ibu Betharia Sonata",
    age: 48,
    gender: "P",
    bpjsNumber: "0004506931205",
    sepNumber: "0115R0010926V00044",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Gigi ngilu saat minum dingin.",
    primaryIcd: "K02.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-10", name: "Asam Mefenamat 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Gigi"],
    claimAmount: 155_000
  },
  {
    id: "batch-45",
    patientNo: "RM-2026-0045",
    patientName: "Bpk. Chrisye Rahadi",
    age: 52,
    gender: "L",
    bpjsNumber: "0005617042316",
    sepNumber: "0115R0010926V00045",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Sesak ringan sesekali terutama malam hari, riwayat asma.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-08", name: "Salbutamol 2mg Tablet", quantity: 10, days: 5, signa: "2x1" },
      { medicineId: "MED-02", name: "Paracetamol 500mg Tablet", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Auskultasi Paru"],
    claimAmount: 155_000
  },
  {
    id: "batch-46",
    patientNo: "RM-2026-0046",
    patientName: "Ibu Camelia Malik",
    age: 45,
    gender: "P",
    bpjsNumber: "0006728153427",
    sepNumber: "0115R0010926V00046",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "BAB lembek 2x perut kembung.",
    primaryIcd: "A09",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 10, days: 3, signa: "3x1" }
    ],
    procedures: ["Edukasi Pola Makan"],
    claimAmount: 135_000
  },
  {
    id: "batch-47",
    patientNo: "RM-2026-0047",
    patientName: "Bpk. Rhoma Irama",
    age: 66,
    gender: "L",
    bpjsNumber: "0007839264538",
    sepNumber: "0115R0010926V00047",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol tensi rutin, kondisi fit.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" }
    ],
    procedures: ["Pemeriksaan Tanda Vital"],
    claimAmount: 180_000
  },
  {
    id: "batch-48",
    patientNo: "RM-2026-0048",
    patientName: "Ibu Elvy Sukaesih",
    age: 58,
    gender: "P",
    bpjsNumber: "0008940375649",
    sepNumber: "0115R0010926V00048",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol gula darah puasa 125 mg/dL.",
    primaryIcd: "E11.9",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-05", name: "Metformin 500mg Tablet", quantity: 60, days: 30, signa: "2x1" }
    ],
    procedures: ["Pemeriksaan Glukosa"],
    claimAmount: 195_000
  },
  {
    id: "batch-49",
    patientNo: "RM-2026-0049",
    patientName: "Bpk. Didi Kempot",
    age: 48,
    gender: "L",
    bpjsNumber: "0009051486750",
    sepNumber: "0115R0010926V00049",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Asam lambung perih telat makan siang.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-06", name: "Antasida Doen Tablet Kunyah", quantity: 15, days: 5, signa: "3x1" }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 145_000
  },
  {
    id: "batch-50",
    patientNo: "RM-2026-0050",
    patientName: "Ibu Waldjinah",
    age: 65,
    gender: "P",
    bpjsNumber: "0000162597861",
    sepNumber: "0115R0010926V00050",
    sepDate: "2026-09-12",
    serviceDate: "2026-09-12",
    complaints: "Kontrol rutin tekanan darah tinggi FKTP.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      { medicineId: "MED-04", name: "Captopril 25mg Tablet", quantity: 60, days: 30, signa: "2x1" }
    ],
    procedures: ["Pemeriksaan Tanda Vital"],
    claimAmount: 175_000
  }
];
