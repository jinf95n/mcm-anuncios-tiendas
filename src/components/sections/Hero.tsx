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
// Los reels son los protagonistas: desde 1024 px el muro va a sangre hasta el borde derecho
// y ocupa todo el alto de la pantalla; en celular y tablet, a sangre entre el titular y el texto.
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 md:pt-16 lg:min-h-[100svh]">
      <Container>
        <HeroIntro className="flex flex-col pb-16 pt-6 md:pb-24 md:pt-10">
          {/* La claqueta termina donde empieza el muro, para no cruzar el video. */}
          <div className="relative z-10 lg:mr-[57%] xl:mr-[62%]">
            <Toma {...hero.toma} />
          </div>

          <div className="flex flex-col pt-6 md:pt-10 lg:max-w-[400px] lg:pt-20 xl:max-w-[440px]">
            <Title
              lines={hero.title}
              as="h1"
              className="relative z-10 whitespace-nowrap text-[clamp(3.75rem,17vw,5rem)] md:text-[clamp(4rem,11vw,7.5rem)] lg:text-[clamp(4rem,9vw,7.5rem)]"
            />

            {/* Muro de reels: columnas desfasadas, como una hoja de contactos de video que sigue. */}
            <div
              className="relative -mx-5 mt-8 md:-mx-10 md:mt-10 lg:absolute lg:bottom-0 lg:left-[44%] lg:right-0 lg:top-16 lg:mx-0 lg:mt-0 xl:left-[40%]"
            >
              <div className="grid h-[260px] grid-cols-3 gap-1.5 overflow-hidden md:h-[520px] md:gap-3 lg:h-full">
                {[0, 1, 2].map((col) => (
                  <div
                    key={col}
                    data-hero-col
                    className={`flex flex-col gap-1.5 md:gap-3 ${col === 0 ? "-translate-y-16 lg:translate-y-10" : col === 1 ? "lg:-translate-y-28" : "-translate-y-8 lg:-translate-y-4"}`}
                  >
                    {hero.reels.slice(col * 2, col * 2 + 2).map((reel) => (
                      <Reel key={reel.src} {...reel} />
                    ))}
                  </div>
                ))}
              </div>
              {/* Fundido al negro: abajo hacia la toma siguiente y, en desktop, hacia el titular. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent lg:h-32" />
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-background to-transparent lg:block" />
            </div>

            <div className="relative z-10">
              <p data-hero-fade className="mt-8 max-w-[34ch] text-[18px] leading-[1.5] text-muted lg:mt-7">
                {hero.subtitle}
              </p>

              <div data-hero-fade className="mt-8 flex flex-col items-start gap-3">
                <WhatsAppButton message={hero.message} size="lg" className="w-full sm:w-auto">
                  {hero.cta}
                </WhatsAppButton>
                <p className="text-[13px] text-muted">{hero.note}</p>
              </div>

              <StoreLinkForm {...hero.storeInput} />
            </div>
          </div>
        </HeroIntro>
      </Container>
    </section>
  );
}
