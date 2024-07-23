"use client";
import { TextField, useMediaQuery } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FieldProps } from "@youmeet/types/form/fields/FieldProps";
import { purple } from "@mui/material/colors";

const RefPositionField = ({ register, watch, i }: FieldProps) => {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  return register ? (
    <TextField
      sx={{
        "& fieldset": {
          border: "1px solid !important",
          borderColor: purple[500] + " !important",
        },
      }}
      required
      {...register(`contacts[${i}].position`)}
      label={t("refPosition")}
      className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full"
      autoComplete={"off"}
      InputProps={{
        className: "subItem h-[60px]",
      }}
      placeholder={t("what-is-his-position")}
      InputLabelProps={{
        className: "subItem",
        sx: {
          "&.Mui-focused": {
            transform:
              xs || sm
                ? "translate(14px,-9px) scale(0.75)"
                : "translate(14px,-11px) scale(0.75)",
          },
          "&:not(.Mui-focused)": {
            transform:
              watch && (xs || sm) && watch(`contacts[${i}].position`)
                ? "translate(9px,2px) scale(0.75)"
                : watch && watch(`contacts[${i}].position`)
                  ? "translate(14px,-11px) scale(0.75)"
                  : watch && (xs || sm) && !watch(`contacts[${i}].position`)
                    ? "translate(9px,2px) scale(1)"
                    : watch && !watch(`contacts[${i}].position`)
                      ? "translate(13px,15px) scale(1)"
                      : "",
          },
        },
      }}
      style={{
        animation:
          xs || sm ? "fadeIn 0.8s ease-in-out" : "fadeIn 0.8s ease-in-out",
      }}
    />
  ) : undefined;
};

export default RefPositionField;
