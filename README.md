<div align="center">

<img src="brand/beatrice-app-icon.svg" alt="Beatrice" width="128" />

# Beatrice — Website

**The official website for Beatrice, the free, open-source real-time AI voice changer for Mac and Windows.**

[![Website](https://img.shields.io/badge/Website-project--beatrice.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://project-beatrice.vercel.app/)
[![GitHub Org](https://img.shields.io/badge/GitHub-Project--Beatrice--V2-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Project-Beatrice-V2)
[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=for-the-badge)](LICENSE)

</div>

---

## What's here

- **Home**: a scroll-driven WebGL "voice" (three.js) that morphs from orb to waveform to ring, reacts to your microphone on request, and tells the story of how Beatrice converts a voice.
- **Download**: per-OS downloads that always point at the latest release.
- **Voices**: all 112 built-in voices, with names and avatars generated from the app's own model files (`scripts/build-voices.mjs`) so they match the app exactly.
- **Guides**: install, routing to Discord/Zoom/OBS, tuning, soundboard, custom models, training, troubleshooting and the local API.
- **About**: story, principles and contributors.
- English, 日本語 and 中文.
- A live total of GitHub stars across all Beatrice repositories (`api/stars.ts`, cached for an hour on Vercel).

Design system and logo: see [`DESIGN.md`](DESIGN.md) and [`brand/`](brand/).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · three.js · GSAP ScrollTrigger · Lenis · Geist. Hosted on **Vercel**.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Regenerate the voice library after the app's models change:

```bash
node scripts/build-voices.mjs ../Beatrice-voicechanger-mac
```

## Deploy

Every push to `main` deploys to [project-beatrice.vercel.app](https://project-beatrice.vercel.app/). The old GitHub Pages address (`project-beatrice-v2.github.io/Beatrice-website/`) forwards there, keeping the page path.

## License

[MIT](LICENSE). Beatrice voice engine by [prj-beatrice](https://prj-beatrice.com/). JVS corpus voices are for non-commercial use only.
