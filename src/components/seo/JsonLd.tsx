import { site } from "@/config/site";

// Datos estructurados (schema.org) para Google: el servicio (Take One) y quien lo presta
// (MCM Digital). Los campos vacíos (email, redes) no se publican.
export function JsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": site.schemaType,
    name: site.name,
    description: site.description,
    url: site.url,
    image: new URL(site.ogImage, site.url).toString(),
    areaServed: { "@type": "Country", name: "Argentina" },
    provider: {
      "@type": "Organization",
      name: site.author,
      telephone: site.contact.phone,
      ...(site.contact.email ? { email: site.contact.email } : {}),
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      ...(sameAs.length ? { sameAs } : {}),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
