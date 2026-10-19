import { site } from "@/config/site";

// Claqueta de cada sección: "TOMA 0X", nombre de la escena y producción.
export function Toma({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-stretch border-y border-line font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:text-xs">
      <span className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-line py-2 pr-4 text-foreground">
        <span className="h-1.5 w-1.5 bg-rec" aria-hidden />
        Toma {n}
      </span>
      <span className="flex min-w-0 items-center truncate border-r border-line px-4 py-2">Esc. {label}</span>
      <span className="ml-auto hidden items-center py-2 pl-4 sm:flex">{site.name}</span>
    </div>
  );
}
