"use client";
import Map from "@/components/Map";
import React, { useState, useEffect } from 'react';
import { useResorts } from "@/context/ResortsContext";
import Spinner from "@/components/Spinner";


export default function Dashboard() {
  const { resorts, loading } = useResorts();
  const userLocation = useGeoLocation();

  return (
    <main className="h-full flex flex-col items-center">
      {loading ? <Spinner /> : <Map resorts={resorts} userLocation={userLocation}></Map> }
    </main>
  );
}

const useGeoLocation = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.error('Error ' + error.code + ': ' + error.message);
    })
  }, []);

  return location;
}