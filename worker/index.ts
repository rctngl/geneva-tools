import { WorkerEntrypoint } from "cloudflare:workers"

/*

    Local Development Support
    -------------------------

    This worker is only used when accessing assets in local
    wrangler development. In production, the standard cloudflare
    cache is used with default headers.

*/

export default class extends WorkerEntrypoint<Env> {
  async fetch(request: Request) {
    
    // Fetch Asset
    const assetResponse = await this.env.ASSETS.fetch(request)

    // Return bad request if asset fetch failed 
    if (assetResponse.ok == false) {
      return assetResponse
    }

    // Add CORS Headers for local development
    return new Response(assetResponse.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Max-Age": "600",
      }
    })

  }
}