import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

let db: ReturnType<typeof drizzle>;
let client: Client;

export function getDb(connectionString?: string) {
  if (!db) {
    const connStr = typeof process.env.DB === 'object' && process.env.DB !== null 
      ? (process.env.DB as any).connectionString 
      : (process.env.DB || connectionString || process.env.DATABASE_URL_UNPOOLED!);
      
    client = new Client({ connectionString: connStr });
    client.connect();
    
    db = drizzle(client, { schema });
  }
  return db;
}
