import { content } from "@/config/content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";

const { beforeAfter: ba } = content;

// TOMA 07. Slider antes/después arrastrable (mouse, dedo y teclado).
export function BeforeAfter() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <Toma {...ba.toma} />
        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Title lines={ba.title} className="text-[clamp(2.5rem,6vw,4.5rem)]" />
            <dl className="mt-10 space-y-5">
              {[ba.before, ba.after].map((side) => (
                <div key={side.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{side.label}</dt>
                  <dd className="mt-1 text-[18px]">{side.caption}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <BeforeAfterSlider before={ba.before} after={ba.after} hint={ba.hint} />
          </div>
        </div>
      </Container>
    </section>
  );
}
