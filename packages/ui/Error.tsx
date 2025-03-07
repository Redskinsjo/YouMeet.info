"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

export default function Error({
  error = { name: "Error", message: "Error", digest: "Error" },
  reset = () => {},
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex-center flex-col afterHeader">
      <div>
        <h1 className="titles text-blueGrey700 font-bold m-0 p-0 text-center">
          {error.digest}
        </h1>
        <p>{error.message}</p>
      </div>

      <Button onClick={() => reset()}>{t("try-again")}</Button>
    </div>
  );
}
