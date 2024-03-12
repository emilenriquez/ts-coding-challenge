
import Select from "react-select";

const CurrencyData = require('currency-codes/data');

// Props

interface Currency {
  code: string;
  number: string;
  digits: number;
  currency: string;
  countries: string[];
}

interface ICurrencyData {
  value: string;
  label: string;
}
interface CurrencySelectProps {
  value?: string;
  // onChange?: (value: ICurrencyData | null, actionMeta: ActionMeta<{ action: "select-option" }>) => void;
  onChange?: (value: string ) => void;
}

// Constants
export const DEFAULT_CURRENCY = "USD - US Dollar";

// Component
const CurrencySelect = ({
  value = DEFAULT_CURRENCY,
  onChange,
}: CurrencySelectProps) => {
  // Prepare data
  const data: ICurrencyData[] = CurrencyData.map(({ code, currency }: Currency) => {
    return {
      value: code + " - " + currency,
      label: code + " - " + currency,
    };
  });
  const defaultValue: ICurrencyData = { value: value, label: value };

  // Render
  return (
    <div>
      <label>
        Currency
        <Select
          options={data}
          defaultValue={defaultValue}
          onChange={(newValue) => {
            onChange?.(newValue!.value);
          }}

        />
      </label>
    </div>
  );
};

export default CurrencySelect;
