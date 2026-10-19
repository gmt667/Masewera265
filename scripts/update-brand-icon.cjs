/* global __dirname */
const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '../public/images/masewera265-logo.png');
const svgPath = path.join(__dirname, '../public/brand-icon.svg');

const imgBuffer = fs.readFileSync(imgPath);
const b64 = imgBuffer.toString('base64');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="Masewera265">
  <defs>
    <clipPath id="m265-rounded-icon">
      <rect width="512" height="512" rx="108" fill="#0b111c" />
    </clipPath>
    <filter id="m265-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#f59e0b" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="108" fill="#0b111c" stroke="rgba(245, 158, 11, 0.4)" stroke-width="4" />
  <g clip-path="url(#m265-rounded-icon)">
    <image href="data:image/png;base64,${b64}" width="512" height="512" preserveAspectRatio="xMidYMid slice" />
  </g>
</svg>`;

fs.writeFileSync(svgPath, svgContent, 'utf8');
console.log('Successfully updated brand-icon.svg with new embedded high-res logo!');
