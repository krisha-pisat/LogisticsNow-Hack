/**
 * Shared city coordinates for maps and lane analysis.
 * Used for fallback when lane coords are missing and for map-click city lookup.
 */
export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  // Turkish cities (from backend/CSV)
  'İstanbul': { lat: 41.0082, lng: 28.9784 },
  'Istanbul': { lat: 41.0082, lng: 28.9784 },
  'Ankara': { lat: 39.9334, lng: 32.8597 },
  'İzmir': { lat: 38.4237, lng: 27.1428 },
  'Izmir': { lat: 38.4237, lng: 27.1428 },
  'Bursa': { lat: 40.1885, lng: 29.0610 },
  'Antalya': { lat: 36.8969, lng: 30.7133 },
  'Adana': { lat: 36.9914, lng: 35.3308 },
  'Konya': { lat: 37.8746, lng: 32.4932 },
  'Gaziantep': { lat: 37.0662, lng: 37.3833 },
  'Kayseri': { lat: 38.7312, lng: 35.4787 },
  'Samsun': { lat: 41.2867, lng: 36.3300 },
  // US cities (fallback / demo)
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Los Angeles': { lat: 34.0522, lng: -118.2437 },
  'Chicago': { lat: 41.8781, lng: -87.6298 },
  'Houston': { lat: 29.7604, lng: -95.3698 },
  'Phoenix': { lat: 33.4484, lng: -112.0740 },
};

export type CoordPair = [number, number];

export function getCoords(city: string): { lat: number; lng: number } {
  const c = city.trim();
  return CITY_COORDS[c] ?? CITY_COORDS[c.replace(/ı/g, 'i')] ?? { lat: 39.0, lng: 35.0 };
}

export function getCoordsTuple(city: string): CoordPair {
  const { lat, lng } = getCoords(city);
  return [lat, lng];
}

/** All city names that have coordinates (for dropdowns and nearest-city lookup) */
export function getCityList(): string[] {
  const set = new Set<string>();
  Object.keys(CITY_COORDS).forEach((k) => set.add(k));
  return Array.from(set).sort();
}

/** Find nearest city to a lat/lng (by simple distance) */
export function getNearestCity(lat: number, lng: number, maxDistanceDeg = 3): string | null {
  let best: { city: string; d: number } | null = null;
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    const d = Math.hypot(coords.lat - lat, coords.lng - lng);
    if (d <= maxDistanceDeg && (!best || d < best.d)) {
      best = { city, d };
    }
  }
  return best?.city ?? null;
}
