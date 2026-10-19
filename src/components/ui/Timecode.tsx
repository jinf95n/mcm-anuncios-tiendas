// Timecode como indicador de progreso del scroll (HH:MM:SS:FF).
// Por ahora es estático; avanzar con el scroll se arma en el paso 8.
export function Timecode({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-[12px] tabular-nums tracking-[0.08em] text-muted md:text-[13px] ${className}`}
      aria-hidden
    >
      <span className="rec-dot" />
      <span className="text-foreground">00:00:00:00</span>
    </p>
  );
}
