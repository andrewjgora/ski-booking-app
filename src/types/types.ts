// src/types/types.ts
export interface Resort {
  id: number;
  name: string;
  location: string;
  description: string;
  longitude: number;
  latitude: number;
}

export type Coordinate = {
  latitude: number;
  longitude: number;
}

export type BoundingBox = {
  swCorner: Coordinate;
  neCorner: Coordinate;
};