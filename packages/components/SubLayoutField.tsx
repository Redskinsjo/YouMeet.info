import { TextField, useMediaQuery } from "@mui/material";
import { blueGrey, deepPurple, red } from "@mui/material/colors";
import React, { Dispatch, SetStateAction } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SubLayoutField = ({
  id,
  errors,
  onChange,
  value,
  fieldName,
  className,
  params,
  label,
  disabled,
  style,
  type,
  password,
  seePassword,
  setSeePassword,
  tabIndex,
  displayMessage,
  required = true,
  rows,
}: {
  id?: string;
  errors?: FieldErrors<FieldValues>;
  onChange?: (e: any) => void;
  value?: string;
  fieldName: string;
  className?: string;
  params?: any;
  label: string | undefined;
  disabled?: boolean;
  style?: { [attr: string]: string | number };
  type?: "search";
  password?: true;
  seePassword?: boolean;
  setSeePassword?: Dispatch<SetStateAction<boolean>>;
  tabIndex?: number;
  displayMessage?: boolean;
  required?: boolean;
  rows?: number;
}) => {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  return displayMessage ? (
    <div className={className + " " + "relative"}>
      <TextField
        id={id}
        tabIndex={tabIndex}
        required={required}
        name={fieldName}
        multiline
        rows={rows ? rows : 1}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={errors && errors[fieldName] ? true : false}
        InputProps={{
          className: "subItem min-h-[52px] w-full",
          sx: {
            backgroundColor:
              errors && errors[fieldName]
                ? `${red[50]} !important`
                : "transparent",
            "&::after": {
              borderBottomColor: deepPurple[700],
            },
            "& .Mui-disabled": {
              WebkitTextFillColor: "unset !important",
            },
          },
          style,
        }}
        label={
          errors && errors[fieldName]
            ? errors && (errors[fieldName]?.message as string)
            : label
        }
        InputLabelProps={{
          className: "legend text-ellipsis",
          sx: {
            "& .Mui-focused": {
              transform:
                xs || sm
                  ? "translate(14px,-9px) scale(0.75)"
                  : "translate(14px,-9px) scale(1)",
            },
            "&:not(.Mui-focused)": {
              transform:
                (xs || sm) && !disabled
                  ? "translate(14px,1px) scale(0.75)"
                  : !xs && !sm && !disabled
                    ? "translate(14px,1px) scale(1)"
                    : (xs || sm) && disabled
                      ? "translate(14px,-9px) scale(0.75)"
                      : "translate(14px,-9px) scale(1)",
            },
          },
        }}
        className={className}
        variant={type ? "outlined" : "filled"}
        sx={{
          "& input": {
            boxSizing: "border-box !important",
          },
          "& .MuiInputBase-root.Mui-disabled": {
            backgroundColor: blueGrey[50],
          },
          "& .MuiInputBase-root:hover": {
            backgroundColor: blueGrey[50],
          },
          "& .MuiInputBase-root.Mui-focused": {
            backgroundColor: blueGrey[50],
          },
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute h-full top-0 right-[12px] subItem flex-center z-10 fadeIn text-blueGrey700">
        Nous récupérons seulement l&apos;identifiant
      </div>
    </div>
  ) : password ? (
    <div className={"w-full relative"}>
      {!seePassword && setSeePassword ? (
        <div className="absolute h-full top-0 right-0 w-[36px] flex-center z-10">
          <AiOutlineEye
            className="item text-black cursor-pointer"
            onClick={() => setSeePassword(true)}
          />
        </div>
      ) : setSeePassword ? (
        <div className="absolute h-full top-0 right-0 w-[36px] flex-center z-10">
          <AiOutlineEyeInvisible
            className="item text-black cursor-pointer"
            onClick={() => setSeePassword(false)}
          />
        </div>
      ) : undefined}
      <TextField
        tabIndex={tabIndex}
        required={required}
        name={fieldName}
        multiline
        rows={rows ? rows : 1}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={errors && errors[fieldName] ? true : false}
        InputProps={{
          className: "subItem min-h-[52px] w-full",
          sx: {
            backgroundColor:
              errors && errors[fieldName]
                ? `${red[50]} !important`
                : "transparent",
            "&::after": {
              borderBottomColor: deepPurple[700],
            },
            "& .Mui-disabled": {
              WebkitTextFillColor: "unset !important",
            },
          },
          style,
        }}
        label={
          errors && errors[fieldName]
            ? (errors[fieldName]?.message as string)
            : label
        }
        InputLabelProps={{
          className: "subItem text-ellipsis",
          sx: {
            "& .Mui-focused": {
              transform:
                xs || sm
                  ? "translate(14px,-9px) scale(0.75)"
                  : "translate(14px,-9px) scale(1)",
            },
            "&:not(.Mui-focused)": {
              transform:
                (xs || sm) && !disabled
                  ? "translate(14px,1px) scale(0.75)"
                  : !xs && !sm && !disabled
                    ? "translate(14px,1px) scale(1)"
                    : (xs || sm) && disabled
                      ? "translate(14px,-9px) scale(0.75)"
                      : "translate(14px,-9px) scale(1)",
            },
          },
        }}
        className={className}
        variant={type ? "outlined" : "filled"}
        sx={{
          "& .MuiInputBase-root.Mui-disabled": {
            backgroundColor: blueGrey[50],
          },
          "& .MuiInputBase-root:hover": {
            backgroundColor: blueGrey[50],
          },
          "& .MuiInputBase-root.Mui-focused": {
            backgroundColor: blueGrey[50],
          },
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  ) : !params ? (
    <TextField
      tabIndex={tabIndex}
      required={required}
      name={fieldName}
      multiline
      rows={rows ? rows : 1}
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={errors && errors[fieldName] ? true : false}
      style={style}
      InputProps={{
        className: "subItem min-h-[52px] w-full",
        sx: {
          backgroundColor:
            errors && errors[fieldName]
              ? `${red[50]} !important`
              : "transparent",
          "&::after": {
            borderBottomColor: deepPurple[700],
          },
          "& .Mui-disabled": {
            WebkitTextFillColor: "unset !important",
          },
        },
        style,
      }}
      label={
        errors && errors[fieldName]
          ? errors && (errors[fieldName]?.message as string)
          : label
      }
      InputLabelProps={{
        className: "subItem text-ellipsis",
        sx: {
          "& .Mui-focused": {
            transform:
              xs || sm
                ? "translate(14px,-9px) scale(0.75)"
                : "translate(14px,-9px) scale(1)",
          },
          "&:not(.Mui-focused)": {
            transform:
              (xs || sm) && !disabled
                ? "translate(14px,1px) scale(0.75)"
                : !xs && !sm && !disabled
                  ? "translate(14px,1px) scale(1)"
                  : (xs || sm) && disabled
                    ? "translate(14px,-9px) scale(0.75)"
                    : "translate(14px,-9px) scale(1)",
          },
        },
      }}
      className={className}
      variant={type ? "outlined" : "filled"}
      sx={{
        "& .MuiInputBase-root.Mui-disabled": {
          backgroundColor: blueGrey[50],
        },
        "& .MuiInputBase-root:hover": {
          backgroundColor: blueGrey[50],
        },
        "& .MuiInputBase-root.Mui-focused": {
          backgroundColor: blueGrey[50],
        },
      }}
      onClick={(e) => e.stopPropagation()}
    />
  ) : (
    <TextField
      tabIndex={tabIndex}
      autoComplete="off"
      {...params}
      required={required}
      name={fieldName}
      multiline
      rows={rows ? rows : 1}
      disabled={disabled}
      onChange={onChange}
      error={errors && errors[fieldName] ? true : false}
      style={style}
      InputProps={{
        ...params.InputProps,
        className: "subItem min-h-[52px] w-full",
        sx: {
          backgroundColor:
            errors && errors[fieldName]
              ? `${red[50]} !important`
              : "transparent",
          "&::after": {
            borderBottomColor: deepPurple[700],
          },
          "& .Mui-disabled": {
            WebkitTextFillColor: "unset !important",
          },
        },
        style,
      }}
      label={
        errors && errors[fieldName]
          ? errors && (errors[fieldName]?.message as string)
          : label
      }
      InputLabelProps={{
        className: "subItem text-ellipsis",
        sx: {
          "& .Mui-focused": {
            transform:
              xs || sm
                ? "translate(14px,-9px) scale(0.75)"
                : "translate(14px,-9px) scale(1)",
          },
          "&:not(.Mui-focused)": {
            transform:
              (xs || sm) && !disabled
                ? "translate(14px,1px) scale(0.75)"
                : !xs && !sm && !disabled
                  ? "translate(14px,1px) scale(1)"
                  : (xs || sm) && disabled
                    ? "translate(14px,-9px) scale(0.75)"
                    : "translate(14px,-9px) scale(1)",
          },
        },
      }}
      variant={type ? "outlined" : "filled"}
      sx={{
        "& .MuiInputBase-root.Mui-disabled": {
          backgroundColor: blueGrey[50],
        },
        "& .MuiInputBase-root:hover": {
          backgroundColor: blueGrey[50],
        },
        "& .MuiInputBase-root.Mui-focused": {
          backgroundColor: blueGrey[50],
        },
      }}
    />
  );
};

export default SubLayoutField;
