// utils.ts
import { fetchCountryData, PopulationData, GdpData } from './apiService';
import { isoCodes } from './data/isoCodes.ts';

export interface CountryData
  extends PopulationData,
    Omit<GdpData, 'country_name'> {
  group: number; // Custom property for app-specific functionality
}

// Fetch and merge population and GDP data
export const fetchAndMergeCountryData = async (): Promise<CountryData[]> => {
  try {
    const { populationData, gdpData } = await fetchCountryData();

    // Merge the data and filter out invalid ISO codes
    return populationData
      .map((popData) => {
        const gdpDataEntry = gdpData.find(
          (gdp) => gdp.country_id === popData.country_id
        );

        return {
          ...popData,
          total_gdp: gdpDataEntry ? gdpDataEntry.total_gdp : 0, // Fallback if GDP is missing
          group: 0, // Default `group` property
        };
      })
      .filter((data) => isoCodes.includes(data.country_id));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};