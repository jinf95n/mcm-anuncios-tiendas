import type { CSSProperties } from "react";
import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";

const { beforeAfter: ba } = content;

// TOMA 07. Slider antes/después. Por ahora fijo al 50%; arrastrarlo va en el paso 9.
export function BeforeAfter() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <Toma {...ba.toma} />
        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Title lines={ba.title} className="text-[clamp(2.5rem,6vw,4.5rem)]" />
            <dl className="mt-10 space-y-5">
              {[ba.before, ba.after].map((side) => (
                <div key={side.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{side.label}</dt>
                  <dd className="mt-1 text-[18px]">{side.caption}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="md:col-span-7 md:col-start-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-surface select-none" style={{ "--split": "50%" } as CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ba.after.src} alt={ba.after.caption} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ba.before.src}
                alt={ba.before.caption}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: "inset(0 calc(100% - var(--split)) 0 0)" }}
                loading="lazy"
              />
              <span className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.14em]">{ba.before.label}</span>
              <span className="absolute right-4 top-4 font-mono text-[11px] uppercase tracking-[0.14em] text-rec">{ba.after.label}</span>

              {/* Manija del slider */}
              <div className="absolute inset-y-0 left-[var(--split)] w-px -translate-x-1/2 bg-foreground">
                <button
                  type="button"
                  role="slider"
                  aria-label={ba.hint}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={50}
                  className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-foreground bg-background"
                >
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden>
                    <path d="M6 1 1 6l5 5M14 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
            </div>
            <figcaption className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{ba.hint}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
