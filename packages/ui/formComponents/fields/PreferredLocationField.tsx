import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { MenuItem, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import locations from "@youmeet/raw-data/regions_departements.json";

const PreferredLocationField = ({
  value,
  errors,
  required,
  setValue,
  placeholder,
  label,
  type,
  name,
  border = `1px solid ${grey[500]}`,
  fnc,
}: GenericFieldProps) => {
  const id = useId();
  const { t } = useTranslation();
  const [fieldVal, setFieldVal] = useState(value);

  return (
    <div className="xs:fadeIn sm:fadeIn flex flex-col col-span-2 sm:col-span-2 w-full min-w-[195px]">
      <TextField
        select
        sx={{
          display: type === "hidden" ? "none" : "block",
          "& fieldset": {
            border,
          },
        }}
        name={name}
        value={fieldVal}
        onChange={(e) => {
          if (setValue) setValue(name, e.target.value);
          setFieldVal(e.target.value);
          if (fnc) {
            fnc();
          }
        }}
        required={required ?? false}
        slotProps={{
          input: { className: `subItem min-h-[60px] flex flex-wrap` },
        }}
        label={label ?? t("preferredLocation")}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full dark:genericFieldDark dark:darkFieldset dark:darkInput dark:darkLabel"
        autoComplete={"off"}
        id={String(id)}
        placeholder={placeholder ?? t("what-offerLocation")}
      >
        {Object.keys(locations).map((location) => {
          return (
            <MenuItem
              key={location.toLowerCase()}
              value={location.toLowerCase()}
            >
              {location[0].toUpperCase() + location.slice(1)}
            </MenuItem>
          );
        })}
      </TextField>
      {errors && errors["preferredLocation"] ? (
        <span style={{ color: "#f96666" }}>
          {errors["preferredLocation"]?.message as string}
        </span>
      ) : undefined}
    </div>
  );
};

export default PreferredLocationField;
