import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const SHEET_BASE = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTK6eJsO_TeNWWHjY26LgV-OijUmdtK5STsKWvZCZlJQcG5-9cqXmdSuf_XuIBZzcAS9FPWfx_DGk2F";
const CSV_URL = `${SHEET_BASE}/pub?gid=2054796545&single=true&output=csv`;
const HTML_URL = `${SHEET_BASE}/pubhtml/sheet?headers=false&gid=2054796545`;

const topics = {
  membership: ["member", "membership", "eligib", "miembro", "membresía"],
  dues: ["dues", "waiver", "cuota", "exención"],
  meetings: ["meeting", "notice", "special meeting", "reunión", "aviso"],
  remoteParticipation: ["remote", "electronic meeting", "zoom", "virtual", "remot", "electrónic"],
  quorum: ["quorum", "cuórum"],
  officers: ["officer", "president", "secretary", "treasurer", "dirigente", "tesorer"],
  elections: ["nomination", "election", "secret ballot", "nominación", "elección"],
  endorsements: ["endorse", "candidate", "ballot measure", "respaldo", "candidat"],
  finances: ["financial", "funds", "budget", "audit", "finanz", "fondos", "presupuesto"],
  discipline: ["discipline", "suspend", "remove", "expulsion", "disciplina", "suspensión", "expuls"],
  conflicts: ["conflict of interest", "recus", "conflicto de interés", "absten"],
  amendments: ["amend", "enmienda", "enmend"],
  dissolution: ["dissolution", "remaining assets", "disolución", "activos restantes"],
  parliamentaryAuthority: ["robert", "parliamentary", "demeter", "parlamentaria"]
};

async function fetchRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { ...options, signal: AbortSignal.timeout(30_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw lastError;
}

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}

function plainHtml(value) {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted && char === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (!quoted && char === ",") { row.push(field); field = ""; }
    else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(field); field = "";
      if (row.some(Boolean)) rows.push(row);
      row = [];
    } else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift();
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header.trim(), values[index]?.trim() || ""])));
}

function linkedBylawsByClub(html) {
  const result = new Map();
  for (const match of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...match[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => cell[1]);
    if (cells.length < 14) continue;
    const club = plainHtml(cells[0]);
    const href = cells[13].match(/href="([^"]+)"/i)?.[1];
    if (!club || !href) continue;
    const decoded = decodeHtml(href);
    try {
      const url = new URL(decoded, HTML_URL);
      result.set(club, url.hostname === "www.google.com" && url.pathname === "/url" ? url.searchParams.get("q") || decoded : decoded);
    } catch { /* ignore malformed links */ }
  }
  return result;
}

function driveId(url) {
  return url.match(/\/d\/([\w-]+)/)?.[1] || new URL(url).searchParams.get("id");
}

async function responseBuffer(url) {
  const response = await fetchRetry(url, { redirect: "follow", headers: { "user-agent": "DemClubs bylaws research/1.0" } });
  return { bytes: Buffer.from(await response.arrayBuffer()), type: response.headers.get("content-type") || "", finalUrl: response.url };
}

async function extractPdf(bytes) {
  const token = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  const pdfPath = join(tmpdir(), `demclubs-${token}.pdf`);
  const textPath = join(tmpdir(), `demclubs-${token}.txt`);
  await writeFile(pdfPath, bytes);
  try {
    await execFileAsync("pdftotext", ["-layout", pdfPath, textPath]);
    const embeddedText = await readFile(textPath, "utf8");
    if (embeddedText.replace(/\s/g, "").length >= 100) return { text: embeddedText, extraction: "embedded-text" };

    if (process.platform !== "darwin") return { text: embeddedText, extraction: "image-only" };
    const imageDir = await mkdtemp(join(tmpdir(), `demclubs-ocr-${token}-`));
    try {
      const prefix = join(imageDir, "page");
      await execFileAsync("pdftoppm", ["-jpeg", "-r", "180", pdfPath, prefix]);
      const images = (await readdir(imageDir)).filter((name) => name.endsWith(".jpg")).sort().map((name) => join(imageDir, name));
      const moduleCache = join(tmpdir(), "demclubs-swift-module-cache");
      await mkdir(moduleCache, { recursive: true });
      const { stdout } = await execFileAsync("swift", [resolve("scripts/ocr.swift"), ...images], {
        env: { ...process.env, CLANG_MODULE_CACHE_PATH: moduleCache, SWIFT_MODULECACHE_PATH: moduleCache },
        maxBuffer: 20 * 1024 * 1024
      });
      return { text: stdout, extraction: "macos-vision-ocr" };
    } finally {
      await rm(imageDir, { force: true, recursive: true });
    }
  } finally {
    await rm(pdfPath, { force: true });
    await rm(textPath, { force: true });
  }
}

async function fetchDocument(url) {
  const id = driveId(url);
  let target = url;
  if (url.includes("docs.google.com/document") && id) target = `https://docs.google.com/document/d/${id}/export?format=txt`;
  else if (url.includes("drive.google.com") && id) target = `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;
  const { bytes, type, finalUrl } = await responseBuffer(target);
  const hash = createHash("sha256").update(bytes).digest("hex");
  let text;
  let extraction = "plain-text";
  if (type.includes("pdf") || bytes.subarray(0, 4).toString() === "%PDF") {
    const extracted = await extractPdf(bytes);
    text = extracted.text;
    extraction = extracted.extraction;
  }
  else {
    const raw = bytes.toString("utf8");
    const isHtml = type.includes("html") || /^\s*</.test(raw);
    text = isHtml ? plainHtml(raw) : raw;
    extraction = isHtml ? "html-text" : "plain-text";
  }
  if (text.length < 100) throw new Error("No usable text");
  return { text, hash, finalUrl, extraction };
}

function analyze(text) {
  const lower = text.toLocaleLowerCase();
  const matchedTopics = Object.fromEntries(Object.entries(topics).map(([topic, terms]) => [topic, terms.some((term) => lower.includes(term))]));
  return { wordCount: text.split(/\s+/).filter(Boolean).length, matchedTopics };
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const [csvText, htmlText] = await Promise.all([
  fetchRetry(CSV_URL, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) => response.text()),
  fetchRetry(HTML_URL, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) => response.text())
]);
const rows = parseCsv(csvText);
const htmlLinks = linkedBylawsByClub(htmlText);
const clubs = rows.map((row) => ({
  club: row.Club,
  type: row["Club Type"],
  area: row.Area,
  bylawsUrl: /^https?:/.test(row.Bylaws) ? row.Bylaws : htmlLinks.get(row.Club) || null
}));

const analyzed = await mapLimit(clubs, 6, async (club) => {
  if (!club.bylawsUrl) return { ...club, status: "missing", wordCount: null, sha256: null, matchedTopics: null };
  try {
    const document = await fetchDocument(club.bylawsUrl);
    return { ...club, status: "analyzed", extraction: document.extraction, sha256: document.hash, ...analyze(document.text) };
  } catch (error) {
    return { ...club, status: "unavailable", error: String(error.message || error), wordCount: null, sha256: null, matchedTopics: null };
  }
});

const available = analyzed.filter((club) => club.status === "analyzed");
const prevalence = Object.fromEntries(Object.keys(topics).map((topic) => [topic, {
  count: available.filter((club) => club.matchedTopics[topic]).length,
  denominator: available.length,
  percent: available.length ? Math.round(available.filter((club) => club.matchedTopics[topic]).length / available.length * 100) : 0
}]));
const summary = {
  generatedAt: new Date().toISOString(),
  source: { directory: "https://www.sddemocrats.org/clubs.html", sheet: HTML_URL },
  methodology: "Publicly linked text was fetched for aggregate keyword coverage only. Source text is not stored in this repository. A match indicates topic presence, not legal sufficiency.",
  listedClubs: analyzed.length,
  linkedBylaws: analyzed.filter((club) => club.bylawsUrl).length,
  analyzedBylaws: available.length,
  unavailableBylaws: analyzed.filter((club) => club.status === "unavailable").length,
  missingLinks: analyzed.filter((club) => club.status === "missing").map((club) => club.club),
  prevalence,
  clubs: analyzed
};

await mkdir("research", { recursive: true });
await mkdir("src/data", { recursive: true });
await writeFile("research/corpus-summary.json", `${JSON.stringify(summary, null, 2)}\n`);
await writeFile("src/data/corpus.json", `${JSON.stringify({ generatedAt: summary.generatedAt, listedClubs: summary.listedClubs, linkedBylaws: summary.linkedBylaws, analyzedBylaws: summary.analyzedBylaws, prevalence }, null, 2)}\n`);
const lines = [
  "# San Diego Democratic club bylaws corpus",
  "",
  `Generated ${summary.generatedAt}.`,
  "",
  `- ${summary.listedClubs} clubs listed`,
  `- ${summary.linkedBylaws} bylaws links found`,
  `- ${summary.analyzedBylaws} documents analyzed`,
  `- ${summary.unavailableBylaws} linked documents unavailable`,
  `- ${summary.missingLinks.length} clubs without a bylaws link`,
  "",
  "## Topic prevalence",
  "",
  ...Object.entries(prevalence).map(([topic, value]) => `- ${topic}: ${value.count}/${value.denominator} (${value.percent}%)`),
  "",
  "A keyword match indicates that a topic appears in the retrieved text; it does not establish that a provision is complete, internally consistent, legally sufficient, or currently adopted. Full source texts are not stored. See `corpus-summary.json` for document-level provenance, hashes, and retrieval status."
];
await writeFile("research/README.md", `${lines.join("\n")}\n`);
console.log(JSON.stringify({ listed: summary.listedClubs, linked: summary.linkedBylaws, analyzed: summary.analyzedBylaws, unavailable: summary.unavailableBylaws, missing: summary.missingLinks.length }));
