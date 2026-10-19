import { content } from "@/config/content";
import { WhatsAppButton } from "./WhatsAppButton";

// Botón de WhatsApp fijo abajo en celular: siempre visible.
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <WhatsAppButton message={content.header.message} track="boton-fijo" size="lg" className="w-full">
        {content.hero.cta}
      </WhatsAppButton>
    </div>
  );
}
