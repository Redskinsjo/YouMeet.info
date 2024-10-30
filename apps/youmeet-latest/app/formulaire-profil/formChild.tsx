import React from "react";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import dynamic from "next/dynamic";
import Logo from "@youmeet/ui/Logo";
import RightPartFormComponentLoading from "./formComponents/RightPartFormComponentLoading";

const RightPartFormComponent = dynamic(
  () => import("./formComponents/RightPartFormComponent"),
  { ssr: false, loading: () => <RightPartFormComponentLoading /> }
);

export default function Page({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  return (
    <div className="min-h-screen relative flex flex-col flex-1">
      <div className="flex-1 flex relative sm:flex-col">
        <div
          className="bg-grey100 dark:extraLightDarkBg flex-center relative z-50 xs:hidden sm:hidden"
          style={{
            width: "50vw",
            height: "auto",
          }}
        >
          <Logo size={80} link={false} />
        </div>

        <RightPartFormComponent defaultValues={defaultValues} />
      </div>
    </div>
  );
}
