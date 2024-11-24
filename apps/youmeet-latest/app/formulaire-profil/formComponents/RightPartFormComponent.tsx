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
    <div className="xs:w-screen sm:w-screen md:w-screen w-[50vw] box-border flex flex-1 justify-center box-border p-[48px] xs:p-[12px] sm:p-[12px]">
      <div className="flex w-full flex-col">
        <PageContentTitle />

        <Suspense>
          <PageContent defaultValues={defaultValues} />
        </Suspense>
      </div>
    </div>
  );
}
