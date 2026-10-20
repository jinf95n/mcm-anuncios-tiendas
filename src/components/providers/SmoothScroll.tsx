"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

// Scroll suave con Lenis, sincronizado con el ticker de GSAP para que
// ScrollTrigger y Lenis usen el mismo frame. Se desactiva con prefers-reduced-motion.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  // ReactLenis crea la instancia en un setState, así que no existe todavía en el primer
  // efecto: se lee en cada frame y se engancha a ScrollTrigger cuando aparece.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let attached: NonNullable<LenisRef["lenis"]> | undefined;
    const update = (time: number) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;
      if (lenis !== attached) {
        attached = lenis;
        if (reduced) return lenis.destroy();
        lenis.on("scroll", ScrollTrigger.update);
      }
      if (!reduced) lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      attached?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
