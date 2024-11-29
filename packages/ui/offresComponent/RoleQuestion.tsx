"use client";
import { useTranslation } from "react-i18next";
import SelectField from "../formComponents/fields/SelectField";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RoleQuestion() {
  const { t } = useTranslation();
  const router = useRouter();
  router.prefetch("/offres?type=search&appellation=");

  const customRefetchSearch = (formData: FormData) => {
    const job = formData.get("job");
    if (job) {
      router.push(`/offres?type=search&appellation=${job}`);
    }
  };

  return (
    <div className="w-3/4 p-[24px]">
      <form
        action={customRefetchSearch}
        className="flex flex-col items-end gap-[12px]"
      >
        <SelectField
          type="text"
          name="job"
          label={t("job")}
          placeholder={t("select-your-role")}
          location=""
        />
        <Button
          className="group-hover:underline legend dark:darkBg dark:text-white bg-white text-black float-right"
          type="submit"
        >
          {t("validate")}
        </Button>
      </form>
    </div>
  );
}
