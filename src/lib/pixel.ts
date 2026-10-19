// Meta Pixel. El ID es público (Meta lo expone en el navegador) y se inyecta al hacer el build
// desde NEXT_PUBLIC_META_PIXEL_ID. Vacío = Pixel apagado: no se carga ni se dispara nada.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

type Fbq = (command: "track", event: string, params?: Record<string, unknown>) => void;

// Evento "Contact": se dispara cada vez que alguien abre WhatsApp desde el sitio.
export function trackContact() {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (META_PIXEL_ID && typeof fbq === "function") fbq("track", "Contact");
}
