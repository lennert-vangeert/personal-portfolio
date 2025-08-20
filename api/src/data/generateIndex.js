const fs = require("fs");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Load your markdown
const text = fs.readFileSync(`${__dirname}/me.md`, "utf-8");

/**
 * Split markdown into chunks by headings (#, ##, ###, etc.)
 * Guarantees each top-level section (and its content) is a separate chunk.
 */
function chunkTextByHeadings(text) {
  // Split whenever a new heading starts
  const sections = text.split(/\n(?=#)/g).map(s => s.trim()).filter(Boolean);

  // Optional: further split if a section is *still* too long
  const maxChars = 250;
  const chunks = [];
  for (const sec of sections) {
    if (sec.length <= maxChars) {
      chunks.push(sec);
    } else {
      // fallback: split by paragraphs if section is very big
      const paragraphs = sec.split("\n\n");
      let buffer = "";
      for (const para of paragraphs) {
        if ((buffer + "\n\n" + para).length > maxChars) {
          if (buffer) chunks.push(buffer);
          buffer = para;
        } else {
          buffer += buffer ? "\n\n" + para : para;
        }
      }
      if (buffer) chunks.push(buffer);
    }
  }

  return chunks;
}

async function summarizeChunk(chunk) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Summarize the given text in 1–2 concise sentences for quick reference.",
      },
      { role: "user", content: chunk },
    ],
  });

  return res.choices[0]?.message?.content?.trim() || "";
}

async function main() {
  const chunks = chunkTextByHeadings(text);
  const index = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`Embedding + summarizing chunk ${i + 1} / ${chunks.length}`);

    // Get embedding
    const embedRes = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: chunks[i],
    });
    const embedding = embedRes.data[0].embedding;

    // Get summary
    const summary = await summarizeChunk(chunks[i]);

    index.push({ chunk: chunks[i], embedding, summary });
  }

  fs.writeFileSync(
    `${__dirname}/index.json`,
    JSON.stringify({ chunks: index }, null, 2)
  );
  console.log(`✅ index.json generated with ${index.length} chunks`);
}

main().catch(console.error);
