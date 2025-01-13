import { ApexOptions } from 'apexcharts';
import ApexCharts from 'react-apexcharts';
import { CountryData } from './data/utils.ts';

interface GraphProps {
  countries: CountryData[];
  mode: 'totalGdp' | 'totalPopulation'; // Mode to determine what to display (GDP or Population)
  title: string;
}

export const Graph = ({ countries, mode, title }: GraphProps) => {
  // Aggregate data by groups
  const groupData = [0, 1, 2].map((group) =>
    countries
      .filter((country) => country.group === group)
      .reduce((sum, country) => sum + (mode === 'totalGdp' ? country.total_gdp : country.total_population), 0),
  );

  // Labels for the groups
  const labels = ['Group 0', 'Group 1', 'Group 2'];

  // Define specific colors for the groups
  const colors = ['#808080', '#1c20f2', '#b91c1c']; // Gray for group 0, Blue for group 1, Red for group 2

  // ApexCharts options
  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      height: 380,
    },
    series: groupData, // Data for the chart (calculated totals for each group)
    labels: labels, // Names of the groups
    colors: colors, // Assign specific colors for the groups
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
      },
      formatter: (value: number) => value.toLocaleString(), // Format values with commas
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: ['#000'], // Black text for legend
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
      x: {
        show: true,
      },
      y: {
        formatter: (value: number) => value.toLocaleString(), // Format values in the tooltip
      },
      marker: {
        show: true,
      },
    },
  };

  return (
    <div className="max-w-md">
      <h3 className="pb-4 text-center text-lg font-semibold text-gray-900">
        {title}
      </h3>
      <ApexCharts
        options={chartOptions}
        series={groupData}
        type="pie"
        height={300}
      />
    </div>
  );
};