import React from "react";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import dynamic from "next/dynamic";

const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));
const RightPartFormComponent = dynamic(
  () => import("./formComponents/RightPartChild")
);

export default function Page({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  return (
    <div className="afterHeader relative flex flex-col">
      <div className="flex relative xs:flex-col sm:flex-col h-full">
        <div
          className="bg-grey100 dark:extraLightDarkBg flex-center relative z-50 xs:hidden sm:hidden"
          style={{
            width: "50vw",
            height: "auto",
          }}
        >
          <Logo size={80} link={false} png />
        </div>

        <RightPartFormComponent defaultValues={defaultValues} />
      </div>
    </div>
  );
}
