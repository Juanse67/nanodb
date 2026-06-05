import { Pool } from "pg";

const globalForPg = globalThis as unknown as { pool?: Pool };

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true, // Neon cert is publicly trusted; keep verification on
  });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;
