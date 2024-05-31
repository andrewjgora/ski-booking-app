// src/types/resorts.ts
export interface Resort {
  id: number;
  name: string;
  location: string;
  description: string;
  longitude: number;
  latitude: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}