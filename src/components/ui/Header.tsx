import { content } from "@/config/content";
import { site } from "@/config/site";
import { Wordmark } from "./Wordmark";
import { WhatsAppButton } from "./WhatsAppButton";
import { Timecode } from "./Timecode";

// Barra superior mínima: wordmark + timecode + CTA. En celular el CTA vive abajo (MobileCta).
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/90">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-5 md:h-16 md:px-10">
        <a href="#top" className="flex items-baseline gap-3" aria-label={`${site.name}, ir al inicio`}>
          <Wordmark className="text-[26px] md:text-[28px]" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:inline">
            {content.footer.by}
          </span>
        </a>
        <Timecode className="ml-auto" />
        <div className="hidden md:block">
          <WhatsAppButton message={content.header.message} track="header">{content.header.cta}</WhatsAppButton>
        </div>
      </div>
    </header>
  );
}
