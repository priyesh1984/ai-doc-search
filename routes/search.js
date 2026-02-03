import express from "express";
import { index } from "../pinecone.js";
import { fakeEmbedding } from "../embedder.js";
import { askOllama } from "../ollama.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;

  const queryVector = fakeEmbedding(query);

  const results = await index.query({
    vector: queryVector,
    topK: 3,
    includeMetadata: true
  });

  const context = results.matches.map(m => m.metadata.text).join("\n");

  const prompt = `
Answer based on below context:

${context}

Question:
${query}
`;

  const answer = await askOllama(prompt);

  res.json({ answer });
});

export default router;
