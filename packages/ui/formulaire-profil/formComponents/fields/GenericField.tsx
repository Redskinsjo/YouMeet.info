"use client";
import { Button, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { useId, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function GenericField({
  register,
  required,
  name,
  placeholder,
  label,
  errors,
  multiline = 0,
  params = {},
  value = "",
  basic,
  onChange,
  sx,
  location,
  fetchData,
  border = `1px solid ${grey[500]}`,
  type,
}: GenericFieldProps) {
  const id = useId();
  let registerParams = {};
  let specificNameParams = {};
  let autoCompleteParams = {};
  let basicParams = {};
  const { t } = useTranslation();

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
        label={t(label)}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full dark:genericFieldDark dark:darkFieldset dark:darkInput dark:darkLabel"
        autoComplete={"off"}
        placeholder={placeholder}
        type={type}
      />
      {name === "search" && (
        <div className="absolute flex-center right-[8px] h-full">
          <Button
            type="submit"
            className="h-auto flex-center bg-deepPurple50 box-border"
          >
            <IoIosSearch className="sentences text-deepPurple900" />
          </Button>
        </div>
      )}
      {errors && errors[location] ? (
        <span style={{ color: "#f96666" }}>
          {errors[location]?.message as string}
        </span>
      ) : undefined}
    </div>
  );
}
