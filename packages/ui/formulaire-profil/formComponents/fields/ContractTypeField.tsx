import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { MenuItem, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";

const ContractTypeField = ({
  value,
  errors,
  required,
  setValue,
  placeholder,
  label,
  type,
  id,
  name,
  border = `1px solid ${grey[500]}`,
}: GenericFieldProps) => {
  const [fieldVal, setFieldVal] = useState(value);
  const { t } = useTranslation();
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
        }}
        required={required ?? false}
        label={label ?? t("contractType")}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full dark:genericFieldDark dark:darkFieldset dark:darkInput dark:darkLabel"
        autoComplete={"off"}
        InputProps={{
          className: `subItem min-h-[60px] flex flex-wrap`,
        }}
        id={String(id)}
        placeholder={placeholder ?? t("what-contractType")}
      >
        <MenuItem value={"CDI"}>CDI</MenuItem>
        <MenuItem value={"Interim"}>Interim</MenuItem>
        <MenuItem value={"Stage"}>Stage</MenuItem>
        <MenuItem value={"CDD"}>CDD</MenuItem>
        <MenuItem value={"Alternance"}>Alternance</MenuItem>
        <MenuItem value={"Freelance"}>Freelance</MenuItem>
        <MenuItem value={"Autre"}>Autre</MenuItem>
      </TextField>
      {errors && errors["contractType"] ? (
        <span style={{ color: "#f96666" }}>
          {errors["contractType"]?.message as string}
        </span>
      ) : undefined}
    </div>
  );
};

export default ContractTypeField;
