import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { howItWorks: how } = content;

// TOMA 08. Cuatro pasos como fotogramas de una tira de película + "lo único que ponés vos".
export function HowItWorks() {
  return (
    <section className="py-section">
      <Container>
        <Toma {...how.toma} />
        <Title lines={how.title} className="mt-12 text-[clamp(2.5rem,6vw,4.5rem)] md:mt-16" />

        <ol data-reveal="stagger" className="mt-14 grid gap-px border border-line bg-line md:mt-20 md:grid-cols-4">
          {how.steps.map((step, i) => {
            const isYours = i === how.steps.length - 1;
            return (
              <li key={step.title} className="flex min-h-[220px] flex-col bg-background p-6 md:min-h-[300px]">
                <span className={`font-mono text-[44px] leading-none tabular-nums ${isYours ? "text-rec" : "text-muted"}`}>
                  {i + 1}
                </span>
                <h3 className="mt-auto pt-10 text-[20px] font-semibold leading-[1.25]">{step.title}</h3>
                <p className="mt-2 text-[16px] text-muted">{step.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h3 className="font-serif text-[clamp(2rem,4.5vw,3rem)] leading-[1.05]">{how.yours.title}</h3>
            <ul data-reveal="stagger" className="mt-6 space-y-3">
              {how.yours.items.map((item) => (
                <li key={item} className="flex gap-3 text-[18px] md:text-[20px]">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-rec" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
            <WhatsAppButton message={how.message} size="lg">
              {how.cta}
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
