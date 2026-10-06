export const AUDIT_GOALS = [
  "More visibility",
  "More customers",
  "Higher conversion rate",
  "Better user experience",
  "Faster performance",
  "Stronger brand",
] as const;

export const AUDIT_INDUSTRIES = [
  "E-commerce / retail",
  "SaaS / software",
  "Agency / consultancy",
  "Health / medical",
  "Education / edtech",
  "Logistics / supply",
  "Professional services",
  "Hospitality / travel",
  "Non-profit",
  "Other",
] as const;

export const AUDIT_TIMELINES = [
  "As soon as possible",
  "1-3 months",
  "3-6 months",
  "Just exploring",
] as const;

export type AuditGoal = (typeof AUDIT_GOALS)[number];
export type AuditIndustry = (typeof AUDIT_INDUSTRIES)[number];
export type AuditTimeline = (typeof AUDIT_TIMELINES)[number];

export const DEFAULT_AUDIT_GOAL: AuditGoal = "More customers";

export const AUDIT_SHEET_HEADERS = [
  "Submitted",
  "Name",
  "Email",
  "Phone",
  "Website",
  "Industry",
  "Goals",
  "Timeline",
  "Notes",
] as const;

export const START_AUDIT_EVENT = "novafoundry:start-audit";

export const AUDIT_FORM_ID = "audit-form";

export const AUDIT_INTAKE_ENDPOINT = "/api/audit";
