"use client";
import { TextField, useMediaQuery } from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

type SalaryFieldProps = {
  register: UseFormRegister<FieldValues>;
};

const SalaryField = ({ register }: SalaryFieldProps) => {
  const [salary, setSalary] = useState<string>("");
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  const { t } = useTranslation();
  return (
    <TextField
      {...register("salaryExpected")}
      style={{
        animation:
          xs || sm
            ? "slide_in_mobile 0.8s ease-in-out"
            : "slide_in 0.8s ease-in-out",
      }}
      placeholder="Quel salaire souhaitez-vous?"
      InputLabelProps={{
        className: "subItem",
        sx: {
          "&.Mui-focused": {
            transform:
              xs || sm
                ? "translate(14px,-9px) scale(0.75)"
                : "translate(14px,-9px) scale(1)",
          },
          "&:not(.Mui-focused)": {
            transform:
              xs || sm
                ? "translate(9px,2px) scale(0.75)"
                : "translate(9px,2px) scale(1)",
          },
        },
      }}
      label={t("me-profile-infos-label-salary")}
      className="xs:fadeIn sm:fadeIn w-full"
      InputProps={{
        className: "subItem h-[60px]",
      }}
      type={"text"}
      // InputProps={{
      //   endAdornment: (
      //     <CrementIcon
      //       setValue={(val: number) => {
      //         if (Number(watch("salaryExpected")) + val >= 0) {
      //           setSalary(String(Number(watch("salaryExpected")) + val));
      //           setValue(
      //             "salaryExpected",
      //             Number(watch("salaryExpected")) + val
      //           );
      //         }
      //       }}
      //       amount={3000}
      //     />
      //   ),
      // }}
      inputProps={{
        value: salary,
        onChange: (e) => {
          const input = (e.target as HTMLInputElement).value;
          if (Number(input) >= 0) {
            setSalary((e.target as HTMLInputElement).value);
          }
        },
      }}
      sx={{
        "& fieldset": {
          border: "1px solid !important",
          borderColor: purple[500] + " !important",
        },
      }}
    />
  );
};

export default SalaryField;
