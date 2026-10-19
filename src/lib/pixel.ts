// Meta Pixel. El ID es público (Meta lo expone en el navegador) y se inyecta al hacer el build
// desde NEXT_PUBLIC_META_PIXEL_ID. Vacío = Pixel apagado: no se carga ni se dispara nada.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

type Fbq = (command: "track", event: string, params?: Record<string, unknown>) => void;

// Evento "Contact": se dispara cada vez que alguien abre WhatsApp desde el sitio.
// content_name dice desde qué sección ("toma-04", "header", "boton-fijo"), para ver en Meta qué convierte.
export function trackContact(contentName: string) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (META_PIXEL_ID && typeof fbq === "function") fbq("track", "Contact", { content_name: contentName });
}

// Nombre de la sección de un botón: su data-wa si lo trae; si no, la claqueta (data-toma)
// de la sección donde está.
export function contactSource(el: Element) {
  const own = el.getAttribute("data-wa");
  if (own) return own;
  const toma = el.closest("section")?.querySelector("[data-toma]")?.getAttribute("data-toma");
  return toma || "sin-seccion";
}
