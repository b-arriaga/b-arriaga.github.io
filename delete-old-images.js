import { glob } from 'glob';
import fs from 'fs';

// 1. Find all original image formats in public/images
const files = await glob('public/images/**/*.{png,jpg,jpeg,JPG,JPEG}');

console.log(`Found ${files.length} old images to delete...`);

let deletedCount = 0;

for (const file of files) {
  try {
    fs.unlinkSync(file);
    console.log(`Deleted: ${file}`);
    deletedCount++;
  } catch (err) {
    console.error(`Error deleting ${file}:`, err);
  }
}

console.log(`\nCleanup complete! Removed ${deletedCount} files.`);
console.log('Your folder should now only contain the .webp versions.');