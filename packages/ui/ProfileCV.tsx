"use client";
import { dev } from "@youmeet/functions/imports";
import { BetaUser } from "@youmeet/gql/generated";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ProfileCV({ profil }: { profil: BetaUser }) {
  const { t } = useTranslation();
  return (
    <div className="relative box-border flex w-full h-[36px]">
      <div className="flex-center w-full">
        <Link
          href={
            dev
              ? (profil?.cvFile?.url as string)
              : (profil?.cvFile?.secure_url as string)
          }
          target="_blank"
          className="dark:text-deepPurple200 text-deepPurple700"
        >
          {t("view-CV")}
        </Link>
      </div>
    </div>
  );
}
