import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function extractText(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (filePath.endsWith(".pdf")) {
    const data = await pdf(buffer);
    return data.text;
  }

  return buffer.toString();
}

export function chunkText(text, chunkSize = 500) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}


