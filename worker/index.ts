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

    // If not local dev or production app, block.
    // Revisit this in the future... seems a bit overkill...
    const origin = request.headers.get('origin')
    console.log({origin: origin, env: this.env.APP_URL})

    if (origin !== this.env.APP_URL) {
      return new Response(null, {
        status: 400
      })
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