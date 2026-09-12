import { Icd10Code, MedicineFornas, PatientCase } from "./types";

export const icd10Catalog: Icd10Code[] = [
  {
    code: "J06.9",
    name: "Infeksi Saluran Pernapasan Akut (ISPA)",
    chapter: "Penyakit Sistem Pernapasan",
    isChronic: false,
    isPrbEligible: false,
    isFktpCompetent: true,
    compatibleMeds: ["MED-01", "MED-02", "MED-08", "MED-13"],
    incompatibleMeds: ["MED-03", "MED-05", "MED-12"]
  },
  {
    code: "I10",
    name: "Hipertensi Esensial / Primer",
    chapter: "Penyakit Sistem Sirkulasi",
    isChronic: true,
    isPrbEligible: true,
    isFktpCompetent: true,
    compatibleMeds: ["MED-03", "MED-04", "MED-02"],
    incompatibleMeds: ["MED-01", "MED-09"]
  },
  {
    code: "E11.9",
    name: "Diabetes Mellitus Tipe 2 Tanpa Komplikasi",
    chapter: "Penyakit Endokrin & Metabolik",
    isChronic: true,
    isPrbEligible: true,
    isFktpCompetent: true,
    compatibleMeds: ["MED-05", "MED-02"],
    incompatibleMeds: ["MED-01", "MED-08", "MED-09"]
  },
  {
    code: "K29.7",
    name: "Gastritis Akut / Dispepsia",
    chapter: "Penyakit Sistem Pencernaan",
    isChronic: false,
    isPrbEligible: false,
    isFktpCompetent: true,
    compatibleMeds: ["MED-06", "MED-07", "MED-02"],
    incompatibleMeds: ["MED-01", "MED-03", "MED-10", "MED-11"]
  },
  {
    code: "A09",
    name: "Gastroenteritis & Kolitis Akut (Diare)",
    chapter: "Penyakit Infeksi & Parasit",
    isChronic: false,
    isPrbEligible: false,
    isFktpCompetent: true,
    compatibleMeds: ["MED-02", "MED-06"],
    incompatibleMeds: ["MED-03", "MED-05", "MED-12"]
  },
  {
    code: "L20.9",
    name: "Dermatitis Atopik / Alergi",
    chapter: "Penyakit Kulit & Jaringan Subkutan",
    isChronic: false,
    isPrbEligible: false,
    isFktpCompetent: true,
    compatibleMeds: ["MED-13", "MED-14", "MED-02"],
    incompatibleMeds: ["MED-03", "MED-05"]
  },
  {
    code: "K02.9",
    name: "Karies Dentis / Pulpitis",
    chapter: "Penyakit Rongga Mulut",
    isChronic: false,
    isPrbEligible: false,
    isFktpCompetent: true,
    compatibleMeds: ["MED-01", "MED-02", "MED-10"],
    incompatibleMeds: ["MED-03", "MED-05"]
  },
  // Diagnosis Non-Kompetensi FKTP (Perlu Rujukan Spesialis / FKRTL)
  {
    code: "I64",
    name: "Stroke Akut / CVA Infark (Non-Kompetensi FKTP)",
    chapter: "Penyakit Saraf & Pembuluh Darah Otak",
    isChronic: true,
    isPrbEligible: false,
    isFktpCompetent: false,
    compatibleMeds: ["MED-12"],
    incompatibleMeds: ["MED-01"]
  },
  {
    code: "H25.9",
    name: "Katarak Senilis (Non-Kompetensi FKTP)",
    chapter: "Penyakit Mata",
    isChronic: true,
    isPrbEligible: false,
    isFktpCompetent: false,
    compatibleMeds: [],
    incompatibleMeds: ["MED-01", "MED-09"]
  },
  {
    code: "N83.2",
    name: "Kista Ovarium (Non-Kompetensi FKTP)",
    chapter: "Penyakit Sistem Genitourinaria",
    isChronic: false,
    isPrbEligible: false,
    isFktpCompetent: false,
    compatibleMeds: ["MED-02"],
    incompatibleMeds: ["MED-01"]
  },
  {
    code: "K40.9",
    name: "Hernia Inguinalis Unilateral (Non-Kompetensi FKTP)",
    chapter: "Penyakit Sistem Pencernaan Bedah",
    isChronic: false,
    isPrbEligible: false,
    isFktpCompetent: false,
    compatibleMeds: ["MED-02"],
    incompatibleMeds: ["MED-01"]
  }
];

export const fornasMedicines: MedicineFornas[] = [
  {
    id: "MED-01",
    name: "Amoxicillin 500mg Kapsul",
    genericName: "Amoxicillin",
    category: "Antibiotik",
    pharmacologyClass: "Penicillin",
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
    pharmacologyClass: "Analgesic-Antipyretic",
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
    pharmacologyClass: "Calcium Channel Blocker",
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
    pharmacologyClass: "ACE Inhibitor",
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
    pharmacologyClass: "Biguanide",
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
    pharmacologyClass: "Antacid",
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
    pharmacologyClass: "Proton Pump Inhibitor",
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
    pharmacologyClass: "Beta-2 Agonist",
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
    pharmacologyClass: "Cephalosporin-3rd-Gen",
    fornasLevel: "FKRTL",
    maxDaysSupply: 5,
    requiresLabProof: true,
    restrictionNote: "RESTRIKSI FKRTL! Tidak ditanggung di FKTP Pratama tanpa surat rujukan balik spesialis."
  },
  {
    id: "MED-10",
    name: "Asam Mefenamat 500mg Tablet",
    genericName: "Asam Mefenamat",
    category: "Analgesik / Antipiretik",
    pharmacologyClass: "NSAID",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Analgesik antiinflamasi non-steroid, maksimal 5 hari."
  },
  {
    id: "MED-11",
    name: "Ibuprofen 400mg Tablet",
    genericName: "Ibuprofen",
    category: "Analgesik / Antipiretik",
    pharmacologyClass: "NSAID",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Analgesik antiinflamasi, maksimal 5 hari."
  },
  {
    id: "MED-12",
    name: "Clopidogrel 75mg Tablet",
    genericName: "Clopidogrel",
    category: "Kardiovaskular",
    pharmacologyClass: "Antiplatelet",
    fornasLevel: "FKRTL",
    maxDaysSupply: 30,
    requiresLabProof: true,
    restrictionNote: "RESTRIKSI FKRTL: Hanya diresepkan oleh Dokter Spesialis Jantung / Penyakit Dalam di RS."
  },
  {
    id: "MED-13",
    name: "Cetirizine 10mg Tablet",
    genericName: "Cetirizine",
    category: "Antihistamin",
    pharmacologyClass: "Antihistamine",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Antihistamin generasi kedua, maksimal 5 hari."
  },
  {
    id: "MED-14",
    name: "Dexamethasone 0.5mg Tablet",
    genericName: "Dexamethasone",
    category: "Kortikosteroid",
    pharmacologyClass: "Corticosteroid",
    fornasLevel: "FKTP",
    maxDaysSupply: 5,
    requiresLabProof: false,
    restrictionNote: "Kortikosteroid anti-inflamasi jangka pendek, maksimal 5 hari."
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
    sepNumber: "0115R0010926V00001",
    sepDate: "2026-09-11",
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
    sepNumber: "0115R0010926V00002",
    sepDate: "2026-09-11",
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
    sepNumber: "0115R0010926V00003",
    sepDate: "2026-09-11",
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
