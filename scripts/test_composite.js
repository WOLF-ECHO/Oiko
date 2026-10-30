const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function testComposite() {
  const bgPath = 'public/images/backgrounds/bg-salon-travertin.jpg';
  const chairPath = 'public/images/chairs/ch1-nelly.png';
  const outPath = 'public/images/chairs-staged/test-ch1.jpg';

  if (!fs.existsSync('public/images/chairs-staged')) {
    fs.mkdirSync('public/images/chairs-staged', { recursive: true });
  }

  // 1. Target canvas size: 800 x 1000 (aspect 4/5)
  const targetW = 800;
  const targetH = 1000;

  // Resize and crop background to 800x1000 focusing on the floor/light
  const bgBuffer = await sharp(bgPath)
    .resize(targetW, targetH, { fit: 'cover', position: 'bottom' })
    .toBuffer();

  // 2. Read chair and trim transparent borders if any
  const chairMetadata = await sharp(chairPath).metadata();
  console.log('Original chair:', chairMetadata.width, 'x', chairMetadata.height);

  // Resize chair to occupy ~55-65% of the frame height
  const chairH = Math.round(targetH * 0.58);
  const chairBuffer = await sharp(chairPath)
    .resize({ height: chairH, fit: 'inside' })
    .toBuffer();

  const resizedChairMeta = await sharp(chairBuffer).metadata();
  const chairW = resizedChairMeta.width;

  // Position chair towards the bottom center of the room
  const left = Math.round((targetW - chairW) / 2);
  const top = targetH - chairH - Math.round(targetH * 0.08); // resting on floor

  // 3. Generate realistic soft contact shadow ellipse under chair legs
  const shadowW = Math.round(chairW * 0.95);
  const shadowH = Math.round(chairH * 0.16);
  const shadowLeft = left + Math.round((chairW - shadowW) / 2);
  const shadowTop = top + chairH - Math.round(shadowH * 0.55);

  const shadowSvg = Buffer.from(`
    <svg width="${shadowW}" height="${shadowH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="shadowGrad" cx="50%" cy="50%" rx="50%" ry="45%">
          <stop offset="0%" stop-color="#0a0908" stop-opacity="0.65" />
          <stop offset="45%" stop-color="#141210" stop-opacity="0.35" />
          <stop offset="85%" stop-color="#141210" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#141210" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="${shadowW / 2}" cy="${shadowH / 2}" rx="${shadowW * 0.48}" ry="${shadowH * 0.42}" fill="url(#shadowGrad)" />
    </svg>
  `);

  const shadowBuffer = await sharp(shadowSvg).toBuffer();

  // 4. Composite: Background + Shadow + Chair
  await sharp(bgBuffer)
    .composite([
      {
        input: shadowBuffer,
        top: shadowTop,
        left: shadowLeft,
        blend: 'multiply'
      },
      {
        input: chairBuffer,
        top: top,
        left: left,
        blend: 'over'
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(outPath);

  console.log('Successfully created staged image at', outPath);
}

testComposite().catch(console.error);
