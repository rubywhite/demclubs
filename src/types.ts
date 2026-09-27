export type Locale = "en" | "es";
export type Localized = Record<Locale, string>;
export type Readiness = "complete" | "missing" | "conflict" | "recommended";
export type AuthorityLevel = "required" | "safeguard" | "common" | "preference";

export interface Choice {
  value: string;
  label: Localized;
  description: Localized;
  recommended?: boolean;
}

export interface QuestionDefinition {
  id: string;
  section: string;
  title: Localized;
  prompt: Localized;
  why: Localized;
  authority: AuthorityLevel;
  source: Localized;
  choices: Choice[];
}

export interface BuilderProject {
  version: 2;
  mode: "new" | "audit";
  locale: Locale;
  clubName: string;
  clubType: string;
  answers: Record<string, string>;
  customAnswers: Record<string, Localized>;
  importedText: string;
  updatedAt: string;
}

export interface DraftSection {
  id: string;
  title: Localized;
  body: Localized;
  questionIds: string[];
}

export interface AuditFinding {
  id: string;
  title: Localized;
  status: Readiness;
  detail: Localized;
  authority: AuthorityLevel;
}
