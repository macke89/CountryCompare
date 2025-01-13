// apiService.ts
export interface PopulationData {
  country_name: string;  // Example: "USA"
  country_id: string;
  total_population: number;
}

export interface GdpData {
  country_name: string;  // Example: "USA" (shared key with PopulationData for merging)
  country_id: string;
  total_gdp: number;
}

export const fetchCountryData = async (): Promise<{
  populationData: PopulationData[];
  gdpData: GdpData[];
}> => {
  try {
    const [populationResponse, gdpResponse] = await Promise.all([
      fetch('http://localhost:3000/api/countries/population'),
      fetch('http://localhost:3000/api/countries/gdp'),
    ]);

    if (!populationResponse.ok || !gdpResponse.ok) {
      throw new Error('Failed to fetch one or both endpoints.');
    }

    const populationData: PopulationData[] = await populationResponse.json();
    const gdpData: GdpData[] = await gdpResponse.json();

    return { populationData, gdpData };
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};