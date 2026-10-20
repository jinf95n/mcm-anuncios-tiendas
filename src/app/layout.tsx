import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/config/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactTracker } from "@/components/seo/ContactTracker";
import { MetaPixel } from "@/components/seo/MetaPixel";
import "./globals.css";

// Tipografías según DESIGN.md, expuestas como variables CSS en <html>.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.author }],
  alternates: { canonical: "/" },
  // Versión de prueba (site.indexable false): que Google no la indexe.
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.title }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="font-sans">
        <JsonLd />
        <MetaPixel />
        <ContactTracker />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
