import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let db: ReturnType<typeof drizzle>;

export function getDb(connectionString: string) {
  if (!db) {
    const pool = new Pool({ connectionString });
    db = drizzle(pool, { schema });
  }
  return db;
}
