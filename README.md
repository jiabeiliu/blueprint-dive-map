# BLUEPRINT — Dive Destination Explorer

An interactive product prototype for exploring seven sample dive destinations. The interface lets visitors search by destination or marine life, select a month, inspect a sample season calendar, and save spots during the current browser session. It is a frontend demonstration, **not** a live dive-planning or safety service.

## What works

- Search the seven local sample records by destination, country, wildlife, or tag. A query such as `10月 锤头鲨` selects a matching example and month.
- Select spots on the globe or in the list, switch months, and inspect the corresponding sample season window.
- Save individual spots in the current page session and explore clearly labelled concept panels for providers, community, a smart mask, and a tour.
- Responsive Chinese-language interface built with React, Next.js-compatible `vinext`, and Cloudflare Workers/Vite for deployment.

## What is *not* implemented

There is no AI-model call, live ocean-condition feed, real booking or provider integration, user account, persistent save, community backend, camera scanner, or 3D tour. The seven destinations and seasonal/condition values are illustrative sample data stored in [`app/page.tsx`](app/page.tsx), not verified forecasts. Do not use this prototype to decide whether a dive is safe; check current local conditions with a qualified dive operator.

## Run locally

Requirements: Node.js 22.13 or newer and pnpm (the repository uses `pnpm-lock.yaml`).

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by the development server. No API key or database is required.

## Verify

```bash
pnpm exec tsc --noEmit
pnpm test
```

`pnpm test` builds the production bundle and performs an HTTP smoke test against the rendered page. The test checks that the demo is labelled honestly and does not present old claims about live updates, AI predictions, or large-scale usage as facts.

## Architecture and next steps

The spot records and season windows live in the client component at [`app/page.tsx`](app/page.tsx). Search and selection are deterministic; the server only renders and serves the application. [`worker/index.ts`](worker/index.ts) is the Cloudflare Worker entry point. The `.openai/hosting.json` manifest has no D1 or R2 binding.

A production dive planner would need sourced, dated destination data; live-condition providers with provenance and failure handling; safety review by qualified divers; accessibility testing; and user research. Those are future work, not features of this demo.
