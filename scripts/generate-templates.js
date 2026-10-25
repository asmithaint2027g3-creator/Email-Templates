import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { bfsiTemplates } from './data/bfsi.js';
import { capitalMarketsTemplates } from './data/capital-markets.js';
import { publicSectorTemplates } from './data/public-sector.js';
import { healthcareTemplates } from './data/healthcare.js';
import { lifeSciencesTemplates } from './data/life-sciences.js';
import { energyTemplates } from './data/energy.js';
import { manufacturingTemplates } from './data/manufacturing.js';
import { retailTemplates } from './data/retail.js';
import { telecommunicationsTemplates } from './data/telecommunications.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

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

const INDUSTRY_NAMES = {
  '01-bfsi': 'Banking, Financial Services & Insurance',
  '02-capital-markets': 'Capital Markets & Asset Management',
  '03-public-sector-defense': 'Public Sector, Defense & Civic AI',
  '04-healthcare': 'Healthcare & Health Systems',
  '05-life-sciences': 'Life Sciences & Drug Discovery',
  '06-energy-utilities': 'Energy, Utilities & Smart Infrastructure',
  '07-manufacturing': 'Manufacturing & Industrial AI',
  '08-retail-ecommerce': 'Retail, E-Commerce & Consumer Goods',
  '09-telecommunications': 'Telecommunications, Media & Cloud'
};

const INDUSTRY_TOPIC_SUFFIX = {
  '01-bfsi': 'BANKING & FINANCIAL SERVICES OPERATIONS',
  '02-capital-markets': 'CAPITAL MARKETS & TRADING ARCHITECTURE',
  '03-public-sector-defense': 'CIVIC AI & PUBLIC SECTOR INFRASTRUCTURE',
  '04-healthcare': 'CLINICAL AI & HEALTHCARE SYSTEMS',
  '05-life-sciences': 'RESEARCH INTELLIGENCE & LIFE SCIENCES',
  '06-energy-utilities': 'ENERGY & UTILITIES GRID INFRASTRUCTURE',
  '07-manufacturing': 'MANUFACTURING OPERATIONS & INDUSTRIAL AI',
  '08-retail-ecommerce': 'COMMERCE INTELLIGENCE & CONSUMER SYSTEMS',
  '09-telecommunications': 'AUTONOMOUS NETWORKING & TELECOM CLOUD'
};

const INDUSTRY_CLOSINGS = {
  '01-bfsi': 'To compounding operational resilience and trusted banking AI',
  '02-capital-markets': 'To deterministic alpha generation and low-latency intelligence',
  '03-public-sector-defense': 'To sovereign, verifiable civic AI systems and public trust',
  '04-healthcare': 'To clinical precision, HIPAA-governed workflows, and patient outcomes',
  '05-life-sciences': 'To accelerated drug discovery and GxP-compliant research intelligence',
  '06-energy-utilities': 'To grid reliability, resilient power generation, and asset optimization',
  '07-manufacturing': 'To continuous compounding value and plant floor operational excellence',
  '08-retail-ecommerce': 'To intelligent inventory velocity and seamless customer journeys',
  '09-telecommunications': 'To autonomous network operations and sovereign edge connectivity'
};

export function renderEmailHtml(folderKey, t) {
  const cdnUrl = CDN_IMAGE_FALLBACKS[folderKey] || 'https://files.catbox.moe/0hdy60.jpg';
  const localImgPath = `../images/${folderKey}.jpg`;
  const industryTitle = INDUSTRY_NAMES[folderKey] || folderKey;
  const topicLabel = `${t.offering.toUpperCase()} &bull; ${INDUSTRY_TOPIC_SUFFIX[folderKey] || 'ENTERPRISE AI ARCHITECTURE'}`;
  const closingPhrase = INDUSTRY_CLOSINGS[folderKey] || 'To continuous compounding value and operational excellence';

  // Middle structured element: Process Steps or Technical Comparison Table
  let middleHtml = '';
  if (t.methodology && t.methodology.length > 0) {
    middleHtml = `
      <!-- Structured Process Workflow Cards -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 18px 0 24px 0; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
        ${t.methodology.map((m, idx) => `
          <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
            <td style="padding: 14px 16px; width: 34px; vertical-align: top; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; color: #0284c7; border-bottom: ${idx === t.methodology.length - 1 ? 'none' : '1px solid #e2e8f0'};">
              ${idx + 1}.
            </td>
            <td style="padding: 14px 16px 14px 0; vertical-align: top; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22px; color: #334155; border-bottom: ${idx === t.methodology.length - 1 ? 'none' : '1px solid #e2e8f0'};">
              <strong style="color: #0f172a;">${m.step}:</strong> ${m.detail}
            </td>
          </tr>
        `).join('')}
      </table>
    `;
  } else if (t.tableData && t.tableData.length > 0) {
    const isChallengeSolution = Boolean(t.tableData[0].challenge);
    middleHtml = `
      <!-- Technical Comparison & Operational Analysis Table -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 18px 0 24px 0; border-collapse: collapse; border: 1px solid #cbd5e1; font-family: Arial, Helvetica, sans-serif; font-size: 13.5px; border-radius: 6px; overflow: hidden;">
        <thead>
          <tr style="background-color: #0f172a; text-align: left;">
            <th style="padding: 11px 14px; border: 1px solid #1e293b; color: #ffffff; font-weight: bold; font-size: 13px;">${isChallengeSolution ? 'Operational Domain' : 'Performance Dimension'}</th>
            <th style="padding: 11px 14px; border: 1px solid #1e293b; color: #ffffff; font-weight: bold; font-size: 13px;">${isChallengeSolution ? 'Core Challenge' : 'Measurable Impact'}</th>
            ${isChallengeSolution ? '<th style="padding: 11px 14px; border: 1px solid #1e293b; color: #ffffff; font-weight: bold; font-size: 13px;">Engineered Solution</th>' : ''}
          </tr>
        </thead>
        <tbody>
          ${t.tableData.map((row, idx) => `
            <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
              <td style="padding: 11px 14px; border: 1px solid #e2e8f0; font-weight: bold; color: #0f172a; vertical-align: top;">${row.area || row.metric}</td>
              <td style="padding: 11px 14px; border: 1px solid #e2e8f0; color: #475569; vertical-align: top; line-height: 20px;">${row.challenge || row.impact}</td>
              ${isChallengeSolution ? `<td style="padding: 11px 14px; border: 1px solid #e2e8f0; color: #0369a1; vertical-align: top; line-height: 20px; background-color: #f0f9ff; font-weight: 500;">${row.solution}</td>` : ''}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Value Proposition Callout Box
  const calloutText = t.highlightCallout || `Combining enterprise-grade AI engineering with deterministic governance allows organizations to systematically eliminate latent operational waste, accelerate decision velocity, and compound business value over time.`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="email-subject" content="${t.subject}" />
  <meta name="email-preheader" content="${t.preheader}" />
  <title>${t.subject}</title>
  <style type="text/css">
    body, table, td, a, p, h1, h2, h3, span {
      font-family: Arial, Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    @media only screen and (max-width: 640px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .content-padding {
        padding: 24px 18px !important;
      }
      .header-bar-padding {
        padding: 16px 18px !important;
      }
      .headline-text {
        font-size: 21px !important;
        line-height: 28px !important;
      }
      .stack-column {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-align: left;">
  
  <!-- Hidden Preheader for Inbox Preview -->
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${t.preheader}
  </div>

  <!-- Outer Canvas Wrapper -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 28px 12px 40px 12px;">
        
        <!-- Main Email Container (600px Max Width Standard) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);">
          
          <!-- Branded Top Navigation / Identity Bar -->
          <tr>
            <td class="header-bar-padding" style="padding: 18px 28px; background-color: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <!-- Left: Official Wordmark Logo & Subtitle -->
                  <td align="left" valign="middle">
                    <a href="https://trustgrid.ai" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="../images/trustgrid-logo.png" alt="TRUSTGRID.AI" width="168" height="36" style="display: block; width: 168px; max-width: 175px; height: auto; border: 0;" />
                    </a>
                    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 9.5px; font-weight: 700; letter-spacing: 1.8px; color: #475569; text-transform: uppercase; margin-top: 5px;">
                      ENTERPRISE AI OPERATING COMPANY
                    </div>
                  </td>
                  <!-- Right: Verified Offering Pill Badge -->
                  <td align="right" valign="middle">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 6px 14px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 16px;">
                          <span style="font-family: Arial, Helvetica, sans-serif; font-size: 11.5px; font-weight: 600; color: #0284c7; white-space: nowrap;">
                            ${t.offering}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Industry-Specific Panoramic Header Banner Image -->
          <tr>
            <td align="center" style="padding: 0; background-color: #f8fafc; line-height: 0; border-bottom: 2px solid #0284c7;">
              <img src="${localImgPath}" alt="TRUSTGRID.AI ${industryTitle} Engineering Architecture" width="600" height="200" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
            </td>
          </tr>

          <!-- Main Email Content Body -->
          <tr>
            <td class="content-padding" style="padding: 34px 34px 28px 34px; background-color: #ffffff; text-align: left; font-family: Arial, Helvetica, sans-serif;">
              
              <!-- Topic Category Label with Left Blue Border -->
              <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 18px;">
                <tr>
                  <td style="padding: 5px 12px; background-color: #f0f9ff; border-left: 3px solid #0284c7; border-radius: 0 4px 4px 0;">
                    <span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; color: #0284c7; text-transform: uppercase;">
                      ${topicLabel}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Main Topic Headline -->
              <h1 class="headline-text" style="margin: 0 0 20px 0; font-family: Arial, Helvetica, sans-serif; font-size: 24px; line-height: 32px; font-weight: 800; color: #0f172a; text-align: left; letter-spacing: -0.3px;">
                ${t.headline}
              </h1>

              <!-- Salutation -->
              <p style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.salutation || 'Dear [First Name],'}
              </p>

              <!-- Compelling Opening Context Paragraph -->
              <p style="margin: 0 0 20px 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 25px; color: #334155;">
                ${t.intro}
              </p>

              <!-- Highlighted Primary Value Proposition Callout Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0 24px 0; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                <tr>
                  <td style="padding: 16px 20px; font-family: Arial, Helvetica, sans-serif; font-size: 14.5px; line-height: 23px; color: #0f172a;">
                    <strong style="color: #0284c7;">TRUSTGRID.AI Engineered Impact:</strong> ${calloutText}
                  </td>
                </tr>
              </table>

              <!-- Section 1: Problem / Friction -->
              <h3 style="margin: 24px 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 17px; line-height: 24px; font-weight: 700; color: #0f172a; text-align: left;">
                ${t.subheading1}
              </h3>
              <p style="margin: 0 0 20px 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.section1}
              </p>

              <!-- Section 2: Technical Architecture -->
              <h3 style="margin: 24px 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 17px; line-height: 24px; font-weight: 700; color: #0f172a; text-align: left;">
                ${t.subheading2}
              </h3>
              <p style="margin: 0 0 14px 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.section2}
              </p>

              <!-- Middle Element: Comparison Table or Numbered Process Cards -->
              ${middleHtml}

              <!-- Business Value Section: High-Impact Dark Navy Panel -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0 26px 0; background-color: #07143d; border-radius: 6px; overflow: hidden;">
                <tr>
                  <td style="padding: 22px 24px; font-family: Arial, Helvetica, sans-serif; color: #ffffff;">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #38bdf8; text-transform: uppercase; margin-bottom: 8px;">
                      DISCIPLINED BUSINESS VALUE &amp; ATTRIBUTION
                    </div>
                    <h3 style="margin: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16.5px; line-height: 23px; font-weight: 700; color: #ffffff;">
                      ${t.subheading3}
                    </h3>
                    <div style="font-size: 14px; line-height: 22px; color: #cbd5e1;">
                      ${t.section3}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Primary Call to Action Button -->
              <table border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0 20px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #0284c7;">
                    <a href="${t.ctaUrl}" target="_blank" style="display: inline-block; padding: 14px 30px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #0284c7; border: 1px solid #0284c7; letter-spacing: 0.3px;">
                      ${t.ctaText} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer Section 1: Contact Callout Strip -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0 20px 0; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px;">
                <tr>
                  <td style="padding: 14px 18px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #0f172a;">
                    Prefer to talk directly? Reach <strong style="color: #0f172a;">Asmitha</strong>, <strong style="color: #0f172a;">Enterprise AI Systems Advisor</strong>, directly at <a href="tel:+919513088612" style="color: #0284c7; font-weight: bold; text-decoration: none;">+91 95130 88612</a> or <a href="mailto:asmitha@trustgrid.ai.com" style="color: #0284c7; font-weight: bold; text-decoration: none;">asmitha@trustgrid.ai.com</a>.
                  </td>
                </tr>
              </table>

              <!-- Subtle Divider Above Signature -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 22px 0 18px 0;">
                <tr>
                  <td style="height: 1px; background-color: #e2e8f0; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>

              <!-- Footer Section 2: Professional Signature Block -->
              <div style="font-family: Arial, Helvetica, sans-serif; text-align: left;">
                <p style="margin: 0 0 6px 0; font-size: 14.5px; line-height: 22px; color: #475569;">
                  ${closingPhrase},
                </p>
                <p style="margin: 0 0 2px 0; font-size: 16px; line-height: 22px; font-weight: bold; color: #0f172a;">
                  Asmitha
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13.5px; line-height: 20px; color: #475569;">
                  Enterprise AI Systems Advisor &bull; Enterprise AI Engineering Practice &bull; <strong style="color: #0f172a;">TRUSTGRID.AI</strong>
                </p>
                <p style="margin: 0; font-size: 13px; line-height: 20px; color: #64748b;">
                  <a href="tel:+919513088612" style="color: #0284c7; text-decoration: none; font-weight: 500;">+91 95130 88612</a>
                  &nbsp;&bull;&nbsp;
                  <a href="mailto:asmitha@trustgrid.ai.com" style="color: #0284c7; text-decoration: none; font-weight: 500;">asmitha@trustgrid.ai.com</a>
                  &nbsp;&bull;&nbsp;
                  <a href="https://trustgrid.ai" style="color: #0284c7; text-decoration: none; font-weight: 500;">trustgrid.ai</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer Section 3: Full-Width Panoramic Brand Banner Image -->
          <tr>
            <td align="center" style="padding: 0; background-color: #ffffff; border-top: 1px solid #e2e8f0; line-height: 0;">
              <a href="https://trustgrid.ai" target="_blank" style="display: block; text-decoration: none;">
                <img src="../images/trustgrid-promo-footer.jpg" alt="TRUSTGRID.AI Enterprise AI Infrastructure - Driving the Future of Enterprise Intelligence" width="600" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- Footer Section 4: Light-Gray Legal & Unsubscribe Footer Section -->
          <tr>
            <td style="padding: 26px 34px 30px 34px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-family: Arial, Helvetica, sans-serif;">
              
              <p style="margin: 0 0 10px 0; font-size: 12.5px; line-height: 19px; color: #64748b;">
                You received this email because of your professional role or business interests in ${industryTitle}. If this message is not relevant, you can <a href="https://trustgrid.ai/unsubscribe-sample" style="color: #0284c7; text-decoration: underline;">unsubscribe here</a>.
              </p>

              <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 18px; color: #64748b;">
                Official Source Evidence: <a href="${t.evidenceUrl}" style="color: #0284c7; text-decoration: underline;">${t.evidenceUrl}</a><br />
                Target Offering: <strong>${t.offering}</strong> (Verified Company Capability)
              </p>

              <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 18px; color: #64748b;">
                <a href="https://trustgrid.ai/unsubscribe-sample" style="color: #0284c7; text-decoration: underline;">Unsubscribe</a>
                &nbsp;&bull;&nbsp;
                <a href="https://trustgrid.ai/privacy" style="color: #64748b; text-decoration: underline;">Privacy Policy</a>
                &nbsp;&bull;&nbsp;
                <a href="https://trustgrid.ai/contact" style="color: #64748b; text-decoration: underline;">Contact Team</a>
              </p>

              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #94a3b8;">
                &copy; 2026 TRUSTGRID.AI. All rights reserved. | <a href="https://trustgrid.ai" style="color: #94a3b8; text-decoration: none;">trustgrid.ai</a>
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export function generateAllTemplates() {
  const industries = [
    { folder: '01-bfsi', templates: bfsiTemplates },
    { folder: '02-capital-markets', templates: capitalMarketsTemplates },
    { folder: '03-public-sector-defense', templates: publicSectorTemplates },
    { folder: '04-healthcare', templates: healthcareTemplates },
    { folder: '05-life-sciences', templates: lifeSciencesTemplates },
    { folder: '06-energy-utilities', templates: energyTemplates },
    { folder: '07-manufacturing', templates: manufacturingTemplates },
    { folder: '08-retail-ecommerce', templates: retailTemplates },
    { folder: '09-telecommunications', templates: telecommunicationsTemplates }
  ];

  let totalGenerated = 0;

  for (const ind of industries) {
    const targetDir = path.join(projectRoot, ind.folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const t of ind.templates) {
      const html = renderEmailHtml(ind.folder, t);
      const outPath = path.join(targetDir, t.fileName);
      fs.writeFileSync(outPath, html, 'utf8');

      // Also generate plain-text version (.txt)
      const txtPath = outPath.replace(/\.html$/, '.txt');
      const textOnly = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&rarr;/g, '->')
        .replace(/&bull;/g, '*')
        .replace(/&copy;/g, '(c)')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
      fs.writeFileSync(txtPath, textOnly, 'utf8');

      totalGenerated++;
    }
    console.log(`Generated 10 templates for ${ind.folder}`);
  }

  // Also mirror to d:\TrustGrid-Industry-Email-Studio\templates if directory exists
  const studioTemplatesDir = path.resolve('d:/TrustGrid-Industry-Email-Studio/templates');
  if (fs.existsSync(studioTemplatesDir)) {
    for (const ind of industries) {
      const studioIndDir = path.join(studioTemplatesDir, ind.folder);
      if (!fs.existsSync(studioIndDir)) {
        fs.mkdirSync(studioIndDir, { recursive: true });
      }
      for (const t of ind.templates) {
        const html = renderEmailHtml(ind.folder, t);
        fs.writeFileSync(path.join(studioIndDir, t.fileName), html, 'utf8');
      }
    }
    console.log('Mirrored all 90 templates to d:/TrustGrid-Industry-Email-Studio/templates');
  }

  console.log(`\nSuccessfully generated all ${totalGenerated} HTML and TXT email templates!`);
}

generateAllTemplates();