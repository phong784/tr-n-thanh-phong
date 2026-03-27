import path from 'path';
const publicDir = '/app/public';
const src = '/uploads/img.webp';
const normalizedPath = path.normalize(src).replace(/^(\.\.[\/\\])+/, '');
const filePath = path.join(publicDir, normalizedPath);
console.log('publicDir:', publicDir);
console.log('src:', src);
console.log('normalizedPath:', normalizedPath);
console.log('filePath:', filePath);
