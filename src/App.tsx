import React from 'react';
import { fetchCountryData, PopulationData, GdpData } from './apiService';
import { isoCodes } from './data/isoCodes.tsx';
import { SearchResult } from './SearchResult.tsx';

// Extending PopulationData and GdpData makes sure you inherit the API structure
export interface CountryData
  extends PopulationData,
    Omit<GdpData, 'country_name'> {
  group: number; // Custom property for app-specific functionality
}

export const App = () => {
  const [filteredCountries, setFilteredCountries] = React.useState<
    CountryData[]
  >([]);
  const [searchTerm, setSearchTerm] = React.useState<string>(''); // Track the input's value

  React.useEffect(() => {
    (async () => {
      try {
        const { populationData, gdpData } = await fetchCountryData();

        // Merging populationData and gdpData into a single array
        const countryData: CountryData[] = populationData.map((popData) => {
          // Find corresponding GDP entry by country_id
          const gdpDataEntry = gdpData.find(
            (gdp) => gdp.country_id === popData.country_id,
          );

          return {
            ...popData, // Include all PopulationData fields
            total_gdp: gdpDataEntry ? gdpDataEntry.total_gdp : 0, // Fallback to 0 if no match
            group: 0, // Add group property with default value
          };
        });

        // Filtered countries based on ISO codes
        const filteredCountries: CountryData[] = countryData.filter(
          (data) => isoCodes.includes(data.country_id), // Ensure only valid ISO codes are included
        );

        setFilteredCountries(filteredCountries); // Save filteredCountries in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })(); // Call the function immediately
  }, []);

// Dynamically derive the search results based on the current search term
  const searchResults = searchTerm
    ? filteredCountries.filter((country) =>
      country.country_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  function changeCountryGroup(countryId: string) {
    const updatedCountries = filteredCountries.map((country) =>
      country.country_id === countryId
        ? {
            ...country,
            group: (country.group + 1) % 3, // Cycle the group value: 0 → 1 → 2 → 0
          }
        : country,
    );

    setFilteredCountries(updatedCountries); // Update the filteredCountries state
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value); // Update the searchTerm on user input
  }

  return (
    <>
      <div className="p-4">
        <label className="block select-none text-sm/6 font-medium text-gray-900">
          Search Countries
        </label>
        <div className="mt-2">
          <input
            type="text"
            value={searchTerm} // Bind the input to searchTerm
            onChange={handleSearchChange} // Update searchTerm on user input
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            placeholder="Search countries"
          />
        </div>
        <br />
        <div className="flex flex-row flex-wrap gap-2">
          {searchResults.map((country, index) => (
            <SearchResult
              key={index}
              country={country}
              index={index}
              onClick={changeCountryGroup}
            />
          ))}
        </div>
      </div>
    </>
  );
};
