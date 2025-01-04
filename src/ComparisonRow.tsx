type Country = {
  name: string;
  flag: string;
  continent: string;
  population: number;
  gdp: number;
};

export const ComparisonRow = ({
  countries,
  color,
}: {
  countries: Country[];
  color: string;
}) => {
  // Add commas for readability
  const formatWithCommas = (value: number): string => {
    return value.toLocaleString();
  };
  // format GDP to trillions for readability
  const formatGDPInTrillions = (gdp: number): string => {
    return `${(gdp / 1_000_000_000_000).toFixed(2)}T`;
  };

  const totalPopulation = countries
    .map((country) => country.population)
    .reduce((sum, current) => sum + current, 0);

  const totalGDP = countries
    .map((country) => country.gdp)
    .reduce((sum, current) => sum + current, 0);

  const formattedCountriesData = countries.map((country) => {
    return {
      ...country,
      population: formatWithCommas(country.population),
      populationPercentage: `${(
        (country.population / totalPopulation) *
        100
      ).toFixed(2)}%`,
      gdp: `$${formatGDPInTrillions(country.gdp)}`,
      gdpPercentage: `${((country.gdp / totalGDP) * 100).toFixed(2)}%`,
    };
  });

  return (
    <>
      {formattedCountriesData.map((country, index) => (
        <tr className={color} key={index}>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
            {country.name}
          </td>
          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium">
            {country.continent}
          </td>
          <td className="whitespace-nowrap px-2 py-2 text-sm">
            {country.population}
          </td>
          <td className="whitespace-nowrap px-2 py-2 text-sm">{country.gdp}</td>
        </tr>
      ))}
    </>
  );
};
