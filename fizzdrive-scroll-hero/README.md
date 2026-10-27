# FizzDrive — Scroll-Driven Hero

A responsive automotive landing page built with Next.js, React, TypeScript, Tailwind CSS and GSAP. The hero is pinned during a scroll sequence; the car moves according to scroll progress rather than autoplay. The managed site uses the generated coupe artwork, while local and GitHub Pages builds use the bundled vector fallback so the experience remains self-contained.

## Requirements

- Node.js 22.13 or newer
- npm 10.9.2 (pinned in `package.json`)

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Check the code and create the production-ready static export in `out/` with:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy to GitHub Pages

The included `.github/workflows/deploy-pages.yml` builds the static export and deploys it whenever changes are pushed to `main`. Create a GitHub repository named `fizzdrive-scroll-hero`, push this project to its `main` branch, then enable GitHub Pages with **GitHub Actions** as the source in the repository's Pages settings. The workflow builds with `/fizzdrive-scroll-hero` as the project subpath; change `NEXT_PUBLIC_BASE_PATH` in the workflow if you use a different repository name. For a `username.github.io` root site, set it to an empty string.

The managed static build sets `NEXT_PUBLIC_USE_MANAGED_CAR=1` to use the custom generated artwork from project storage. If that asset fails to load, the page falls back to `public/car-fallback.svg`.

The same static export can also be hosted on Cloudflare Pages, Netlify, or through the connected Manus WebDev publishing flow.

## Motion behavior

The headline and impact metrics have staggered entrance animations. GSAP ScrollTrigger pins the hero and scrubs the car's transform along a timeline as the user scrolls. A reduced-motion media query disables animated movement and pinning.
