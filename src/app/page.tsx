// import Map from "@/components/Map";
import Spinner from '@/components/Spinner';
import React, { Suspense } from 'react';
const Map = React.lazy(() => import("@/components/Map"))

export default function Dashboard() {
  const resorts = [
    {name: "Berkshire East Mountain Resort", latitude: 42.621188, longitude: -72.877188},
    {name: "Wachusett Mountain Ski Area", latitude: 42.502187, longitude: -71.886188},
    {name: "Killington Resort", latitude: 43.6269, longitude: -72.7968},
    {name: "Stowe Mountain Resort", latitude: 44.5344, longitude: -72.7804}
  ]
  return (
    <main className="flex min-h-max flex-col items-center justify-between p-24">
      <Suspense fallback={<Spinner />}>
        <Map resorts={resorts}></Map>
      </Suspense>
    </main>
  );
}
