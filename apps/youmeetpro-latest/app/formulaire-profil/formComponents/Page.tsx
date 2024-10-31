import React from "react";
import { useMediaQuery } from "@mui/material";
import { FormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import dynamic from "next/dynamic";
import RightPartFormComponentLoading from "./RightPartFormComponentLoading";
import Logo from "@youmeet/ui/Logo";

const RightPartFormComponent = dynamic(
  () => import("./RightPartFormComponent"),
  { ssr: false, loading: () => <RightPartFormComponentLoading /> }
);

const Page = ({
  defaultValues,
  category,
}: {
  defaultValues: Partial<FormDefaultValues> | undefined;
  category: "organisation" | "offer";
}) => {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  return (
    <div className="relative flex flex-col flex-1">
      <div
        className="flex-1 flex relative"
        style={{ flexDirection: sm ? "column" : "row" }}
      >
        {!xs && !sm && (
          <div
            className="bg-grey100 dark:extraLightDarkBg flex-center relative z-50"
            style={{
              width: "50vw",
              height: "auto",
            }}
          >
            <Logo size={80} link={false} png />
          </div>
        )}

        <RightPartFormComponent
          defaultValues={defaultValues}
          category={category}
        />
      </div>
    </div>
  );
};

export default Page;
