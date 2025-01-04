import Compare from './Compare.tsx';
import { useEffect, useState } from 'react';
import { Map } from './Map.tsx';
import { SearchResult } from './SearchResult.tsx';

function App() {
  // State for countries and search
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load country data on mount
  useEffect(() => {
    import('./data/countries.json')
      .then((data) => setCountriesData(data.default))
      .catch((error) => console.error('Error loading countries data:', error));
  }, []);

  // Function to update the group for a country by index
  const updateGroup = (index: number) => {
    setCountriesData((prevData) =>
      prevData.map((country, i) =>
        i === index ? { ...country, group: (country.group + 1) % 3 } : country,
      ),
    );
  };

  // Function to update group by ISO code (for use in Map)
  const updateGroupByIso = (iso_code: string) => {
    setCountriesData((prevData) =>
      prevData.map((country) =>
        country.iso_code === iso_code
          ? { ...country, group: (country.group + 1) % 3 }
          : country,
      ),
    );
  };

  // Filter countries by search term
  const filteredCountries = countriesData.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Countries assigned to a group
  const countriesInGroup = countriesData.filter((country) => country.group > 0);

  return (
    <div className="flex flex-col gap-4 p-2 lg:flex-row">
      {/*1 Country Selection Container*/}
      <div className="lg:w-1/2">
        {/*2 Map Container*/}
        <div>
          <Map countries={countriesData} onCountryClick={updateGroupByIso} />
        </div>
        {/*2 Search Container*/}
        <div className="my-4">
          <label className="block select-none text-sm/6 font-medium text-gray-900">
            Search Countries
          </label>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Search countries"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/*1 Search Results Container */}
        <div className="flex flex-row flex-wrap gap-2">
          {filteredCountries.map((country, index) => (
            <SearchResult
              key={country.iso_code}
              country={country}
              index={index}
              onGroupClick={() => updateGroup(index)}
            />
          ))}
        </div>
      </div>

      {/* Compare Component Container */}
      <div className="lg:w-1/2">
        <Compare countries={countriesInGroup} />
      </div>
    </div>
  );
}

export default App;
