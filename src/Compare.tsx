import { Graph } from './Graph';
import { ComparisonTable } from './ComparisonTable';

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
        {(group1.length > 0 || group2.length > 0) && (
            <div>
              <div className="flex flex-col justify-center gap-20 md:flex-row">
                <ComparisonTable label="Group 1" countries={group1} color="text-blue-500"/>
                <ComparisonTable label="Group 2" countries={group2} color="text-red-500"/>
              </div>
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
            </div>
        )}
      </>
  );
};

export default Compare;