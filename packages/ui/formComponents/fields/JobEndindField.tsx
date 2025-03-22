"use client";
import { FieldProps } from "@youmeet/types/form/fields/FieldProps";
import { TextField, useMediaQuery } from "@mui/material";
import { blue, purple } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const JobEndingField = ({
  register,
  index,
  setValue,
  clearErrors,
  watch,
  setError,
  locations,
}: FieldProps & {
  locations: { isLiveJob: string; ending: string; starting: string };
}) => {
  const { t } = useTranslation();
  const [isJobFinished, setIsJobFinished] = useState<boolean>(true);
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  useEffect(() => {
    if (watch) {
      setIsJobFinished(!watch(locations.isLiveJob));
      if (watch(locations?.starting)) {
        const timing = (date: string) =>
          date === "now" ? new Date().getTime() : new Date(date).getTime();
        const startingDate = timing(watch(locations?.starting) as string);
        const endingDate = watch(locations.isLiveJob)
          ? timing("now")
          : timing(watch(locations.ending) as string);
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
  }, [
    watch ? watch(locations.isLiveJob) : undefined,
    watch ? watch(locations.ending) : undefined,
  ]);

  return register && setValue ? (
    <div className="flex items-center">
      {isJobFinished ? (
        <TextField
          required
          {...register(locations.ending)}
          label={t("me-profile-infos-label-ending")}
          className="col-span-1 flex-1"
          onChange={() => {
            if (clearErrors) clearErrors();
          }}
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
        />
      ) : (
        <TextField
          {...register(locations.isLiveJob)}
          label={t("me-profile-infos-label-isLiveJob")}
          className="col-span-1 flex-1"
          focused={false}
          InputProps={{
            className: "subItem h-[60px]",
          }}
          InputLabelProps={{
            className: "subItem font-bold",

            sx: {
              "&.Mui-focused": {
                transform:
                  xs || sm
                    ? "translate(14px,-9px) scale(0.75)"
                    : "translate(14px,-11px) scale(0.75)",
              },
              "&:not(.Mui-focused)": {
                transform:
                  xs || sm
                    ? "translate(13px,18px) scale(0.75)"
                    : "translate(13px,18px) scale(1)",
              },
            },
          }}
          sx={{
            "& input": {
              visibility: "hidden",
            },
            "& fieldset": {
              border: "1px solid !important",
              borderColor: purple[500] + " !important",
            },
          }}
        />
      )}
      <span
        className="text-[14px] ml-[6px] cursor-pointer hover:animate-pulse"
        style={{
          color: blue[500],
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (isJobFinished) {
              setIsJobFinished(false);
              setValue(locations.isLiveJob, true as never);
            }
            if (!isJobFinished) {
              setIsJobFinished(true);
              setValue(locations.isLiveJob, false as never);
            }
          }
        }}
        onClick={() => {
          if (isJobFinished) {
            setIsJobFinished(false);
            setValue(locations.isLiveJob, true as never);
          }
          if (!isJobFinished) {
            setIsJobFinished(true);
            setValue(locations.isLiveJob, false as never);
          }
          if (clearErrors) clearErrors();
        }}
      >
        {isJobFinished
          ? t("me-profile-infos-label-isLiveJob")
          : t("experience-finished")}
        ?
      </span>
    </div>
  ) : undefined;
};

export default JobEndingField;
