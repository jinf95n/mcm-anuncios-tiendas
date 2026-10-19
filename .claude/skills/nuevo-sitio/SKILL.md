---
name: nuevo-sitio
description: Guía paso a paso para armar el sitio de un cliente de Landing24 sobre el proyecto base, desde el brief hasta el deploy. Usar cuando Nacho escriba /nuevo-sitio o pida arrancar, seguir o retomar un sitio de cliente.
---

# Nuevo sitio — flujo Landing24

Sos el guía del proceso. Avanzás **de a un paso**: hacés el paso, mostrás el resultado en pocas líneas y esperás que Nacho apruebe antes de seguir. Nunca hagas dos pasos juntos ni saltees uno. Respuestas cortas, en español con voseo.

## Dónde estamos

Al arrancar, leé `PROGRESO.md` en la raíz.
- Si no existe: estamos en el paso 1.
- Si existe: decí en una línea en qué paso quedó y preguntá si seguimos desde ahí.

Al terminar cada paso, marcalo en `PROGRESO.md` (`- [x] 3. Referencias`) y hacé un commit.

## Pasos

### 1. Preparar el proyecto
- Preguntá el nombre del cliente y armá un slug (ej. `estudio-perez`).
- Cambiá `name` en `package.json` y en `wrangler.jsonc` por el slug.
- Completá en `src/config/site.ts` lo que ya se sepa; lo demás dejalo como está.
- Creá `PROGRESO.md` con la lista de los 12 pasos.

### 2. Brief
- Copiá `.claude/skills/nuevo-sitio/plantillas/BRIEF.md` a la raíz.
- Pedile a Nacho lo que habló con el cliente. Preguntá de a pocas cosas, no todo junto.
- Completá BRIEF.md. Lo que no se sepa, marcalo `[PENDIENTE]`.

### 3. Referencias
- Pedí 2 o 3 URLs de sitios de referencia y capturas de detalles que le gusten.
- Si la skill `taste` está instalada, corré `/taste <url>` por cada sitio. Si no, analizá las URLs con `playwright-cli` (capturas + estilos).
- Resumí qué se toma de cada referencia (nunca copiar un sitio entero). Las animaciones de referencia se describen con palabras.

### 4. DESIGN.md
- Copiá `.claude/skills/nuevo-sitio/plantillas/DESIGN.md` a la raíz.
- Proponé 2 direcciones visuales bien distintas, en texto corto, basadas en brief + referencias. Nacho elige o mezcla.
- Completá DESIGN.md con la dirección elegida, incluidas las secciones de animación y de prohibidos.
- Si `/taste` escribió una sección de diseño en CLAUDE.md, pasala a DESIGN.md y sacala de CLAUDE.md.
- Aplicá los tokens: colores en `src/app/globals.css` y tipografías con `next/font` en `src/app/layout.tsx`.

### 5. Contexto de impeccable
- Usá la skill `impeccable` con el subcomando `teach`, indicando que tome BRIEF.md y DESIGN.md como fuente principal.
- Si no se carga sola, pedile a Nacho que escriba `/impeccable teach`.

### 6. Estructura
- `impeccable shape`: proponé la estructura de secciones según el brief.
- Verificá contra BRIEF.md que estén todas las secciones y funcionalidades. Esperá aprobación.

### 7. Construcción
- `impeccable craft` sobre la estructura aprobada.
- Textos borrador realistas, con voseo, del largo aproximado de los finales. Nada de lorem ipsum.
- Funcionalidades (cotizador, reservas, login, etc.) solo como sección visual; la lógica va en el paso 9.
- Datos del cliente siempre desde `src/config/site.ts`; WhatsApp con `whatsappUrl()`.

### 8. Animaciones
- `impeccable animate`, siguiendo la sección de animación de DESIGN.md.
- Usá la skill `gsap-scrolltrigger`. Usá `threejs-webgl` solo si DESIGN.md pide 3D (instalar `three` recién ahí).
- Importá GSAP siempre desde `@/lib/gsap` y usá `useGSAP`. Respetá `prefers-reduced-motion`.

### 9. Funcionalidades
- Una funcionalidad por vez. Antes de codear, definí con Nacho: qué hace, qué datos usa y dónde se guardan (Supabase, n8n, ninguno).
- Lógica de servidor en route handlers (`src/app/api/...`). Secretos solo en variables de entorno (`.dev.vars` local, `wrangler secret put` en producción).
- Formularios: `sendContact()` de `@/lib/contact` → `/api/contact` → webhook de n8n. Incluí el campo oculto `website` (honeypot).

### 10. Revisión visual
- Con `playwright-cli`: abrí el sitio, sacá capturas a 1440px y 390px de ancho, revisalas y corregí lo que esté mal.
- `impeccable critique`, corregí lo importante, y después `impeccable polish`.
- Chequeá peso de imágenes y que las animaciones no traben en mobile.

### 11. Textos finales y SEO
- Reemplazá los borradores por los textos que pase el cliente.
- Completá `src/config/site.ts` (incluido `schemaType` y `routes`), metadata por página e imagen `/public/og.jpg` (1200x630).
- Revisá que no queden `[PENDIENTE]` ni datos de ejemplo en el sitio.

### 12. Deploy
- Verificá que `name` en `wrangler.jsonc` sea el slug del cliente.
- `npm run preview` para probar el build de Cloudflare en local.
- Cargá los secretos con `npx wrangler secret put CONTACT_WEBHOOK_URL` y desplegá con `npm run deploy`.
- Commit final y marcá el paso en PROGRESO.md.
