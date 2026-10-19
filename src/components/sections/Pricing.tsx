import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { pricing } = content;
const { report } = pricing;

// TOMA 10. Tarifario en filas, no tarjetas iguales. El reporte semanal va dentro del Abono.
export function Pricing() {
  return (
    <section id="precios" className="py-24 md:py-36">
      <Container>
        <Toma {...pricing.toma} />
        <div className="mt-12 flex flex-col gap-4 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Title lines={pricing.title} className="text-[clamp(2.5rem,6vw,4.5rem)]" />
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{pricing.note}</p>
        </div>

        <ul className="mt-14 md:mt-20">
          {pricing.plans.map((plan) => {
            const isAbono = plan.name === "Abono mensual";
            return (
              <li
                key={plan.name}
                className={`grid gap-5 border-t py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10 ${
                  plan.featured ? "border-rec md:-mx-6 md:border md:px-6" : "border-line last:border-b"
                }`}
              >
                <div className="md:col-span-4">
                  {plan.featured && (
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-rec">{pricing.featuredLabel}</p>
                  )}
                  <h3 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-none">{plan.name}</h3>
                </div>

                <div className="md:col-span-5">
                  <p className="max-w-[46ch] text-[17px] leading-[1.5] text-muted">{plan.detail}</p>

                  {isAbono && (
                    <figure className="mt-6 max-w-[380px] rounded-[6px] border border-line bg-surface p-4" aria-label={report.title}>
                      <figcaption className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        <span>
                          {report.title} · {report.time}
                        </span>
                        <span>{report.sample}</span>
                      </figcaption>
                      <div className="mt-3 space-y-1.5 rounded-[4px] bg-background p-3 text-[13px] leading-[1.45]">
                        {report.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                        <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{report.actionsLabel}</p>
                        <ol className="list-inside list-decimal space-y-1 marker:font-mono marker:text-rec">
                          {report.actions.map((a) => (
                            <li key={a}>{a}</li>
                          ))}
                        </ol>
                      </div>
                    </figure>
                  )}
                </div>

                <div className="flex flex-col gap-4 md:col-span-3 md:items-end md:text-right">
                  <p className={`font-mono text-[22px] tabular-nums ${plan.featured ? "text-rec" : ""}`}>{plan.price}</p>
                  <WhatsAppButton message={plan.message} variant={plan.featured ? "primary" : "ghost"}>
                    {plan.cta}
                  </WhatsAppButton>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
