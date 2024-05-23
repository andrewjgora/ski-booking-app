// src/components/Map.tsx
"use client"
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Spinner from './Spinner';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface Resort {
  name: string;
  longitude: number;
  latitude: number;
}

interface MapProps {
  resorts: Resort[];
}

const Map: React.FC<MapProps> = ({ resorts }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!mapContainerRef.current || resorts.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [resorts[0].longitude, resorts[0].latitude],
      zoom: 10,
    });

    map.on('load', () => {
      setLoading(false);
      mapContainerRef.current?.classList.remove('invisible')
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each resort
    resorts.forEach(resort => {
      new mapboxgl.Marker()
        .setLngLat([resort.longitude, resort.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setText(resort.name)
        )
        .addTo(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [resorts]);

  return (
    <>
      {loading && (
        <Spinner />
      )}
      <div className="map-container invisible overflow-hidden" ref={mapContainerRef} style={{ height: '500px', width: '100%' }} ></div>
    </>
  );
};

export default Map;
