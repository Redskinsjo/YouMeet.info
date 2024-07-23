"use client";
import { updateLocalThemes } from "@youmeet/utils/updateLocalThemes";
import { MenuItem, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import React from "react";

const ThemeTypes = [
  { value: "general", label: { en: "General", fr: "General" } },
  { value: "technical", label: { en: "Technical", fr: "Technique" } },
  { value: "behavioral", label: { en: "Behavioral", fr: "Comportemental" } },
];

export default function ThemeTypeField({
  value,
  errors,
  mandatory,
  setValue,
  i,
}: {
  value: string;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  mandatory?: boolean;
  i?: number;
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <div className="xs:fadeIn sm:fadeIn flex flex-col col-span-2 sm:col-span-2 w-full min-w-[195px]">
      <TextField
        multiline
        rows={3}
        sx={{
          "& fieldset": {
            border: `1px solid ${grey[500]} !important`,
          },
        }}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          updateLocalThemes({ text: value }, i);
          setValue(`themes.${i}.text`, value);
        }}
        required={mandatory! == undefined ? mandatory : true}
        label={t("themeText")}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full"
        autoComplete={"off"}
        InputProps={{
          className: `subItem min-h-[60px] flex flex-wrap`,
        }}
        placeholder={t("what-themeText")}
      >
        {ThemeTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label[language as "fr" | "en"]}
          </MenuItem>
        ))}
      </TextField>
      {errors && errors["themeText"] ? (
        <span style={{ color: "#f96666" }}>
          {errors["themeText"]?.message as string}
        </span>
      ) : undefined}
    </div>
  );
}
