import { useTranslation } from "react-i18next";
import BoldText from "@youmeet/components/BoldText";
import { nunito, outfit } from "@youmeet/functions/fonts";
import { useMediaQuery } from "@mui/material";
import React from "react";

const HomeCatchEyes = () => {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:540px)");
  const sm = useMediaQuery("(max-width:600px)");
  const md = useMediaQuery("(max-width:720px)");
  return (
    <div className="p-[48px] xs:p-[24px] sm:p-[24px] md:p-[24px] flex-center flex-col">
      <BoldText
        text={t("home-catch-eyes")}
        align="center"
        fontSizeClass="text-white"
        containerStyle={{
          ...nunito.style,
          fontSize: xs || sm || md ? "32px" : "39px",
          margin: "0px",
        }}
      />
      <div
        className="flex-center my-[24px] px-[12px] sentences text-white"
        style={{ ...outfit.style }}
      >
        <BoldText
          text={t("present-a-video")}
          containerStyle={{
            fontWeight: "bold",
            margin: "0px",
            fontSize: "24px",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
};

export default HomeCatchEyes;
