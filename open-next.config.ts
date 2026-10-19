import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Sin caché incremental en R2: las páginas estáticas se sirven desde assets.
// Si un cliente necesita ISR / revalidación, ver https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({});
