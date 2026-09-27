import type { AuditFinding, BuilderProject, Locale, Readiness } from "../types";
import { buildDraft, questions } from "../data/rulePack";

const coverageRules = [
  { id: "purpose", title: ["Purpose and affiliation", "Propósito y afiliación"], terms: ["purpose", "affiliate", "charter", "propósito", "afiliación"] },
  { id: "membership", title: ["Membership and eligibility", "Membresía y elegibilidad"], terms: ["member", "eligib", "dues", "miembro", "elegib", "cuota"] },
  { id: "meetings", title: ["Meetings and notice", "Reuniones y avisos"], terms: ["meeting", "notice", "special meeting", "reunión", "aviso"] },
  { id: "quorum", title: ["Quorum and voting", "Cuórum y votación"], terms: ["quorum", "vote", "ballot", "cuórum", "votación"] },
  { id: "officers", title: ["Officers and vacancies", "Dirigentes y vacantes"], terms: ["officer", "president", "treasurer", "vacan", "dirigente", "tesorer"] },
  { id: "elections", title: ["Nominations and elections", "Nominaciones y elecciones"], terms: ["nomination", "election", "term of office", "nominación", "elección"] },
  { id: "endorsements", title: ["Endorsements", "Respaldos"], terms: ["endorse", "candidate", "measure", "respaldo", "candidat"] },
  { id: "representation", title: ["Party representatives and rosters", "Representantes partidarios y padrones"], terms: ["representative", "associate", "roster", "delegate", "representante", "asociado", "padrón"] },
  { id: "chartering", title: ["Annual charter compliance", "Cumplimiento de afiliación anual"], terms: ["charter", "twenty", "director of clubs", "afiliación", "veinte", "director de clubes"] },
  { id: "finance", title: ["Finances and records", "Finanzas y registros"], terms: ["financial", "funds", "budget", "records", "finanz", "fondos", "presupuesto"] },
  { id: "discipline", title: ["Discipline and conflicts", "Disciplina y conflictos"], terms: ["discipline", "remove", "suspend", "conflict of interest", "disciplina", "expuls", "conflicto"] },
  { id: "amendments", title: ["Amendments", "Enmiendas"], terms: ["amend", "bylaws may be", "enmend", "estatutos podrán"] },
  { id: "dissolution", title: ["Dissolution", "Disolución"], terms: ["dissolution", "remaining assets", "disolución", "activos restantes"] },
  { id: "parliamentary", title: ["Parliamentary authority", "Autoridad parlamentaria"], terms: ["robert", "parliamentary", "demeter", "parlamentaria"] }
];

export function createProject(): BuilderProject {
  return {
    version: 2,
    mode: "new",
    locale: "en",
    clubName: "",
    clubType: "geographic",
    answers: {},
    customAnswers: {},
    importedText: "",
    updatedAt: new Date().toISOString()
  };
}

export function projectReadiness(project: BuilderProject): AuditFinding[] {
  const decisions: AuditFinding[] = questions.map((question) => ({
    id: question.id,
    title: question.title,
    status: project.answers[question.id] ? "complete" : "missing",
    detail: project.answers[question.id]
      ? { en: "The club recorded this decision.", es: "El club registró esta decisión." }
      : { en: "A decision is required before the draft is ready for club review.", es: "Se requiere una decisión antes de que el borrador esté listo para revisión." },
    authority: question.authority
  }));

  if (!project.importedText.trim()) return decisions;
  const haystack = project.importedText.toLocaleLowerCase();
  const coverage: AuditFinding[] = coverageRules.map((rule) => {
    const matches = rule.terms.filter((term) => haystack.includes(term));
    const status: Readiness = matches.length >= 2 ? "complete" : matches.length === 1 ? "recommended" : "missing";
    return {
      id: `coverage-${rule.id}`,
      title: { en: rule.title[0], es: rule.title[1] },
      status,
      detail: status === "complete"
        ? { en: "Related language was found. Confirm that the rule is complete and internally consistent.", es: "Se encontró lenguaje relacionado. Confirme que la regla sea completa y coherente." }
        : status === "recommended"
          ? { en: "A related term was found, but the provision may be incomplete.", es: "Se encontró un término relacionado, pero la disposición puede estar incompleta." }
          : { en: "No related provision was detected in the imported text.", es: "No se detectó una disposición relacionada en el texto importado." },
      authority: rule.id === "amendments" || rule.id === "membership" ? "required" : "safeguard"
    };
  });

  return [...coverage, ...decisions];
}

export function completion(project: BuilderProject) {
  const decided = questions.filter((question) => Boolean(project.answers[question.id])).length;
  return { decided, total: questions.length, percent: Math.round((decided / questions.length) * 100) };
}

export function markdownDraft(project: BuilderProject, locale: Locale) {
  const title = project.clubName.trim() || (locale === "en" ? "Club bylaws" : "Estatutos del club");
  const sections = buildDraft(project.clubName, project.answers, project.customAnswers);
  return `# ${title}\n\n${locale === "en" ? "Working draft — review before adoption." : "Borrador de trabajo — revisar antes de su adopción."}\n\n${sections.map((section) => `## ${section.title[locale]}\n\n${section.body[locale]}`).join("\n\n")}`;
}

export function recommendationsMarkdown(project: BuilderProject, locale: Locale) {
  const findings = projectReadiness(project);
  const labels: Record<Readiness, Record<Locale, string>> = {
    complete: { en: "Complete", es: "Completo" },
    missing: { en: "Decision needed", es: "Decisión pendiente" },
    conflict: { en: "Potential conflict", es: "Posible conflicto" },
    recommended: { en: "Review recommended", es: "Revisión recomendada" }
  };
  return `# ${locale === "en" ? "Bylaws readiness report" : "Informe de preparación de estatutos"}\n\n${findings.map((finding) => `## ${finding.title[locale]}\n\n**${labels[finding.status][locale]}**\n\n${finding.detail[locale]}`).join("\n\n")}`;
}
