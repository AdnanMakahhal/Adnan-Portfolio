import Image from "next/image";
import { skillCategories } from "@/data";
import SectionHeader from "@/components/ui/sectionHeader";

const row1 = [...skillCategories[0].skills];
const row2 = [...skillCategories[1].skills, ...skillCategories[2].skills];
const row3 = [...skillCategories[3].skills, ...skillCategories[4].skills];

function buildList(skills) {
  const minReps = Math.max(Math.ceil(2800 / (skills.length * 160)), 2) * 2;
  return Array.from({ length: minReps }, () => skills).flat();
}

function MarqueeRow({ skills, reverse = false }) {
  const list = buildList(skills);
  return (
    <div
      className="overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className={`flex gap-3 ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}
        style={{ width: "max-content" }}
      >
        {list.map((skill, i) => (
          <div
            key={`${skill.icon}-${i}`}
            className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl flex-shrink-0 select-none hover:border-primary/30 hover:shadow-primary/8 transition-colors duration-200"
          >
            <Image
              src={`https://skillicons.dev/icons?i=${skill.icon}&theme=light`}
              alt={skill.name}
              width={36}
              height={36}
              sizes="36px"
              unoptimized
              className="w-9 h-9 flex-shrink-0"
              loading="lazy"
            />
            <span className="text-sm text-foreground font-medium whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="viewport-section section-alt"
    >
      <div className="w-full py-6 flex flex-col gap-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <SectionHeader title="Skills and Tools" />
        </div>
        <div className="space-y-4">
          <MarqueeRow skills={row1} />
          <MarqueeRow skills={row2} reverse />
          <MarqueeRow skills={row3} />
        </div>
      </div>
    </section>
  );
}

