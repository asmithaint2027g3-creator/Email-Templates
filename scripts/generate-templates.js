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

export function renderEmailHtml(folderKey, t) {
  const cdnUrl = CDN_IMAGE_FALLBACKS[folderKey] || 'https://files.catbox.moe/0hdy60.jpg';
  const localImgPath = `../images/${folderKey}.jpg`;
  const industryTitle = INDUSTRY_NAMES[folderKey] || folderKey;

  // Render methodology or table if present
  let middleHtml = '';
  if (t.methodology && t.methodology.length > 0) {
    middleHtml = `
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 16px 0 24px 0; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
        ${t.methodology.map((m, idx) => `
          <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
            <td style="padding: 12px 16px; width: 32px; vertical-align: top; font-family: 'Times New Roman', Times, serif; font-size: 14px; font-weight: bold; color: #0284c7; border-bottom: ${idx === t.methodology.length - 1 ? 'none' : '1px solid #e2e8f0'};">
              ${idx + 1}.
            </td>
            <td style="padding: 12px 16px 12px 0; vertical-align: top; font-family: 'Times New Roman', Times, serif; font-size: 14px; line-height: 22px; color: #334155; border-bottom: ${idx === t.methodology.length - 1 ? 'none' : '1px solid #e2e8f0'};">
              <strong style="color: #0f172a;">${m.step}:</strong> ${m.detail}
            </td>
          </tr>
        `).join('')}
      </table>
    `;
  } else if (t.tableData && t.tableData.length > 0) {
    const isChallengeSolution = Boolean(t.tableData[0].challenge);
    middleHtml = `
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 16px 0 24px 0; border-collapse: collapse; border: 1px solid #cbd5e1; font-family: 'Times New Roman', Times, serif; font-size: 13.5px;">
        <tr style="background-color: #f1f5f9; text-align: left;">
          <th style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #0f172a; font-weight: bold;">${isChallengeSolution ? 'Operational Domain' : 'Performance Dimension'}</th>
          <th style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #0f172a; font-weight: bold;">${isChallengeSolution ? 'Core Challenge' : 'Measurable Impact'}</th>
          ${isChallengeSolution ? '<th style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #0f172a; font-weight: bold;">Engineered Solution</th>' : ''}
        </tr>
        ${t.tableData.map(row => `
          <tr style="background-color: #ffffff;">
            <td style="padding: 10px 14px; border: 1px solid #cbd5e1; font-weight: bold; color: #0f172a; vertical-align: top;">${row.area || row.metric}</td>
            <td style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #334155; vertical-align: top;">${row.challenge || row.impact}</td>
            ${isChallengeSolution ? `<td style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #0369a1; vertical-align: top;">${row.solution}</td>` : ''}
          </tr>
        `).join('')}
      </table>
    `;
  }

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
      font-family: 'Times New Roman', Times, Baskerville, Georgia, serif !important;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .content-padding {
        padding: 24px 18px !important;
      }
      .header-padding {
        padding: 20px 18px !important;
      }
      .headline-text {
        font-size: 20px !important;
        line-height: 26px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-align: left;">
  
  <!-- Hidden Preheader for Inbox Preview -->
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${t.preheader}
  </div>

  <!-- Background Wrapper -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 28px 12px 40px 12px;">
        
        <!-- Main Email Container (600px Max Width Standard) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);">
          
          <!-- Header Banner (Left-Aligned Layout Matching Reference Screenshot) -->
          <tr>
            <td background="${cdnUrl}" class="header-padding" style="padding: 26px 28px 26px 28px; background-color: #f1f5f9; background-image: url('${cdnUrl}'); background-position: center right; background-repeat: no-repeat; background-size: cover; border-bottom: 2px solid #0284c7; text-align: left;">
              <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px; height:150px;">
                <v:fill type="frame" src="${cdnUrl}" color="#f1f5f9" />
                <v:textbox inset="0,0,0,0">
              <![endif]-->

              <!-- Solid White Floating Card (Ensures 100% Text & Logo Visibility Over Any Industrial Background) -->
              <table border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; background-color: rgba(255, 255, 255, 0.96); border: 1px solid #cbd5e1; border-radius: 6px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08); text-align: left;">
                <tr>
                  <td align="left" style="padding: 16px 20px; text-align: left;">
                    <!-- Official TrustGrid.AI Logo -->
                    <a href="https://trustgrid.ai" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="../images/trustgrid-logo.png" alt="TRUSTGRID.AI" width="168" height="36" style="display: block; width: 168px; max-width: 175px; height: auto; border: 0; font-family: 'Times New Roman', Times, serif; font-size: 20px; font-weight: bold; color: #0284c7;" />
                    </a>
                    
                    <!-- Subtitle (100% Visible & High Contrast on Pure White) -->
                    <div style="font-family: 'Times New Roman', Times, serif; font-size: 10px; font-weight: bold; letter-spacing: 2px; color: #0f172a; text-transform: uppercase; margin-top: 6px;">
                      ENTERPRISE AI OPERATING COMPANY
                    </div>

                    <!-- Offering Pill Badge (Stacked Below & Left-Aligned) -->
                    <table border="0" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                      <tr>
                        <td align="left" style="padding: 5px 14px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px;">
                          <span style="font-family: 'Times New Roman', Times, serif; font-size: 12px; font-weight: bold; color: #0284c7; white-space: nowrap;">
                            ${t.offering}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!--[if gte mso 9]>
                </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>

          <!-- Main Email Content Body -->
          <tr>
            <td class="content-padding" style="padding: 34px 34px 28px 34px; background-color: #ffffff; text-align: left; font-family: 'Times New Roman', Times, Baskerville, Georgia, serif;">
              
              <!-- Topic Headline -->
              <h1 class="headline-text" style="margin: 0 0 20px 0; font-family: 'Times New Roman', Times, serif; font-size: 23px; line-height: 30px; font-weight: bold; color: #0f172a; text-align: left;">
                ${t.headline}
              </h1>

              <!-- Salutation -->
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.salutation}
              </p>

              <!-- Intro Paragraph -->
              <p style="margin: 0 0 22px 0; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.intro}
              </p>

              <!-- Section 1 -->
              <h3 style="margin: 22px 0 10px 0; font-family: 'Times New Roman', Times, serif; font-size: 17px; line-height: 24px; font-weight: bold; color: #0f172a; text-align: left;">
                ${t.subheading1}
              </h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.section1}
              </p>

              <!-- Section 2 -->
              <h3 style="margin: 22px 0 10px 0; font-family: 'Times New Roman', Times, serif; font-size: 17px; line-height: 24px; font-weight: bold; color: #0f172a; text-align: left;">
                ${t.subheading2}
              </h3>
              <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.section2}
              </p>

              <!-- Structured Content: Table or Process Steps -->
              ${middleHtml}

              <!-- Section 3 -->
              <h3 style="margin: 22px 0 10px 0; font-family: 'Times New Roman', Times, serif; font-size: 17px; line-height: 24px; font-weight: bold; color: #0f172a; text-align: left;">
                ${t.subheading3}
              </h3>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #334155;">
                ${t.section3}
              </p>

              <!-- A. Primary Call to Action Button (Bulletproof Table) -->
              <table border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0 20px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #0284c7;">
                    <a href="${t.ctaUrl}" target="_blank" style="display: inline-block; padding: 13px 28px; font-family: 'Times New Roman', Times, serif; font-size: 15px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #0284c7; border: 1px solid #0284c7; letter-spacing: 0.3px;">
                      ${t.ctaText} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- B. Contact Callout Box (Mandatory Design Standard) -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0 24px 0; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px;">
                <tr>
                  <td style="padding: 14px 18px; font-family: 'Times New Roman', Times, serif; font-size: 14px; line-height: 21px; color: #0f172a;">
                    Prefer to talk directly? Contact our team at <a href="tel:+919513088611" style="color: #0284c7; font-weight: bold; text-decoration: none;">+91 95130 88611</a> or <a href="mailto:sales@trustgrid.ai" style="color: #0284c7; font-weight: bold; text-decoration: none;">sales@trustgrid.ai</a> to discuss your industry's AI opportunities.
                  </td>
                </tr>
              </table>

              <!-- Thin Divider Above Signature -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0 20px 0;">
                <tr>
                  <td style="height: 1px; background-color: #e2e8f0; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>

              <!-- C. Professional Signature Block (Matching Reference Screenshot) -->
              <div style="font-family: 'Times New Roman', Times, serif; text-align: left;">
                <p style="margin: 0 0 4px 0; font-size: 15px; line-height: 22px; color: #334155;">
                  Sincerely,
                </p>
                <p style="margin: 0 0 2px 0; font-size: 16px; line-height: 22px; font-weight: bold; color: #0f172a;">
                  Enterprise AI Engineering Practice
                </p>
                <p style="margin: 0 0 6px 0; font-size: 14px; line-height: 20px; color: #475569;">
                  Systems &amp; Infrastructure Architecture &bull; <strong style="color: #0f172a;">TRUSTGRID.AI</strong>
                </p>
                <p style="margin: 0; font-size: 13.5px; line-height: 20px; color: #64748b;">
                  <a href="tel:+919513088611" style="color: #0284c7; text-decoration: none; font-weight: 500;">+91 95130 88611</a>
                  &nbsp;&bull;&nbsp;
                  <a href="mailto:sales@trustgrid.ai" style="color: #0284c7; text-decoration: none; font-weight: 500;">sales@trustgrid.ai</a>
                  &nbsp;&bull;&nbsp;
                  <a href="https://trustgrid.ai" style="color: #0284c7; text-decoration: none; font-weight: 500;">https://trustgrid.ai</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- D. Full-Width Branded Promotional Footer Image (MANDATORY DESIGN STANDARD) -->
          <tr>
            <td align="center" style="padding: 0; background-color: #ffffff; border-top: 1px solid #e2e8f0; line-height: 0;">
              <a href="https://trustgrid.ai" target="_blank" style="display: block; text-decoration: none;">
                <img src="../images/trustgrid-promo-footer.jpg" alt="TRUSTGRID.AI Enterprise AI Infrastructure - Full-Spectrum AI Engineering" width="600" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- E. Light-Gray Legal & Unsubscribe Footer Section -->
          <tr>
            <td style="padding: 24px 34px 28px 34px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-family: 'Times New Roman', Times, serif;">
              
              <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 18px; color: #64748b;">
                You received this email because of your role or professional interest in ${industryTitle}.
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

              <p style="margin: 0; font-size: 11.5px; line-height: 17px; color: #94a3b8;">
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
      const filePath = path.join(targetDir, t.fileName);
      fs.writeFileSync(filePath, html, 'utf8');
      totalGenerated++;
    }
    console.log(`Generated 10 templates for ${ind.folder}`);
  }

  console.log(`\nSuccess: All ${totalGenerated} email templates generated.`);
}

if (process.argv[1] && process.argv[1].endsWith('generate-templates.js')) {
  generateAllTemplates();
}
