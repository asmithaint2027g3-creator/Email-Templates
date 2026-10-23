import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load environment variables securely from .env
const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Industry image CDN fallbacks for robust email client rendering
const CDN_IMAGE_FALLBACKS = {
  '01-bfsi': 'https://files.catbox.moe/op8lsd.jpg',
  '02-capital-markets': 'https://files.catbox.moe/74u0pq.jpg',
  '03-public-sector-defense': 'https://files.catbox.moe/c3dgr4.jpg',
  '04-healthcare': 'https://files.catbox.moe/7eor3l.jpg',
  '05-life-sciences': 'https://files.catbox.moe/2wf0qk.jpg',
  '06-energy-utilities': 'https://files.catbox.moe/2kd8r8.jpg',
  '07-manufacturing': 'https://files.catbox.moe/0hdy60.jpg',
  '08-retail-ecommerce': 'https://files.catbox.moe/evwntr.jpg',
  '09-telecommunications': 'https://files.catbox.moe/1kvjzt.jpg'
};

const APPROVED_DIRS = [
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

async function main() {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  const templateArg = args[0];
  const customRecipient = args[1];

  if (!templateArg) {
    console.error('Error: Missing template argument.');
    console.log('Usage: npm run send-test -- <path/to/template.html> [optional-recipient@example.com]');
    console.log('Example: npm run send-test -- 07-manufacturing/01-introduction.html');
    process.exit(1);
  }

  // Security & Path Traversal Validation
  const normalizedPath = path.normalize(templateArg).replace(/^(\.\/|\.\\)/, '');
  const resolvedPath = path.resolve(projectRoot, normalizedPath);

  // Check if inside project root
  if (!resolvedPath.startsWith(projectRoot)) {
    console.error('Security Error: Path traversal detected. Access denied.');
    process.exit(1);
  }

  // Check if inside one of the approved industry folders
  const relPath = path.relative(projectRoot, resolvedPath).replace(/\\/g, '/');
  const pathParts = relPath.split('/');

  if (pathParts.length !== 2 || !APPROVED_DIRS.includes(pathParts[0])) {
    console.error(`Security Error: Template must reside directly inside an approved industry directory.`);
    console.error(`Approved directories: ${APPROVED_DIRS.join(', ')}`);
    process.exit(1);
  }

  if (!relPath.endsWith('.html')) {
    console.error('Error: Only .html files can be sent as email templates.');
    process.exit(1);
  }

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File does not exist: ${relPath}`);
    process.exit(1);
  }

  // Read template HTML
  const rawHtml = fs.readFileSync(resolvedPath, 'utf8');

  // Extract meta tags
  const subjectMatch = rawHtml.match(/<meta\s+name=["']email-subject["']\s+content=["'](.*?)["']/i);
  const preheaderMatch = rawHtml.match(/<meta\s+name=["']email-preheader["']\s+content=["'](.*?)["']/i);

  if (!subjectMatch || !subjectMatch[1] || subjectMatch[1].trim() === '') {
    console.error('Error: Template is missing a valid <meta name="email-subject" content="..."> tag.');
    process.exit(1);
  }

  const subject = subjectMatch[1].trim();
  const preheader = preheaderMatch ? preheaderMatch[1].trim() : '';

  // Credentials and Recipient
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const testRecipient = customRecipient || process.env.TEST_TO;

  if (!gmailUser || !gmailPass) {
    console.error('Configuration Error: Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env.');
    console.error('Please configure your Gmail App Password in .env before running test dispatches.');
    process.exit(1);
  }

  if (!testRecipient) {
    console.error('Configuration Error: No test recipient specified in .env (TEST_TO) or CLI arguments.');
    process.exit(1);
  }

  const assetBaseUrl = (process.env.EMAIL_ASSET_BASE_URL || '').replace(/\/$/, '');
  const industryKey = pathParts[0];
  const cdnFallback = CDN_IMAGE_FALLBACKS[industryKey];

  // Resolve local image paths for email client rendering
  let preparedHtml = rawHtml;

  // Replace relative image references
  // 1. If EMAIL_ASSET_BASE_URL is configured and not default placeholder, use it
  // 2. Otherwise fallback to reliable HTTPS CDN URL so Gmail renders without breaking
  const isNetlifyConfigured = assetBaseUrl && !assetBaseUrl.includes('your-deployed-site');

  // Convert logo and footer banner to inline CID attachments for 100% bulletproof rendering in Gmail
  const attachments = [
    {
      filename: 'trustgrid-logo.png',
      path: path.join(projectRoot, 'images', 'trustgrid-logo.png'),
      cid: 'trustgrid-logo'
    },
    {
      filename: 'trustgrid-promo-footer.jpg',
      path: path.join(projectRoot, 'images', 'trustgrid-promo-footer.jpg'),
      cid: 'trustgrid-promo-footer'
    }
  ];

  // Map logo and promotional footer to CID references
  preparedHtml = preparedHtml.replace(/(?:src=["'])(?:[^"']*images\/trustgrid-logo\.png|https:\/\/files\.catbox\.moe\/1vp4k2\.png)["']/gi, 'src="cid:trustgrid-logo"');
  preparedHtml = preparedHtml.replace(/(?:src=["'])(?:[^"']*images\/trustgrid-promo-footer\.jpg|https:\/\/files\.catbox\.moe\/(?:4h123m|0p1swt|wtlzmt)\.jpg)["']/gi, 'src="cid:trustgrid-promo-footer"');

  if (isNetlifyConfigured) {
    preparedHtml = preparedHtml.replace(/(?:src|background|url)\(["']?(?:\/|(?:\.\.\/)+)?images\/(0?[1-9]-[^"'\)]+)["']?\)/gi, (match, fileName) => {
      return match.replace(/(?:\/|(?:\.\.\/)+)?images\/[^\s"'\)]+/, `${assetBaseUrl}/images/${fileName}`);
    });
  } else if (cdnFallback) {
    // If local asset URL not yet deployed, map images/industry banner to verified CDN URL
    preparedHtml = preparedHtml.replace(/background-image:\s*url\(['"]?[^'"]*images\/[^'"]+['"]?\)/gi, `background-image: url('${cdnFallback}')`);
    preparedHtml = preparedHtml.replace(/background=["'][^"']*images\/[^"']+["']/gi, `background="${cdnFallback}"`);
    preparedHtml = preparedHtml.replace(/<v:fill[^>]*src=["'][^"']*images\/[^"']+["']/gi, (match) => {
      return match.replace(/src=["'][^"']+["']/, `src="${cdnFallback}"`);
    });
  }

  console.log('====================================================');
  console.log('TRUSTGRID.AI SINGLE TEST-EMAIL UTILITY');
  console.log('====================================================');
  console.log(`Template     : ${relPath}`);
  console.log(`Subject      : ${subject}`);
  console.log(`Preheader    : ${preheader || '(none)'}`);
  console.log(`Recipient    : ${testRecipient}`);
  console.log(`Attachments  : Inline CID logo & promotional footer banner`);
  console.log(`Connecting to Gmail SMTP (smtp.gmail.com:465 SSL) via ${gmailUser}...`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4, // Force IPv4
    connectionTimeout: 25000,
    greetingTimeout: 25000,
    socketTimeout: 30000,
    auth: {
      user: gmailUser,
      pass: gmailPass
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"TrustGrid.AI Test Dispatcher" <${gmailUser}>`,
      to: testRecipient,
      subject: `[TEST] ${subject}`,
      html: preparedHtml,
      attachments: attachments
    });

    console.log('----------------------------------------------------');
    console.log(`[SUCCESS] Test email successfully delivered!`);
    console.log(`Message ID   : ${info.messageId}`);
    console.log(`Sent To      : ${testRecipient}`);
    console.log('----------------------------------------------------');
  } catch (err) {
    // If port 465 failed, try service: 'gmail' (port 587 STARTTLS) as automated fallback
    try {
      console.log('Retrying via Gmail alternative port (587 STARTTLS)...');
      const fallbackTransporter = nodemailer.createTransport({
        service: 'gmail',
        family: 4,
        auth: {
          user: gmailUser,
          pass: gmailPass
        }
      });
      const info = await fallbackTransporter.sendMail({
        from: `"TrustGrid.AI Test Dispatcher" <${gmailUser}>`,
        to: testRecipient,
        subject: `[TEST] ${subject}`,
        html: preparedHtml,
        attachments: attachments
      });
      console.log('----------------------------------------------------');
      console.log(`[SUCCESS] Test email successfully delivered via fallback!`);
      console.log(`Message ID   : ${info.messageId}`);
      console.log(`Sent To      : ${testRecipient}`);
      console.log('----------------------------------------------------');
      return;
    } catch (fallbackErr) {
      console.error('----------------------------------------------------');
      console.error(`[ERROR] Failed to send email via Gmail SMTP:`);
      console.error(fallbackErr.message || err.message);
      console.error('Check your Gmail username and 16-character App Password.');
      console.error('----------------------------------------------------');
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error('Fatal execution error:', err.message);
  process.exit(1);
});
