import { NextFunction, Request, Response } from "express";
// Use the full (public-safe) context JSON
import rawBotContext from "../../data/context.json";
import { client, sanitizeHTML } from "./Chat.utils";

/**
 * NOTE:
 * - This version sends the entire context.json to the model as-is.
 * - Ensure context.json contains only public-safe fields (no DOB, precise addresses, secrets, etc.)
 * - If you want to re-enable size-limiting later, uncomment the suggested CONTEXT_CHAR_LIMIT block.
 */

// Helper: convert JSON -> readable text for model
function jsonValueToText(key: string, value: any, indent = ""): string {
  if (value === null || value === undefined) return `${indent}${key}: null\n`;
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return `${indent}${key}: ${String(value)}\n`;
  }
  if (Array.isArray(value)) {
    if (
      value.every((v) => ["string", "number", "boolean"].includes(typeof v))
    ) {
      return `${indent}${key}: ${value.join(", ")}\n`;
    }
    let out = `${indent}${key}:\n`;
    value.forEach((item, i) => {
      if (item && typeof item === "object") {
        out += `${indent}  - ${item.name ?? item.id ?? `item ${i}`}:\n`;
        const keys = Object.keys(item);
        keys.forEach((k) => {
          const v = item[k];
          if (
            v === null ||
            typeof v === "string" ||
            typeof v === "number" ||
            typeof v === "boolean" ||
            (Array.isArray(v) && v.length <= 10)
          ) {
            out += `${indent}      ${k}: ${
              Array.isArray(v) ? v.join(", ") : String(v)
            }\n`;
          } else if (Array.isArray(v)) {
            out += `${indent}      ${k}: [array(${v.length})]\n`;
          } else {
            out += `${indent}      ${k}: {object}\n`;
          }
        });
      } else {
        out += `${indent}  - ${String(item)}\n`;
      }
    });
    return out;
  }
  // object
  let out = `${indent}${key}:\n`;
  for (const subKey of Object.keys(value)) {
    out += jsonValueToText(subKey, value[subKey], indent + "  ");
  }
  return out;
}

// Build readable text for the entire JSON context (all top-level keys)
function buildFullContextText(botContext: any) {
  const sections: string[] = [];
  for (const key of Object.keys(botContext)) {
    const heading = `# ${key}\n`;
    // Keep 'projects' nicely formatted
    if (key === "projects" && Array.isArray(botContext.projects)) {
      let content = heading;
      content += `Projects (${botContext.projects.length}):\n`;
      botContext.projects.forEach((p: any, i: number) => {
        content += `\n## ${i + 1}. ${p.name ?? p.id ?? "Unnamed Project"}\n`;
        const fieldsToShow = [
          "short_description",
          "description",
          "tech",
          "url",
          "year",
        ];
        fieldsToShow.forEach((f) => {
          if (p[f] !== undefined && p[f] !== null) {
            content += `- ${f}: ${
              Array.isArray(p[f]) ? p[f].join(", ") : String(p[f])
            }\n`;
          }
        });
      });
      sections.push(content);
      continue;
    }

    sections.push(heading + jsonValueToText(key, botContext[key]));
  }
  return sections.join("\n");
}

export const sendChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        answer: "error",
        chunksUsed: ["error"],
        error: "Invalid message",
      });
    }

    // Load entire bot context (assumed public-safe)
    const botContext = rawBotContext as any;

    // Build context text from the whole JSON (no filtering)
    let contextText = buildFullContextText(botContext);

    // OPTIONAL: If you ever need to limit prompt size, uncomment and tune:
    // const CONTEXT_CHAR_LIMIT = 14000;
    // if (contextText.length > CONTEXT_CHAR_LIMIT) {
    //   contextText = contextText.slice(0, CONTEXT_CHAR_LIMIT) + "\n\n[Truncated context due to size limit]";
    // }

    // current date in Europe/Brussels, human-friendly
    const currentDate = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Brussels",
      dateStyle: "full",
      timeStyle: "short",
    });

    const system = `You are an assistant on a portfolio website that answers user questions using the provided CONTEXT about the candidate when relevant.
Always follow these rules:

- **Respond using Markdown** for styling (use headings, bullet lists, bold/italic, and fenced code blocks when needed). Do not return plain unformatted text.
- **Use the CONTEXT when it is relevant**: rewrite the information into clean, natural-language paragraphs or concise bullet points. Do NOT copy the CONTEXT word-for-word.
- If the user's question is **not related to the CONTEXT**, do NOT mention the CONTEXT; answer using your general knowledge instead.
- If you **do not know** the factual answer, reply **"I don't know."** Do NOT invent or hallucinate facts.
- **When showing code examples**, always include a fenced code block with the language specified (e.g., \`\`\`js).
- **Do not expose sensitive fields** from the CONTEXT in public replies (for example: date_of_birth, precise town). Omit or redact them unless the user is authenticated and explicitly authorized.
- **When giving dates**, prefer ISO format (YYYY-MM-DD).
- **If asked about availability/hiring**, use the contact.preferred method from CONTEXT and include the candidate's contact email (if allowed by the expose rules).
- Keep answers **concise, friendly, and professional**.
- Answer in the language of the question (detect language automatically).

The current date (Europe/Brussels) is: ${currentDate}`;

    const userPrompt = `Question: ${message}\n\nCONTEXT:\n${contextText}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      max_completion_tokens: 500,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ],
    });

    const answer =
      completion.choices?.[0]?.message?.content ??
      "Something went wrong, try again.";

    // Return the full answer and the list of top-level keys included (for traceability)
    res.json({
      answer: sanitizeHTML(answer),
      chunksUsed: Object.keys(botContext),
      error: null,
    });
  } catch (err: any) {
    console.error("❌ Chat error:", err);

    res.status(500).json({
      answer: "error",
      chunksUsed: ["error"],
      error: err?.message || "Something went wrong, try again.",
    });
  }
};

export const checkChat = async (req: Request, res: Response) => {
  res.json({ status: "ok" });
};
