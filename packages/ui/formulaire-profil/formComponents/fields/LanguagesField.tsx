import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import { MenuItem } from "@mui/material";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { purple } from "@mui/material/colors";
import phoneCodes from "@youmeet/raw-data/phoneCodes.json";
import languages from "@youmeet/raw-data/languages.json";
import dynamic from "next/dynamic";

const SimpleField = dynamic(() => import("./SimpleField"), {
  ssr: false,
});

export default function LanguagesField({
  name,
  type,
  value,
  errors,
  setError,
  clearErrors,
  setValue,
  required,
}: GenericFieldProps & NewFieldProps) {
  return (
    <SimpleField
      name={name}
      type={type}
      label="Languages"
      value={value}
      required={required}
      select
      multiple
      setValue={setValue}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
    >
      {Object.entries(languages)
        .map(([key, value]) => value.name)
        .map((lang) => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
    </SimpleField>
  );
}
