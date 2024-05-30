"use client";
import Map from "@/components/Map";
import React from 'react';
import { useResorts } from "@/context/ResortsContext";
import Spinner from "@/components/Spinner";


export default function Dashboard() {
  const { resorts, loading } = useResorts();


  return (
    <main className="h-full flex flex-col items-center">
      {loading ? <Spinner /> : <Map resorts={resorts}></Map> }
    </main>
  );
}
