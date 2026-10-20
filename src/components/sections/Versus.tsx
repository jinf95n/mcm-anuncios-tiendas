import { content } from "@/config/content";
import { CountUp } from "@/components/motion/CountUp";
import { Calculator } from "@/components/ui/Calculator";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";

const { versus } = content;

// TOMA 04. Tabla + calculadora + "por qué es más barato sin ser peor".
export function Versus() {
  return (
    <section id="precio" className="py-section">
      <Container>
        <Toma {...versus.toma} />
        <Title lines={versus.title} className="mt-12 text-[clamp(2.5rem,6vw,4.5rem)] md:mt-16" />

        {/* Los dos números que tienen que pegar: el de la agencia chico y en gris (sin tachar,
            para que no se lea como un descuento nuestro), el nuestro enorme en rojo REC. */}
        <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-4">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-foreground md:text-[14px]">{versus.agency.label}</p>
            <p className="mt-3 font-mono text-[clamp(2rem,4vw,3.25rem)] leading-none tabular-nums tracking-[-0.03em] text-muted">
              <CountUp value={versus.agency.price} prefix="USD " />
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-foreground md:text-[14px]">{versus.us.label}</p>
            <p className="mt-3 whitespace-nowrap font-mono text-[clamp(4.5rem,13vw,9.5rem)] leading-[0.85] tabular-nums tracking-[-0.05em] text-rec">
              <CountUp value={versus.us.price} prefix="USD " />
            </p>
          </div>
        </div>
        <p className="mt-5 text-[13px] text-muted">{versus.priceNote}</p>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Tabla comparativa */}
          <div className="lg:col-span-7">
            <table className="w-full border-collapse text-left text-[15px] md:text-[16px]">
              <thead>
                <tr className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-muted">
                  <th scope="col" className="w-[30%] pb-3 font-normal">
                    <span className="sr-only">Comparación</span>
                  </th>
                  <th scope="col" className="pb-3 font-normal">{versus.agency.label}</th>
                  <th scope="col" className="pb-3 font-normal text-foreground">{versus.us.label}</th>
                </tr>
              </thead>
              <tbody data-reveal="stagger">
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

          {/* Calculadora */}
          <div data-reveal="fade" className="lg:col-span-4 lg:col-start-9">
            <Calculator />
          </div>
        </div>

        {/* Por qué es más barato sin ser peor */}
        <div data-reveal="fade" className="mt-20 grid gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-8">
          <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.1] md:col-span-5">{versus.why.title}</h3>
          <p className="max-w-[52ch] text-[18px] leading-[1.5] text-muted md:col-span-6 md:col-start-7 md:text-[20px]">
            {versus.why.text}
          </p>
        </div>
      </Container>
    </section>
  );
}
