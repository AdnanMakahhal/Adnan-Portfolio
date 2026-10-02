"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import { Github, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data";
import "swiper/css";

const tagIcons = {
  React: "react",
  "Next.js": "nextjs",
  "Tailwind CSS": "tailwind",
  Supabase: "supabase",
  Redux: "redux",
  HTML: "html",
  CSS: "css",
  JavaScript: "js",
  PHP: "php",
  MySQL: "mysql",
  "Styled Components": "styledcomponents",
};
function ProjectCover({ project }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`project-art cover-${project.cover}`}>
      {(!project.image || failed) && (
        <div className="cover-artwork" aria-hidden="true">
          <strong>{project.title}</strong>
          <div className="cover-shape" />
        </div>
      )}
      {project.image && !failed && (
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          onError={() => setFailed(true)}
          className="project-preview-image"
        />
      )}
    </div>
  );
}
export default function ProjectsSection() {
  const swiperRef = useRef(null);
  const [position, setPosition] = useState({
    start: true,
    end: false,
    index: 0,
  });
  const updatePosition = (swiper) =>
    setPosition({
      start: swiper.isBeginning,
      end: swiper.isEnd,
      index: swiper.activeIndex,
    });
  return (
    <section id="projects" className="viewport-section selected-work">
      <div className="work-heading">
        <div>
          <h2>
            Built with purpose<span>.</span>
          </h2>
        </div>
      <div className="project-header-controls">
        <span>
          <b>{String(position.index + 1).padStart(2, "0")}</b> /{" "}
          {String(projects.length).padStart(2, "0")}{" "}
          <span className="swipe-hint">Drag to explore</span>
        </span>
        <div className="slider-arrows">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={position.start}
            aria-label="Previous projects"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={position.end}
            aria-label="Next projects"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      </div>
      <Swiper
        modules={[A11y, Keyboard]}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updatePosition(swiper);
        }}
        onSlideChange={updatePosition}
        onBreakpoint={updatePosition}
        onResize={updatePosition}
        className="projects-swiper"
        aria-label="Selected projects"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.title}>
            <article className="project-card">
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-frame"
                  aria-label={`Visit ${project.title} website`}
                >
                  <ProjectCover project={project} index={index} />
                  <span className="project-hover">
                    <span className="project-open-circle">
                      <ArrowUpRight size={28} />
                    </span>
                    <span>Visit website</span>
                  </span>
                </a>
              ) : (
                <div className="project-frame">
                  <ProjectCover project={project} index={index} />
                </div>
              )}
              <div className="project-stack">
                <div
                  className="stack-icons"
                  aria-label={`Built with ${project.tags.join(", ")}`}
                >
                  {project.tags
                    .filter((tag) => tagIcons[tag])
                    .map((tag) => (
                      <span className="stack-icon" key={tag} title={tag}>
                        {tagIcons[tag] ? (
                          <Image
                            src={`https://skillicons.dev/icons?i=${tagIcons[tag]}&theme=light`}
                            width={27}
                            height={27}
                            unoptimized
                            alt={tag}
                          />
                        ) : null}
                      </span>
                    ))}
                </div>
                {project.github && (
                  <a
                    className="github-link"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    title="View source on GitHub"
                  >
                    <Github size={20} />
                  </a>
                )}
              </div>
              <div className="project-title">
                <h3>{project.title}</h3>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}



