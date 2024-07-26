import React from "react";
import BoldText from "@youmeet/components/BoldText";
import Layout from "@youmeet/components/Layout";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

const HomeTexts = () => {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");

  return (
    <Layout
      newStyles={{
        maxWidth: xs || sm || md ? "100vw" : "1000px",
      }}
    >
      <div
        data-aos="fade-up"
        className="h-full w-full flex gap-[48px] xs:gap-[12px] sm:gap-[12px] md:gap-[12px] xs:flex-col p-[12px] z-20"
      >
        {!xs && !sm && !md && (
          <div className="dark:darkBg lightBg w-screen border-[1px] border-solid border-black">
            <div className="w-full px-[6px] box-border">
              <div className="p-[36px] rounded-xl box-border flex-1 xs:p-[24px] sm:p-[24px] md:p-[24px]">
                <BoldText
                  text={t("home-highlight1")}
                  fontSizeClass="text-[18px] discuss-hightlights-text"
                  align="justify"
                />
              </div>
            </div>
          </div>
        )}
        {!xs && !sm && !md && (
          <div className="dark:darkBg lightBg w-screen border-[1px] border-solid border-black">
            <div className="w-full px-[6px] box-border">
              <div className="p-[36px] rounded-xl box-border flex-1 xs:p-[24px] sm:p-[24px] md:p-[24px]">
                <BoldText
                  text={t("home-highlight2")}
                  fontSizeClass="text-[18px] discuss-hightlights-text"
                  align="justify"
                />
              </div>
            </div>
          </div>
        )}
        {(xs || sm || md) && (
          <div className="dark:darkBg lightBg border-y-[0.5px] border-x-0 border-solid border-black w-full px-[6px] box-border">
            <div className="p-[36px] rounded-xl box-border flex-1 xs:p-[24px] sm:p-[24px] md:p-[24px]">
              <BoldText
                text={t("home-highlight1")}
                fontSizeClass="text-[18px] discuss-hightlights-text"
                align="justify"
              />
            </div>
          </div>
        )}
        {(xs || sm || md) && (
          <div className="dark:darkBg lightBg border-y-[0.5px] border-x-0 border-solid border-black w-full px-[6px] box-border">
            <div className="p-[36px] rounded-xl box-border flex-1 xs:p-[24px] sm:p-[24px] md:p-[24px]">
              <BoldText
                text={t("home-highlight2")}
                fontSizeClass="text-[18px] discuss-hightlights-text"
                align="justify"
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomeTexts;
