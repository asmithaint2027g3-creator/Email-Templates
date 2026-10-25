import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const industries = [
  {
    folder: '02-capital-markets',
    name: 'Capital Markets & Asset Management',
    prefix: '02',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling alpha generation without latency drag',
        preheader: 'Eliminate compute bottlenecks and achieve deterministic trading ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Trading AI',
        body: '<strong>Top-tier asset managers are losing alpha to sub-millisecond latency drag and fragmented GPU clusters.</strong> Many firms have sunk $2M+ into cloud compute, only to find quantitative teams spending 60% of their time on data pipeline firefighting rather than strategy optimization. The result is 30–50% GPU underutilization and critical latency spikes during market open. TrustGrid engineers full-stack, low-latency AI infrastructure to eliminate this operational leakage, transforming your compute spend into a verified alpha driver.',
        highlight: '30–60% inference cost reduction (TCO) with sub-millisecond latency.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your quantitative edge',
        preheader: 'Quantify backtesting delays, compute sprawl, and lost quant-engineering capacity.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Capital Markets, the bottleneck isn’t the strategy; it’s the infrastructure causing tail latency.</strong> Legacy network fabrics and unoptimized kernel scheduling create a capacity bottleneck of 200+ lost quant-engineering hours per quarter. This directly contributes to stagnant Revenue Per Employee (RPE) in your data division due to constant rework and delayed backtesting cycles. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level accelerator tuning to eliminate silent packet drops.',
        highlight: 'Lossless RoCEv2 fabrics and NCCL collective tuning.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for trading: Lossless fabrics & governed risk agents',
        preheader: 'Two pre-calibrated stacks deploy deterministic AI to eliminate trading bottlenecks.',
        headline: 'Shifting the Baseline to Macro Business Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: 'Ultra-low latency, non-blocking InfiniBand fabrics engineered for 0.00% packet loss.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Production multi-agent systems with deterministic reasoning DAGs for automated portfolio risk modeling.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-market for real-time algorithmic execution.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging your AI compute spend to the CFO balance sheet',
        preheader: 'Connect trading compute spend to unit economics and CFO balance sheet metrics.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable P&L Attribution, Not Vague ROI',
        body: '<strong>AI engineering in trading must be measured by P&L attribution, not just model accuracy.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps to track unit economics and cost-per-task token modeling. With Q4 board reviews approaching, you need hard metrics, not pilot promises. We guarantee a 3–10x measurable production ROI within a 90-day value sprint.',
        highlight: 'Real-time P&L attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling alpha generation without latency drag',
        preheader: 'Following up on quantitative infrastructure bottlenecks and 12x throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your quantitative infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies and memory caching, we helped a Tier-1 asset manager achieve 12× throughput yield on mission-critical portfolio backtesting workloads without purchasing new silicon. Every week of delay before your legacy cloud vendor auto-renewal compounds operational leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Quant Infrastructure Audit',
        preheader: 'A focused two-week diagnostic delivers a prioritized roadmap with quantified targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new trading infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets (bypassing full CFO/Board review thresholds) and delivers a comprehensive audit of your GPU cluster utilization, agent security posture, and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting portfolio risk backtesting from 48 hours to 4 hours',
        preheader: 'Case study on cutting portfolio risk backtesting cycle time with governed agentic fabrics.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading asset manager faced a 48-hour cycle time for portfolio risk backtesting.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4-hour cycle time.</strong>',
        highlight: '70–90% task autonomy, reducing cycle time to 4 hours, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, FPGA tuning, and SEC audit trails',
        preheader: 'Deep systems engineering for high-throughput, SEC-compliant trading clusters.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'Collective communication tuning for non-blocking fabric topology.' },
          { title: 'Zero-Trust MCP', text: 'Granular identity and tool execution boundaries for autonomous agents.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Custom hardware acceleration and memory caching for sub-millisecond execution.' },
          { title: 'L1-L7 PQC', text: 'Post-Quantum Cryptography safeguarding model telemetry and audit logs.' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with SEC and FINRA regulators."',
        preheader: 'Trust is an architectural system property ensuring verifiable SEC and FINRA compliance.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; the SEC requires absolute explainability.”',
        body: '<strong>We know that for Capital Markets, evaluation criteria are weighted 50% on regulatory auditability.</strong> With strict regulatory deadlines looming, you cannot afford a compliance breach. TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for SEC/FINRA compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Quant Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day quant pathway.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud compute contracts are renewing soon.</strong> Here is the deterministic pathway to secure your infrastructure:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  },
  {
    folder: '03-public-sector-defense',
    name: 'Public Sector, Defense & Civic AI',
    prefix: '03',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling sovereign AI without latency drag',
        preheader: 'Eliminate infrastructure bottlenecks and achieve deterministic defense AI ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Defense AI',
        body: '<strong>Defense agencies are losing mission advantage to fragmented GPU clusters and legacy IT.</strong> Many have sunk $2M+ into cloud compute, only to find data teams spending 60% of time on pipeline firefighting. Result: 30-50% GPU underutilization and critical latency spikes. TrustGrid engineers full-stack, low-latency AI infrastructure to eliminate this leakage.',
        highlight: '30–60% inference cost reduction with deterministic SLAs.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your mission edge',
        preheader: 'Quantify mission readiness delays, compute sprawl, and lost engineering capacity.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Defense, the bottleneck is infrastructure causing tail latency and compute sprawl.</strong> Legacy fabrics create 200+ lost engineering hours per quarter. This directly contributes to stagnant mission readiness. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level tuning.',
        highlight: 'Lossless RoCEv2 fabrics to eliminate silent packet drops.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for defense: Lossless fabrics & secure agentic fleets',
        preheader: 'Two pre-calibrated stacks deploy deterministic AI to eliminate latency bottlenecks.',
        headline: 'Shifting the Baseline to Mission Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: '0.00% packet loss InfiniBand.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Deterministic reasoning DAGs for secure multi-agent coordination.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-mission for real-time logistics and threat detection.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging AI compute spend to mission ROI',
        preheader: 'Connect AI compute spend to unit economics and mission-ready outcomes.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable Mission ROI, Not Vague Pilots',
        body: '<strong>AI engineering in defense must be measured by mission outcomes.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps. With fiscal year reviews approaching, you need hard metrics. We guarantee 3–10x measurable production ROI within 90 days.',
        highlight: 'Real-time mission attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling sovereign AI without latency drag',
        preheader: 'Following up on your sovereign AI infrastructure and throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies, we helped a Tier-1 agency achieve 12× throughput yield on mission-critical workloads without purchasing new silicon. Every week of delay before legacy vendor renewal compounds leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Defense Infrastructure Audit',
        preheader: 'A focused two-week diagnostic delivers a prioritized roadmap with quantified targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new defense infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets and delivers a comprehensive audit of GPU utilization and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting logistics planning from 48 hours to 4 hours',
        preheader: 'A defense case study on governed multi-agent execution and mission autonomy.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading agency faced a 48-hour cycle time for logistics planning.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4-hour cycle time.</strong>',
        highlight: '70–90% task autonomy, reducing cycle time to 4 hours, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, Zero Trust, and FedRAMP compliance',
        preheader: 'Deep systems engineering for high-throughput, compliant sovereign AI clusters.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'Lossless fabric collective tuning for sovereign AI data centers.' },
          { title: 'Zero-Trust MCP', text: 'Model Context Protocol boundaries for secure multi-agent governance.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Hardware acceleration for sub-millisecond inference and classified telemetry.' },
          { title: 'L1-L7 PQC', text: 'Post-Quantum Cryptography for FedRAMP and DoD IL5/IL6 compliance.' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with FedRAMP regulators."',
        preheader: 'Explainable and governed AI engineering for FedRAMP and IL5 compliance.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; FedRAMP requires absolute explainability.”',
        body: '<strong>We know that for Defense, evaluation criteria are weighted 50% on regulatory auditability.</strong> TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for FedRAMP/IL5 compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Mission Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day production pathway.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud contracts are renewing soon.</strong> Here is the deterministic pathway:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  },
  {
    folder: '04-healthcare',
    name: 'Healthcare & Health Systems',
    prefix: '04',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling clinical AI without latency drag',
        preheader: 'Eliminate clinical infrastructure bottlenecks and achieve deterministic AI ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Clinical AI',
        body: '<strong>Health systems are losing patient throughput to fragmented GPU clusters and EHR data silos.</strong> Many have sunk $2M+ into cloud compute, only to find clinical data teams spending 60% of time on pipeline firefighting. Result: 30-50% GPU underutilization. TrustGrid engineers full-stack AI infrastructure to eliminate this leakage.',
        highlight: '30–60% inference cost reduction with deterministic SLAs.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your clinical edge',
        preheader: 'Quantifying clinical operational leakage, tail latency, and lost engineering capacity.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Healthcare, the bottleneck is infrastructure causing tail latency in diagnostic inference.</strong> Legacy fabrics create 200+ lost engineering hours per quarter. This directly contributes to stagnant patient throughput. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level tuning.',
        highlight: 'Lossless RoCEv2 fabrics to eliminate silent packet drops.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for healthcare: Lossless fabrics & governed clinical agents',
        preheader: 'Pre-calibrated stacks deploy low-latency fabrics and HIPAA-governed clinical agents.',
        headline: 'Shifting the Baseline to Patient Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: '0.00% packet loss InfiniBand.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Deterministic reasoning DAGs for secure clinical workflows.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-care for real-time diagnostics and automated triage.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging AI compute spend to patient ROI',
        preheader: 'Connect AI compute spend to patient outcomes and unit economics.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable Patient ROI, Not Vague Pilots',
        body: '<strong>AI engineering in healthcare must be measured by patient outcomes.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps. With board reviews approaching, you need hard metrics. We guarantee 3–10x measurable production ROI within 90 days.',
        highlight: 'Real-time patient attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling clinical AI without latency drag',
        preheader: 'Following up on your clinical infrastructure bottlenecks and throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies, we helped a Tier-1 health system achieve 12× throughput yield on mission-critical workloads without purchasing new silicon. Every week of delay compounds leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Clinical Infrastructure Audit',
        preheader: 'A focused two-week diagnostic provides a prioritized roadmap with quantified clinical targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new healthcare infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets and delivers a comprehensive audit of GPU utilization and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting radiology reporting from 48 hours to 4 hours',
        preheader: 'How governed multi-agent execution cut radiology reporting turnaround time.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading health system faced a 48-hour cycle time for radiology reporting.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4-hour cycle time.</strong>',
        highlight: '70–90% task autonomy, reducing cycle time to 4 hours, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, Zero Trust, and HIPAA compliance',
        preheader: 'Deep systems engineering for high-throughput, compliant clinical AI pipelines.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'Collective tuning for multimodal EHR imaging and pathology models.' },
          { title: 'Zero-Trust MCP', text: 'Zero-trust context access ensuring HIPAA-compliant patient isolation.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Sub-millisecond inference acceleration for real-time surgical and ICU feeds.' },
          { title: 'L1-L7 PQC', text: 'Post-Quantum Cryptography safeguarding protected health information (PHI).' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with HIPAA regulators."',
        preheader: 'Trust is an architectural system property ensuring verifiable clinical compliance.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; HIPAA requires absolute explainability.”',
        body: '<strong>We know that for Healthcare, evaluation criteria are weighted 50% on regulatory auditability.</strong> TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for HIPAA compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Clinical Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day clinical AI roadmap.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud contracts are renewing soon.</strong> Here is the deterministic pathway:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  },
  {
    folder: '05-life-sciences',
    name: 'Life Sciences & Drug Discovery',
    prefix: '05',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling drug discovery AI without latency drag',
        preheader: 'Eliminate simulation bottlenecks and achieve deterministic discovery ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Discovery AI',
        body: '<strong>Life sciences firms are losing molecular simulation speed to fragmented GPU clusters.</strong> Many have sunk $2M+ into cloud compute, only to find research teams spending 60% of time on pipeline firefighting. Result: 30-50% GPU underutilization. TrustGrid engineers full-stack AI infrastructure to eliminate this leakage.',
        highlight: '30–60% inference cost reduction with deterministic SLAs.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your discovery edge',
        preheader: 'Quantifying R&D operational leakage, simulation delays, and lost research hours.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Life Sciences, the bottleneck is infrastructure causing tail latency in simulations.</strong> Legacy fabrics create 200+ lost research hours per quarter. This directly contributes to stagnant R&D throughput. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level tuning.',
        highlight: 'Lossless RoCEv2 fabrics to eliminate silent packet drops.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for life sciences: Lossless fabrics & governed discovery agents',
        preheader: 'Pre-calibrated stacks deploy low-latency fabrics and governed molecular simulation agents.',
        headline: 'Shifting the Baseline to Discovery Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: '0.00% packet loss InfiniBand.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Deterministic reasoning DAGs for secure molecular simulation.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-discovery for real-time molecular docking.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging AI compute spend to discovery ROI',
        preheader: 'Connect AI compute spend to discovery milestones and board-ready financial ROI.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable Discovery ROI, Not Vague Pilots',
        body: '<strong>AI engineering in life sciences must be measured by discovery outcomes.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps. With board reviews approaching, you need hard metrics. We guarantee 3–10x measurable production ROI within 90 days.',
        highlight: 'Real-time discovery attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling drug discovery AI without latency drag',
        preheader: 'Following up on your discovery infrastructure bottlenecks and throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies, we helped a Tier-1 pharma achieve 12× throughput yield on mission-critical workloads without purchasing new silicon. Every week of delay compounds leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Discovery Infrastructure Audit',
        preheader: 'A focused two-week diagnostic provides a prioritized roadmap with quantified research targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new life sciences infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets and delivers a comprehensive audit of GPU utilization and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting molecular docking from 48 hours to 4 hours',
        preheader: 'Case study on cutting molecular docking turnaround time with governed agentic fabrics.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading pharma faced a 48-hour cycle time for molecular docking.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4-hour cycle time.</strong>',
        highlight: '70–90% task autonomy, reducing cycle time to 4 hours, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, Zero Trust, and FDA 21 CFR compliance',
        preheader: 'Deep systems engineering for high-throughput, compliant drug discovery clusters.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'Collective tuning for parallel molecular dynamics simulations.' },
          { title: 'Zero-Trust MCP', text: 'Proprietary chemical structure and assay access perimeters.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Sub-millisecond screening throughput across billion-molecule libraries.' },
          { title: 'L1-L7 PQC', text: 'Cryptographic data integrity for FDA 21 CFR Part 11 electronic records.' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with FDA 21 CFR regulators."',
        preheader: 'Trust is an architectural system property ensuring verifiable FDA 21 CFR auditability.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; FDA 21 CFR requires absolute explainability.”',
        body: '<strong>We know that for Life Sciences, evaluation criteria are weighted 50% on regulatory auditability.</strong> TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for FDA 21 CFR compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Discovery Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day discovery roadmap.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud contracts are renewing soon.</strong> Here is the deterministic pathway:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  },
  {
    folder: '06-energy-utilities',
    name: 'Energy, Utilities & Smart Infrastructure',
    prefix: '06',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling grid AI without latency drag',
        preheader: 'Eliminate infrastructure bottlenecks and achieve deterministic grid AI ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Grid AI',
        body: '<strong>Utilities are losing grid stability to fragmented GPU clusters and data lag.</strong> Many have sunk $2M+ into cloud compute, only to find engineering teams spending 60% of time on pipeline firefighting. Result: 30-50% GPU underutilization. TrustGrid engineers full-stack AI infrastructure to eliminate this leakage.',
        highlight: '30–60% inference cost reduction with deterministic SLAs.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your grid edge',
        preheader: 'Quantifying grid operational leakage, telemetry latency, and lost engineering capacity.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Energy, the bottleneck is infrastructure causing tail latency in IoT telemetry.</strong> Legacy fabrics create 200+ lost engineering hours per quarter. This directly contributes to stagnant grid throughput. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level tuning.',
        highlight: 'Lossless RoCEv2 fabrics to eliminate silent packet drops.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for energy: Lossless fabrics & governed grid agents',
        preheader: 'Pre-calibrated stacks deploy low-latency fabrics and governed grid optimization agents.',
        headline: 'Shifting the Baseline to Grid Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: '0.00% packet loss InfiniBand.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Deterministic reasoning DAGs for secure grid optimization.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-grid for real-time load balancing.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging AI compute spend to grid ROI',
        preheader: 'Connect AI compute spend to grid reliability and verifiable budget outcomes.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable Grid ROI, Not Vague Pilots',
        body: '<strong>AI engineering in energy must be measured by grid outcomes.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps. With board reviews approaching, you need hard metrics. We guarantee 3–10x measurable production ROI within 90 days.',
        highlight: 'Real-time grid attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling grid AI without latency drag',
        preheader: 'Following up on your grid infrastructure bottlenecks and throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies, we helped a Tier-1 utility achieve 12× throughput yield on mission-critical workloads without purchasing new silicon. Every week of delay compounds leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Grid Infrastructure Audit',
        preheader: 'A focused two-week diagnostic delivers a prioritized roadmap with quantified grid targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new energy infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets and delivers a comprehensive audit of GPU utilization and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting outage prediction from 48 hours to 4 hours',
        preheader: 'How governed multi-agent execution cut grid outage prediction cycle time.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading utility faced a 48-hour cycle time for outage prediction.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4-hour cycle time.</strong>',
        highlight: '70–90% task autonomy, reducing cycle time to 4 hours, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, Zero Trust, and NERC CIP compliance',
        preheader: 'Deep systems engineering for high-throughput, NERC CIP-compliant energy infrastructure.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'Lossless collective telemetry for synchronized PMU sensors.' },
          { title: 'Zero-Trust MCP', text: 'SCADA isolation and governed model perimeters for OT infrastructure.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Real-time grid load balancing and contingency switching acceleration.' },
          { title: 'L1-L7 PQC', text: 'Post-Quantum Cryptography for strict NERC CIP bulk electric system standards.' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with NERC CIP regulators."',
        preheader: 'Trust is an architectural system property ensuring verifiable NERC CIP compliance.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; NERC CIP requires absolute explainability.”',
        body: '<strong>We know that for Energy, evaluation criteria are weighted 50% on regulatory auditability.</strong> TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for NERC CIP compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Grid Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day grid AI roadmap.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud contracts are renewing soon.</strong> Here is the deterministic pathway:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  },
  {
    folder: '07-manufacturing',
    name: 'Manufacturing & Industrial AI',
    prefix: '07',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling production AI without latency drag',
        preheader: 'Eliminate infrastructure bottlenecks and achieve deterministic production AI ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Production AI',
        body: '<strong>Manufacturers are losing OEE to fragmented GPU clusters and supply chain bottlenecks.</strong> Many have sunk $2M+ into cloud compute, only to find engineering teams spending 60% of time on pipeline firefighting. Result: 30-50% GPU underutilization. TrustGrid engineers full-stack AI infrastructure to eliminate this leakage.',
        highlight: '30–60% inference cost reduction with deterministic SLAs.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your production edge',
        preheader: 'Quantifying industrial operational leakage, vision latency, and lost engineering capacity.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Manufacturing, the bottleneck is infrastructure causing tail latency in machine vision.</strong> Legacy fabrics create 200+ lost engineering hours per quarter. This directly contributes to stagnant OEE. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level tuning.',
        highlight: 'Lossless RoCEv2 fabrics to eliminate silent packet drops.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for manufacturing: Lossless fabrics & governed production agents',
        preheader: 'Pre-calibrated stacks deploy low-latency fabrics and governed predictive maintenance agents.',
        headline: 'Shifting the Baseline to Production Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: '0.00% packet loss InfiniBand.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Deterministic reasoning DAGs for secure predictive maintenance.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-production for real-time quality control.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging AI compute spend to production ROI',
        preheader: 'Connect AI compute spend to asset OEE and verifiable plant floor ROI.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable Production ROI, Not Vague Pilots',
        body: '<strong>AI engineering in manufacturing must be measured by production outcomes.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps. With board reviews approaching, you need hard metrics. We guarantee 3–10x measurable production ROI within 90 days.',
        highlight: 'Real-time production attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling production AI without latency drag',
        preheader: 'Following up on your plant floor infrastructure bottlenecks and throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies, we helped a Tier-1 manufacturer achieve 12× throughput yield on mission-critical workloads without purchasing new silicon. Every week of delay compounds leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Production Infrastructure Audit',
        preheader: 'A focused two-week diagnostic provides a prioritized roadmap with quantified plant targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new manufacturing infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets and delivers a comprehensive audit of GPU utilization and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting quality control from 48 hours to 4 hours',
        preheader: 'How governed multi-agent execution cut quality control inspection cycles.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading manufacturer faced a 48-hour cycle time for quality control.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4-hour cycle time.</strong>',
        highlight: '70–90% task autonomy, reducing cycle time to 4 hours, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, Zero Trust, and ISA-95 compliance',
        preheader: 'Deep systems engineering for high-throughput, ISA-95-compliant industrial edge clusters.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'Low-latency collective tuning across synchronized camera clusters.' },
          { title: 'Zero-Trust MCP', text: 'Model Context Protocol securing edge device telemetry and Purdue Model Level 2-3.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Hardware acceleration for real-time visual inspection with zero frame drops.' },
          { title: 'L1-L7 PQC', text: 'Post-Quantum Cryptography safeguarding operational technology (OT) audit logs.' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with ISA-95 regulators."',
        preheader: 'Trust is an architectural system property ensuring verifiable ISA-95 compliance.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; ISA-95 requires absolute explainability.”',
        body: '<strong>We know that for Manufacturing, evaluation criteria are weighted 50% on regulatory auditability.</strong> TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for ISA-95 compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Production Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day manufacturing roadmap.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud contracts are renewing soon.</strong> Here is the deterministic pathway:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  },
  {
    folder: '08-retail-ecommerce',
    name: 'Retail, E-Commerce & Consumer Goods',
    prefix: '08',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling commerce AI without latency drag',
        preheader: 'Eliminate infrastructure bottlenecks and achieve deterministic commerce AI ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Commerce AI',
        body: '<strong>Retailers are losing conversion to fragmented GPU clusters and inventory forecasting delays.</strong> Many have sunk $2M+ into cloud compute, only to find data teams spending 60% of time on pipeline firefighting. Result: 30-50% GPU underutilization. TrustGrid engineers full-stack AI infrastructure to eliminate this leakage.',
        highlight: '30–60% inference cost reduction with deterministic SLAs.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your commerce edge',
        preheader: 'Quantifying commerce operational leakage, recommendation latency, and lost engineering capacity.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Retail, the bottleneck is infrastructure causing tail latency in personalized recommendations.</strong> Legacy fabrics create 200+ lost engineering hours per quarter. This directly contributes to stagnant conversion rates. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level tuning.',
        highlight: 'Lossless RoCEv2 fabrics to eliminate silent packet drops.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for retail: Lossless fabrics & governed commerce agents',
        preheader: 'Pre-calibrated stacks deploy low-latency fabrics and governed personalized commerce agents.',
        headline: 'Shifting the Baseline to Commerce Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: '0.00% packet loss InfiniBand.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Deterministic reasoning DAGs for secure personalized recommendations.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-market for real-time inventory forecasting.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging AI compute spend to commerce ROI',
        preheader: 'Connect AI compute spend to revenue conversion and verifiable merchandising ROI.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable Commerce ROI, Not Vague Pilots',
        body: '<strong>AI engineering in retail must be measured by commerce outcomes.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps. With board reviews approaching, you need hard metrics. We guarantee 3–10x measurable production ROI within 90 days.',
        highlight: 'Real-time commerce attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling commerce AI without latency drag',
        preheader: 'Following up on your commerce infrastructure bottlenecks and throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies, we helped a Tier-1 retailer achieve 12× throughput yield on mission-critical workloads without purchasing new silicon. Every week of delay compounds leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Commerce Infrastructure Audit',
        preheader: 'A focused two-week diagnostic delivers a prioritized roadmap with quantified commerce targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new retail infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets and delivers a comprehensive audit of GPU utilization and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting inventory forecasting from 48 hours to 4 hours',
        preheader: 'How governed multi-agent execution cut inventory forecasting cycle time.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading retailer faced a 48-hour cycle time for inventory forecasting.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4-hour cycle time.</strong>',
        highlight: '70–90% task autonomy, reducing cycle time to 4 hours, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, Zero Trust, and CCPA compliance',
        preheader: 'Deep systems engineering for high-throughput, CCPA-compliant consumer AI clusters.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'High-throughput collective tuning for peak shopping traffic surges.' },
          { title: 'Zero-Trust MCP', text: 'Strict data residency and boundary controls for customer identity isolation.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Sub-10ms personalization and dynamic pricing inference pipeline.' },
          { title: 'L1-L7 PQC', text: 'Post-Quantum Cryptography safeguarding consumer payment and CCPA data.' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with CCPA regulators."',
        preheader: 'Trust is an architectural system property ensuring verifiable CCPA consumer privacy compliance.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; CCPA requires absolute explainability.”',
        body: '<strong>We know that for Retail, evaluation criteria are weighted 50% on regulatory auditability.</strong> TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for CCPA compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Commerce Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day commerce roadmap.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud contracts are renewing soon.</strong> Here is the deterministic pathway:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  },
  {
    folder: '09-telecommunications',
    name: 'Telecommunications, Media & Cloud',
    prefix: '09',
    templates: [
      {
        fileBase: '01-introduction',
        subject: 'Scaling network AI without latency drag',
        preheader: 'Eliminate infrastructure bottlenecks and achieve deterministic network AI ROI in 90 days.',
        headline: 'The Baseline Cost of Experimental Network AI',
        body: '<strong>Telcos are losing ARPU to fragmented GPU clusters and content delivery latency.</strong> Many have sunk $2M+ into cloud compute, only to find engineering teams spending 60% of time on pipeline firefighting. Result: 30-50% GPU underutilization. TrustGrid engineers full-stack AI infrastructure to eliminate this leakage.',
        highlight: '30–60% inference cost reduction with deterministic SLAs.',
        cta: 'Book an AI Diagnostic',
        type: 'intro'
      },
      {
        fileBase: '02-industry-challenges',
        subject: 'The hidden compute costs stalling your network edge',
        preheader: 'Quantifying network operational leakage, edge tail latency, and lost engineering capacity.',
        headline: 'Quantifying Your Operational Leakage',
        body: '<strong>In Telecom, the bottleneck is infrastructure causing tail latency in 5G network slicing.</strong> Legacy fabrics create 200+ lost engineering hours per quarter. This directly contributes to stagnant ARPU. We engineer the resolution: lossless RoCEv2 fabrics and kernel-level tuning.',
        highlight: 'Lossless RoCEv2 fabrics to eliminate silent packet drops.',
        cta: 'Explore Technical Architecture',
        type: 'challenges'
      },
      {
        fileBase: '03-ai-solutions',
        subject: 'Engineered for telecom: Lossless fabrics & governed network agents',
        preheader: 'Pre-calibrated stacks deploy low-latency fabrics and governed 5G network slicing agents.',
        headline: 'Shifting the Baseline to Network Value',
        bodyIntro: '<strong>To eliminate inference bottlenecks, TrustGrid deploys two pre-calibrated stacks.</strong>',
        bullet1Title: 'AI Networking',
        bullet1Text: '0.00% packet loss InfiniBand.',
        bullet2Title: 'Agentic Enterprise',
        bullet2Text: 'Deterministic reasoning DAGs for secure 5G network slicing.',
        sidebarOutcome: 'DIRECTLY ACCELERATES time-to-network for real-time content delivery.',
        cta: 'View Engineering Deliverables',
        type: 'twocolumn'
      },
      {
        fileBase: '04-business-value',
        subject: 'Bridging AI compute spend to network ROI',
        preheader: 'Connect AI compute spend to subscriber ARPU and verifiable network ROI.',
        metricBar: '40% Reduction in Cloud Compute TCO',
        headline: 'Measurable Network ROI, Not Vague Pilots',
        body: '<strong>AI engineering in telecom must be measured by network outcomes.</strong> Our AI Value Engineering practice combines Lean Thinking with AI FinOps. With board reviews approaching, you need hard metrics. We guarantee 3–10x measurable production ROI within 90 days.',
        highlight: 'Real-time network attribution per inference query.',
        cta: 'Review Verified Case Studies',
        type: 'metric'
      },
      {
        fileBase: '05-follow-up',
        subject: 'Re: Scaling network AI without latency drag',
        preheader: 'Following up on your telecom infrastructure bottlenecks and throughput yield.',
        headline: 'The Compounding Cost of Doing Nothing',
        bodyP1: '<strong>Following up on my note regarding your infrastructure bottlenecks.</strong>',
        bodyP2: 'Just a brief note: by re-engineering cluster topologies, we helped a Tier-1 telco achieve 12× throughput yield on mission-critical workloads without purchasing new silicon. Every week of delay compounds leakage.',
        ctaLink: 'See How We Did It',
        type: 'followup'
      },
      {
        fileBase: '06-meeting-request',
        subject: 'A low-friction 45-min Network Infrastructure Audit',
        preheader: 'A focused two-week diagnostic delivers a prioritized roadmap with quantified network targets.',
        headline: 'A Low-Friction Path to Clarity',
        body: '<strong>I know that evaluating new telecom infrastructure requires heavy compliance cycles.</strong> That’s why we propose a 2-Week Executive AI Diagnostic. This typically falls under discretionary innovation budgets and delivers a comprehensive audit of GPU utilization and token economics.',
        highlight: 'A prioritized roadmap with quantified ROI targets, delivered in 14 days.',
        cta: 'Get My 14-Day Diagnostic Roadmap',
        type: 'ticket'
      },
      {
        fileBase: '07-use-case-spotlight',
        subject: 'Use Case: Cutting content delivery latency from 48ms to 4ms',
        preheader: 'How governed multi-agent execution cut edge content delivery latency.',
        headline: 'From Pilot Purgatory to Production',
        topRed: '<strong>A leading telco faced 48ms latency in content delivery, causing subscriber churn.</strong>',
        bottomBlue: '<strong>TrustGrid deployed a governed multi-agent execution fabric. Result: 70–90% task autonomy, 4ms latency.</strong>',
        highlight: '70–90% task autonomy, reducing latency to 4ms, zero black-box risk.',
        cta: 'Read the Full Case Study',
        type: 'split'
      },
      {
        fileBase: '08-technical-approach',
        subject: 'Under the hood: InfiniBand, Zero Trust, and data sovereignty compliance',
        preheader: 'Deep systems engineering for high-throughput, sovereign telecom cloud clusters.',
        headline: 'Deep Systems Engineering, Not PowerPoint',
        body: '<strong>To eliminate rework rates and latency spikes, our engineers deploy deep systems engineering.</strong>',
        grid: [
          { title: 'NCCL/RCCL Optimization', text: 'Ultra-low latency collective tuning for multi-access edge computing (MEC).' },
          { title: 'Zero-Trust MCP', text: 'Model Context Protocol boundaries for autonomous 5G slice orchestration.' },
          { title: 'Kernel-Level FPGA Tuning', text: 'Sub-millisecond vRAN and radio processing acceleration pipelines.' },
          { title: 'L1-L7 PQC', text: 'Post-Quantum Cryptography ensuring sovereign telecom compliance and data privacy.' }
        ],
        cta: 'Speak to a Practice Lead',
        type: 'grid'
      },
      {
        fileBase: '09-objection-handling',
        subject: '"We can\'t risk black-box AI models with data sovereignty regulators."',
        preheader: 'Trust is an architectural system property ensuring verifiable data sovereignty compliance.',
        headline: 'Trust is an Architectural System Property',
        blockquote: '“We cannot deploy non-deterministic AI models; data sovereignty requires absolute explainability.”',
        body: '<strong>We know that for Telecom, evaluation criteria are weighted 50% on regulatory auditability.</strong> TrustGrid builds Explainable & Governed Systems from day one using SHAP/LIME and immutable decision logging.',
        highlight: '100% verifiable auditability for data sovereignty compliance.',
        cta: 'Explore Trusted AI Engineering',
        type: 'blockquote'
      },
      {
        fileBase: '10-next-steps',
        subject: 'Your 90-day Network Value Realization Sprint (Limited Q4 Capacity)',
        preheader: 'Eliminate pipeline stagnation with a deterministic 90-day network AI roadmap.',
        headline: 'Eliminate Pipeline Stagnation',
        body: '<strong>Your legacy cloud contracts are renewing soon.</strong> Here is the deterministic pathway:',
        timeline: [
          'Week 1-2: AI Diagnostic.',
          'Week 3-10: Value Sprint.',
          'Week 12: Verifiable milestone.'
        ],
        highlight: 'Secure Q4 ROI. (Limited Q4 Pods Available).',
        cta: 'Request Value Sprint',
        type: 'timeline'
      }
    ]
  }
];

function buildTemplateHtml(t) {
  let contentHtml = '';

  if (t.type === 'intro') {
    contentHtml = `
              <div style="text-align:left;max-width:560px;margin:0 auto;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <h1 style="margin:0 0 20px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.body}</p>
                <div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:20px;margin:25px 0;border-radius:0 4px 4px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <strong style="display:block;margin-bottom:8px;color:#0f172a;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Verifiable Outcome</strong>
                  <span style="font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.highlight}</span>
                </div>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'challenges') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <h1 style="margin:0 0 20px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.body}</p>
                <div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:20px;margin:25px 0;border-radius:0 4px 4px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <strong style="display:block;margin-bottom:8px;color:#0f172a;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Engineered Resolution</strong>
                  <span style="font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.highlight}</span>
                </div>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'twocolumn') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <h1 style="margin:0 0 20px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin:0 0 22px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <tr>
                    <td width="50%" valign="top" style="width:50%;padding:16px 18px 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.bodyIntro}</p>
                      <ul style="margin:0 0 12px 20px;padding:0;text-align:left;">
                        <li style="margin-bottom:10px;text-align:left;font-family:'Times New Roman', Times, serif;"><strong style="font-family:'Times New Roman', Times, serif;">${t.bullet1Title}:</strong> ${t.bullet1Text}</li>
                        <li style="text-align:left;font-family:'Times New Roman', Times, serif;"><strong style="font-family:'Times New Roman', Times, serif;">${t.bullet2Title}:</strong> ${t.bullet2Text}</li>
                      </ul>
                    </td>
                    <td width="50%" valign="middle" style="width:50%;padding:22px;background-color:#0284c7;color:#ffffff;border-radius:6px;font-size:16px;line-height:1.6;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <strong style="display:block;margin-bottom:10px;color:#ffffff;text-transform:uppercase;font-size:13px;letter-spacing:0.04em;text-align:left;font-family:'Times New Roman', Times, serif;">Verifiable Outcome</strong>
                      <span style="color:#ffffff;text-align:left;font-family:'Times New Roman', Times, serif;">${t.sidebarOutcome}</span>
                    </td>
                  </tr>
                </table>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'metric') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <div style="margin:0 -34px 24px -34px;padding:28px 18px;background-color:#f1f5f9;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <span style="display:block;color:#0284c7;font-size:38px;line-height:1.15;font-weight:bold;text-align:left;font-family:'Times New Roman', Times, serif;">${t.metricBar}</span>
                </div>
                <h1 style="margin:0 0 18px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.body}</p>
                <div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:20px;margin:25px 0;border-radius:0 4px 4px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <strong style="display:block;margin-bottom:8px;color:#0f172a;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Verifiable Outcome</strong>
                  <span style="font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.highlight}</span>
                </div>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Head of AI Value Engineering, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'followup') {
    contentHtml = `
              <div style="width:100%;max-width:480px;margin:0 auto;text-align:left;font-size:16px;line-height:1.7;color:#334155;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-family:'Times New Roman', Times, serif;text-align:left;">Hi [First Name],</p>
                <h1 style="margin:0 0 18px 0;font-size:24px;line-height:1.3;color:#0f172a;font-weight:normal;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.bodyP1}</p>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.bodyP2}</p>
                <p style="margin:0 0 16px 0;text-align:left;font-family:'Times New Roman', Times, serif;"><a href="https://trustgrid.ai/contact" style="color:#0284c7;text-decoration:underline;font-weight:bold;text-align:left;font-family:'Times New Roman', Times, serif;">${t.ctaLink}</a></p>
                <p style="margin:0 0 16px 0;text-align:left;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'ticket') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;border:1px dashed #0284c7;margin:8px 0 20px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <tr>
                    <td style="padding:24px;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <h1 style="margin:0 0 18px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.body}</p>
                      <div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:20px;margin:25px 0;border-radius:0 4px 4px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                        <strong style="display:block;margin-bottom:8px;color:#0f172a;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Verifiable Outcome</strong>
                        <span style="font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.highlight}</span>
                      </div>
                      <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                        <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                      </div>
                      <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'split') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <h1 style="margin:0 0 18px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin:0 0 20px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <tr>
                    <td style="padding:20px;background-color:#fef2f2;border-left:4px solid #dc2626;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <strong style="display:block;margin-bottom:8px;color:#991b1b;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Before</strong>
                      <p style="margin:0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.topRed}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px;background-color:#f0f9ff;border-left:4px solid #0284c7;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <strong style="display:block;margin-bottom:8px;color:#075985;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">After</strong>
                      <p style="margin:0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.bottomBlue}</p>
                    </td>
                  </tr>
                </table>
                <div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:20px;margin:25px 0;border-radius:0 4px 4px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <strong style="display:block;margin-bottom:8px;color:#0f172a;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Verifiable Outcome</strong>
                  <span style="font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.highlight}</span>
                </div>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'grid') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <h1 style="margin:0 0 18px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.body}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin:0 0 22px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <tr>
                    <td width="50%" valign="top" style="width:50%;padding:6px;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #cbd5e1;border-collapse:collapse;text-align:left;font-family:'Times New Roman', Times, serif;">
                        <tr><td style="padding:16px;text-align:left;font-family:'Times New Roman', Times, serif;"><strong style="display:block;color:#0284c7;font-size:17px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[0].title}</strong><span style="text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[0].text}</span></td></tr>
                      </table>
                    </td>
                    <td width="50%" valign="top" style="width:50%;padding:6px;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #cbd5e1;border-collapse:collapse;text-align:left;font-family:'Times New Roman', Times, serif;">
                        <tr><td style="padding:16px;text-align:left;font-family:'Times New Roman', Times, serif;"><strong style="display:block;color:#0284c7;font-size:17px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[1].title}</strong><span style="text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[1].text}</span></td></tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" valign="top" style="width:50%;padding:6px;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #cbd5e1;border-collapse:collapse;text-align:left;font-family:'Times New Roman', Times, serif;">
                        <tr><td style="padding:16px;text-align:left;font-family:'Times New Roman', Times, serif;"><strong style="display:block;color:#0284c7;font-size:17px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[2].title}</strong><span style="text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[2].text}</span></td></tr>
                      </table>
                    </td>
                    <td width="50%" valign="top" style="width:50%;padding:6px;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #cbd5e1;border-collapse:collapse;text-align:left;font-family:'Times New Roman', Times, serif;">
                        <tr><td style="padding:16px;text-align:left;font-family:'Times New Roman', Times, serif;"><strong style="display:block;color:#0284c7;font-size:17px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[3].title}</strong><span style="text-align:left;font-family:'Times New Roman', Times, serif;">${t.grid[3].text}</span></td></tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Practice Lead, Enterprise AI</p>
              </div>`;
  } else if (t.type === 'blockquote') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <h1 style="margin:0 0 18px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <blockquote style="margin:0 0 22px 0;padding:20px 22px;background-color:#f1f5f9;border-left:6px solid #0284c7;color:#0f172a;font-size:21px;line-height:1.5;font-style:italic;text-align:left;font-family:'Times New Roman', Times, serif;">${t.blockquote}</blockquote>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.body}</p>
                <div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:20px;margin:25px 0;border-radius:0 4px 4px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <strong style="display:block;margin-bottom:8px;color:#0f172a;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Verifiable Outcome</strong>
                  <span style="font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.highlight}</span>
                </div>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  } else if (t.type === 'timeline') {
    contentHtml = `
              <div style="text-align:left;font-family:'Times New Roman', Times, serif;">
                <p style="margin:0 0 14px 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Hi [First Name],</p>
                <h1 style="margin:0 0 18px 0;font-size:26px;line-height:1.3;color:#0f172a;text-align:left;font-family:'Times New Roman', Times, serif;">${t.headline}</h1>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;text-align:left;font-family:'Times New Roman', Times, serif;">${t.body}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin:0 0 20px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <tr>
                    <td width="42" valign="top" style="width:42px;padding:0 12px 0 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <span style="display:inline-block;width:14px;height:14px;background-color:#0284c7;border-radius:50%;font-size:1px;line-height:14px;color:#0284c7;font-family:'Times New Roman', Times, serif;">&nbsp;</span>
                      <div style="width:2px;height:54px;background-color:#bae6fd;margin:0 0 0 6px;font-family:'Times New Roman', Times, serif;"></div>
                    </td>
                    <td valign="top" style="padding:0 0 18px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <strong style="color:#0284c7;font-family:'Times New Roman', Times, serif;">${t.timeline[0].split(':')[0]}</strong><br>${t.timeline[0].split(':').slice(1).join(':').trim()}
                    </td>
                  </tr>
                  <tr>
                    <td width="42" valign="top" style="width:42px;padding:0 12px 0 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <span style="display:inline-block;width:14px;height:14px;background-color:#0284c7;border-radius:50%;font-size:1px;line-height:14px;color:#0284c7;font-family:'Times New Roman', Times, serif;">&nbsp;</span>
                      <div style="width:2px;height:54px;background-color:#bae6fd;margin:0 0 0 6px;font-family:'Times New Roman', Times, serif;"></div>
                    </td>
                    <td valign="top" style="padding:0 0 18px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <strong style="color:#0284c7;font-family:'Times New Roman', Times, serif;">${t.timeline[1].split(':')[0]}</strong><br>${t.timeline[1].split(':').slice(1).join(':').trim()}
                    </td>
                  </tr>
                  <tr>
                    <td width="42" valign="top" style="width:42px;padding:0 12px 0 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <span style="display:inline-block;width:14px;height:14px;background-color:#0284c7;border-radius:50%;font-size:1px;line-height:14px;color:#0284c7;font-family:'Times New Roman', Times, serif;">&nbsp;</span>
                    </td>
                    <td valign="top" style="padding:0 0 18px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                      <strong style="color:#0284c7;font-family:'Times New Roman', Times, serif;">${t.timeline[2].split(':')[0]}</strong><br>${t.timeline[2].split(':').slice(1).join(':').trim()}
                    </td>
                  </tr>
                </table>
                <div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:20px;margin:25px 0;border-radius:0 4px 4px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <strong style="display:block;margin-bottom:8px;color:#0f172a;text-transform:uppercase;font-size:13px;text-align:left;font-family:'Times New Roman', Times, serif;">Verifiable Outcome</strong>
                  <span style="font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">${t.highlight}</span>
                </div>
                <div style="margin:24px 0 8px 0;text-align:left;font-family:'Times New Roman', Times, serif;">
                  <a href="https://trustgrid.ai/contact" style="display:inline-block;min-height:44px;padding:14px 32px;box-sizing:border-box;border-radius:6px;background-color:#0284c7;color:#ffffff;text-decoration:none;font-size:16px;line-height:1.4;font-weight:600;text-align:left;font-family:'Times New Roman', Times, serif;">${t.cta}</a>
                </div>
                <p style="margin:0;text-align:left;font-size:16px;font-family:'Times New Roman', Times, serif;">Or reply directly to this email to start the conversation.</p>
                <p style="margin:28px 0 0 0;font-size:16px;text-align:left;font-family:'Times New Roman', Times, serif;">Best regards,<br><strong style="font-family:'Times New Roman', Times, serif;">[Sender Name]</strong><br>Principal Systems Architect, TrustGrid.ai</p>
              </div>`;
  }

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="email-subject" content="${t.subject.replace(/"/g, '&quot;')}" />
  <meta name="email-preheader" content="${t.preheader.replace(/"/g, '&quot;')}" />
  <title>${t.subject.replace(/"/g, '&quot;')}</title>
  <style type="text/css">
    body, table, td, a, p, h1, h2, h3, span, strong, blockquote {
      font-family: 'Times New Roman', Times, serif !important;
      text-align: left;
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
<body style="margin: 0; padding: 0; background-color: #f1f5f9; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-align: left; font-family: 'Times New Roman', Times, serif;">
  
  <!-- Hidden Preheader for Inbox Preview -->
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: 'Times New Roman', Times, serif; text-align: left;">${t.preheader}</div>

  <!-- Outer Canvas Wrapper -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; min-height: 100vh; font-family: 'Times New Roman', Times, serif; text-align: left;">
    <tr>
      <td align="center" style="padding: 28px 12px 40px 12px; font-family: 'Times New Roman', Times, serif; text-align: left;">
        
        <!-- Main Email Container (600px Max Width Standard) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); font-family: 'Times New Roman', Times, serif; text-align: left;">
          
          <!-- BFSI-style image-only header -->
          <tr>
            <td align="center" style="padding: 0; background-color: #0f172a; line-height: 0; font-family: 'Times New Roman', Times, serif; text-align: left;">
              <img src="../images/Header-bfsi.png" alt="TrustGrid.ai Banking and Financial Services" width="600" style="display: block; width: 100%; max-width: 600px; height: auto; margin: 0 auto; border: 0;" />
            </td>
          </tr>
          <!-- Main Email Content Body -->
          <tr>
            <td class="content-padding" style="padding: 34px 34px 28px 34px; background-color: #ffffff; text-align: left; font-family: 'Times New Roman', Times, serif;">${contentHtml}
            </td>
          </tr>
          <!-- BFSI-style image-only footer -->
          <tr>
            <td align="center" style="padding: 0; background-color: #0f172a; line-height: 0; font-family: 'Times New Roman', Times, serif; text-align: left;">
              <img src="../images/Footer-bfsi.png" alt="TrustGrid.ai full-spectrum AI engineering" width="600" style="display: block; width: 100%; max-width: 600px; height: auto; margin: 0 auto; border: 0;" />
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}

console.log('Generating updated blueprints for all 8 industries (Industries 2 - 9)...');

for (const ind of industries) {
  const dirPath = path.join(projectRoot, ind.folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  for (const t of ind.templates) {
    const html = buildTemplateHtml(t);
    // Canonical standard name: e.g. 01-introduction.html
    const standardPath = path.join(dirPath, `${t.fileBase}.html`);
    fs.writeFileSync(standardPath, html, 'utf8');

    // Numbered name: e.g. 02-01-introduction.html
    const numberedName = `${ind.prefix}-${t.fileBase}.html`;
    const numberedPath = path.join(dirPath, numberedName);
    fs.writeFileSync(numberedPath, html, 'utf8');
  }

  console.log(`Generated 10 left-aligned, Times New Roman templates for ${ind.name} in ${ind.folder}`);
}

console.log('All blueprint templates generated successfully!');
