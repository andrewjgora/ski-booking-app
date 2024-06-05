import dynamic from "next/dynamic";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const fetchResorts = async () => {
  const response = await fetch('http://localhost:5678/api/resorts');
  if (!response.ok) {
    throw new Error('Failed to fetch resorts');
  }
  return response.json();
}

export default async function Page() {
  // const { resorts, loading } = useResorts();
  const resorts = await fetchResorts();

  return (
    <main className="h-full flex flex-col items-center">
      <Map initialResorts={resorts} ></Map>
    </main>
  );
}
