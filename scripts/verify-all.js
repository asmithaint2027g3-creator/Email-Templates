import fs from 'fs';
import path from 'path';

const dirs = [
  '01-bfsi',
  '02-capital-markets',
  '03-public-sector-defense',
  '04-healthcare',
  '05-life-sciences',
  '06-energy-utilities',
  '07-manufacturing',
  '08-retail-ecommerce',
  '09-telecommunications'
];

let totalIssues = 0;

for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('original'));
  for (const f of files) {
    const fullPath = path.join(dir, f);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Check header
    const hasBfsiHeader = content.includes('../images/Header-bfsi.png') || content.includes('Header-bfsi.png');
    // Check footer
    const hasBfsiFooter = content.includes('../images/Footer-bfsi.png') || content.includes('Footer-bfsi.png');

    // Check font
    const fontMatches = content.match(/font-family:\s*([^;]+)(?:;|$)/gi) || [];
    const nonTimes = fontMatches.filter(fm => !fm.toLowerCase().includes('times'));

    // Check text-align: center
    const hasCenter = /text-align:\s*center/i.test(content);

    if (!hasBfsiHeader || !hasBfsiFooter || nonTimes.length > 0 || hasCenter) {
      console.log(`ISSUE in ${fullPath}:`);
      if (!hasBfsiHeader) console.log('  - Missing BFSI Header');
      if (!hasBfsiFooter) console.log('  - Missing BFSI Footer');
      if (nonTimes.length > 0) console.log(`  - Non-Times fonts found (${nonTimes.length}):`, nonTimes.slice(0, 3));
      if (hasCenter) console.log('  - Contains text-align: center');
      totalIssues++;
    }
  }
}

console.log(`\nVerification complete. Total files with issues: ${totalIssues}`);
