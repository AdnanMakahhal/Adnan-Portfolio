import NavBar from "@/components/layout/navBar";
import HeroSection from "@/components/sections/heroSection";
import AboutSection from "@/components/sections/aboutSection";
import SkillsSection from "@/components/sections/skillsSection";
import ProjectsSection from "@/components/sections/projectsSection";
import CertificatesSection from "@/components/sections/certificatesSection";
import ContactSection from "@/components/sections/contactSection";

export default function Home() {
  return (
    <main>
      <div className="hero-viewport">
        <NavBar />
        <HeroSection />
      </div>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
    </main>
  );
}
