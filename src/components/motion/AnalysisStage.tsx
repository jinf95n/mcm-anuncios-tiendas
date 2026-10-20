"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// "Del análisis a los anuncios" (ref. junkbranding): primero cuenta el dato de la tienda
// (47 días sin venderse); después la ficha se desarma letra por letra y viaja hasta el
// anuncio, que se abre desde el centro y se arma con cortes secos.
// Desktop: sección fija de 1,4 pantallas. Celular: misma secuencia atada al scroll, sin fijar.
// Sin animación queda la ficha y el anuncio lado a lado, con los valores finales.
export function AnalysisStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px)",
        },
        (ctx) => {
          const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
          if (!motion) return;

          const stage = ref.current!;
          const ficha = stage.querySelector<HTMLElement>("[data-ficha]")!;
          const ad = stage.querySelector<HTMLElement>("[data-ad]")!;
          const split = SplitText.create(stage.querySelectorAll("[data-split]"), { type: "words,chars" });

          // Distancia del centro de la ficha al centro del anuncio (sin contar el x/y ya aplicado).
          const delta = (axis: "x" | "y") => () => {
            const a = ad.getBoundingClientRect();
            const f = ficha.getBoundingClientRect();
            const current = Number(gsap.getProperty(ficha, axis)) || 0;
            return axis === "x"
              ? a.left + a.width / 2 - (f.left + f.width / 2 - current)
              : a.top + a.height / 2 - (f.top + f.height / 2 - current);
          };

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: mobile
              ? { trigger: stage, start: "top 70%", end: "bottom 35%", scrub: 0.6, invalidateOnRefresh: true }
              : { trigger: stage, start: "top top+=64", end: "+=140%", pin: true, scrub: 0.6, invalidateOnRefresh: true },
          });

          tl.set(ad, { clipPath: "inset(50% 50% round 6px)" })
            .set("[data-ad-piece]", { autoAlpha: 0 })
            // 1. El dato cuenta: 0 → 47 días sin venderse.
            .fromTo("[data-count-days]", { textContent: 0 }, { textContent: 47, snap: { textContent: 1 }, duration: 1.2 })
            // 2. La ficha se desarma y viaja hacia el anuncio.
            .to("[data-cut]", { autoAlpha: 0, duration: 0.3 }, ">+0.2")
            .to(
              split.chars,
              {
                x: () => gsap.utils.random(-90, 90),
                y: () => gsap.utils.random(-70, 70),
                rotation: () => gsap.utils.random(-35, 35),
                autoAlpha: 0,
                duration: 0.6,
                stagger: { each: 0.008, from: "random" },
              },
              "<",
            )
            .to(ficha, { x: delta("x"), y: delta("y"), scale: 0.45, duration: 1, ease: "power2.inOut" }, "<")
            .to(ficha, { autoAlpha: 0, duration: 0.3 }, "-=0.35")
            // 3. El anuncio se abre desde el centro y se arma con cortes.
            .to(ad, { clipPath: "inset(0% 0% round 6px)", duration: 0.9, ease: "power2.out" }, "-=0.3")
            .fromTo("[data-ad-img]", { scale: 1.3 }, { scale: 1, duration: 0.9, ease: "power2.out" }, "<")
            .to("[data-ad-piece]", { autoAlpha: 1, duration: 0.01, stagger: 0.18 }, "-=0.2")
            .to({}, { duration: 0.15 });
        },
      );
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
