// Recibe formularios del sitio y los reenvía al webhook de n8n (CONTACT_WEBHOOK_URL).
// El diseño del formulario se hace por cliente; desde el front usar `sendContact` de @/lib/contact.

export async function POST(request: Request) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ ok: false, error: "Webhook no configurado" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Datos inválidos" }, { status: 400 });
  }

  // Honeypot anti-spam: el form incluye un campo oculto "website" que un humano no completa.
  if (body.website) return Response.json({ ok: true });

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, origen: request.headers.get("referer") ?? "", fecha: new Date().toISOString() }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "No se pudo enviar" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
