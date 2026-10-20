import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { faq } = content;

// TOMA 12. Preguntas frecuentes con <details> nativo (accesible y sin JS).
export function Faq() {
  return (
    <section id="preguntas" className="py-section">
      <Container>
        <Toma {...faq.toma} />
        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Title lines={faq.title} className="text-[clamp(2.5rem,6vw,4.5rem)]" />
            <WhatsAppButton message={faq.message} variant="ghost" className="mt-10">
              {faq.cta}
            </WhatsAppButton>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {faq.items.map((item) => (
              <details key={item.q} className="group border-t border-line last:border-b">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[19px] font-medium leading-[1.35] md:text-[21px] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="relative mt-[0.45em] h-3 w-3 shrink-0" aria-hidden>
                    <span className="absolute inset-x-0 top-1/2 h-px bg-foreground" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-foreground transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-7 text-[17px] leading-[1.6] text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
