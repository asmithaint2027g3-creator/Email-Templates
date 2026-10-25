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

function htmlToPlainText(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

for (const dir of dirs) {
  const htmlFiles = fs.readdirSync(dir).filter(f => /^(0[1-9]|10)-[a-z0-9\-]+\.html$/.test(f));
  for (const hf of htmlFiles) {
    const htmlPath = path.join(dir, hf);
    const txtName = hf.replace(/\.html$/, '.txt');
    const txtPath = path.join(dir, txtName);
    const html = fs.readFileSync(htmlPath, 'utf8');
    const plain = htmlToPlainText(html);
    fs.writeFileSync(txtPath, plain, 'utf8');
  }
  console.log(`Generated 10 clean .txt fallback companions for ${dir}`);
}

console.log('All .txt fallback companions generated successfully!');
