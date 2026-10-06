/** Cloudflare Worker entry point for the dive-map prototype. */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
