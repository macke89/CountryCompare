import { Graph } from './Graph';
import { ComparisonRow } from './ComparisonRow.tsx';

const Compare = ({ countries }: { countries: any[] }) => {
  // Filter countries into two groups
  const group1 = countries.filter((country) => country.group === 1);
  const group2 = countries.filter((country) => country.group === 2);

  // Calculate total population and GDP for both groups
  const totalPopulation = [
    group1.reduce((sum, country) => sum + (country.population || 0), 0),
    group2.reduce((sum, country) => sum + (country.population || 0), 0),
  ];
  const totalGDP = [
    group1.reduce((sum, country) => sum + (country.gdp || 0), 0),
    group2.reduce((sum, country) => sum + (country.gdp || 0), 0),
  ];

  return (
    <>
      <div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Graph
              data={totalPopulation}
              title="Population Distribution"
              labels={['Group 1', 'Group 2']}
          />
          <Graph
              data={totalGDP}
              title="GDP Distribution"
              labels={['Group 1', 'Group 2']}
          />
        </div>
        <div className="flex flex-col justify-center gap-20 md:flex-row">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Country Name
              </th>
              <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Continent
              </th>
              <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Population
              </th>
              <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                GDP
              </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            <ComparisonRow
                countries={group1}
                color="bg-blue-50"
            />
            <ComparisonRow
                countries={group2}
                color="bg-red-50"
            />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Compare;
