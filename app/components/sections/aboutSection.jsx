"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/sectionHeader";

const education = [
  {
    school: "Middle East University (MEU)",
    degree: "Bachelor of Computer Science",
    date: "Oct 2024 – Feb 2027",
    desc: "Transferred to complete my CS degree, deepening expertise in software engineering and systems.",
  },
  {
    school: "Al-Hussein Technical University (HTU)",
    degree: "Computer Science",
    date: "Oct 2021 – Sep 2024",
    desc: "Built a solid foundation in programming, algorithms, data structures, and system design.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="viewport-section bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <SectionHeader title="About Me" />

        <div className="about-columns grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
              <p>
                I am{" "}
                <span className="text-foreground font-semibold">
                  Adnan Makahhal
                </span>
                , a Computer Science student and full-stack developer living
                between{" "}
                <span className="text-foreground font-semibold">
                  Amman, Jordan
                </span>{" "}
                and{" "}
                <span className="text-foreground font-semibold">
                  Dubai, UAE
                </span>
                .
              </p>
              <p>
                I started my CS journey at{" "}
                <span className="text-primary font-medium">
                  Al-Hussein Technical University
                </span>
                , then transferred to{" "}
                <span className="text-primary font-medium">
                  Middle East University
                </span>{" "}
                to complete my degree.
              </p>
              <p>
                I focus on{" "}
                <span className="text-foreground font-medium">
                  full-stack web development
                </span>{" "}
                — building modern apps with{" "}
                <span className="text-primary font-medium">
                  React and Next.js
                </span>
                .
              </p>
              <div className="flex items-center gap-2 text-foreground font-medium pt-1">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Amman, Jordan · Dubai, UAE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-foreground">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="relative space-y-5 before:absolute before:left-[18px] before:top-3 before:bottom-3 before:w-px before:bg-border">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-[13px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-primary bg-background" />
                  <div className="bg-card border border-border rounded-xl p-4 card-hover">
                    <div className="font-semibold text-foreground text-sm mb-0.5">
                      {edu.school}
                    </div>
                    <div className="text-primary text-xs font-medium mb-1">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {edu.date}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {edu.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

