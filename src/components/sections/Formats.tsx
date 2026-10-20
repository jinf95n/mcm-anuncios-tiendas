import { content } from "@/config/content";
import { AutoVideo } from "@/components/motion/AutoVideo";
import { FormatsStage } from "@/components/motion/FormatsStage";
import { Container } from "@/components/ui/Container";
import { FrameMarks } from "@/components/ui/Reel";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { formats } = content;

// TOMA 03. Los "ejemplos grandes": cada formato ocupa la pantalla con su nombre y un dato.
// Con movimiento, FormatsStage los convierte en la inmersión con scroll (tarjeta al 40% → pantalla completa).
export function Formats() {
  return (
    <section id="formatos" className="py-24 md:py-36">
      <Container>
        <Toma {...formats.toma} />
        {/* Título a escala de portada, cruzando la grilla; la intro queda chica, a un costado. */}
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
          <Title lines={formats.title} className="text-[clamp(3rem,9vw,7.5rem)] md:col-span-12" />
          <p className="max-w-[40ch] text-[18px] leading-[1.5] text-muted md:col-span-4 md:col-start-9">
            {formats.intro}
          </p>
        </div>
      </Container>

      <FormatsStage>
        {formats.items.map((item, i) => {
          // Vertical en pantalla horizontal: entero y centrado, sin recortar, con la franja de abajo libre
          // para el texto (que no tape la pieza).
          const fit = item.vertical
            ? "object-cover landscape:object-contain landscape:pt-20 landscape:pb-[26svh]"
            : "object-cover";
          const still = item.media.type === "video" ? item.media.poster : item.media.src;
          return (
            <article key={item.name} data-format className="relative h-[86svh] min-h-[520px] overflow-hidden bg-surface">
              <div data-format-media className="absolute inset-0">
                {item.vertical && (
                  // Fondo: el mismo medio desenfocado (en video, su poster, para no decodificar dos videos).
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="absolute inset-0 hidden h-full w-full scale-110 object-cover opacity-50 blur-2xl landscape:block" src={still} alt="" loading="lazy" />
                )}
                {item.media.type === "video" ? (
                  <AutoVideo className={`relative h-full w-full ${fit}`} src={item.media.src} poster={item.media.poster} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={`relative h-full w-full ${fit}`} src={item.media.src} alt="" loading="lazy" />
                )}
              </div>
              {/* En los verticales, más oscuro abajo: que el botón propio de la pieza no compita con el texto. */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background to-transparent ${item.vertical ? "via-background/70 via-30% to-60%" : "via-background/20"}`}
              />
              <FrameMarks inset="inset-5 md:inset-8" />

              <Container className="relative flex h-full flex-col justify-end pb-12 md:pb-16">
                <div data-format-text>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  Formato {String(i + 1).padStart(2, "0")} / {String(formats.items.length).padStart(2, "0")}
                </p>
                <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
                  <div>
                    <h3 className="font-serif text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">{item.name}</h3>
                    <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.5] md:text-[19px]">{item.detail}</p>
                  </div>
                  <p className="font-mono text-[clamp(1.25rem,2.4vw,1.75rem)] uppercase tracking-[0.04em] text-rec">
                    {item.stat}
                  </p>
                </div>
                </div>
              </Container>
            </article>
          );
        })}
      </FormatsStage>

      <Container className="mt-12">
        <WhatsAppButton message={formats.message} variant="ghost">
          {formats.cta}
        </WhatsAppButton>
      </Container>
    </section>
  );
}
