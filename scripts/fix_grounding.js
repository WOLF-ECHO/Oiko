const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Ensure ch26 is transparent PNG
async function fixCh26() {
  const jpgPath = 'public/images/chairs/ch26-aria.jpg';
  const pngPath = 'public/images/chairs/ch26-aria.png';
  if (fs.existsSync(jpgPath)) {
    const { data, info } = await sharp(jpgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      if (r > 235 && g > 235 && b > 235) {
        data[i+3] = 0;
      }
    }
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(pngPath);
    console.log('✓ Made ch26 transparent PNG');
  }
}

// 2. Fix grounding and shadows for all 55 chairs
async function regroundAllChairs() {
  await fixCh26();

  const targetW = 800;
  const targetH = 1000;

  const bgFiles = {
    dining: 'public/images/backgrounds/bg-salle-manger.jpg',
    garden: 'public/images/backgrounds/bg-terrasse-jardin.jpg',
    lounge: 'public/images/backgrounds/bg-lounge-suite.jpg',
    salon: 'public/images/backgrounds/bg-salon-travertin.jpg',
  };

  const bgBuffers = {};
  for (const [key, f] of Object.entries(bgFiles)) {
    bgBuffers[key] = await sharp(f)
      .resize(targetW, targetH, { fit: 'cover', position: 'bottom' })
      .toBuffer();
  }

  function getScene(num) {
    if ([33, 46, 47, 48, 49].includes(num)) return 'garden';
    if ([42, 43, 44, 45, 50, 51, 52].includes(num)) return 'lounge';
    if ([2, 3, 6, 7, 8, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 53, 54].includes(num)) return 'dining';
    return 'salon';
  }

  const outDir = 'public/images/chairs-staged';
  const chairFiles = fs.readdirSync('public/images/chairs')
    .filter(f => f.startsWith('ch') && (f.endsWith('.png') || (f.endsWith('.jpg') && f.includes('ch26'))));

  // Update chairs.ts to replace ch26-aria.jpg with ch26-aria.png
  let chairsTs = fs.readFileSync('src/data/chairs.ts', 'utf-8');
  chairsTs = chairsTs.replace(/ch26-aria\.jpg/g, 'ch26-aria.png');

  for (const file of chairFiles) {
    if (file === 'ch26-aria.jpg') continue; // use png

    const m = file.match(/^ch(\d+)-/);
    if (!m) continue;
    const num = parseInt(m[1], 10);
    const sceneKey = getScene(num);
    const bgBuffer = bgBuffers[sceneKey];

    const chairPath = path.join('public/images/chairs', file);
    const baseName = path.parse(file).name;
    const outFile = path.join(outDir, `staged-${baseName}.jpg`);

    // 1. Trim chair to exact bounding box (removes any transparent margin so feet touch bottom)
    const trimmedBuffer = await sharp(chairPath).trim().toBuffer();

    // 2. Scale chair:
    // Bar stools and high chairs get scaled differently than lounge chairs
    const isBarStool = (num === 8);
    const chairHeightRatio = isBarStool ? 0.65 : 0.60;
    const targetChairH = Math.round(targetH * chairHeightRatio);

    const chairResized = await sharp(trimmedBuffer)
      .resize({ height: targetChairH, fit: 'inside' })
      .toBuffer();

    const cMeta = await sharp(chairResized).metadata();
    const chairW = cMeta.width;
    const chairH = cMeta.height;

    // Ground position: the very bottom of the chair sits firmly on the floor plane
    // Ground level is 40px from canvas bottom
    const groundY = targetH - 45;
    const top = groundY - chairH;
    const left = Math.round((targetW - chairW) / 2);

    // 3. TRUE CONTACT OCCLUSION SHADOW:
    // It must touch the bottom of the feet DIRECTLY.
    // Width is exactly chair width, very thin (height ~6-8%), concentrated directly on the feet contact line.
    const shadowW = Math.round(chairW * 0.90);
    const shadowH = Math.max(16, Math.round(chairH * 0.08));
    const shadowLeft = left + Math.round((chairW - shadowW) / 2);
    // Shadow center is right on groundY so feet sit inside the darkest core
    const shadowTop = groundY - Math.round(shadowH * 0.55);

    const shadowSvg = Buffer.from(`
      <svg width="${shadowW}" height="${shadowH}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ambOcc" cx="50%" cy="50%" rx="50%" ry="45%">
            <stop offset="0%" stop-color="#000000" stop-opacity="0.90" />
            <stop offset="35%" stop-color="#080706" stop-opacity="0.65" />
            <stop offset="70%" stop-color="#151311" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#151311" stop-opacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="${shadowW / 2}" cy="${shadowH / 2}" rx="${shadowW * 0.48}" ry="${shadowH * 0.42}" fill="url(#ambOcc)" />
      </svg>
    `);

    const shadowBuffer = await sharp(shadowSvg).toBuffer();

    // Composite: background + tight contact shadow + grounded chair
    await sharp(bgBuffer)
      .composite([
        {
          input: shadowBuffer,
          top: shadowTop,
          left: shadowLeft,
          blend: 'multiply'
        },
        {
          input: chairResized,
          top: top,
          left: left,
          blend: 'over'
        }
      ])
      .jpeg({ quality: 92 })
      .toFile(outFile);

    console.log(`✓ Regrounded CH${num}: ${outFile}`);
  }

  fs.writeFileSync('src/data/chairs.ts', chairsTs, 'utf-8');
  console.log('✓ Successfully regrounded all 55 chairs!');
}

regroundAllChairs().catch(console.error);
