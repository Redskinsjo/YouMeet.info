"use client";
import { useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbPointFilled } from "react-icons/tb";
import { HiVideoCamera } from "react-icons/hi";
import Image from "next/image";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const xss = useMediaQuery("(max-width:540px)");
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  useEffect(() => {
    setTimeout(() => {
      if (index === 1) {
        setIndex(0);
      } else {
        setIndex(1);
      }
    }, 4000);
  }, [index]);

  return (
    <div className="min-w-[495px] border-b-[0.5px] border-0 border-solid border-grey300 xs:w-screen sm:w-screen xs:min-w-0 sm:min-w-0 md:min-w-screen box-border flex xs:flex-col sm:flex-col md:flex-col xs:gap-[24px] sm:gap-[24px] md:gap-[24px] flex-1">
      <div className="flex flex-1 p-[24px] py-[72px] xs:py-[24px] sm:py-[48px] md:py-[48px] dark:mediumDarkBg">
        <div className="flex flex-col relative gap-[12px] w-full">
          <div className="absolute titles flex-center top-[-5%] right-[5%] md2:top-[-13%] lg:top-[-13%] z-[1000]">
            <TbPointFilled style={{ color: `${red[600]}` }} />
            <span className="font-bold xs:text-black sm:text-black dark:text-white">
              REC
            </span>
          </div>
          <h1 className={"dark:text-white font-bold my-0"}>
            {t("theJobPlatform")}
          </h1>
          <p className="text-grey500 sentences">{t("theJobPlatform-p")}</p>
        </div>
      </div>
      <div className="flex bg-deepPurple50 dark:extraLightDarkBg flex-1 p-[24px] py-[72px] xs:py-[24px] sm:py-[24px] md:py-[24px]">
        <div className="flex flex-1 h-full w-full justify-around items-center gap-[12px]">
          <HiVideoCamera className="dark:text-white text-blueGrey800 text-[60px]" />
          <div className="w-[24px] h-[3px] bg-white rounded-[14px]" />
          <Image
            width={xss || xs || sm ? 159 : 212}
            height={xss || xs || sm ? 225 : 300}
            loading="eager"
            src={
              "https://res.cloudinary.com/de822mdsy/image/upload/v1706993668/wuegowmqzxcpjr70v32a.webp"
            }
            alt="Un Curriculum Vitae au format papier que les candidats présentent dans les candidatures."
          />
          <div className="w-[24px] h-[3px] bg-white rounded-[14px]" />
          <IoShieldCheckmarkSharp className="dark:text-white text-blueGrey800 text-[60px]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
