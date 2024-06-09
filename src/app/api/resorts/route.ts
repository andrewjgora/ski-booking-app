//src/app/api/resorts/route.ts
"use server";
import { BoundingBox, Resort } from "@/types/types";
import { prisma } from "@/lib/prisma";
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
  return new Response(JSON.stringify(resorts));
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
    const resorts = await prisma.resort.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
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
    const resorts = await prisma.resort.findMany({
      where: {
        AND: [
          { latitude: { gte: boundingBox.swCorner.latitude } },
          { latitude: { lte: boundingBox.neCorner.latitude } },
          { longitude: { gte: boundingBox.swCorner.longitude } },
          { longitude: { lte: boundingBox.neCorner.longitude } },
        ],
      },
    });
    return resorts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function searchResortsInBounds(query: string, boundingBox: BoundingBox): Promise<Resort[]> {

  console.log('getResorts -> search ', query);
  try {
    const resorts = await prisma.resort.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { location: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
          AND: [
            { latitude: { gte: boundingBox.swCorner.latitude } },
            { latitude: { lte: boundingBox.neCorner.latitude } },
            { longitude: { gte: boundingBox.swCorner.longitude } },
            { longitude: { lte: boundingBox.neCorner.longitude } },
          ],
        },
      });
    return resorts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function getAllResorts(): Promise<Resort[]> {

    console.log('getAllResorts');
    try {
      const resorts = await prisma.resort.findMany();
      return resorts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }