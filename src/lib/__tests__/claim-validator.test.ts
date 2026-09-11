import { describe, expect, it } from "bun:test";
import { validateBpjsClaim } from "../claim-validator";
import { samplePatientCases } from "../clinical-database";

describe("BPJS Claim Pre-Validator Rules Engine", () => {
  it("should validate compliant hypertension case as LAYAK_CAIR", () => {
    const validCase = samplePatientCases[0]; // Bpk. Bambang - Hipertensi I10 + Amlodipine
    const report = validateBpjsClaim(validCase);

    expect(report.status).toBe("LAYAK_CAIR");
    expect(report.score).toBeGreaterThanOrEqual(80);
    expect(report.auditFlags.length).toBe(0);

    const icdCheck = report.checks.find(c => c.id === "icd_valid");
    expect(icdCheck?.passed).toBe(true);
  });

  it("should flag FKRTL restricted medicine in primary care as CRITICAL dispute/reject", () => {
    const disputeCase = samplePatientCases[1]; // Ibu Siti - ISPA + Cefixime (FKRTL)
    const report = validateBpjsClaim(disputeCase);

    expect(report.status).not.toBe("LAYAK_CAIR");
    expect(report.auditFlags.length).toBeGreaterThan(0);

    const cefiximeCheck = report.checks.find(c => c.id.includes("med_tier_MED-09"));
    expect(cefiximeCheck?.passed).toBe(false);
    expect(cefiximeCheck?.severity).toBe("CRITICAL");
  });

  it("should detect and approve compliant gastritis case with appropriate Fornas medicines", () => {
    const gastritisCase = samplePatientCases[2]; // Bpk. Hendra - K29.7 Gastritis
    const report = validateBpjsClaim(gastritisCase);

    expect(report.status).toBe("LAYAK_CAIR");
    expect(report.score).toBeGreaterThanOrEqual(80);
  });
});
