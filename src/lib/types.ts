import { z } from "zod";

export const Icd10CodeSchema = z.object({
  code: z.string(),
  name: z.string(),
  chapter: z.string(),
  isChronic: z.boolean().default(false),
  isPrbEligible: z.boolean().default(false), // Program Rujuk Balik
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
    "Kortikosteroid"
  ]),
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
  category: "Diagnosa" | "Obat Fornas" | "Restriksi BPJS" | "Kelayakan FKTP";
  passed: boolean;
  message: string;
  severity: "CRITICAL" | "WARNING" | "PASS";
}

export interface ClaimValidationReport {
  caseId: string;
  patientName: string;
  bpjsNumber: string;
  primaryDiagnosis: string;
  score: number;
  status: "LAYAK_CAIR" | "RISIKO_DISPUTE" | "POTENSI_DITOLAK";
  checks: ClinicalCheckItem[];
  auditFlags: string[];
  recommendedFixes: string[];
  estimatedClaimAmount: number;
}
