import { ApexOptions } from 'apexcharts';
import ApexCharts from 'react-apexcharts';

interface GraphProps {
  data: number[];
  title: string;
  labels: string[];
}

export const Graph = ({ data, title, labels }: GraphProps) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      height: 380,
    },
    series: data,
    labels: labels,
    colors: ['#1c20f2', '#b91c1c'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: ['#000'],
      },
    },
    theme: {
      palette: 'palette1',
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
        formatter: (value: number) => value.toLocaleString(),
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
        series={chartOptions.series}
        type="pie"
        height={300}
      />
    </div>
  );
};
