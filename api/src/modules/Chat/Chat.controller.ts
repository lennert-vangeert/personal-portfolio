import { NextFunction, Request, Response } from "express";
import OpenAI from "openai";
import rawIndex from "../../data/index.json";

// --- utils (could be moved to separate files) ---
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

function cosine(a: number[], b: number[]) {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const normA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const normB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (normA * normB);
}

// Assume you’ve precomputed this index offline and stored it as JSON
// Example shape: { chunks: [{ chunk: string; embedding: number[] }] }
type KBIndex = { chunks: { chunk: string; embedding: number[] }[] };
const index = rawIndex as unknown as KBIndex;

// --- main controller ---
export const sendChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
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

    // 3. Build context
    const context = scored.map((c) => `— ${c.chunk}`).join("\n");

    // 4. Ask the model with context
    const system = `You are an assistant on a portfolio website that ONLY answers using the provided CONTEXT about the candidate.
If the answer is not in CONTEXT, reply "I don’t know". Be concise and friendly.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Question: ${message}\n\nCONTEXT:\n${context}`,
        },
      ],
    });

    const answer = completion.choices[0]?.message?.content ?? "I don’t know.";

    // 5. Return result
    res.json({
      answer,
      chunksUsed: scored.map((s) => s.chunk), // optional for debugging
    });
  } catch (err) {
    next(err);
  }
};
