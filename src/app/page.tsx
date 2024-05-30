import Map from "@/components/Map";
import React from 'react';
import { getResorts } from '../lib/api';


export default async function Dashboard() {
  const resorts = await getResorts();

  return (
    <main className="flex min-h-max flex-col items-center justify-between p-24">
      <Map resorts={resorts}></Map>
    </main>
  );
}
