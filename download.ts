import axios from 'axios';
import fs from 'fs';

const fileId = '1_aZeNgk2baRR30EslpAfi4XC8PVR3HD1';
const dest = 'uploads.zip';

async function download() {
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  let response = await axios.get(url, { responseType: 'text', withCredentials: true });
  let text = response.data;
  let cookies = response.headers['set-cookie'];

  let downloadUrl = url;
  if (text.includes('confirm=')) {
    const confirmMatch = text.match(/confirm=([^&"']+)/);
    const uuidMatch = text.match(/uuid=([^&"']+)/);
    if (confirmMatch) {
      const confirm = confirmMatch[1];
      const uuid = uuidMatch ? uuidMatch[1] : '';
      downloadUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=${confirm}${uuid ? `&uuid=${uuid}` : ''}`;
      console.log('Found confirmation, downloading from:', downloadUrl);
    }
  }

  const fileStream = fs.createWriteStream(dest);
  const downloadResponse = await axios.get(downloadUrl, { 
    responseType: 'stream',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Cookie': cookies ? cookies.join('; ') : ''
    }
  });
  downloadResponse.data.pipe(fileStream);
  await new Promise((resolve, reject) => {
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });
  console.log('Download completed!');
}

download().catch(console.error);
