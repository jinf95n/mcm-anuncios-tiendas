import { content } from "@/config/content";
import { GalleryCorridor } from "@/components/motion/GalleryCorridor";
import { Container } from "@/components/ui/Container";
import { Reel } from "@/components/ui/Reel";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { gallery } = content;

// TOMA 09. Galería de reels: tira con swipe en celular y grilla en desktop.
// Con movimiento en desktop, GalleryCorridor la convierte en el pasillo en CSS 3D.
export function Gallery() {
  return (
    <section id="galeria" className="py-24 md:py-36">
      <Container>
        <Toma {...gallery.toma} />
        <div className="mt-12 flex flex-col gap-4 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Title lines={gallery.title} className="text-[clamp(2.5rem,6vw,4.5rem)]" />
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{gallery.note}</p>
        </div>
      </Container>

      <GalleryCorridor>
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {gallery.reels.map((reel, i) => (
            <li key={reel.src} className={`w-[68vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none ${i % 2 ? "md:translate-y-16" : ""}`}>
              <Reel {...reel} />
            </li>
          ))}
        </ul>
      </GalleryCorridor>

      <Container className="mt-14 md:mt-28">
        <WhatsAppButton message={gallery.message} variant="ghost">
          {gallery.cta}
        </WhatsAppButton>
      </Container>
    </section>
  );
}
