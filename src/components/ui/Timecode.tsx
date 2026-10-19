"use client";

import { useEffect, useRef } from "react";

// Duración "de la película": recorrer toda la página equivale a un minuto a 25 cuadros.
const TOTAL_FRAMES = 60 * 25;
const pad = (n: number) => String(n).padStart(2, "0");

const format = (frame: number) => {
  const s = Math.floor(frame / 25);
  return `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(frame % 25)}`;
};

// Timecode (HH:MM:SS:FF) como indicador de progreso del scroll de toda la página.
// Es texto que cambia, no movimiento: se mantiene igual con reduced-motion.
export function Timecode({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.textContent = format(Math.round(progress * (TOTAL_FRAMES - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p
      className={`flex items-center gap-2 font-mono text-[12px] tabular-nums tracking-[0.08em] text-muted md:text-[13px] ${className}`}
      aria-hidden
    >
      <span className="rec-dot" />
      <span ref={ref} className="text-foreground">
        00:00:00:00
      </span>
    </p>
  );
}
