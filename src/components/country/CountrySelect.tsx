import countries from "i18n-iso-countries";
import Select, { ActionMeta } from "react-select";
import { CountrySelectOption } from "./CountrySelectOption";

// Register countries
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Props
export interface ICountry {
  code: string;
  name: string;
}

export interface ICountryData {
  value: ICountry;
  label: string;
}

interface CountrySelectProps {
  value?: ICountry;
  onChange?: (value: ICountry, actionMeta: ActionMeta<ICountryData>) => void;
}



// Constants
export const DEFAULT_COUNTRY: ICountry = {
  code: "US",
  name: "United States of America",
};

// Component
export const CountrySelect = ({
  value = DEFAULT_COUNTRY,
  onChange,
}: CountrySelectProps) => {
  // Prepare Data
  const data: ICountryData[] = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, label]) => ({
    value: { code, name: label },
    label,
  }));

  const defaultValue = { value, label: value.name };

  // Render
  return (
    <div className="select-group">
      <label>
        Country
      </label>
      <Select
        options={data}
        components={{ Option: CountrySelectOption }}
        defaultValue={defaultValue}
        onChange={(newValue, actionMeta) => {
          onChange?.((newValue as ICountryData)!.value || null, actionMeta);
        }}
      />
    </div>
  );
};

export default CountrySelect;
