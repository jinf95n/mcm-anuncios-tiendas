import type { ElementType } from "react";

type Props = {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
};

// Título en serif: cada ítem es una línea y lo que va entre *asteriscos* sale en itálica.
// Fuera de la portada entra por líneas (Reveals).
export function Title({ lines, as: Tag = "h2", className = "" }: Props) {
  return (
    <Tag data-reveal={Tag === "h1" ? undefined : "title"} className={`font-serif leading-[1.02] tracking-[-0.02em] text-balance ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.split(/(\*[^*]+\*)/).map((part, j) =>
            part.startsWith("*") ? (
              <em key={j} className="italic">
                {part.slice(1, -1)}
              </em>
            ) : (
              part
            ),
          )}
        </span>
      ))}
    </Tag>
  );
}
