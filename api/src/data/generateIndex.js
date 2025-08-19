const fs = require("fs");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});
console.log(process.env.OPENAI_API_KEY)
// Load your markdown
const text = fs.readFileSync(`${__dirname}/me.md`, "utf-8");

// Split into ~1000 char chunks
function chunkText(text, maxChars = 1000) {
  const paragraphs = text.split("\n\n");
  const chunks = [];
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
  return chunks;
}

async function main() {
  const chunks = chunkText(text);
  const index = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`Embedding chunk ${i + 1} / ${chunks.length}`);
    const res = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: chunks[i],
    });

    const embedding = res.data[0].embedding;
    index.push({ chunk: chunks[i], embedding });
  }

  fs.writeFileSync(`${__dirname}/index.json`, JSON.stringify({ chunks: index }, null, 2));
  console.log("index.json generated!");
}

main().catch(console.error);
