# Fastest - Ghost CMS Theme

Minimal, fast Ghost theme with Tailwind CSS and dark mode.

<details>
<summary> Demo </summary>

<video src="https://github.com/user-attachments/assets/612c6f95-d7af-4caa-8e13-ceb2c49a1c16" width="600"></video>

<div style="display:flex;gap:12px;flex-wrap:wrap;">

> Image 1
![Desktop Demo](./assets/demo.png)
> Image 2
![Desktop Demo 2](./assets/demo-2.png)
> Image 3
![Desktop Demo 3](./assets/demo-3.png)
> Image 4
![Desktop Demo 4](./assets/demo-4.png)
> Image 5
![Desktop Demo 5](./assets/demo-5.png)
> Image 6
![Desktop Demo 6](./assets/demo-6.png)
> Image 7
![Desktop](./assets/desktop.png)
> Image 8
![Mobile](./assets/mobile.png)

</div>

</details>

## Install (zip from latest release)

1. Visit the latest releases page: <https://github.com/frontendweb3/fastest/releases/latest>
2. Download the packaged theme zip (e.g., `fastest-3.0.3.zip`).
3. In Ghost Admin: `Settings → Design → Change theme → Upload theme`, pick the downloaded zip, then Activate.

## Install (from source)

1. `git clone https://github.com/frontendweb3/fastest.git && cd fastest`
2. `pnpm install` (or `npm install` / `yarn install`)
3. Build or watch assets:
	- Install package: `pnpm install`
	- Watch: `pnpm dev`
	- Build: `pnpm build`
4. Upload the generated zip (if you create one) or the repo zip via Ghost Admin as above.

## Customization

- Configure colors, logos, and toggles in Ghost Admin → Settings → Design → Theme settings.
- Typography and prose colors respect the theme custom settings for light/dark modes.
- Includes search, comments, code highlighting, and responsive cards.
