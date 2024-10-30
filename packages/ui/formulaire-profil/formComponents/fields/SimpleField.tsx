"use client";
import { TextField, useMediaQuery } from "@mui/material";
import React, { useEffect, useId, useState } from "react";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import {
  linkedinIdRegex,
  linkedinPageRegex,
} from "@youmeet/utils/basics/formatLinkedin";
import { getSimpleCompany } from "@youmeet/functions/request";
import { BetaCompany } from "@youmeet/gql/generated";
import { isCompany } from "@youmeet/types/TypeGuards";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";

const set = (name: string) => {
  if (
    name === "name" ||
    name === "company" ||
    name === "linkedinProfileId" ||
    name == "linkedinProfilePage" ||
    name === "chosen" ||
    name === "phonecode"
  )
    return name;
  return "default";
};

export default function SimpleField({
  name,
  label,
  required,
  value = "",
  type = "hidden",
  multiline,
  select = false,
  rows,
  children,
  multiple,
  errors,
  setError,
  clearErrors,
  placeholder,
  setValue,
  tabIndex = undefined,
  onChange,
  fromYouMeet,
  category,
}: NewFieldProps) {
  const id = useId();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const user = useSelector((state: RootState) => state.user as UserState);
  const [fieldVal, setFieldVal] = useState(
    !value && multiple ? [] : !value && !multiple ? "" : value
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const selectProps = {} as {
    renderValue: (value: unknown) => React.ReactNode;
  };

  if (select) {
    selectProps.renderValue = (value) => {
      return typeof value === "string" ? (
        <>{value}</>
      ) : (
        <div className="flex flex-wrap gap-[6px]">
          {(value as string[]).map((item) => (
            <div
              key={item}
              className="px-[12px] py-[6px] bg-grey100 border-[0.5px] border-solid border-grey500 dark:text-black font-semi-bold rounded-[14px]"
            >
              {item}
            </div>
          ))}
        </div>
      );
    };
  }

  const getOnChange = () => {
    return {
      phonecode: (e: any) => {
        if (clearErrors) clearErrors();
        if (setValue) setValue(name, e.target.value);
      },
      name: async (e: any) => {
        if (clearErrors) clearErrors();
        if (timer) clearTimeout(timer);

        const timerId = setTimeout(async () => {
          const exist = (await getSimpleCompany<BetaCompany>({
            filters: { exact: true, name: e.target.value, pro: true },
          })) as BetaCompany;
          if (exist && isCompany(exist) && exist.id !== user.company?.id)
            if (setError)
              setError(name, { message: "Cette entreprise existe déjà" });
        }, 700);

        setTimer(timerId);
        if (setValue) setValue(name, e.target.value);
        setFieldVal(e.target.value);
      },
      company: async (e: any) => {
        if (clearErrors) clearErrors();
        if (timer) clearTimeout(timer);

        const timerId = setTimeout(async () => {
          const exist = (await getSimpleCompany<BetaCompany>({
            filters: { exact: true, name: e.target.value, pro: true },
          })) as BetaCompany;
        }, 700);

        setTimer(timerId);
        if (setValue) setValue(name, e.target.value);
        setFieldVal(e.target.value);
      },
      linkedinProfileId: (e: any) => {
        if (clearErrors) clearErrors();
        if (!linkedinIdRegex.test(e.target.value))
          if (setError)
            setError(name, { message: "Le lien n'est pas correcte." });
        if (setValue) setValue(name, e.target.value);
        setFieldVal(e.target.value);
      },
      linkedinProfilePage: (e: any) => {
        if (clearErrors) clearErrors();
        if (!linkedinPageRegex.test(e.target.value))
          if (setError)
            setError(name, { message: "Le lien n'est pas correcte." });
        if (setValue) setValue(name, e.target.value);
        setFieldVal(e.target.value);
      },
      chosen: (e: any) => {
        if (onChange) onChange(e.target.value);
        setFieldVal(e.target.value);
      },
      default: (e: any) => {
        if (setValue) setValue(name, e.target.value);
        setFieldVal(e.target.value);
      },
    };
  };

  useEffect(() => {
    setFieldVal(value);
  }, [value]);

  return (
    <>
      <TextField
        focused
        tabIndex={tabIndex}
        error={!!errors && errors[name] ? true : false}
        placeholder={placeholder}
        sx={{
          display: type === "hidden" ? "none" : "block",
        }}
        type={
          (!fromYouMeet && name === "companyName") ||
          (category === "organisation" && name === "companyName")
            ? "hidden"
            : type
        }
        name={name}
        value={fieldVal}
        required={!!required}
        id={String(id)}
        select={select}
        multiline={multiline ?? false}
        rows={multiline ? rows : undefined}
        onChange={getOnChange()[set(name)]}
        slotProps={{
          select: { multiple: !!multiple },
          input: {
            className: "subItem h-[60px]",
          },
          inputLabel: {
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
                  (xs || sm) && value
                    ? "translate(9px,2px) scale(0.75)"
                    : value
                    ? "translate(14px,-11px) scale(0.75)"
                    : (xs || sm) && !value
                    ? "translate(9px,2px) scale(1)"
                    : !value
                    ? "translate(13px,15px) scale(1)"
                    : "",
              },
            },
          },
        }}
        autoFocus
        style={{
          animation: "appear_slowly 1.3s ease-in",
        }}
        label={label}
        className={
          !!errors && errors[name]
            ? "sm:col-span-2 w-full subItem errorFieldset dark:darkErrorFieldset dark:darkLabel dark:darkInput"
            : "sm:col-span-2 w-full subItem dark:darkFieldset dark:darkLabel dark:darkInput"
        }
        autoComplete={"off"}
      >
        {children}
      </TextField>
      {!!errors && errors[name] && type !== "hidden" && (
        <div className="w-full my-[6px] text-red600 text-[15px]">
          {errors[name]?.message as string}
        </div>
      )}
    </>
  );
}
