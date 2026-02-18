# AI Wise Spaces

AI Wise Spaces is an Astro site for a Pennsylvania marketing and website partner focused on AI visibility, website clarity, structured content, and local SEO.

The site is written to support businesses looking for marketing help with their website in Lancaster, Harrisburg, York, Allentown, Philadelphia, and the surrounding Pennsylvania market.

## What The Site Offers

- AI visibility audits
- AI-ready website builds
- Structured content strategy
- Local SEO and technical website improvements
- Marketing help for businesses that need a clearer website, stronger service pages, and better lead flow

## Local SEO Focus

The site copy and metadata target businesses searching for:

- website marketing help in Lancaster PA
- marketing help for small businesses in Harrisburg
- website and SEO help in York PA
- local SEO and website strategy in Allentown
- marketing help for service businesses in Philadelphia

## Project Structure

```text
/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── features/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── vercel.json
```

## Commands

All commands are run from the project root.

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local Astro dev server |
| `npm run build` | Build the production site |
| `npm run preview` | Preview the production build locally |
| `npm run astro check` | Run Astro diagnostics |
| `npm test` | Run tests |

## SEO Notes

- Shared metadata lives in `src/layouts/Layout.astro`
- Main local-market messaging lives in `src/pages/index.astro`, `src/pages/services.astro`, `src/pages/process.astro`, `src/pages/pricing.astro`, and `src/pages/book-a-free-audit.astro`
- Reusable market-facing copy lives in `src/data/siteContent.js`
- Structured data for the homepage is defined in `src/pages/index.astro`

## Deployment

This project is configured for Vercel deployment and includes security headers in `vercel.json`.
