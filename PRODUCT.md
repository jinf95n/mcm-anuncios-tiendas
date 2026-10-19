# Product

<!-- impeccable:product-schema 1 -->

Fuente principal: `BRIEF.md` (producto, contenido, referencias y reglas) y `DESIGN.md` (dirección visual "Sala de edición"). Este archivo resume la verdad de producto; ante una diferencia, mandan esos dos.

## Platform

web

## Users
Dueños de tiendas online que manejan todo solos, sin agencia. Foco en Tiendanube. Llegan mayormente desde Instagram, en celular. Cuando entran, buscan pedir su muestra gratis por WhatsApp.

## Product Purpose
Take One (by MCM Digital) es un servicio de anuncios hechos con IA + setup de Meta para tiendas online. El sitio es una one page sin blog cuyo único objetivo es que el visitante pida su muestra gratis por WhatsApp. Frase de venta: "Te armamos todo".

## Positioning
Calidad de comercial de agencia por una fracción del precio, decidido con los datos de la tienda. Comparativa de relleno: agencia desde USD 2.850 (20 piezas + setup de Meta) vs. Take One desde USD 150 (referencia: tarifario.info, sept. 2026).

## Operating Context
- El visitante llega desde Instagram, en el celular, y decide rápido.
- La conversación sigue por WhatsApp: cada botón manda un mensaje precargado distinto según la sección ("Quiero mi muestra", "Quiero el kit Cyber", etc.). El input "Pegá el link de tu tienda" manda el link por WhatsApp.
- Después de contratar, el cliente recibe un reporte semanal (se muestra como chat simulado, chico y sin protagonismo).

## Capabilities and Constraints
- Servicios (precios de relleno): Muestra gratis | Pack 20 piezas desde USD 150 | Todo armado desde USD 490 | Kit fecha desde USD 260 | Abono desde USD 320/mes.
- Formatos: foto de estudio, estático, comercial, UGC.
- Calculadora (relleno): agencia = fotos × USD 35 + videos × USD 200 + USD 500 (setup de Meta); Take One = máx(USD 150, piezas × USD 7,5). Inicial: 10 fotos + 10 videos → USD 2.850 vs. USD 150.
- Única conversión: WhatsApp. Botón de WhatsApp siempre visible. Meta Pixel con evento "Contact" al tocar WhatsApp.
- Datos de identidad en `src/config/site.ts`; textos, precios y rutas de medios en `content.ts` (toma el WhatsApp de `site.ts`). Medios en `/public/media/` con nombres fijos, reemplazables sin tocar componentes.
- Stack: Next.js (App Router) + TypeScript + Tailwind, GSAP + ScrollTrigger + Lenis, deploy en Cloudflare Workers. Scroll siempre nativo.
- Pendientes que no bloquean: email, Instagram, dominio (tiendas.mcmdigital.com.ar o raíz), ID del Pixel.

## Brand Commitments
- Nombre: "Take One"; marca/autor: "MCM Digital". "Te armamos todo" es frase de venta, no nombre.
- Voz: rioplatense con voseo, directo, simple, sin tecnicismos, de igual a igual con el dueño.
- Las secciones se numeran como claqueta ("TOMA 01…13"), en juego con el nombre.

## Evidence on Hand
- No hay contenido real todavía. Videos, fotos, antes/después, testimonios y precios son relleno.
- No inventar clientes, métricas, casos ni testimonios presentados como reales.

## Product Principles
1. Una sola conversión: pedir la muestra gratis por WhatsApp. Todo empuja hacia ahí.
2. Mostrar, no explicar: los anuncios terminados son la prueba. El efecto está al servicio del video.
3. De igual a igual con el dueño que hace todo solo: sin tecnicismos. La IA es el medio, no el protagonista.
4. Decidido con los datos de la tienda: cada anuncio sale de un dato concreto (stock, ventas), no de una corazonada.
5. Prueba honesta: precios, testimonios y casos son relleno marcado hasta tener los reales. No se inventan clientes ni métricas.

## Accessibility & Inclusion
- Respetar `prefers-reduced-motion` en toda animación (versión estática de cada efecto).
- Celular primero: si un efecto no anda bien en mobile, tiene versión simple.
