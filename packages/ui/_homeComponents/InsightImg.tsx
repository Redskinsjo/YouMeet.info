"use client";
import Layout from "../Layout";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

export default function InsightImg() {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");

  return (
    <div className="flex-1 p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px]">
      <Layout
        newStyles={{
          maxWidth: xs || sm || md ? "100vw" : "1100px",
          margin: xs || sm || md ? "24px 0px" : "48px 0px",
          width: "100%",
          zIndex: 70,
          boxShadow: "none",
        }}
      >
        <>
          <div className="homeSectionBorder flex flex-col w-full items-center px-[36px] xs:p-[12px] sm:p-[12px] md:p-[12px] pb-[48px] homeSectionBg max-w-screen box-border xs:mx-[12px] sm:mx-[12px] md:mx-[12px]">
            <h2
              role="heading"
              className="sentences z-50 decoration-2 text-center px-[12px]"
            >
              {t("profile-insight")}
            </h2>
            <div className="z-10 shadow-2xl shadow-grey900 rounded">
              <video
                muted
                autoPlay
                loop
                title="un aperçu de l'interface de YouMeet proposé pour diffuser le profil complet du candidat aux recruteurs"
                width={xs || sm ? 250 : 300}
                height={xs || sm ? 250 * (2240 / 1034) : 300 * (2240 / 1034)}
                src="https://res.cloudinary.com/de822mdsy/video/upload/v1719232172/chdftcz1ju9xvgfulfaq.webm"
              />
            </div>
          </div>
        </>
      </Layout>
    </div>
  );
}
