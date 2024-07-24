"use client";
import Footer from "@youmeet/components/Footer";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function ServerError500({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <html lang="fr">
        <body>
          <div className="min-h-screen flex flex-col h-screen">
            <div className="flex-1 flex-center flex-col">
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
        </body>
      </html>
    )
  );
}
