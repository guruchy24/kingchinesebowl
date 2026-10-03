const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await client.connect();
  
  const res = await client.query("SELECT id, slot, device, is_active, url, r2_key FROM site_media WHERE section = 'story' ORDER BY sort_order, id");
  
  console.log(`Found ${res.rowCount} records in story section:`);
  for (const row of res.rows) {
    console.log(`- ID: ${row.id}, Slot: ${row.slot}, Device: ${row.device}, Active: ${row.is_active}`);
    console.log(`  URL: ${row.url.split('/').pop()}`);
  }
  
  await client.end();
}
main();
