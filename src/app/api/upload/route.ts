import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const section = formData.get('section') as string;
    const device = formData.get('device') as string;

    if (!file || !section || !device) {
      return NextResponse.json({ error: 'Missing required fields: file, section, device' }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${safeName}`;
    const r2Key = `media/${section}/${device}/${uniqueFileName}`;

    const arrayBuffer = await file.arrayBuffer();
    
    // We will use Cloudflare R2 via S3 compatibility API
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const publicUrl = process.env.R2_PUBLIC_URL; // e.g. https://pub-xxxxxxxx.r2.dev
    
    if (!accountId || !accessKeyId || !secretAccessKey || !publicUrl) {
      console.error("Missing Cloudflare R2 environment variables! Please add CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_PUBLIC_URL to your .env.local/.dev.vars");
      return NextResponse.json({ error: 'Storage not configured on server' }, { status: 500 });
    }

    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

    const s3Client = new S3Client({
      endpoint,
      region: 'auto',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    });

    await s3Client.send(new PutObjectCommand({
      Bucket: 'kcb-media',
      Key: r2Key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
      CacheControl: 'max-age=31536000', // 1 year cache
    }));

    const url = `${publicUrl}/${r2Key}`;

    return NextResponse.json({ r2_key: r2Key, url, filename: file.name });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
