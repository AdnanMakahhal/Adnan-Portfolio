import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { certificates } from "@/data";

export const metadata = {
  title: "Certificates | Adnan Makahhal",
  description: "Certificates and course completions earned by Adnan Makahhal.",
};

export default function CertificatesPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Award className="h-4 w-4 text-primary" />
            My Certificates
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.title} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="relative w-full bg-background" style={{ paddingBottom: "70%" }}>
                <iframe
                  src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                  title={cert.title}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Adnan Makahhal
      </footer>
    </main>
  );
}
