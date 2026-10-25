import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const indexPath = path.join(projectRoot, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Regex to find template cards
const cardRegex = /(<a\s+class="template-card"\s+href="([^"]+)"\s+target="_blank">[\s\S]*?<p\s+class="template-subject">)([\s\S]*?)(<\/p>)/gi;

let count = 0;
indexHtml = indexHtml.replace(cardRegex, (match, prefix, href, oldSubject, suffix) => {
  const filePath = path.join(projectRoot, href);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const subjectMatch = fileContent.match(/<meta\s+name=["']email-subject["']\s+content=["'](.*?)["']/i);
    if (subjectMatch && subjectMatch[1]) {
      count++;
      return `${prefix}${subjectMatch[1].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}${suffix}`;
    }
  }
  return match;
});

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log(`Updated ${count} template card subjects in index.html!`);
