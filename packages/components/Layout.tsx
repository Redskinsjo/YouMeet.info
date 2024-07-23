import React from "react";

export default function Layout({
  children,
  newClasses,
  newStyles,
  "data-testid": dataTestId,
}: {
  children: React.ReactElement;
  newClasses?: string;
  newStyles?: { [key: string]: number | string };
  "data-testid"?: string;
}) {
  return (
    <div
      data-testid={dataTestId}
      className={`flex-1 h-fit xs:m-0 sm:m-0 my-0 mx-auto px-[40px] xs:px-0 sm:px-0 md:px-0 flex justify-center max-w-screen xs:max-w-[520px] sm:max-w-[520px] box-border shadow-custom dark:darkBg ${
        newClasses ?? ""
      }`}
      style={{
        ...newStyles,
      }}
    >
      {children}
    </div>
  );
}
