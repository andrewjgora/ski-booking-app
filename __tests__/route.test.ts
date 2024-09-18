/**
 * @jest-environment node
 */

describe('GET route: /api/resorts', () => {
  it('should return resorts based on the search query', async () => {
    const query = 'wachusett';
    const response = await fetch(`http://localhost:3000/api/resorts?q=${query}`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(
      [data[0].name.toLowerCase(), data[0].location.toLowerCase(), data[0].description.toLowerCase()]
        .some(field => field.includes(query))
      ).toBe(true);
  });

  it('should return an empty array for no results', async () => {
    const query = 'FOOBAR MOUNTAIN';
    const response = await fetch(`http://localhost:3000/api/resorts?q=${query}`);

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveLength(0);
  });

  it('should return resorts inside specified bounds', async () => {
    const bounds = {
      neCorner: { latitude: 42.3601, longitude: -71.0589 },
      swCorner: { latitude: 42.3492, longitude: -71.0704 }
    };
    const response = await fetch(`http://localhost:3000/api/resorts?swLat=${bounds.swCorner.latitude}&swLng=${bounds.swCorner.longitude}&neLat=${bounds.neCorner.latitude}&neLng=${bounds.neCorner.longitude}`);
    const resorts = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(resorts)).toBe(true);
    for (const resort of resorts) {
      expect(resort.latitude).toBeGreaterThanOrEqual(bounds.swCorner.latitude);
      expect(resort.latitude).toBeLessThanOrEqual(bounds.neCorner.latitude);
      expect(resort.longitude).toBeGreaterThanOrEqual(bounds.swCorner.longitude);
      expect(resort.longitude).toBeLessThanOrEqual(bounds.neCorner.longitude);
    }
  });

  //TODO: more tests
});
