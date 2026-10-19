import { site } from "@/config/site";

// Página vacía a propósito: se construye con /nuevo-sitio a partir de BRIEF.md y DESIGN.md.
export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <h1>{site.name}</h1>
    </main>
  );
}
