import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmokeBackground } from "@/components/ui/smoke-background";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nithin Yadav | Security Engineer | Offensive Security",
  description:
    "BCA (Cybersecurity) final-year student and Security Engineer Intern at Wizowl Solutions, working on identity and access management, CASB and detection engineering.",
  keywords: [
    "Nithin Yadav",
    "Security Engineer",
    "Offensive Security",
    "Detection & Response",
    "IAM",
    "JumpCloud",
    "Netskope CASB",
    "AWS",
    "Wazuh",
    "Cowrie",
    "FastAPI",
    "Python Security",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Bengaluru",
    "SSMRV College",
    "Wizowl Solutions",
  ],
  authors: [{ name: "Nithin Yadav", url: "https://github.com/nithin-yadav-07" }],
  creator: "Nithin Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nithin Yadav Portfolio",
    title: "Nithin Yadav | Security Engineer | Offensive Security",
    description:
      "BCA (Cybersecurity) final-year student and Security Engineer Intern at Wizowl Solutions, working on identity and access management, CASB and detection engineering.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nithin Yadav — Security Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nithin Yadav | Security Engineer | Offensive Security",
    description:
      "BCA (Cybersecurity) final-year student and Security Engineer Intern at Wizowl Solutions, working on identity and access management, CASB and detection engineering.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nithin Yadav",
  jobTitle: "Security Engineer Intern",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "SSMRV College",
    },
    {
      "@type": "EducationalOrganization",
      name: "Krupanidhi Pre-University College",
    },
    {
      "@type": "EducationalOrganization",
      name: "Rockwood Green Public School",
    },
  ],
  knowsAbout: [
    "Identity and Access Management (IAM)",
    "JumpCloud",
    "Netskope CASB",
    "Cloud Security",
    "AWS",
    "Detection & Response",
    "Wazuh",
    "Cowrie Honeypot",
    "Offensive Security",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Python",
    "FastAPI",
    "Security Automation",
  ],
  sameAs: [
    "https://github.com/nithin-yadav-07",
    "https://www.linkedin.com/in/nithinyadav-offensivesecurity/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased font-sans overflow-x-hidden w-full max-w-[100vw]`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full max-w-[100vw] relative">
        <ThemeProvider>
          <Navbar />
          <CustomCursor />
          <SmokeBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
