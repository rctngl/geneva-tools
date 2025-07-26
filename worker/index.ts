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

    // Close response so that it is no longer immutable
    const response = new Response(assetResponse.body, assetResponse)

    // Add CORS headers
    response.headers.append("Access-Control-Allow-Origin","*")
    response.headers.append("Access-Control-Allow-Methods","GET")
    response.headers.append("Access-Control-Max-Age","600")

    return response

  }
}