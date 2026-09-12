import { describe, expect, it } from "bun:test";
import { auditBatchClaims, generateAuditCsv, validateBpjsClaim } from "../claim-validator";
import { simulated50BatchCases } from "../batch-simulator";
import { PatientCase } from "../types";

describe("BPJS Batch Claim Pre-Validator Engine", () => {
  it("should audit batch of 50 simulated FKTP claims accurately", () => {
    expect(simulated50BatchCases.length).toBe(50);

    const report = auditBatchClaims(simulated50BatchCases);

    expect(report.totalClaimsCount).toBe(50);
    expect(report.totalClaimAmount).toBeGreaterThan(0);

    // Sum of counts must match total
    const sumCounts = report.layakCairCount + report.risikoDisputeCount + report.potensiDitolakCount;
    expect(sumCounts).toBe(50);

    // Amounts must match total
    const sumAmounts = report.layakCairAmount + report.risikoDisputeAmount + report.potensiDitolakAmount;
    expect(sumAmounts).toBe(report.totalClaimAmount);

    // Dispute risk amount calculation
    expect(report.totalDisputeRiskAmount).toBe(report.risikoDisputeAmount + report.potensiDitolakAmount);

    // Pass ratio percentages
    const totalRatio =
      report.passRatio.layakCairPct +
      report.passRatio.risikoDisputePct +
      report.passRatio.potensiDitolakPct;
    expect(Math.round(totalRatio)).toBeGreaterThanOrEqual(99);
    expect(Math.round(totalRatio)).toBeLessThanOrEqual(101);

    // Claim reports array
    expect(report.claimReports.length).toBe(50);
  });

  it("should calculate issue breakdown for all 4 key BPJS issue categories", () => {
    const report = auditBatchClaims(simulated50BatchCases);

    const { issueBreakdown } = report;

    // 1. Diagnosa non-kompetensi FKTP
    expect(issueBreakdown.nonFktpDiagnosis).toBeDefined();
    expect(issueBreakdown.nonFktpDiagnosis.count).toBeGreaterThan(0);
    expect(issueBreakdown.nonFktpDiagnosis.totalAmount).toBeGreaterThan(0);
    expect(issueBreakdown.nonFktpDiagnosis.title).toContain("Non-Kompetensi");

    // 2. Pelanggaran Fornas
    expect(issueBreakdown.fornasViolations).toBeDefined();
    expect(issueBreakdown.fornasViolations.count).toBeGreaterThan(0);
    expect(issueBreakdown.fornasViolations.totalAmount).toBeGreaterThan(0);

    // 3. Polifarmasi tidak rasional
    expect(issueBreakdown.irrationalPolypharmacy).toBeDefined();
    expect(issueBreakdown.irrationalPolypharmacy.count).toBeGreaterThan(0);
    expect(issueBreakdown.irrationalPolypharmacy.totalAmount).toBeGreaterThan(0);

    // 4. Ketidaksesuaian SEP
    expect(issueBreakdown.sepMismatch).toBeDefined();
    expect(issueBreakdown.sepMismatch.count).toBeGreaterThan(0);
    expect(issueBreakdown.sepMismatch.totalAmount).toBeGreaterThan(0);
  });

  it("should detect non-kompetensi FKTP diagnosis and flag as CRITICAL", () => {
    const strokeCase: PatientCase = {
      id: "test-stroke",
      patientNo: "RM-9901",
      patientName: "Bpk. Stroke Test",
      age: 60,
      gender: "L",
      bpjsNumber: "0001928374829",
      sepNumber: "0115R0010926V99991",
      sepDate: "2026-09-12",
      serviceDate: "2026-09-12",
      complaints: "Bicara pelo",
      primaryIcd: "I64", // Non-kompetensi FKTP
      secondaryIcd: [],
      medications: [],
      procedures: ["Pemeriksaan Fisik"],
      claimAmount: 300_000
    };

    const report = validateBpjsClaim(strokeCase);
    expect(report.status).toBe("POTENSI_DITOLAK");
    expect(report.issueCategories).toContain("nonFktpDiagnosis");
    expect(report.checks.some(c => c.id === "icd_non_fktp" && c.severity === "CRITICAL")).toBe(true);
  });

  it("should flag irrational polypharmacy with duplicate pharmacology classes", () => {
    const duplicateNsaidCase: PatientCase = {
      id: "test-nsaid",
      patientNo: "RM-9902",
      patientName: "Ibu Nyeri Test",
      age: 40,
      gender: "P",
      bpjsNumber: "0001928374830",
      sepNumber: "0115R0010926V99992",
      sepDate: "2026-09-12",
      serviceDate: "2026-09-12",
      complaints: "Sakit gigi dan pegal",
      primaryIcd: "K02.9",
      secondaryIcd: [],
      medications: [
        { medicineId: "MED-10", name: "Asam Mefenamat 500mg", quantity: 10, days: 3, signa: "3x1" },
        { medicineId: "MED-11", name: "Ibuprofen 400mg", quantity: 10, days: 3, signa: "3x1" }
      ],
      procedures: ["Pemeriksaan Gigi"],
      claimAmount: 180_000
    };

    const report = validateBpjsClaim(duplicateNsaidCase);
    expect(report.issueCategories).toContain("irrationalPolypharmacy");
    expect(report.checks.some(c => c.category === "Polifarmasi" && !c.passed)).toBe(true);
  });

  it("should flag SEP date mismatch between SEP date and service date", () => {
    const sepMismatchCase: PatientCase = {
      id: "test-sep",
      patientNo: "RM-9903",
      patientName: "Bpk. SEP Mismatch",
      age: 35,
      gender: "L",
      bpjsNumber: "0001928374831",
      sepNumber: "0115R0010926V99993",
      sepDate: "2026-09-01",
      serviceDate: "2026-09-12",
      complaints: "Batuk pilek",
      primaryIcd: "J06.9",
      secondaryIcd: [],
      medications: [
        { medicineId: "MED-02", name: "Paracetamol 500mg", quantity: 10, days: 3, signa: "3x1" }
      ],
      procedures: ["Pemeriksaan Fisik"],
      claimAmount: 140_000
    };

    const report = validateBpjsClaim(sepMismatchCase);
    expect(report.issueCategories).toContain("sepMismatch");
    expect(report.checks.some(c => c.id === "sep_date_mismatch" && !c.passed)).toBe(true);
  });

  it("should generate properly formatted CSV string with headers and rows", () => {
    const report = auditBatchClaims(simulated50BatchCases.slice(0, 5));
    const csv = generateAuditCsv(report);

    expect(typeof csv).toBe("string");
    const lines = csv.trim().split("\n");
    expect(lines.length).toBe(6); // 1 header + 5 data lines
    expect(lines[0]).toContain("No,ID Kasus,No Pasien,Nama Pasien");
    expect(lines[1]).toContain("batch-01");
  });
});
