import express from "express";
import multer from "multer";
import { extractText, chunkText } from "../documentProcessor.js";
import { fakeEmbedding } from "../embedder.js";
import { index } from "../pinecone.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const text = await extractText(req.file.path);
  const chunks = chunkText(text);

  const vectors = chunks.map((chunk, i) => ({
    id: `${req.file.filename}-${i}`,
    values: fakeEmbedding(chunk),
    metadata: { text: chunk }
  }));

  await index.upsert(vectors);

  res.json({ message: "Document uploaded and indexed" });
});

export default router;
