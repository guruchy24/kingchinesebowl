export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get('src');
  const w = searchParams.get('w');
  const q = searchParams.get('q');

  if (!src) {
    return new Response('Missing src parameter', { status: 400 });
  }

  try {
    // Cloudflare specific fetch options for native image optimization
    // https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/
    const imageOptions = {
      width: w ? parseInt(w, 10) : undefined,
      quality: q ? parseInt(q, 10) : 75,
      format: 'auto',
      fit: 'crop'
    };

    // Remove undefined properties
    Object.keys(imageOptions).forEach(key => (imageOptions as any)[key] === undefined && delete (imageOptions as any)[key]);

    const response = await fetch(src, {
      cf: {
        image: imageOptions
      }
    });

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    // Pass the optimized image back with aggressive caching headers
    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) {
    console.error('Image Optimization Error:', error);
    return new Response(error.message, { status: 500 });
  }
}
