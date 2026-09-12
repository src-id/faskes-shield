import { describe, expect, it } from "bun:test";
import { parseClaimsFromCsv, parseClaimsFromJson } from "../claim-parser";

describe("BPJS Claim File Parser (CSV & JSON)", () => {
  it("should parse standard CSV with common headers successfully", () => {
    const csvContent = `Nama Pasien,No Kartu BPJS,No SEP,Diagnosa Primer,Nilai Klaim,Tanggal Layanan,Resep Obat,Tindakan
Bpk. Sutrisno,0001293847102,0115R0010926V00001,I10,185000,2026-09-12,MED-03:Amlodipine 5mg:30:30:1x1,Pemeriksaan Tanda Vital
Ibu Aminah,0002384910293,0115R0010926V00002,J06.9,150000,2026-09-12,Amoxicillin,Pemeriksaan Fisik Dokter`;

    const result = parseClaimsFromCsv(csvContent);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.rowCount).toBe(2);

    const first = result.data![0];
    expect(first.patientName).toBe("Bpk. Sutrisno");
    expect(first.bpjsNumber).toBe("0001293847102");
    expect(first.sepNumber).toBe("0115R0010926V00001");
    expect(first.primaryIcd).toBe("I10");
    expect(first.claimAmount).toBe(185000);
    expect(first.medications.length).toBe(1);
    expect(first.medications[0].medicineId).toBe("MED-03");

    const second = result.data![1];
    expect(second.patientName).toBe("Ibu Aminah");
    expect(second.primaryIcd).toBe("J06.9");
    expect(second.medications.length).toBe(1);
    expect(second.medications[0].name).toContain("Amoxicillin");
  });

  it("should handle semicolon delimited CSV with quotes", () => {
    const csvSemicolon = `"Nama Pasien";"No BPJS";"No SEP";"ICD";"Biaya";"Resep"
"Bpk. Hendra, S.T.";"0003495820194";"0115R0010926V00003";"K29.7";"165.000";"MED-06:Antasida:15:5:3x1;MED-07:Omeprazole:7:7:1x1"`;

    const result = parseClaimsFromCsv(csvSemicolon);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.length).toBe(1);

    const item = result.data![0];
    expect(item.patientName).toBe("Bpk. Hendra, S.T.");
    expect(item.primaryIcd).toBe("K29.7");
    expect(item.claimAmount).toBe(165000);
    expect(item.medications.length).toBe(2);
  });

  it("should return error on empty or invalid CSV", () => {
    const emptyResult = parseClaimsFromCsv("");
    expect(emptyResult.success).toBe(false);
    expect(emptyResult.error).toBeDefined();

    const noDataResult = parseClaimsFromCsv("Nama Pasien,No BPJS");
    expect(noDataResult.success).toBe(false);
  });

  it("should parse valid JSON claims array", () => {
    const jsonContent = JSON.stringify([
      {
        patientName: "Bpk. Bambang Sutrisno",
        bpjsNumber: "0001293847102",
        sepNumber: "0115R0010926V00001",
        primaryIcd: "I10",
        serviceDate: "2026-09-12",
        claimAmount: 185000,
        medications: [
          { medicineId: "MED-03", name: "Amlodipine 5mg Tablet", quantity: 30, days: 30, signa: "1x1" }
        ],
        procedures: ["Pemeriksaan Tanda Vital"]
      }
    ]);

    const result = parseClaimsFromJson(jsonContent);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.length).toBe(1);
    expect(result.data![0].patientName).toBe("Bpk. Bambang Sutrisno");
    expect(result.data![0].primaryIcd).toBe("I10");
  });

  it("should parse wrapped JSON object with claims array", () => {
    const jsonWrapped = JSON.stringify({
      facility: "Klinik Pratama Sehat",
      claims: [
        {
          patientName: "Ibu Siti Aminah",
          primaryIcd: "J06.9",
          claimAmount: 150000
        }
      ]
    });

    const result = parseClaimsFromJson(jsonWrapped);
    expect(result.success).toBe(true);
    expect(result.data?.length).toBe(1);
    expect(result.data![0].patientName).toBe("Ibu Siti Aminah");
  });

  it("should return error on malformed JSON", () => {
    const badJson = "{ invalid json here }";
    const result = parseClaimsFromJson(badJson);
    expect(result.success).toBe(false);
    expect(result.error).toContain("Format JSON tidak valid");
  });
});
