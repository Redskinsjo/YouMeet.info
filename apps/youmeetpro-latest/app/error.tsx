"use client";
import Footer from "@youmeet/components/Footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

export default function ServerError500({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/se-connecter");
    setTimeout(() => {
      router.push("/se-connecter");
    }, 4000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col h-screen">
      <div className="flex-1 flex-center flex-col afterHeader">
        <div>
          <h1 className="titles text-blueGrey700 font-bold m-0 p-0 text-center">
            {error.digest}
          </h1>
          <p>{error.message}</p>
        </div>

        <Button onClick={() => reset()}>{t("try-again")}</Button>
      </div>
      <Footer />
    </div>
  );
}
