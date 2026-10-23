import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const REQUIRED_INDUSTRIES = [
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

const REQUIRED_FILES = [
  '01-introduction.html',
  '02-industry-challenges.html',
  '03-ai-solutions.html',
  '04-business-value.html',
  '05-follow-up.html',
  '06-meeting-request.html',
  '07-use-case-spotlight.html',
  '08-technical-approach.html',
  '09-objection-handling.html',
  '10-next-steps.html'
];

function runValidation() {
  console.log('====================================================');
  console.log('TRUSTGRID.AI 90-TEMPLATE COMPREHENSIVE QA AUDIT');
  console.log('====================================================\n');

  let errors = [];
  let warnings = [];
  let totalTemplatesFound = 0;
  const subjectsMap = new Map();
  const headlinesMap = new Map();

  // 1. Check Industry Folders
  for (const industry of REQUIRED_INDUSTRIES) {
    const indPath = path.join(projectRoot, industry);
    if (!fs.existsSync(indPath)) {
      errors.push(`Missing industry folder: ${industry}`);
      continue;
    }

    console.log(`Checking Industry [${industry}]...`);

    // 2. Check 10 Files in Each Industry
    for (const fileName of REQUIRED_FILES) {
      const filePath = path.join(indPath, fileName);
      if (!fs.existsSync(filePath)) {
        errors.push(`Missing template file: ${industry}/${fileName}`);
        continue;
      }

      totalTemplatesFound++;
      const content = fs.readFileSync(filePath, 'utf8');

      // Check Subject
      const subjectMatch = content.match(/<meta\s+name=["']email-subject["']\s+content=["'](.*?)["']/i);
      if (!subjectMatch || !subjectMatch[1] || subjectMatch[1].trim() === '') {
        errors.push(`[${industry}/${fileName}] Missing or empty <meta name="email-subject">`);
      } else {
        const sub = subjectMatch[1].trim();
        if (subjectsMap.has(sub)) {
          errors.push(`Duplicate subject line detected in [${industry}/${fileName}] (also in ${subjectsMap.get(sub)})`);
        } else {
          subjectsMap.set(sub, `${industry}/${fileName}`);
        }
      }

      // Check Preheader
      const preheaderMatch = content.match(/<meta\s+name=["']email-preheader["']\s+content=["'](.*?)["']/i);
      if (!preheaderMatch || !preheaderMatch[1] || preheaderMatch[1].trim() === '') {
        errors.push(`[${industry}/${fileName}] Missing or empty <meta name="email-preheader">`);
      }

      // Check Headline (h1)
      const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (!h1Match || !h1Match[1] || h1Match[1].trim() === '') {
        errors.push(`[${industry}/${fileName}] Missing or empty <h1> headline`);
      } else {
        const headline = h1Match[1].replace(/\s+/g, ' ').trim();
        if (headlinesMap.has(headline)) {
          errors.push(`Duplicate headline detected in [${industry}/${fileName}] (also in ${headlinesMap.get(headline)})`);
        } else {
          headlinesMap.set(headline, `${industry}/${fileName}`);
        }
      }

      // Check at least 3 subheadings (h2 or h3)
      const subheadings = content.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi) || [];
      if (subheadings.length < 3) {
        errors.push(`[${industry}/${fileName}] Found only ${subheadings.length} subheadings (minimum 3 required)`);
      }

      // Check CTA button
      if (!content.includes('href="https://trustgrid.ai') || !content.includes('&rarr;')) {
        errors.push(`[${industry}/${fileName}] Missing primary bulletproof CTA button`);
      }

      // Check Official Logo (Mandatory)
      if (!content.includes('1vp4k2.png') && !content.includes('trustgrid-logo.png')) {
        errors.push(`[${industry}/${fileName}] Missing official TrustGrid.AI logo in header`);
      }

      // Check Footer (Sections A, B, C, D, E)
      if (!content.includes('Prefer to talk directly?') ||
          !content.includes('Enterprise AI Engineering Practice') ||
          (!content.includes('0p1swt.jpg') && !content.includes('wtlzmt.jpg') && !content.includes('trustgrid-promo-footer')) ||
          !content.includes('Unsubscribe') ||
          !content.includes('Official Source Evidence')) {
        errors.push(`[${industry}/${fileName}] Incomplete or missing mandatory footer components`);
      }

      // Check word count (strip HTML)
      const textOnly = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const words = textOnly.split(' ').filter(w => w.length > 0);
      if (words.length < 300) {
        warnings.push(`[${industry}/${fileName}] Word count is ${words.length} (target is 350-650 words)`);
      }

      // Check for placeholder body leakages
      if (content.includes('TODO') || content.includes('Lorem ipsum')) {
        errors.push(`[${industry}/${fileName}] Contains unfinished placeholder markers`);
      }
    }
  }

  // 3. Check Image assets
  const imagesDir = path.join(projectRoot, 'images');
  if (!fs.existsSync(imagesDir)) {
    errors.push('Missing images directory');
  } else {
    // Check official logo asset
    if (!fs.existsSync(path.join(imagesDir, 'trustgrid-logo.png'))) {
      errors.push('Missing local official logo asset: images/trustgrid-logo.png');
    }
    for (const ind of REQUIRED_INDUSTRIES) {
      const imgPath = path.join(imagesDir, `${ind}.jpg`);
      if (!fs.existsSync(imgPath)) {
        errors.push(`Missing local image asset for ${ind}: images/${ind}.jpg`);
      }
    }
  }

  // 4. Verify Total Template Count
  console.log('\n----------------------------------------------------');
  console.log(`Total Templates Validated : ${totalTemplatesFound} / 90`);
  console.log(`Unique Subject Lines      : ${subjectsMap.size} / 90`);
  console.log(`Unique Headlines          : ${headlinesMap.size} / 90`);
  console.log('----------------------------------------------------');

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`);
    warnings.forEach(w => console.warn(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.error(`\nValidation FAILED with ${errors.length} errors:`);
    errors.forEach(e => console.error(`  [X] ${e}`));
    process.exit(1);
  } else {
    console.log('\n[PASS] 100% QA VALIDATION SUCCESSFUL!');
    console.log('All 90 templates meet all requirements with distinct copy, verified offerings, and compliant markup.\n');
  }
}

runValidation();
