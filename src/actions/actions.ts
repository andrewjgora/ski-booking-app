"use server";
import { BoundingBox, Resort } from "@/types/types";
import { prisma } from "@/lib/prisma";


export async function getResorts(query?: string, boundingBox?: BoundingBox): Promise<Resort[]> {

  console.log('getResorts -> search ', query, boundingBox);
  if (query && boundingBox ) return searchResortsInBounds(query, boundingBox);
  else if (query) return searchResorts(query);
  else if (boundingBox) return getResortsInBounds(boundingBox);
  else return getAllResorts();

};

export async function searchResorts(query: string): Promise<Resort[]> {

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


export async function getResortsInBounds(boundingBox: BoundingBox): Promise<Resort[]> {

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

export async function searchResortsInBounds(query: string, boundingBox: BoundingBox): Promise<Resort[]> {

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

export async function getAllResorts(): Promise<Resort[]> {

    console.log('getAllResorts');
    try {
      const resorts = await prisma.resort.findMany();
      return resorts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }