"use client";
import { Button, TextField, TextFieldProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { useId, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { VscFilterFilled } from "react-icons/vsc";

export default function GenericField({
  register,
  required,
  name,
  placeholder,
  label,
  errors,
  multiline = 0,
  params,
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
  const [timer, setTimerId] = useState<NodeJS.Timeout | null>(null);

  if (basic) {
    basicParams = {
      value,
      onChange: onChange
        ? (e: any) => {
            onChange(e.target.value);
          }
        : () => {},
    };
  } else if (fetchData && params) {
    autoCompleteParams = {
      size: params.size,
      id: params.id,
      disabled: params.disabled,
      fullWidth: params.fullWidth,
      slotProps: {
        input: { ...params.InputProps },
        htmlInput: { ...params.inputProps },
        inputLabel: { ...params.InputLabelProps },
      },

      onChange: (e: any) => {
        if (timer) clearTimeout(timer);

        const timerId = setTimeout(() => fetchData(e.target.value), 300);
        setTimerId(timerId);
      },
    } as TextFieldProps;
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
        label={t(`${label || ""}`)}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full dark:genericFieldDark dark:darkFieldset dark:darkInput dark:darkLabel"
        placeholder={t(`${placeholder || ""}`)}
        type={type}
      />
      {(name === "search" || name === "location") && (
        <div className="absolute flex-center right-[8px] h-full">
          <Button
            type="submit"
            className="h-auto flex-center bg-deepPurple50 box-border"
          >
            {name === "search" ? (
              <IoIosSearch className="sentences text-deepPurple900" />
            ) : (
              <VscFilterFilled className="sentences text-deepPurple900" />
            )}
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
