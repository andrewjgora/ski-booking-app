// src/lib/seed.js
import { promises as fs } from 'fs';
import { sql } from '@vercel/postgres';

export async function viewTable() {
  return new Promise(async (resolve, reject) => {
    try {
      const resorts = await sql`
        SELECT * FROM "resorts";
      `;
      console.log('resorts: ', resorts);
      resolve(resorts);
    }
    catch (e) {
      console.error('error viewing table: ', e);
      reject(new Error('error viewing table'));
    }
  }
  );
}

export async function dropTable() {
  return new Promise(async (resolve, reject) => {
    try {
      await sql`
        DROP TABLE IF EXISTS "resorts";
      `;
      console.log('table dropped successfully');
      resolve({ message: 'table dropped successfully' });
    } catch (e) {
      console.error('error dropping table: ', e);
      reject(new Error('error dropping table'));
    }
  });
}

export async function seedVercelDb() {
  const skiResorts = JSON.parse(await fs.readFile(process.cwd() + '/src/lib/ski_resorts.json', 'utf8'));
  console.log(`Adding ${skiResorts.length} resorts to the database`);
  return new Promise(async (resolve, reject) => {
    try {
      console.log('creating table');
      const createResult = await sql`
        CREATE TABLE IF NOT EXISTS "resorts" (
          id SERIAL PRIMARY KEY,
          name TEXT UNIQUE NOT NULL,
          location TEXT NOT NULL,
          description TEXT,
          website TEXT DEFAULT 'TODO' NOT NULL,
          latitude DOUBLE PRECISION DEFAULT 0 NOT NULL,
          longitude DOUBLE PRECISION DEFAULT 0 NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      console.log(createResult);

      for(const resort of skiResorts) {
        await sql`
          INSERT INTO "resorts" (name, location, description, website, latitude, longitude)
          VALUES (${resort.name}, ${resort.location}, ${resort.description}, ${resort.website}, ${resort.latitude}, ${resort.longitude})
          ON CONFLICT (name) DO NOTHING;
        `;
      }
      console.log('db seeded successfully');
      resolve({ message: 'db seeded successfully' });
    } catch (e) {
      console.error('error seeding db: ', e);
      reject(new Error('error seeding db'));
    }
  });
}
