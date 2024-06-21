// src/components/Map.tsx
"use client"
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Resort } from '@/types/types';
import Spinner from '@/components/Spinner';
import { createRoot } from 'react-dom/client';
import ResortInfoPopup from '@/components/ResortInfoPopup';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
if(mapboxToken) mapboxgl.accessToken = mapboxToken;

type MapProps = {
  resorts: Resort[];
}

const Map = ({ resorts }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [initialLocation, setInitialLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [lng, setLng] = useState(resorts[0]?.longitude ?? 0);
  const [lat, setLat] = useState(resorts[0]?.latitude ?? 0);
  const [zoom, setZoom] = useState(5);
  const [loading, setLoading] = useState(true);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Get user location
  useEffect(() => {
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setInitialLocation({lat: position.coords.latitude, lng: position.coords.longitude});
      if(resorts.length === 0) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }
    }, (error) => {
      console.error('Error getting user location:', error);
      setInitialLocation({lat: 39.6433, lng: -106.3781});
      if(resorts.length === 0) {
        setLat(39.6433);
        setLng(-106.3781);
      }
    });
  }, [resorts.length]);

  // Initialize map
  useEffect(() => {
    if (mapRef.current || !initialLocation || !mapContainerRef.current) return;

    // Instantiate a new Mapbox map
    try {
      console.log('creating map with center location: ', lng, lat);
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng || initialLocation.lng, lat || initialLocation.lat],
        zoom: zoom,
        attributionControl: false,
      });

      mapRef.current.on('move', () => {
        setLng(parseFloat(mapRef.current!.getCenter().lng.toFixed(4)));
        setLat(parseFloat(mapRef.current!.getCenter().lat.toFixed(4)));
        setZoom(parseFloat(mapRef.current!.getZoom().toFixed(2)));
      });

      // mapRef.current.on('moveend', () => {
      //   const bounds = mapRef.current!.getBounds();
      //   const ne = bounds.getNorthEast();
      //   const sw = bounds.getSouthWest();
      // });

      mapRef.current.on('load', () => {
        mapRef.current!.resize();
        setLoading(false);
      });

      // Add navigation control (the +/- zoom buttons)
      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each resort
      resorts.forEach(resort => {
        const popupNode = document.createElement('div');
        const root = createRoot(popupNode);
        root.render(<ResortInfoPopup resort={resort} />);
        const marker = new mapboxgl.Marker()
          .setLngLat([resort.longitude, resort.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 15, className: "w-80 max-w-80" })
              .setDOMContent(popupNode)
          )
          .addTo(mapRef.current!);
        markers.current.push(marker);
      });
    } catch (error) {
      console.error('Error creating map:', error);
    }
  });

  // Update markers when resorts change
  useEffect(() => {
    if(!resorts || !mapRef.current) return;
    markers.current.forEach(marker => marker.remove());

    const newMarkers: mapboxgl.Marker[] = [];
    resorts.forEach(resort => {
      const popupNode = document.createElement('div');
      const root = createRoot(popupNode);
      root.render(<ResortInfoPopup resort={resort} />);
      const marker = new mapboxgl.Marker()
        .setLngLat([resort.longitude, resort.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 15, className: "w-80 !max-w-80" })
            .setDOMContent(popupNode)
        )
        .addTo(mapRef.current!);
        newMarkers.push(marker);
    });
    markers.current.splice(0, markers.current.length, ...newMarkers);
    if(resorts[0]) mapRef.current.flyTo({center: [resorts[0].longitude, resorts[0].latitude], zoom: 5});
  }, [resorts]);


  return (
    <>
    {console.log(`MAP render -> resorts: ${resorts?.length}`)}
      <div className="sidebar w-7/12 absolute z-10 bg-slate-800 text-center text-slate-200 rounded-md mt-2 opacity-80 select-none py-2 lg:whitespace-nowrap">
        <p>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
        <p>Displaying {(resorts).length} {(resorts).length === 1 ? 'result' : 'results'}</p>
      </div>
      <div id="mapContainer" data-testid="mapContainer" className="map-container !h-full" ref={mapContainerRef} style={{ height: '100%', width: '100%' }} >
        {loading && <Spinner fullScreen={false}/>}
      </div>
    </>
  );
};

export default Map;