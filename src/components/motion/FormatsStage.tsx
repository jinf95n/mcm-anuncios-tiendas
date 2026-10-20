"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Inmersión de Formatos (ref. studiomirage): la sección queda fija y cada formato se abre
// como una ventana chica (40% en desktop, 80% en celular) hasta ocupar la pantalla; al llegar,
// entran su nombre y su dato. Recorrido total: 2 pantallas (regla de secciones fijas).
// Sin animación (reduced-motion o sin JS) queda la lista de paneles apilados.
export function FormatsStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          // Celular y tablet vertical: tarjeta al 80% y menos recorrido.
          mobile: "(max-width: 1023px)",
        },
        (ctx) => {
          const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
          if (!motion) return;

          const stage = ref.current!;
          const panels = gsap.utils.toArray<HTMLElement>("[data-format]", stage);
          const small = mobile ? "inset(10% 10% round 12px)" : "inset(30% 30% round 14px)";
          const closed = "inset(50% 50% round 14px)";
          const full = "inset(0% 0% round 0px)";

          // Los paneles se apilan en una pantalla fija.
          gsap.set(stage, { height: "100svh", position: "relative", overflow: "hidden", gap: 0 });
          gsap.set(panels, { position: "absolute", inset: 0, height: "100%", minHeight: 0 });
          gsap.set(panels, { clipPath: (i: number) => (i === 0 ? small : closed) });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: mobile ? "+=160%" : "+=200%",
              pin: true,
              scrub: 0.6,
            },
          });

          panels.forEach((panel, i) => {
            const media = panel.querySelector("[data-format-media]");
            const text = panel.querySelector("[data-format-text]");
            // immediateRender: false para que los paneles siguientes sigan cerrados hasta su turno.
            if (i > 0) tl.set(panel, { clipPath: small });
            tl.fromTo(panel, { clipPath: small }, { clipPath: full, duration: 1, ease: "power2.inOut", immediateRender: false })
              .fromTo(media, { scale: 1.25 }, { scale: 1, duration: 1, ease: "power2.out" }, "<")
              .fromTo(text, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "expo.out" })
              .to({}, { duration: i === panels.length - 1 ? 0.2 : 0.35 });
          });
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mt-14 flex flex-col gap-2 md:mt-20">
      {children}
    </div>
  );
}
