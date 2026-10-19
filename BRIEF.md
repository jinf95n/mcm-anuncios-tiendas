# BRIEF — Take One — by MCM Digital

## Cliente
- Quién es: Take One, servicio de MCM Digital. Frase de venta: "Te armamos todo".
- Rubro: armado de anuncios para tiendas online (piezas, setup de Meta, kits para fechas de venta, abono mensual). [PENDIENTE: confirmar descripción]
- Ciudad / alcance: [PENDIENTE]
- Qué lo diferencia de su competencia: precio frente a una agencia (desde USD 150 vs. agencia desde USD 2.850 por 20 piezas + setup de Meta); arranca con muestra gratis; trabaja a partir del análisis de la tienda ("del análisis a los anuncios"), con reporte semanal. [PENDIENTE: confirmar]

## Público
- A quién le habla el sitio: dueños de tiendas online. Llegan mayormente desde Instagram, en celular. [PENDIENTE: confirmar perfil (tamaño de tienda, plataforma)]
- Qué busca esa persona cuando llega: [PENDIENTE]

## Objetivo del sitio
- Acción principal: escribir por WhatsApp con mensaje precargado, distinto según la sección.
- Acciones secundarias: pegar el link de la tienda para mandarlo por WhatsApp. [PENDIENTE: ¿hay otras?]

## Secciones
<!-- Surgen de "Ideas a incluir". El orden y la estructura final se definen en el paso 6. -->
1. Portada: muro de videos verticales en loop, estilo reels.
2. Input "Pegá el link de tu tienda".
3. Antes/después (slider arrastrable).
4. Del análisis a los anuncios (animado con scroll).
5. Servicios y precios (Muestra gratis, Pack 20 piezas, Todo armado, Kit fecha, Abono).
6. Comparativa agencia vs. nosotros + calculadora.
7. Reporte semanal (chat simulado, chico y sin protagonismo).
8. [PENDIENTE: ¿FAQ, testimonios, cierre?]

## Funcionalidades
<!-- Una por línea: qué hace, qué datos usa, dónde se guardan -->
- Botones de WhatsApp: abren WhatsApp con un mensaje distinto por sección. Número desde `site.ts`, mensajes en `content.ts`. No se guarda nada.
- Input "Pegá el link de tu tienda": abre WhatsApp con el link en el mensaje. No se guarda nada.
- Slider de antes/después arrastrable. Imágenes en `/public/media/`.
- Calculadora: cantidad de piezas → precio de agencia vs. el nuestro. Valores en `content.ts`. [PENDIENTE: fórmula/precio por pieza]
- Botón de WhatsApp fijo en celular.
- Meta Pixel con evento "Contact" al tocar WhatsApp. [PENDIENTE: ID del Pixel]

## Tono de los textos
- Voseo. [PENDIENTE: tono (ej. directo y cancherito vs. sobrio)]

## Contenido disponible
- Logo: [PENDIENTE]
- Fotos propias: [PENDIENTE] Videos verticales para la portada y antes/después: de relleno por ahora, en `/public/media/`.
- Textos que ya tiene: [PENDIENTE] Por ahora, borradores en `content.ts`.
- Testimonios / casos / prensa: [PENDIENTE]

## Datos de contacto
- WhatsApp: +54 264 558-1677
- Email: [PENDIENTE]
- Dirección: [PENDIENTE: ¿se muestra?]
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
