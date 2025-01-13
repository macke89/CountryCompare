import React from 'react';
import { fetchAndMergeCountryData, CountryData } from './utils.ts'; // Use utility function for data merging
import { SearchBar } from './SearchBar.tsx'; // Reusable search bar
import { SearchResult } from './SearchResult.tsx';
// import { Map } from './Map.tsx';

export const App: React.FC = () => {
  const [filteredCountries, setFilteredCountries] = React.useState<
    CountryData[]
  >([]);
  const [searchTerm, setSearchTerm] = React.useState<string>(''); // Track search value

  // Fetch country data on mount
  React.useEffect(() => {
    (async () => {
      const data = await fetchAndMergeCountryData();
      setFilteredCountries(data); // Save the data in local state
    })();
  }, []);

  // Filter search results dynamically
  const searchResults = searchTerm
    ? filteredCountries.filter((country) =>
      country.country_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // Toggle the group value for a country
  const changeCountryGroup = (countryId: string) => {
    const updatedCountries = filteredCountries.map((country) =>
      country.country_id === countryId
        ? { ...country, group: (country.group + 1) % 3 } // Cycle group: 0 → 1 → 2 → 0
        : country
    );

    setFilteredCountries(updatedCountries);
  };

  return (
    <div>
      {/*<Map countries={} onCountryClick={}/>*/}
      <div className="p-4">
        {/* Search Bar Component */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <br />
        {/* Display Search Results */}
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

    </div>);
};