//src/app/api/resorts/route.ts
"use server";
import { BoundingBox, Resort } from "@/types/types";
import getResorts from "@/lib/resorts";
import { NextRequest, NextResponse } from "next/server";


const env = process.env.NODE_ENV;


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