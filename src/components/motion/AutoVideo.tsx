"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

// Video en loop que solo se reproduce mientras está a la vista (y nunca con reduced-motion).
// Fuera de pantalla se pausa, para no gastar batería ni datos en celular.
export function AutoVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Dentro del pasillo 3D, la reproducción la maneja GalleryCorridor.
        if (video.closest('[data-corridor="on"]')) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      data-reel-video
    />
  );
}
