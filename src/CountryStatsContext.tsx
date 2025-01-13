import React, { createContext, useState, useEffect } from 'react';
import { isoCodes } from './data/isoCodes.ts'; // Import the list of allowed ISO codes

// Define the shape of a country's statistics
interface CountryStats {
  name: string;
  iso_code: string;
  population: number;
  gdp: number;
}

// Context definition
const CountryStatsContext = createContext<{ countriesStats: CountryStats[]; loading: boolean }>({
  countriesStats: [],
  loading: true,
});

// Context provider
export const CountryStatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [countriesStats, setCountriesStats] = useState<CountryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the data asynchronously
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch population and GDP data
        const populationData = await (await fetch('http://localhost:3000/api/countries/population')).json();
        const gdpData = await (await fetch('http://localhost:3000/api/countries/gdp')).json();

        // Combine and filter data
        const filteredData = populationData
          .map((popItem: any) => ({
            name: popItem.country_name,
            iso_code: popItem.iso_code,
            population: popItem.total_population,
            gdp: gdpData.find((g: any) => g.iso_code === popItem.iso_code)?.total_gdp || 0,
          }))
          // Filter only the countries present in the imported isoCodes array
          .filter((country: CountryStats) => isoCodes.includes(country.iso_code));

        setCountriesStats(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function properly without returning it
    fetchData();
  }, []); // Dependencies are empty, so this effect runs only once

  return (
    <CountryStatsContext.Provider value={{ countriesStats, loading }}>
      {children}
    </CountryStatsContext.Provider>
  );
};

// Export the Context for use in components
export { CountryStatsContext };