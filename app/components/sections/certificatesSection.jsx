"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Network,
  Cpu,
  Code2,
  Router,
} from "lucide-react";

import { certificates } from "@/data";
import SectionHeader from "@/components/ui/sectionHeader";
import "swiper/css";

const technologyIcons = {
  JavaScript: "js",
  HTML: "html",
  CSS: "css",
  React: "react",
  "Next.js": "nextjs",
  Redux: "redux",
  Git: "git",
  GitHub: "github",
  "Tailwind CSS": "tailwind",
  Supabase: "supabase",
};

const subjectIcons = {
  Networking: Network,
  "Packet Tracer": Router,
  CCNA: Router,
  "Verilog HDL": Cpu,
  "Software Engineering": Code2,
};

export default function CertificatesSection() {
  const slider = useRef(null);
  const [position, setPosition] = useState({
    start: true,
    end: false,
    index: 0,
  });

  const sync = (swiper) =>
    setPosition({
      start: swiper.isBeginning,
      end: swiper.isEnd,
      index: swiper.activeIndex,
    });

  return (
    <section id="certificates" className="viewport-section section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="certificates-heading">
          <SectionHeader title="Certificates" />
          <div className="project-header-controls certificate-header-controls">
            <span className="project-counter">
              <b>{String(position.index + 1).padStart(2, "0")}</b> /{" "}
              {String(certificates.length).padStart(2, "0")}
              <span className="swipe-hint">Drag to explore</span>
            </span>
            <div className="slider-arrows">
              <button
                type="button"
                onClick={() => slider.current?.slidePrev()}
                disabled={position.start}
                aria-label="Previous certificates"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => slider.current?.slideNext()}
                disabled={position.end}
                aria-label="Next certificates"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <Swiper
          className="certificates-swiper"
          modules={[A11y, Keyboard]}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          onSwiper={(swiper) => {
            slider.current = swiper;
            sync(swiper);
          }}
          onSlideChange={sync}
          onResize={sync}
          onBreakpoint={sync}
          aria-label="Certificates"
        >
          {certificates.map((cert) => (
            <SwiperSlide key={cert.file}>
              <article className="certificate-card">
                <a
                  className="certificate-preview project-frame"
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${cert.title} certificate PDF`}
                >
                  <Image
                    src={cert.file
                      .replace("/certificates/", "/certificates/previews/")
                      .replace(/\.pdf$/i, ".png")}
                    alt={cert.title}
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
                    className="certificate-image"
                  />
                  <span className="project-hover" aria-hidden="true">
                    <span className="project-open-circle">
                      <ArrowUpRight size={28} />
                    </span>
                    <span>Open certificate</span>
                  </span>
                </a>
                <h3>
                  <a href={cert.file} target="_blank" rel="noopener noreferrer">
                    {cert.title}
                  </a>
                </h3>
                <div
                  className="certificate-stack"
                  aria-label="Course technologies and topics"
                >
                  {cert.tags?.map((tag) => {
                    const Icon = subjectIcons[tag] || Code2;
                    return (
                      <span
                        className="certificate-technology"
                        key={tag}
                        title={tag}
                      >
                        {technologyIcons[tag] ? (
                          <Image
                            src={`https://skillicons.dev/icons?i=${technologyIcons[tag]}&theme=light`}
                            alt=""
                            width={24}
                            height={24}
                            unoptimized
                          />
                        ) : (
                          <Icon size={21} aria-hidden="true" />
                        )}
                        <span>{tag}</span>
                      </span>
                    );
                  })}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
