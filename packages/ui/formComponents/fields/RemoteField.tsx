import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { MenuItem, TextField } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";

export default function RemoteField({
  register,
  required,
  errors,
  placeholder,
  label,
  setValue,
  type,
  value,
  name,
}: GenericFieldProps) {
  const id = useId();
  const [fieldVal, setFieldVal] = useState(value);
  const { t } = useTranslation();
  return (
    <div className="xs:fadeIn sm:fadeIn flex flex-col col-span-2 sm:col-span-2 w-full">
      <TextField
        id={String(id)}
        select
        sx={{
          display: type === "hidden" ? "none" : "block",
          "& fieldset": {
            border: `${`0.5px solid ${purple[500]}`} !important`,
          },
        }}
        name={name}
        value={fieldVal}
        onChange={(e) => {
          if (setValue) setValue(name, e.target.value);
          setFieldVal(e.target.value);
        }}
        required={required ?? false}
        label={label ?? t("remote")}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full dark:genericFieldDark dark:darkFieldset dark:darkInput dark:darkLabel"
        autoComplete={"off"}
        InputProps={{
          className: `subItem min-h-[60px] flex flex-wrap`,
        }}
        placeholder={placeholder ?? t("what-remote")}
      >
        <MenuItem value={"on-site"}>{t("on-site")}</MenuItem>
        <MenuItem value={"hybrid"}>{t("hybrid")}</MenuItem>
        <MenuItem value={"full-remote"}>{t("full-remote")}</MenuItem>
      </TextField>
      {errors && errors["remote"] ? (
        <span style={{ color: "#f96666" }}>
          {errors["remote"]?.message as string}
        </span>
      ) : undefined}
    </div>
  );
}
