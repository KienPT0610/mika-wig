import { createClient } from "@libsql/client";

export function getDb() {
  const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_API_KEY,
  });

  return db;
}
