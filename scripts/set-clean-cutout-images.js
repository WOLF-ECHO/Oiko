const fs = require('fs');
const path = require('path');

const chairsPath = path.join(__dirname, '..', 'src', 'data', 'chairs.ts');
let content = fs.readFileSync(chairsPath, 'utf8');

// Check how many items exist
const idMatches = content.match(/"id":\s*"oik-ch-\d+"/g);
console.log('Total chairs found:', idMatches ? idMatches.length : 0);

// For each chair, replace images: [ ... ] with only the clean cutout /images/chairs/chX-*.png
// Notice ch26 is aria.png
let updatedCount = 0;
const newContent = content.replace(/"images":\s*\[\s*([^\]]+)\s*\]/g, (match, inner) => {
  // Extract all strings
  const stringMatches = inner.match(/"([^"]+)"/g);
  if (!stringMatches) return match;
  
  // Find the clean cutout /images/chairs/chX-*.png (or .jpg for ch26 if not updated)
  const cleanCutout = stringMatches.find(s => s.includes('/images/chairs/') && !s.includes('/chairs-staged/'));
  
  if (cleanCutout) {
    updatedCount++;
    // Normalize ch26-aria.jpg to ch26-aria.png if needed
    const normalized = cleanCutout.replace('ch26-aria.jpg', 'ch26-aria.png');
    return `"images": [\n      ${normalized}\n    ]`;
  }
  return match;
});

console.log('Replaced images for count:', updatedCount);
fs.writeFileSync(chairsPath, newContent, 'utf8');
console.log('Successfully updated chairs.ts');
