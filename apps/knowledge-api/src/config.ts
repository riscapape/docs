import * as path from "path";

/**
 * Central configuration for the Knowledge API.
 * All deployment-sensitive values come from environment variables.
 */

function env(key: string, defaultValue: string): string {
  const value = process.env[key];
  return value !== undefined && value !== "" ? value : defaultValue;
}

function envNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (value === undefined || value === "") return defaultValue;
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? defaultValue : n;
}

/**
 * Comma-separated list of allowed origins for CORS.
 * Use "*" to allow all origins (not recommended in production).
 * When frontend is on a different server, set e.g. https://docs.p2p.me,https://localhost:3000
 */
function envCorsOrigins(): string[] | "*" {
  const raw = process.env.CORS_ORIGINS;
  if (!raw || raw === "") {
    return ["http://localhost:3000", "http://127.0.0.1:3000"];
  }
  if (raw.trim() === "*") return "*";
  return raw.split(",").map((o) => o.trim()).filter(Boolean);
}

/** Default knowledge DB path: app root / knowledge-db.json (e.g. knowledge-api/knowledge-db.json) */
const defaultKnowledgeDbPath = path.join(__dirname, "..", "knowledge-db.json");

export const config = {
  /** Server port */
  port: envNumber("PORT", 3001),

  /** Node environment */
  nodeEnv: env("NODE_ENV", "development"),

  /** Ollama API base URL (e.g. http://localhost:11434 or http://ollama:11434 in Docker) */
  ollamaHost: env("OLLAMA_HOST", "http://localhost:11434"),

  /** LLM model name (e.g. llama3.1, llama3.2, mistral) */
  llmModel: env("LLM_MODEL", "llama3.1"),

  /**
   * Absolute path to the knowledge DB JSON file.
   * Set KNOWLEDGE_DB_PATH to override (e.g. in Docker or when DB is on a volume).
   */
  knowledgeDbPath: env("KNOWLEDGE_DB_PATH", defaultKnowledgeDbPath),

  /**
   * Repository root for ingestion (optional).
   * If set, ingest uses this as repo root to find docs. Otherwise derived from __dirname.
   */
  repoRoot: env("REPO_ROOT", ""),

  /** Allowed CORS origins. Set when frontend is on a different server. */
  corsOrigins: envCorsOrigins(),
} as const;
