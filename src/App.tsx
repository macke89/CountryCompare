import Compare from './Compare.tsx';
import { useEffect, useState } from 'react';
import { Map } from './Map.tsx';
import { SearchResult } from './SearchResult.tsx';

function App() {
  // Empty country data
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Get country data from JSON on load
  useEffect(() => {
    import('./data/countries.json')
      .then((data) => setCountriesData(data.default))
      .catch((error) => console.error('Error loading countries data:', error));
  }, []);

  // Function to add and remove countries from groups
  const updateGroup = (index: number) => {
    setCountriesData((prevData) =>
      prevData.map((country, i) =>
        i === index ? { ...country, group: (country.group + 1) % 3 } : country,
      ),
    );
  };

  const filteredCountries = countriesData.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const countriesInGroup = countriesData.filter((country) => country.group > 0);

  return (
    <div className="flex flex-col p-2">
      <div>
        {/*Map Container*/}
        <div>
          <Map countries={countriesData}/>
        </div>
        {/*Search Input Container*/}
        <div className="my-4">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900 select-none"
          >
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

        {/*Search Results Container*/}
        <div className="flex flex-row flex-wrap gap-2">
          {filteredCountries.map((country, index) => (
            <SearchResult
              key={index}
              country={country}
              index={index}
              onGroupClick={() => updateGroup(index)}
            />
          ))}
        </div>
      </div>

      <Compare countries={countriesInGroup} />
    </div>
  );
}

export default App;
