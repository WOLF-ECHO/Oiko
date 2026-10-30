const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetW = 800;
const targetH = 1000;

// Background paths
const backgrounds = {
  dining: 'public/images/backgrounds/bg-salle-manger.jpg',
  garden: 'public/images/backgrounds/bg-terrasse-jardin.jpg',
  lounge: 'public/images/backgrounds/bg-lounge-suite.jpg',
  salon: 'public/images/backgrounds/bg-salon-travertin.jpg',
};

// Scene routing for each reference
function getSceneForRef(ref) {
  const num = parseInt(ref.replace('CH', ''), 10);
  
  // Outdoor / Terrace / Organic garden armchairs
  if ([33, 46, 47, 48, 49].includes(num)) {
    return 'garden';
  }
  
  // Executive & Sculptural suite pieces
  if ([42, 43, 44, 45, 50, 51, 52].includes(num)) {
    return 'lounge';
  }
  
  // Dining chairs & bar stools
  if ([2, 3, 6, 7, 8, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 53, 54].includes(num)) {
    return 'dining';
  }
  
  // All other living room armchairs
  return 'salon';
}

async function generateAllStagedChairs() {
  const outDir = 'public/images/chairs-staged';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Pre-load and resize backgrounds to 800x1000
  const bgBuffers = {};
  for (const [key, bgFile] of Object.entries(backgrounds)) {
    bgBuffers[key] = await sharp(bgFile)
      .resize(targetW, targetH, { fit: 'cover', position: 'bottom' })
      .toBuffer();
  }

  // Read chairs data
  const chairsPath = 'src/data/chairs.ts';
  let chairsCode = fs.readFileSync(chairsPath, 'utf-8');

  const chairFiles = fs.readdirSync('public/images/chairs').filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  console.log(`Processing ${chairFiles.length} chairs...`);

  for (const file of chairFiles) {
    const match = file.match(/^ch(\d+)-/);
    if (!match) continue;
    const refNum = parseInt(match[1], 10);
    const ref = `CH${refNum}`;
    const sceneKey = getSceneForRef(ref);
    const bgBuffer = bgBuffers[sceneKey];

    const chairSrc = path.join('public/images/chairs', file);
    const baseName = path.parse(file).name;
    const stagedFileName = `staged-${baseName}.jpg`;
    const stagedFilePath = path.join(outDir, stagedFileName);

    try {
      // Trim any transparent edges from the cutout
      const trimmedChair = await sharp(chairSrc)
        .trim()
        .toBuffer();

      // Desired chair height: ~56% of canvas
      const targetChairH = Math.round(targetH * 0.56);
      const resizedChairBuffer = await sharp(trimmedChair)
        .resize({ height: targetChairH, fit: 'inside' })
        .toBuffer();

      const chairMeta = await sharp(resizedChairBuffer).metadata();
      const chairW = chairMeta.width;
      const chairH = chairMeta.height;

      // Position: bottom center, resting on floor
      const left = Math.round((targetW - chairW) / 2);
      const top = targetH - chairH - Math.round(targetH * 0.09);

      // Contact shadow geometry
      const shadowW = Math.round(chairW * 0.96);
      const shadowH = Math.round(chairH * 0.16);
      const shadowLeft = left + Math.round((chairW - shadowW) / 2);
      const shadowTop = top + chairH - Math.round(shadowH * 0.52);

      const shadowSvg = Buffer.from(`
        <svg width="${shadowW}" height="${shadowH}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="shadowGrad" cx="50%" cy="50%" rx="50%" ry="45%">
              <stop offset="0%" stop-color="#080706" stop-opacity="0.65" />
              <stop offset="40%" stop-color="#12100e" stop-opacity="0.35" />
              <stop offset="80%" stop-color="#12100e" stop-opacity="0.08" />
              <stop offset="100%" stop-color="#12100e" stop-opacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="${shadowW / 2}" cy="${shadowH / 2}" rx="${shadowW * 0.48}" ry="${shadowH * 0.42}" fill="url(#shadowGrad)" />
        </svg>
      `);

      const shadowBuffer = await sharp(shadowSvg).toBuffer();

      // Composite onto background
      await sharp(bgBuffer)
        .composite([
          {
            input: shadowBuffer,
            top: shadowTop,
            left: shadowLeft,
            blend: 'multiply',
          },
          {
            input: resizedChairBuffer,
            top: top,
            left: left,
            blend: 'over',
          },
        ])
        .jpeg({ quality: 90 })
        .toFile(stagedFilePath);

      // Update chairsCode to have images: [staged, cutout]
      const oldImgPattern = new RegExp(`"images":\\s*\\[\\s*"/images/chairs/${file.replace('.', '\\.')}"\\s*\\]`, 'g');
      const newImgJson = `"images": [\n      "/images/chairs-staged/${stagedFileName}",\n      "/images/chairs/${file}"\n    ]`;
      chairsCode = chairsCode.replace(oldImgPattern, newImgJson);

      console.log(`✓ ${ref} -> ${stagedFileName} (Scene: ${sceneKey})`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  fs.writeFileSync(chairsPath, chairsCode, 'utf-8');
  console.log(`Successfully generated all staged chair images and updated ${chairsPath}!`);
}

generateAllStagedChairs().catch(console.error);
