import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { FrameMarks } from "@/components/ui/Reel";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { analysis } = content;
const { product, ad, stock } = analysis;

// TOMA 06. El dato de la tienda (ficha) y el anuncio que lo resuelve, lado a lado.
// Estructura estática: desarmar la ficha y rearmarla como anuncio + conteo 80 → 12 va en el paso 8.
export function Analysis() {
  return (
    <section id="analisis" className="py-24 md:py-36">
      <Container>
        <Toma {...analysis.toma} />
        <div className="mt-12 flex flex-col gap-4 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Title lines={analysis.title} className="text-[clamp(2.5rem,6vw,4.5rem)]" />
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{analysis.sample}</p>
        </div>

        <div className="mt-14 grid items-center gap-6 md:mt-20 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          {/* Ficha de producto: el dato */}
          <article className="rounded-[6px] border border-line bg-surface p-4 md:p-5">
            <div className="flex gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt="" className="aspect-[4/5] w-20 shrink-0 sm:w-28 rounded-[3px] object-cover md:w-36" loading="lazy" />
              <div className="flex min-w-0 flex-col">
                <span className="w-fit border border-rec px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-rec">
                  {product.status}
                </span>
                <h3 className="mt-3 text-[20px] font-semibold leading-tight">{product.name}</h3>
                <dl className="mt-auto grid grid-cols-3 gap-2 pt-4 sm:gap-3">
                  {product.data.map((d) => (
                    <div key={d.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{d.label}</dt>
                      <dd className="mt-1 whitespace-nowrap font-mono text-[15px] tabular-nums md:text-[18px]">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>

          {/* El corte */}
          <div className="flex items-center justify-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted md:flex-col">
            <span className="h-px w-10 bg-line md:h-10 md:w-px" />
            Corte
            <span className="h-px w-10 bg-line md:h-10 md:w-px" />
          </div>

          {/* Anuncio 9:16: lo que resuelve el dato */}
          <article className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[6px] bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/90" />
            <FrameMarks />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-rec">{ad.kicker}</p>
                <p className="mt-2 font-serif text-[40px] italic leading-none">{ad.headline}</p>
              </div>
              <div>
                <p className="font-mono text-[64px] leading-none tracking-[-0.04em] text-rec">{ad.offer}</p>
                <p className="mt-2 text-[15px] font-semibold">{product.name}</p>
                <span className="mt-4 inline-block rounded-[4px] bg-foreground px-4 py-2 text-[13px] font-semibold text-background">
                  {ad.cta}
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* Conteo de stock: arranca en 80 y termina en 12 (animación en el paso 8). */}
        <p className="mt-12 text-center font-mono text-[clamp(2rem,5vw,3.5rem)] tabular-nums tracking-[-0.02em]">
          <span className="text-muted line-through decoration-1">{stock.from}</span>
          <span className="mx-4 text-muted">→</span>
          <span className="text-rec">{stock.to}</span>
          <span className="ml-3 text-[0.4em] uppercase tracking-[0.14em] text-muted">{stock.label}</span>
        </p>

        {/* Qué sale del análisis → qué anuncio le corresponde */}
        <ul className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {analysis.map.map((row) => (
            <li key={row.data} className="flex flex-col gap-3 bg-background p-5">
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
