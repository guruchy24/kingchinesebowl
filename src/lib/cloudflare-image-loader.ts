export default function customLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  if (src.startsWith('data:') || src.endsWith('.svg')) {
    return src;
  }
  
  // Unsplash has a built-in Imgix resizing API
  if (src.includes('images.unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // Use our own Cloudflare Worker native cf.image optimizer!
  // This keeps the architecture fully contained within Cloudflare (R2 -> Worker -> User)
  // without relying on third-party public CDNs like wsrv.nl.
  return `/api/image?src=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}
