// src/lib/api.js (or api.ts)
export async function getResorts() {
  const res = await fetch('http://localhost:5000/api/resorts');
  if (!res.ok) {
    throw new Error('Failed to fetch resorts');
  }
  return res.json();
}
