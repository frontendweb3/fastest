# Contributing

- License: MIT. All contributions are MIT.
- Stack: Ghost theme using Handlebars, Tailwind CSS, esbuild, and Ghost helpers.

## Quick Start

1. Clone: `git clone https://github.com/frontendweb3/fastest.git && cd fastest`
2. Install: `pnpm install` (or `npm install` / `yarn install`)
3. Develop (watch mode): `pnpm dev` to rebuild Tailwind/JS on change.
4. Build once: `pnpm build` (or `npm run build` / `yarn build`). Outputs to `assets/dist`.
5. Format: `pnpm format` (or `npm run format` / `yarn format`).
6. Theme checks: `pnpm test-v6` for Ghost 6, `pnpm test-v5` for Ghost 5.

## Contrib Tips

- Keep changes small and focused; include relevant templates/partials and CSS/JS.
- Run the build/watch before committing to ensure assets are up to date.
- Follow existing style and accessibility patterns (semantic HTML, ARIA where needed).
- Avoid committing console logs or unused code.
