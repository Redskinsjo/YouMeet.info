import React from "react";
import { useMediaQuery } from "@mui/material";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import dynamic from "next/dynamic";
import RightPartFormComponentLoading from "./RightPartFormComponentLoading";
import Logo from "@youmeet/ui/Logo";

const RightPartFormComponent = dynamic(
  () => import("./RightPartFormComponent"),
  { ssr: false, loading: () => <RightPartFormComponentLoading /> }
);

export default function Page({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  return (
    <div className="min-h-screen relative flex flex-col flex-1">
      <div className="flex-1 flex relative sm:flex-col">
        {!xs && !sm && (
          <div
            className="bg-grey100 dark:extraLightDarkBg flex-center relative z-50"
            style={{
              width: "50vw",
              height: "auto",
            }}
          >
            <Logo size={80} link={false} />
          </div>
        )}

        <RightPartFormComponent defaultValues={defaultValues} />
      </div>
    </div>
  );
}
