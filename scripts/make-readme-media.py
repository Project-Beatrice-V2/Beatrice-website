"""Turns frames from scripts/capture-media.mjs into README media in docs/media/.

Usage: python3 scripts/make-readme-media.py <capture-dir>
Needs Pillow and an ffmpeg binary (FFMPEG env var, imageio-ffmpeg, or on PATH).
"""
import os
import shutil
import subprocess
import sys

from PIL import Image, ImageDraw

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs", "media")
os.makedirs(OUT, exist_ok=True)


def ffmpeg_bin():
    if os.environ.get("FFMPEG"):
        return os.environ["FFMPEG"]
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return shutil.which("ffmpeg") or "ffmpeg"


FF = ffmpeg_bin()


def run(*args):
    subprocess.run([FF, "-y", "-loglevel", "error", *args], check=True)


def gif(frames_glob, out, fps, width, start=0, count=None, colors=128):
    trim = f"trim=start_frame={start}" + (f":end_frame={start + count}" if count else "") + ",setpts=PTS-STARTPTS,"
    flt = (f"[0:v]{trim}fps={fps},scale={width}:-1:flags=lanczos,split[a][b];"
           f"[a]palettegen=max_colors={colors}:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle")
    run("-framerate", "18", "-pattern_type", "glob", "-i", frames_glob, "-filter_complex", flt, "-loop", "0", out)


def mp4(frames_glob, out, width):
    run("-framerate", "24", "-pattern_type", "glob", "-i", frames_glob,
        "-vf", f"scale={width}:-2:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "27",
        "-preset", "slow", "-movflags", "+faststart", out)


def jpg(name, out, width=1440):
    im = Image.open(os.path.join(SRC, name)).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, out), quality=84, optimize=True, progressive=True)


def phone_collage(names, out):
    shots = [Image.open(os.path.join(SRC, n)).convert("RGB") for n in names]
    pw, ph = 330, round(330 * shots[0].height / shots[0].width)
    pad, gap, radius = 70, 46, 40
    W = pad * 2 + pw * len(shots) + gap * (len(shots) - 1)
    H = pad * 2 + ph
    canvas = Image.new("RGB", (W, H), (5, 5, 8))
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((W * 0.15, H * 0.1, W * 0.85, H * 1.1), fill=(28, 26, 60))
    from PIL import ImageFilter
    canvas = Image.blend(canvas, glow.filter(ImageFilter.GaussianBlur(120)), 0.9)
    for i, s in enumerate(shots):
        s = s.resize((pw, ph), Image.LANCZOS)
        mask = Image.new("L", (pw, ph), 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, pw - 1, ph - 1), radius, fill=255)
        x = pad + i * (pw + gap)
        border = Image.new("RGB", (pw + 6, ph + 6), (58, 58, 70))
        bmask = Image.new("L", (pw + 6, ph + 6), 0)
        ImageDraw.Draw(bmask).rounded_rectangle((0, 0, pw + 5, ph + 5), radius + 3, fill=255)
        canvas.paste(border, (x - 3, pad - 3), bmask)
        canvas.paste(s, (x, pad), mask)
    canvas.save(os.path.join(OUT, out), quality=86, optimize=True, progressive=True)


if __name__ == "__main__":
    gif(os.path.join(SRC, "orb", "*.jpeg"), os.path.join(OUT, "hero.gif"), 14, 840, colors=112)
    gif(os.path.join(SRC, "scroll", "*.jpeg"), os.path.join(OUT, "scroll.gif"), 11, 600, colors=80)
    mp4(os.path.join(SRC, "scroll", "*.jpeg"), os.path.join(OUT, "scroll.mp4"), 1280)
    # The last orb frame is the fully faded-in hero.
    last_orb = sorted(os.listdir(os.path.join(SRC, "orb")))[-1]
    Image.open(os.path.join(SRC, "orb", last_orb)).convert("RGB").save(os.path.join(SRC, "home-full.png"))
    for src, dst in [("home-full.png", "home.jpg"), ("latency.png", "latency.jpg"), ("voices-section.png", "voices-section.jpg"),
                     ("features.png", "features.jpg"), ("cta.png", "cta.jpg"), ("voices.png", "voices-page.jpg"),
                     ("download.png", "download.jpg"), ("docs.png", "guides.jpg"), ("about.png", "about.jpg")]:
        jpg(src, dst)
    phone_collage(["m-home.png", "m-voices.png", "m-download.png"], "mobile.jpg")
    for f in sorted(os.listdir(OUT)):
        print(f"{f:22s} {os.path.getsize(os.path.join(OUT, f)) / 1024:8.0f} KB")
