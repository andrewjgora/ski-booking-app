"use client";
import Map from "@/components/Map";
import React from 'react';
import { useResorts } from "@/context/ResortsContext";
import Spinner from "@/components/Spinner";


export default function Dashboard() {
  const { resorts, loading } = useResorts();


  if(loading) return <Spinner />;

  return (
    <main className="flex min-h-max flex-col items-center justify-between">
      {loading ? <Spinner /> : <Map resorts={resorts}></Map> }
    </main>
  );
}
