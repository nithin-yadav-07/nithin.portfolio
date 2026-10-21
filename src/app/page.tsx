"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { PageTransition, InteractiveCard, ScrollProgressBar } from "@/components/ui/page-transition";
import { AnimatedHeroName } from "@/components/ui/animated-hero-name";
import { StaggerCarousel, StaggerItem } from "@/components/ui/stagger-testimonials";
import { ProjectDetailModal, ProjectDetail } from "@/components/ui/project-detail-modal";
import { ResumeModal } from "@/components/ui/resume-modal";
import { ContactModal } from "@/components/ui/contact-modal";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { playClickSound, playModalOpenSound } from "@/lib/sound-effects";
import {
  Mail,
  MapPin,
  Phone,
  Code2,
  ExternalLink,
  ShieldCheck,
  Award,
  BookOpen,
  Terminal,
  Activity,
  Cpu,
  Lock,
  Layers,
  Sparkles,
  Binary,
  Globe2,
  FileText,
} from "lucide-react";
import Image from "next/image";

// ── 1. Featured Projects (Stagger Carousel Data with Deep-Dive Intelligence) ──
const repoStaggerItems: (StaggerItem & ProjectDetail)[] = [
  {
    id: "repo-1",
    title: "Zitan Security",
    subtitle: "AI-Driven SOC Monitoring Platform",
    description:
      "Collects system and web-server logs through Wazuh and passes them to a local LLM (Qwen2.5) to detect attack patterns. Automated response blocks unauthorized deletion and copying of sensitive files. Cowrie honeypot, FastAPI dashboard with 2FA, JWT and RBAC, live log feed, AI-explained event details, Twilio SMS/call alerts. Fully working.",
    badge: "★ Featured SOC Platform",
    tags: ["Wazuh", "Cowrie", "FastAPI", "Qwen2.5", "Twilio", "Python"],
    link: "https://github.com/nithin-yadav-07",
    icon: <ShieldCheck className="w-6 h-6" />,
    problem:
      "System and web servers require automated attack pattern detection and immediate response against unauthorized tampering and sensitive file exfiltration.",
    threatModel:
      "Unauthorized deletion and copying of sensitive files, web-server compromise, and brute-force intrusion attempts.",
    architecture: [
      "Log collection from system and web servers via Wazuh agent and manager pipeline",
      "Attack pattern detection using local LLM (Qwen2.5) inference",
      "Automated response mechanism blocking unauthorized deletion and copying of sensitive files",
      "Integrated Cowrie honeypot for decoy threat capture and interaction analysis",
      "FastAPI dashboard featuring 2FA, JWT authentication, RBAC, live log feed, and AI-explained event details",
      "Automated Twilio SMS and voice call alerting for high-severity events",
    ],
    findings: [
      "Automated response successfully blocks unauthorized deletion and copying of sensitive files",
      "Fully working operational SOC monitoring and response deployment",
    ],
    tools: ["Wazuh", "Cowrie", "FastAPI", "Qwen2.5", "Twilio", "Python", "JWT", "RBAC"],
  },
  {
    id: "repo-2",
    title: "CyberShield",
    subtitle: "Phishing & Spam Detection",
    description:
      "Chrome Extension (Manifest V3) plus web app. Scans domains and emails and blocks suspicious, phishing and spam domains and emails. Scoring uses Levenshtein distance (typosquatting), brand-impersonation allowlists, blocklists, suspicious-TLD checks and urgency-keyword analysis. Passed 43/43 test cases.",
    badge: "★ Anti-Phishing Suite",
    tags: ["Chrome Extension", "Manifest V3", "Web App", "Heuristics", "JavaScript", "Python"],
    link: "https://github.com/nithin-yadav-07",
    icon: <Lock className="w-6 h-6" />,
    problem:
      "Phishing campaigns, deceptive spam emails, and typosquatted domains actively target users through brand impersonation and evade standard perimeter filters.",
    threatModel:
      "Typosquatting attacks, brand impersonation, deceptive email phishing, and malicious top-level domains (TLDs).",
    architecture: [
      "Chrome Extension built on Manifest V3 architecture coupled with web application frontend",
      "Real-time domain and email scanning engine",
      "Heuristic scoring engine utilizing Levenshtein distance for typosquatting detection against brand allowlists",
      "Brand-impersonation allowlists and curated malicious domain blocklists",
      "Suspicious-TLD evaluation and urgency-keyword semantic analysis",
    ],
    findings: [
      "Passed 43/43 test cases across targeted phishing and spam scenarios",
      "Blocks suspicious, phishing, and spam domains and emails",
    ],
    tools: ["Manifest V3", "JavaScript", "Python", "Levenshtein Distance", "Web Security"],
  },
  {
    id: "repo-3",
    title: "Vulnerability Scanner",
    subtitle: "Service Discovery & CVE Correlation",
    description:
      "Automated service discovery and CVE/NVD correlation to prioritize exploitable weaknesses, with structured remediation-oriented reports.",
    badge: "Vulnerability Assessment",
    tags: ["Python", "Nmap NSE", "CVE/NVD", "Vulnerability Assessment", "Automation"],
    link: "https://github.com/nithin-yadav-07",
    icon: <Terminal className="w-6 h-6" />,
    problem:
      "Manual vulnerability assessment of network services is time-consuming and often lacks direct correlation to active CVE/NVD databases.",
    threatModel:
      "Known unpatched vulnerabilities and exploitable service weaknesses across exposed network services.",
    architecture: [
      "Automated service discovery engine utilizing Nmap NSE",
      "Correlation pipeline with CVE and NVD databases",
      "Prioritization engine focusing on exploitable weaknesses",
      "Structured remediation-oriented report generation module",
    ],
    findings: [
      "Prioritizes exploitable weaknesses with structured remediation-oriented reports",
    ],
    tools: ["Python", "Nmap NSE", "CVE/NVD", "Network Security", "Structured Reporting"],
  },
  {
    id: "repo-4",
    title: "Automated Recon Framework",
    subtitle: "Modular Reconnaissance & Asset Discovery",
    description:
      "Modular workflow: subdomain discovery, DNS enumeration, service/version fingerprinting; reusable modules.",
    badge: "Reconnaissance",
    tags: ["Python", "DNS Enumeration", "Subdomain Discovery", "Fingerprinting"],
    link: "https://github.com/nithin-yadav-07",
    icon: <Globe2 className="w-6 h-6" />,
    problem:
      "Security testing often involves disjointed reconnaissance tools that lack a structured, modular pipeline for repeatable asset discovery.",
    threatModel:
      "External asset exposure, unmapped subdomains, and exposed service versions.",
    architecture: [
      "Modular reconnaissance architecture with independent, reusable modules",
      "Automated subdomain discovery workflow",
      "DNS enumeration engine",
      "Service and version fingerprinting module",
    ],
    tools: ["Python", "DNS Enumeration", "Subdomain Discovery", "Service Fingerprinting"],
  },
  {
    id: "repo-5",
    title: "Multithreaded Port & Service Scanner",
    subtitle: "Scratch-Built Socket Scanner",
    description:
      "Built from scratch; open-port detection and service/version fingerprinting.",
    badge: "Network Engineering",
    tags: ["Python", "Sockets", "Multithreading", "Port Scanning", "TCP/IP"],
    link: "https://github.com/nithin-yadav-07",
    icon: <Activity className="w-6 h-6" />,
    problem:
      "Testing in restricted environments requires lightweight, dependency-free socket scanning tools capable of rapid multithreaded network inspection.",
    threatModel:
      "Open port exposure, unauthorized network listener services, and service banner version leakage.",
    architecture: [
      "Built from scratch using native Python sockets without external dependencies",
      "Multithreaded socket connection pooling for rapid concurrency",
      "Open-port detection and active service/version fingerprinting",
    ],
    tools: ["Python", "Sockets", "Multithreading", "TCP/IP"],
  },
];

// ── 2. Skills & Capabilities (Stagger Carousel Data) ────────────────────────
const skillStaggerItems: StaggerItem[] = [
  {
    id: "skill-1",
    title: "IAM & Cloud Security",
    subtitle: "Identity & Cloud Protection",
    description:
      "Hands-on identity and access governance across JumpCloud and Netskope CASB on AWS. Enforcing group-based access policies, SSO, MFA, RBAC, and LDAP/RADIUS.",
    badge: "Cloud & IAM",
    tags: ["JumpCloud", "Netskope CASB", "SSO", "MFA", "RBAC", "LDAP/RADIUS", "AWS"],
    icon: <Lock className="w-6 h-6" />,
  },
  {
    id: "skill-2",
    title: "Detection & Response",
    subtitle: "SIEM & Threat Operations",
    description:
      "Deploying and operating Wazuh for log analysis, utilizing Cowrie honeypots for decoy threat capture, and developing LLM-assisted threat detection and automated response.",
    badge: "SOC Operations",
    tags: ["Wazuh", "Cowrie honeypot", "Log Analysis", "LLM-Assisted Threat Detection"],
    icon: <Activity className="w-6 h-6" />,
  },
  {
    id: "skill-3",
    title: "Offensive Security",
    subtitle: "Assessment & Penetration Testing",
    description:
      "Penetration testing methodologies, vulnerability assessment, web & network security auditing, asset reconnaissance, and Active Directory attack path analysis.",
    badge: "Offensive Security",
    tags: ["Penetration Testing", "Vulnerability Assessment", "Web & Network Security", "Reconnaissance", "Active Directory Attack Paths"],
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "skill-4",
    title: "Security Tools",
    subtitle: "Security Arsenal",
    description:
      "Practical execution of industry-standard security toolsets for packet analysis, traffic inspection, proxy interception, and vulnerability verification.",
    badge: "Toolchain",
    tags: ["Nmap", "Burp Suite", "Metasploit", "Kali Linux", "Wireshark"],
    icon: <Terminal className="w-6 h-6" />,
  },
  {
    id: "skill-5",
    title: "Programming & Engineering",
    subtitle: "Development & Protocols",
    description:
      "Authoring security automation, REST API backends, and containerized utilities with strong proficiency across foundational network and web application protocols.",
    badge: "Development",
    tags: ["Python", "Bash", "Docker", "FastAPI", "REST APIs", "TCP/IP", "DNS", "HTTP/HTTPS"],
    icon: <Binary className="w-6 h-6" />,
  },
  {
    id: "skill-6",
    title: "Security Engineering",
    subtitle: "Correlation & Remediation",
    description:
      "Automating CVE/NVD vulnerability correlation, performing service/version fingerprinting, building security automation pipelines, and delivering structured remediation reporting.",
    badge: "Security Engineering",
    tags: ["CVE/NVD Correlation", "Service Fingerprinting", "Security Automation", "Structured Reporting"],
    icon: <Cpu className="w-6 h-6" />,
  },
];

// ── 3. Certifications & Achievements (Stagger Carousel Data) ─────────────────
const certStaggerItems: StaggerItem[] = [
  {
    id: "cert-1",
    title: "CEH v13 (Certified Ethical Hacker)",
    subtitle: "Targeting December 2026",
    description:
      "Comprehensive ethical hacking curriculum covering advanced attack vectors, reconnaissance, system hacking, and penetration testing methodologies.",
    badge: "In Progress",
    tags: ["Ethical Hacking", "CEH v13", "Target: Dec 2026", "Offensive Security"],
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "cert-2",
    title: "Jain National Hackathon, Tech for Agriculture",
    subtitle: "Organized with IBM",
    description:
      "Selected as national finalist (Top 5 of 650+ participants nationwide) in the prestigious hackathon organized in partnership with IBM.",
    badge: "Finalist · Top 5 of 650+",
    tags: ["National Finalist", "Top 5 of 650+", "IBM", "Hackathon"],
    link: "https://github.com/nithin-yadav-07",
    icon: <Award className="w-6 h-6" />,
  },
];

export default function Home() {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <ScrollProgressBar />
      <main className="relative z-10 text-foreground font-sans selection:bg-blue-500/20 overflow-x-hidden w-full max-w-[100vw] transition-colors duration-300">

        {/* ── About Section (Hero / Welcome Section) ──── */}
        <section id="about" className="pt-18 md:pt-22 pb-20 md:pb-24 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start justify-between">

              {/* LEFT — Text */}
              <PageTransition direction="left" className="flex-1 w-full max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// About Me</span>
                  <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                </div>

                <AnimatedHeroName />

                <p className="text-[#8a9cc4] text-lg lg:text-xl leading-relaxed mb-10 mt-8 font-normal">
                  Security engineer with hands-on IAM (JumpCloud), CASB (Netskope) and AWS experience, plus offensive security tooling in Python. Built an AI-driven SOC platform on Wazuh and a phishing-detection extension. Finalist (top 5 of 650+) at the Jain National Hackathon, Tech for Agriculture, with IBM.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      playClickSound();
                      playModalOpenSound();
                      setIsContactOpen(true);
                    }}
                    className="glass flex items-center gap-3.5 px-5 py-4 rounded-2xl text-[#8a9cc4] hover:text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(70,115,235,0.25)] transition-all duration-300 text-sm md:text-base group font-medium text-left cursor-pointer"
                  >
                    <Mail className="w-5 h-5 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">nithinyadavofficial@gmail.com</span>
                  </button>
                  <span className="glass flex items-center gap-3.5 px-5 py-4 rounded-2xl text-[#8a9cc4] text-sm md:text-base font-medium">
                    <Phone className="w-5 h-5 text-blue-400 shrink-0" /> +91 6363331908
                  </span>
                  <span className="glass flex items-center gap-3.5 px-5 py-4 rounded-2xl text-[#8a9cc4] text-sm md:text-base font-medium">
                    <MapPin className="w-5 h-5 text-blue-400 shrink-0" /> Bengaluru, India
                  </span>
                  <div className="flex gap-3.5">
                    <a
                      href="https://github.com/nithin-yadav-07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex-1 flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl text-[#8a9cc4] hover:text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(70,115,235,0.25)] transition-all duration-300 text-sm md:text-base font-medium group"
                    >
                      <Code2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nithinyadav-offensivesecurity/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex-1 flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl text-[#8a9cc4] hover:text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(70,115,235,0.25)] transition-all duration-300 text-sm md:text-base font-medium group"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> LinkedIn
                    </a>
                  </div>

                  {/* ── Interactive Resume & Dossier Trigger ── */}
                  <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        playClickSound();
                        playModalOpenSound();
                        setIsResumeOpen(true);
                      }}
                      className="flex-1 glass flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-blue-300 hover:text-white hover:border-blue-400/60 hover:bg-blue-600/15 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 text-sm md:text-base font-bold group"
                    >
                      <FileText className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>View Resume &amp; Dossier</span>
                      <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                    </button>

                    {/* TODO: Copy your Nithin_Yadav_Resume.pdf into /public with that exact name (/public/Nithin_Yadav_Resume.pdf) */}
                    <a
                      href="/Nithin_Yadav_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClickSound()}
                      className="glass flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-slate-300 hover:text-white hover:border-blue-400/60 transition-all duration-300 text-sm font-semibold group shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Direct PDF</span>
                    </a>
                  </div>
                </div>
              </PageTransition>

              {/* RIGHT — Balanced 3D Profile Card */}
              <PageTransition direction="right" className="w-full sm:w-[350px] lg:w-[390px] shrink-0 self-start lg:pt-1">
                <InteractiveCard
                  className="glass rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(70,115,235,0.22)] hover:border-blue-400/60"
                  glowColor="rgba(140, 190, 255, 0.35)"
                >
                  <div className={`relative w-full aspect-[4/3.8] overflow-hidden ${theme === "dark" ? "bg-[#080d1a]" : "bg-slate-100"}`}>
                    <Image
                      src="/nithin.webp"
                      alt="Nithin Yadav — Security Engineer"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 350px, 390px"
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-t from-[#080d1a]/80 via-transparent to-transparent" : "bg-gradient-to-t from-white/70 via-transparent to-transparent"}`} />
                  </div>

                  <div className={`p-6 ${theme === "dark" ? "bg-[#080d1a]" : "bg-white"}`}>
                    <h3 className={`text-xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Nithin Yadav</h3>
                    <p className={`mt-1 text-xs font-semibold ${theme === "dark" ? "text-cyan-200" : "text-blue-600"}`}>
                      Security Engineer Intern · Wizowl Solutions
                    </p>
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                      <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)] animate-pulse" />
                      BCA Cybersecurity · 2027
                    </div>
                  </div>
                </InteractiveCard>
              </PageTransition>

            </div>
          </div>
        </section>

        {/* ── Experience Section (Interactive Role Cards) ── */}
        <section id="experience" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Experience</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black heading-glow tracking-tighter mb-4 flex items-center gap-4">
                <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-blue-400" /> Professional Experience
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-10 max-w-3xl">
                Active hands-on industry roles in identity and access management, cloud security posture, and detection engineering.
              </p>
            </PageTransition>

            <PageTransition direction="up" delay={0.15}>
              <InteractiveCard className={`p-8 md:p-12 rounded-3xl border shadow-[0_0_50px_rgba(70,115,235,0.15)] relative overflow-hidden transition-colors ${
                theme === "dark"
                  ? "glass border-white/10 hover:border-blue-400/50"
                  : "bg-white border-slate-200 hover:border-blue-400/50 shadow-lg"
              }`}>
                <div className={`flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b ${
                  theme === "dark" ? "border-white/10" : "border-slate-200"
                }`}>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 border border-blue-400/30">
                        Current Position
                      </span>
                      <span className={`text-xs font-medium ${ theme === "dark" ? "text-slate-400" : "text-slate-500" }`}>Bengaluru, India</span>
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-black ${ theme === "dark" ? "text-white" : "text-slate-900" }`}>Security Engineer Intern</h3>
                    <p className="text-lg text-blue-500 font-bold mt-1">Wizowl Solutions</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border shrink-0 self-start ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                    <span className={`text-xs md:text-sm font-bold ${ theme === "dark" ? "text-slate-200" : "text-slate-700" }`}>Sep 2026 – Present</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "Administer identity and access management in JumpCloud for 20 employees and 35 devices: user lifecycle, group-based access policies, SSO, MFA, device policies, LDAP/RADIUS.",
                    "Implemented and maintain Netskope CASB on AWS to monitor cloud app usage, enforce data-protection policies and flag risky or unsanctioned SaaS activity.",
                    "Enforce least-privilege access through role-based groups and periodic access reviews.",
                    "Investigate access anomalies and CASB alerts, and document remediation steps.",
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <p className={`text-sm md:text-base leading-relaxed ${ theme === "dark" ? "text-slate-300" : "text-slate-600" }`}>{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className={`mt-8 pt-8 border-t flex flex-wrap gap-2 ${ theme === "dark" ? "border-white/10" : "border-slate-200" }`}>
                  {["JumpCloud", "Netskope CASB", "AWS", "IAM", "SSO", "MFA", "RBAC", "LDAP/RADIUS", "Detection Engineering"].map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                        theme === "dark"
                          ? "bg-white/5 text-blue-200 border-white/10"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </InteractiveCard>
            </PageTransition>
          </div>
        </section>

        {/* ── 1. Skills Section (Interactive Stagger Angular Carousel) ── */}
        <section id="skills" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Skills</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black heading-glow tracking-tighter mb-4 flex items-center gap-4">
                <Terminal className="w-10 h-10 md:w-14 md:h-14 text-blue-400" /> Technical Skills &amp; Tools
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-8">
                Click any angular card or use arrow controls below to explore core competencies across IAM, defense &amp; engineering.
              </p>
            </PageTransition>

            {/* Stagger Angular Carousel */}
            <StaggerCarousel items={skillStaggerItems} containerHeight={530} />
          </div>
        </section>

        {/* ── 2. Featured Repositories (Interactive Stagger Carousel) ──── */}
        <section id="projects" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// GitHub Projects</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black heading-glow tracking-tighter mb-4 flex items-center gap-4">
                <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-blue-400" /> Featured Projects
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-8">
                Working security engineering projects from{" "}
                <a
                  href="https://github.com/nithin-yadav-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  github.com/nithin-yadav-07
                </a>
              </p>
            </PageTransition>

            {/* Stagger Angular Carousel */}
            <StaggerCarousel
              items={repoStaggerItems}
              containerHeight={530}
              onItemClick={(item) => {
                playModalOpenSound();
                setSelectedProject(item as unknown as ProjectDetail);
              }}
            />

            <PageTransition direction="up" delay={0.25}>
              <div className="mt-8 text-center">
                <a
                  href="https://github.com/nithin-yadav-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base group border transition-all duration-300 ${
                    theme === "dark"
                      ? "glass text-[#8a9cc4] hover:text-white hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(70,115,235,0.3)]"
                      : "bg-white text-slate-600 border-slate-200 hover:text-blue-600 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                  }`}
                >
                  <Code2 className="w-5 h-5 text-blue-500 group-hover:rotate-12 transition-transform" /> Visit My Work
                </a>
              </div>
            </PageTransition>
          </div>
        </section>

        {/* ── 3. Certifications (Interactive Stagger Carousel) ─────────── */}
        <section id="certifications" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Certifications</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black heading-glow tracking-tighter mb-4 flex items-center gap-4">
                <Award className="w-10 h-10 md:w-14 md:h-14 text-blue-400" /> Certifications &amp; Achievements
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-8">
                Professional ethical hacking qualifications and national hackathon achievements.
              </p>
            </PageTransition>

            {/* Stagger Angular Carousel */}
            <StaggerCarousel items={certStaggerItems} containerHeight={510} />
          </div>
        </section>

        {/* ── Education ─────────────────────────────────────────────────── */}
        <section id="education" className="py-28 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Education</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black heading-glow tracking-tighter mb-6 flex items-center gap-4">
                <BookOpen className="w-9 h-9 md:w-12 md:h-12 text-blue-400" /> Academic Background
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-10 max-w-3xl">
                Formal education spanning secondary school through a cybersecurity-focused degree.
              </p>
            </PageTransition>

            <PageTransition direction="up" delay={0.15}>
              <div className="max-w-3xl border-l-2 border-blue-400/40 pl-1">

                {/* 1. BCA — SSMRV */}
                <div className="relative pl-7 pb-10 group">
                  <div className="absolute w-3.5 h-3.5 rounded-full -left-[8px] top-2 bg-blue-500 shadow-[0_0_14px_rgba(70,115,235,0.9)] group-hover:scale-125 transition-transform duration-300" />
                  <InteractiveCard className={`p-6 rounded-2xl border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-blue-500/10 border-blue-400/20 hover:border-blue-400/60 hover:bg-blue-500/15"
                      : "bg-blue-50 border-blue-200 hover:border-blue-400"
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className={`text-lg md:text-xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          Bachelor of Computer Applications (BCA)
                        </h3>
                        <p className="text-sm font-semibold text-blue-500 mt-0.5">Cybersecurity</p>
                        <p className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          SSMRV College, Bengaluru
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-400/30 px-3 py-1.5 rounded-full">
                        Expected 2027
                      </span>
                    </div>
                  </InteractiveCard>
                </div>

                {/* 2. PUC — Krupanidhi */}
                <div className="relative pl-7 pb-10 group">
                  <div className="absolute w-3.5 h-3.5 rounded-full -left-[8px] top-2 bg-indigo-500 shadow-[0_0_14px_rgba(99,102,241,0.8)] group-hover:scale-125 transition-transform duration-300" />
                  <InteractiveCard className={`p-6 rounded-2xl border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/[0.03] border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/10"
                      : "bg-white border-slate-200 hover:border-indigo-400"
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className={`text-lg md:text-xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          Pre-University (PUC)
                        </h3>
                        <p className="text-sm font-semibold text-indigo-400 mt-0.5">
                          PCMC — Physics, Chemistry, Mathematics, Computer Science
                        </p>
                        <p className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Krupanidhi Pre-University College
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-400/30 px-3 py-1.5 rounded-full">
                        2022 – 2024
                      </span>
                    </div>
                  </InteractiveCard>
                </div>

                {/* 3. Secondary — RGPS */}
                <div className="relative pl-7 group">
                  <div className="absolute w-3.5 h-3.5 rounded-full -left-[8px] top-2 bg-cyan-500 shadow-[0_0_14px_rgba(6,182,212,0.8)] group-hover:scale-125 transition-transform duration-300" />
                  <InteractiveCard className={`p-6 rounded-2xl border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/[0.03] border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10"
                      : "bg-white border-slate-200 hover:border-cyan-400"
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className={`text-lg md:text-xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          Secondary School
                        </h3>
                        <p className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Rockwood Green Public School (RGPS)
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-400/30 px-3 py-1.5 rounded-full">
                        2022
                      </span>
                    </div>
                  </InteractiveCard>
                </div>

              </div>
            </PageTransition>
          </div>
        </section>

        {/* ── Interactive Modals & Sound Controls ── */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
        <SoundToggle />

      </main>
      <CinematicFooter />
    </>
  );
}
