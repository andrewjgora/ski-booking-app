// src/lib/api.js (or api.ts)
async function getResorts(query?: string) {
  const url = query ? `http://localhost:5678/api/resorts?search=${query}` : 'http://localhost:5678/api/resorts';
  console.log('hitting api url:', url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch resorts');
  }
  return res.json();
}


export { getResorts }