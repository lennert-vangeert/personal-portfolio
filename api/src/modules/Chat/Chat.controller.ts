import { NextFunction, Request, Response } from "express";
import rawIndex from "../../data/index.json";
import { KBIndex } from "./Chat.types";
import { client, cosine, sanitizeHTML } from "./Chat.utils";

const index = rawIndex as unknown as KBIndex;

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

    // 1. Create embedding for the question
    const er = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });
    const qvec = er.data[0].embedding as number[];

    // 2. Rank chunks by similarity
    const scored = index.chunks
      .map((c) => ({ ...c, score: cosine(qvec, c.embedding) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // 3. Build context (full text, not summary!)
    const context = scored.map((c) => `— ${c.chunk}`).join("\n");
    const currentDate = new Date().toISOString();
    // 4. Ask the model with context
    const system = `You are an assistant on a portfolio website that ONLY answers using the provided CONTEXT about the candidate. 
Do NOT copy the context word-for-word or include raw Markdown (like *, #, **, ***, [], ()). 
Instead, rewrite the information into clean, natural language paragraphs or, if helpful, into simple bullet points with no special symbols. 
The tone should be concise, friendly, and professional. 
If the answer is not in CONTEXT, reply: "I don’t know, the answer to your question doesn't seem to be in the provided context.". The current data is ${currentDate}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Question: ${message}\n\nCONTEXT:\n${context}`,
        },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content ??
      "Something went wrong, try again.";

    // 5. Return result with summaries instead of full chunks
    res.json({
      answer: sanitizeHTML(answer),
      chunksUsed: scored.map((s) => s.summary ?? "No summary available"),
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
