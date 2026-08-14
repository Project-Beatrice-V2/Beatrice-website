import { useState, useEffect } from 'react';

const STARS_CACHE_KEY = 'beatrice_github_stars_cache';

interface StarsCache {
  [repo: string]: {
    stars: number;
    timestamp: number;
  };
}

export function useGitHubStars(repoFullName: string, initialStars?: number): number | null {
  const [stars, setStars] = useState<number | null>(initialStars ?? null);

  useEffect(() => {
    if (!repoFullName) return;

    // Check session cache first (1 hour cache)
    try {
      const cached = sessionStorage.getItem(STARS_CACHE_KEY);
      if (cached) {
        const cacheData: StarsCache = JSON.parse(cached);
        const repoData = cacheData[repoFullName];
        if (repoData && Date.now() - repoData.timestamp < 3600000) {
          setStars(repoData.stars);
          return;
        }
      }
    } catch (e) {
      // ignore storage errors
    }

    let isMounted = true;

    async function fetchStars() {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoFullName}`);
        if (res.ok) {
          const data = await res.json();
          if (typeof data.stargazers_count === 'number' && isMounted) {
            setStars(data.stargazers_count);

            // Update session cache
            try {
              const currentCache = JSON.parse(sessionStorage.getItem(STARS_CACHE_KEY) || '{}');
              currentCache[repoFullName] = {
                stars: data.stargazers_count,
                timestamp: Date.now(),
              };
              sessionStorage.setItem(STARS_CACHE_KEY, JSON.stringify(currentCache));
            } catch (e) {
              // ignore storage errors
            }
          }
        }
      } catch (err) {
        // Fallback to initial or null
      }
    }

    fetchStars();

    return () => {
      isMounted = false;
    };
  }, [repoFullName, initialStars]);

  return stars;
}
