import React from "react";

export default function DividerSection({
  type = "default",
}: {
  type?: "hero" | "default";
}) {
  let containerClassName = "";
  let className =
    "border-[0.5px] border-dotted border-grey300 m-0 py-[6px] homeImgBg";
  if (type === "hero") {
    className = "border-[0.5px] border-dotted border-grey300 m-0";
    containerClassName =
      "hidden xs:block sm:block md:block px-[48px] xs:px-[24px] sm:px-[24px] md:px-[48px]";
  }
  return (
    <div className={containerClassName}>
      <hr className={className} />
    </div>
  );
}
