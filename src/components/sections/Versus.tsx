import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { versus } = content;
const { calculator: calc } = versus;

const usd = (n: number) => `USD ${n.toLocaleString("es-AR")}`;

// Valores iniciales con la fórmula de relleno (coinciden con la tabla: 2.850 vs. 150).
const initialAgency = calc.photos.initial * calc.photos.agencyUnit + calc.videos.initial * calc.videos.agencyUnit + calc.agencySetup;
const initialUs = Math.max(calc.usMin, (calc.photos.initial + calc.videos.initial) * calc.usUnit);

// TOMA 04. Tabla + calculadora + "por qué es más barato sin ser peor".
// La calculadora solo es visual: los +/- y el recálculo van en el paso 9.
export function Versus() {
  return (
    <section id="precio" className="py-24 md:py-36">
      <Container>
        <Toma {...versus.toma} />
        <Title lines={versus.title} className="mt-12 text-[clamp(2.5rem,6vw,4.5rem)] md:mt-16" />

        {/* Los dos números que tienen que pegar. */}
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          <div className="bg-background p-6 md:p-10">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{versus.agency.label}</p>
            <p className="mt-4 font-mono text-[clamp(2.75rem,7vw,5rem)] leading-none tabular-nums tracking-[-0.03em] text-muted line-through decoration-1">
              {usd(versus.agency.price)}
            </p>
          </div>
          <div className="bg-background p-6 md:p-10">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground">{versus.us.label}</p>
            <p className="mt-4 font-mono text-[clamp(2.75rem,7vw,5rem)] leading-none tabular-nums tracking-[-0.03em] text-rec">
              {usd(versus.us.price)}
            </p>
          </div>
        </div>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{versus.priceNote}</p>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Tabla comparativa */}
          <div className="lg:col-span-7">
            <table className="w-full border-collapse text-left text-[15px] md:text-[16px]">
              <thead>
                <tr className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  <th scope="col" className="w-[30%] pb-3 font-normal">
                    <span className="sr-only">Comparación</span>
                  </th>
                  <th scope="col" className="pb-3 font-normal">{versus.agency.label}</th>
                  <th scope="col" className="pb-3 font-normal text-foreground">{versus.us.label}</th>
                </tr>
              </thead>
              <tbody>
                {versus.rows.map((row) => (
                  <tr key={row.label} className="border-t border-line align-top">
                    <th scope="row" className="py-4 pr-4 font-mono text-[12px] font-normal uppercase tracking-[0.08em] text-muted">
                      {row.label}
                    </th>
                    <td className="py-4 pr-4 text-muted">{row.agency}</td>
                    <td className="py-4">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 border-t border-line pt-4 text-[13px] text-muted">{versus.footnote}</p>
          </div>

          {/* Calculadora (visual) */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[6px] border border-line bg-surface p-6">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{calc.title}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[calc.photos, calc.videos].map((field) => (
                  <div key={field.label} className="border border-line p-3">
                    <p className="text-[13px] text-muted">{field.label}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <button type="button" className="h-8 w-8 border border-line text-[18px] leading-none" aria-label={`Menos ${field.label.toLowerCase()}`}>
                        −
                      </button>
                      <span className="font-mono text-[22px] tabular-nums">{field.initial}</span>
                      <button type="button" className="h-8 w-8 border border-line text-[18px] leading-none" aria-label={`Más ${field.label.toLowerCase()}`}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <dl className="mt-6 space-y-3 border-t border-line pt-5">
                <div className="flex items-baseline justify-between">
                  <dt className="text-muted">{calc.agencyLabel}</dt>
                  <dd className="font-mono text-[20px] tabular-nums text-muted line-through decoration-1">{usd(initialAgency)}</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt>{calc.usLabel}</dt>
                  <dd className="font-mono text-[28px] tabular-nums text-rec">{usd(initialUs)}</dd>
                </div>
              </dl>
              <WhatsAppButton
                message={versus.message.replace("{n}", String(calc.photos.initial + calc.videos.initial))}
                className="mt-6 w-full"
              >
                {versus.cta}
              </WhatsAppButton>
            </div>
          </div>
        </div>

        {/* Por qué es más barato sin ser peor */}
        <div className="mt-20 grid gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-8">
          <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.1] md:col-span-5">{versus.why.title}</h3>
          <p className="max-w-[52ch] text-[18px] leading-[1.5] text-muted md:col-span-6 md:col-start-7 md:text-[20px]">
            {versus.why.text}
          </p>
        </div>
      </Container>
    </section>
  );
}
