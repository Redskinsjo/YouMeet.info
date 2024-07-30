"use client";
import { deepPurple, purple } from "@mui/material/colors";
import React from "react";
import { ExperienceFieldAttrs } from "@youmeet/types/form/StepContent";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import JobEndingField from "./JobEndindField";
import { Errors, ExperienceFieldProps } from "@youmeet/types/form/fields";
import JobStartingField from "./JobStartingField";
import SelectField from "./SelectField";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import GenericField from "./GenericField";

const ExperienceField = ({
  register,
  index,
  array,
  setValue,
  setError,
  errors,
  watch,
  locations,
  clearErrors,
}: ExperienceFieldProps) => {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: deepPurple[50],
        borderRadius: "14px",
        padding: "12px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: xs || sm ? "12px" : "20px",
          width: "100%",
          margin: "12px 0px",
        }}
      >
        {/* <SelectField
          required
          setValue={setValue}
          clearErrors={clearErrors}
          name="sector"
          placeholder={t("what-is-your-sector")}
          label={t("sector")}
          index={index}
          location={locations.sector}
          value={watch(locations.sector) as string}
          watch={watch}
          register={register}
        /> */}
        <SelectField
          type="text"
          required
          setValue={setValue}
          clearErrors={clearErrors}
          placeholder={t("what-job")}
          name="job"
          location={locations.job}
          value={watch(locations.job) as string}
          label={t("[experience]-job")}
          watch={watch}
          register={register}
        />
        {/* {watch(locations.sector) ? (
          <SelectField
            required
            setValue={setValue}
            clearErrors={clearErrors}
            placeholder={t("what-job")}
            name="job"
            location={locations.job}
            value={watch(locations.job) as string}
            label={t("[experience]-job")}
            topSectorIds={[watch(locations.sector) as string]}
            index={index}
            watch={watch}
            register={register}
          />
        ) : undefined} */}
        {/* <CompanyField
          location={locations.company}
          name={locations.company}
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
        /> */}
        <SelectField
          required={pathname !== "/backoffice/users"}
          type="text"
          setValue={setValue}
          clearErrors={clearErrors}
          placeholder={t("what-company")}
          name="company"
          location={locations.company}
          value={watch(locations.company) as string}
          label={t("me-profile-infos-label-company")}
          watch={watch}
          register={register}
        />

        <JobStartingField
          register={register}
          index={index}
          watch={watch}
          clearErrors={clearErrors}
          setError={setError}
          setValue={setValue}
          locations={{
            ending: locations?.ending,
            starting: locations?.starting,
            isLiveJob: locations?.isLiveJob,
          }}
        />
        <JobEndingField
          register={register}
          index={index}
          setValue={setValue}
          watch={watch}
          clearErrors={clearErrors}
          setError={setError}
          locations={{
            ending: locations?.ending,
            starting: locations?.starting,
            isLiveJob: locations?.isLiveJob,
          }}
        />
        {pathname === "/backoffice/users" && (
          <GenericField
            label="Nom de l'entreprise"
            location="companyName"
            name="companyName"
            type="text"
            clearErrors={clearErrors}
            watch={watch}
            setError={setError}
            register={register}
            index={index}
          />
        )}
      </Box>
      {(errors as Errors) &&
      (errors as Errors)["experiences"] &&
      ((errors as Errors)["experiences"] as any)[index] ? (
        <Typography style={{ color: purple[300] }}>
          {errors && ((errors as Errors)["experiences"] as any)[index]?.message}
        </Typography>
      ) : undefined}
      {pathname !== "/backoffice/users" && (
        <div className="w-[10px] absolute right-[12px] xs:right-[12px] xs:top-[12px] top-[12px] sm:right-[12px] sm:top-[12px] flex-center">
          <IoClose
            className="absolute xs:right-[-12px] sm:right-[-12px] right-[-12px] text-[22px] cursor-pointer"
            onClick={() => {
              const newExperiences = array.filter(
                (item: ExperienceFieldAttrs, i: number) => i !== index
              );
              setValue("experiences", newExperiences);
            }}
          />
        </div>
      )}
    </Box>
  );
};

export default ExperienceField;
