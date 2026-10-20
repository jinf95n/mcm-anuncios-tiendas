"use client";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// Entradas de las secciones, en el lenguaje de edición de DESIGN.md. Se marcan en el HTML con
// data-reveal y se animan una sola vez al entrar en pantalla:
// - title:   el título sube por líneas desde una máscara (SplitText).
// - fade:    fundido con subida corta.
// - stagger: los hijos entran escalonados (listas, tarjetas, filas).
// - cut:     los hijos aparecen con cortes secos, uno por uno (clips, tiras de reels).
// Sin animación con prefers-reduced-motion: el contenido queda visible tal cual.
// Va al final de la página, así mide después de que las secciones fijas armaron sus pin-spacers.
export function Reveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const when = (trigger: Element, start = "top 85%") => ({ trigger, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="title"]').forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          // Devuelve la animación para que SplitText la rehaga si cambia el corte de líneas.
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: when(el),
            }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.from(el, { autoAlpha: 0, y: 16, duration: 0.6, ease: "power2.out", scrollTrigger: when(el, "top 88%") });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
        gsap.from(el.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: when(el),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="cut"]').forEach((el) => {
        gsap.from(el.children, { autoAlpha: 0, duration: 0.01, stagger: 0.14, scrollTrigger: when(el) });
      });
    });
  });

  return null;
}
