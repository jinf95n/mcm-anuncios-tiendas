import { site } from "@/config/site";

// Wordmark tipográfico: punto REC + "Take One" en serif, "One" en itálica.
export function Wordmark({ className = "" }: { className?: string }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <span className={`inline-flex items-baseline gap-2 whitespace-nowrap font-serif leading-none ${className}`}>
      <span className="h-[0.32em] w-[0.32em] -translate-y-[0.06em] rounded-full bg-rec" aria-hidden />
      <span>
        {first} <em className="italic">{rest.join(" ")}</em>
      </span>
    </span>
  );
}
