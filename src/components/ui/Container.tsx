import type { ReactNode } from "react";

// Ancho y márgenes comunes a todas las secciones.
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 ${className}`}>{children}</div>;
}
