// src/lib/api.js (or api.ts)

type BoundingBox = {
  swLng: number;
  swLat: number;
  neLng: number;
  neLat: number;
};

async function getResorts(query?: string, bounds?: BoundingBox) {
  console.log('getResorts');
  const url = query ? `http://localhost:5678/api/resorts?search=${query}` : 'http://localhost:5678/api/resorts';
  // const url = new URL('http://localhost:5678/api/resorts');
  const params = new URLSearchParams();
  if (query) params.append('search', query);
  if (bounds) {
    params.append('swLng', bounds.swLng.toString());
    params.append('swLat', bounds.swLat.toString());
    params.append('neLng', bounds.neLng.toString());
    params.append('neLat', bounds.neLat.toString());
  }
  // url.search = params.toString();
  console.log('hitting api url:', url);
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Failed to fetch resorts');
  }
  return res.json();
}



export { getResorts }