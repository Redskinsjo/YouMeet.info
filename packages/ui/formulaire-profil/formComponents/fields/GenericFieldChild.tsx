"use client";

import OneLineSkeleton from "../../../OneLineSkeleton";
import { grey } from "@mui/material/colors";
import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import dynamic from "next/dynamic";

const GenericField = dynamic(() => import("./GenericField"), {
  // ssr: false,
  // loading: () => <OneLineSkeleton height="45px" />,
});

export default function fnc({
  register,
  required,
  name,
  placeholder,
  label,
  errors,
  multiline = 0,
  params,
  value,
  basic,
  onChange,
  sx,
  location,
  fetchData,
  border = `1px solid ${grey[500]}`,
  type,
}: GenericFieldProps) {
  return (
    <GenericField
      register={register}
      required={required}
      name={name}
      placeholder={placeholder}
      label={label}
      errors={errors}
      multiline={multiline}
      params={params}
      value={value}
      basic={basic}
      onChange={onChange}
      sx={sx}
      location={location}
      fetchData={fetchData}
      border={border}
      type={type}
    />
  );
}
