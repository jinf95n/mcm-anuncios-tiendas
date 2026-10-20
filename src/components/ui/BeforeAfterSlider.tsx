"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

type Side = { label: string; caption: string; src: string };

type Props = {
  before: Side;
  after: Side;
  hint: string;
};

const STEP = 5;
const clamp = (n: number) => Math.min(100, Math.max(0, n));

// Slider antes/después: se arrastra con mouse o dedo sobre toda la imagen y con el teclado
// (flechas de a 5%, Home/End). Sin inercia ni animación. En celular, el gesto vertical
// sigue scrolleando la página (touch-action: pan-y); solo el horizontal mueve el corte.
export function BeforeAfterSlider({ before, after, hint }: Props) {
  const [split, setSplit] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setSplit(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(e.clientX);
  };

  const stop = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    // Se calcula sobre el valor más reciente, para que teclas seguidas no se pisen.
    const next: Record<string, (s: number) => number> = {
      ArrowLeft: (s) => s - STEP,
      ArrowDown: (s) => s - STEP,
      ArrowRight: (s) => s + STEP,
      ArrowUp: (s) => s + STEP,
      Home: () => 0,
      End: () => 100,
    };
    const step = next[e.key];
    if (!step) return;
    e.preventDefault();
    setSplit((s) => clamp(step(s)));
  };

  const value = Math.round(split);

  return (
    <figure>
      <div
        ref={box}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        className="relative aspect-[3/4] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[6px] bg-surface"
        style={{ "--split": `${split}%` } as CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.src} alt={after.caption} draggable={false} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before.src}
          alt={before.caption}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: "inset(0 calc(100% - var(--split)) 0 0)" }}
          loading="lazy"
        />
        <span className="pointer-events-none absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.14em]">{before.label}</span>
        <span className="pointer-events-none absolute right-4 top-4 font-mono text-[11px] uppercase tracking-[0.14em] text-rec">
          {after.label}
        </span>

        {/* Manija del slider */}
        <div className="absolute inset-y-0 left-[var(--split)] w-px -translate-x-1/2 bg-foreground">
          <button
            type="button"
            role="slider"
            aria-label={hint}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-valuetext={`${value}% ${before.label.toLowerCase()}`}
            onKeyDown={onKeyDown}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-foreground bg-background"
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden>
              <path d="M6 1 1 6l5 5M14 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{hint}</figcaption>
    </figure>
  );
}
