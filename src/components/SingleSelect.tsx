import { useSearchParams } from "react-router-dom";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import FormControl from "@mui/joy/FormControl";

type TOption = {
  code: string;
  name: string;
};

type SingleSelectProps = {
  queryStringKey: string;
  options: Array<TOption>;
  placeholder: string;
};

export function SingleSelect({ queryStringKey, options }: SingleSelectProps) {
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
    <FormControl>
      <Select
        defaultValue={selectedOptions}
        multiple
        size="sm"
        onChange={handleMultiChange}
        sx={{ width: 200 }}
      >
        {options.map((x) => (
          <Option key={x.code} value={x.code}>
            {x.name}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
}
