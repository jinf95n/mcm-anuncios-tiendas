import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";

const { includes } = content;

// Posición de cada clip en la línea de tiempo (desktop): el trabajo se encadena.
const clipLayout = ["md:ml-0 md:w-[46%]", "md:ml-[22%] md:w-[52%]", "md:ml-[48%] md:w-[44%]", "md:ml-[58%] md:w-[42%]"];
const ruler = ["00:00", "00:15", "00:30", "00:45", "01:00"];

// TOMA 05. Lo que incluye "Te armamos todo", como pistas de una línea de tiempo de edición.
export function Includes() {
  return (
    <section className="py-section">
      <Container>
        <Toma {...includes.toma} />
        <Title lines={includes.title} className="mt-12 text-[clamp(2.5rem,6vw,4.5rem)] md:mt-16" />

        <div className="mt-14 border border-line md:mt-20">
          {/* Regla de tiempo */}
          <div className="hidden grid-cols-[64px_1fr] border-b border-line md:grid">
            <span className="border-r border-line" />
            <div className="flex justify-between px-3 py-2 font-mono text-[11px] md:text-[12px] tabular-nums text-muted">
              {ruler.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {includes.tracks.map((t, i) => (
            <div key={t.track} className="grid grid-cols-[52px_1fr] border-b border-line last:border-b-0 md:grid-cols-[64px_1fr]">
              <span className="flex items-start justify-center border-r border-line pt-5 font-mono text-[12px] tracking-[0.08em] text-muted">
                {t.track}
              </span>
              <div className="p-3 md:p-4">
                <div
                  className={`rounded-[4px] border p-4 md:p-5 ${clipLayout[i]} ${
                    t.optional ? "border-dashed border-foreground/30" : "border-line bg-surface"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-[26px] leading-[1.1] md:text-[30px]">{t.name}</h3>
                    {t.optional && (
                      <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.14em] text-muted">{includes.optionalLabel}</span>
                    )}
                  </div>
                  <p className="mt-2 max-w-[48ch] text-[16px] leading-[1.5] text-muted">{t.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
