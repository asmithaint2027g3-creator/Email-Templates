# TrustGrid-Email-Templates

90 individually authored, enterprise-grade, responsive HTML email templates for **TRUSTGRID.AI**, organized across 9 regulated industry sectors (exactly 10 distinct email templates per industry).

Every template is a complete, standalone, ready-to-preview HTML email built with conservative, email-client-safe markup, professional **Times New Roman** typography, crisp left-aligned header branding plates over industry visual banners, verified TrustGrid.AI practice mappings, structured process methodologies, and bulletproof CTA buttons.

---

## Project Structure

```text
TrustGrid-Email-Templates/
├── index.html                           # Lightweight directory linking to all 90 templates
├── 01-bfsi/                             # Banking, Financial Services & Insurance (10 templates)
├── 02-capital-markets/                  # Capital Markets & Asset Management (10 templates)
├── 03-public-sector-defense/            # Public Sector, Defense & Civic AI (10 templates)
├── 04-healthcare/                       # Healthcare & Health Systems (10 templates)
├── 05-life-sciences/                    # Life Sciences & Drug Discovery (10 templates)
├── 06-energy-utilities/                 # Energy, Utilities & Smart Infrastructure (10 templates)
├── 07-manufacturing/                    # Manufacturing & Industrial AI (10 templates)
├── 08-retail-ecommerce/                 # Retail, E-Commerce & Consumer Goods (10 templates)
├── 09-telecommunications/               # Telecommunications, Media & Cloud (10 templates)
├── images/                              # Standardized local header banner assets
│   ├── 01-bfsi.jpg
│   ├── 02-capital-markets.jpg
│   ├── ...
│   └── 09-telecommunications.jpg
├── scripts/
│   ├── send-test-email.js               # Local-only single test email dispatcher
│   ├── validate-templates.js            # Automated QA audit tool for all 90 templates
│   ├── generate-templates.js            # Template compiler engine
│   └── data/                            # Modular, industry-specific content datasets
├── package.json
├── .env.example                         # Environment configuration template
├── .gitignore                           # Excludes node_modules, .env, and local logs
└── netlify.toml                         # Static deployment configuration
```

---

## The 10 Email Types in Every Industry

Each industry folder contains these exact 10 templates:

| Filename | Purpose | Primary CTA |
| :--- | :--- | :--- |
| `01-introduction.html` | Industry introduction & enterprise opportunity | Schedule an AI Infrastructure Diagnostic |
| `02-industry-challenges.html` | Operational bottlenecks, data silos & compliance | Review Industry Architecture Frameworks |
| `03-ai-solutions.html` | Verified AI engineering approaches & multi-agent swarms | Explore Agentic Enterprise Solutions |
| `04-business-value.html` | Unit-task economics, TCO, and cycle-time metrics | Request a Value Engineering Assessment |
| `05-follow-up.html` | Thoughtful follow-up with architectural insights | Discuss Technical Architecture |
| `06-meeting-request.html` | Invitation to a focused 30-minute peer briefing | Select a Convenient Discussion Time |
| `07-use-case-spotlight.html` | Deep-dive into one high-impact operational workflow | Review the Use Case Architecture Blueprint |
| `08-technical-approach.html` | GPU kernels, PagedAttention, networking & PQC security | Download Technical Architecture Overview |
| `09-objection-handling.html` | Addressing security, data residency & legacy integration | Review Security & Compliance Documentation |
| `10-next-steps.html` | Low-friction 30-day Executive AI Diagnostic | Request an Executive AI Diagnostic |

---

## Local Setup & Quick Start

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure Environment (`.env`)
Create or edit your local `.env` file (copied from `.env.example`):
```ini
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-digit-app-password
TEST_TO=your-email@gmail.com
EMAIL_ASSET_BASE_URL=https://your-deployed-site.netlify.app
```

> **Note**: To obtain a Gmail App Password, enable 2-Step Verification in your Google Account security settings and create a dedicated App Password under Security &rarr; 2-Step Verification &rarr; App Passwords.

---

## Testing & Previewing Templates

### Preview Locally in Browser
You can open `index.html` or any individual template directly in your web browser:
```powershell
# Open the main template directory
Start-Process index.html

# Open a specific email template
Start-Process 07-manufacturing/01-introduction.html
```

### Send a Single Test Email to Your Inbox
Send an individual template directly to your configured `TEST_TO` address using Gmail SMTP:
```powershell
npm run send-test -- 07-manufacturing/01-introduction.html
```

You can test any of the 90 templates by specifying its relative path:
```powershell
npm run send-test -- 01-bfsi/01-introduction.html
npm run send-test -- 04-healthcare/07-use-case-spotlight.html
npm run send-test -- 08-retail-ecommerce/03-ai-solutions.html
```

The test runner:
- Validates that the requested path is inside an approved industry directory.
- Rejects path traversal and non-HTML files.
- Extracts the subject line from `<meta name="email-subject">`.
- Resolves image assets to high-reliability HTTPS CDN URLs for email clients.
- Enforces single-email sending (never sends in bulk or automatic loops).

---

## Quality Assurance & Validation

Run the automated QA test suite to verify all 90 templates:
```powershell
npm run validate
```

### Verified Acceptance Criteria:
- **Exact Folder Count**: Exactly 9 industry folders present.
- **Exact File Count**: Exactly 10 HTML files per folder = 90 total email templates.
- **100% Unique Subjects**: Every template has a unique, topic-tailored subject line.
- **100% Unique Headlines**: No duplicated headlines across templates.
- **Rich Content Depth**: Every email contains at least 3 topic-specific `<h3>` subheadings, structured tables or numbered 3-step methodologies, bulletproof CTA buttons, and standard corporate footers.
- **Zero Fabrication**: Adheres to strict accuracy standards—no invented customer names, fake testimonials, or unsubstantiated savings percentages.

---

## Netlify Deployment

This project is configured for instant static hosting on Netlify:

1. **Deploying via Netlify CLI**:
   ```powershell
   npx netlify deploy --prod --dir=.
   ```
2. **Deploying via Git**:
   - Push repository to GitHub/GitLab.
   - Connect repository in Netlify.
   - Set **Publish directory** to `.` (root).
   - Set **Build command** to blank (static HTML).

### Post-Deployment Step:
Once deployed, copy your production Netlify URL (e.g. `https://trustgrid-email-templates.netlify.app`) and update `EMAIL_ASSET_BASE_URL` in your local `.env`:
```ini
EMAIL_ASSET_BASE_URL=https://trustgrid-email-templates.netlify.app
```
`scripts/send-test-email.js` will automatically rewrite local relative image paths to your live Netlify asset URLs when dispatching test emails.
