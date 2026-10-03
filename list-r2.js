const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.dev.vars' });

async function list() {
  const s3Client = new S3Client({
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: 'auto',
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });

  try {
    const data = await s3Client.send(new ListObjectsV2Command({
      Bucket: 'kcb-media',
    }));
    
    if (!data.Contents || data.Contents.length === 0) {
      console.log("Bucket is empty!");
    } else {
      console.log(`Found ${data.Contents.length} objects in kcb-media:`);
      data.Contents.forEach(obj => {
        console.log(`- ${obj.Key} (${(obj.Size / 1024 / 1024).toFixed(2)} MB)`);
      });
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

list();
