"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IoChevronBack } from "react-icons/io5";

export default function LinkToVideos() {
  const { t } = useTranslation();
  return (
    <div className="flex-center gap-[12px]">
      <IoChevronBack className="dark:text-white" />
      <Link
        href={"/dashboard"}
        className="no-underline hover:underline underline-offset-[2px] dark:decoration-white decoration-black"
      >
        <div className="dark:text-white text-black">{t("see-videos")}</div>
      </Link>
    </div>
  );
}
