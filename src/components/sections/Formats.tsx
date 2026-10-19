import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { FrameMarks } from "@/components/ui/Reel";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { formats } = content;

// TOMA 03. Los "ejemplos grandes": cada formato ocupa la pantalla con su nombre y un dato.
// Estructura estática; la inmersión con scroll (tarjeta al 40% → pantalla completa) va en el paso 8.
export function Formats() {
  return (
    <section id="formatos" className="py-24 md:py-36">
      <Container>
        <Toma {...formats.toma} />
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
          <Title lines={formats.title} className="text-[clamp(2.5rem,6vw,4.5rem)] md:col-span-7" />
          <p className="max-w-[44ch] self-end text-[18px] leading-[1.5] text-muted md:col-span-4 md:col-start-9">
            {formats.intro}
          </p>
        </div>
      </Container>

      <div className="mt-14 flex flex-col gap-2 md:mt-20">
        {formats.items.map((item, i) => (
          <article key={item.name} className="relative h-[86svh] min-h-[520px] overflow-hidden bg-surface">
            {item.media.type === "video" ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={item.media.src}
                poster={item.media.poster}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="absolute inset-0 h-full w-full object-cover" src={item.media.src} alt="" loading="lazy" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <FrameMarks inset="inset-5 md:inset-8" />

            <Container className="relative flex h-full flex-col justify-end pb-12 md:pb-16">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                Formato {String(i + 1).padStart(2, "0")} / {String(formats.items.length).padStart(2, "0")}
              </p>
              <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
                <div>
                  <h3 className="font-serif text-[clamp(3rem,9vw,6rem)] leading-[0.95] tracking-[-0.02em]">{item.name}</h3>
                  <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.5] md:text-[19px]">{item.detail}</p>
                </div>
                <p className="font-mono text-[clamp(1.25rem,2.4vw,1.75rem)] uppercase tracking-[0.04em] text-rec">
                  {item.stat}
                </p>
              </div>
            </Container>
          </article>
        ))}
      </div>

      <Container className="mt-12">
        <WhatsAppButton message={formats.message} variant="ghost">
          {formats.cta}
        </WhatsAppButton>
      </Container>
    </section>
  );
}
