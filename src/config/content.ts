// Textos, precios y rutas de medios de la página. Todo es borrador o relleno hasta
// que lleguen los definitivos. El número de WhatsApp sale de site.ts (whatsappUrl).
// Medios en /public/media/: se reemplazan con el mismo nombre, sin tocar componentes.

const media = (file: string) => `/media/${file}`;

// Video de relleno: el poster es un .jpg con el mismo nombre.
const video = (name: string) => ({ src: media(`${name}.mp4`), poster: media(`${name}.jpg`) });

export const content = {
  header: {
    cta: "Pedí tu muestra",
    message: "Hola! Quiero mi muestra gratis.",
  },

  hero: {
    toma: { n: "01", label: "Portada" },
    title: ["Te armamos", "*todo.*"],
    subtitle:
      "Anuncios con calidad de agencia, por una fracción del precio. Y decididos con los datos de tu tienda.",
    cta: "Pedí tu muestra gratis",
    message: "Hola! Quiero mi muestra gratis.",
    storeInput: {
      label: "Pegá el link de tu tienda",
      placeholder: "tutienda.com.ar",
      button: "Enviar por WhatsApp",
      // Sin link: mensaje base. Con link: {link} se reemplaza por lo que pegue el visitante.
      emptyMessage: "Hola, quiero mi muestra gratis",
      message: "Hola, quiero mi muestra gratis. Esta es mi tienda: {link}",
    },
    note: "Gratis, con un producto tuyo. Sin compromiso.",
    reels: ["hero-1", "hero-2", "hero-3", "hero-4", "hero-5", "hero-6"].map(video),
  },

  problem: {
    toma: { n: "02", label: "Problema" },
    title: ["Anunciar hoy te sale caro", "o se nota *casero.*"],
    // Notas de edición: cada dolor lleva un timecode como marca de la toma.
    pains: [
      { tc: "00:00:03", text: "Una agencia o productora es cara y tarda semanas." },
      { tc: "00:00:07", text: "Los anuncios caseros se ven caseros, y no venden." },
      { tc: "00:00:12", text: "Se anuncia a ojo: el producto con 80 en stock que nadie empuja sigue ahí." },
      { tc: "00:00:18", text: "Configurar Meta, la cuenta publicitaria y la conexión con la tienda es un lío." },
      { tc: "00:00:24", text: "Cyber, Black Friday, Navidad, Hot Sale: cada fecha pide anuncios nuevos." },
      { tc: "00:00:31", text: "Subir precios, revisar stock, pedidos pagados sin despachar: horas que no tenés." },
    ],
  },

  formats: {
    toma: { n: "03", label: "Formatos" },
    title: ["Calidad de *comercial.*", "Con tu producto real."],
    intro:
      "Partimos del link de tu producto: tus fotos, tu logo y tus colores. Sin rodaje, sin modelos, sin locación.",
    // vertical: en pantallas horizontales se muestra entero, centrado, sobre su versión desenfocada.
    items: [
      {
        name: "Foto de estudio",
        detail: "Tu producto con luz y fondo de estudio, sin sacar una foto.",
        stat: "Sin sesión de fotos",
        vertical: false,
        media: { type: "image" as const, src: media("formato-estudio.jpg") },
      },
      {
        name: "Estático",
        detail: "Piezas para feed e historias, listas para pautar.",
        stat: "20 versiones",
        vertical: true,
        media: { type: "image" as const, src: media("formato-estatico.jpg") },
      },
      {
        name: "Comercial",
        detail: "Video con ritmo y escenas de comercial, con tu producto como protagonista.",
        stat: "Listo en días",
        vertical: false,
        media: { type: "video" as const, ...video("formato-comercial") },
      },
      {
        name: "UGC",
        detail: "Una persona recomendando tu producto, como en un reel.",
        stat: "Sin modelos ni rodaje",
        vertical: true,
        media: { type: "video" as const, ...video("formato-ugc") },
      },
    ],
    cta: "Quiero ver formatos para mi tienda",
    message: "Hola! Quiero ver qué formatos me sirven para mi tienda.",
  },

  versus: {
    toma: { n: "04", label: "Agencia vs. nosotros" },
    title: ["Lo que cobra una agencia.", "Lo que cobramos *nosotros.*"],
    agency: { label: "Agencia / productora", price: 2350 },
    us: { label: "Take One", price: 150 },
    priceNote: "20 piezas, desde. Solo piezas: el setup de Meta va aparte.",
    rows: [
      { label: "Precio de 20 piezas", agency: "Desde USD 2.350", us: "Desde USD 150" },
      { label: "Rodaje, modelos, locación", agency: "Sí, y se paga", us: "No hace falta" },
      { label: "Tiempo de entrega", agency: "Semanas", us: "Días" },
      { label: "Versiones para probar", agency: "Pocas, cada cambio cuesta", us: "Muchas versiones del mismo producto" },
      { label: "Qué producto se anuncia", agency: "Lo que decidís vos", us: "Lo que conviene según los datos de tu tienda" },
      { label: "Meta configurado", agency: "Aparte, desde USD 500", us: "Incluido en Todo armado" },
    ],
    footnote: "Referencia: tarifario.info, sept. 2026.",
    why: {
      title: "Por qué es más barato sin ser peor",
      text: "Sin rodaje, sin modelos, sin locación y sin equipo de filmación. Tu producto real, en escenas con calidad de comercial.",
    },
    // Fórmula de relleno (BRIEF.md), solo piezas: agencia = fotos × 35 + videos × 200;
    // nosotros = máx(150, piezas × 7,5). Mínimo 20 piezas en total (Pack anuncios),
    // así la comparación nunca se da vuelta (20 fotos: USD 700 vs. USD 150).
    calculator: {
      title: "Calculá tu pedido",
      photos: { label: "Fotos", initial: 10, agencyUnit: 35 },
      videos: { label: "Videos", initial: 10, agencyUnit: 200 },
      min: 20,
      minNote: "Mínimo 20 piezas (Pack anuncios)",
      max: 100,
      usUnit: 7.5,
      usMin: 150,
      agencyLabel: "Agencia",
      usLabel: "Nosotros",
    },
    cta: "Quiero mi presupuesto",
    // {piezas}, {fotos} y {videos} salen de la calculadora, con su plural ("1 foto", "10 fotos").
    message: "Hola! Calculé {piezas} ({fotos} y {videos}) y quiero mi presupuesto.",
  },

  includes: {
    toma: { n: "05", label: "Qué incluye" },
    title: ["Te armamos *todo.*", "Vos solo ponés la pauta."],
    // Cada servicio es una pista de la línea de tiempo de edición.
    tracks: [
      {
        track: "A1",
        name: "Análisis de tu tienda",
        text: "Miramos tus ventas y tu stock y decidimos qué productos conviene anunciar.",
        optional: false,
      },
      {
        track: "V1",
        name: "Anuncios",
        text: "Fotos y videos con calidad de comercial, a una fracción del precio de una agencia.",
        optional: false,
      },
      {
        track: "V2",
        name: "Meta configurado",
        text: "Cuenta publicitaria, conexión con tu tienda y primeras campañas listas para lanzar.",
        optional: false,
      },
      {
        track: "FX",
        name: "Claude conectado a tu tienda",
        text: "Para que hagas tus análisis, cambios de precios y fechas de venta hablándole. Solo con Tiendanube.",
        optional: true,
      },
    ],
    optionalLabel: "Opcional",
  },

  analysis: {
    toma: { n: "06", label: "Del análisis a los anuncios" },
    title: ["Un *dato* de tu tienda.", "Un anuncio que lo resuelve."],
    product: {
      name: "Aromatizador automático blanco",
      image: media("analisis-producto.jpg"),
      status: "Quieto",
      data: [
        { label: "Stock", value: "80" },
        { label: "Días sin venderse", value: "47" },
        { label: "Precio", value: "$ 24.900" },
      ],
    },
    ad: {
      kicker: "Liquidación",
      headline: "Último stock",
      offer: "-30%",
      cta: "Comprar ahora",
    },
    // El dato de la tienda, no un resultado: el 47 cuenta hacia arriba (paso 8).
    signal: { stock: 80, stockLabel: "en stock", days: 47, daysLabel: "días sin venderse" },
    // Tabla del brief: qué sale del análisis y qué anuncio le corresponde.
    map: [
      { data: "Más vendidos", ad: "UGC / recomendación" },
      { data: "Productos gancho para una fecha", ad: "Anuncio de oferta" },
      { data: "Quietos con mucho stock", ad: "Liquidación" },
      { data: "Productos que se compran juntos", ad: "Anuncio de combo" },
      { data: "Ficha floja en un producto que vende", ad: "Fotos nuevas de producto" },
    ],
    cta: "Quiero que analicen mi tienda",
    message: "Hola! Quiero que analicen mi tienda.",
  },

  beforeAfter: {
    toma: { n: "07", label: "Antes / después" },
    title: ["Misma tienda.", "*Otro* anuncio."],
    before: { label: "Antes", caption: "El anuncio que tenés hoy", src: media("antes-1.jpg") },
    after: { label: "Después", caption: "El que te hacemos", src: media("despues-1.jpg") },
    hint: "Arrastrá para comparar",
  },

  howItWorks: {
    toma: { n: "08", label: "Cómo funciona" },
    title: ["Cuatro pasos.", "Tres los hacemos *nosotros.*"],
    steps: [
      { title: "Nos pasás el link de tu tienda", text: "Por WhatsApp, en un mensaje." },
      { title: "Analizamos qué conviene anunciar", text: "Con los datos de tus ventas y tu stock." },
      { title: "Hacemos los anuncios y te dejamos Meta listo", text: "Fotos, videos y campañas armadas." },
      { title: "Vos ponés la pauta y lanzás", text: "Tu cuenta, tu plata, tu decisión." },
    ],
    yours: {
      title: "Lo único que ponés vos",
      items: ["La plata de la pauta.", "Si querés la herramienta, la suscripción a Claude Pro."],
    },
    cta: "Quiero arrancar",
    message: "Hola! Quiero arrancar con los anuncios para mi tienda.",
  },

  gallery: {
    toma: { n: "09", label: "Galería" },
    title: ["Mirá cómo", "*quedan.*"],
    note: "Videos de ejemplo.",
    reels: [
      { ...video("galeria-1"), label: "Accesorios · Comercial" },
      { ...video("galeria-2"), label: "Pizzería · Comercial" },
      { ...video("galeria-3"), label: "Pizzería · UGC" },
      { ...video("galeria-4"), label: "Joyería · Comercial" },
      { ...video("galeria-5"), label: "Carnicería · UGC" },
      { ...video("galeria-6"), label: "Bebidas · Comercial" },
      { ...video("galeria-7"), label: "Restaurante · Comercial" },
      { ...video("galeria-8"), label: "Pastelería · UGC" },
    ],
    cta: "Quiero anuncios así",
    message: "Hola! Vi la galería y quiero anuncios así para mi tienda.",
  },

  pricing: {
    toma: { n: "10", label: "Precios" },
    title: ["Elegí cómo", "*arrancar.*"],
    note: "Precios orientativos en dólares.",
    plans: [
      {
        name: "Muestra gratis",
        price: "Gratis",
        detail: "2 estáticos + 1 video corto de un producto tuyo.",
        cta: "Quiero mi muestra",
        message: "Hola! Quiero mi muestra gratis.",
        featured: false,
      },
      {
        name: "Pack anuncios",
        price: "Desde USD 150",
        detail: "20 piezas de un producto.",
        cta: "Quiero el pack",
        message: "Hola! Quiero el pack de 20 anuncios.",
        featured: false,
      },
      {
        name: "Todo armado",
        price: "Desde USD 490",
        detail:
          "Análisis de tu tienda + anuncios de los productos elegidos + setup de Meta + Claude conectado (opcional).",
        cta: "Quiero todo armado",
        message: "Hola! Quiero el paquete Todo armado.",
        featured: true,
      },
      {
        name: "Kit fecha",
        price: "Desde USD 260",
        detail: "Cyber, Black Friday, Navidad, Hot Sale: análisis + anuncios de 3 a 5 productos para la fecha.",
        cta: "Quiero el kit Cyber",
        message: "Hola! Quiero el kit Cyber.",
        featured: false,
      },
      {
        name: "Abono mensual",
        price: "Desde USD 320/mes",
        detail: "8 a 12 anuncios nuevos por mes, decididos con tus datos de ventas, + reporte semanal.",
        cta: "Quiero el abono",
        message: "Hola! Quiero el abono mensual.",
        featured: false,
      },
    ],
    featuredLabel: "El más elegido",
    // Chat del reporte semanal dentro del Abono: chico y sin protagonismo.
    report: {
      title: "Reporte semanal",
      sample: "Ejemplo",
      time: "Lunes 9:00",
      lines: [
        "Vendiste 14% más que la semana pasada.",
        "Más vendido: zapatilla urbana blanca (23 u.).",
        "Quietos: 6 productos con más de 40 en stock.",
        "4 pedidos pagados sin enviar.",
      ],
      actions: ["Reponer talle 39 de la zapatilla blanca.", "Liquidación del aromatizador blanco.", "Combo remera + gorra."],
      actionsLabel: "3 acciones para esta semana",
    },
  },

  trust: {
    toma: { n: "11", label: "Confianza" },
    title: ["Sin letra *chica.*"],
    promises: [
      "Tu cuenta de Meta y tu plata son tuyas.",
      "Nada cambia en tu tienda sin tu confirmación.",
      "Muestra gratis antes de pagar.",
    ],
    testimonialsLabel: "Testimonio de ejemplo",
    testimonials: [
      {
        quote: "Pensé que se iba a notar hecho a las apuradas. Los subí y nadie me preguntó quién me hizo las fotos.",
        name: "Carla M.",
        store: "Tienda de indumentaria",
      },
      {
        quote: "Lo que más me sirvió fue que me dijeran qué anunciar. Yo siempre empujaba lo mismo.",
        name: "Diego R.",
        store: "Tienda de deco",
      },
      {
        quote: "Meta me tenía loco. Me lo dejaron andando y yo solo cargo la plata.",
        name: "Sofía L.",
        store: "Tienda de accesorios",
      },
    ],
  },

  faq: {
    toma: { n: "12", label: "Preguntas" },
    title: ["Lo que siempre", "nos *preguntan.*"],
    items: [
      {
        q: "¿Los anuncios se notan hechos con IA?",
        a: "Trabajamos con tu producto real, tus fotos y tu marca, y revisamos cada pieza antes de entregarla. Igual, no nos creas: pedí la muestra gratis y juzgalo vos.",
      },
      {
        q: "¿Cuánto tardan?",
        a: "Días, no semanas. El plazo exacto depende del paquete y de la cantidad de piezas; te lo confirmamos antes de arrancar.",
      },
      {
        q: "¿Los anuncios son míos? ¿Puedo usarlos donde quiera?",
        a: "Sí. Son tuyos y los podés usar en Meta, en tu tienda, en tus redes o donde quieras.",
      },
      {
        q: "¿Cuánto tengo que poner de pauta?",
        a: "Lo decidís vos. Te sugerimos un monto para arrancar según tu tienda, pero la plata y la cuenta siempre son tuyas. No garantizamos resultados de la pauta.",
      },
      {
        q: "¿Tengo que pagar Claude Pro?",
        a: "No, es opcional. Solo lo necesitás si querés Claude conectado a tu tienda. Si no, el análisis lo hacemos nosotros con tu autorización de acceso.",
      },
      {
        q: "¿Qué permisos tengo que dar sobre mi tienda?",
        a: "Acceso a tu Tiendanube para ver ventas, productos y stock. Nada se cambia en tu tienda sin que lo veas antes y lo confirmes.",
      },
      {
        q: "¿Sirve si mi tienda no es de Tiendanube?",
        a: "Sí: los anuncios y el setup de Meta te los hacemos igual. El análisis automático y Claude conectado, por ahora, funcionan solo con Tiendanube.",
      },
    ],
    cta: "Tengo otra pregunta",
    message: "Hola! Tengo una pregunta sobre los anuncios.",
  },

  closing: {
    toma: { n: "13", label: "Cierre" },
    title: ["Tu primera *toma*", "va por nuestra cuenta."],
    text: "Mandanos el link de un producto y te hacemos la muestra gratis: 2 estáticos y 1 video corto.",
    cta: "Pedí tu muestra gratis",
    message: "Hola! Quiero mi muestra gratis.",
    // Tira de reels a sangre al final, eco del muro de la portada.
    reels: ["galeria-2", "galeria-4", "galeria-6", "galeria-8", "galeria-1", "galeria-3"].map(video),
  },

  footer: {
    by: "by MCM Digital",
    rights: "Todos los derechos reservados.",
  },
} as const;
