import { z } from "zod";

export const Icd10CodeSchema = z.object({
  code: z.string(),
  name: z.string(),
  chapter: z.string(),
  isChronic: z.boolean().default(false),
  isPrbEligible: z.boolean().default(false), // Program Rujuk Balik
  isFktpCompetent: z.boolean().default(true), // 144 Diagnosis Kompetensi 4A Dokter Umum FKTP
  compatibleMeds: z.array(z.string()),
  incompatibleMeds: z.array(z.string()).default([])
});

export type Icd10Code = z.infer<typeof Icd10CodeSchema>;

export const MedicineFornasSchema = z.object({
  id: z.string(),
  name: z.string(),
  genericName: z.string(),
  category: z.enum([
    "Antibiotik",
    "Analgesik / Antipiretik",
    "Antihipertensi",
    "Antidiabetes",
    "Saluran Cerna",
    "Saluran Napas",
    "Kortikosteroid",
    "Kardiovaskular",
    "Antihistamin"
  ]),
  pharmacologyClass: z.string().optional(),
  fornasLevel: z.enum(["FKTP", "FKRTL"]),
  maxDaysSupply: z.number(),
  requiresLabProof: z.boolean().default(false),
  restrictionNote: z.string()
});

export type MedicineFornas = z.infer<typeof MedicineFornasSchema>;

export const PrescribedMedSchema = z.object({
  medicineId: z.string(),
  name: z.string(),
  quantity: z.number(),
  days: z.number(),
  signa: z.string()
});

export type PrescribedMed = z.infer<typeof PrescribedMedSchema>;

export const PatientCaseSchema = z.object({
  id: z.string(),
  patientNo: z.string(),
  patientName: z.string(),
  age: z.number(),
  gender: z.enum(["L", "P"]),
  bpjsNumber: z.string(),
  sepNumber: z.string().optional(),
  sepDate: z.string().optional(),
  serviceDate: z.string(),
  complaints: z.string(),
  primaryIcd: z.string(),
  secondaryIcd: z.array(z.string()).default([]),
  medications: z.array(PrescribedMedSchema),
  procedures: z.array(z.string()).default([]),
  claimAmount: z.number()
});

export type PatientCase = z.infer<typeof PatientCaseSchema>;

export interface ClinicalCheckItem {
  id: string;
  name: string;
  category: "Diagnosa" | "Obat Fornas" | "Restriksi BPJS" | "Kelayakan FKTP" | "Polifarmasi" | "Kesesuaian SEP";
  passed: boolean;
  message: string;
  severity: "CRITICAL" | "WARNING" | "PASS";
}

export type IssueCategoryKey =
  | "nonFktpDiagnosis"
  | "fornasViolations"
  | "irrationalPolypharmacy"
  | "sepMismatch";

export interface ClaimValidationReport {
  caseId: string;
  patientName: string;
  bpjsNumber: string;
  sepNumber?: string;
  primaryDiagnosis: string;
  score: number;
  status: "LAYAK_CAIR" | "RISIKO_DISPUTE" | "POTENSI_DITOLAK";
  checks: ClinicalCheckItem[];
  auditFlags: string[];
  recommendedFixes: string[];
  estimatedClaimAmount: number;
  issueCategories: IssueCategoryKey[];
}

export interface IssueCategoryStats {
  issueKey: IssueCategoryKey;
  title: string;
  description: string;
  count: number;
  totalAmount: number;
  percentage: number;
  recommendation: string;
}

export interface IssueBreakdown {
  nonFktpDiagnosis: IssueCategoryStats;
  fornasViolations: IssueCategoryStats;
  irrationalPolypharmacy: IssueCategoryStats;
  sepMismatch: IssueCategoryStats;
}

export interface BatchAuditReport {
  totalClaimsCount: number;
  totalClaimAmount: number;
  layakCairCount: number;
  layakCairAmount: number;
  risikoDisputeCount: number;
  risikoDisputeAmount: number;
  potensiDitolakCount: number;
  potensiDitolakAmount: number;
  passRatio: {
    layakCairPct: number;
    risikoDisputePct: number;
    potensiDitolakPct: number;
  };
  totalDisputeRiskAmount: number;
  issueBreakdown: IssueBreakdown;
  claimReports: ClaimValidationReport[];
}
