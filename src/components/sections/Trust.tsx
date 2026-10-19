import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";

const { trust } = content;

// TOMA 11. Garantías en grande + testimonios de relleno, marcados como ejemplo.
export function Trust() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <Toma {...trust.toma} />
        <Title lines={trust.title} className="mt-12 text-[clamp(2.5rem,6vw,4.5rem)] md:mt-16" />

        <ul className="mt-12 md:mt-16">
          {trust.promises.map((p) => (
            <li
              key={p}
              className="border-t border-line py-6 font-serif text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.1] last:border-b md:py-8"
            >
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
          {trust.testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{trust.testimonialsLabel}</p>
              <blockquote className="mt-4 text-[18px] leading-[1.5]">“{t.quote}”</blockquote>
              <figcaption className="mt-5 border-t border-line pt-3 text-[14px]">
                {t.name} <span className="text-muted">· {t.store}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
