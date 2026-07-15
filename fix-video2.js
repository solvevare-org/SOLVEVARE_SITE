const fs = require('fs');

// ── Fix 1: script.js — remove ALL JS video manipulation ─────────────────────
let s = fs.readFileSync('js/script.js', 'utf8');

const oldBlock = "if(heroVideo){if(window.innerWidth<=767){var mobileSource=document.createElement('source');mobileSource.src='assets/hero-video-mobile.mp4';mobileSource.type='video/mp4';heroVideo.insertBefore(mobileSource,heroVideo.firstChild);}heroVideo.muted=true;heroVideo.setAttribute('playsinline','');heroVideo.play().catch(function(){});heroVideo.addEventListener(\"ended\",function(){heroVideo.play().catch(function(){});});}";

// Replace with only the ended loop — no DOM mutation, no play() call, no insertBefore
const newBlock = "if(heroVideo){heroVideo.addEventListener(\"ended\",function(){heroVideo.play().catch(function(){});});}";

if(s.indexOf(oldBlock) === -1){ console.error('heroVideo block NOT FOUND'); process.exit(1); }
s = s.replace(oldBlock, newBlock);
fs.writeFileSync('js/script.js', s, 'utf8');
console.log('script.js DONE');

// ── Fix 2: index.html — add mobile source directly in HTML <video> ───────────
let h = fs.readFileSync('index.html', 'utf8');

const oldVideo = '<video class="hero-video" autoplay muted playsinline aria-hidden="true" preload="auto" poster="assets/hero-video-compressed-poster.webp" fetchpriority="high">\r\n        <source src="assets/hero-video-compressed.mp4" type="video/mp4">\r\n      </video>';

// Mobile source first (browser picks first matching media query source)
const newVideo = '<video class="hero-video" autoplay muted playsinline loop aria-hidden="true" preload="auto" poster="assets/hero-video-compressed-poster.webp" fetchpriority="high">\r\n        <source src="assets/hero-video-mobile.mp4" type="video/mp4" media="(max-width:767px)">\r\n        <source src="assets/hero-video-compressed.mp4" type="video/mp4">\r\n      </video>';

if(h.indexOf(oldVideo) === -1){ console.error('video tag NOT FOUND'); process.exit(1); }
h = h.replace(oldVideo, newVideo);
fs.writeFileSync('index.html', h, 'utf8');
console.log('index.html DONE');
