"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Entrada de la portada: las columnas de reels entran con cortes secos, de a una;
// el titular sube apenas por líneas y el resto aparece con un fundido corto.
export function HeroIntro({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-hero-col]", { autoAlpha: 0, duration: 0.01, stagger: 0.16 }, 0.1)
          .from("h1 > span", { autoAlpha: 0, yPercent: 30, duration: 0.9, stagger: 0.12 }, 0.15)
          .from("[data-hero-fade]", { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.08 }, 0.5);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
