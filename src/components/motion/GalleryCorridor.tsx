"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SPACING = 650; // distancia en profundidad entre reels (px)
const SIDE = 300; // separación de cada pared respecto del centro (px)

// Galería como pasillo en CSS 3D (ref. virtuallyeverafter): los reels cuelgan alternados
// en las paredes y el scroll mueve la cámara hacia adelante. Solo se reproduce el reel
// más cercano. Solo en desktop con movimiento; en celular queda la tira con swipe y con
// reduced-motion, la grilla estática.
export function GalleryCorridor({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const stage = ref.current!;
        const list = stage.querySelector<HTMLElement>("ul")!;
        const items = gsap.utils.toArray<HTMLElement>("li", stage);
        const videos = items.map((li) => li.querySelector("video"));
        // La cámara frena con el último reel todavía de frente (sin pasarlo ni dejar el pasillo vacío).
        const depth = (items.length - 1) * SPACING - 200;

        // AutoVideo deja de autocontrolarse dentro del pasillo.
        stage.dataset.corridor = "on";
        gsap.set(stage, { height: "calc(100svh - 64px)", perspective: 1100, overflow: "hidden", position: "relative" });
        gsap.set(list, { display: "block", position: "absolute", inset: 0, transformStyle: "preserve-3d", padding: 0 });
        gsap.set(items, {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 240,
          maxWidth: "none",
          translate: "none",
          xPercent: -50,
          yPercent: -50,
          x: (i: number) => (i % 2 ? SIDE : -SIDE),
          z: (i: number) => -i * SPACING,
          rotationY: (i: number) => (i % 2 ? -30 : 30),
        });

        let playing = -1;
        const pauseAll = () => {
          videos.forEach((v) => v?.pause());
          playing = -1;
        };
        // active: solo se reproduce mientras el pasillo está fijo en pantalla.
        const update = (camZ: number, active: boolean) => {
          let nearest = -1;
          let best = Infinity;
          items.forEach((li, i) => {
            const z = -i * SPACING + camZ; // profundidad del reel respecto de la cámara
            // Se desvanece al pasar al lado de la cámara y a lo lejos.
            const near = z > 200 ? 1 - (z - 200) / 350 : 1;
            const far = z < -2600 ? 1 - (-2600 - z) / 900 : 1;
            li.style.opacity = String(gsap.utils.clamp(0, 1, Math.min(near, far)));
            const d = Math.abs(z + 350);
            if (d < best) {
              best = d;
              nearest = i;
            }
          });
          if (!active) return pauseAll();
          if (nearest !== playing) {
            videos.forEach((v, i) => {
              if (!v) return;
              if (i === nearest) v.play().catch(() => {});
              else v.pause();
            });
            playing = nearest;
          }
        };

        const camera = { z: 0 };
        // Se lleva aparte (no con tween.scrollTrigger): si la página carga con el scroll avanzado,
        // ScrollTrigger llama a onUpdate antes de que exista el tween.
        let active = false;
        gsap.to(camera, {
          z: depth,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top+=64",
            end: "+=180%",
            pin: true,
            scrub: 0.6,
            onToggle: (self) => {
              active = self.isActive;
              if (!active) pauseAll();
            },
          },
          onUpdate: () => {
            gsap.set(list, { z: camera.z });
            update(camera.z, active);
          },
        });
        update(0, false);

        return () => {
          delete stage.dataset.corridor;
          items.forEach((li) => (li.style.opacity = ""));
          pauseAll();
        };
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mx-auto mt-14 max-w-[1280px] md:mt-20 md:px-10">
      {children}
    </div>
  );
}
