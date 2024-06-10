import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '@/components/Map';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    remove: jest.fn(),
    on: jest.fn(),
    flyTo: jest.fn(),
    resize: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  GeolocateControl: jest.fn(),
}));

describe('Map Component', () => {
  it('should render the map container', () => {
    render(<Map resorts={[]}/>);
    const mapElement = screen.getByTestId('mapContainer');
    expect(mapElement).toBeInTheDocument()
  });

  // TODO: more tests
});
