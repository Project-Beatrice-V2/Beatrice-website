import { useEffect, useState } from 'react';

// Total stars across Beatrice's repositories. Prefers the cached /api/stars
// endpoint (Vercel); falls back to GitHub directly, cached per browser.
const REPOS = ['satiricalguru/Beatrice-voicechanger-mac', 'satiricalguru/Beatrice-voicechanger-windows'];
const ORG = 'Project-Beatrice-V2';
const CACHE_KEY = 'beatrice-total-stars';
const TTL = 60 * 60 * 1000;

async function fromApi(): Promise<number> {
  const res = await fetch('/api/stars');
  if (!res.ok || !res.headers.get('content-type')?.includes('json')) throw new Error('no api');
  const data = await res.json();
  if (typeof data.total !== 'number') throw new Error('bad api');
  return data.total;
}

async function fromGitHub(): Promise<number> {
  const get = async (path: string) => {
    const res = await fetch(`https://api.github.com/${path}`);
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  };
  const [repos, org] = await Promise.all([Promise.all(REPOS.map((r) => get(`repos/${r}`))), get(`orgs/${ORG}/repos?per_page=100&type=public`)]);
  const unique = new Map(([...repos, ...org] as { full_name: string; stargazers_count: number }[]).map((r) => [r.full_name, r.stargazers_count]));
  return [...unique.values()].reduce((a, b) => a + b, 0);
}

export function useTotalStars(): number | null {
  const [stars, setStars] = useState<number | null>(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      return cached && typeof cached.total === 'number' ? cached.total : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.at < TTL) return;
    } catch {
      /* ignore */
    }
    fromApi()
      .catch(fromGitHub)
      .then((total) => {
        if (cancelled) return;
        setStars(total);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ total, at: Date.now() })); } catch { /* ignore */ }
      })
      .catch(() => { /* keep whatever we had */ });
    return () => { cancelled = true; };
  }, []);

  return stars;
}
