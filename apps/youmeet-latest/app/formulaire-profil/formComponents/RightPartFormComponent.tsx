import Layout from "@youmeet/components/Layout";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import PageContent from "./PageContent";
import BoldText from "@youmeet/components/BoldText";
import { Suspense } from "react";

export default function RightPartFormComponent({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  return (
    <Layout
      newClasses="dark:darkBg lightBg flex-1"
      newStyles={{
        maxWidth: "unset",
        padding: "0px 40px",
        justifyContent: "center",
        height: "unset",
        width: xs || sm || md ? "100vw" : "50vw",
        boxSizing: "border-box",
      }}
    >
      <div className="flex w-full flex-col">
        <div className="w-full flex-center flex-col gap-[24px]">
          <h1 className="text-center my-[36px] dark:text-white">
            {t("the-form")}
          </h1>
          <BoldText
            text={t("fulfill-perso-form")}
            fontSizeClass="text-[16px]"
          />
        </div>

        <Suspense>
          <PageContent defaultValues={defaultValues} />
        </Suspense>
      </div>
    </Layout>
  );
}
