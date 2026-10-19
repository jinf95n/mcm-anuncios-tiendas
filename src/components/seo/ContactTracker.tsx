"use client";

import { useEffect } from "react";
import { contactSource, META_PIXEL_ID, trackContact } from "@/lib/pixel";

// Un solo detector de clics para toda la página: cualquier enlace con data-wa (botones de
// WhatsApp) dispara "Contact" con la sección como content_name. Sin ID de Pixel no escucha nada.
export function ContactTracker() {
  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[data-wa]");
      if (link) trackContact(contactSource(link));
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
