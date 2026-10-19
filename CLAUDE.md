@AGENTS.md

# Proyecto base Landing24

Sitio de cliente de Landing24. Antes de diseñar o construir, leé `BRIEF.md` (qué es el sitio) y `DESIGN.md` (cómo se ve) en la raíz. Si no existen, el proyecto recién arranca: usá la skill `nuevo-sitio`.

## Stack
- Next.js (App Router) + TypeScript + Tailwind, deploy en Cloudflare Workers con OpenNext.
- Animación: solo GSAP (+ ScrollTrigger) y Lenis. Usá `src/lib/gsap.ts` y el provider de Lenis existentes.
- Three.js solo si DESIGN.md lo pide.
- Datos del cliente: todo sale de `src/config/site.ts`. Nunca hardcodees nombre, teléfono, URL o redes en componentes.

## Comandos
- `npm run dev`: desarrollo local.
- `npm run preview`: build de Cloudflare y prueba local.
- `npm run deploy`: deploy a Cloudflare.

## Estructura
- `src/config/site.ts`: datos del cliente, SEO, rutas del sitemap. `whatsappUrl()` para links de WhatsApp.
- `src/lib/gsap.ts`: GSAP + ScrollTrigger + SplitText + useGSAP registrados. Importar siempre desde acá.
- `src/components/providers/SmoothScroll.tsx`: Lenis sincronizado con GSAP (ya montado en el layout).
- `src/app/api/contact/route.ts` + `src/lib/contact.ts`: formularios → webhook de n8n (`CONTACT_WEBHOOK_URL`).
- Tipografías con `next/font` en `src/app/layout.tsx`; colores en `src/app/globals.css`.

## Reglas
- Prohibido instalar shadcn/ui, Framer Motion/Motion o librerías de componentes. Los componentes se diseñan a partir de DESIGN.md.
- Respetá `prefers-reduced-motion` en toda animación.
- Textos en español rioplatense con voseo. Nunca lorem ipsum: borradores realistas según BRIEF.md.
- Secretos (webhooks, keys) solo en variables de entorno y del lado del servidor.
- Antes de un cambio grande, explicá brevemente qué vas a hacer. Cambios mínimos, sin refactors no pedidos.
- Si cambiás el nombre del proyecto, actualizá `name` en `package.json` y en `wrangler.jsonc` (si no, se pisan deploys de otros clientes).
