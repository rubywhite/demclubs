import type { Config, Context } from "@netlify/functions";

const MAX_DOCUMENT_CHARS = 45_000;

type ReviewRequest = {
  consent?: boolean;
  locale?: "en" | "es";
  importedText?: string;
  answers?: Record<string, string>;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
}

export default async function handler(request: Request, _context: Context) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: ReviewRequest;
  try {
    body = await request.json() as ReviewRequest;
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  if (body.consent !== true) return json({ error: "Explicit consent is required" }, 400);
  if (!body.importedText?.trim()) return json({ error: "Document text is required" }, 400);
  if (body.importedText.length > MAX_DOCUMENT_CHARS) return json({ error: "Document is too large" }, 413);

  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  if (!apiKey) return json({ error: "Enhanced review is not configured" }, 503);

  const locale = body.locale === "es" ? "es" : "en";
  const instructions = locale === "es"
    ? "Eres un asistente educativo de gobernanza de clubes. No des asesoría legal ni afirmes aprobación partidaria. Identifica ambigüedades, contradicciones y preguntas de seguimiento. Responde en español."
    : "You are an educational club-governance assistant. Do not give legal advice or claim party approval. Identify ambiguities, contradictions, and useful follow-up questions. Respond in English.";

  const upstream = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "authorization": `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: Netlify.env.get("OPENAI_MODEL") || "gpt-5-mini",
      store: false,
      instructions,
      input: `Recorded decisions:\n${JSON.stringify(body.answers || {})}\n\nImported bylaws:\n${body.importedText}`,
      text: {
        format: {
          type: "json_schema",
          name: "bylaws_review",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: { summary: { type: "string" } },
            required: ["summary"]
          }
        }
      }
    })
  });

  if (!upstream.ok) return json({ error: "Enhanced review is temporarily unavailable" }, 502);
  const response = await upstream.json() as {
    output_text?: string;
    output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  };
  const outputText = response.output_text || response.output
    ?.flatMap((item) => item.content || [])
    .find((item) => item.type === "output_text")?.text;

  if (!outputText) return json({ error: "No review was returned" }, 502);
  try {
    return json(JSON.parse(outputText));
  } catch {
    return json({ summary: outputText });
  }
}

export const config: Config = { path: "/.netlify/functions/advice" };
