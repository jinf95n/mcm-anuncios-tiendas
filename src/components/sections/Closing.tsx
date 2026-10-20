import { content } from "@/config/content";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reel } from "@/components/ui/Reel";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Wordmark } from "@/components/ui/Wordmark";

const { closing, footer } = content;

// TOMA 13. Cierre: el CTA final grande, y el pie.
export function Closing() {
  return (
    <section className="pt-section pb-28 md:pb-12">
      <Container>
        <Toma {...closing.toma} />
        <div className="mt-16 md:mt-24">
          <Title lines={closing.title} className="text-[clamp(3rem,10vw,7.5rem)]" />
          <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[40ch] text-[18px] leading-[1.5] text-muted">{closing.text}</p>
            <WhatsAppButton message={closing.message} size="lg" className="w-full shrink-0 sm:w-auto">
              {closing.cta}
            </WhatsAppButton>
          </div>
        </div>
      </Container>

      {/* Tira de reels a sangre, cortada en seco contra el pie: eco del muro de la portada. */}
      <div className="relative mt-16 md:mt-24" aria-hidden>
        <div className="grid h-[220px] grid-cols-3 gap-1.5 overflow-hidden md:h-[360px] md:grid-cols-6 md:gap-3">
          {closing.reels.map((reel, i) => (
            <Reel key={reel.src} {...reel} className={`${i % 2 ? "translate-y-8" : ""} ${i > 2 ? "hidden md:block" : ""}`} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container>
        <footer className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-[14px] text-muted md:mt-16 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-3">
            <Wordmark className="text-[24px] text-foreground" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{footer.by}</span>
          </div>
          <p className="font-mono text-[12px] tabular-nums">{site.contact.phone}</p>
          <p>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
        </footer>
      </Container>
    </section>
  );
}
