import { content } from "@/config/content";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { Container } from "@/components/ui/Container";
import { Reel } from "@/components/ui/Reel";
import { StoreLinkForm } from "@/components/ui/StoreLinkForm";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { hero } = content;

// TOMA 01. Muro de reels en loop + promesa + CTA + input "Pegá el link de tu tienda".
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 md:pt-16">
      <Container>
        <HeroIntro className="grid gap-10 pb-16 pt-6 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-10">
        <div className="md:col-span-12">
          <Toma {...hero.toma} />
        </div>

        <div className="relative z-10 flex flex-col md:col-span-6 md:pt-10 lg:col-span-6">
          <Title lines={hero.title} as="h1" className="text-[clamp(3.75rem,14vw,6rem)]" />
          <p data-hero-fade className="mt-6 max-w-[34ch] text-[18px] leading-[1.5] text-muted md:text-[20px]">{hero.subtitle}</p>

          <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton message={hero.message} size="lg">
              {hero.cta}
            </WhatsAppButton>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{hero.note}</p>
          </div>

          <StoreLinkForm {...hero.storeInput} />
        </div>

        {/* Muro de reels: columnas desfasadas, como una hoja de contactos de video. */}
        <div className="relative -mx-5 md:col-span-6 md:mx-0 lg:col-span-6" aria-hidden>
          <div className="grid h-[520px] grid-cols-3 gap-2 overflow-hidden px-5 md:h-[640px] md:gap-3 md:px-0">
            {[0, 1, 2].map((col) => (
              <div
                key={col}
                data-hero-col
                className={`flex flex-col gap-2 md:gap-3 ${col === 1 ? "-translate-y-24" : col === 2 ? "-translate-y-10" : ""}`}
              >
                {hero.reels.slice(col * 2, col * 2 + 2).map((reel) => (
                  <Reel key={reel.src} {...reel} />
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
        </HeroIntro>
      </Container>
    </section>
  );
}
