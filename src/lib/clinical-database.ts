import { Icd10Code, MedicineFornas, PatientCase } from "./types";

export const icd10Catalog: Icd10Code[] = [
  {
    code: "J06.9",
    name: "Infeksi Saluran Pernapasan Akut (ISPA)",
    chapter: "Penyakit Sistem Pernapasan",
    isChronic: false,
    isPrbEligible: false,
    compatibleMeds: ["MED-01", "MED-02", "MED-08"],
    incompatibleMeds: ["MED-03", "MED-05"]
  },
  {
    code: "I10",
    name: "Hipertensi Esensial / Primer",
    chapter: "Penyakit Sistem Sirkulasi",
    isChronic: true,
    isPrbEligible: true,
    compatibleMeds: ["MED-03", "MED-04", "MED-02"],
    incompatibleMeds: ["MED-01"]
  },
  {
    code: "E11.9",
    name: "Diabetes Mellitus Tipe 2 Tanpa Komplikasi",
    chapter: "Penyakit Endokrin & Metabolik",
    isChronic: true,
    isPrbEligible: true,
    compatibleMeds: ["MED-05", "MED-02"],
    incompatibleMeds: ["MED-01", "MED-08"]
  },
  {
    code: "K29.7",
    name: "Gastritis Akut / Dispepsia",
    chapter: "Penyakit Sistem Pencernaan",
    isChronic: false,
    isPrbEligible: false,
    compatibleMeds: ["MED-06", "MED-07", "MED-02"],
    incompatibleMeds: ["MED-01", "MED-03"]
  },
  {
    code: "A09",
    name: "Gastroenteritis & Kolitis Akut (Diare)",
    chapter: "Penyakit Infeksi & Parasit",
    isChronic: false,
    isPrbEligible: false,
    compatibleMeds: ["MED-02", "MED-06"],
    incompatibleMeds: ["MED-03", "MED-05"]
  }
];

export const fornasMedicines: MedicineFornas[] = [
  {
    id: "MED-01",
    name: "Amoxicillin 500mg Kapsul",
    genericName: "Amoxicillin",
    category: "Antibiotik",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Maksimal 5 hari per episode sakit. Hanya untuk infeksi bakteri terbukti."
  },
  {
    id: "MED-02",
    name: "Paracetamol 500mg Tablet",
    genericName: "Paracetamol",
    category: "Analgesik / Antipiretik",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Maksimal 15 tablet per episode."
  },
  {
    id: "MED-03",
    name: "Amlodipine 5mg Tablet",
    genericName: "Amlodipine",
    category: "Antihipertensi",
    fornasLevel: "FKTP",
    maxDaysSupply: 30,
    requiresLabProof: false,
    restrictionNote: "Maksimal 30 hari untuk peserta PRB (Program Rujuk Balik), atau 7 hari untuk pasien baru."
  },
  {
    id: "MED-04",
    name: "Captopril 25mg Tablet",
    genericName: "Captopril",
    category: "Antihipertensi",
    fornasLevel: "FKTP",
    maxDaysSupply: 30,
    requiresLabProof: false,
    restrictionNote: "Maksimal 30 hari untuk kasus hipertensi kronis."
  },
  {
    id: "MED-05",
    name: "Metformin 500mg Tablet",
    genericName: "Metformin",
    category: "Antidiabetes",
    fornasLevel: "FKTP",
    maxDaysSupply: 30,
    requiresLabProof: true,
    restrictionNote: "Wajib lampiran cek GDS / GDP berkala minimal 3 bulan terakhir."
  },
  {
    id: "MED-06",
    name: "Antasida Doen Tablet Kunyah",
    genericName: "Aluminium & Magnesium Hidroksida",
    category: "Saluran Cerna",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Maksimal 20 tablet per episode akut."
  },
  {
    id: "MED-07",
    name: "Omeprazole 20mg Kapsul",
    genericName: "Omeprazole",
    category: "Saluran Cerna",
    fornasLevel: "FKTP",
    maxDaysSupply: 7,
    requiresLabProof: false,
    restrictionNote: "Restriksi FKTP: Hanya untuk tukak lambung / GERD yang tidak respon antasida, max 7 hari."
  },
  {
    id: "MED-08",
    name: "Salbutamol 2mg Tablet",
    genericName: "Salbutamol",
    category: "Saluran Napas",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Hanya untuk asma akut atau bronkospasme."
  },
  {
    id: "MED-09",
    name: "Cefixime 100mg Kapsul",
    genericName: "Cefixime",
    category: "Antibiotik",
    fornasLevel: "FKRTL",
    maxDaysSupply: 5,
    requiresLabProof: true,
    restrictionNote: "RESTRIKSI FKRTL! Tidak ditanggung di FKTP Pratama tanpa surat rujukan balik spesialis."
  }
];

export const samplePatientCases: PatientCase[] = [
  {
    id: "case-01",
    patientNo: "RM-2026-0911",
    patientName: "Bpk. Bambang Sutrisno",
    age: 54,
    gender: "L",
    bpjsNumber: "0001293847102",
    serviceDate: "2026-09-11",
    complaints: "Kontrol rutin tekanan darah tinggi, tengkuk kaku, riwayat hipertensi 3 tahun.",
    primaryIcd: "I10",
    secondaryIcd: [],
    medications: [
      {
        medicineId: "MED-03",
        name: "Amlodipine 5mg Tablet",
        quantity: 30,
        days: 30,
        signa: "1x1 pagi hari"
      },
      {
        medicineId: "MED-02",
        name: "Paracetamol 500mg Tablet",
        quantity: 10,
        days: 3,
        signa: "3x1 jika nyeri"
      }
    ],
    procedures: ["Pemeriksaan Tanda Vital", "Konsultasi Edukasi Pola Makan"],
    claimAmount: 185_000
  },
  {
    id: "case-02",
    patientNo: "RM-2026-0912",
    patientName: "Ibu Siti Aminah",
    age: 32,
    gender: "P",
    bpjsNumber: "0003928172910",
    serviceDate: "2026-09-11",
    complaints: "Batuk pilek sejak 2 hari, demam ringan 37.8C, tenggorokan gatal.",
    primaryIcd: "J06.9",
    secondaryIcd: [],
    medications: [
      {
        medicineId: "MED-09", // Cefixime FKRTL (POTENSI DISPUTE/REJECT)
        name: "Cefixime 100mg Kapsul",
        quantity: 10,
        days: 5,
        signa: "2x1 sesudah makan"
      },
      {
        medicineId: "MED-02",
        name: "Paracetamol 500mg Tablet",
        quantity: 10,
        days: 3,
        signa: "3x1 jika demam"
      }
    ],
    procedures: ["Pemeriksaan Fisik Dasar"],
    claimAmount: 240_000
  },
  {
    id: "case-03",
    patientNo: "RM-2026-0913",
    patientName: "Bpk. Hendra Gunawan",
    age: 48,
    gender: "L",
    bpjsNumber: "0005819283719",
    serviceDate: "2026-09-11",
    complaints: "Nyeri ulu hati seperti terbakar, mual setelah makan pedas.",
    primaryIcd: "K29.7",
    secondaryIcd: [],
    medications: [
      {
        medicineId: "MED-06",
        name: "Antasida Doen Tablet Kunyah",
        quantity: 15,
        days: 5,
        signa: "3x1 kunyah sebelum makan"
      },
      {
        medicineId: "MED-07",
        name: "Omeprazole 20mg Kapsul",
        quantity: 7,
        days: 7,
        signa: "1x1 sebelum makan pagi"
      }
    ],
    procedures: ["Pemeriksaan Abdomen"],
    claimAmount: 165_000
  }
];
