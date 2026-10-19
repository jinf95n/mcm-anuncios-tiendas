/*
  Contrato de dirección (impeccable, código directo).
  THESIS: la página es una isla de edición; los anuncios son la toma y la interfaz es el editor. Rechaza la landing SaaS de tarjetas con íconos.
  OWN-WORLD: negro cálido #0E0D0B, crema #F2EDE4, un solo rojo REC #FF3B1F para CTA y números; Instrument Serif, Inter Tight, JetBrains Mono; claquetas, timecode, marcas de encuadre, grano.
  STORY: el dueño entiende que recibe anuncios con calidad de agencia decididos con sus datos, por una fracción del precio, y pide su muestra gratis por WhatsApp.
  FIRST VIEWPORT: claqueta TOMA 01; "Te armamos todo." en serif enorme a la izquierda; CTA rojo e input del link debajo; muro de reels desfasado a la derecha (abajo en celular).
  FORM: estructura aprobada de 13 tomas (BRIEF.md → Estructura); dirección fijada en DESIGN.md, sin sorteo.
  FINISH: revisión visual en el paso 10 (critique + polish).
*/
import { Header } from "@/components/ui/Header";
import { MobileCta } from "@/components/ui/MobileCta";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Formats } from "@/components/sections/Formats";
import { Versus } from "@/components/sections/Versus";
import { Includes } from "@/components/sections/Includes";
import { Analysis } from "@/components/sections/Analysis";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Gallery } from "@/components/sections/Gallery";
import { Pricing } from "@/components/sections/Pricing";
import { Trust } from "@/components/sections/Trust";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Formats />
        <Versus />
        <Includes />
        <Analysis />
        <BeforeAfter />
        <HowItWorks />
        <Gallery />
        <Pricing />
        <Trust />
        <Faq />
        <Closing />
      </main>
      <MobileCta />
    </>
  );
}
