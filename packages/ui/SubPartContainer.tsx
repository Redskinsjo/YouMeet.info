import React from "react";

type Attribute = { [key: string]: string | number | Attribute };

export default function SubPartContainer({
  children,
  radius,
  onClick,
  onSubmit,
  newStyles,
}: {
  children: React.ReactElement;
  radius?: string;
  onClick?: () => void | Promise<void>;
  onSubmit?: any;
  newStyles?: Attribute;
}) {
  return (
    <div
      className="flex flex-col gap-[12px] flex-1 box-border border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg px-[6px]"
      onClick={onClick}
      onSubmit={onSubmit}
      style={{
        borderRadius: radius || "0px",
        ...newStyles,
      }}
    >
      {children}
    </div>
  );
}
