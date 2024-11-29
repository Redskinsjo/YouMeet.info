import { useTranslation } from "react-i18next";
import SimpleField from "../formComponents/fields/SimpleField";
import { useFormStatus } from "react-dom";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import { indie_flower } from "@youmeet/functions/fonts";

export default function MasterSearchComponent({
  setError,
  clearErrors,
  errors,
}: NewFieldProps) {
  const status = useFormStatus();
  const { t } = useTranslation();

  return (
    <>
      <h2
        className="underline font-light"
        style={{
          ...indie_flower.style,
          textDecorationThickness: "1px",
          textUnderlineOffset: "3px",
        }}
      >
        {t("search-for-someone")}
      </h2>
      <SimpleField
        label={t("search")}
        setError={setError}
        clearErrors={clearErrors}
        name="search"
        type="text"
        errors={errors}
        placeholder={t("search-by-fullname")}
      />

      {status.pending && (
        <div className="w-full my-[6px] text-gray800 text-[15px]">
          {t("search-wait")}
        </div>
      )}
    </>
  );
}
