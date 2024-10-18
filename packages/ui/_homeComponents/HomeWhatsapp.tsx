"use client";
import Layout from "../Layout";
import Link from "next/link";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { Button, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { nunito } from "@youmeet/functions/fonts";

export default function HomeWhatsapp() {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");

  return (
    <Layout
      newStyles={{
        maxWidth: xs || sm || md ? "100vw" : "900px",
        boxShadow: "none",
      }}
    >
      <div className="h-full w-full flex-center flex-col py-[24px] gap-[24px]">
        <h3
          role="heading"
          className="z-50 text-white text-center sentences xs:item sm:item px-[12px]"
        >
          {t("get-closer")}
        </h3>
        <div
          className="w-auto text-center xs:item sm:item text-white z-20 mx-[48px] item"
          style={{ ...nunito.style }}
        >
          <span className="font-bold mr-[6px]">{t("start-wa1")}</span>
          {t("start-wa2")}
        </div>
        <div className="flex-center">
          <Link
            role="link"
            title="Parler avec un conseiller spécialisé en recrutement et en gestion de carrière sur Whatsapp"
            href={"https://wa.me/33756900001"}
            tabIndex={-1}
            className="flex-center no-underline gap-[12px]"
          >
            <HiChevronDoubleRight
              role="figure"
              className="emphasizeVisualLeft text-green200"
            />
            <Button
              role="button"
              className="w-[240px] bg-green700 text-white font-bold sentences xs:subItem sm:subItem rounded-2xl focus-visible:linear-gradient2"
            >
              {t("discuss")}
            </Button>
            <HiChevronDoubleLeft
              role="figure"
              className="emphasizeVisualRight text-green200"
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
