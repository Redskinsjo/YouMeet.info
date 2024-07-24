"use client";
import Footer from "@youmeet/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Custom404() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.prefetch("/se-connecter");
    setTimeout(() => {
      router.push("/se-connecter");
    }, 4000);
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="min-h-screen flex flex-col h-screen">
        <div className="flex-1 flex-center flex-col afterHeader">
          <h1 className="titles text-blueGrey700 font-bold m-0 p-0 text-center">
            {t("404-text")}
          </h1>
        </div>

        <Footer />
      </div>
    )
  );
}
