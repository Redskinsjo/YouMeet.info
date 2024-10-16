"use client";
import React, { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BetaUser } from "@youmeet/gql/generated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { dev } from "@youmeet/functions/imports";
import Link from "next/link";
import NewAddCVComponent from "./NewAddCVComponent";
import {
  GlobalState,
  setError,
  setUpload,
} from "@youmeet/global-config/features/global";
import { onDeleteCV } from "@youmeet/functions/actions";
import Logo from "./Logo";
import { isPayloadError } from "@youmeet/types/TypeGuards";

export default function NewCVUpload({
  account,
  profil,
}: {
  account?: boolean;
  profil?: BetaUser;
}) {
  const { t } = useTranslation();
  const cvFile = profil?.cvFile;
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const upload = useSelector(
    (state: RootState) => (state.global as GlobalState).upload
  );

  const customeOnDeleteCV = async (userId: string, formData: FormData) => {
    dispatch(setUpload("r-cv"));
    const result = await onDeleteCV(userId);
    if (result && isPayloadError(result)) {
      dispatch(setError("not-completed"));
    }
    dispatch(setUpload(null));
  };

  const cvComponent = useMemo(() => {
    return (
      <div className="relative box-border flex-center w-full h-[36px] border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg p-[6px] flex-center">
        {cvFile?.url && cvFile.secure_url ? (
          <form
            ref={formRef}
            action={customeOnDeleteCV.bind(null, profil?.id as string)}
            className="flex-bet w-full"
          >
            {upload === "r-cv" ? (
              <Logo gif />
            ) : (
              <Link
                href={dev ? cvFile?.url : cvFile?.secure_url}
                target="_blank"
                className="dark:text-deepPurple200 text-deepPurple700 font-bold"
              >
                {t("view-CV")}
              </Link>
            )}

            <span
              className="font-extralight cursor-pointer dark:text-white"
              onClick={async () => {
                (formRef.current as HTMLFormElement).requestSubmit();
              }}
            >
              {t("delete")}
            </span>
          </form>
        ) : (
          <NewAddCVComponent profil={profil} />
        )}
      </div>
    );
  }, [cvFile?.url, account]);

  return cvComponent;
}
