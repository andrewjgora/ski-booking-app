//src/lib/resorts.ts
import { BoundingBox, Resort } from "@/types/types";
import { db } from "@vercel/postgres";


// const env = process.env.NODE_ENV;
const client = await db.connect();


async function getResorts(query?: string, boundingBox?: BoundingBox): Promise<Resort[]> {
  console.log('getResorts -> search ', query, boundingBox);
  let result;
  try {
    if (query && boundingBox ) result = await client.sql`SELECT * FROM "Resort" WHERE (name ILIKE %${query}% OR location ILIKE %${query}% OR description ILIKE %${query}%) AND latitude BETWEEN ${boundingBox.swCorner.latitude} AND ${boundingBox.neCorner.latitude} AND longitude BETWEEN ${boundingBox.swCorner.longitude} AND ${boundingBox.neCorner.longitude}`;
    else if (query) result = await client.sql`SELECT * FROM "Resort" WHERE name ILIKE %${query}% OR location ILIKE %${query}% OR description ILIKE %${query}%`;
    else if (boundingBox) result = await client.sql`SELECT * FROM "Resort" WHERE latitude BETWEEN ${boundingBox.swCorner.latitude} AND ${boundingBox.neCorner.latitude} AND longitude BETWEEN ${boundingBox.swCorner.longitude} AND ${boundingBox.neCorner.longitude}`;
    else return new Promise((resolve) => resolve([]))//result = await client.sql`SELECT * FROM "Resort"`;
  } catch (error) {
    console.error(error);
    return [];
  }
  const resorts = result.rows as Resort[];
  return resorts;
};

export default getResorts;