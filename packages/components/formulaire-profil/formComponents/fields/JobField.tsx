"use client";
import { TextField, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GetJobsDocument, Job } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import id from "uid2";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { FieldProps } from "@youmeet/types/form/fields/FieldProps";
import { purple } from "@mui/material/colors";

const filter = createFilterOptions<string>();

const JobField = ({ index, watch, setValue, clearErrors }: FieldProps) => {
  const { data, loading } = useQuery(GetJobsDocument);
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const [fieldVal, setFieldVal] = useState("");

  useEffect(() => {
    if (watch && watch(`experiences[${index}].job`)) {
      setFieldVal(watch(`experiences[${index}].job`));
    }
  }, [watch(`experiences[${index}].job`)]);

  return (
    <Autocomplete
      className="col-span-2 w-full"
      freeSolo
      disableClearable
      value={fieldVal}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        return [...new Set(filtered)];
      }}
      renderOption={(props, option) => {
        const key = id(4);
        return (
          <li
            className="darkLi"
            style={{
              fontSize: 16,
              minHeight: 48,
            }}
            key={key}
          >
            {option}
          </li>
        );
      }}
      options={
        !loading
          ? (data?.jobs?.map(
              (job: Job | null) => job?.title as string,
            ) as string[])
          : []
      }
      onChange={(event, value: string) => {
        if (setValue) setValue(`experiences[${index}].job`, value as never);
        if (clearErrors) clearErrors();
      }}
      renderInput={(params) => {
        return (
          <TextField
            sx={{
              "& fieldset": {
                border: "1px solid !important",
                borderColor: purple[500] + " !important",
              },
            }}
            {...params}
            required
            InputProps={{
              ...params.InputProps,
              className: "subItem h-[60px]",
            }}
            placeholder={t("what-job")}
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
            label={t("me-profile-infos-label-job")}
            className="col-span-2"
          />
        );
      }}
      getOptionLabel={(option) => {
        return option;
      }}
    />
  );
};

export default JobField;
