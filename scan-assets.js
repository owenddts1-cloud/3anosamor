import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images', 'amor');
const videosDir = path.join(__dirname, 'public', 'videos');

const isImage = (file) => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'].includes(ext);
};

const isVideo = (file) => {
  const ext = path.extname(file).toLowerCase();
  return ['.mp4', '.mov', '.webm', '.ogg', '.m4v'].includes(ext);
};

let images = [];
if (fs.existsSync(imagesDir)) {
  images = fs.readdirSync(imagesDir)
    .filter(isImage)
    .map(file => `/images/amor/${file}`);
}

let videos = [];
if (fs.existsSync(videosDir)) {
  videos = fs.readdirSync(videosDir)
    .filter(isVideo)
    .map(file => `/videos/${file}`);
}

const fileContent = `// Generated file. Do not edit directly.
export const GALLERY_IMAGES = ${JSON.stringify(images, null, 2)};

export const CINEMA_VIDEOS = ${JSON.stringify(videos, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'galleryData.ts'), fileContent);
console.log(`Generated src/galleryData.ts with ${images.length} images and ${videos.length} videos.`);
