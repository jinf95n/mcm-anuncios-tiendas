// Datos del cliente. Todo el sitio lee de acá: nunca hardcodear estos datos en componentes.

export const site = {
  name: "Take One",
  author: "MCM Digital",
  // Título para Google y redes (el nombre va adelante).
  title: "Take One · Anuncios con calidad de agencia para tu tienda online",
  description:
    "Anuncios con calidad de agencia para tu tienda online, por una fracción del precio y decididos con los datos de tu tienda. Pedí tu muestra gratis.",
  url: "https://takeone.mcmdigital.com.ar", // provisional
  // false mientras haya contenido de relleno: noindex + robots.txt bloqueado.
  indexable: false,
  locale: "es_AR",
  ogImage: "/og.jpg", // 1200x630 en /public

  contact: {
    whatsapp: "5492645581677", // formato internacional, sin + ni espacios
    whatsappMessage: "Hola! Quiero consultar por Take One.",
    phone: "+54 264 558-1677",
    email: "", // [PENDIENTE]
  },

  address: {
    street: "",
    city: "San Juan",
    region: "San Juan",
    postalCode: "",
    country: "AR",
  },

  social: {
    instagram: "", // [PENDIENTE]
    facebook: "",
    linkedin: "",
  },

  // Tipo de schema.org para datos estructurados: LocalBusiness, LegalService,
  // MedicalBusiness, Restaurant, RealEstateAgent, ProfessionalService, Service, etc.
  // Service: el servicio (Take One) con MCM Digital como proveedor.
  schemaType: "Service",

  // Rutas del sitio para el sitemap. Agregar las nuevas páginas acá.
  routes: ["/"],
} as const;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
