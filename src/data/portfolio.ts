export type Skill = {
  name: string;
  value: number;
  proof: string;
};

export type SkillGroup = {
  label: string;
  score: number;
  skills: Skill[];
};

export type Project = {
  title: string;
  category: "AI Security" | "Security Automation" | "Agentic AI" | "Client Automation" | "Cloud";
  status: string;
  problem: string;
  impact: string;
  architecture: string[];
  stack: string[];
  features: string[];
  metrics: string[];
  lesson: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  focus: string;
  wins: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  detail: string;
};

export const profile = {
  name: "Muhammad Maaz Kamal",
  headline: "Security automation engineer building production cyber defense systems.",
  location: "Karachi, Pakistan",
  availability: "Immediate availability · Remote globally · Hybrid Karachi",
  email: "muhammadmaazkamal@gmail.com",
  phone: "+92 336 3119749",
  github: "https://github.com/MaazKamal08",
  linkedin: "https://www.linkedin.com/in/mmaazkamal",
  consultationForm: "https://docs.google.com/forms/d/e/1FAIpQLSf_K4bYCqcZMBx_YnN5nyu0eernOVVZEDTGos8MoEngNgNq7w/viewform",
  roles: ["AI Engineer", "Cybersecurity Engineer", "SOC Analyst", "Automation Engineer", "Full Stack Developer"],
  proof: [
    { label: "SOC operations", value: "4+ yrs" },
    { label: "Client AI projects", value: "10+" },
    { label: "MTTD reduction", value: "35%" },
    { label: "Auto-block cycle", value: "<90s" }
  ]
};

export const story = [
  "Maaz operates at the rare intersection of SOC engineering and AI automation: he does not just monitor threats, he builds systems that enrich, decide, and respond before manual queues become bottlenecks.",
  "His cybersecurity path moved from SOC training into L2 and L3 operations, where he led incident response, SIEM tuning, endpoint containment, compliance programs, and executive security reporting across enterprise environments.",
  "In parallel, he built production AI systems for NJ Marketing Group clients: LLM chatbots, RAG knowledge bases, n8n workflow engines, WhatsApp agents, SEO automation, and agentic business systems across Canada, the UK, and Pakistan.",
  "The next chapter is AI-native cyber defense: trustworthy agents, auditable automations, security-aware RAG, and cloud-deployed systems that compress detection, enrichment, containment, and reporting into minutes."
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Cybersecurity",
    score: 94,
    skills: [
      { name: "SIEM", value: 95, proof: "Wazuh, IBM QRadar, LogRhythm, Sentinel" },
      { name: "Incident Response", value: 92, proof: "NIST IR playbooks, L2/L3 escalation" },
      { name: "Threat Hunting", value: 88, proof: "IOC enrichment, MITRE ATT&CK mapping" },
      { name: "Compliance", value: 90, proof: "PCI DSS, ISO/IEC 27001:2022" },
      { name: "Endpoint / DLP", value: 86, proof: "Kaspersky EDR, Zecurion DLP, Trend Micro" }
    ]
  },
  {
    label: "AI Engineering",
    score: 91,
    skills: [
      { name: "LangChain", value: 90, proof: "Agentic workflows and production RAG" },
      { name: "RAG", value: 92, proof: "Pinecone, Chroma, FAISS, pgvector" },
      { name: "LLM Apps", value: 90, proof: "OpenAI, Anthropic, Gemini APIs" },
      { name: "Fine-tuning", value: 80, proof: "LoRA, QLoRA, PEFT" },
      { name: "Evaluation", value: 82, proof: "Prompt and hallucination reduction loops" }
    ]
  },
  {
    label: "Development",
    score: 88,
    skills: [
      { name: "Python", value: 94, proof: "Security automation, APIs, ML pipelines" },
      { name: "FastAPI", value: 84, proof: "Model serving and internal tools" },
      { name: "React / Next", value: 80, proof: "Full-stack interfaces and AI dashboards" },
      { name: "APIs", value: 92, proof: "REST, webhooks, third-party integrations" },
      { name: "SQL", value: 76, proof: "Data pipelines and operational systems" }
    ]
  },
  {
    label: "Cloud & Automation",
    score: 90,
    skills: [
      { name: "n8n", value: 98, proof: "SOC, CRM, SEO, WhatsApp, reporting workflows" },
      { name: "AWS", value: 82, proof: "Lambda, EC2, S3, SageMaker basics" },
      { name: "Docker", value: 86, proof: "FastAPI and ML deployment" },
      { name: "Linux / Windows", value: 88, proof: "SCA automation, server operations" },
      { name: "Firewalls", value: 91, proof: "pfSense, Sophos, rule automation" }
    ]
  }
];

export const projects: Project[] = [
  {
    title: "SmartPhish",
    category: "AI Security",
    status: "Private · Production",
    problem: "Organizations need phishing defense that measures human risk, detects malicious intent, and closes awareness gaps with evidence.",
    impact: "Deployed internally at Keenu.pk for organization-wide simulation, susceptibility scoring, and compliance-ready awareness reporting.",
    architecture: ["Email + URL analysis", "ML classification", "Simulation engine", "HR/compliance reporting", "Training assignment"],
    stack: ["Python", "LLM-assisted detection", "Security awareness workflows", "Dashboards", "HR integrations"],
    features: ["Header/body/URL analysis", "Controlled campaigns", "Click/report-rate measurement", "Targeted training assignment"],
    metrics: ["Live organization campaigns", "Compliance reports automated", "Risk scoring by employee behavior"],
    lesson: "Security products land when detection, behavior change, and audit evidence are designed as one workflow."
  },
  {
    title: "Automated IP Blocking Pipeline",
    category: "Security Automation",
    status: "Production",
    problem: "SOC analysts lose time manually validating malicious IPs and pushing firewall rules during repetitive threat response.",
    impact: "Wazuh alerts are validated through VirusTotal and AbuseIPDB, then pushed to pfSense and Sophos in under 90 seconds.",
    architecture: ["Wazuh alert", "n8n orchestrator", "Threat intel enrichment", "Decision gate", "pfSense/Sophos block", "Audit log"],
    stack: ["Wazuh API", "n8n", "VirusTotal", "AbuseIPDB", "pfSense", "Sophos"],
    features: ["Cross-source validation", "Auto-block rules", "Full audit trail", "Failure-safe decision thresholds"],
    metrics: ["<90 second response cycle", "100% manual IP-block task elimination", "2+ analyst-hours saved per shift"],
    lesson: "Automation should be fast, but security automation must also be explainable, reversible, and logged."
  },
  {
    title: "SOC AI Triage System",
    category: "AI Security",
    status: "Production",
    problem: "Raw alerts slow down L1/L2 analysts because enrichment, context writing, and escalation decisions are repetitive.",
    impact: "LLM-assisted triage generates analyst notes, IOC summaries, and escalation routing from Wazuh alerts.",
    architecture: ["Alert parser", "IOC extractor", "Threat enrichment", "LLM note generator", "Escalation classifier"],
    stack: ["Python", "Wazuh API", "n8n", "LLMs", "MITRE ATT&CK"],
    features: ["Natural-language incident summaries", "IOC enrichment", "Escalation recommendations", "Runbook linkage"],
    metrics: ["60%+ human review reduction", "2+ analyst-hours saved per shift", "Production alert processing"],
    lesson: "The best SOC copilots do not replace judgment; they package context so judgment happens sooner."
  },
  {
    title: "FirewallAI",
    category: "Security Automation",
    status: "Private · Prototype/Production path",
    problem: "Firewall rule management is slow, error-prone, and difficult to validate at incident speed.",
    impact: "Generates and validates context-aware firewall rules from threat evidence before applying them through controlled automation.",
    architecture: ["Threat context", "Policy reasoning", "Rule draft", "Validation checks", "Firewall application"],
    stack: ["Python", "LLM workflows", "pfSense", "Sophos", "Policy guardrails"],
    features: ["Rule generation", "Conflict checks", "Change logging", "Approval-ready explanations"],
    metrics: ["Reduced manual rule overhead", "Faster containment path", "Audit-friendly firewall changes"],
    lesson: "AI-generated infrastructure changes need guardrails, dry-runs, and human-readable explanations."
  },
  {
    title: "Enterprise RAG & Agentic Systems",
    category: "Agentic AI",
    status: "Client delivery",
    problem: "Enterprise teams need AI assistants that answer from private knowledge and act across business tools.",
    impact: "Delivered RAG knowledge bases and agentic workflows for 5+ enterprise clients, reducing support workload by 60%+.",
    architecture: ["Document ingestion", "Chunking + embeddings", "Vector retrieval", "LLM answer layer", "Tool/action router"],
    stack: ["LangChain", "LlamaIndex", "Pinecone", "Chroma", "OpenAI", "Anthropic", "Slack", "WhatsApp"],
    features: ["Semantic search", "Hybrid retrieval", "Tool calling", "Conversation memory", "Evaluation loops"],
    metrics: ["5+ RAG deployments", "10+ client AI projects", "60%+ support workload reduction"],
    lesson: "RAG succeeds when retrieval quality, permissions, evaluation, and handoff UX are treated as production features."
  },
  {
    title: "WooCommerce Bulk AI SEO Updater",
    category: "Client Automation",
    status: "Client delivery",
    problem: "E-commerce teams spend days writing and updating product SEO metadata across large catalogs.",
    impact: "An n8n + LLM pipeline pulls products, generates meta titles/descriptions, reviews in Sheets, and pushes updates back to WooCommerce.",
    architecture: ["WooCommerce catalog", "Google Sheets review", "LLM generation", "Approval checkpoint", "Bulk update"],
    stack: ["n8n", "WooCommerce API", "Google Sheets API", "LLMs", "Webhooks"],
    features: ["Bulk metadata generation", "Human review table", "API sync", "Scheduled runs"],
    metrics: ["SEO update cycle reduced from days to minutes", "Repeatable client workflow", "Low-code handoff"],
    lesson: "Client automations win when they keep business users in the review loop without slowing the machine."
  }
];

export const experiences: Experience[] = [
  {
    role: "Team Lead - AI, Automation & Engineering",
    company: "NJ Marketing Group Inc",
    period: "Jan 2025 - Present",
    location: "Mississauga, Canada · Remote",
    focus: "Front-facing technical authority leading AI, automation, and engineering delivery.",
    wins: ["Owns 10+ simultaneous client projects", "Leads AI engineers and developers", "Ships LLM chatbots, RAG systems, and n8n workflows"]
  },
  {
    role: "AI Security Engineer & SOC Lead",
    company: "Keenu.pk",
    period: "Oct 2024 - Present",
    location: "Karachi · On-site",
    focus: "Leads 24/7 SOC operations while building AI-assisted threat response systems.",
    wins: ["Reduced MTTD by 35%", "Built sub-90-second IP blocking", "Achieved PCI DSS and ISO/IEC 27001:2022 programs"]
  },
  {
    role: "AI/ML Engineer",
    company: "NJ Marketing Group Inc",
    period: "Jan 2023 - Jan 2025",
    location: "Remote",
    focus: "Built production LLM applications, document intelligence tools, and agentic workflows.",
    wins: ["Delivered RAG and chatbot systems", "Integrated OpenAI/Anthropic APIs", "Deployed FastAPI + Docker + AWS services"]
  },
  {
    role: "Information Security Analyst",
    company: "CommTel",
    period: "Jan 2023 - Sep 2024",
    location: "Karachi · On-site",
    focus: "L2 SOC operations, SIEM tuning, incident response, vulnerability management, and compliance.",
    wins: ["Reduced false positives 25%", "Authored 8 IR playbooks", "Cut containment from 4 hours to 90 minutes"]
  },
  {
    role: "AI Engineering Intern",
    company: "NJ Marketing Group Inc",
    period: "Jun 2022 - Dec 2022",
    location: "Remote",
    focus: "Started building production chatbots and automation prototypes.",
    wins: ["Promoted within 6 months", "Built LLM chatbots", "Researched RAG, embeddings, and agentic design"]
  }
];

export const certifications: Certification[] = [
  { name: "Certified LLM Security Professional (CLLMSP)", issuer: "Red Team Leaders", date: "Jun 2026", detail: "Credential ID 4c55482415c75768. LLM security, GenAI, RAG, LangChain, CTI." },
  { name: "Claude 101", issuer: "Anthropic", date: "Jun 2026", detail: "Credential ID a7hvkoputvn7. GenAI, chatbot development, LangChain, LangGraph, RAG." },
  { name: "Detection Engineering Alert Disposition", issuer: "Black Hills Information Security", date: "Apr 2026", detail: "Cyber defense, SIEM, SOAR, detection engineering workflow." },
  { name: "SOC Summit 2026", issuer: "Antisyphon Training", date: "Mar 2026", detail: "Credential ID 260dd91d-d6f9-4125-b325-b84e7bc72f7e#acc.kwioBLag. Incident response and threat analysis." },
  { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Red Team Leaders", date: "Nov 2025", detail: "Credential ID b442ad36-44fe-4b6f-99f5-fd6f7ddbb4b4. SOC, incident management, SIEM, SOAR." },
  { name: "n8n Course Level 1", issuer: "n8n", date: "Nov 2025", detail: "Credential ID 90b688bd2e27b72b37200b4bb32108ba. Automation workflows, n8n, LangChain, LangGraph, RAG." },
  { name: "Introduction To Critical Infrastructure Protection", issuer: "OPSWAT", date: "Oct 2025 - Oct 2026", detail: "Credential ID p7TiYHWi3g. Infrastructure security and SOC readiness." },
  { name: "Security Awareness Specialist", issuer: "Proofpoint", date: "Jul 2025 - Jul 2027", detail: "Cyber defense, threat hunting, cyber operations, awareness, and CTI." },
  { name: "Intro to Deep Learning", issuer: "Kaggle", date: "Jul 2025", detail: "Deep learning, AI foundations, and OpenAI API concepts." },
  { name: "Intro To Machine Learning", issuer: "Kaggle", date: "Mar 2025", detail: "Supervised, unsupervised, reinforcement learning, Azure ML, and GenAI foundations." },
  { name: "Intro To Programming", issuer: "Kaggle", date: "Mar 2025", detail: "Python programming, OOP, and programming foundations." },
  { name: "The Cyber Security Course: End Point Protection!", issuer: "Udemy", date: "Nov 2024", detail: "Credential ID UC-23d9a801-bfcf-4480-a6ee-52b76d39e394. Endpoint security and cyber defense." },
  { name: "Certified AppSec Practitioner (CAP-MOCK-EXAM)", issuer: "The SecOps Group", date: "Sep 2024", detail: "Credential ID 9103533. VAPT, cyber risk, and application security practice." },
  { name: "ISO/IEC 27001:2022 Information Security Associate", issuer: "SkillFront", date: "Sep 2024", detail: "Credential ID 01042343391568. ISO 27001, risk management, risk assessment, team management." },
  { name: "Google Soft Skills Program", issuer: "Google", date: "Aug 2024", detail: "Credential ID 3207161155385963. Project management, problem solving, communication, agile planning." },
  { name: "Information Security Awareness", issuer: "Fortinet", date: "Sep 2022", detail: "Security awareness and foundational cyber hygiene." },
  { name: "Cybersecurity Fundamentals", issuer: "IBM", date: "Aug 2022", detail: "Wazuh, information security, SOAR, cyber operations, network security." },
  { name: "Learning the OWASP Top 10", issuer: "LinkedIn Learning", date: "Aug 2022", detail: "Application security risks and OWASP Top 10 fundamentals." },
  { name: "Networking Academy Learn-A-Thon 2022", issuer: "Cisco", date: "Jul 2022", detail: "Credential ID c1ab9af5-c9d6-4e3b-b306-e8e0bd18a83d. Wazuh, information security, cyber operations." },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "May 2022", detail: "Credential ID 541dd995-abca-44af-a788-ba16c07b7021. Cybersecurity, defense, operations, risk, tools." }
];

export const repoHighlights = [
  "Security automation repositories cluster around Wazuh, VirusTotal/Jira, pfSense, Sophos, CVE reporting, APK static analysis, and TLS scanning.",
  "Client automation repositories show n8n workflows for WordPress publishing, job discovery, CRM sync, spam detection, travel search, and social media publishing.",
  "Recent GitHub activity includes Copilot skills and AI workflow repositories, reflecting continued AI engineering upskilling."
];

export const roadmap = [
  "Open-source sanitized SmartPhish modules with mock campaign data.",
  "Publish FirewallAI as an approval-first policy reasoning demo.",
  "Add signed case-study PDFs for enterprise clients where confidentiality permits.",
  "Connect a serverless GitHub intelligence cache for faster public portfolio loading.",
  "Add OpenAI-backed portfolio assistant once an API key and safety policy are configured."
];
