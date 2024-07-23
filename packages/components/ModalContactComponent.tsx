import { Box, Typography, useMediaQuery } from "@mui/material";
import { grey, green } from "@mui/material/colors";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ExperienceFieldAttrs } from "@youmeet/types/StepContent";

const ModalContactComponent = ({
  contact,
  i,
  setValue,
  watch,
  register,
  getValues,
  clearErrors,
  setError,
  errors,
  isValid,
}: {
  contact: {
    id: "";
    name: "";
    position: "";
    email: "";
    phone: { code: ""; number: "" };
  };
  i: number;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: NonNullable<string | File[] | ExperienceFieldAttrs[] | null>;
    }>
  >;
  clearErrors: UseFormClearErrors<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  isValid: boolean;
}) => {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        border: `0.5px solid ${grey[400]}`,
        padding: "8px",
        borderRadius: "14px",
        backgroundColor: grey[100],
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component="span"
          sx={{
            padding: "2px",
            width: "24px",
            height: "24px",
            borderRadius: "100%",
            backgroundColor: "white",
            border: `0.5px solid ${grey[500]}`,
            textAlign: "center",
          }}
        >
          {i + 1}
        </Typography>
        {contact.position && contact.name && contact.id && (
          <AiFillCheckCircle style={{ color: green[500], fontSize: "18px" }} />
        )}
      </Box>
      {/* <GenericField
        register={register}
        location={`contacts[${i}].name`}
        name={`contacts[${i}].name`}
        clearErrors={clearErrors}
        errors={errors}
        setError={setError}
        mandatory={true}
        label={t("refName")}
        sx={{ width: "100%" }}
      /> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumn: xs || sm ? "span 2" : 2,
          gridRow: 2,
          width: "100%",
          gap: "4px",
          animation: "fadeIn 0.5s 1 forwards ease-out",
        }}
      >
        {/* <PhoneField
          name=""
          isRef
          mandatory={true}
          watch={watch}
          getValues={getValues}
          setValue={setValue}
          i={i}
          register={register}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
        /> */}
      </Box>
      {/* <GenericField
        register={register}
        name={`contacts[${i}].email`}
        location={`contacts[${i}].email`}
        clearErrors={clearErrors}
        errors={errors}
        setError={setError}
        mandatory={false}
        label={t("me-profile-infos-label-email")}
        sx={{ width: "100%" }}
      /> */}
      {/* <GenericField
        register={register}
        name={`contacts[${i}].position`}
        location={`contacts[${i}].position`}
        clearErrors={clearErrors}
        errors={errors}
        setError={setError}
        mandatory={true}
        label={t("refPosition")}
        sx={{ width: "100%" }}
      /> */}
    </Box>
  );
};

export default ModalContactComponent;
