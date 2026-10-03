const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function main() {
  try {
    const data = await s3Client.send(new ListObjectsV2Command({ Bucket: 'kcb-media' }));
    if (!data.Contents) {
      console.log("Bucket is completely empty.");
      return;
    }
    console.log(`Found ${data.Contents.length} objects in 'kcb-media' bucket right now:`);
    for (const obj of data.Contents) {
      console.log(`- ${obj.Key} (${(obj.Size / 1024).toFixed(2)} KB)`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
main();
