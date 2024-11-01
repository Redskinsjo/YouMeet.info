"use client";
import BoldText from "@youmeet/ui/BoldText";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function HeroVideo() {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  return (
    <div className="flex-1 flex-center flex-col p-[48px] py-[72px] xs:p-[24px] sm:p-[24px] md:p-[48px] text-grey200">
      <BoldText
        text={"productDescription"}
        containerStyle={{
          whiteSpace: xs || sm ? "normal" : "nowrap",
          fontSize: xs || sm ? "20px" : "22px",
        }}
      />

      <BoldText text={`${t("proposed-by")} +Jonathan Carnos=+`} />
    </div>
  );
}
