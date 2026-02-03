import express from "express";
import dotenv from "dotenv";
import uploadRoute from "./routes/upload.js";
import searchRoute from "./routes/search.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Ollama + Pinecone setup OK"));
app.use("/upload", uploadRoute);
app.use("/search", searchRoute);


app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
