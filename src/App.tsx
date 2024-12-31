import { TableRow } from './TableRow.tsx';
import TableHeader from './TableHeader.tsx';
import Compare from './Compare.tsx';
import { useEffect, useState } from 'react';

function App() {
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    import('./data/countries.json')
        .then((data) => setCountriesData(data.default))
        .catch((error) => console.error('Error loading countries data:', error));
  }, []);

  const formatWithCommas = (value: number): string => {
    return value.toLocaleString();
  };

  const formatGDPInTrillions = (gdp: number): string => {
    return `${(gdp / 1_000_000_000_000).toFixed(2)}T`;
  };

  const totalPopulation = countriesData
      .map((country) => country.population)
      .reduce((sum, current) => sum + current, 0);

  const totalGDP = countriesData
      .map((country) => country.gdp)
      .reduce((sum, current) => sum + current, 0);

  const updateGroup = (index: number) => {
    setCountriesData((prevData) =>
        prevData.map((country, i) =>
            i === index
                ? { ...country, group: (country.group + 1) % 3 }
                : country
        )
    );
  };

  const filteredCountries = countriesData.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formattedCountriesData = filteredCountries.map((country) => {
    return {
      ...country,
      population: formatWithCommas(country.population),
      populationPercentage: `${((country.population / totalPopulation) * 100).toFixed(
          2
      )}%`,
      gdp: `$${formatGDPInTrillions(country.gdp)}`,
      gdpPercentage: `${((country.gdp / totalGDP) * 100).toFixed(2)}%`,
    };
  });

  const countriesInGroup = countriesData.filter((country) => country.group > 0);

  return (
      <div className="flex flex-col items-center justify-center min-h-screen lg:flex-row gap-4">
        <Compare countries={countriesInGroup} />

        <div>
          <div className="mb-4 w-full max-w-xl">
            <input
                type="text"
                className="w-full rounded border border-gray-300 px-4 py-2"
                placeholder="Search countries"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="block w-full max-w-xl overflow-x-auto border">
            <table className="w-full table-fixed border-collapse items-center bg-transparent">
              <thead>
              <tr>
                <TableHeader>Country</TableHeader>
                <TableHeader>Population</TableHeader>
                <TableHeader>Population %</TableHeader>
                <TableHeader>GDP</TableHeader>
                <TableHeader>GDP %</TableHeader>
              </tr>
              </thead>
              <tbody
                  className="divide-y divide-gray-100"
                  style={{minHeight: '300px'}}
              >
              {formattedCountriesData.map((country, index) => (
                  <TableRow
                      key={index}
                      country={country}
                      index={index}
                      onGroupClick={() => updateGroup(index)}
                  />
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default App;