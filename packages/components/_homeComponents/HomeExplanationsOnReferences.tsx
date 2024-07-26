"use client";
import Layout from "@youmeet/components/Layout";
import React, { useEffect, useState } from "react";
import { nunito } from "@youmeet/functions/fonts";
import BoldText from "@youmeet/components/BoldText";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { GiSmartphone } from "react-icons/gi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillHddNetworkFill } from "react-icons/bs";

export default function HomeExplanationsOnReferences() {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const md2 = useMediaQuery("(max-width:1000px)");
  const lg = useMediaQuery("(max-width:1260px)");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <Layout
        newStyles={{
          maxWidth: "100vw",
          margin: "0px",
          width: "100vw",
          padding: "0px",
        }}
      >
        <div className="w-full flex flex-col">
          <div className="h-full xs:h-full sm:h-full bg-white dark:mediumDarkBg z-20 w-full box-border slideIn flex-center xs:flex-col sm:flex-col md:flex-col box-border">
            <div className="shadow-2xl w-full xs:py-[24px] xs:px-[6px] sm:py-[24px] sm:px-[6px] box-border h-full flex-center min-h-[80px] dark:mediumDarkBg lightBg xs:border-b-[0.5px] sm:border-b-[0.5px] md:border-b-[0.5px] border-0 border-solid border-blueGrey500 xs:mt-[0.5px] sm:mt-[0.5px] md:mt-[0.5px]">
              <BoldText
                text={t("home-explanation-question")}
                containerStyle={{
                  ...nunito.style,
                  textAlign: "center",
                  lineHeight: "1.3em",
                  margin: "0px",
                  fontSize: md2
                    ? "40px"
                    : xs || sm || md || lg
                    ? "44px"
                    : "57px",
                }}
                fontSizeClass="flex-center whitespace-break-spaces"
              />
            </div>

            <div className="h-full w-full box-border flex-center min-h-[80px] lightBg dark:mediumDarkBg xs:border-t-[0.5px] sm:border-t-[0.5px] md:border-t-[0.5px] border-0 border-solid border-blueGrey500 xs:mb-[0.5px] sm:mb-[0.5px] md:mb-[0.5px]">
              <ul
                role="list"
                className="flex m-0 h-full w-full box-border shadow-2xl gap-[24px] flex-col w-fit text-black font-bold p-0"
              >
                <li className="darkLi h-full flex-center box-border list-none">
                  <span
                    className="sentences flex-center text-center xs:item sm:item font-[600] flex-bet text-black dark:text-white relative top-[4px] gap-[12px]"
                    style={{ ...nunito.style }}
                  >
                    <IoShieldCheckmarkSharp className="sentences xs:item sm:item min-w-[24px]" />
                    {t("home-explanation3")}
                    <div />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex-center dark:mediumDarkBg py-[24px] dark:text-white homeSectionBg">
            <div className="xs:w-full sm:w-full w-1/2 flex-center gap-[12px]">
              <GiSmartphone role="figure" className="titles" />
              <MdAlternateEmail role="figure" className="titles" />
              <BsFillHddNetworkFill role="figure" className="titles" />
            </div>
          </div>
        </div>
      </Layout>
    )
  );
}
