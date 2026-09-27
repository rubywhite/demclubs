import { describe, expect, it } from "vitest";
import { questions } from "../data/rulePack";
import { completion, createProject, markdownDraft, projectReadiness } from "./engine";

describe("deterministic bylaws engine", () => {
  it("starts with every decision unresolved", () => {
    const project = createProject();
    expect(completion(project)).toEqual({ decided: 0, total: questions.length, percent: 0 });
    expect(projectReadiness(project).filter((item) => item.status === "missing")).toHaveLength(questions.length);
  });

  it("marks a completed questionnaire ready", () => {
    const project = createProject();
    project.answers = Object.fromEntries(questions.map((question) => [question.id, question.choices[0].value]));
    expect(completion(project).percent).toBe(100);
    expect(projectReadiness(project).every((item) => item.status === "complete")).toBe(true);
  });

  it("audits imported text without changing recorded decisions", () => {
    const project = createProject();
    project.importedText = "Membership eligibility and dues. Meetings require notice and quorum. Members vote by ballot.";
    const results = projectReadiness(project);
    expect(results.find((item) => item.id === "coverage-membership")?.status).toBe("complete");
    expect(results.find((item) => item.id === "membership_eligibility")?.status).toBe("missing");
  });

  it("generates a complete Spanish working draft", () => {
    const project = createProject();
    project.locale = "es";
    project.clubName = "Club Demócrata Costero";
    project.answers = Object.fromEntries(questions.map((question) => [question.id, question.choices[0].value]));
    const output = markdownDraft(project, "es");
    expect(output).toContain("Club Demócrata Costero");
    expect(output).toContain("Artículo XII");
    expect(output).not.toContain("DECISIÓN PENDIENTE");
  });

  it("uses editable Other language in the generated draft", () => {
    const project = createProject();
    project.answers.membership_eligibility = "other";
    project.customAnswers.membership_eligibility = {
      en: "Voting membership is open to registered Democrats and pledged Democrats.",
      es: "La membresía con voto está abierta a demócratas registrados y comprometidos."
    };
    const output = markdownDraft(project, "en");
    expect(output).toContain("Voting membership is open to registered Democrats and pledged Democrats.");
  });

  it("includes current County endorsement and charter requirements", () => {
    const project = createProject();
    project.answers = Object.fromEntries(questions.map((question) => [question.id, question.choices[0].value]));
    const output = markdownDraft(project, "en");
    expect(output).toContain("at least five business days beforehand");
    expect(output).toContain("not the official endorsement of the California Democratic Party");
    expect(output).toContain("within 30 days");
  });

  it("includes current CDP pre-endorsing representative rules", () => {
    const project = createProject();
    project.answers = Object.fromEntries(questions.map((question) => [question.id, question.choices[0].value]));
    const output = markdownDraft(project, "en");
    expect(output).toContain("Equal Division Rule");
    expect(output).toContain("may represent only one club");
    expect(output).toContain("may not vote by proxy");
    expect(output).toContain("at least 48 hours before the Area Caucus");
  });
});
