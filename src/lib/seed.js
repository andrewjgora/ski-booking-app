// src/lib/seed.js
import * as fs from 'fs';
// const prisma = new PrismaClient();


async function main() {
  const skiResorts = JSON.parse(fs.readFileSync('./ski_resorts.json', 'utf8'));
  console.log(`Adding ${skiResorts.length} resorts to the database`);

  await Promise.all(skiResorts.map(async (resort) => {
    resort.latitude = parseFloat(resort.latitude);
    resort.longitude = parseFloat(resort.longitude)*-1;
    // await prisma.resort.create({
    //   data: resort,
    // });
  }));
  // const resorts = await prisma.resort.findMany();

  // console.log(`Seeding complete. ${resorts.length} resorts added to the database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // await prisma.$disconnect();
  });
