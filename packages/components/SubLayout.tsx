import React from "react";

export default function SubLayout({
  newStyles,
  children,
  newClasses,
}: {
  children: React.ReactElement;
  newClasses?: string;
  newStyles?: { [key: string]: number | string };
}) {
  return (
    <div className={"flex flex-col w-full " + newClasses}>
      <div
        className="flex-center flex-col p-[24px] xs:p-[12px] sm:p-[12px] rounded-xl bg-white dark:extraLightDarkBg"
        style={{
          ...newStyles,
        }}
      >
        {children}
      </div>
    </div>
  );
}
