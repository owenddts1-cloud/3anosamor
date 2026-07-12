import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import convert from 'heic-convert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images', 'amor');

async function convertHeicToJpg() {
  if (!fs.existsSync(imagesDir)) {
    console.error("Directory not found:", imagesDir);
    return;
  }

  const files = fs.readdirSync(imagesDir);
  const heicFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.heic' || ext === '.heif';
  });

  if (heicFiles.length === 0) {
    console.log("No HEIC/HEIF files found to convert.");
    return;
  }

  console.log(`Found ${heicFiles.length} HEIC files to convert. Starting batch conversion...`);

  // Concurrency limit to prevent memory blowouts (converts 4 files at a time)
  const CONCURRENCY_LIMIT = 4;
  let activePromises = [];
  let completed = 0;

  for (const file of heicFiles) {
    const inputPath = path.join(imagesDir, file);
    const filenameWithoutExt = path.basename(file, path.extname(file));
    const outputPath = path.join(imagesDir, `${filenameWithoutExt}.jpg`);

    const promise = (async () => {
      try {
        const inputBuffer = fs.readFileSync(inputPath);
        const outputBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.92
        });

        fs.writeFileSync(outputPath, outputBuffer);
        fs.unlinkSync(inputPath); // Remove the original HEIC file

        completed++;
        console.log(`[${completed}/${heicFiles.length}] Converted & removed: ${file}`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    })();

    activePromises.push(promise);

    if (activePromises.length >= CONCURRENCY_LIMIT) {
      await Promise.all(activePromises);
      activePromises = [];
    }
  }

  // Await remaining conversions
  if (activePromises.length > 0) {
    await Promise.all(activePromises);
  }

  console.log("All HEIC files have been successfully converted to JPEG!");
}

convertHeicToJpg();
