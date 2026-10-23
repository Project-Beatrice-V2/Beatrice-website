// GET /api/stars — total GitHub stars across Beatrice's repositories.
// GET /api/stars?format=shields — the same total as a shields.io endpoint badge.
// Runs on Vercel's edge; the CDN caches the answer for an hour so visitors
// never hit GitHub's rate limit. Set GITHUB_TOKEN to raise that limit.
export const config = { runtime: 'edge' };

const REPOS = ['satiricalguru/Beatrice-voicechanger-mac', 'satiricalguru/Beatrice-voicechanger-windows'];
const ORG = 'Project-Beatrice-V2';

async function gh(path: string, token?: string) {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'beatrice-website',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
  return res.json();
}

export default async function handler(req?: Request): Promise<Response> {
  const shields = req ? new URL(req.url).searchParams.get('format') === 'shields' : false;
  const token = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.GITHUB_TOKEN;
  try {
    const [repos, orgRepos] = await Promise.all([
      Promise.all(REPOS.map((r) => gh(`repos/${r}`, token))),
      gh(`orgs/${ORG}/repos?per_page=100&type=public`, token),
    ]);
    const all = [...repos, ...orgRepos] as { full_name: string; stargazers_count: number }[];
    const unique = new Map(all.map((r) => [r.full_name, r.stargazers_count]));
    const total = [...unique.values()].reduce((a, b) => a + b, 0);
    const body = shields
      ? { schemaVersion: 1, label: 'stars', message: String(total), color: 'white', labelColor: '000000', namedLogo: 'github', logoColor: 'white' }
      : { total, repos: Object.fromEntries(unique), updatedAt: new Date().toISOString() };
    return new Response(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=300' },
    });
  }
}
