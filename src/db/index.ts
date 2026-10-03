import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let db: ReturnType<typeof drizzle>;

export function getDb(connectionString?: string) {
  if (!db) {
    // Prefer Hyperdrive binding (live Worker), then explicit arg, then env fallback
    const connStr = process.env.DB || connectionString || process.env.DATABASE_URL_UNPOOLED!;
    const pool = new Pool({ connectionString: connStr });
    db = drizzle(pool, { schema });
  }
  return db;
}
