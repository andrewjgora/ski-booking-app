import dynamic from "next/dynamic";
import { Resort } from "@/types/types";
import { getResorts } from "@/actions/actions";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });


export default async function Page() {
  let resorts: Resort[] = [];
  try {
    resorts = await getResorts();
    console.log('page resorts:', resorts.length)
  } catch (error) {
    console.error(error);
  }


  return (
    <main className="h-full flex flex-col items-center">
      <Map initialResorts={resorts} ></Map>
    </main>
  );
}
