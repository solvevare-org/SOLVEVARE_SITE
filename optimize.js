/**
 * Solvevare - Full Media Optimization Script
 * Converts images to WebP, creates responsive sizes, compresses videos
 */

const sharp = require('sharp');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FFMPEG = path.join(__dirname, 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const ASSETS = path.join(__dirname, 'assets');

function mb(bytes) { return (bytes / 1024 / 1024).toFixed(2) + ' MB'; }
function kb(bytes) { return (bytes / 1024).toFixed(1) + ' KB'; }
function size(f) { try { return fs.statSync(f).size; } catch { return 0; } }

async function convertToWebP(src, dest, width, quality = 82) {
  await sharp(src)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
}

async function run() {
  console.log('=== Solvevare Media Optimization ===\n');

  // ─── 1. PORTFOLIO SCREENSHOTS (used on homepage + portfolio page) ───────────
  // These are the 3 images shown in the portfolio section on index.html
  const portfolioImages = [
    { src: 'Screenshot 2025-12-15 203923.png',  dest: 'portfolio-ticketing',    w: 600 },
    { src: 'Screenshot 2025-12-15 213248.png',  dest: 'portfolio-norightway',   w: 600 },
    { src: 'Screenshot 2025-12-15 225523.png',  dest: 'portfolio-chem',         w: 600 },
  ];

  console.log('--- Portfolio Images ---');
  for (const img of portfolioImages) {
    const srcPath = path.join(ASSETS, img.src);
    if (!fs.existsSync(srcPath)) { console.log(`SKIP (missing): ${img.src}`); continue; }
    const before = size(srcPath);

    // Desktop WebP (600px)
    const destDesktop = path.join(ASSETS, img.dest + '.webp');
    await convertToWebP(srcPath, destDesktop, img.w, 80);

    // Mobile WebP (400px)
    const destMobile = path.join(ASSETS, img.dest + '-mobile.webp');
    await convertToWebP(srcPath, destMobile, 400, 75);

    console.log(`  ${img.src}: ${mb(before)} → ${kb(size(destDesktop))} KB (desktop) + ${kb(size(destMobile))} KB (mobile)`);
  }

  // ─── 2. CASE STUDY IMAGE in nav mega menu ────────────────────────────────────
  console.log('\n--- Case Study / Nav Image ---');
  const caseStudySrc = path.join(ASSETS, 'Screenshot 2025-12-15 203923.png');
  if (fs.existsSync(caseStudySrc)) {
    const destCase = path.join(ASSETS, 'case-study-healthcare.webp');
    await convertToWebP(caseStudySrc, destCase, 400, 75);
    console.log(`  case-study-healthcare.webp: ${kb(size(destCase))} KB`);
  }

  // ─── 3. LOGO IMAGES ──────────────────────────────────────────────────────────
  console.log('\n--- Logo Images ---');
  const logos = [
    { src: 'logos/AWS_logo.png',          dest: 'logos/AWS_logo.webp',          w: 200 },
    { src: 'logos/Cloudflare_logo.png',   dest: 'logos/Cloudflare_logo.webp',   w: 200 },
    { src: 'logos/googlecloud_logo.png',  dest: 'logos/googlecloud_logo.webp',  w: 200 },
    { src: 'logos/Azure_logo.png',        dest: 'logos/Azure_logo.webp',        w: 200 },
    { src: 'logos/Supabase.png',          dest: 'logos/Supabase.webp',          w: 200 },
    { src: 'logos/Firebase_logo.png',     dest: 'logos/Firebase_logo.webp',     w: 200 },
  ];

  for (const logo of logos) {
    const srcPath = path.join(ASSETS, logo.src);
    if (!fs.existsSync(srcPath)) { console.log(`  SKIP (missing): ${logo.src}`); continue; }
    const before = size(srcPath);
    const destPath = path.join(ASSETS, logo.dest);
    await sharp(srcPath)
      .resize(logo.w, null, { withoutEnlargement: true })
      .webp({ quality: 85, lossless: false })
      .toFile(destPath);
    console.log(`  ${logo.src}: ${kb(before)} KB → ${kb(size(destPath))} KB`);
  }

  // ─── 4. FAVICON OPTIMIZATION ─────────────────────────────────────────────────
  console.log('\n--- Favicon ---');
  const faviconSrc = path.join(ASSETS, 'favicon.png');
  if (fs.existsSync(faviconSrc)) {
    const before = size(faviconSrc);
    // Create optimized 64x64 favicon
    const faviconOpt = path.join(ASSETS, 'favicon-opt.png');
    await sharp(faviconSrc)
      .resize(64, 64)
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(faviconOpt);
    // Also create WebP version for modern browsers
    const faviconWebP = path.join(ASSETS, 'favicon.webp');
    await sharp(faviconSrc)
      .resize(64, 64)
      .webp({ quality: 90 })
      .toFile(faviconWebP);
    console.log(`  favicon.png: ${kb(before)} KB → ${kb(size(faviconOpt))} KB (optimized)`);
    console.log(`  favicon.webp: ${kb(size(faviconWebP))} KB`);
  }

  // ─── 5. HERO BACKGROUND IMAGE (5.8MB → WebP responsive) ─────────────────────
  console.log('\n--- Hero Background Image ---');
  const heroImgSrc = path.join(ASSETS, '3d-background-blue-6016x3384-11033.jpg');
  if (fs.existsSync(heroImgSrc)) {
    const before = size(heroImgSrc);

    // Desktop: 1920px wide
    const heroDesktop = path.join(ASSETS, 'hero-bg-1920.webp');
    await sharp(heroImgSrc)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(heroDesktop);

    // Tablet: 1024px wide
    const heroTablet = path.join(ASSETS, 'hero-bg-1024.webp');
    await sharp(heroImgSrc)
      .resize(1024, null, { withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(heroTablet);

    // Mobile: 768px wide
    const heroMobile = path.join(ASSETS, 'hero-bg-768.webp');
    await sharp(heroImgSrc)
      .resize(768, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(heroMobile);

    // Tiny placeholder for blur-up (32px)
    const heroPlaceholder = path.join(ASSETS, 'hero-bg-placeholder.webp');
    await sharp(heroImgSrc)
      .resize(32, null)
      .webp({ quality: 20 })
      .toFile(heroPlaceholder);

    console.log(`  Original: ${mb(before)}`);
    console.log(`  hero-bg-1920.webp: ${kb(size(heroDesktop))} KB`);
    console.log(`  hero-bg-1024.webp: ${kb(size(heroTablet))} KB`);
    console.log(`  hero-bg-768.webp:  ${kb(size(heroMobile))} KB`);
    console.log(`  hero-bg-placeholder.webp: ${kb(size(heroPlaceholder))} KB`);
  }

  // ─── 6. VIDEO COMPRESSION ────────────────────────────────────────────────────
  console.log('\n--- Video Compression ---');

  const videos = [
    {
      src: 'Diagonal_Tile_Animation_Abstract_flowing_metallic_shapes_with_neon_blue_-JXeluF1.mp4',
      dest: 'hero-video-compressed.mp4',
      // Mobile version (smaller resolution)
      destMobile: 'hero-video-mobile.mp4',
      crf: 28,
      mobileCrf: 32,
      scale: '1280:-2',
      mobileScale: '640:-2',
    },
    {
      src: 'servicevideo.mp4',
      dest: 'servicevideo-compressed.mp4',
      destMobile: null,
      crf: 28,
      mobileCrf: null,
      scale: '1280:-2',
      mobileScale: null,
    },
  ];

  for (const v of videos) {
    const srcPath = path.join(ASSETS, v.src);
    if (!fs.existsSync(srcPath)) { console.log(`  SKIP (missing): ${v.src}`); continue; }
    const before = size(srcPath);

    // Desktop compressed
    const destPath = path.join(ASSETS, v.dest);
    console.log(`  Compressing ${v.src} (${mb(before)})...`);
    try {
      execSync(
        `"${FFMPEG}" -y -i "${srcPath}" -vcodec libx264 -crf ${v.crf} -preset fast -vf "scale=${v.scale}" -movflags +faststart -an "${destPath}"`,
        { stdio: 'pipe' }
      );
      console.log(`  → ${v.dest}: ${mb(size(destPath))}`);
    } catch (e) {
      console.log(`  ERROR compressing ${v.src}: ${e.message.slice(0, 100)}`);
    }

    // Mobile compressed (smaller resolution)
    if (v.destMobile) {
      const destMobilePath = path.join(ASSETS, v.destMobile);
      console.log(`  Creating mobile version...`);
      try {
        execSync(
          `"${FFMPEG}" -y -i "${srcPath}" -vcodec libx264 -crf ${v.mobileCrf} -preset fast -vf "scale=${v.mobileScale}" -movflags +faststart -an "${destMobilePath}"`,
          { stdio: 'pipe' }
        );
        console.log(`  → ${v.destMobile}: ${mb(size(destMobilePath))}`);
      } catch (e) {
        console.log(`  ERROR creating mobile video: ${e.message.slice(0, 100)}`);
      }
    }

    // Generate poster frame (first frame as WebP)
    const posterName = v.dest.replace('.mp4', '-poster.webp');
    const posterPath = path.join(ASSETS, posterName);
    try {
      execSync(
        `"${FFMPEG}" -y -i "${srcPath}" -vframes 1 -f image2 -vf "scale=1280:-2" "${posterPath.replace('.webp', '.jpg')}"`,
        { stdio: 'pipe' }
      );
      // Convert poster jpg to webp
      const posterJpg = posterPath.replace('.webp', '.jpg');
      if (fs.existsSync(posterJpg)) {
        await sharp(posterJpg).webp({ quality: 75 }).toFile(posterPath);
        fs.unlinkSync(posterJpg);
        console.log(`  → poster: ${kb(size(posterPath))} KB`);
      }
    } catch (e) {
      console.log(`  Poster generation skipped`);
    }
  }

  // ─── 7. PORTFOLIO PAGE IMAGES (used on portfolio.html) ───────────────────────
  console.log('\n--- Additional Portfolio Images ---');
  const portfolioExtra = [
    'Screenshot 2025-12-15 215615.png',
    'Screenshot 2025-12-15 215823.png',
    'Screenshot 2025-12-15 215842.png',
    'Screenshot 2025-12-15 215916.png',
    'Screenshot 2025-12-15 215957.png',
    'Screenshot 2025-12-15 220024.png',
    'Screenshot 2025-12-15 231159.png',
    'Screenshot 2025-12-15 231217.png',
    'Screenshot 2025-12-15 231230.png',
    'Screenshot 2025-12-15 231949.png',
    'Screenshot 2025-12-15 233204.png',
    'Screenshot 2025-12-15 233700.png',
    'Screenshot 2025-12-15 234109.png',
    'Screenshot 2025-12-15 234130.png',
    'Screenshot 2025-12-15 234221.png',
    'Screenshot 2025-12-15 234303.png',
    'Screenshot 2025-12-16 003928.png',
    'Screenshot 2025-12-16 005831.png',
    'Screenshot 2025-12-16 005853.png',
    'Screenshot 2025-12-16 005905.png',
    'Screenshot 2025-12-16 005936.png',
    'Screenshot 2025-12-16 005947.png',
    'Screenshot 2025-12-16 010037.png',
    'Screenshot 2025-12-16 010055.png',
    'Screenshot 2025-12-16 012240.png',
    'Screenshot 2025-12-16 012337.png',
    'Screenshot 2025-12-16 012347.png',
    'Screenshot 2025-12-16 012500.png',
    'Screenshot 2025-12-16 013852.png',
    'Screenshot 2025-12-16 013905.png',
    'Screenshot 2025-12-16 013918.png',
    'Screenshot 2025-12-16 013929.png',
    'Screenshot 2025-12-16 013941.png',
    'Screenshot 2025-12-16 014007.png',
  ];

  let totalSaved = 0;
  for (const imgName of portfolioExtra) {
    const srcPath = path.join(ASSETS, imgName);
    if (!fs.existsSync(srcPath)) continue;
    const before = size(srcPath);
    const destName = imgName.replace('.png', '.webp');
    const destPath = path.join(ASSETS, destName);
    try {
      await sharp(srcPath)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(destPath);
      const saved = before - size(destPath);
      totalSaved += saved;
    } catch (e) {
      console.log(`  ERROR: ${imgName}: ${e.message.slice(0, 60)}`);
    }
  }
  console.log(`  Converted ${portfolioExtra.length} portfolio images, saved ~${mb(totalSaved)}`);

  // ─── 8. SCREENCAPTURE IMAGES (used on portfolio page) ────────────────────────
  console.log('\n--- Screencapture Images ---');
  const screencaptures = fs.readdirSync(ASSETS)
    .filter(f => f.startsWith('screencapture-') && f.endsWith('.png'));

  let scSaved = 0;
  for (const imgName of screencaptures) {
    const srcPath = path.join(ASSETS, imgName);
    const before = size(srcPath);
    const destPath = path.join(ASSETS, imgName.replace('.png', '.webp'));
    try {
      await sharp(srcPath)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(destPath);
      scSaved += before - size(destPath);
    } catch (e) {
      console.log(`  ERROR: ${imgName}`);
    }
  }
  console.log(`  Converted ${screencaptures.length} screencapture images, saved ~${mb(scSaved)}`);

  console.log('\n=== Optimization Complete ===');
}

run().catch(console.error);
