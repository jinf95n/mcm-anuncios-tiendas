import type { ReactNode } from "react";
import { whatsappUrl } from "@/config/site";

type Props = {
  message: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: "btn-primary bg-rec text-background hover:bg-foreground",
  ghost: "border border-line text-foreground hover:border-foreground",
};

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-[17px]",
};

// Único CTA del sitio: abre WhatsApp con el mensaje de la sección.
// data-wa queda como gancho para el evento "Contact" del Pixel (paso 9).
export function WhatsAppButton({ message, children, variant = "primary", size = "md", className = "", onClick }: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-wa
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[5px] font-semibold tracking-[-0.01em] transition-colors duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span className="rec-dot" aria-hidden />
      {children}
    </a>
  );
}
