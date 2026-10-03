import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

export async function getDb(connectionString?: string) {
  const connStr = typeof process.env.DB === 'object' && process.env.DB !== null 
    ? (process.env.DB as any).connectionString 
    : (process.env.DB || connectionString || process.env.DATABASE_URL_UNPOOLED!);
    
  const client = new Client({ connectionString: connStr });
  await client.connect();
  
  const db = drizzle(client, { schema });
  return { db, client };
}
