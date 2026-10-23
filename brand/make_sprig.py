"""Beatrice logo — "Sprig" (option D), refined into a small system:

  full     the official logo's lilies, bud and leaf rising from the voice wave
           (app icon, website, large uses)
  compact  one lily on a stem rising from the wave (favicon, ≤32px)
  icon     the full mark on a black macOS-style squircle (app icon)

All monoline, black and white. Writes SVGs and a review sheet.
"""
import math
import os

OUT = os.path.dirname(os.path.abspath(__file__))


def lily(cx, cy, length, width, rot=0.0, n=6, inner=0.0, heart=0.0):
    """Six broad, pointed star-lily petals opening from a small gap around the
    centre, plus an optional stamen dot — reads as a flower, not a palm."""
    parts = []
    for i in range(n):
        a = math.radians(rot + i * 360 / n)
        ux, uy = math.sin(a), -math.cos(a)
        px, py = -uy, ux
        bx, by = cx + ux * inner, cy + uy * inner
        L = length - inner
        P = lambda al, si: f"{bx + ux * L * al + px * width * si:.2f} {by + uy * L * al + py * width * si:.2f}"
        parts.append(f"M{bx:.2f} {by:.2f} C{P(0.12, 0.95)} {P(0.55, 1.15)} {P(1, 0)} C{P(0.55, -1.15)} {P(0.12, -0.95)} {bx:.2f} {by:.2f}Z")
    if heart:
        parts.append(f"M{cx - heart:.2f} {cy:.2f} a{heart:.2f} {heart:.2f} 0 1 0 {2 * heart:.2f} 0 a{heart:.2f} {heart:.2f} 0 1 0 {-2 * heart:.2f} 0Z")
    return " ".join(parts)


def bud(cx, cy, length, width, rot):
    """A closed bud: a single lens pointing along rot, base at (cx, cy)."""
    a = math.radians(rot)
    ux, uy = math.sin(a), -math.cos(a)
    px, py = -uy, ux
    P = lambda al, si: f"{cx + ux * length * al + px * width * si:.2f} {cy + uy * length * al + py * width * si:.2f}"
    return f"M{cx:.2f} {cy:.2f} C{P(0.15, 1.1)} {P(0.65, 0.9)} {P(1, 0)} C{P(0.65, -0.9)} {P(0.15, -1.1)} {cx:.2f} {cy:.2f}Z"


# Shared geometry (64-unit box). Stems all spring from one point on the wave.
# Petals, bud and leaf are filled glyph shapes; stems and the wave are fine lines.
BASE = (32, 50)
WAVE = "M12.5 50 Q17.5 43.6 22.5 50 T32.5 50 T42.5 50 T52.5 50"


def full_mark(line=1.1):
    big, mid, bud_base = (42.5, 14), (19.5, 23.5), (50.5, 27.5)
    b = f"{BASE[0]} {BASE[1]}"
    # Stems stop at the edge of each flower's open centre rather than piercing it.
    stems = (f'<path d="M{b} C 35 39, 40.8 27.5, {big[0] - 0.35} {big[1] + 2.0}"/>'
             f'<path d="M{b} C 27.5 41, 21.6 33, {mid[0] + 0.3} {mid[1] + 1.6}"/>'
             f'<path d="M{b} C 38.5 44, 46.5 36.5, {bud_base[0]} {bud_base[1]}"/>')
    glyphs = (f'<path d="{lily(big[0], big[1], 10.5, 2.9, 10, inner=1.9, heart=1.05)}"/>'
              f'<path d="{lily(mid[0], mid[1], 8, 2.25, -14, inner=1.5, heart=0.85)}"/>'
              f'<path d="{bud(bud_base[0], bud_base[1], 7.5, 2.0, 30)}"/>'
              # long slender leaf sweeping left from the base
              f'<path d="M{b} C 26 46.5, 19.5 43, 13 36 C 21 40, 27.5 44, {b}Z"/>')
    return (f'<g fill="none" stroke="currentColor" stroke-width="{line}">{stems}</g>'
            f'<g fill="currentColor" stroke="none">{glyphs}</g>'
            f'<g fill="none" stroke="currentColor" stroke-width="{line * 1.25}"><path d="{WAVE}"/></g>')


def compact_mark(line=3.0):
    top = (32, 19)
    return (f'<g fill="none" stroke="currentColor" stroke-width="{line}"><path d="M32 47 C 29.5 39, 34.5 31, 32 {top[1] + 3.4}"/>'
            '<path d="M6 51 Q12.5 42 19 51 T32 51 T45 51 T58 51"/></g>'
            f'<g fill="currentColor" stroke="none"><path d="{lily(top[0], top[1], 15, 4.6, 0, inner=3.2, heart=2.0)}"/></g>')


def svg(inner, fg="#fff", box="0 0 64 64", size=None):
    s = f' width="{size}" height="{size}"' if size else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{box}"{s} color="{fg}" '
            f'stroke-linecap="round" stroke-linejoin="round">{inner}</svg>')


def app_icon(dark=True):
    """1024 macOS-style icon: squircle tile, mark centred with Apple-grid padding."""
    bg = "#000" if dark else "#fff"
    fg = "#fff" if dark else "#000"
    edge = "rgba(255,255,255,0.14)" if dark else "rgba(0,0,0,0.10)"
    sheen = ('<radialGradient id="g" cx="50%" cy="0%" r="90%"><stop offset="0" stop-color="#fff" stop-opacity="0.10"/>'
             '<stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>') if dark else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">'
            f'<defs>{sheen}</defs>'
            f'<rect x="100" y="100" width="824" height="824" rx="185" fill="{bg}"/>'
            + ('<rect x="100" y="100" width="824" height="824" rx="185" fill="url(#g)"/>' if dark else "")
            + f'<rect x="100.5" y="100.5" width="823" height="823" rx="184.5" fill="none" stroke="{edge}" stroke-width="2"/>'
            f'<g transform="translate(160 150) scale(11)" color="{fg}" stroke-linecap="round" stroke-linejoin="round">{full_mark(1.15)}</g>'
            '</svg>')


def write():
    files = {
        "beatrice-mark.svg": svg(full_mark()),
        "beatrice-mark-black.svg": svg(full_mark(), "#000"),
        "beatrice-compact.svg": svg(compact_mark()),
        "beatrice-compact-black.svg": svg(compact_mark(), "#000"),
        "beatrice-app-icon.svg": app_icon(True),
        "beatrice-app-icon-light.svg": app_icon(False),
        "favicon.svg": ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#000"/>'
                        f'<g color="#fff" stroke-linecap="round" stroke-linejoin="round">{compact_mark(3.6)}</g></svg>'),
    }
    for name, data in files.items():
        with open(os.path.join(OUT, name), "w") as f:
            f.write(data)

    full_w, full_b = files["beatrice-mark.svg"], files["beatrice-mark-black.svg"]
    comp_w = files["beatrice-compact.svg"]
    icon_d, icon_l = files["beatrice-app-icon.svg"], files["beatrice-app-icon-light.svg"]
    dock = "".join(f'<div style="width:{s}px;height:{s}px">{icon_d}</div>' for s in (128, 96, 64, 48, 32))
    html = f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0}} body{{background:#0b0b0e;color:#fff;font-family:Geist,system-ui;padding:48px;width:1440px}}
h1{{font-size:44px;font-weight:600;letter-spacing:-.04em}} .sub{{color:#a1a1aa;margin:10px 0 36px;font-size:17px}}
.lbl{{font-family:'Geist Mono';font-size:11px;color:#6b6b76;text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px}}
.grid{{display:grid;grid-template-columns:repeat(12,1fr);gap:18px}}
.card{{border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:24px;background:#050507}}
.c4{{grid-column:span 4}} .c5{{grid-column:span 5}} .c7{{grid-column:span 7}} .c8{{grid-column:span 8}} .c12{{grid-column:span 12}}
.tile{{border-radius:16px;display:flex;align-items:center;justify-content:center;height:300px}} .tile svg{{height:240px;width:240px}}
.dark{{background:#000;border:1px solid rgba(255,255,255,.12)}} .light{{background:#fff}}
.icon svg{{width:300px;height:300px}}
.dock{{display:flex;align-items:flex-end;gap:22px;padding:26px 30px;border-radius:26px;background:linear-gradient(135deg,#3b4a7a,#8a6bb4 55%,#e6c4e7);}}
.dock svg{{width:100%;height:100%;display:block}}
.lockup{{display:flex;align-items:center;gap:14px;height:120px;padding:0 28px;border-radius:16px}} .lockup svg{{width:60px;height:60px}}
.lockup span{{font-size:44px;font-weight:600;letter-spacing:-.04em}}
.small{{display:flex;align-items:center;gap:26px;height:120px;padding:0 28px;border-radius:16px}}
.small div svg{{width:100%;height:100%;display:block}}
.tab{{display:flex;align-items:center;gap:10px;background:#1e1e24;border-radius:10px 10px 0 0;padding:10px 16px;width:260px;font-size:13px;color:#ddd}}
.tab svg{{width:16px;height:16px}}
</style></head><body>
<h1>Beatrice logo · Sprig</h1>
<p class="sub">Refined from the official logo: two star lilies, a bud and a leaf rising out of the voice wave. A compact cut keeps it crisp at favicon sizes.</p>
<div class="grid">
  <div class="card c4"><div class="lbl">Full mark · black</div><div class="tile dark">{full_w}</div></div>
  <div class="card c4"><div class="lbl">Full mark · white</div><div class="tile light">{full_b}</div></div>
  <div class="card c4"><div class="lbl">App icon</div><div class="tile icon" style="background:#16161c">{icon_d}</div></div>
  <div class="card c7"><div class="lbl">In the Dock / taskbar · 128 → 32 px</div><div class="dock">{dock}</div></div>
  <div class="card c5"><div class="lbl">App icon · light variant</div><div class="tile icon" style="height:230px;background:#e9e9ee">{icon_l.replace('<svg ', '<svg style="width:220px;height:220px" ')}</div></div>
  <div class="card c7"><div class="lbl">Wordmark lockups</div>
    <div class="lockup dark">{full_w}<span>Beatrice</span></div>
    <div class="lockup light" style="margin-top:12px;color:#000">{full_b}<span>Beatrice</span></div></div>
  <div class="card c5"><div class="lbl">Compact cut · 48 / 32 / 24 / 16 px</div>
    <div class="small dark">{''.join(f'<div style="width:{s}px;height:{s}px">{comp_w}</div>' for s in (48, 32, 24, 16))}</div>
    <div class="lbl" style="margin-top:22px">Browser tab</div>
    <div class="tab">{files['favicon.svg']}<span>Beatrice — Free AI Voice Changer</span></div></div>
</div></body></html>"""
    with open(os.path.join(OUT, "sprig-sheet.html"), "w") as f:
        f.write(html)


def write_ts(path):
    import json
    with open(path, "w") as f:
        f.write("// Generated from brand/make_sprig.py — the Beatrice \"Sprig\" mark (64-unit box).\n"
                "// Regenerate with: python3 brand/make_sprig.py --ts\n"
                f"export const MARK_SVG = {json.dumps(full_mark())};\n"
                "// Same mark with heavier lines, for sizes under ~48px (nav, footer).\n"
                f"export const MARK_SMALL_SVG = {json.dumps(full_mark(2.2))};\n"
                f"export const COMPACT_SVG = {json.dumps(compact_mark())};\n")


if __name__ == "__main__":
    import sys
    if "--ts" in sys.argv:
        write_ts(os.path.join(OUT, "..", "src", "components", "logoPaths.ts"))
    else:
        write()
    print("ok")
