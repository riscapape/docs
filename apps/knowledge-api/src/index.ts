import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config";
import { queryHandler } from "./api/query";

dotenv.config();

const app = express();
const { port, nodeEnv, ollamaHost, corsOrigins } = config;

app.use(
  cors({
    origin:
      corsOrigins === "*"
        ? true
        : (origin, cb) => {
            if (!origin) return cb(null, true);
            if (corsOrigins.includes(origin)) return cb(null, true);
            return cb(null, false);
          },
  }),
);
app.use(express.json());

// Routes
app.post("/knowledge/query", queryHandler);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Knowledge API running on port ${port}`);
  console.log(`Environment: ${nodeEnv}`);
  console.log(`Ollama Host: ${ollamaHost}`);
  console.log(`CORS origins: ${corsOrigins === "*" ? "*" : corsOrigins.join(", ")}`);
});
