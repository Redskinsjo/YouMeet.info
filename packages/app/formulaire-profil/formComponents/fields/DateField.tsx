import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

const DateField = ({
  label,
  border,
  type,
  required,
  value,
  name,
}: GenericFieldProps) => {
  const [fieldVal, setFieldVal] = useState(value);
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  return (
    <div className="xs:fadeIn sm:fadeIn flex flex-col col-span-2 sm:col-span-2 w-full">
      <TextField
        value={fieldVal}
        required={required ?? false}
        label={label}
        name={name}
        onChange={(e) => setFieldVal(e.target.value)}
        className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full"
        type={type}
        focused
        InputProps={{
          className: "subItem h-[60px] w-full",
        }}
        InputLabelProps={{
          className: "subItem",
        }}
        sx={{
          display: type === "hidden" ? "none" : "block",
          "& fieldset": {
            border: `${border} !important`,
          },
        }}
        style={{
          animation:
            xs || sm
              ? "slide_in_mobile 0.8s ease-in-out"
              : "slide_in 0.8s ease-in-out",
        }}
      />
    </div>
  );
};

export default DateField;
