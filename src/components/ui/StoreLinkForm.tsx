"use client";

import type { FormEvent } from "react";
import { whatsappUrl } from "@/config/site";
import { trackContact } from "@/lib/pixel";

type Props = {
  label: string;
  placeholder: string;
  button: string;
  emptyMessage: string;
  // {link} se reemplaza por lo que pegue el visitante.
  message: string;
};

// "Pegá el link de tu tienda": abre WhatsApp con el link en el mensaje. Nunca bloquea:
// acepta el link con o sin https://, o solo el nombre; vacío, manda el mensaje base.
// No guarda nada.
export function StoreLinkForm({ label, placeholder, button, emptyMessage, message }: Props) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const link = String(new FormData(e.currentTarget).get("store") ?? "").trim();
    // whatsappUrl codifica el texto con encodeURIComponent.
    const url = whatsappUrl(link ? message.replace("{link}", link) : emptyMessage);
    window.open(url, "_blank", "noopener,noreferrer");
    trackContact("toma-01");
  };

  return (
    <form data-hero-fade className="mt-10 max-w-[460px]" onSubmit={onSubmit} noValidate>
      <label htmlFor="store-link" className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
        {label}
      </label>
      <div className="mt-2 flex border border-line focus-within:border-foreground">
        <input
          id="store-link"
          name="store"
          type="text"
          inputMode="url"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[16px] text-foreground placeholder:text-foreground/40 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 border-l border-line px-4 text-[14px] font-semibold text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background"
        >
          {button}
        </button>
      </div>
    </form>
  );
}
