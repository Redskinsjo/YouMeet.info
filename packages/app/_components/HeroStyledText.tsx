"use client";
import BoldText from "@youmeet/components/BoldText";
import { grey } from "@mui/material/colors";
import { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";

const words = [
  "and-its-technical-competencies",
  "and-its-general-competencies",
  "and-its-behavioral-competencies",
];

export default function HeroStyledText() {
  const { t } = useTranslation();
  const [word, setWord] = useState<ReactElement | undefined>();
  const [counting, setCounting] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
    return () => clearInterval(interval);
  }, [counting]);

  return (
    !loading && (
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
        {word}.
      </div>
    )
  );
}
