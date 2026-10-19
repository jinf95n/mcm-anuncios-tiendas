# BRIEF — Take One — by MCM Digital

## Cliente
- Quién es: Take One, servicio de MCM Digital. Frase de venta: "Te armamos todo".
- Rubro: servicio de anuncios hechos con IA + setup de Meta para tiendas online.
- Alcance: one page, sin blog.
- Qué lo diferencia de su competencia: calidad de comercial de agencia por una fracción del precio, decidido con los datos de la tienda.

## Público
- A quién le habla el sitio: dueños de tiendas online que manejan todo solos, sin agencia. Foco en Tiendanube. Llegan mayormente desde Instagram, en celular.
- Qué busca esa persona cuando llega: pedir su muestra gratis por WhatsApp.

## Objetivo del sitio
- Acción principal (única conversión): pedir la muestra gratis por WhatsApp, con mensaje precargado distinto según la sección.
- Acciones secundarias: ninguna aparte de WhatsApp. El input "Pegá el link de tu tienda" es otra entrada a la misma conversión.

## Secciones
<!-- 10 secciones. El orden y la estructura final se definen en el paso 6. -->
1. Portada: muro de videos verticales en loop, estilo reels.
2. Input "Pegá el link de tu tienda".
3. Antes/después (slider arrastrable).
4. Del análisis a los anuncios (animado con scroll).
5. Servicios y precios (Muestra gratis, Pack 20 piezas, Todo armado, Kit fecha, Abono).
6. Comparativa agencia vs. nosotros + calculadora.
7. Reporte semanal (chat simulado, chico y sin protagonismo).
8. Testimonios (relleno).
9. FAQ.
10. Cierre.

## Funcionalidades
<!-- Una por línea: qué hace, qué datos usa, dónde se guardan -->
- Botones de WhatsApp: abren WhatsApp con un mensaje distinto por sección. Número desde `site.ts`, mensajes en `content.ts`. No se guarda nada.
- Input "Pegá el link de tu tienda": abre WhatsApp con el link en el mensaje. No se guarda nada.
- Slider de antes/después arrastrable. Imágenes en `/public/media/`.
- Calculadora: cantidad de fotos y videos → precio de agencia vs. el nuestro. Valores de relleno en `content.ts`:
  - Agencia = fotos × USD 55 + videos × USD 300.
  - Nosotros = (fotos + videos) × USD 7,5, con un mínimo de USD 150.
- Botón de WhatsApp fijo en celular.
- Meta Pixel con evento "Contact" al tocar WhatsApp. [PENDIENTE: ID del Pixel]

## Tono de los textos
- Rioplatense con voseo, directo, simple, sin tecnicismos, de igual a igual con el dueño.

## Contenido disponible
- Logo: wordmark tipográfico, se define en el paso 4.
- Fotos y videos: de relleno por ahora, en `/public/media/` (videos verticales para la portada, imágenes de antes/después).
- Textos que ya tiene: ninguno. Borradores en `content.ts`.
- Testimonios / casos / prensa: de relleno.

## Datos de contacto
- WhatsApp: +54 264 558-1677
- Email: [PENDIENTE]
- Dirección: no aplica (one page, servicio online).
- Redes: [PENDIENTE: Instagram]
- Dominio: [PENDIENTE: tiendas.mcmdigital.com.ar o raíz]

## Notas de la charla con el cliente

### Decisiones

- Marca: "Take One — by MCM Digital". "Te armamos todo" queda como frase de venta (titular o CTA). Dominio a definir (tiendas.mcmdigital.com.ar o raíz).
- Conversión única: WhatsApp [+542645581677] con mensaje precargado. Cada botón manda un mensaje distinto según la sección ("Quiero mi muestra", "Quiero el kit Cyber", etc.).
- Mobile primero: la mayoría del tráfico llega desde Instagram en celular.

### Contenido de relleno

- Todos los textos, precios, rutas de medios y el número de WhatsApp van en un solo archivo `content.ts`. (Decisión posterior: el WhatsApp vive en `site.ts` y `content.ts` lo toma de ahí, sin repetirlo.)
- Medios en `/public/media/` con nombres fijos (hero-1.mp4, antes-1.jpg, etc.). Se reemplazan después sin tocar componentes.
- Precios de relleno: Muestra gratis | Pack 20 piezas desde USD 150 | Todo armado desde USD 490 | Kit fecha desde USD 260 | Abono desde USD 320/mes.
- Tabla comparativa: Agencia desde USD 2.850 (20 piezas + setup de Meta) vs. nosotros desde USD 150. Nota al pie: "Referencia: tarifario.info, sept. 2026".

### Ideas a incluir

- Portada: muro de videos verticales en loop, estilo reels.
- Input "Pegá el link de tu tienda" que abre WhatsApp con el link en el mensaje.
- Slider de antes/después arrastrable.
- Calculadora: cantidad de piezas → precio de agencia vs. el nuestro.
- "Del análisis a los anuncios" animado con scroll: el dato de la tienda se transforma en el anuncio.
- Chat simulado con el reporte semanal de Claude, chico y sin protagonismo.
- Botón de WhatsApp fijo en celular.
- Meta Pixel con evento "Contact" al tocar WhatsApp.
- Videos cortos comprimidos, con poster y carga diferida.
