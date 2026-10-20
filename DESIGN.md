# DESIGN — Take One — by MCM Digital

## Dirección visual
"Sala de edición". El sitio se siente como una isla de edición a oscuras: negro cálido, texto crema, grano de película y un único rojo de REC que marca dónde actuar. Los videos son los protagonistas; la interfaz es la del editor (timecode, tomas, datos en mono) y se corre para dejarlos ver.

## Referencias
Detalle de la mecánica y las adaptaciones aprobadas en `BRIEF.md` → "Referencias". Se toman efectos de scroll, no la estética.
- https://studiomirage.io/ → sección Formatos: cada formato crece con el scroll hasta llenar la pantalla, con nombre y dato encima.
- https://www.junkbranding.com/ → "Del análisis a los anuncios": el dato de la tienda se desarma y se rearma como el anuncio; conteo del dato "80 en stock · 47 días sin venderse".
- https://virtuallyeverafter.xyz/ → galería de anuncios: pasillo de reels en CSS 3D que se recorre con el scroll; swipe en celular; grilla estática con reduced-motion.

## Colores
| Rol | HEX | Uso |
|---|---|---|
| Fondo | `#0E0D0B` | Negro cálido. Fondo de todo el sitio. |
| Superficie | `#1A1815` | Tarjetas, bloques, chat simulado, tabla, FAQ. |
| Texto | `#F2EDE4` | Crema. Títulos y cuerpo. |
| Secundario | `#F2EDE4` al 60% | Texto secundario, labels, notas al pie. |
| Bordes | `#F2EDE4` al 12% | Líneas, divisores, contornos de tarjetas e inputs. |
| Acento | `#FF3B1F` | Rojo REC. Solo CTA, punto REC y números clave. Nunca como fondo extenso. |

- Texto sobre el botón rojo: negro `#0E0D0B` (contraste ~5,5:1; el crema sobre rojo da ~3:1 y no llega a 4,5:1).
- Tokens en `src/app/globals.css`: `background`, `surface`, `foreground`, `muted`, `line`, `rec`.

## Tipografía
- Títulos: Instrument Serif 400 (única), itálica para énfasis (una o dos palabras por título). Tamaños aproximados: hero 64–120 px (clamp), H2 40–72 px, H3 28–36 px. Interlineado ajustado (1–1,05).
- Cuerpo y UI: Inter Tight 400/500/600. Cuerpo 17–18 px, interlineado 1,5. Botones en 500–600.
- Detalles (timecode, "TOMA 01", datos, precios en tablas, labels): JetBrains Mono 400/500, 12–14 px (los labels más chicos: 11 px en celular y 12 px desde 768 px, `text-[11px] md:text-[12px]`), mayúsculas con tracking amplio en labels. Números con `tabular-nums` para que el conteo no salte.
- Variables CSS: `--font-serif`, `--font-sans`, `--font-mono` (Tailwind: `font-serif`, `font-sans`, `font-mono`).

## Logo
- Wordmark tipográfico: "Take *One*" en Instrument Serif, con "One" en itálica, precedido por el punto REC rojo. Debajo o al lado, "by MCM Digital" en mono chico al 60%. [Propuesta: confirmar]

## Layout y espaciado
- Grilla: 12 columnas en desktop, 4 en celular. Ancho máximo del contenido 1280 px; los videos pueden ir a sangre.
- Ritmo vertical entre secciones: 120 px en desktop, 80 px en celular. Token `--section-gap` en `src/app/globals.css`; las secciones usan `py-section` (medio gap arriba y medio abajo), nunca un padding propio.
- Cada sección arranca con su claqueta "TOMA 0X" en mono, alineada a la izquierda con una línea fina de borde.
- Cómo rompe la grilla: videos a sangre o desbordando la columna; títulos grandes que cruzan columnas; números clave enormes en serif o mono junto a texto chico. Alternar la composición entre secciones (no todo centrado ni la misma estructura en cada una).

## Componentes
- Botones: CTA principal rojo REC con texto negro, esquinas apenas redondeadas (4–6 px), Inter Tight 600. Secundario: contorno crema al 12% y texto crema. El botón de WhatsApp lleva el punto REC titilando.
- Tarjetas / bloques: superficie `#1A1815`, borde crema al 12%, sin sombras ni blur. Esquinas de 4–8 px.
- Imágenes y videos: verticales 9:16 como formato principal, recortes limpios, sin bordes gruesos. Pueden llevar marcas de encuadre (esquinas finas) o un timecode chico encima, como monitor de edición.
- Navegación: barra superior mínima (wordmark + CTA de WhatsApp). Timecode fijo en una esquina como indicador de progreso. En celular, botón de WhatsApp fijo abajo, siempre visible.
- Recursos fijos: grano de película sutil sobre todo el sitio (capa superpuesta, sin interferir con los clics), timecode, "TOMA 01…13", punto REC.

## Animación y movimiento
Lenguaje de edición: cortes secos, fundidos y escalas. Easing suave (`power2`/`power3` out, `expo.out` para escalas grandes), sin rebotes ni efectos elásticos. GSAP + ScrollTrigger + Lenis; scroll siempre nativo.
- Entrada del hero: el muro de reels aparece con cortes secos (cada columna entra de a una, sin deslizamientos largos); el titular entra con fundido y leve subida por líneas.
- Al hacer scroll:
  - Timecode: avanza con el progreso del scroll de toda la página.
  - Claquetas "TOMA 0X": corte seco al entrar en la sección.
  - Formatos: sección fija; cada formato escala de tarjeta al 40% a pantalla completa (bordes redondeados → rectos); nombre y dato entran con fundido al llegar.
  - Del análisis a los anuncios: sección fija; la ficha de producto se desarma (SplitText) y la foto se recorta/escala a 9:16 hasta formar el anuncio; antes, el dato cuenta: "80 en stock · 47 días sin venderse" (el 47 cuenta hacia arriba).
  - Galería: pasillo en CSS 3D; la cámara avanza con el scroll; solo se reproduce el reel cercano.
  - Números clave (USD 2.350 vs. USD 150, días vs. semanas): conteo o corte, en rojo REC.
  - Bloques de texto: fundido + subida corta.
- Reglas de las secciones fijas: máximo ~2 pantallas de recorrido cada una. El botón de WhatsApp queda siempre visible. Si una sección se hace larga, se recorta el efecto, no el CTA.
- Hover / interacciones: botones con cambio de fondo rápido (150–200 ms); videos que se reproducen al pasar o tocar; slider antes/después arrastrable sin inercia.
- 3D: no Three.js. Solo CSS 3D en la galería.
- Velocidad general: ágil y precisa, como un corte de edición. Fundidos de 0,3–0,6 s; escalas atadas al scroll.
- `prefers-reduced-motion`: sin secciones fijas ni escalas; contenido estático visible, conteos muestran el valor final, punto REC quieto, timecode sin animar.

## Prohibido
- Estrellas, espacio, partículas, criaturas.
- Glassmorphism, gradientes de colores y azul "tech".
- Gradientes violeta/azul genéricos.
- Rojo REC como fondo extenso.
- Rebotes y easing elástico.
- Secuestrar la rueda del mouse o avanzar de a una pantalla.
- Tarjetas idénticas con ícono arriba en grilla de 3.
- Todo centrado, misma estructura en cada sección.
- Fotos de stock genéricas, emojis.

## Mobile
- Qué cambia en mobile: celular primero. Botón de WhatsApp fijo abajo con el punto REC. Muro de reels del hero en 2 columnas. Timecode más chico, en una esquina sin tapar el contenido. Tipografías con clamp.
- Animaciones que se simplifican o se sacan:
  - Galería 3D → carrusel con swipe horizontal, de a un reel por vez.
  - Formatos → misma escala con menos recorrido; la tarjeta arranca al 80% del ancho.
  - Del análisis a los anuncios → menos piezas animadas (solo los datos clave y la foto).
  - Grano de película más liviano o estático si afecta el rendimiento.
  - Videos: cortos, comprimidos, con poster y carga diferida; solo se reproduce el que está en pantalla.
