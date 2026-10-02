"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SectionScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const panels = Array.from(
        document.querySelectorAll(
          "main > .hero-viewport, main > section, main > footer",
        ),
      );
      let bounds = [];
      let points = [];
      let activePointIndex = 0;
      const nearestPointIndex = (progress) =>
        points.reduce(
          (nearestIndex, point, index) =>
            Math.abs(point - progress) <
            Math.abs(points[nearestIndex] - progress)
              ? index
              : nearestIndex,
          0,
        );
      const measure = () => {
        const frame =
          parseFloat(getComputedStyle(document.body).paddingTop) || 0;
        const max = ScrollTrigger.maxScroll(window);
        bounds = panels.map((panel) => {
          const rect = panel.getBoundingClientRect();
          return {
            start: Math.max(0, rect.top + window.scrollY - frame),
            end: rect.bottom + window.scrollY - window.innerHeight + frame,
          };
        });
        points = [
          ...new Set(
            [
              0,
              ...bounds.flatMap(({ start, end }) => [
                start,
                Math.max(start, end),
              ]),
              max,
            ].map((y) => gsap.utils.clamp(0, 1, y / Math.max(1, max))),
          ),
        ].sort((a, b) => a - b);
        activePointIndex = nearestPointIndex(window.scrollY / Math.max(1, max));
      };
      document.documentElement.classList.add("section-scroll-enabled");
      measure();
      const trigger = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onRefresh: measure,
        snap: {
          snapTo: (value, self) => {
            const y = window.scrollY;
            // Allow reading tall sections and interacting with the contact form.
            if (document.activeElement?.matches("input, textarea, select"))
              return self.progress;
            if (
              bounds.some(
                ({ start, end }) =>
                  end > start + 4 && y > start + 2 && y < end - 2,
              )
            ) {
              activePointIndex = nearestPointIndex(self.progress);
              return self.progress;
            }
            const direction = Math.sign(self.direction);
            if (!direction) return self.progress;
            const targetIndex = Math.max(
              0,
              Math.min(points.length - 1, activePointIndex + direction),
            );
            return points[targetIndex] ?? value;
          },
          inertia: false,
          delay: 0.1,
          duration: { min: 0.55, max: 1.05 },
          ease: "power3.inOut",
        },
        onSnapComplete: (self) => {
          activePointIndex = nearestPointIndex(self.progress);
        },
        onSnapInterrupt: (self) => {
          activePointIndex = nearestPointIndex(self.progress);
        },
      });
      let frameId;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      panels.forEach((panel) => observer.observe(panel));
      return () => {
        observer.disconnect();
        cancelAnimationFrame(frameId);
        trigger.kill();
        document.documentElement.classList.remove("section-scroll-enabled");
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
