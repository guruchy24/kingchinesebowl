const { Pool } = require('pg');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const https = require('https');
require('dotenv').config({ path: '.dev.vars' });

async function migrate() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  
  const s3Client = new S3Client({
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: 'auto',
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });

  const { rows } = await pool.query("SELECT * FROM site_media WHERE url LIKE '%br-flat-grass%'");
  console.log(`Found ${rows.length} legacy images to migrate.`);

  await Promise.all(rows.map(async (row) => {
    console.log(`Migrating ${row.r2_key}...`);
    try {
      const buffer = await new Promise((resolve, reject) => {
        https.get(row.url, (res) => {
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => resolve(Buffer.concat(chunks)));
          res.on('error', reject);
        }).on('error', reject);
      });

      const newKey = row.r2_key;
      await s3Client.send(new PutObjectCommand({
        Bucket: 'kcb-media',
        Key: newKey,
        Body: buffer,
        ContentType: 'image/jpeg',
        CacheControl: 'max-age=31536000',
      }));

      const newUrl = `${process.env.R2_PUBLIC_URL}/${newKey}`;
      await pool.query("UPDATE site_media SET url = $1 WHERE id = $2", [newUrl, row.id]);
      
      console.log(`✅ Success! New URL: ${newUrl}`);
    } catch (e) {
      console.error(`❌ Failed migrating ${row.r2_key}:`, e.message);
    }
  }));

  console.log("Migration complete!");
  pool.end();
}

migrate();
