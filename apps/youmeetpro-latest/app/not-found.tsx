"use client";
import Footer from "@youmeet/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import BackgroundLayout from "@youmeet/components/BackgroundLayout";
import { Button } from "@mui/material";

export default function Custom404() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      router.push("/se-connecter");
    }, 4000);
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="flex flex-col h-screen">
        <BackgroundLayout error>
          <div className="flex-1 flex-center flex-col gap-[24px]">
            <h1 className="titles text-blueGrey700 font-bold m-0 p-0 text-center">
              {t("404-text")}
            </h1>
            <Button
              onClick={() => {
                router.back();
              }}
            >
              {t("back")}
            </Button>
          </div>
        </BackgroundLayout>

        <Footer />
      </div>
    )
  );
}
