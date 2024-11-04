import Layout from "@youmeet/ui/Layout";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const PageContentTitle = dynamic(() => import("./PageContentTitleChild"));
const PageContent = dynamic(() => import("./PageContentChild"));

export default function RightPartFormComponent({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  return (
    <Layout
      newClasses="dark:darkBg lightBg flex-1"
      newStyles={{
        maxWidth: "unset",
        padding: "0px 40px",
        justifyContent: "center",
        height: "unset",
        boxSizing: "border-box",
      }}
    >
      <div className="xs:w-screen sm:w-screen md:w-screen w-[50vw] box-border flex flex-1 justify-center">
        <div className="flex w-full flex-col">
          <PageContentTitle />

          <Suspense>
            <PageContent defaultValues={defaultValues} />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
