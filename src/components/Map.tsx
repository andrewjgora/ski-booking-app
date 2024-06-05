// src/components/Map.tsx
"use client"
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Resort, UserLocation } from '@/types/resorts';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface MapProps {
  resorts: Resort[];
  userLocation: UserLocation;
}

const Map = ({ resorts, userLocation }: MapProps) => {
  // console.log('MAP resorts:', resorts)
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(resorts[0]?.longitude ?? userLocation.longitude);
  const [lat, setLat] = useState(resorts[0]?.latitude ?? userLocation.latitude);
  const [zoom, setZoom] = useState(5);


  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    // Instantiate a new Mapbox map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false,
      });

      mapRef.current.on('move', () => {
        setLng(parseFloat(mapRef.current!.getCenter().lng.toFixed(4)));
        setLat(parseFloat(mapRef.current!.getCenter().lat.toFixed(4)));
        setZoom(parseFloat(mapRef.current!.getZoom().toFixed(2)));
      });

      mapRef.current.on('moveend', () => {
        const bounds = mapRef.current!.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        // fetchResortsInBounds(sw.lng, sw.lat, ne.lng, ne.lat);
      });

      mapRef.current.on('load', (e) => {
        mapRef.current!.resize();
      });

      // Add navigation control (the +/- zoom buttons)
      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each resort
      resorts.forEach(resort => {
        new mapboxgl.Marker()
          .setLngLat([resort.longitude, resort.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setText(resort.name)
          )
          .addTo(mapRef.current!);
      });
  });

  return (
    <>
      <div className="sidebar w-7/12 absolute z-10 bg-slate-800 text-center text-slate-200 rounded-md mt-2 opacity-80 select-none py-2 lg:whitespace-nowrap">
        <p>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
        <p>Displaying {resorts.length} {resorts.length === 1 ? 'result' : 'results'}</p>
      </div>
      <div className="map-container !h-full" ref={mapContainerRef} style={{ height: '100%', width: '100%' }} ></div>
    </>
  );
};

export default Map;