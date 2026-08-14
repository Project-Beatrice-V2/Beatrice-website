import subprocess
import os

output_path = "/Users/jatinpandey/Antigravity/Project beatrice/public/media/pipeline-demo.mp4"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Generate a 10-second high-definition 60FPS video with dynamic frequency spectrum waveform and audio
cmd = [
    "/opt/homebrew/bin/ffmpeg",
    "-y",
    "-f", "lavfi",
    "-i", "aevalsrc=sin(2*PI*180*t)+0.5*sin(2*PI*360*t)+0.25*sin(2*PI*720*t):s=48000:d=10",
    "-f", "lavfi",
    "-i", "color=c=0x181714:s=1280x720:d=10:r=60",
    "-filter_complex",
    "[0:a]showwaves=s=1280x400:mode=line:colors=0xd4af37|0x8c6a4d:scale=sqrt[waves];"
    "[1:v][waves]overlay=0:160[v]",
    "-map", "[v]",
    "-map", "0:a",
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    output_path
]

res = subprocess.run(cmd, capture_output=True, text=True)
print("Returncode:", res.returncode)
if res.returncode != 0:
    print("Stderr:", res.stderr)
else:
    print("10s Video successfully generated at:", output_path, "Size:", os.path.getsize(output_path))
