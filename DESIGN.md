# Beatrice Design System: "Aurora Void"

One system for the website and the Mac/Windows apps.

## Idea

**A voice is light in a dark room.** The canvas is a black void; the only colour on the page comes from the voice itself: an aurora that glows, breathes and reshapes as you scroll or speak. The interface around it is quiet: hairline borders, frosted glass, white pills.

| Borrowed from | What we take |
|---|---|
| **Active Theory** | Pure black stage; the 3D scene carries all the colour; ghosted chrome; frosted panels instead of shadows |
| **Superwhisper** | The aurora gradient as the brand's one emotional move; white as the primary action fill; tight display tracking |
| **V7 Labs** | Pill controls with hairlines; one warm "amber light" band, used once |
| **Voicemod / voice.ai / DubbingAI / EaseUS** | The category's expected page beats: download-first hero, "works everywhere", voice showcase, 3-step setup with timings, use cases, FAQ, final CTA |

## Colour

| Token | Value | Use |
|---|---|---|
| `void` | `#000000` | Page canvas. Never grey. |
| `ink-900` | `#07070B` | Raised surface (cards on void) |
| `glass` | `rgba(255,255,255,0.04)` + `backdrop-blur(16px)` | Panels, nav, chips |
| `hairline` | `rgba(255,255,255,0.10)` | All borders (1px) |
| `hairline-strong` | `rgba(255,255,255,0.18)` | Hover borders |
| `text` | `#FFFFFF` | Primary text |
| `text-2` | `#A1A1AA` | Body/secondary |
| `text-3` | `#6B6B76` | Metadata, captions |
| `signal` | `#7C8CFF` | The single UI accent: focus rings, active states, small icons. Rationed. |
| `live` | `#3DFFA8` | "LIVE" state only (app power button, live dots) |
| `aurora` | `#000 → #112D72 → #4B52AA → #A887DC → #E6C4E7 → #FCDBEF` | Hero atmosphere & 3D scene only. Never on buttons. |
| `ember` | `#FF6A2B → #FFB36B` | The single warm "amber light" band (latency stat). Never on controls. |

Rules: white is the primary CTA fill (black text). Colour lives in the WebGL scene and the two atmosphere gradients; UI chrome stays monochrome + `signal`.

## Type

**Geist** (Vercel, SIL OFL) for everything, picked from the Awwwards free-fonts collection. One family keeps the system quiet so the scene carries the drama.

| Role | Font | Settings |
|---|---|---|
| Display | **Geist** 600 | 42–120px, `letter-spacing: -0.05em`, line-height 0.95. Emphasis by colour (aurora gradient or `text-2`), never italics. |
| UI / body | **Geist** 400–600 | Body 16–18px / 1.55, `-0.01em`. Headings in UI: 600, `-0.02em`. |
| Micro labels | **Geist Mono** 400–500 | 11–12px, uppercase, `+0.08em`, `text-3`. Section eyebrows, stats units, keyboard hints. |

## Shape & space

- Radius: **pill (999px)** for buttons, chips, nav. **20px** for cards. **28px** for large media frames. Nothing in between.
- 1px hairline borders; **no drop shadows**. Depth comes from blur + translucency + the glow of the scene.
- 4px base unit. Section padding 160px desktop / 96px mobile. Max content width 1240px.

## Motion

- Smooth inertial scroll (Lenis) driving GSAP ScrollTrigger timelines.
- Text enters by line: `y: 40% → 0`, opacity, 0.9s `expo.out`, 60ms stagger.
- The 3D scene is scroll-scrubbed: every chapter of the page is a state of the same particle voice (orb → waveform → portal).
- Hover: borders brighten, never jump. 200ms.
- `prefers-reduced-motion`: no scrubbing or parallax; static aurora image; content fades only.

## Voices

Voice **names and avatar images are identical to the app**: generated from the same TOML files with the same naming rules (`scripts/build-voices.mjs`). Never rename or restyle an avatar.
