import { AutoVideo } from "@/components/motion/AutoVideo";

type Props = {
  src: string;
  poster: string;
  label?: string;
  className?: string;
};

// Video vertical tipo reel, como monitor de edición: marcas de encuadre y rótulo.
// Arranca con el poster y carga diferida; se reproduce solo mientras está a la vista.
export function Reel({ src, poster, label, className = "" }: Props) {
  return (
    <figure className={`relative aspect-[9/16] overflow-hidden rounded-[4px] bg-surface ${className}`}>
      <AutoVideo className="absolute inset-0 h-full w-full object-cover" src={src} poster={poster} />
      <FrameMarks />
      {label && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-3 pt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

// Esquinas finas de encuadre, como en el monitor de la isla de edición.
export function FrameMarks({ inset = "inset-3" }: { inset?: string }) {
  const corner = "absolute h-4 w-4 border-foreground/60";
  return (
    <div className={`pointer-events-none absolute ${inset}`} aria-hidden>
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}
