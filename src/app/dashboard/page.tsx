import dynamic from "next/dynamic";
import { BoundingBox, Resort } from "@/types/types";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });


export default async function Dashboard({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) {
  let resorts: Resort[] = [];
  console.log('page searchParams:', searchParams);
  const query = searchParams.q as string;
  const bounds: BoundingBox | undefined = (searchParams.swLat && searchParams.swLng && searchParams.neLat && searchParams.neLng) ? {
    swCorner: { latitude: parseFloat(searchParams.swLat as string), longitude: parseFloat(searchParams.swLng as string) },
    neCorner: { latitude: parseFloat(searchParams.neLat as string), longitude: parseFloat(searchParams.neLng as string) }
  } : undefined;

  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (bounds) {
      params.set('swLng', bounds.swCorner.longitude.toString());
      params.set('swLat', bounds.swCorner.latitude.toString());
      params.set('neLng', bounds.neCorner.longitude.toString());
      params.set('neLat', bounds.neCorner.latitude.toString());
    }
    const url = new URL('http://localhost:3000/api/resorts');
    url.search = params.toString();
    const response = await fetch(url.toString(), { cache: 'no-store' });
    resorts = await response.json();
    // console.log('page resorts:', resorts.length);
  } catch (error) {
    console.error(error);
  }


  return (
    <main className="h-full flex flex-col items-center shadow-inner">
      <Map resorts={resorts}></Map>
    </main>
  );
}
