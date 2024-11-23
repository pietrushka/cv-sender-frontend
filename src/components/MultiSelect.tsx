import { useSearchParams } from "react-router-dom";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

type TOption = {
  code: string;
  name: string;
};

type MultiSelectProps = {
  queryStringKey: string;
  options: Array<TOption>;
  placeholder: string;
};

export function MultiSelect({ queryStringKey, options }: MultiSelectProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOptions = searchParams.get(queryStringKey)?.split(",") || [];

  function handleMultiChange(
    event: React.SyntheticEvent | null,
    newValues: Array<string> | null
  ) {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newValues?.length) {
      newSearchParams.set(queryStringKey, newValues.join(","));
    } else {
      newSearchParams.delete(queryStringKey);
    }

    setSearchParams(newSearchParams);
  }

  return (
    <Select
      defaultValue={selectedOptions}
      multiple
      size="sm"
      onChange={handleMultiChange}
    >
      {options.map((x) => (
        <Option key={x.code} value={x.code}>
          {x.name}
        </Option>
      ))}
    </Select>
  );
}
