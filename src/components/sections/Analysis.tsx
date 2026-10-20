import { content } from "@/config/content";
import { AnalysisStage } from "@/components/motion/AnalysisStage";
import { Container } from "@/components/ui/Container";
import { FrameMarks } from "@/components/ui/Reel";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { analysis } = content;
const { product, ad, signal } = analysis;

// TOMA 06. El dato de la tienda (ficha) y el anuncio que lo resuelve.
// Muestra el dato, no un resultado. AnalysisStage anima el conteo y la transformación.
export function Analysis() {
  return (
    <section id="analisis" className="py-section">
      <Container>
        <Toma {...analysis.toma} />
        <Title lines={analysis.title} className="mt-12 text-[clamp(2.5rem,6vw,4.5rem)] md:mt-16" />

        <AnalysisStage>
          <div className="flex flex-col justify-center py-10 lg:min-h-[calc(100svh-64px)] lg:py-12">
            {/* El dato: 80 en stock · 47 días sin venderse (el 47 cuenta hacia arriba). */}
            <p className="text-center font-mono text-[clamp(1.5rem,4.2vw,3rem)] tabular-nums leading-tight tracking-[-0.02em]">
              <span className="whitespace-nowrap">
                <span>{signal.stock}</span>{" "}
                <span className="text-[max(12px,0.45em)] uppercase tracking-[0.14em] text-muted">{signal.stockLabel}</span>
              </span>
              <span className="mx-3 text-muted md:mx-5">·</span>
              <span className="whitespace-nowrap">
                <span className="text-rec" data-count-days>
                  {signal.days}
                </span>{" "}
                <span className="text-[max(12px,0.45em)] uppercase tracking-[0.14em] text-muted">{signal.daysLabel}</span>
              </span>
            </p>

            <div className="mt-10 grid items-center gap-6 md:mt-14 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-10">
              {/* Ficha de producto: el dato */}
              <article data-ficha className="mx-auto w-full max-w-[560px] rounded-[6px] border border-line bg-surface p-4 md:p-6">
                <div className="flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt="" className="aspect-[4/5] w-20 shrink-0 rounded-[3px] object-cover sm:w-28 xl:w-44" />
                  <div className="flex min-w-0 flex-col">
                    <span className="w-fit border border-rec px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-rec">
                      <span data-split>{product.status}</span>
                    </span>
                    <h3 data-split className="mt-3 text-[20px] font-semibold leading-tight md:text-[26px]">
                      {product.name}
                    </h3>
                    <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-4">
                      {product.data.map((d) => {
                        // El valor de días cuenta junto con el dato grande; el resto se desarma.
                        const isDays = d.value === String(signal.days);
                        return (
                          <div key={d.label}>
                            <dt data-split className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                              {d.label}
                            </dt>
                            <dd className="mt-1 whitespace-nowrap font-mono text-[15px] tabular-nums md:text-[18px]">
                              {isDays ? (
                                <span className="text-rec" data-count-days>
                                  {d.value}
                                </span>
                              ) : (
                                <span data-split>{d.value}</span>
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                </div>
              </article>

              {/* El corte */}
              <div
                data-cut
                className="flex items-center justify-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted lg:flex-col"
              >
                <span className="h-px w-10 bg-line lg:h-10 lg:w-px" />
                Corte
                <span className="h-px w-10 bg-line lg:h-10 lg:w-px" />
              </div>

              {/* Anuncio 9:16: lo que resuelve el dato */}
              <article
                data-ad
                className="relative mx-auto aspect-[9/16] h-[min(60svh,520px)] max-w-full overflow-hidden rounded-[6px] bg-surface"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-ad-img src={product.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/90" />
                <FrameMarks />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <div>
                    <p data-ad-piece className="font-mono text-[11px] uppercase tracking-[0.16em] text-rec">
                      {ad.kicker}
                    </p>
                    <p data-ad-piece className="mt-2 font-serif text-[40px] italic leading-none">
                      {ad.headline}
                    </p>
                  </div>
                  <div>
                    <p data-ad-piece className="font-mono text-[64px] leading-none tracking-[-0.04em] text-rec">
                      {ad.offer}
                    </p>
                    <p data-ad-piece className="mt-2 text-[15px] font-semibold">
                      {product.name}
                    </p>
                    <span
                      data-ad-piece
                      className="mt-4 inline-block rounded-[4px] bg-foreground px-4 py-2 text-[13px] font-semibold text-background"
                    >
                      {ad.cta}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </AnalysisStage>

        {/* Qué sale del análisis → qué anuncio le corresponde */}
        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {analysis.map.map((row) => (
            // Con 2 columnas, la quinta fila ocupa las dos (sin celda vacía).
            <li key={row.data} className="flex flex-col gap-3 bg-background p-5 sm:last:odd:col-span-2 lg:last:odd:col-span-1">
              <span className="text-[15px] text-muted">{row.data}</span>
              <span className="mt-auto font-serif text-[22px] leading-[1.15]">{row.ad}</span>
            </li>
          ))}
        </ul>

        <WhatsAppButton message={analysis.message} variant="ghost" className="mt-12">
          {analysis.cta}
        </WhatsAppButton>
      </Container>
    </section>
  );
}
