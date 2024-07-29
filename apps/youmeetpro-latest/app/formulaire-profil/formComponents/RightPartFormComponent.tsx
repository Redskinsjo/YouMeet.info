import Layout from "@youmeet/components/Layout";
import { FormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import PageContent from "./PageContent";
import BoldText from "@youmeet/components/BoldText";
import { Suspense } from "react";

export default function RightPartFormComponent({
  defaultValues,
  category,
}: {
  defaultValues: Partial<FormDefaultValues> | undefined;
  category: "organisation" | "offer";
}) {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");

  return (
    <Layout
      newClasses="dark:darkBg lightBg"
      newStyles={{
        maxWidth: "unset",
        padding: "0px 40px",
        justifyContent: "center",
        height: "unset",
        width: xs || sm || md ? "100vw" : "50vw",
        flex: "unset",
        boxSizing: "border-box",
      }}
    >
      <div className="flex w-full flex-col">
        <div className="w-full flex-center flex-col gap-[24px]">
          <h1 className="text-center my-[36px] dark:text-white">
            {t("the-form")}
          </h1>
          <BoldText
            text={
              category === "organisation"
                ? "fulfill-org-form"
                : "fulfill-offer-form"
            }
            fontSizeClass="text-[16px]"
          />
        </div>
        <Suspense>
          <PageContent defaultValues={defaultValues} category={category} />
        </Suspense>
      </div>
    </Layout>
  );
}
