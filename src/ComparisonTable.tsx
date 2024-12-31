type Country = {
  name: string;
  flag: string;
  continent: string;
};

export const ComparisonTable = ({
  countries,
  label,
  color,
}: {
  countries: Country[];
  label: string;
  color: string;
}) => {
  return (
    <>
      <div className="flow-root">
        <h3 className={`mb-4 text-lg font-semibold ${color}`}>{label}</h3>
        <ul role="list" className="-mb-8">
          {countries.map((country, index) => (
            <li key={index}>
              <div className="relative pb-8">
                {index !== countries.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-sm">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">{country.name}</p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <div>{country.continent}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
