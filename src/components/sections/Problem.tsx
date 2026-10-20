import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";

const { problem } = content;

// TOMA 02. Corta y sin sección fija: los dolores como notas de edición con timecode.
export function Problem() {
  return (
    <section className="py-section">
      <Container>
        <Toma {...problem.toma} />
        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <Title lines={problem.title} className="text-[clamp(2.5rem,6vw,4.5rem)] md:col-span-5" />
          <ul className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
            {problem.pains.map((pain) => (
              <li key={pain.tc} className="grid grid-cols-[auto_1fr] gap-5 border-t border-line py-5 last:border-b">
                <span className="pt-1 font-mono text-[12px] tabular-nums tracking-[0.08em] text-muted">{pain.tc}</span>
                <p className="text-[18px] leading-[1.45] md:text-[20px]">{pain.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
