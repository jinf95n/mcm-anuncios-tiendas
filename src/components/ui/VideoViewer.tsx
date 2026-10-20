"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { content } from "@/config/content";
import { WhatsAppButton } from "./WhatsAppButton";

const { viewer } = content;

type Clip = { src: string; poster: string; label: string };

// Visor a pantalla completa de los videos de ejemplo. Un solo detector de clics para toda la
// página: cualquier botón con data-video abre el visor con ese video, desde el principio y con
// sonido si lo tiene. Cierra con el botón, con Esc (lo da <dialog>) o tocando fuera del video.
// El CTA manda a WhatsApp con el rótulo del video (data-wa="visor" para el Pixel).
export function VideoViewer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clip, setClip] = useState<Clip | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.<HTMLElement>("[data-video]");
      if (!trigger) return;
      e.preventDefault();
      setClip({
        src: trigger.dataset.video!,
        poster: trigger.dataset.poster ?? "",
        label: trigger.dataset.label ?? "",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Al elegir un video: abre el modal, frena el scroll de fondo y arranca desde 0.
  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!clip || !dialog || !video) return;
    if (!dialog.open) dialog.showModal();
    lenis?.stop();
    video.currentTime = 0;
    // El clic del visitante habilita el sonido; si el navegador lo bloquea, va sin sonido.
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [clip, lenis]);

  const close = () => dialogRef.current?.close();

  // onClose cubre los tres caminos (botón, Esc y clic afuera).
  const onClose = () => {
    videoRef.current?.pause();
    lenis?.start();
    setClip(null);
  };

  const message = clip?.label ? viewer.message.replace("{video}", clip.label) : viewer.emptyMessage;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // Clic en el fondo (el propio <dialog>, no su contenido): cierra.
        if (e.target === e.currentTarget) close();
      }}
      aria-label={clip?.label || viewer.open}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-background/95 p-0 text-foreground backdrop:bg-background/80"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-10 md:py-5">
          <p className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:text-[12px]">{clip?.label}</p>
          <button
            type="button"
            onClick={close}
            className="flex h-11 shrink-0 items-center gap-3 border border-line px-4 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-150 hover:border-foreground"
          >
            {viewer.close}
            <span className="relative h-3 w-3" aria-hidden>
              <span className="absolute inset-x-0 top-1/2 h-px rotate-45 bg-foreground" />
              <span className="absolute inset-x-0 top-1/2 h-px -rotate-45 bg-foreground" />
            </span>
          </button>
        </div>

        <div className="relative min-h-0 flex-1 px-5 md:px-10" onClick={(e) => e.target === e.currentTarget && close()}>
          <video
            ref={videoRef}
            key={clip?.src}
            src={clip?.src}
            poster={clip?.poster}
            controls
            playsInline
            preload="auto"
            className="mx-auto h-full max-w-full rounded-[4px] bg-surface object-contain"
          />
        </div>

        <div className="flex justify-center px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:py-6">
          <WhatsAppButton message={message} size="lg" track="visor" className="w-full sm:w-auto">
            {viewer.cta}
          </WhatsAppButton>
        </div>
      </div>
    </dialog>
  );
}
