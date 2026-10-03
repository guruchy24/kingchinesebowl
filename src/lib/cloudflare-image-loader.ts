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

  // For R2 images and any other external images, use the global wsrv.nl image CDN
  // This completely offloads CPU resizing from our Cloudflare Worker and prevents Error 1102,
  // while ensuring we never deliver 10MB original R2 files to the browser.
  
  // Strip http:// or https:// for wsrv.nl
  const cleanUrl = src.replace(/^https?:\/\//, '');
  return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&q=${quality || 75}&output=webp`;
}
