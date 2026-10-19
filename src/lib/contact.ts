export type ContactPayload = Record<string, string> & { website?: string };

// Envía un formulario a /api/contact. Devuelve true si llegó bien.
export async function sendContact(data: ContactPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
