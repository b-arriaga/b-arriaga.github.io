import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

// UPDATED: Now looks inside 'public/images/'
const files = await glob('public/images/**/*.{png,jpg,jpeg,JPG,JPEG}');

console.log(`Found ${files.length} images to convert in public/images...`);

for (const file of files) {
  const parsedPath = path.parse(file);
  // This will save the .webp file in the same folder as the original
  const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

  console.log(`Converting: ${file}`);

  try {
    await sharp(file)
      .webp({ quality: 80 }) // 80 is a good balance of quality/size
      .toFile(outputPath);

    // Optional: Delete the original file after conversion
    // fs.unlinkSync(file); 
  } catch (err) {
    console.error(`Error converting ${file}:`, err);
  }
}

console.log('Done! Remember to update your file paths in App.tsx to use the new .webp extensions.');