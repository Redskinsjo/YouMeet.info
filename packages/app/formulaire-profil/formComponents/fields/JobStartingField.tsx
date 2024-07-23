"use client";
import { FieldProps } from "@youmeet/types/form/fields/FieldProps";
import { TextField } from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const JobStartingField = ({
  register,
  index,
  clearErrors,
  watch,
  setError,
  setValue,
  locations,
}: FieldProps & {
  locations: { isLiveJob: string; ending: string; starting: string };
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (watch) {
      if (watch(locations?.ending) || watch(locations.isLiveJob)) {
        const timing = (date: string) =>
          date === "now" ? new Date().getTime() : new Date(date).getTime();
        const startingDate = timing(watch(locations.starting) as string);
        const endingDate = watch(locations.isLiveJob)
          ? timing("now")
          : timing(watch(locations?.ending) as string);

        if (setError && clearErrors) {
          if (startingDate >= endingDate) {
            setError(`experiences[${index}]`, {
              type: "LogicalError",
              message: t("ending-date-should-posterior"),
            });
          } else clearErrors();
        }
      }
    }
  }, [watch(locations.starting)]);

  return register ? (
    <div className="flex items-center">
      <TextField
        required
        value={watch(locations.starting)}
        label={t("me-profile-infos-label-starting")}
        className="col-span-1 flex-1"
        type="month"
        focused
        InputProps={{
          className: "subItem h-[60px]",
        }}
        InputLabelProps={{
          className: "subItem",
        }}
        sx={{
          "& fieldset": {
            border: "1px solid !important",
            borderColor: purple[500] + " !important",
          },
        }}
        onChange={(e) => {
          if (clearErrors) clearErrors();
          if (setValue) setValue(locations.starting, e.target.value as never);
        }}
      />
    </div>
  ) : undefined;
};

export default JobStartingField;
