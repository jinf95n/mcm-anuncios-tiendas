// Worker propio: envuelve el de OpenNext para servir /media/* con pedidos parciales (Range).
// Los assets de Workers responden 200 con el archivo entero aunque se pida un rango, y Safari en
// iPhone necesita 206 para reproducir video. wrangler.jsonc manda /media/* acá (run_worker_first).
// Lo genera `opennextjs-cloudflare build`: antes del build no existe, después sí (por eso ts-ignore).
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { default as handler } from "./.open-next/worker.js";

type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };
type Ctx = unknown;

// Rango de un solo tramo: "bytes=a-b", "bytes=a-" o "bytes=-n". null = ignorar (se manda entero).
function parseRange(header: string, size: number): { start: number; end: number } | "unsatisfiable" | null {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === "" && m[2] === "")) return null;
  let start: number;
  let end: number;
  if (m[1] === "") {
    // Últimos n bytes.
    const n = Number(m[2]);
    if (n === 0) return "unsatisfiable";
    start = Math.max(0, size - n);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) return "unsatisfiable";
  return { start, end };
}

async function serveMedia(request: Request, env: Env): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  // Siempre el archivo completo desde assets; el recorte lo hacemos acá.
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (!asset.ok) return asset;

  const body = await asset.arrayBuffer();
  const size = body.byteLength;
  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.delete("Content-Encoding");

  const isHead = request.method === "HEAD";
  const rangeHeader = request.headers.get("Range");
  const range = rangeHeader ? parseRange(rangeHeader, size) : null;

  if (range === "unsatisfiable") {
    headers.set("Content-Range", `bytes */${size}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }

  if (range) {
    const length = range.end - range.start + 1;
    headers.set("Content-Range", `bytes ${range.start}-${range.end}/${size}`);
    headers.set("Content-Length", String(length));
    return new Response(isHead ? null : body.slice(range.start, range.end + 1), { status: 206, headers });
  }

  headers.set("Content-Length", String(size));
  return new Response(isHead ? null : body, { status: 200, headers });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith("/media/")) return serveMedia(request, env);
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
