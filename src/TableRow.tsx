type TableRowProps = {
  country: {
    name: string;
    population: string;
    populationPercentage: string;
    gdp: string;
    gdpPercentage: string;
    group: number;
  };
  index: number;
  onGroupClick: () => void;
};

export const TableRow = ({ country, index, onGroupClick }: TableRowProps) => {
  return (
    <tr
      onClick={onGroupClick}
      className={`cursor-pointer ${
        country.group === 1
          ? 'bg-blue-100 text-blue-700 hover:text-red-500'
          : country.group === 2
            ? 'bg-red-100 text-red-700 hover:text-black'
            : 'bg-gray-100 text-gray-500 hover:text-blue-500'
      }`}
      key={index}
    >
      <th
        className={
          country.group === 1
            ? 'whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal'
            : country.group === 2
              ? 'whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal'
              : 'whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal'
        }
      >
        {country.name}
      </th>
      <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs font-medium">
        {country.population}
      </td>
      <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs">
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2 text-xs font-medium">
            {country.populationPercentage}
          </span>
          <div className="relative w-full">
            <div className="h-2 w-full rounded-sm bg-gray-200">
              <div
                className="h-2 rounded-sm bg-cyan-600"
                style={{ width: `${country.populationPercentage}` }}
              ></div>
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs font-medium">
        {country.gdp}
      </td>
      <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs">
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2 text-xs font-medium">
            {country.gdpPercentage}
          </span>
          <div className="relative w-full">
            <div className="h-2 w-full rounded-sm bg-gray-200">
              <div
                className="h-2 rounded-sm bg-green-500"
                style={{ width: `${country.gdpPercentage}` }}
              ></div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};
