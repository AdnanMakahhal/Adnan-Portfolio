"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Download, Github, Linkedin, Instagram, Mail } from "lucide-react";

const CvDialog = dynamic(() => import("../ui/cvDialog"), { ssr: false });

const socials = [
  { icon: Github, href: "https://github.com/AdnanMakahhal", label: "GitHub" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/whyadnan.lol/",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/adnan-makahhal-90578731b/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:adnan.pls2003@gmail.com", label: "Email" },
];

export default function HeroSection() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <section id="home" className="reference-hero">
      <h1 className="reference-name">
        <span>ADNAN</span> <strong>MAKAHHAL</strong>
      </h1>
      <div className="reference-intro">
        <h2>UI/UX Designer &amp; Full-Stack Developer</h2>
        <p>
          I bring thoughtful design and clean code together to build websites that
          look great and feel effortless to use.
        </p>
        <div className="hero-actions">
          <button
            className="ink-button cv-download"
            type="button"
            onClick={() => setIsCvOpen(true)}
            aria-haspopup="dialog"
          >
            Download CV <Download size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="reference-socials">
        {socials.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={21} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>
      <div className="hero-mist" aria-hidden="true" />

      <CvDialog open={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}
