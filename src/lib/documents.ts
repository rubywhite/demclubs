import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import mammoth from "mammoth";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { BuilderProject, Locale } from "../types";
import { buildDraft } from "../data/rulePack";
import { markdownDraft, recommendationsMarkdown } from "./engine";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const safeName = (value: string) => (value || "club-bylaws")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "") || "club-bylaws";

export async function extractDocument(file: File): Promise<{ text: string; scanned: boolean }> {
  const lower = file.name.toLowerCase();
  if (file.size > 10 * 1024 * 1024) throw new Error("FILE_TOO_LARGE");
  if (lower.endsWith(".txt") || file.type === "text/plain") {
    return { text: await file.text(), scanned: false };
  }
  if (lower.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return { text: result.value.trim(), scanned: false };
  }
  if (lower.endsWith(".pdf") || file.type === "application/pdf") {
    const loadingTask = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
    const pdf = await loadingTask.promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" "));
    }
    const text = pages.join("\n\n").trim();
    return { text, scanned: text.replace(/\s/g, "").length < Math.max(80, pdf.numPages * 30) };
  }
  throw new Error("UNSUPPORTED_FILE");
}

function saveText(filename: string, text: string, type = "text/markdown;charset=utf-8") {
  saveAs(new Blob([text], { type }), filename);
}

export function exportMarkdown(project: BuilderProject, locale: Locale) {
  saveText(`${safeName(project.clubName)}-${locale}.md`, markdownDraft(project, locale));
}

export function exportReport(project: BuilderProject, locale: Locale) {
  saveText(`${safeName(project.clubName)}-readiness-${locale}.md`, recommendationsMarkdown(project, locale));
}

export async function exportDocx(project: BuilderProject, locale: Locale) {
  const sections = buildDraft(project.clubName, project.answers);
  const title = project.clubName.trim() || (locale === "en" ? "Club bylaws" : "Estatutos del club");
  const document = new Document({
    creator: "DemClubs Bylaws Builder",
    title,
    description: "Working bylaws draft generated from recorded club decisions.",
    sections: [{
      properties: {
        page: {
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          size: { width: 12240, height: 15840 }
        }
      },
      children: [
        new Paragraph({
          heading: HeadingLevel.TITLE,
          spacing: { after: 240 },
          children: [new TextRun({ text: title, bold: true, color: "000000", size: 34 })]
        }),
        new Paragraph({
          spacing: { after: 360 },
          children: [new TextRun({
            text: locale === "en" ? "Working draft — review before adoption." : "Borrador de trabajo — revisar antes de su adopción.",
            italics: true,
            color: "333333",
            size: 22
          })]
        }),
        ...sections.flatMap((section) => [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            keepNext: true,
            spacing: { before: 320, after: 120 },
            children: [new TextRun({ text: section.title[locale], bold: true, color: "000000", size: 26 })]
          }),
          new Paragraph({
            spacing: { after: 180, line: 320 },
            children: [new TextRun({ text: section.body[locale], color: "000000", size: 23 })]
          })
        ])
      ]
    }]
  });
  const blob = await Packer.toBlob(document);
  saveAs(blob, `${safeName(project.clubName)}-${locale}.docx`);
}

export function exportProject(project: BuilderProject) {
  saveText(`${safeName(project.clubName)}-project.json`, JSON.stringify(project, null, 2), "application/json;charset=utf-8");
}

export async function importProject(file: File): Promise<BuilderProject> {
  const parsed = JSON.parse(await file.text()) as BuilderProject;
  if (parsed.version !== 1 || !parsed.answers || !parsed.locale) throw new Error("INVALID_PROJECT");
  return parsed;
}
