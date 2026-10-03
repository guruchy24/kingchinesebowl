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
    
    // Check if Neon Storage environment variables are present
    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    
    if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
      console.error("Missing AWS environment variables for Neon Object Storage!");
      return NextResponse.json({ error: 'Storage not configured on server' }, { status: 500 });
    }

    const s3Client = new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Required for Neon Storage
    });

    await s3Client.send(new PutObjectCommand({
      Bucket: 'kcb-media',
      Key: r2Key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
      CacheControl: 'max-age=31536000', // 1 year cache
    }));

    // Neon public read bucket URLs follow this pattern:
    const url = `${endpoint}/kcb-media/${r2Key}`;

    return NextResponse.json({ r2_key: r2Key, url, filename: file.name });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
