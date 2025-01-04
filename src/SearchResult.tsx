type SearchResultProps = {
  country: {
    name: string;
    population: string;
    populationPercentage: string;
    gdp: string;
    gdpPercentage: string;
    group: number;
    flag: string; // Add this to display the flag
  };
  index: number;
  onGroupClick: () => void;
};
export const SearchResult = ({
  country,
  index,
  onGroupClick,
}: SearchResultProps) => {
  // Determine the base and hover colors dynamically based on the group property
  const groupStyles =
    country.group === 1
      ? 'bg-blue-500 text-white hover:bg-red-200'
      : country.group === 2
        ? 'bg-red-500 text-white hover:bg-gray-200'
        : 'bg-gray-300 text-gray-600 hover:bg-blue-100';

  return (
    <>
      <span
        key={index}
        onClick={onGroupClick}
        className={`inline-flex cursor-pointer items-center gap-x-1.5 rounded-full px-2 py-1 font-medium select-none ${groupStyles}`}
      >
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="h-6 w-6 rounded-full"
        />
        {country.name}
      </span>
    </>
  );
};
