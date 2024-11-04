"use client";
import { GlobalState } from "@youmeet/global-config/features/global";
import { RootState } from "@youmeet/global-config/store";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function UploadText() {
  const { t } = useTranslation();
  const global = useSelector((state: RootState) => state.global as GlobalState);
  const upload = global.upload;

  return (
    <div className="dark:text-white font-light">
      {t(
        upload === "upload-50"
          ? "loading-50"
          : upload === "delete"
          ? "deleting"
          : "loading"
      )}
    </div>
  );
}
