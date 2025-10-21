Setup Turso connection

1. Create a `.env.local` with:

TURSO_URL="libsql://dbshop-kienpt.aws-ap-northeast-1.turso.io"
TURSO_API_KEY="<your service token>"

2. Install libsql client:

npm install @libsql/client

3. Ensure your DB has the `users` table (run once in Turso SQL console):

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

4. Start dev server and test register/login pages.
