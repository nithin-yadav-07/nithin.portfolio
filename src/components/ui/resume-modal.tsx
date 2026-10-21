"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  Mail,
  Code2,
  Award,
  GraduationCap,
  Terminal,
  FileText,
  Eye,
} from "lucide-react";
import { playModalCloseSound, playClickSound } from "@/lib/sound-effects";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRIVE_FILE_ID = "1FQ5hoJGCLqftpySJYy7Rsd4C33_NdFiC";
const RESUME_PDF_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;
const RESUME_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"pdf" | "dossier">("pdf");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        playModalCloseSound();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleClose = () => {
    playModalCloseSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl bg-[#080d1a] border border-blue-500/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.25)] overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Curriculum Vitae // Nithin Yadav
            </span>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("pdf");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "pdf"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Original PDF</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("dossier");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "dossier"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Structured Dossier</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-400/40 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={`https://drive.google.com/file/d/${DRIVE_FILE_ID}/view`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Open in Tab</span>
            </a>

            <button
              onClick={handlePrint}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              <span>Print</span>
            </button>

            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-75px)]">
          {activeTab === "pdf" ? (
            <div className="p-4 sm:p-6 flex flex-col items-center">
              <div className="w-full aspect-[8.5/11] max-h-[72vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative">
                <iframe
                  src={RESUME_EMBED_URL}
                  title="Nithin Yadav Resume PDF"
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
                <span>PDF not rendering in your browser?</span>
                <a
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Open PDF directly in a new tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-10 space-y-8 print:p-0 print:bg-white print:text-black">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 print:border-black/20">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white print:text-black mb-2">
                    NITHIN YADAV
                  </h1>
                  <p className="text-blue-400 font-bold text-sm sm:text-base tracking-wide uppercase">
                    Security Engineer | Offensive Security | Detection &amp; Response
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Bengaluru, India • BCA (Cybersecurity) Class of 2027 (Expected)
                  </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="mailto:nithinyadavofficial@gmail.com"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-blue-400/40"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    nithinyadavofficial@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nithinyadav-offensivesecurity/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-blue-400/40"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/nithin-yadav-07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-blue-400/40"
                  >
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Professional Summary
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed print:text-black">
                  Security engineer with hands-on IAM (JumpCloud), CASB (Netskope) and AWS experience, plus offensive security tooling in Python. Built an AI-driven SOC platform on Wazuh and a phishing-detection extension. Finalist (top 5 of 650+) at the Jain National Hackathon, Tech for Agriculture, with IBM.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Professional Experience
                </h2>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Security Engineer Intern</h3>
                      <p className="text-xs text-blue-400 font-semibold">Wizowl Solutions</p>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Sep 2026 – Present</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Administer identity and access management in JumpCloud for 20 employees and 35 devices: user lifecycle, group-based access policies, SSO, MFA, device policies, LDAP/RADIUS.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Implemented and maintain Netskope CASB on AWS to monitor cloud app usage, enforce data-protection policies and flag risky or unsanctioned SaaS activity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Enforce least-privilege access through role-based groups and periodic access reviews.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Investigate access anomalies and CASB alerts, and document remediation steps.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Core Technical Competencies */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-blue-400" /> Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-blue-300 block mb-1">IAM &amp; Cloud Security</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      JumpCloud, Netskope CASB, SSO, MFA, RBAC, LDAP/RADIUS, AWS
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-cyan-300 block mb-1">Detection &amp; Response</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Wazuh, Cowrie honeypot, log analysis, LLM-assisted threat detection
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-indigo-300 block mb-1">Offensive Security</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Penetration Testing, Vulnerability Assessment, Web &amp; Network Security, Reconnaissance, Active Directory Attack Paths
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-sky-300 block mb-1">Security Tools</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Nmap, Burp Suite, Metasploit, Kali Linux, Wireshark
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-emerald-300 block mb-1">Programming &amp; Engineering</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Python, Bash, Docker, FastAPI, REST APIs, TCP/IP, DNS, HTTP/HTTPS
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-purple-300 block mb-1">Security Engineering</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      CVE/NVD correlation, service fingerprinting, security automation, structured reporting
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-blue-400" /> Certifications &amp; Achievements
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">CEH v13 (Certified Ethical Hacker)</h3>
                      <p className="text-xs text-slate-400">Targeting December 2026.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30 shrink-0">
                      In Progress
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Jain National Hackathon, Tech for Agriculture, with IBM</h3>
                      <p className="text-xs text-slate-400">National level hackathon organized in collaboration with IBM.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30 shrink-0">
                      Finalist · Top 5 of 650+
                    </span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-blue-400" /> Education
                </h2>
                <div className="space-y-3">

                  {/* 1. BCA */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-white">Bachelor of Computer Applications (BCA)</h3>
                        <p className="text-xs text-blue-400 font-semibold">Cybersecurity</p>
                      </div>
                      <span className="text-xs text-blue-400 font-bold shrink-0">Expected 2027</span>
                    </div>
                    <p className="text-xs text-slate-300">SSMRV College, Bengaluru</p>
                  </div>

                  {/* 2. PUC */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-white">Pre-University (PUC)</h3>
                        <p className="text-xs text-indigo-400 font-semibold">PCMC — Physics, Chemistry, Mathematics, Computer Science</p>
                      </div>
                      <span className="text-xs text-indigo-400 font-bold shrink-0">2022 – 2024</span>
                    </div>
                    <p className="text-xs text-slate-300">Krupanidhi Pre-University College</p>
                  </div>

                  {/* 3. Secondary */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="text-sm font-bold text-white">Secondary School</h3>
                      <span className="text-xs text-cyan-400 font-bold shrink-0">2022</span>
                    </div>
                    <p className="text-xs text-slate-300">Rockwood Green Public School (RGPS)</p>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
          <span>Official Candidate Profile • Nithin Yadav</span>
          <a
            href={`https://drive.google.com/file/d/${DRIVE_FILE_ID}/view`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="flex items-center gap-1.5 text-blue-400 hover:text-white font-bold transition-colors"
          >
            <span>Open in Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
