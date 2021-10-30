import countriesMap from "./countries-map";

function CountryInfo({ countryName }) {
  const countryCode = countriesMap[countryName];
  return (
    <div className="flex flex-col items-start border-gray-700 pt-4 mr-4">
      <img
        className="rounded border border-black"
        src={`https://flagcdn.com/w40/${countryCode}.png`}
        srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
        width="40"
        alt={countryName}
      />
      <span className="block mt-1 text-xs text-gray-500">{countryName}</span>
    </div>
  );
}

export default CountryInfo;
