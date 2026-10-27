import { ALL_UNIVERSITIES, AZERBAIJAN_UNIVERSITIES } from '../data/universities';
import { University } from '../types';

export function getAllUniversities(): University[] {
  return ALL_UNIVERSITIES;
}

export function getAzerbaijanUniversities(): University[] {
  return AZERBAIJAN_UNIVERSITIES;
}

export function getUniversityBySlug(slug: string): University | undefined {
  const normalized = (slug || '').toLowerCase().trim();
  return ALL_UNIVERSITIES.find(
    (u) => u.slug.toLowerCase() === normalized || u.id.toLowerCase() === normalized
  );
}

export function getDistinctCountries(): { name: string; code: string; count: number }[] {
  const map = new Map<string, { code: string; count: number }>();
  for (const uni of ALL_UNIVERSITIES) {
    const existing = map.get(uni.country);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(uni.country, { code: uni.countryCode, count: 1 });
    }
  }

  return Array.from(map.entries())
    .map(([name, { code, count }]) => ({ name, code, count }))
    .sort((a, b) => (a.name === 'Azerbaijan' ? -1 : b.name === 'Azerbaijan' ? 1 : b.count - a.count));
}

export function filterUniversities(
  universities: University[],
  options: {
    query?: string;
    country?: string;
    azerbaijanOnly?: boolean;
    featuredOnly?: boolean;
  }
): University[] {
  const q = (options.query || '').toLowerCase().trim();
  const targetCountry = (options.country || '').trim();

  return universities.filter((u) => {
    if (options.azerbaijanOnly && !u.isAzerbaijan) return false;
    if (options.featuredOnly && !u.featured) return false;
    if (targetCountry && targetCountry !== 'All Countries' && u.country !== targetCountry) {
      return false;
    }

    if (q) {
      const matchName = u.name.toLowerCase().includes(q);
      const matchShort = u.shortName.toLowerCase().includes(q);
      const matchNative = u.nativeName ? u.nativeName.toLowerCase().includes(q) : false;
      const matchCity = u.city.toLowerCase().includes(q);
      const matchCountry = u.country.toLowerCase().includes(q);
      return matchName || matchShort || matchNative || matchCity || matchCountry;
    }

    return true;
  });
}
