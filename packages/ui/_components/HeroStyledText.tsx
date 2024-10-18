"use client";
import BoldText from "@youmeet/ui/BoldText";
import { grey } from "@mui/material/colors";
import { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const words = [
  "and-its-technical-competencies",
  "and-its-general-competencies",
  "and-its-behavioral-competencies",
];

export default function HeroStyledText() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [word, setWord] = useState<ReactElement | undefined>();
  const [counting, setCounting] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    const interval = setInterval(() => {
      setCounting((counting) => {
        if (counting < words.length - 1) {
          return counting + 1;
        } else {
          return 0;
        }
      });
    }, 3000);
    setWord(
      <span className="wording darkBg pt-[4px] pb-[6px] px-[8px] rounded-[14px] text-white">
        {t(words[counting])}
      </span>
    );
    setIntervalId(interval);

    return () => clearInterval(interval);
  }, [counting]);

  return (
    <div className="xs:p-0 sm:p-0 md:-0 inline">
      <BoldText
        text={t("home-hero-light")}
        containerStyle={{
          color: grey[200],
          fontSize: "20px",
          display: "inline",
        }}
        align="left"
      />
      {word}
      {language === "en" && (
        <BoldText
          text={t("competencies")}
          containerStyle={{
            color: grey[200],
            fontSize: "20px",
            display: "inline",
          }}
          align="left"
        />
      )}
      .
    </div>
  );
}
