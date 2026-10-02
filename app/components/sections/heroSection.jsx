import Image from "next/image";
import { Download, Github, Linkedin, Instagram, Mail } from "lucide-react";
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
  return (
    <section id="home" className="reference-hero">
      <h1 className="reference-name">
        <span>ADNAN</span> <strong>MAKAHHAL</strong>
      </h1>
      {/* <div className="reference-person"><Image src="/images/rien.png" alt="Anime character wearing a black hoodie" width={736} height={1306} priority sizes="(max-width: 640px) 90vw, 55vw" /></div> */}
      <div className="reference-intro">
        <h2>UI/UX Designer &amp; Full-Stack Developer</h2>
        <p>I bring thoughtful design and clean code together to build websites that look great and feel effortless to use.</p>
        <div className="hero-actions">
          <button
            className="ink-button cv-download"
            type="button"
            disabled
            aria-label="Download CV, coming soon"
          >
            Download CV (Coming soon) <Download size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="reference-socials">
        {socials.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={21} />
            <span>{label}</span>
          </a>
        ))}
      </div>
      <div className="hero-mist" aria-hidden="true" />
    </section>
  );
}
