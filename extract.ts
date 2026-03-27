import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';

const zipPath = 'uploads.zip';
const extractPath = 'public/uploads';

if (!fs.existsSync(extractPath)) {
  fs.mkdirSync(extractPath, { recursive: true });
}

fs.createReadStream(zipPath)
  .pipe(unzipper.Extract({ path: extractPath }))
  .on('close', () => {
    console.log('Extraction completed!');
  })
  .on('error', (err) => {
    console.error('Error extracting file:', err.message);
  });
