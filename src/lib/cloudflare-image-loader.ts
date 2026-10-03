export default function customLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  if (src.startsWith('data:') || src.endsWith('.svg')) {
    return src;
  }
  
  // If it's an Unsplash URL, we can use their built-in Imgix API for resizing
  if (src.includes('images.unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // If it's our own R2 bucket or something else, we don't have a custom image resizer enabled on workers.dev
  // So we just return the original URL.
  return src;
}
