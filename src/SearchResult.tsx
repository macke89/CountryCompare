import React from 'react';
import { CountryData } from './utils.ts'; // Import the exported CountryData from App.tsx
interface SearchResultProps {
  country: CountryData;
  index?: number;
  onClick: (country_id: string) => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  country,
  index,
  onClick,
}) => {
  const getBackgroundColor = () => {
    switch (
      country.group // Use country.group directly
    ) {
      case 0:
        return 'bg-gray-200'; // Light gray background
      case 1:
        return 'bg-blue-200'; // Light blue background
      case 2:
        return 'bg-red-200'; // Light red background
      default:
        return 'bg-white'; // Default to white
    }
  };

  return (
    <div
      key={index}
      onClick={() => onClick(country.country_id)}
      className={`flex cursor-pointer select-none flex-col items-start rounded-md border p-2 shadow-sm ${getBackgroundColor()}`}
    >
      <h3 className="font-bold">{country.country_name}</h3>
      <p>Population: {country.total_population.toLocaleString()}</p>
      <p>GDP: {country.total_gdp.toLocaleString()}</p>
    </div>
  );
};
