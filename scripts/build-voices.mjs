// Builds src/data/voices.json and public/voices/* from the voice changer app's
// model folders, using exactly the same naming and avatar rules as the app's
// renderer.js, so the website never shows a voice differently from the app.
//
// Usage: node scripts/build-voices.mjs <path-to-Beatrice-voicechanger-mac>

import fs from 'node:fs';
import path from 'node:path';

const appDir = process.argv[2];
if (!appDir || !fs.existsSync(path.join(appDir, 'renderer.js'))) {
  console.error('usage: node scripts/build-voices.mjs <path-to-voicechanger-app-repo>');
  process.exit(1);
}

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outImg = path.join(root, 'public', 'voices');
const outJson = path.join(root, 'src', 'data', 'voices.json');
fs.mkdirSync(outImg, { recursive: true });
fs.mkdirSync(path.dirname(outJson), { recursive: true });

// --- Constants copied verbatim from the app's renderer.js -------------------
const renderer = fs.readFileSync(path.join(appDir, 'renderer.js'), 'utf8');
const grabArray = (name) => {
  const m = renderer.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
  if (!m) throw new Error(`${name} not found in renderer.js`);
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
};
const JVS_FEMALE_NAMES = grabArray('JVS_FEMALE_NAMES');
const JVS_MALE_NAMES = grabArray('JVS_MALE_NAMES');
const AVATAARS_MALE_HAIR = grabArray('AVATAARS_MALE_HAIR');
const AVATAARS_FEMALE_HAIR = grabArray('AVATAARS_FEMALE_HAIR');
const AVATAR_BACKGROUNDS = grabArray('AVATAR_BACKGROUNDS');

// Same minimal TOML reader as the app (parseTOML in renderer.js).
function parseVoices(tomlPath) {
  const speakers = [];
  let cur = null;
  let inDesc = false;
  for (const raw of fs.readFileSync(tomlPath, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (inDesc) { if (line.endsWith('"""')) inDesc = false; continue; }
    const vm = line.match(/^\[voice\.(\d+)\]$/);
    if (vm) { cur = { index: Number(vm[1]), name: '', average_pitch: 0 }; speakers.push(cur); continue; }
    if (!cur) continue;
    if (line.startsWith('name =')) { cur.name = line.slice(line.indexOf('=') + 1).trim().replace(/^"|"$/g, ''); continue; }
    if (line.startsWith('path =')) { cur.portrait_path = line.slice(line.indexOf('=') + 1).trim().replace(/^"|"$/g, ''); continue; }
    if (line.startsWith('average_pitch =')) { const v = parseFloat(line.split('=')[1]); if (!isNaN(v)) cur.average_pitch = v; continue; }
    if (line.startsWith('description = """')) {
      if (!line.slice('description = """'.length).endsWith('"""')) inDesc = true;
      continue;
    }
  }
  return speakers;
}

const voices = [];
const downloads = [];

// JVS corpus (100)
{
  let female = 0, male = 0;
  for (const s of parseVoices(path.join(appDir, 'beatrice_paraphernalia_jvs', 'beatrice_paraphernalia_jvs.toml'))) {
    const isFemale = s.average_pitch > 53.0;
    let name, params;
    if (isFemale) {
      name = JVS_FEMALE_NAMES[female % JVS_FEMALE_NAMES.length];
      params = `&top=${AVATAARS_FEMALE_HAIR[female % AVATAARS_FEMALE_HAIR.length]}&facialHairProbability=0&backgroundColor=${AVATAR_BACKGROUNDS[female % AVATAR_BACKGROUNDS.length]}`;
      female++;
    } else {
      name = JVS_MALE_NAMES[male % JVS_MALE_NAMES.length];
      params = `&top=${AVATAARS_MALE_HAIR[male % AVATAARS_MALE_HAIR.length]}&backgroundColor=${AVATAR_BACKGROUNDS[male % AVATAR_BACKGROUNDS.length]}`;
      male++;
    }
    const file = `jvs-${String(s.index + 1).padStart(3, '0')}.svg`;
    downloads.push([`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}${params}`, file]);
    voices.push({ id: `jvs-${s.index}`, model: 'jvs', name, code: s.name.toUpperCase().replace('JVS', 'JVS-'),
      gender: isFemale ? 'female' : 'male', pitchHz: s.average_pitch, avatar: `voices/${file}` });
  }
}

// Official model 1 (4)
{
  const rename = { 'つくよみちゃん (UTAU)': 'Tsukuyomichan', 'つくよみちゃん (コーパス)': 'Fukuyomichan', '刻鳴時雨': 'Tokinashigure', 'OLUNE': 'Olune' };
  const dir = path.join(appDir, 'beatrice_paraphernalia_official_1');
  for (const s of parseVoices(path.join(dir, 'beatrice_paraphernalia_official_1.toml'))) {
    const original = s.name;
    const name = rename[original] ?? original;
    if (original === 'つくよみちゃん (コーパス)') s.portrait_path = 'fukuyomichan.png';
    let avatar;
    if (s.portrait_path && s.portrait_path !== 'noimage.png') {
      const file = `official-${s.portrait_path}`;
      fs.copyFileSync(path.join(dir, s.portrait_path), path.join(outImg, file));
      avatar = `voices/${file}`;
    } else {
      const file = `official-${s.index}.svg`;
      downloads.push([`https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`, file]);
      avatar = `voices/${file}`;
    }
    voices.push({ id: `official-${s.index}`, model: 'official_1', name, originalName: original, avatar });
  }
}

// Classic old TTS (8)
{
  const rename = { 'adult male 1': 'Adult Male', espeak: 'Espeak', mary: 'Mary', mike: 'Mike', paul: 'Paul', sam: 'Sam', 'sam commodore': 'Sam Commodore', 'speak n spell': 'Speak N Spell' };
  for (const s of parseVoices(path.join(appDir, 'beatrice_paraphernalia_old_tts', 'beatrice_paraphernalia_old_tts.toml'))) {
    const name = rename[s.name] ?? s.name;
    const url = name === 'Mary'
      ? `https://api.dicebear.com/7.x/bottts/svg?seed=${name}&eyes=hearts&mouth=smile01&baseColor=d81b60&backgroundColor=f48fb1`
      : `https://api.dicebear.com/7.x/bottts/svg?seed=${name}&backgroundColor=${AVATAR_BACKGROUNDS[s.index % AVATAR_BACKGROUNDS.length]}`;
    const file = `retro-${s.index}.svg`;
    downloads.push([url, file]);
    voices.push({ id: `retro-${s.index}`, model: 'old_tts', name, avatar: `voices/${file}` });
  }
}

for (const [url, file] of downloads) {
  const dest = path.join(outImg, file);
  if (fs.existsSync(dest)) continue;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

fs.writeFileSync(outJson, JSON.stringify(voices, null, 2) + '\n');
const count = (m) => voices.filter((v) => v.model === m).length;
console.log(`voices: ${voices.length} (jvs ${count('jvs')}, official ${count('official_1')}, retro ${count('old_tts')})`);
