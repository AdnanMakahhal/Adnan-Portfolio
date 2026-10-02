"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav ref={navRef} className="reference-nav" aria-label="Main navigation">
      <a href="#home" className="header-brand" aria-label="Adnan Makahhal home">
        AM<span>.</span>
      </a>
      <div className="reference-nav-links">
        {navItems.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </div>
      <a className="ink-button nav-talk" href="#contact">
        Let’s Talk <ArrowUpRight size={18} />
      </a>
      <button
        ref={menuButtonRef}
        className="reference-menu-button"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <div
        id="mobile-navigation"
        className="reference-mobile-menu"
        hidden={!isOpen}
      >
        <p className="mobile-menu-heading">Navigate</p>
        {navItems.map((item) => (
          <a key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
            <span>{item.name}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}
