import { PatientCase, PrescribedMed } from "./types";
import { fornasMedicines } from "./clinical-database";

export interface ParseResult {
  success: boolean;
  data?: PatientCase[];
  error?: string;
  rowCount?: number;
}

/**
 * Robust CSV Line Splitter supporting quoted values with commas
 */
function splitCsvLine(line: string, delimiter: string = ","): string[] {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function parseMedicationsField(medsRaw: string): PrescribedMed[] {
  if (!medsRaw || medsRaw.trim() === "" || medsRaw === "-") {
    return [];
  }

  // Support JSON string inside CSV
  if (medsRaw.startsWith("[") && medsRaw.endsWith("]")) {
    try {
      const parsed = JSON.parse(medsRaw);
      if (Array.isArray(parsed)) {
        return parsed.map((m: any, idx: number) => ({
          medicineId: m.medicineId || `MED-CUSTOM-${idx}`,
          name: m.name || "Obat Resep",
          quantity: Number(m.quantity) || 10,
          days: Number(m.days) || 5,
          signa: m.signa || "3x1"
        }));
      }
    } catch {
      // fallback to text parsing
    }
  }

  // Format: "MED-01:Amoxicillin:15:5:3x1;MED-02:Paracetamol:10:3:3x1" or "MED-01; MED-02" or "Amoxicillin, Paracetamol"
  const segments = medsRaw.split(/[;|]/).map(s => s.trim()).filter(Boolean);
  const medications: PrescribedMed[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const parts = segment.split(":").map(p => p.trim());

    if (parts.length >= 5) {
      medications.push({
        medicineId: parts[0] || `MED-${i + 1}`,
        name: parts[1] || "Obat Resep",
        quantity: parseInt(parts[2], 10) || 10,
        days: parseInt(parts[3], 10) || 5,
        signa: parts[4] || "2x1"
      });
    } else {
      // Find matching medicine from fornas catalog by ID or generic/brand name
      const identifier = parts[0];
      const matched = fornasMedicines.find(
        m => m.id.toLowerCase() === identifier.toLowerCase() ||
             m.name.toLowerCase().includes(identifier.toLowerCase())
      );

      if (matched) {
        medications.push({
          medicineId: matched.id,
          name: matched.name,
          quantity: matched.maxDaysSupply * 2,
          days: matched.maxDaysSupply,
          signa: "2x1 sesudah makan"
        });
      } else {
        medications.push({
          medicineId: `MED-${i + 1}`,
          name: identifier,
          quantity: 10,
          days: 5,
          signa: "3x1 sesudah makan"
        });
      }
    }
  }

  return medications;
}

export function parseClaimsFromCsv(csvText: string): ParseResult {
  if (!csvText || csvText.trim() === "") {
    return { success: false, error: "Berkas CSV kosong." };
  }

  const lines = csvText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  if (lines.length < 2) {
    return {
      success: false,
      error: "Berkas CSV wajib memiliki baris header dan minimal 1 baris data klaim."
    };
  }

  // Detect delimiter: comma or semicolon
  const headerLine = lines[0];
  const commaCount = (headerLine.match(/,/g) || []).length;
  const semiCount = (headerLine.match(/;/g) || []).length;
  const delimiter = semiCount > commaCount ? ";" : ",";

  const rawHeaders = splitCsvLine(headerLine, delimiter).map(h =>
    h.toLowerCase().replace(/[^a-z0-9]/g, "")
  );

  // Helper to find column index by synonyms
  const findCol = (...synonyms: string[]): number => {
    return rawHeaders.findIndex(h => synonyms.some(s => h.includes(s)));
  };

  const nameCol = findCol("namapasien", "nama", "patientname");
  const bpjsCol = findCol("nokartu", "bpjs", "nobpjs", "nokartubpjs");
  const icdCol = findCol("icd", "diagnosaprimer", "diagnosa", "primaryicd");
  const sepCol = findCol("sep", "nosep", "nomorsep", "sepnumber");
  const amountCol = findCol("claimamount", "nilaiklaim", "biayaklaim", "biaya", "tarif");
  const dateCol = findCol("servicedate", "tanggallayanan", "tanggalpelayanan", "tanggal");
  const sepDateCol = findCol("sepdate", "tanggalsep");
  const medsCol = findCol("medications", "resep", "obat", "daftarobat");
  const procCol = findCol("procedures", "tindakan", "prosedur");
  const complaintsCol = findCol("complaints", "keluhan", "keluhanutama");
  const noCol = findCol("patientno", "norm", "nomorrm", "nopasien");

  if (nameCol === -1 || icdCol === -1) {
    return {
      success: false,
      error: "Header CSV tidak valid. Wajib ada kolom nama pasien dan kode diagnosa (ICD-10)."
    };
  }

  const cases: PatientCase[] = [];
  const today = new Date().toISOString().split("T")[0];

  for (let i = 1; i < lines.length; i++) {
    const row = splitCsvLine(lines[i], delimiter);
    if (row.length <= Math.max(nameCol, icdCol)) {
      continue;
    }

    const patientName = row[nameCol] || `Pasien-${i}`;
    const primaryIcd = (row[icdCol] || "J06.9").trim().toUpperCase();
    const bpjsNumber = bpjsCol !== -1 && row[bpjsCol] ? row[bpjsCol].trim() : `000${Date.now().toString().slice(-10)}`;
    const sepNumber = sepCol !== -1 && row[sepCol] ? row[sepCol].trim() : `0115R0010926V${(10000 + i).toString()}`;
    const serviceDate = dateCol !== -1 && row[dateCol] ? row[dateCol].trim() : today;
    const sepDate = sepDateCol !== -1 && row[sepDateCol] ? row[sepDateCol].trim() : serviceDate;

    let claimAmount = 150_000;
    if (amountCol !== -1 && row[amountCol]) {
      const parsedAmount = parseInt(row[amountCol].replace(/[^0-9]/g, ""), 10);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        claimAmount = parsedAmount;
      }
    }

    const medications = medsCol !== -1 && row[medsCol] ? parseMedicationsField(row[medsCol]) : [];
    const procedures =
      procCol !== -1 && row[procCol]
        ? row[procCol].split(/[;|]/).map(p => p.trim()).filter(Boolean)
        : ["Pemeriksaan Fisik Dokter"];

    const complaints =
      complaintsCol !== -1 && row[complaintsCol] ? row[complaintsCol].trim() : "Pemeriksaan faskes primer";

    const patientNo = noCol !== -1 && row[noCol] ? row[noCol].trim() : `RM-${(1000 + i).toString()}`;

    cases.push({
      id: `imported-csv-${i}`,
      patientNo,
      patientName,
      age: 35,
      gender: "L",
      bpjsNumber,
      sepNumber,
      sepDate,
      serviceDate,
      complaints,
      primaryIcd,
      secondaryIcd: [],
      medications,
      procedures,
      claimAmount
    });
  }

  if (cases.length === 0) {
    return {
      success: false,
      error: "Tidak ada baris data klaim valid yang dapat diekstrak dari CSV."
    };
  }

  return {
    success: true,
    data: cases,
    rowCount: cases.length
  };
}

export function parseClaimsFromJson(jsonText: string): ParseResult {
  if (!jsonText || jsonText.trim() === "") {
    return { success: false, error: "Berkas JSON kosong." };
  }

  try {
    const parsed = JSON.parse(jsonText);
    let rawList: any[] = [];

    if (Array.isArray(parsed)) {
      rawList = parsed;
    } else if (parsed && typeof parsed === "object") {
      if (Array.isArray(parsed.claims)) {
        rawList = parsed.claims;
      } else if (Array.isArray(parsed.claimReports)) {
        rawList = parsed.claimReports;
      } else if (Array.isArray(parsed.data)) {
        rawList = parsed.data;
      }
    }

    if (rawList.length === 0) {
      return {
        success: false,
        error: "Struktur JSON tidak berisi array berkas klaim valid (harus berupa array [] atau objek { claims: [] })."
      };
    }

    const today = new Date().toISOString().split("T")[0];
    const cases: PatientCase[] = [];

    for (let i = 0; i < rawList.length; i++) {
      const item = rawList[i];
      if (!item || typeof item !== "object") continue;

      const patientName = item.patientName || item.nama || `Pasien-${i + 1}`;
      const primaryIcd = item.primaryIcd || item.icd || item.diagnosa || "J06.9";
      const bpjsNumber = item.bpjsNumber || item.noBpjs || `000${Date.now().toString().slice(-10)}`;
      const sepNumber = item.sepNumber || item.noSep || `0115R0010926V${(10000 + i + 1).toString()}`;
      const serviceDate = item.serviceDate || item.tanggal || today;
      const sepDate = item.sepDate || serviceDate;
      const claimAmount = Number(item.claimAmount || item.estimatedClaimAmount || item.biaya) || 150_000;

      let medications: PrescribedMed[] = [];
      if (Array.isArray(item.medications)) {
        medications = item.medications.map((m: any, mIdx: number) => ({
          medicineId: m.medicineId || `MED-${mIdx + 1}`,
          name: m.name || "Obat Resep",
          quantity: Number(m.quantity) || 10,
          days: Number(m.days) || 5,
          signa: m.signa || "2x1 sesudah makan"
        }));
      }

      const procedures = Array.isArray(item.procedures)
        ? item.procedures
        : ["Pemeriksaan Fisik Dokter"];

      cases.push({
        id: item.id || `imported-json-${i + 1}`,
        patientNo: item.patientNo || item.noRm || `RM-${1000 + i + 1}`,
        patientName,
        age: Number(item.age) || 35,
        gender: item.gender === "P" ? "P" : "L",
        bpjsNumber,
        sepNumber,
        sepDate,
        serviceDate,
        complaints: item.complaints || "Pemeriksaan faskes primer",
        primaryIcd,
        secondaryIcd: Array.isArray(item.secondaryIcd) ? item.secondaryIcd : [],
        medications,
        procedures,
        claimAmount
      });
    }

    if (cases.length === 0) {
      return {
        success: false,
        error: "Tidak ada berkas klaim valid yang dapat diparsing dari JSON."
      };
    }

    return {
      success: true,
      data: cases,
      rowCount: cases.length
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Format JSON tidak valid: ${err?.message || "Syntax error"}`
    };
  }
}
