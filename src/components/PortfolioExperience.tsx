"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  Bot,
  Calendar,
  Check,
  Command,
  Download,
  GitBranch,
  Link,
  Mail,
  Mic,
  Moon,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Zap
} from "lucide-react";
import * as THREE from "three";
import {
  certifications,
  experiences,
  profile,
  projects,
  repoHighlights,
  roadmap,
  skillGroups,
  story
} from "@/data/portfolio";
import { fallbackRepos, type RepoSnapshot } from "@/data/githubRepos";

type Theme = "dark" | "light";

const publicBasePath = process.env.NEXT_PUBLIC_REPOSITORY_NAME ? `/${process.env.NEXT_PUBLIC_REPOSITORY_NAME}` : "";
const publicAsset = (path: string) => `${publicBasePath}${path}`;

function SignalField() {
  const points = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(900);
    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 8;
      positions[index + 1] = (Math.random() - 0.5) * 4.5;
      positions[index + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.035;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#6fffd2" size={0.025} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function RadarChart() {
  const size = 270;
  const center = size / 2;
  const radius = 98;
  const points = skillGroups
    .map((group, index) => {
      const angle = (Math.PI * 2 * index) / skillGroups.length - Math.PI / 2;
      const value = group.score / 100;
      return `${center + Math.cos(angle) * radius * value},${center + Math.sin(angle) * radius * value}`;
    })
    .join(" ");

  return (
    <svg className="radar" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Skill radar chart">
      {[0.35, 0.7, 1].map((scale) => (
        <polygon
          key={scale}
          points={skillGroups
            .map((_, index) => {
              const angle = (Math.PI * 2 * index) / skillGroups.length - Math.PI / 2;
              return `${center + Math.cos(angle) * radius * scale},${center + Math.sin(angle) * radius * scale}`;
            })
            .join(" ")}
          fill="none"
          stroke="rgba(210,255,239,.16)"
        />
      ))}
      {skillGroups.map((group, index) => {
        const angle = (Math.PI * 2 * index) / skillGroups.length - Math.PI / 2;
        return (
          <g key={group.label}>
            <line
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * radius}
              y2={center + Math.sin(angle) * radius}
              stroke="rgba(210,255,239,.12)"
            />
            <text
              x={center + Math.cos(angle) * (radius + 25)}
              y={center + Math.sin(angle) * (radius + 25)}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {group.label}
            </text>
          </g>
        );
      })}
      <polygon points={points} fill="rgba(111,255,210,.22)" stroke="#6fffd2" strokeWidth="2" />
    </svg>
  );
}

function classifyRepo(repo: RepoSnapshot) {
  const text = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
  if (text.includes("wazuh") || text.includes("cve") || text.includes("virustotal") || text.includes("sophos") || text.includes("tls") || text.includes("apk")) return "Security automation";
  if (text.includes("ai") || text.includes("agent") || text.includes("copilot") || text.includes("blog")) return "AI automation";
  if (repo.fork) return "Learning / fork";
  return "Client workflow";
}

function RepoIntelligence({ query }: { query: string }) {
  const [repos, setRepos] = useState<RepoSnapshot[]>(fallbackRepos);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/MaazKamal08/repos?per_page=100&sort=updated")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("GitHub unavailable"))))
      .then((data: RepoSnapshot[]) => {
        if (!cancelled) {
          setRepos(data);
          setLive(true);
        }
      })
      .catch(() => setLive(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = repos.filter((repo) => `${repo.name} ${repo.description ?? ""}`.toLowerCase().includes(query.toLowerCase()));
  const categories = filtered.reduce<Record<string, number>>((acc, repo) => {
    const category = classifyRepo(repo);
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {});
  const languages = filtered.reduce<Record<string, number>>((acc, repo) => {
    const language = repo.language ?? "Workflow";
    acc[language] = (acc[language] ?? 0) + 1;
    return acc;
  }, {});
  const latest = [...filtered].sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at)).slice(0, 6);

  return (
    <section id="github" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow">GitHub intelligence</p>
          <h2>Repository portfolio, categorized by business capability.</h2>
        </div>
        <span className={`status ${live ? "online" : ""}`}>{live ? "Live GitHub sync" : "Static fallback"}</span>
      </div>
      <div className="github-grid">
        <div className="panel">
          <h3>Project clusters</h3>
          {Object.entries(categories).map(([label, count]) => (
            <div className="bar-row" key={label}>
              <span>{label}</span>
              <div className="bar-track"><div style={{ width: `${Math.max(18, (count / Math.max(filtered.length, 1)) * 100)}%` }} /></div>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
        <div className="panel">
          <h3>Language / artifact mix</h3>
          {Object.entries(languages).slice(0, 5).map(([label, count]) => (
            <div className="bar-row" key={label}>
              <span>{label}</span>
              <div className="bar-track amber"><div style={{ width: `${Math.max(18, (count / Math.max(filtered.length, 1)) * 100)}%` }} /></div>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
        <div className="panel span-2">
          <h3>Latest signal</h3>
          <div className="repo-list">
            {latest.map((repo) => (
              <a key={repo.html_url} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-item">
                <span>{classifyRepo(repo)}</span>
                <strong>{repo.name}</strong>
                <small>{repo.description ?? "No public description"}</small>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="insight-strip">
        {repoHighlights.map((item) => <p key={item}>{item}</p>)}
      </div>
    </section>
  );
}

export function PortfolioExperience() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>("dark");
  const [search, setSearch] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState("What makes Maaz different?");
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => setRoleIndex((value) => (value + 1) % profile.roles.length), 1700);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
      if (event.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return;
    gsap.fromTo(".metric-card", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" });
  }, [reducedMotion]);

  const filteredProjects = projects.filter((project) => {
    const haystack = `${project.title} ${project.category} ${project.problem} ${project.stack.join(" ")}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  const assistantAnswer = useMemo(() => {
    const q = assistantQuery.toLowerCase();
    if (q.includes("project")) return "Start with SmartPhish, the sub-90-second IP blocking pipeline, and Enterprise RAG systems. Together they show product thinking, security depth, and production AI delivery.";
    if (q.includes("hire") || q.includes("different")) return "Maaz combines SOC L3 operations, AI engineering, n8n automation, compliance execution, and client-facing leadership. That mix is rare because it connects real threats to shipped AI systems.";
    if (q.includes("contact")) return `Email ${profile.email}, call ${profile.phone}, or use the consultation form for project and service requests.`;
    return "This service guide can be connected to a serverless route later. For now, it routes recruiters and clients toward Maaz's strongest security automation, SOC, and engineering evidence.";
  }, [assistantQuery]);

  const startVoiceNavigation = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCommandOpen(true);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const phrase = event.results[0][0].transcript.toLowerCase();
      const target = ["projects", "skills", "github", "experience", "systems-lab", "contact"].find((id) => phrase.includes(id) || phrase.includes(id.replace("-", " ")));
      if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    };
    recognition.start();
  };

  const navItems = ["skills", "projects", "github", "experience", "systems-lab", "contact"];

  return (
    <main ref={rootRef} className="site-shell">
      <div className="background-grid" />
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="#top" className="brand"><ShieldCheck size={18} /> MMK</a>
        <div className="nav-links">
          {navItems.map((item) => <a key={item} href={`#${item}`}>{item.replace("-", " ")}</a>)}
        </div>
        <div className="nav-actions">
          <button aria-label="Open command palette" className="icon-btn" onClick={() => setCommandOpen(true)}><Command size={18} /></button>
          <button aria-label="Start voice navigation" className="icon-btn" onClick={startVoiceNavigation}><Mic size={18} /></button>
          <button aria-label="Toggle theme" className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SOC L3 x security automation x cloud product engineering</p>
          <h1>{profile.name}</h1>
          <div className="role-line">
            <span>{profile.headline}</span>
            <motion.strong key={profile.roles[roleIndex]} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {profile.roles[roleIndex]}
            </motion.strong>
          </div>
          <p className="hero-text">
            I build security systems that move from alert to decision: SOC triage, RAG knowledge bases, n8n automations, phishing intelligence, and firewall response pipelines that turn threats into auditable action.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href={profile.consultationForm} target="_blank" rel="noreferrer">Get consultation <ArrowRight size={18} /></a>
            <a className="secondary-btn" href="#projects">View case studies <ArrowRight size={18} /></a>
            <a className="secondary-btn" href={publicAsset("/Maaz_Kamal_AI_Automation_Resume.pdf")} download>AI resume <Download size={18} /></a>
            <a className="secondary-btn" href={publicAsset("/Maaz_Kamal_Security_Resume.pdf")} download>Security resume <Download size={18} /></a>
          </div>
          <div className="availability"><span /> {profile.availability}</div>
        </div>
        <div className="hero-visual" aria-label="Muhammad Maaz Kamal profile and security operations signal panel">
          {!reducedMotion ? <Canvas camera={{ position: [0, 0, 4], fov: 50 }}><SignalField /></Canvas> : <div className="static-field" />}
          <div className="profile-frame">
            <img src={publicAsset("/maaz-profile.jfif")} alt="Muhammad Maaz Kamal" />
            <div className="profile-caption">
              <strong>SOC L3 / AI Security</strong>
              <span>Karachi · Remote global</span>
            </div>
          </div>
          <div className="hero-terminal">
            <Terminal size={16} />
            <p>wazuh.alert -&gt; enrich.ioc -&gt; llm.triage -&gt; firewall.block</p>
          </div>
        </div>
      </section>

      <section className="metrics" aria-label="Profile statistics">
        {profile.proof.map((metric) => (
          <div className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="service-cta" aria-label="Consultation call to action">
        <div>
          <p className="eyebrow">Cybersecurity automation services</p>
          <h2>Need a SOC workflow, AI security system, or n8n automation built properly?</h2>
        </div>
        <a className="primary-btn" href={profile.consultationForm} target="_blank" rel="noreferrer">Book your service <ArrowRight size={18} /></a>
      </section>

      <section id="about" className="section story-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">About</p>
            <h2>Cybersecurity instincts with AI product velocity.</h2>
          </div>
        </div>
        <div className="story-grid">
          {story.map((paragraph, index) => <p key={paragraph}><span>0{index + 1}</span>{paragraph}</p>)}
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Skills intelligence dashboard</p>
            <h2>Evidence-backed capability map.</h2>
          </div>
          <RadarChart />
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="panel skill-panel" key={group.label}>
              <div className="panel-title"><h3>{group.label}</h3><strong>{group.score}%</strong></div>
              {group.skills.map((skill) => (
                <div className="skill-row" key={skill.name}>
                  <div><strong>{skill.name}</strong><span>{skill.proof}</span></div>
                  <div className="meter"><i style={{ width: `${skill.value}%` }} /></div>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Featured projects</p>
            <h2>Case studies that connect threats, AI, and business outcomes.</h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects, tools, impact" />
          </label>
        </div>
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-top"><span>{project.category}</span><small>{project.status}</small></div>
              <h3>{project.title}</h3>
              <p>{project.problem}</p>
              <div className="impact"><Zap size={16} />{project.impact}</div>
              <div className="architecture">
                {project.architecture.map((step) => <span key={step}>{step}</span>)}
              </div>
              <div className="tag-row">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <ul>
                {project.metrics.map((metric) => <li key={metric}><Check size={15} />{metric}</li>)}
              </ul>
              <small className="lesson">{project.lesson}</small>
            </article>
          ))}
        </div>
        <div className="inline-cta">
          <div>
            <strong>Want a system like these for your team?</strong>
            <span>Security automation, SOC triage, phishing simulations, RAG knowledge systems, and client workflow engineering.</span>
          </div>
          <a className="primary-btn" href={profile.consultationForm} target="_blank" rel="noreferrer">Request a build <ArrowRight size={18} /></a>
        </div>
      </section>

      <RepoIntelligence query={search} />

      <section id="experience" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Experience timeline</p>
            <h2>From SOC operations to AI automation leadership.</h2>
          </div>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article key={`${item.company}-${item.role}`}>
              <span>{item.period}</span>
              <h3>{item.role}</h3>
              <strong>{item.company} · {item.location}</strong>
              <p>{item.focus}</p>
              <div>{item.wins.map((win) => <small key={win}>{win}</small>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="systems-lab" className="section lab-section">
        <div>
          <p className="eyebrow">Systems lab</p>
          <h2>Experimental security systems with production intent.</h2>
          <p>Current lab themes: secure RAG, analyst copilots, LLM policy reasoning, workflow agents, phishing intelligence, and cloud-deployed services with measurable reliability.</p>
        </div>
        <div className="lab-grid">
          {["RAG security memory", "Agentic SOC runbooks", "LLM firewall guardrails", "Voice customer agents", "Fine-tuned classifiers", "Compliance automation"].map((item) => (
            <span key={item}><Sparkles size={16} />{item}</span>
          ))}
        </div>
      </section>

      <section id="certifications" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Certifications</p>
            <h2>Security, automation, LLM security, and compliance signals.</h2>
          </div>
        </div>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <article className="cert-card" key={cert.name}>
              <span>{cert.date}</span>
              <h3>{cert.name}</h3>
              <strong>{cert.issuer}</strong>
              <p>{cert.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section roadmap-section">
        <div>
          <p className="eyebrow">Roadmap</p>
          <h2>Where the portfolio can evolve next.</h2>
        </div>
        <div className="roadmap-list">{roadmap.map((item) => <p key={item}>{item}</p>)}</div>
      </section>

      <section id="contact" className="section contact-section">
        <div>
          <p className="eyebrow">Contact center</p>
          <h2>Build sharper cyber defense with Maaz.</h2>
          <p>Best fit: AI Security Engineer, Security Automation Engineer, SOC L3, GenAI Consultant, AI/ML Engineer, or founder-grade automation builder.</p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}><Mail size={18} />{profile.email}</a>
            <a href={`tel:${profile.phone.replaceAll(" ", "")}`}><Phone size={18} />{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Link size={18} />LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={18} />GitHub</a>
          </div>
        </div>
        <form className="contact-form" action={`mailto:${profile.email}`} method="post" encType="text/plain">
          <input name="name" placeholder="Name" />
          <input name="email" placeholder="Email" type="email" />
          <textarea name="message" placeholder="Project, role, or collaboration details" rows={5} />
          <button className="primary-btn" type="submit">Send brief <Mail size={18} /></button>
          <a className="secondary-btn" href={profile.consultationForm} target="_blank" rel="noreferrer"><Calendar size={18} /> Book consultation</a>
        </form>
      </section>

      <button className="assistant-launcher" onClick={() => setAssistantOpen(true)} aria-label="Open service guide"><Bot size={22} /></button>
      {assistantOpen && (
        <div className="assistant-panel" role="dialog" aria-label="Portfolio service guide">
          <div><strong>Service guide</strong><button onClick={() => setAssistantOpen(false)}>Close</button></div>
          <textarea value={assistantQuery} onChange={(event) => setAssistantQuery(event.target.value)} />
          <p>{assistantAnswer}</p>
        </div>
      )}

      {commandOpen && (
        <div className="command-backdrop" onClick={() => setCommandOpen(false)}>
          <div className="command-panel" onClick={(event) => event.stopPropagation()}>
            <div className="search-box"><Command size={18} /><input autoFocus placeholder="Jump to section or search projects" onChange={(event) => setSearch(event.target.value)} /></div>
            {navItems.map((item) => (
              <button key={item} onClick={() => { document.getElementById(item)?.scrollIntoView({ behavior: "smooth" }); setCommandOpen(false); }}>
                Go to {item.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
