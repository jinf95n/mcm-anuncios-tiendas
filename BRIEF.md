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
<!-- 13 secciones, numeradas como claqueta TOMA 01…13. Detalle en "Estructura" al final. -->
1. Portada (muro de reels + CTA + input "Pegá el link de tu tienda").
2. Problema.
3. Formatos (fija).
4. Agencia vs. nosotros (tabla + calculadora).
5. Qué incluye.
6. Del análisis a los anuncios (fija).
7. Antes/después (slider).
8. Cómo funciona.
9. Galería de anuncios (fija).
10. Precios (con el chat del reporte semanal dentro del Abono).
11. Confianza (testimonios de relleno + garantías).
12. FAQ.
13. Cierre.

## Funcionalidades
<!-- Una por línea: qué hace, qué datos usa, dónde se guardan -->
- Botones de WhatsApp: abren WhatsApp con un mensaje distinto por sección. Número desde `site.ts`, mensajes en `content.ts`. No se guarda nada.
- Input "Pegá el link de tu tienda": abre WhatsApp con el link en el mensaje. No se guarda nada.
- Slider de antes/después arrastrable. Imágenes en `/public/media/`.
- Calculadora: cantidad de fotos y videos → precio de agencia vs. el nuestro. Valores de relleno en `content.ts`, coherentes con la tabla comparativa:
  - Agencia = fotos × USD 35 + videos × USD 200 + USD 500 (setup de Meta).
  - Nosotros = máx(USD 150, piezas × USD 7,5).
  - Valor inicial: 10 fotos + 10 videos → USD 2.850 vs. USD 150 (igual que la tabla).
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

## Referencias

Se toman efectos y experiencia de scroll, no la estética (la estética es la de DESIGN.md, "Sala de edición"). Analizadas con playwright-cli a 1440 px (19/10/2026). Las tres funcionan sobre un único canvas WebGL a pantalla completa: la página no scrollea de verdad, la rueda del mouse avanza una animación.

### 1. https://studiomirage.io/ → sección Formatos
**Mecánica**
- Entrada: la cámara arranca arriba de una sala de 12 lados, vista desde el techo como un portal negro con borde iluminado. Con el scroll baja y se inclina hacia adentro. El borde se agranda hasta salir de la pantalla y aparecen las paredes, que son pantallas de video.
- Llegada: termina a la altura de los ojos, de frente a una pantalla que ocupa alrededor del 70% del ancho, con las vecinas asomando en perspectiva a los costados.
- Texto: el nombre aparece con un fundido, centrado sobre el video, recién cuando la cámara se detiene. Abajo quedan "prev/next" y un botón.
- Después: el scroll avanza de a una pantalla. Cada movimiento de la rueda gira la sala a la pantalla siguiente y cambia el título.

**Adaptación (aprobada)**
- Sin WebGL, con ScrollTrigger. La sección queda fija. Cada formato (foto de estudio, estático, comercial, UGC) arranca como una tarjeta de video al 40% del tamaño, con bordes redondeados, y con el scroll crece hasta ocupar toda la pantalla y los bordes quedan rectos.
- Al llegar al 100% entran su nombre y un dato encima ("listo en días", "20 versiones"). Después pasa al formato siguiente.
- Avanza con el scroll, sin saltos.

### 2. https://www.junkbranding.com/ → "Del análisis a los anuncios"
**Mecánica**
- Partículas: miles de partículas que nunca desaparecen. Entre una sección y otra se dispersan y se reagrupan en otra forma: anillo → medusa → fuegos artificiales → hojas → nieve. Al final forman el logo de texto del footer. La transición avanza con el scroll.
- Textos: entran por la izquierda (título y lista), y el bloque anterior se desvanece.
- Trabajos: aparecen como ventanas de navegador inclinadas en 3D que vienen desde el fondo, de a una por cada paso de scroll. A la izquierda queda un título grande, con contador "01 / 07" y un índice donde se resalta el trabajo activo.
- Progreso: abajo a la derecha hay un medidor de profundidad que sube de 1.000 m a 4.000 m (equivale al timecode).
- Header: el texto aparece con efecto de decodificación (XXXXXX → letras).

**Adaptación (aprobada)**
- Se toma solo el efecto de scroll, sin la medusa ni las estrellas. La sección queda fija. La ficha de producto (foto, "quieto · 80 en stock") se desarma: las letras y los números vuelan con SplitText y la foto se recorta y escala hasta el formato 9:16. Todo se rearma como el anuncio de liquidación.
- Cierra con el stock bajando con animación de conteo (80 → 12).

### 3. https://virtuallyeverafter.xyz/ → galería de anuncios
**Mecánica**
- Entrada: te hace elegir entre "space (3D)" y "page (2D editorial)". Es una alternativa liviana bien explícita.
- El 3D: un edificio en wireframe; hacés clic y entrás a un pasillo con una pantalla grande al fondo. El scroll mueve la cámara hacia adelante ("scroll to approach · drag to look"). La pantalla crece hasta llenar la vista y quedás "adentro" del video. Desde ahí, el scroll pasa de un video a otro, con capítulos numerados (1, 2, 3). Por delante flotan dibujos lineales blancos, como una capa que se mueve a otra velocidad.

**Adaptación (aprobada)**
- Un pasillo con CSS 3D (perspective + translateZ), sin Three.js. Los reels verticales van alternados en las paredes izquierda y derecha, y el scroll mueve la cámara hacia adelante. Los reels son los protagonistas.
- Solo se reproduce el reel que está cerca. Los demás quedan pausados con su imagen de portada.
- Celular: carrusel con swipe horizontal, de a un reel por vez.
- Con reduced-motion: grilla estática de portadas; se toca y se reproduce.

### Ideas propias
- Timecode (`00:00:12:04`): fijo en una esquina, avanza según cuánto se scrolleó la página entera.
- Cada sección numerada como claqueta: "TOMA 01…10" (juega con el nombre Take One).
- Punto rojo REC titilando junto al botón de WhatsApp, y quieto con reduced-motion.

### Criterios y reglas
- Los videos son los protagonistas; el efecto está para mostrarlos, no para lucirse.
- Cada efecto tiene que dejar claro qué se ofrece. Si no ayuda a entender, se saca.
- Los números (USD 2.850 vs. USD 150, días vs. semanas) tienen que pegar: aparecen con animación de conteo o de corte.
- Celular primero: si un efecto no anda bien en mobile, tiene versión simple.
- Scroll siempre nativo (Lenis + ScrollTrigger). Nada de secuestrar la rueda ni de saltos de a una pantalla.
- Cada sección fija dura poco scroll: máximo ~2 pantallas de recorrido.
- El botón de WhatsApp queda siempre visible. Si una sección se hace larga, se recorta el efecto, no el CTA.

## Estructura (aprobada, paso 6)

Cada sección lleva su claqueta "TOMA 0X". Tres secciones fijas (03, 06 y 09), separadas entre sí, de máximo ~2 pantallas de recorrido cada una. Siempre visibles: timecode, barra superior (wordmark + CTA de WhatsApp con punto REC) y, en celular, botón de WhatsApp fijo abajo.

| Toma | Sección | Contenido | Efecto | Mensaje de WhatsApp (borrador) |
|---|---|---|---|---|
| 01 | Portada | Titular "Te armamos todo", CTA de muestra gratis e input "Pegá el link de tu tienda". | Muro de reels en loop que entra con cortes secos. | "Quiero mi muestra" / "Esta es mi tienda: {link}" |
| 02 | Problema | Corto. | Sin sección fija; fundidos. | — |
| 03 | Formatos | Los "ejemplos grandes" de calidad: foto de estudio, estático, comercial, UGC, cada uno con nombre y dato ("listo en días", "20 versiones"). | Fija, inmersión: cada formato crece del 40% a pantalla completa. | "Quiero ver formatos para mi tienda" |
| 04 | Agencia vs. nosotros | Tabla (agencia desde USD 2.850 vs. nosotros desde USD 150; nota "Referencia: tarifario.info, sept. 2026") + calculadora + "por qué es más barato sin ser peor". | Números con conteo en rojo REC. | "Calculé {n} piezas, quiero mi presupuesto" |
| 05 | Qué incluye | Análisis, anuncios, setup de Meta y Claude opcional (solo para Tiendanube). | Fundidos. | — |
| 06 | Del análisis a los anuncios | La ficha "quieto · 80 en stock" se transforma en el anuncio de liquidación. | Fija: la ficha se desarma y se rearma como anuncio; cierra con conteo 80 → 12. | "Quiero que analicen mi tienda" |
| 07 | Antes/después | Foto original vs. anuncio terminado. | Slider arrastrable. | — |
| 08 | Cómo funciona | 4 pasos + "lo único que ponés vos": la pauta y, opcional, Claude Pro. | Fundidos / cortes. | "Quiero arrancar" |
| 09 | Galería de anuncios | Videos verticales tipo reel como protagonistas. | Fija, pasillo en CSS 3D; swipe en celular; grilla estática con reduced-motion. | "Quiero anuncios así" |
| 10 | Precios | Muestra gratis, Pack 20 piezas, Todo armado, Kit fecha, Abono. Chat simulado del reporte semanal dentro del Abono, chico y sin protagonismo. | Fundidos. | Uno por plan ("Quiero mi muestra", "Quiero el kit Cyber", etc.) |
| 11 | Confianza | Testimonios de relleno + "Tu cuenta de Meta y tu plata son tuyas", "Nada cambia en tu tienda sin tu confirmación", "Muestra gratis antes de pagar". | Fundidos. | — |
| 12 | FAQ | Las 7 preguntas de abajo. | Acordeón. | "Tengo otra pregunta" |
| 13 | Cierre | CTA final grande con el punto REC. | Corte seco. | "Quiero mi muestra" |

### FAQ
1. ¿Se nota que es IA?
2. ¿Cuánto tardan? (plazos)
3. ¿Los anuncios son míos?
4. ¿Cuánto tengo que poner de pauta?
5. ¿Tengo que pagar Claude Pro?
6. ¿Qué permisos necesitan sobre mi tienda?
7. ¿Sirve si mi tienda no es Tiendanube?

Las respuestas van como borrador en `content.ts`. "Formas de pago" queda afuera hasta que se defina.

## Brief original

Pegado entero por Nacho antes del paso 7, sin resumir. Es la fuente de los textos. Donde difiere de las decisiones de arriba (precios de relleno, estructura de 13 tomas, fórmula de la calculadora), mandan las decisiones.

> **Brief — One page de alta conversión: "Te armamos todo" para tiendas online**

### Objetivo de la página
Que el dueño de una tienda online escriba por WhatsApp para pedir su **muestra gratis**. Es la única conversión. El botón de WhatsApp se repite en toda la página y queda fijo en celular.

### Concepto
Servicio completo, hecho por nosotros:
1. **Analizamos tu tienda** y decidimos qué productos conviene anunciar.
2. **Te hacemos los anuncios:** fotos y videos con calidad de comercial, a una fracción del precio de una agencia o productora.
3. **Te dejamos Meta configurado** para que corras los anuncios.
4. **Te dejamos Claude conectado a tu tienda** (opcional) para que hagas tus análisis, cambios de precios y preparación de fechas, hablándole.

**Lo único que pone el cliente:** el dinero de la pauta y, si quiere la herramienta, la suscripción a Claude Pro.

### Promesa
Titular base: "Anuncios con calidad de agencia, por una fracción del precio. Y decididos con los datos de tu tienda."
Variante: "Te armamos todo: análisis, anuncios y Meta listo para vender. Vos solo ponés la pauta."

### Público
- Dueños de tiendas online que manejan todo ellos mismos, sin agencia, con catálogo amplio e Instagram activo.
- **Foco principal: Tiendanube**, porque el análisis automático y Claude conectado funcionan solo con Tiendanube.
- Tiendas de otras plataformas: igual pueden contratar anuncios + setup de Meta. Mencionarlo en una línea o en preguntas frecuentes, sin cambiar el foco.

### Dolores (sección "problema")
- Una agencia o productora de video es cara y tarda semanas.
- Los anuncios caseros se ven caseros y no venden.
- Se anuncia a ojo, no lo que conviene (productos con mucho stock que nadie empuja).
- Configurar Meta (cuenta publicitaria, conexión con la tienda) es un lío técnico.
- Fechas fuertes (Cyber, Black Friday, Navidad, Hot Sale) que exigen anuncios nuevos.
- Tareas de la tienda que llevan horas: subir precios, revisar stock, pedidos pagados sin despachar.

### Bloque central: calidad + precio vs. agencia
Es la sección más importante después de la portada. Va con ejemplos visuales grandes.

#### Formatos de anuncios
- Fotos de producto con calidad de estudio.
- Piezas estáticas para redes (feed, historias).
- Videos estilo comercial.
- Videos tipo UGC: una persona recomendando el producto.
Se hacen con IA a partir del link del producto, usando las fotos, el logo y los colores de la marca. No nombrar la herramienta en la página.

#### Comparación (tabla)
| | Agencia / productora | Nosotros |
|---|---|---|
| Precio | [precio promedio en Argentina — a verificar] | Desde USD 100-150 por 20 piezas |
| Rodaje, modelos, locación | Sí, y se paga | No hace falta |
| Tiempo de entrega | Semanas | Días |
| Versiones para probar | Pocas, cada cambio cuesta | Muchas versiones del mismo producto |
| Qué producto se anuncia | Lo que decide el cliente | Lo que conviene según los datos de la tienda |
| Meta configurado | Aparte | Incluido |

#### Por qué es más barato sin ser peor
Sin rodaje, sin modelos, sin locación y sin equipo de filmación. El producto real de la marca, en escenas de calidad de comercial.

### Del análisis a los anuncios
| Lo que sale del análisis | Anuncio |
|---|---|
| Más vendidos | UGC / recomendación |
| Productos gancho para una fecha | Anuncio de oferta |
| Quietos con mucho stock | Liquidación |
| Productos que se compran juntos | Anuncio de combo |
| Ficha floja en un producto que vende | Fotos nuevas de producto |

### Setup de Meta (incluido)
- Configuración de la cuenta publicitaria y conexión con la tienda.
- Primeras campañas armadas con los anuncios, listas para lanzar.
- El cliente queda con el control total de su cuenta y de su dinero.
- Detalle exacto de lo que incluye: a definir.
- Gestión continua de la pauta: opcional, a definir.

### Claude conectado a tu tienda (opcional, solo Tiendanube)
Te lo dejamos instalado con tus reglas (tono de marca, políticas, descuento máximo), con capacitación y una guía de frases. Requisito: suscripción a Claude Pro, que se paga aparte, a Anthropic. Si no la quiere, el análisis lo hacemos nosotros con su autorización de acceso a la tienda.

#### Qué puede hacer (resumido, sin protagonismo)
- **Reporte semanal:** ventas vs. semana anterior, más vendidos, quietos, qué reponer, pedidos pagados sin enviar, clientes que repiten, alertas de precios mal cargados y productos sin stock, y 3 acciones concretas.
- **Preparar fechas de venta:** auditoría, ofertas gancho, liquidación y combos, promociones creadas sin pasar el descuento máximo, checklist de la semana previa.
- **Actualizar precios:** subas o bajas en bloque, redondeo comercial, vista previa y vuelta atrás.
- **Más:** textos para Instagram, descripciones y SEO, respuestas a consultas frecuentes, cruce de la lista del proveedor con los precios.
- **Seguridad:** nunca cambia nada sin mostrar antes la vista previa y pedir confirmación.

### Cómo funciona (4 pasos)
1. Nos pasás el link de tu tienda.
2. Analizamos qué conviene anunciar.
3. Hacemos los anuncios y te dejamos Meta listo.
4. Vos ponés la pauta y lanzás.

### Paquetes (precios orientativos, a confirmar)
1. **Muestra gratis:** 2 estáticos + 1 video corto de un producto tuyo.
2. **Pack anuncios:** 20 piezas de un producto. USD 100-150.
3. **Todo armado (paquete principal):** análisis de la tienda + anuncios de los productos elegidos + setup de Meta + Claude conectado (opcional). Precio a definir.
4. **Kit fecha (Cyber, Black Friday, Navidad, Hot Sale):** análisis + anuncios de 3-5 productos para la fecha. USD 200-300.
5. **Abono mensual:** 8-12 anuncios nuevos por mes, decididos con los datos de ventas, + reporte semanal. USD 250-400/mes.
Pendiente: definir si se muestran en USD o en pesos, o como "desde".

### Confianza
- Ejemplos reales: antes (anuncio actual de la tienda) / después (el nuestro).
- Testimonios de tiendas (pendiente).
- El cliente mantiene el control de su cuenta de Meta y de su pauta.
- Nada se cambia en la tienda sin confirmación.
- Muestra gratis con su propio producto antes de pagar.

### Preguntas frecuentes
- ¿Los anuncios se notan hechos con IA?
- ¿Cuánto tardan?
- ¿Los anuncios son míos? ¿Puedo usarlos donde quiera?
- ¿Cuánto tengo que poner de pauta?
- ¿Tengo que pagar Claude Pro? → No, es opcional.
- ¿Qué permisos tengo que dar sobre mi tienda?
- ¿Sirve si mi tienda no es de Tiendanube? → Sí, los anuncios y el setup de Meta sí; el análisis automático, por ahora, solo con Tiendanube.

### No prometer
- No garantizar ventas ni resultados de la pauta.
- No prometer que el análisis detecta productos sin foto (el conector no ve las fotos).
- No prometer datos de visitas o tráfico de la tienda.

### Tono
Español rioplatense, directo, simple, sin tecnicismos. Hablarle al dueño de tú a tú.

### Estructura de la página
1. Portada: promesa + ejemplo visual fuerte + botón "Pedí tu muestra gratis".
2. Problema.
3. Calidad + precio vs. agencia: ejemplos grandes + tabla comparativa.
4. Qué incluye "Te armamos todo": los 4 bloques (análisis, anuncios, Meta, Claude).
5. Del análisis a los anuncios.
6. Cómo funciona: 4 pasos + "lo único que ponés vos".
7. Paquetes.
8. Confianza: antes/después y testimonios.
9. Preguntas frecuentes.
10. Cierre: muestra gratis + botón de WhatsApp.

### Pendientes antes de publicar
- Ejemplos reales de anuncios: son lo que más vende en esta página.
- Precio de referencia de agencias o productoras de video en Argentina, para la tabla comparativa.
- Precio del paquete "Todo armado".
- Qué incluye exactamente el setup de Meta y si se ofrece gestión de pauta.
- Testimonios.
