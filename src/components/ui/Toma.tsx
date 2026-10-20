"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";

// Claqueta de cada sección: "TOMA 0X", nombre de la escena y producción.
// Entra con un corte cuadro a cuadro (steps), sin deslizamientos ni rebotes.
export function Toma({ n, label }: { n: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.5,
            ease: "steps(6)",
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      data-toma={`toma-${n}`}
      className="flex items-stretch border-y border-line font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:text-[12px]"
    >
      <span className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-line py-2 pr-4 text-foreground">
        <span className="h-1.5 w-1.5 bg-rec" aria-hidden />
        Toma {n}
      </span>
      <span className="flex min-w-0 items-center truncate border-r border-line px-4 py-2">Esc. {label}</span>
      <span className="ml-auto hidden items-center py-2 pl-4 sm:flex">{site.name}</span>
    </div>
  );
}
