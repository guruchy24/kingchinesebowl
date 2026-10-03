export async function GET(request: Request) {
  const url = new URL(request.url);
  const src = url.searchParams.get('src');
  const w = url.searchParams.get('w');
  const q = url.searchParams.get('q');

  if (!src) {
    return new Response('Missing src parameter', { status: 400 });
  }

  // Security: Validate origin
  const allowedOrigins = [
    'pub-d26ac971841c4419a12ff6c81f286706.r2.dev',
    'images.unsplash.com',
    'kingchinesebowl.kingchinesebowl.workers.dev'
  ];

  try {
    const srcUrl = new URL(src);
    if (!allowedOrigins.includes(srcUrl.hostname)) {
      return new Response('Forbidden: Origin not allowed', { status: 403 });
    }
  } catch (e) {
    return new Response('Invalid src URL', { status: 400 });
  }

  // Cloudflare Workers Cache API
  let cache: Cache | undefined;
  try {
    // @ts-ignore
    cache = caches.default;
  } catch (e) {
    // Not in Cloudflare environment or caches not available
  }

  // The cache key is the exact URL (including w and q params)
  const cacheKey = new Request(url.toString());

  if (cache) {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  }

  // Manual content negotiation
  const accept = request.headers.get('accept') || '';
  let format = 'auto';
  if (accept.includes('image/avif')) {
    format = 'avif';
  } else if (accept.includes('image/webp')) {
    format = 'webp';
  }

  try {
    const imageOptions = {
      width: w ? parseInt(w, 10) : undefined,
      quality: q ? parseInt(q, 10) : 75,
      format: format,
      fit: 'crop'
    };
    Object.keys(imageOptions).forEach(key => (imageOptions as any)[key] === undefined && delete (imageOptions as any)[key]);

    const response = await fetch(src, {
      cf: {
        image: imageOptions
      }
    } as any);

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    const responseHeaders = new Headers({
      'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*'
    });
    
    if (response.headers.has('cf-resized')) {
      responseHeaders.set('cf-resized', response.headers.get('cf-resized') as string);
    }

    // Construct the response to cache
    const finalResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });

    if (cache) {
      // Must await put or use ctx.waitUntil, but we're in Next.js so we await
      await cache.put(cacheKey, finalResponse.clone());
    }

    return finalResponse;
  } catch (error: any) {
    console.error('Image Optimization Error:', error);
    return new Response(error.message, { status: 500 });
  }
}
