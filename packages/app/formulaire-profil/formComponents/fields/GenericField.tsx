import { TextField } from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { IoIosSearch } from "react-icons/io";

const GenericField = ({
  register,
  required,
  name,
  placeholder,
  label,
  errors,
  multiline = 0,
  params = {},
  value,
  basic,
  onChange,
  sx,
  location,
  fetchData,
  border = `1px solid ${grey[500]}`,
  type,
  id,
}: GenericFieldProps) => {
  let registerParams = {};
  let specificNameParams = {};
  let autoCompleteParams = {};
  let basicParams = {};

  if (basic) {
    basicParams = {
      value,
      onChange: onChange
        ? (e: any) => {
            onChange(e.target.value);
          }
        : () => {},
    };
  } else if (fetchData) {
    delete params.key;
    autoCompleteParams = {
      ...params,
      onChange: async (e: any) => {
        await fetchData(e.target.value);
      },
    };
  }
  if (register) {
    registerParams = { ...register(name) };
    if (id) (registerParams as any).id = String(id);
  }
  if (name === "limitDate") {
    specificNameParams = { focused: true };
  }

  return (
    <div className="xs:fadeIn sm:fadeIn flex flex-col w-full relative">
      <TextField
        sx={{
          ...sx,
          display: type === "hidden" ? "none" : "block",
          width: "100%",
          "& fieldset": {
            border,
          },
          "& .MuiInputBase-root": { width: "100%" },
        }}
        {...autoCompleteParams}
        {...basicParams}
        {...registerParams}
        {...specificNameParams}
        name={name}
        multiline={multiline && multiline !== 0 ? true : false}
        rows={multiline ? multiline : undefined}
        required={required}
        label={label}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full dark:genericFieldDark dark:darkFieldset dark:darkInput dark:darkLabel"
        autoComplete={"off"}
        placeholder={placeholder}
        type={type}
      />
      {name === "search" && (
        <div className="absolute h-full flex-center right-[12px] dark:text-white">
          <IoIosSearch className="item" />
        </div>
      )}
      {errors && errors[location] ? (
        <span style={{ color: "#f96666" }}>
          {errors[location]?.message as string}
        </span>
      ) : undefined}
    </div>
  );
};

export default GenericField;
