import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
  async fetch(request: Request) {
    
    // Fetch Asset
    const assetResponse = await this.env.ASSETS.fetch(request);

    // Add CORS Headers
    return new Response(assetResponse.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
      }
    });

  }
}