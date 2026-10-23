// Captures README media from the live site with headless Chrome (DevTools
// protocol, no extra dependencies): page screenshots, mobile shots, and frame
// sequences for GIFs (hero orb, scroll-through). Frames go to a temp folder;
// scripts/make-readme-media.sh turns them into GIF/MP4/PNG under docs/media.
//
// Usage: node scripts/capture-media.mjs [site-url] [out-dir]

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const SITE = process.argv[2] || 'https://project-beatrice.vercel.app';
const OUT = process.argv[3] || path.join(os.tmpdir(), 'beatrice-media');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch() {
  const port = 9400 + Math.floor(Math.random() * 400);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-'));
  const proc = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`,
    '--hide-scrollbars', '--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist',
    '--autoplay-policy=no-user-gesture-required', 'about:blank',
  ], { stdio: 'ignore' });
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return { proc, wsUrl: page.webSocketDebuggerUrl };
    } catch { /* not up yet */ }
    await sleep(200);
  }
  throw new Error('Chrome did not start');
}

function client(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    }
  };
  const ready = new Promise((r) => (ws.onopen = r));
  const send = async (method, params = {}) => {
    await ready;
    const n = ++id;
    ws.send(JSON.stringify({ id: n, method, params }));
    return new Promise((resolve, reject) => pending.set(n, { resolve, reject }));
  };
  return { send, close: () => ws.close() };
}

async function session({ width, height, mobile = false }) {
  const { proc, wsUrl } = await launch();
  const c = client(wsUrl);
  await c.send('Page.enable');
  await c.send('Runtime.enable');
  await c.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  if (mobile) await c.send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  const go = async (url, wait = 4500) => { await c.send('Page.navigate', { url }); await sleep(wait); };
  const evalJs = async (expr) => (await c.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
  const shot = async (file, fmt = 'png') => {
    const { data } = await c.send('Page.captureScreenshot', { format: fmt, quality: fmt === 'jpeg' ? 88 : undefined });
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
  };
  const done = () => { c.close(); proc.kill(); };
  return { go, evalJs, shot, done };
}

const step = (label) => console.log(`[capture] ${label}`);

const ONLY = process.env.ONLY; // 'desktop' or 'mobile' to capture just one set

// 1) Desktop screenshots of each page
if (ONLY !== 'mobile') {
  const s = await session({ width: 1440, height: 900 });
  for (const [name, route, scrollTo] of [
    ['home', '/', null],
    ['voices', '/voices', 380],
    ['download', '/download', 0],
    ['docs', '/docs', 0],
    ['about', '/about', 0],
    ['latency', '/', "document.getElementById('latency').offsetTop + document.getElementById('latency').offsetHeight/2 - innerHeight/2"],
    ['voices-section', '/', "document.getElementById('voices').offsetTop + 40"],
    ['features', '/', "document.getElementById('features').offsetTop + 40"],
    ['cta', '/', "document.getElementById('cta').offsetTop + document.getElementById('cta').offsetHeight/2 - innerHeight/2"],
  ]) {
    step(`page ${name}`);
    await s.go(SITE + route);
    if (scrollTo !== null) { await s.evalJs(`window.scrollTo(0, ${scrollTo}); new Promise(r => setTimeout(r, 2600))`); }
    await s.shot(path.join(OUT, `${name}.png`));
  }

  // 2) Hero orb loop: frames at ~15 fps
  step('hero orb frames');
  await s.go(SITE + '/');
  const orbDir = path.join(OUT, 'orb');
  fs.mkdirSync(orbDir, { recursive: true });
  for (let i = 0; i < 60; i++) { await s.shot(path.join(orbDir, `f${String(i).padStart(3, '0')}.jpeg`), 'jpeg'); await sleep(55); }

  // 3) Scroll-through: hero → conversion → latency → voices
  step('scroll frames');
  await s.go(SITE + '/');
  const scrollDir = path.join(OUT, 'scroll');
  fs.mkdirSync(scrollDir, { recursive: true });
  const end = await s.evalJs("document.getElementById('voices').offsetTop + 300");
  const N = 150;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await s.evalJs(`window.scrollTo(0, ${Math.round(eased * end)}); new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
    await sleep(40);
    await s.shot(path.join(scrollDir, `f${String(i).padStart(3, '0')}.jpeg`), 'jpeg');
  }
  s.done();
}

// 4) Mobile screenshots (longer settle: phones load the 3D scene after the page)
if (ONLY !== 'desktop') {
  const s = await session({ width: 390, height: 844, mobile: true });
  for (const [name, route, y] of [['m-home', '/', 0], ['m-voices', '/voices', 420], ['m-download', '/download', 0]]) {
    step(`mobile ${name}`);
    await s.go(SITE + route, 9000);
    if (y) await s.evalJs(`window.scrollTo(0, ${y}); new Promise(r => setTimeout(r, 6000))`);
    await s.shot(path.join(OUT, `${name}.png`));
  }
  s.done();
}

console.log(`[capture] done -> ${OUT}`);
