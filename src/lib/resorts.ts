//src/lib/resorts.ts
import { BoundingBox, Resort } from "@/types/types";
import { VercelPoolClient, db } from "@vercel/postgres";

let client: VercelPoolClient;

try {
  client = await db.connect();
} catch (error) {
  console.error(error);
}


async function getResorts(query?: string, boundingBox?: BoundingBox): Promise<Resort[]> {
  console.log('getResorts -> search ', query, boundingBox);
  let result;
  try {
    if (query && boundingBox ) result = await client.sql`SELECT * FROM resorts WHERE (name ILIKE ${'%'+query+'%'} OR location ILIKE ${'%'+query+'%'} OR description ILIKE ${'%'+query+'%'}) AND latitude BETWEEN ${boundingBox.swCorner.latitude} AND ${boundingBox.neCorner.latitude} AND longitude BETWEEN ${boundingBox.swCorner.longitude} AND ${boundingBox.neCorner.longitude}`;
    else if (query) result = await client.sql`SELECT * FROM resorts WHERE name ILIKE ${'%'+query+'%'} OR location ILIKE ${'%'+query+'%'} OR description ILIKE ${'%'+query+'%'}`;
    else if (boundingBox) result = await client.sql`SELECT * FROM resorts WHERE latitude BETWEEN ${boundingBox.swCorner.latitude} AND ${boundingBox.neCorner.latitude} AND longitude BETWEEN ${boundingBox.swCorner.longitude} AND ${boundingBox.neCorner.longitude}`;
    else return new Promise((resolve) => resolve([]))//result = await client.sql`SELECT * FROM resorts`;
  } catch (error) {
    console.error(error);
    return [];
  }
  const resorts = result.rows as Resort[];
  console.log('getResorts -> returning ', resorts.length, ' resorts');
  return resorts;
};

export default getResorts;