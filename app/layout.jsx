import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Adnan Makahhal | Full-Stack Developer",
  description:
    "Portfolio of Adnan Makahhal — a Computer Science student and full-stack developer from Jordan, specializing in React, Next.js, Flutter, and modern web technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "antialiased bg-background text-foreground")}>
        {children}
      </body>
    </html>
  );
}
