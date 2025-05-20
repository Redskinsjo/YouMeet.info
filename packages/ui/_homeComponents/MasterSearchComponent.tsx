import { useTranslation } from "react-i18next";
import SimpleField from "../formComponents/fields/SimpleField";
import { useFormStatus } from "react-dom";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import { indie_flower } from "@youmeet/functions/fonts";
import { Button, useMediaQuery } from "@mui/material";

export default function MasterSearchComponent({
  setError,
  clearErrors,
  errors,
}: NewFieldProps) {
  const status = useFormStatus();
  const { t } = useTranslation();
  const md = useMediaQuery("(max-width:900px)");
  const sm = useMediaQuery("(max-width:720px)");
  const xs = useMediaQuery("(max-width:600px)");

  return (
    <>
      <h2
        className="underline text-deepPurple100"
        style={{
          ...indie_flower.style,
          textDecorationThickness: "1px",
          textUnderlineOffset: "3px",
        }}
      >
        {t("search-for-someone")}
      </h2>
      <div className="flex flex-col gap-[12px]">
        <SimpleField
          label={t("search")}
          setError={setError}
          clearErrors={clearErrors}
          name="search"
          type="text"
          errors={errors}
          placeholder={t("search-by-fullname")}
          black
        />
        {(xs || sm || md) && (
          <div className="w-full flex justify-end">
            <Button type="submit" className="bg-blueGrey300 text-blueGrey900">
              {t("search")}
            </Button>
          </div>
        )}
      </div>

      {status.pending && (
        <div className="w-full my-[6px] text-gray800 text-[15px]">
          {t("search-wait")}
        </div>
      )}
    </>
  );
}
