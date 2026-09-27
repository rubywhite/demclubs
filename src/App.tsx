import { useEffect, useMemo, useRef, useState } from "react";
import { del, get, set } from "idb-keyval";
import {
  AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronDown, Clipboard,
  BookOpen, Download, FileCheck2, FileText, Languages, ListChecks, LockKeyhole,
  ShieldCheck, Sparkles, Upload, X
} from "lucide-react";
import { authorityLabels, buildDraft, questions, sections } from "./data/rulePack";
import { completion, createProject, projectReadiness, recommendationsMarkdown } from "./lib/engine";
import type { BuilderProject, Locale, Readiness } from "./types";

const STORAGE_KEY = "demclubs-bylaws-project-v1";

const copy = {
  en: {
    skip: "Skip to current decision", title: "DemClubs", product: "Bylaws Builder", new: "Create new", audit: "Review existing",
    private: "Saved on this device", saving: "Saving on this device…", saveError: "Save failed—export a backup", language: "Español", club: "Club name", type: "Club type", geographic: "Geographic",
    affinity: "Affinity", student: "Student / academic", decision: "Decision", of: "of", answered: "recorded", previous: "Previous",
    next: "Next decision", review: "Review results", required: "Required before review", impact: "Draft impact", notSet: "No option recorded",
    import: "Bring in existing bylaws", importHelp: "Upload a text-based PDF, DOCX, or TXT file, or paste text. It stays in this browser unless you opt into AI review.", choose: "Choose file",
    paste: "Paste bylaws text", imported: "Document text imported", scanned: "This PDF appears to be scanned. OCR is not included; paste accessible text instead.",
    unsupported: "Use a PDF, DOCX, or TXT file under 10 MB.", draft: "Draft", report: "Readiness", sources: "Sources & method",
    working: "Working draft", unresolved: "unresolved decisions", ready: "Ready for club review", copyDraft: "Copy draft", copied: "Copied",
    docx: "Download DOCX", markdown: "Download Markdown", reportDownload: "Download report", ai: "Enhanced review",
    aiHelp: "Optional AI can suggest follow-up questions and clearer wording. The rules and your recorded decisions remain authoritative.",
    consent: "I agree to send the imported text and recorded answers to OpenAI for this review. DemClubs requests no response storage.", askAi: "Run enhanced review",
    aiUnavailable: "Enhanced review is not configured. The deterministic audit and draft remain available.", reset: "Start over", delete: "Delete local project",
    project: "Project", exportProject: "Export project", importProject: "Import project", privacy: "Privacy", disclaimer: "Educational drafting assistance—not legal advice or party approval.",
    methodTitle: "Sources and classification", methodBody: "Mandatory charter and endorsement provisions are drawn from the current published SDCDP Bylaws and Policies and Procedures. CDP rules govern eligibility and selection for state pre-endorsing conference representatives. Those requirements are separated from recommended safeguards, common local practice, and club preferences. The 2015 Club Manual model remains drafting context, not the controlling authority.",
    close: "Close", selectFirst: "Record an option to update this clause.", reviewLabel: "Status", clearText: "Remove imported text"
  },
  es: {
    skip: "Ir a la decisión actual", title: "DemClubs", product: "Constructor de Estatutos", new: "Crear nuevos", audit: "Revisar existentes",
    private: "Guardado en este dispositivo", saving: "Guardando en este dispositivo…", saveError: "Falló el guardado; exporte una copia", language: "English", club: "Nombre del club", type: "Tipo de club", geographic: "Geográfico",
    affinity: "Afinidad", student: "Estudiantil / académico", decision: "Decisión", of: "de", answered: "registradas", previous: "Anterior",
    next: "Siguiente decisión", review: "Revisar resultados", required: "Requerido antes de la revisión", impact: "Impacto en el borrador", notSet: "Ninguna opción registrada",
    import: "Incorporar estatutos existentes", importHelp: "Suba un PDF con texto, DOCX o TXT, o pegue texto. Permanecerá en este navegador salvo que active la revisión con IA.", choose: "Elegir archivo",
    paste: "Pegue el texto de los estatutos", imported: "Texto del documento importado", scanned: "Este PDF parece escaneado. La versión inicial no incluye OCR; pegue texto accesible.",
    unsupported: "Use un archivo PDF, DOCX o TXT de menos de 10 MB.", draft: "Borrador", report: "Preparación", sources: "Fuentes y método",
    working: "Borrador de trabajo", unresolved: "decisiones pendientes", ready: "Listo para revisión del club", copyDraft: "Copiar borrador", copied: "Copiado",
    docx: "Descargar DOCX", markdown: "Descargar Markdown", reportDownload: "Descargar informe", ai: "Revisión mejorada",
    aiHelp: "La IA opcional puede sugerir preguntas de seguimiento y redacción más clara. Las reglas y decisiones registradas siguen siendo la autoridad.",
    consent: "Acepto enviar el texto importado y las respuestas registradas a OpenAI para esta revisión. DemClubs solicita que no se almacene la respuesta.", askAi: "Ejecutar revisión mejorada",
    aiUnavailable: "La revisión mejorada no está configurada. La auditoría determinista y el borrador siguen disponibles.", reset: "Comenzar de nuevo", delete: "Eliminar proyecto local",
    project: "Proyecto", exportProject: "Exportar proyecto", importProject: "Importar proyecto", privacy: "Privacidad", disclaimer: "Asistencia educativa para redactar; no constituye asesoría legal ni aprobación del partido.",
    methodTitle: "Fuentes y clasificación", methodBody: "Las disposiciones obligatorias de afiliación y respaldo provienen de los Estatutos y las Políticas y Procedimientos vigentes publicados por SDCDP. Las reglas del CDP rigen la elegibilidad y selección de representantes para conferencias estatales de pre-respaldo. Estos requisitos se distinguen de salvaguardas recomendadas, prácticas locales comunes y preferencias del club. El modelo de 2015 del Manual de Clubes sigue siendo contexto de redacción, no la autoridad rectora.",
    close: "Cerrar", selectFirst: "Registre una opción para actualizar esta cláusula.", reviewLabel: "Estado", clearText: "Eliminar texto importado"
  }
} as const;

const statusText: Record<Readiness, Record<Locale, string>> = {
  complete: { en: "Recorded", es: "Registrado" }, missing: { en: "Decision needed", es: "Decisión pendiente" },
  conflict: { en: "Potential conflict", es: "Posible conflicto" }, recommended: { en: "Review recommended", es: "Revisión recomendada" }
};

export default function App() {
  const [project, setProject] = useState<BuilderProject>(createProject);
  const [hydrated, setHydrated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showOverview, setShowOverview] = useState(true);
  const [view, setView] = useState<"builder" | "draft" | "report">("builder");
  const [notice, setNotice] = useState("");
  const [fileError, setFileError] = useState("");
  const [methodOpen, setMethodOpen] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");
  const projectInput = useRef<HTMLInputElement>(null);
  const methodDialog = useRef<HTMLDialogElement>(null);
  const t = copy[project.locale];
  const question = questions[current];
  const progress = completion(project);
  const draft = useMemo(() => buildDraft(project.clubName, project.answers, project.customAnswers), [project.clubName, project.answers, project.customAnswers]);
  const findings = useMemo(() => projectReadiness(project), [project]);
  const affected = draft.filter((item) => item.questionIds.includes(question.id));

  useEffect(() => {
    get<BuilderProject & { version: number }>(STORAGE_KEY).then((saved) => {
      if (saved && [1, 2].includes(saved.version)) {
        setProject({ ...saved, version: 2, customAnswers: saved.customAnswers || {} });
        if (Object.keys(saved.answers || {}).length) setShowOverview(false);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setSaveStatus("saving");
    const timer = window.setTimeout(() => {
      set(STORAGE_KEY, { ...project, updatedAt: new Date().toISOString() })
        .then(() => setSaveStatus("saved"))
        .catch(() => setSaveStatus("error"));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [project, hydrated]);

  useEffect(() => {
    const dialog = methodDialog.current;
    if (!dialog) return;
    if (methodOpen && !dialog.open) dialog.showModal();
    if (!methodOpen && dialog.open) dialog.close();
  }, [methodOpen]);

  const update = (patch: Partial<BuilderProject>) => setProject((value) => ({ ...value, ...patch }));
  const answer = (value: string) => update({ answers: { ...project.answers, [question.id]: value } });
  const chooseOther = () => {
    const recommended = question.choices.find((choice) => choice.recommended) || question.choices[0];
    update({
      answers: { ...project.answers, [question.id]: "other" },
      customAnswers: {
        ...project.customAnswers,
        [question.id]: project.customAnswers[question.id] || { en: recommended.label.en, es: recommended.label.es }
      }
    });
  };
  const editOther = (value: string) => update({
    answers: { ...project.answers, [question.id]: "other" },
    customAnswers: {
      ...project.customAnswers,
      [question.id]: { ...(project.customAnswers[question.id] || { en: "", es: "" }), [project.locale]: value }
    }
  });
  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 1800);
  };

  async function handleDocument(file?: File) {
    if (!file) return;
    setFileError("");
    try {
      const { extractDocument } = await import("./lib/documents");
      const result = await extractDocument(file);
      if (result.scanned) setFileError(t.scanned);
      else update({ importedText: result.text, mode: "audit" });
    } catch {
      setFileError(t.unsupported);
    }
  }

  async function handleProject(file?: File) {
    if (!file) return;
    try {
      const { importProject } = await import("./lib/documents");
      setProject(await importProject(file));
      setCurrent(0);
      setShowOverview(false);
      setView("builder");
    } catch {
      setFileError(project.locale === "en" ? "That project file is not valid." : "Ese archivo de proyecto no es válido.");
    }
  }

  async function copyDraft() {
    const text = draft.map((item) => `${item.title[project.locale]}\n\n${item.body[project.locale]}`).join("\n\n");
    await navigator.clipboard.writeText(text);
    flash(t.copied);
  }

  const exportProjectFile = async () => (await import("./lib/documents")).exportProject(project);
  const exportMarkdownFile = async () => (await import("./lib/documents")).exportMarkdown(project, project.locale);
  const exportDocxFile = async () => (await import("./lib/documents")).exportDocx(project, project.locale);
  const exportReportFile = async () => (await import("./lib/documents")).exportReport(project, project.locale);

  async function enhancedReview() {
    if (!aiConsent || !project.importedText) return;
    setAiLoading(true);
    setAiResult("");
    try {
      const response = await fetch("/.netlify/functions/advice", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ consent: true, locale: project.locale, importedText: project.importedText.slice(0, 45000), answers: project.answers })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setAiResult(data.summary || "");
    } catch {
      setAiResult(t.aiUnavailable);
    } finally {
      setAiLoading(false);
    }
  }

  async function clearProject() {
    const confirmed = window.confirm(project.locale === "en"
      ? "Delete this device-only project? Export a backup first if you may need it. This cannot be undone."
      : "¿Eliminar este proyecto guardado en el dispositivo? Exporte primero una copia si puede necesitarla. Esta acción no se puede deshacer.");
    if (!confirmed) return;
    await del(STORAGE_KEY);
    setProject(createProject());
    setCurrent(0);
    setShowOverview(true);
    setView("builder");
    setAiResult("");
  }

  const move = (direction: number) => {
    const next = Math.min(questions.length - 1, Math.max(0, current + direction));
    setCurrent(next);
    document.getElementById("current-decision")?.focus();
  };

  if (!hydrated) return <div className="loading-state" role="status">DemClubs</div>;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#current-decision">{t.skip}</a>
      <header className="masthead">
        <a className="brand" href="#top" aria-label={`${t.title} ${t.product}`}>
          <span className="brand-mark" aria-hidden="true">D</span>
          <span><strong>{t.title}</strong><small>{t.product}</small></span>
        </a>
        <div className="mode-switch" aria-label={project.locale === "en" ? "Project mode" : "Modo del proyecto"}>
          <button aria-pressed={project.mode === "new"} className={project.mode === "new" ? "active" : ""} onClick={() => update({ mode: "new" })}>{t.new}</button>
          <button aria-pressed={project.mode === "audit"} className={project.mode === "audit" ? "active" : ""} onClick={() => update({ mode: "audit" })}>{t.audit}</button>
        </div>
        <div className="masthead-actions">
          <span className={`privacy-note ${saveStatus === "error" ? "save-error" : ""}`} role="status"><LockKeyhole size={14} /> {saveStatus === "saving" ? t.saving : saveStatus === "error" ? t.saveError : t.private}</span>
          <button className="language-button" onClick={() => update({ locale: project.locale === "en" ? "es" : "en" })}>
            <Languages size={17} /> {t.language}
          </button>
        </div>
      </header>

      <section className="project-strip" id="top">
        <label>{t.club}<input value={project.clubName} onChange={(event) => update({ clubName: event.target.value })} placeholder={project.locale === "en" ? "e.g. Coastal Democratic Club" : "p. ej., Club Demócrata Costero"} /></label>
        <label>{t.type}<span className="select-wrap"><select value={project.clubType} onChange={(event) => update({ clubType: event.target.value })}><option value="geographic">{t.geographic}</option><option value="affinity">{t.affinity}</option><option value="student">{t.student}</option></select><ChevronDown size={16} /></span></label>
        <div className="project-tools">
          <button onClick={exportProjectFile}><Download size={16} />{t.exportProject}</button>
          <button onClick={() => projectInput.current?.click()}><Upload size={16} />{t.importProject}</button>
          <input ref={projectInput} className="visually-hidden" type="file" accept="application/json,.json" onChange={(event) => handleProject(event.target.files?.[0])} />
        </div>
      </section>

      {project.mode === "audit" && (
        <section className="import-band" aria-labelledby="import-title">
          <div><h2 id="import-title">{t.import}</h2><p>{t.importHelp}</p></div>
          <label className="file-button"><Upload size={18} />{t.choose}<input type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={(event) => handleDocument(event.target.files?.[0])} /></label>
          <textarea aria-label={t.paste} value={project.importedText} onChange={(event) => update({ importedText: event.target.value })} placeholder={t.paste} />
          {project.importedText && <button className="text-button" onClick={() => update({ importedText: "" })}><X size={15} />{t.clearText}</button>}
          {fileError && <p className="file-error" role="alert"><AlertTriangle size={16} />{fileError}</p>}
        </section>
      )}

      <nav className="view-tabs" aria-label={project.locale === "en" ? "Workspace views" : "Vistas del espacio de trabajo"}>
        <button aria-pressed={view === "builder"} className={view === "builder" ? "active" : ""} onClick={() => setView("builder")}>{t.product}</button>
        <button aria-pressed={view === "draft"} className={view === "draft" ? "active" : ""} onClick={() => setView("draft")}>{t.draft}</button>
        <button aria-pressed={view === "report"} className={view === "report" ? "active" : ""} onClick={() => setView("report")}>{t.report}<span>{findings.filter((item) => item.status !== "complete").length}</span></button>
      </nav>

      {view === "builder" && showOverview && (
        <main className="welcome-layout" aria-labelledby="overview-title">
          <section className="welcome-copy">
            <BookOpen size={30} aria-hidden="true" />
            <h1 id="overview-title">{project.locale === "en" ? "Build bylaws one decision at a time" : "Cree estatutos una decisión a la vez"}</h1>
            <p>{project.locale === "en"
              ? "DemClubs turns your club’s governance choices into a detailed working draft. It follows the topics in the SDCDP Club Manual’s model bylaws and shows what still needs member review."
              : "DemClubs convierte las decisiones de gobierno de su club en un borrador de trabajo detallado. Sigue los temas de los estatutos modelo del Manual de Clubes de SDCDP y muestra lo que aún requiere revisión de los miembros."}</p>
            <div className="welcome-actions">
              <button className="primary" onClick={() => setShowOverview(false)}>{project.locale === "en" ? "Begin the first decision" : "Comenzar la primera decisión"}<ArrowRight size={17} /></button>
              <button onClick={() => setView("draft")}>{project.locale === "en" ? "Preview the draft structure" : "Ver la estructura del borrador"}</button>
            </div>
          </section>
          <ol className="welcome-steps">
            <li><ListChecks aria-hidden="true" /><div><strong>{project.locale === "en" ? "Choose or write your rule" : "Elija o escriba su regla"}</strong><p>{project.locale === "en" ? "Compare practical alternatives. Every question also includes an editable Other option seeded with recommended language." : "Compare alternativas prácticas. Cada pregunta también incluye una opción editable Otra con texto recomendado inicial."}</p></div></li>
            <li><FileCheck2 aria-hidden="true" /><div><strong>{project.locale === "en" ? "Watch the draft take shape" : "Vea cómo toma forma el borrador"}</strong><p>{project.locale === "en" ? "Your answers update the relevant article, while unresolved and required decisions remain visible." : "Sus respuestas actualizan el artículo correspondiente, mientras las decisiones pendientes y obligatorias siguen visibles."}</p></div></li>
            <li><ShieldCheck aria-hidden="true" /><div><strong>{project.locale === "en" ? "Review, edit, and adopt" : "Revise, edite y adopte"}</strong><p>{project.locale === "en" ? "Export an editable DOCX or Markdown draft for committee and member review. Work stays on this device unless you explicitly request AI review." : "Exporte un borrador DOCX o Markdown editable para revisión del comité y los miembros. El trabajo permanece en este dispositivo salvo que solicite expresamente una revisión con IA."}</p></div></li>
          </ol>
          <p className="welcome-note">{project.locale === "en" ? `${questions.length} decisions · usually 20–30 minutes · educational drafting assistance, not party approval` : `${questions.length} decisiones · normalmente 20–30 minutos · asistencia educativa, no aprobación del partido`}</p>
        </main>
      )}

      {view === "builder" && !showOverview && (
        <main className="ledger-layout">
          <aside className="section-rail" aria-label={project.locale === "en" ? "Bylaws sections" : "Secciones de estatutos"}>
            <div className="progress-block"><span>{progress.percent}%</span><small>{progress.decided} / {progress.total} {t.answered}</small><div className="progress-track"><i style={{ width: `${progress.percent}%` }} /></div></div>
            <label className="mobile-section-select">{project.locale === "en" ? "Bylaws section" : "Sección de estatutos"}<span className="select-wrap"><select value={question.section} onChange={(event) => setCurrent(questions.findIndex((item) => item.section === event.target.value))}>{sections.map((section) => <option key={section.id} value={section.id}>{section.label[project.locale]}</option>)}</select><ChevronDown size={16} /></span></label>
            <ol>
              {sections.map((section) => {
                const indexes = questions.map((item, index) => item.section === section.id ? index : -1).filter((index) => index >= 0);
                const completeCount = indexes.filter((index) => project.answers[questions[index].id]).length;
                const isCurrent = question.section === section.id;
                return <li key={section.id}><button className={isCurrent ? "current" : ""} onClick={() => setCurrent(indexes[0])}><span>{section.label[project.locale]}</span><small>{completeCount}/{indexes.length}</small></button></li>;
              })}
            </ol>
          </aside>

          <section className="decision-sheet" aria-live="polite">
            <div className="decision-meta"><span>{t.decision} {current + 1} {t.of} {questions.length}</span><span className={`authority ${question.authority}`}>{authorityLabels[question.authority][project.locale]}</span></div>
            <h1 id="current-decision" tabIndex={-1}>{question.title[project.locale]}</h1>
            <p className="question-prompt">{question.prompt[project.locale]}</p>
            <fieldset>
              <legend className="visually-hidden">{question.title[project.locale]}</legend>
              {question.choices.map((choice) => {
                const checked = project.answers[question.id] === choice.value;
                return (
                  <label className={`choice-row ${checked ? "selected" : ""}`} key={choice.value}>
                    <input type="radio" name={question.id} value={choice.value} checked={checked} onChange={() => answer(choice.value)} />
                    <span className="choice-control" aria-hidden="true">{checked && <Check size={15} />}</span>
                    <span><strong>{choice.label[project.locale]}{choice.recommended && <em>{project.locale === "en" ? "Recommended" : "Recomendado"}</em>}</strong><small>{choice.description[project.locale]}</small></span>
                  </label>
                );
              })}
              <label className={`choice-row choice-other ${project.answers[question.id] === "other" ? "selected" : ""}`}>
                <input type="radio" name={question.id} value="other" checked={project.answers[question.id] === "other"} onChange={chooseOther} />
                <span className="choice-control" aria-hidden="true">{project.answers[question.id] === "other" && <Check size={15} />}</span>
                <span><strong>{project.locale === "en" ? "Other — edit the recommended language" : "Otra — edite el texto recomendado"}</strong><small>{project.locale === "en" ? "Use a club-specific rule. Selecting this starts with the recommended text rather than a blank field." : "Use una regla específica del club. Al seleccionarla, comienza con el texto recomendado en lugar de un campo vacío."}</small></span>
              </label>
              {project.answers[question.id] === "other" && <label className="custom-answer"><span>{project.locale === "en" ? "Text to use in the draft" : "Texto que se usará en el borrador"}</span><textarea value={project.customAnswers[question.id]?.[project.locale] || ""} onChange={(event) => editOther(event.target.value)} /></label>}
            </fieldset>
            <div className="why-row"><strong>{project.locale === "en" ? "Why this matters" : "Por qué importa"}</strong><p>{question.why[project.locale]}</p></div>
            <div className="decision-navigation">
              <button disabled={current === 0} onClick={() => move(-1)}><ArrowLeft size={17} />{t.previous}</button>
              <button className="primary" onClick={() => current === questions.length - 1 ? setView("draft") : move(1)}>{current === questions.length - 1 ? t.review : t.next}<ArrowRight size={17} /></button>
            </div>
          </section>

          <aside className="record-margin" role="status" aria-live="polite" aria-atomic="true">
            <div className="margin-heading"><span>{t.reviewLabel}</span><strong className={project.answers[question.id] ? "status-complete" : "status-missing"}>{project.answers[question.id] ? statusText.complete[project.locale] : statusText.missing[project.locale]}</strong></div>
            <div className="margin-section"><span>{project.locale === "en" ? "Basis" : "Fundamento"}</span><p>{question.source[project.locale]}</p></div>
            <div className="margin-section"><span>{t.impact}</span>{affected.length ? affected.map((item) => <div className="clause-impact" key={item.id}><strong>{item.title[project.locale]}</strong><p>{project.answers[question.id] ? item.body[project.locale] : t.selectFirst}</p></div>) : <p>{t.selectFirst}</p>}</div>
          </aside>
        </main>
      )}

      {view === "draft" && (
        <main className="result-layout">
          <header className="result-header"><div><span className={progress.percent === 100 ? "ready" : "working"}>{progress.percent === 100 ? t.ready : t.working}</span><h1>{project.clubName || (project.locale === "en" ? "Club bylaws" : "Estatutos del club")}</h1><p>{progress.percent === 100 ? t.disclaimer : `${questions.length - progress.decided} ${t.unresolved}`}</p></div><div className="export-actions"><button onClick={copyDraft}><Clipboard size={16} />{t.copyDraft}</button><button onClick={exportMarkdownFile}><FileText size={16} />{t.markdown}</button><button className="primary" onClick={exportDocxFile}><Download size={16} />{t.docx}</button></div></header>
          <article className="draft-document">{draft.map((section) => <section key={section.id} className={section.questionIds.some((id) => !project.answers[id]) ? "unresolved" : ""}><h2>{section.title[project.locale]}</h2>{section.body[project.locale].split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>)}</article>
        </main>
      )}

      {view === "report" && (
        <main className="report-layout">
          <header className="result-header"><div><span className="working">{t.report}</span><h1>{project.locale === "en" ? "What to resolve before adoption" : "Qué resolver antes de la adopción"}</h1><p>{t.disclaimer}</p></div><button onClick={exportReportFile}><Download size={16} />{t.reportDownload}</button></header>
          <div className="findings-list">{findings.map((finding) => <section key={finding.id} className={`finding ${finding.status}`}><div><span>{statusText[finding.status][project.locale]}</span><h2>{finding.title[project.locale]}</h2></div><p>{finding.detail[project.locale]}</p></section>)}</div>
          {project.importedText && <section className="ai-review"><div><Sparkles size={19} /><h2>{t.ai}</h2></div><p>{t.aiHelp}</p><label className="consent"><input type="checkbox" checked={aiConsent} onChange={(event) => setAiConsent(event.target.checked)} /><span>{t.consent}</span></label><button className="primary" disabled={!aiConsent || aiLoading} onClick={enhancedReview}>{aiLoading ? (project.locale === "en" ? "Reviewing…" : "Revisando…") : t.askAi}</button>{aiResult && <p className="ai-result">{aiResult}</p>}</section>}
        </main>
      )}

      <footer className="footer"><p>{t.disclaimer}</p><div><button onClick={() => setMethodOpen(true)}>{t.sources}</button><button onClick={clearProject}>{t.delete}</button></div></footer>
      {notice && <div className="toast" role="status">{notice}</div>}

      <dialog ref={methodDialog} className="dialog" aria-labelledby="method-title" onClose={() => setMethodOpen(false)}><button className="dialog-close" aria-label={t.close} onClick={() => setMethodOpen(false)}><X /></button><ShieldCheck size={24} /><h2 id="method-title">{t.methodTitle}</h2><p>{t.methodBody}</p><h3>{project.locale === "en" ? "Controlling party documents" : "Documentos partidarios rectores"}</h3><ul><li><a href="https://www.sddemocrats.org/" target="_blank" rel="noreferrer">San Diego County Democratic Party</a></li><li><a href="https://docs.google.com/document/u/0/d/1n47aKUdh-cEpVpC7N_-2_w5dCZZxz255/" target="_blank" rel="noreferrer">SDCDP Bylaws</a></li><li><a href="https://docs.google.com/document/u/0/d/1xtEULc3GuBF_zxGOwzMUj4u4dL0LZiJF/" target="_blank" rel="noreferrer">SDCDP Policies and Procedures</a></li><li><a href="https://cadem.org/wp-content/uploads/2026/02/CDP-BYLAWS-October-2025-FINAL.pdf" target="_blank" rel="noreferrer">California Democratic Party Bylaws &amp; Rules — October 2025 (PDF)</a></li></ul><h3>{project.locale === "en" ? "Research context" : "Contexto de investigación"}</h3><ul><li><a href="https://www.sddemocrats.org/clubs.html" target="_blank" rel="noreferrer">San Diego County Democratic Party club directory</a></li><li><a href="https://www.sddemocrats.org/resources.html" target="_blank" rel="noreferrer">County Party club resources and Club Manual</a></li><li><a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTK6eJsO_TeNWWHjY26LgV-OijUmdtK5STsKWvZCZlJQcG5-9cqXmdSuf_XuIBZzcAS9FPWfx_DGk2F/pubhtml?gid=2054796545&single=true" target="_blank" rel="noreferrer">2026 chartered-clubs source sheet</a></li></ul><button className="primary" onClick={() => setMethodOpen(false)}>{t.close}</button></dialog>
    </div>
  );
}
