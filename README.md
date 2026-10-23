<div align="center">

<img src="brand/beatrice-app-icon.svg" alt="Beatrice app icon" width="132" />

# Beatrice

### Become any voice. In real time.

The official website for **Beatrice**, the free, open-source real-time AI voice changer for **Mac** and **Windows**.<br/>
112 voices · ultra-low latency · runs entirely on your computer.

<br/>

[![Website](https://img.shields.io/badge/project--beatrice.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://project-beatrice.vercel.app/)
[![Total stars](https://img.shields.io/endpoint?url=https%3A%2F%2Fproject-beatrice.vercel.app%2Fapi%2Fstars%3Fformat%3Dshields&style=for-the-badge&label=%E2%98%85%20total%20stars)](https://github.com/Project-Beatrice-V2)
[![Deployment](https://img.shields.io/github/deployments/Project-Beatrice-V2/Beatrice-website/Production?style=for-the-badge&logo=vercel&logoColor=white&label=deploy&labelColor=000000)](https://github.com/Project-Beatrice-V2/Beatrice-website/deployments)
[![License](https://img.shields.io/badge/license-MIT-white?style=for-the-badge&labelColor=000000)](LICENSE)

**[Website](https://project-beatrice.vercel.app/)** · **[Download](https://project-beatrice.vercel.app/download)** · **[All 112 voices](https://project-beatrice.vercel.app/voices)** · **[Guides](https://project-beatrice.vercel.app/docs)** · **[About](https://project-beatrice.vercel.app/about)**

<br/>

<a href="https://project-beatrice.vercel.app/"><img src="docs/media/hero.gif" alt="The Beatrice home page: a breathing particle orb behind the headline 'Become any voice. In real time.'" width="100%" /></a>

<sub>The hero is a live WebGL scene of ~26,000 particles. Click <b>“Let the orb hear you”</b> on the site and it reacts to your own voice. Audio is analysed in your browser and never sent anywhere.</sub>

</div>

---

## ✦ Scroll the story

One particle "voice" lives behind every page, and scrolling reshapes it. A grey, turbulent **orb** (your raw voice) settles into a smooth aurora (the converted voice), unspools into a glowing **waveform** for the latency moment, and opens into a **ring** around the final call to action.

<div align="center">
<img src="docs/media/scroll.gif" alt="Scrolling the Beatrice home page: the orb calms down, becomes a waveform, then the voice library appears" width="100%" />

<sub>🎬 Sharper version: <a href="docs/media/scroll.mp4">scroll.mp4</a> (1280p)</sub>
</div>

---

## ✦ By the numbers

<table>
<tr>
<td align="center" width="25%"><h1>112</h1>voices built in<br/><sub>100 JVS · 4 official · 8 classic</sub></td>
<td align="center" width="25%"><h1>~10 ms</h1>processing latency<br/><sub>16 kHz real-time pipeline</sub></td>
<td align="center" width="25%"><h1>3</h1>languages<br/><sub>English · 日本語 · 中文</sub></td>
<td align="center" width="25%"><h1>0</h1>bytes sent to the cloud<br/><sub>everything runs locally</sub></td>
</tr>
</table>

### Lighthouse (live site)

| | Performance | Accessibility | Best Practices | SEO | First paint | Largest paint |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| 🖥️ **Desktop** | ![96](https://img.shields.io/badge/96-0cce6b?style=flat-square) | ![100](https://img.shields.io/badge/100-0cce6b?style=flat-square) | ![100](https://img.shields.io/badge/100-0cce6b?style=flat-square) | ![100](https://img.shields.io/badge/100-0cce6b?style=flat-square) | 0.9 s | 0.9 s |
| 📱 **Mobile** | ![82](https://img.shields.io/badge/82-ffa400?style=flat-square) | ![100](https://img.shields.io/badge/100-0cce6b?style=flat-square) | ![100](https://img.shields.io/badge/100-0cce6b?style=flat-square) | ![100](https://img.shields.io/badge/100-0cce6b?style=flat-square) | 2.4 s | 4.1 s |

<sub>Lighthouse 12, October 2026, on a normal network route. The page itself ships <b>~163 KB</b> of gzipped JavaScript. three.js (114 KB) loads <i>after</i> the page appears, so text and buttons never wait for the 3D scene.</sub>

---

## ✦ A look around

<table>
<tr>
<td width="50%"><img src="docs/media/latency.jpg" alt="The ember latency band: ~10 ms over a glowing amber waveform" /><br/><sub><b>The ember band.</b> The one warm moment on the page: the voice unspooled into an amber waveform behind “~10 ms”.</sub></td>
<td width="50%"><img src="docs/media/voices-section.jpg" alt="The voice library section with rows of voice avatars" /><br/><sub><b>The voice library.</b> Real avatars and names, generated from the app’s own model files, so they match the app exactly.</sub></td>
</tr>
<tr>
<td width="50%"><img src="docs/media/features.jpg" alt="Feature cards: soundboard, pitch and formant, noise gate" /><br/><sub><b>Features.</b> Each card has a small live illustration of the real control in the app.</sub></td>
<td width="50%"><img src="docs/media/cta.jpg" alt="Final call to action inside a ring of particles" /><br/><sub><b>The portal.</b> The particles open into a ring around the final download.</sub></td>
</tr>
<tr>
<td width="50%"><img src="docs/media/download.jpg" alt="Download page with macOS and Windows cards" /><br/><sub><b>Download.</b> Detects your OS and always points at the latest release.</sub></td>
<td width="50%"><img src="docs/media/voices-page.jpg" alt="Searchable library of all 112 voices" /><br/><sub><b>Voices.</b> All 112, filterable and searchable.</sub></td>
</tr>
<tr>
<td width="50%"><img src="docs/media/guides.jpg" alt="Guides page with a sticky table of contents" /><br/><sub><b>Guides.</b> Install, route to Discord/Zoom/OBS, tune, troubleshoot.</sub></td>
<td width="50%"><img src="docs/media/about.jpg" alt="About page with the Beatrice logo inside the particle ring" /><br/><sub><b>About.</b> The story, principles and the people behind the voices.</sub></td>
</tr>
</table>

<div align="center">
<img src="docs/media/mobile.jpg" alt="The site on three phones: home, voice library and download" width="88%" />

<sub>Fully responsive: the 3D scene drops to ~11,000 particles on phones.</sub>
</div>

---

## ✦ How it works

**The scroll-driven scene.** Every section declares how the voice should look while it's on screen (`data-scene`). The page maps your scroll position onto those keyframes, and the GPU blends between three shapes per particle:

```mermaid
flowchart LR
    S["Sections<br/>data-scene: morph, chaos, hue…"] --> K["Keyframes<br/>(measured on resize)"]
    Y["Scroll position<br/>(Lenis smooth scroll)"] --> I["Interpolate<br/>smoothstep between keyframes"]
    K --> I
    I --> E["Ease towards target<br/>every frame"]
    M["🎙️ Your mic (optional)<br/>Web Audio RMS"] --> E
    E --> G["GPU vertex shader<br/>orb ↔ waveform ↔ ring<br/>26k particles"]
```

**The live star count.** The total in the nav (and the badge above) adds up every Beatrice repository, cached at Vercel's edge so visitors never hit GitHub's rate limit:

```mermaid
flowchart LR
    B["Browser / README badge"] --> A["/api/stars<br/>(Vercel Edge Function)"]
    A -- "cached 1 h at the CDN" --> B
    A --> G1["satiricalguru/<br/>Beatrice-voicechanger-mac"]
    A --> G2["satiricalguru/<br/>Beatrice-voicechanger-windows"]
    A --> G3["every repo in<br/>Project-Beatrice-V2"]
```

---

## ✦ Design system: "Aurora Void"

A voice is light in a dark room. The canvas is pure black. Colour lives only in the voice itself; everything around it is hairlines, frosted glass and white pills. Researched against Voicemod, voice.ai, DubbingAI and EaseUS, and the Superwhisper, V7 Labs and Active Theory design systems. Full spec in **[DESIGN.md](DESIGN.md)**.

| Token | | Use |
|---|---|---|
| `void` | ![#000000](https://img.shields.io/badge/%20-000000?style=flat-square) `#000000` | The canvas. Never grey. |
| `text` | ![#FFFFFF](https://img.shields.io/badge/%20-FFFFFF?style=flat-square) `#FFFFFF` | Text and the primary button |
| `signal` | ![#7C8CFF](https://img.shields.io/badge/%20-7C8CFF?style=flat-square) `#7C8CFF` | The single UI accent |
| `aurora` | ![](https://img.shields.io/badge/%20-112D72?style=flat-square)![](https://img.shields.io/badge/%20-4B52AA?style=flat-square)![](https://img.shields.io/badge/%20-A887DC?style=flat-square)![](https://img.shields.io/badge/%20-E6C4E7?style=flat-square)![](https://img.shields.io/badge/%20-FCDBEF?style=flat-square) | The voice: 3D scene and hero only |
| `ember` | ![](https://img.shields.io/badge/%20-FF6A2B?style=flat-square)![](https://img.shields.io/badge/%20-FFB36B?style=flat-square) | One warm band (latency), never on controls |
| `live` | ![#3DFFA8](https://img.shields.io/badge/%20-3DFFA8?style=flat-square) `#3DFFA8` | “Live” states only |

**Type:** [Geist](https://vercel.com/font) and Geist Mono, picked from the Awwwards free-fonts collection.

### The logo: "Sprig"

<table>
<tr>
<td align="center" width="33%">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="brand/beatrice-mark.svg">
  <img src="brand/beatrice-mark-black.svg" alt="Beatrice mark" width="120">
</picture>
<br/><sub>Full mark</sub>
</td>
<td align="center" width="33%"><img src="brand/beatrice-app-icon.svg" alt="Beatrice app icon" width="130"><br/><sub>App icon</sub></td>
<td align="center" width="33%"><img src="brand/favicon.svg" alt="Beatrice favicon" width="64"><br/><sub>Compact (favicon)</sub></td>
</tr>
</table>

The original Beatrice logo's star lilies (two open flowers, a bud and a leaf) growing out of the app's sound wave. It's generated from code ([`brand/make_sprig.py`](brand/make_sprig.py)), so every size stays pixel-consistent.

---

## ✦ Built with

![React](https://img.shields.io/badge/React_19-000?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-000?style=flat-square&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-000?style=flat-square&logo=vite&logoColor=646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-000?style=flat-square&logo=tailwindcss&logoColor=06B6D4)
![three.js](https://img.shields.io/badge/three.js-000?style=flat-square&logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP_ScrollTrigger-000?style=flat-square&logo=greensock&logoColor=88CE02)
![Lenis](https://img.shields.io/badge/Lenis-000?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel_Edge-000?style=flat-square&logo=vercel&logoColor=white)

<details>
<summary><b>Project structure</b></summary>

```
api/stars.ts                 Edge function: live total stars (JSON + shields badge)
brand/                       Logo sources, app icon, generator (make_sprig.py)
docs/media/                  README GIFs, video and screenshots
scripts/build-voices.mjs     Builds the voice library from the app's model files
scripts/capture-media.mjs    Captures README media from the live site (headless Chrome)
scripts/make-readme-media.py Turns captures into GIF / MP4 / JPEG
src/three/VoiceScene.ts      The particle voice: shaders, orb ↔ wave ↔ ring
src/components/SceneCanvas   Scroll → keyframes → scene
src/sections/                Home page sections
src/pages/                   Home, Download, Voices, Guides, About
src/content/{en,ja,zh}.ts    All copy, in three languages
DESIGN.md                    The design system
```
</details>

---

## ✦ Develop

```bash
git clone https://github.com/Project-Beatrice-V2/Beatrice-website.git
cd Beatrice-website
npm install
npm run dev          # http://localhost:5173
npm run build        # production build in dist/
```

<details>
<summary><b>Regenerate the voice library or README media</b></summary>

```bash
# After the app's voice models change:
node scripts/build-voices.mjs ../Beatrice-voicechanger-mac

# Re-capture GIFs and screenshots from the live site:
node scripts/capture-media.mjs https://project-beatrice.vercel.app /tmp/beatrice-media
python3 scripts/make-readme-media.py /tmp/beatrice-media
```
</details>

**Deploy:** every push to `main` deploys to [project-beatrice.vercel.app](https://project-beatrice.vercel.app/). The old address, `project-beatrice-v2.github.io/Beatrice-website/`, forwards to the same page there.

---

## ✦ The Beatrice family

| | Repository | |
|---|---|---|
| 🍎 | [Beatrice-voicechanger-mac](https://github.com/satiricalguru/Beatrice-voicechanger-mac) | ![stars](https://img.shields.io/github/stars/satiricalguru/Beatrice-voicechanger-mac?style=flat-square&labelColor=000&color=fff) |
| 🪟 | [Beatrice-voicechanger-windows](https://github.com/satiricalguru/Beatrice-voicechanger-windows) | ![stars](https://img.shields.io/github/stars/satiricalguru/Beatrice-voicechanger-windows?style=flat-square&labelColor=000&color=fff) |
| 🧠 | [Beatrice-trainer-macos](https://github.com/Project-Beatrice-V2/Beatrice-trainer-macos) · [windows](https://github.com/Project-Beatrice-V2/Beatrice-trainer-windows) | Train your own voice |
| ☁️ | [Beatrice-colab](https://github.com/Project-Beatrice-V2/Beatrice-colab) | Train for free in the cloud |
| 🧹 | [Beatrice-dataset-webui-macos](https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-macos) · [windows](https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-windows) | Prepare voice datasets |
| 🎭 | [Beatrice-voice-models](https://github.com/Project-Beatrice-V2/Beatrice-voice-models) | Pre-trained voices |

---

<div align="center">

**MIT licensed.** Beatrice voice engine by [prj-beatrice](https://prj-beatrice.com/). JVS corpus voices are for non-commercial use only.<br/>
Made with care by [Jatin Pandey (SatiricalGuru)](https://github.com/satiricalguru) and the Beatrice community.

<br/>

⭐ **If Beatrice made you sound like someone new, give it a star.**

</div>
