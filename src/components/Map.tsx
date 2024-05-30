// src/components/Map.tsx
"use client"
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(resorts[0].longitude);
  const [lat, setLat] = useState(resorts[0].latitude);
  const [zoom, setZoom] = useState(5);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current || resorts.length === 0) return;

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

      mapRef.current.on('load', (e) => {
        setLoading(false);
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
      {loading && (
        <Spinner />
      )}
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container overflow-hidden rounded-md" ref={mapContainerRef} style={{ height: '500px', width: '100%' }} ></div>
    </>
  );
};

export default Map;