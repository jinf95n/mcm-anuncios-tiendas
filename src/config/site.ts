// Datos del cliente. Todo el sitio lee de acá: nunca hardcodear estos datos en componentes.

export const site = {
  name: "Nombre del cliente",
  description: "Descripción corta para Google (máx. 160 caracteres).",
  url: "https://www.dominio-del-cliente.com.ar",
  locale: "es_AR",
  ogImage: "/og.jpg", // 1200x630 en /public

  contact: {
    whatsapp: "5492640000000", // formato internacional, sin + ni espacios
    whatsappMessage: "Hola! Quería hacer una consulta.",
    phone: "+54 264 000-0000",
    email: "contacto@dominio-del-cliente.com.ar",
  },

  address: {
    street: "",
    city: "San Juan",
    region: "San Juan",
    postalCode: "",
    country: "AR",
  },

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },

  // Tipo de schema.org para datos estructurados: LocalBusiness, LegalService,
  // MedicalBusiness, Restaurant, RealEstateAgent, ProfessionalService, etc.
  schemaType: "LocalBusiness",

  // Rutas del sitio para el sitemap. Agregar las nuevas páginas acá.
  routes: ["/"],
} as const;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
