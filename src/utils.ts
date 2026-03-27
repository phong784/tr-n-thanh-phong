import { PLACEHOLDER_IMAGE } from './constants';

export const optimizeImageUrl = (url: string, width: number = 800) => {
  if (!url) return PLACEHOLDER_IMAGE;
  
  // Check if it's a local URL (relative or same origin)
  const isLocal = url.startsWith('/') || (typeof window !== 'undefined' && url.startsWith(window.location.origin));
  const isUpload = url.includes('/uploads/');
  const isCommonImage = url.toLowerCase().endsWith('.png') || url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg');

  if (isUpload || (isLocal && isCommonImage)) {
    // Normalize local URL to relative path for the API
    let localPath = url;
    if (typeof window !== 'undefined' && url.startsWith(window.location.origin)) {
      localPath = url.replace(window.location.origin, '');
    }
    return `/api/img-optimize?src=${encodeURIComponent(localPath)}&w=${width}`;
  }

  // Unsplash optimization
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&q=80&w=${width}&fm=webp`;
  }
  
  // Picsum optimization (limited, but we can set dimensions)
  if (url.includes('picsum.photos')) {
    const baseUrl = url.split('?')[0];
    const parts = baseUrl.split('/');
    // If it's a seed URL like https://picsum.photos/seed/abc/800/600
    if (baseUrl.includes('/seed/')) {
      const seedIndex = parts.indexOf('seed');
      const seed = parts[seedIndex + 1];
      return `https://picsum.photos/seed/${seed}/${width}/${Math.round(width * 0.75)}.webp`;
    }
    return `${baseUrl}/${width}/${Math.round(width * 0.75)}.webp`;
  }

  return url;
};
