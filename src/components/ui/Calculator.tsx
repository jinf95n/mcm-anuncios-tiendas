"use client";

import { useState } from "react";
import { content } from "@/config/content";
import { trackContact } from "@/lib/pixel";
import { WhatsAppButton } from "./WhatsAppButton";

const { versus } = content;
const calc = versus.calculator;

const usd = (n: number) => `USD ${n.toLocaleString("es-AR", { maximumFractionDigits: 1 })}`;
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

// Calculadora de piezas (fórmula de relleno de content.ts, solo piezas, sin setup de Meta).
// Recalcula en vivo; mínimo 20 piezas en total (Pack anuncios). No guarda nada.
export function Calculator() {
  const [photos, setPhotos] = useState<number>(calc.photos.initial);
  const [videos, setVideos] = useState<number>(calc.videos.initial);
  const total = photos + videos;

  const agency = photos * calc.photos.agencyUnit + videos * calc.videos.agencyUnit;
  const us = Math.max(calc.usMin, total * calc.usUnit);

  const message = versus.message
    .replace("{piezas}", plural(total, "pieza", "piezas"))
    .replace("{fotos}", plural(photos, "foto", "fotos"))
    .replace("{videos}", plural(videos, "video", "videos"));

  const fields = [
    { ...calc.photos, value: photos, set: setPhotos },
    { ...calc.videos, value: videos, set: setVideos },
  ];

  return (
    <div className="rounded-[6px] border border-line bg-surface p-6">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{calc.title}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {fields.map((f) => {
          const name = f.label.toLowerCase();
          // El "−" se desactiva en 0 y cuando bajaría el total por debajo del mínimo.
          const canDec = f.value > 0 && total > calc.min;
          const canInc = f.value < calc.max;
          return (
            <div key={f.label} className="border border-line p-3">
              <p className="text-[13px] text-muted" id={`calc-${name}`}>
                {f.label}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => f.set(f.value - 1)}
                  disabled={!canDec}
                  className="h-9 w-9 border border-line text-[18px] leading-none transition-colors duration-150 hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line"
                  aria-label={`Menos ${name}`}
                >
                  −
                </button>
                <output aria-labelledby={`calc-${name}`} className="font-mono text-[22px] tabular-nums">
                  {f.value}
                </output>
                <button
                  type="button"
                  onClick={() => f.set(f.value + 1)}
                  disabled={!canInc}
                  className="h-9 w-9 border border-line text-[18px] leading-none transition-colors duration-150 hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line"
                  aria-label={`Más ${name}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[13px] text-muted">{calc.minNote}</p>
      <dl className="mt-6 space-y-3 border-t border-line pt-5" aria-live="polite">
        <div className="flex items-baseline justify-between">
          <dt className="text-muted">{calc.agencyLabel}</dt>
          <dd className="font-mono text-[20px] tabular-nums text-muted line-through decoration-1">{usd(agency)}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt>{calc.usLabel}</dt>
          <dd className="font-mono text-[28px] tabular-nums text-rec">{usd(us)}</dd>
        </div>
      </dl>
      <WhatsAppButton message={message} onClick={trackContact} className="mt-6 w-full">
        {versus.cta}
      </WhatsAppButton>
    </div>
  );
}
