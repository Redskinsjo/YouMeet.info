"use client";
import { MenuItem } from "@mui/material";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { purple } from "@mui/material/colors";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import SimpleField from "./SimpleField";
import phoneCodes from "@youmeet/raw-data/phoneCodes.json";
import React from "react";

export default function PhoneField({
  id,
  name,
  label,
  type,
  phonecode,
  value,
  required,
  errors,
  setError,
  clearErrors,
}: NewFieldProps) {
  return (
    <div className="flex w-full gap-[3px]">
      <div className="w-[120px] xs:w-[130px] sm:w-[130px]">
        <SimpleField
          id={40}
          name="phonecode"
          type={type}
          label="Code"
          value={phonecode as string}
          required={required}
          select
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
        >
          {phoneCodes.map((c) => (
            <MenuItem
              key={c.name}
              sx={{
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                justifyContent: "space-between",
              }}
              value={c.dial_code}
            >
              <div className="flex-bet w-full">
                <div>{c.name}</div>

                <div className="w-full flex items-center justify-end text-purple500">
                  <BsFillArrowUpCircleFill
                    style={{
                      display: "none",
                      margin: "0px 6px",
                      color: purple[100],
                    }}
                    className="me-profile-phonecode-menu-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.querySelector(".MuiMenu-paper")?.scroll(0, 0);
                    }}
                  />
                  {c.dial_code}
                </div>
              </div>
            </MenuItem>
          ))}
        </SimpleField>
      </div>
      <SimpleField
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        required={required}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
      />
    </div>
  );
}
