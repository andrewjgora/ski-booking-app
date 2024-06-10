//src/app/api/resorts/route.ts
"use server";
import { BoundingBox, Resort } from "@/types/types";
import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const swLng = searchParams.get('swLng');
  const swLat = searchParams.get('swLat');
  const neLng = searchParams.get('neLng');
  const neLat = searchParams.get('neLat');
  const search = searchParams.get('q') ?? undefined;
  let bounds: BoundingBox | undefined = (swLng && swLat && neLng && neLat) ? {
      swCorner: { latitude: parseFloat(swLat), longitude: parseFloat(swLng) },
      neCorner: { latitude: parseFloat(neLat), longitude: parseFloat(neLng) }
    } : undefined;

  console.log('GET /api/resorts params: ', search, swLng, swLat, neLng, neLat);
  const resorts = await getResorts(search, bounds);
  console.log('GET /api/resorts returning ', resorts.length, ' resorts');
  return new NextResponse(JSON.stringify(resorts));
}

async function getResorts(query?: string, boundingBox?: BoundingBox): Promise<Resort[]> {

  console.log('getResorts -> search ', query, boundingBox);
  if (query && boundingBox ) return searchResortsInBounds(query, boundingBox);
  else if (query) return searchResorts(query);
  else if (boundingBox) return getResortsInBounds(boundingBox);
  else return getAllResorts();

};

async function searchResorts(query: string): Promise<Resort[]> {

  console.log('searchResorts -> search for ', query);
  try {
    const result = await pool.query(`SELECT * FROM "Resort" WHERE name ILIKE $1 OR location ILIKE $1 OR description ILIKE $1`, [`%${query}%`]);
    const resorts = result.rows;
    console.log(`searchResorts -> returning ${resorts.length} resorts`)
    return resorts;
  } catch (error) {
    console.error(error);
    return [];
  }
};


async function getResortsInBounds(boundingBox: BoundingBox): Promise<Resort[]> {

  console.log('getResortsInBounds', boundingBox);
  try {
    const result = await pool.query(`SELECT * FROM "Resort" WHERE latitude BETWEEN $1 AND $2 AND longitude BETWEEN $3 AND $4`, [boundingBox.swCorner.latitude, boundingBox.neCorner.latitude, boundingBox.swCorner.longitude, boundingBox.neCorner.longitude]);
    const resorts = result.rows;
    return resorts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function searchResortsInBounds(query: string, boundingBox: BoundingBox): Promise<Resort[]> {

  console.log('getResorts -> search ', query);
  try {
    const result = await pool.query(`SELECT * FROM "Resort" WHERE (name ILIKE $1 OR location ILIKE $1 OR description ILIKE $1) AND latitude BETWEEN $2 AND $3 AND longitude BETWEEN $4 AND $5`, [`%${query}%`, boundingBox.swCorner.latitude, boundingBox.neCorner.latitude, boundingBox.swCorner.longitude, boundingBox.neCorner.longitude]);
    const resorts = result.rows;
    return resorts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function getAllResorts(): Promise<Resort[]> {

    console.log('getAllResorts');
    try {
      const result = await pool.query(`SELECT * FROM "Resort"`);
      const resorts = result.rows;
      return resorts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }