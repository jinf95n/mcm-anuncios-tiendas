// Datos del cliente. Todo el sitio lee de acá: nunca hardcodear estos datos en componentes.

export const site = {
  name: "Take One",
  author: "MCM Digital",
  description: "Descripción corta para Google (máx. 160 caracteres).",
  url: "https://www.dominio-del-cliente.com.ar",
  locale: "es_AR",
  ogImage: "/og.jpg", // 1200x630 en /public

  contact: {
    whatsapp: "5492645581677", // formato internacional, sin + ni espacios
    whatsappMessage: "Hola! Quiero consultar por Take One.",
    phone: "+54 264 558-1677",
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
