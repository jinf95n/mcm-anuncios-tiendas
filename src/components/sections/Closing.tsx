import { content } from "@/config/content";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Title } from "@/components/ui/Title";
import { Toma } from "@/components/ui/Toma";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Wordmark } from "@/components/ui/Wordmark";

const { closing, footer } = content;

// TOMA 13. Cierre: el CTA final grande, y el pie.
export function Closing() {
  return (
    <section className="pb-28 pt-24 md:pb-12 md:pt-36">
      <Container>
        <Toma {...closing.toma} />
        <div className="mt-16 md:mt-24">
          <Title lines={closing.title} className="text-[clamp(3rem,9vw,6rem)]" />
          <p className="mt-8 max-w-[44ch] text-[18px] leading-[1.5] text-muted md:text-[20px]">{closing.text}</p>
          <WhatsAppButton message={closing.message} size="lg" className="mt-10">
            {closing.cta}
          </WhatsAppButton>
        </div>

        <footer className="mt-28 flex flex-col gap-4 border-t border-line pt-8 text-[14px] text-muted md:mt-40 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-3">
            <Wordmark className="text-[24px] text-foreground" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{footer.by}</span>
          </div>
          <p className="font-mono text-[12px] tabular-nums">{site.contact.phone}</p>
          <p>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
        </footer>
      </Container>
    </section>
  );
}
