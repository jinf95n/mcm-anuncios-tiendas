"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  value: number;
  prefix?: string;
  className?: string;
};

const fmt = (n: number) => Math.round(n).toLocaleString("es-AR");

// Número que cuenta desde 0 al entrar en pantalla (una vez). Renderiza el valor final
// por defecto: sin JS o con reduced-motion, se ve el número directo.
export function CountUp({ value, prefix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { n: 0 };
        el.textContent = prefix + fmt(0);
        gsap.to(counter, {
          n: value,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = prefix + fmt(counter.n);
          },
        });
        return () => {
          el.textContent = prefix + fmt(value);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt(value)}
    </span>
  );
}
