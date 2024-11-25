"use client";
import { useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import Image from "next/image";
import Flower from "@/public/flower.webp";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import SimpleField from "@youmeet/ui/formulaire-profil/formComponents/fields/SimpleField";
import SubmitBtn from "@youmeet/ui/SubmitBtn";
import { onResetPassword } from "@youmeet/functions/actions";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { setError } from "@youmeet/global-config/features/global";
import { setModal } from "@youmeet/global-config/features/modal";

export default function ResetPasswordContent({ userId }: { userId: string }) {
  const md = useMediaQuery("(max-width:900px)");
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const customOnResetPassword = async (
    extras: { userId: string },
    formData: FormData
  ) => {
    const result = await onResetPassword(extras, formData);
    if (result && isPayloadError(result)) {
      dispatch(setError("not-completed") as UnknownAction);
      router.push("/message");
    } else {
      dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
      router.push("/message");
      setTimeout(() => {
        router.push(`/${result.data}`);
      }, 2500);
    }
  };

  useEffect(() => {
    router.prefetch("/message");
  }, []);

  return (
    <form
      className="flex-center flex-col box-border w-full xs:p-[12px] sm:p-[12px] gap-[24px] appear_slowly afterHeader"
      action={customOnResetPassword.bind(null, { userId })}
    >
      <div className="flex-center">
        <Image
          src={Flower}
          alt={"flower-for-login"}
          width={300}
          height={220}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col justify-around items-center xs:gap-[12px] sm:gap-[12px] gap-[36px] w-[400px] xs:w-full sm:w-full">
        <h1 className="m-0 p-0 titles text-center">{t("reset-password")}</h1>
        <div className="flex flex-col gap-[12px] w-full">
          <SimpleField
            type="password"
            name="password"
            label="Mot de passe"
            required
          />
          <SimpleField
            type="password"
            name="confirmPassword"
            label="Confirmer Mot de passe"
            required
          />
        </div>

        <div className="w-full flex-center items-center gap-[12px]">
          <div className="flex-1 hover:text-blueGrey500 cursor-pointer"></div>
          <SubmitBtn text={t("reset-password")} />

          <div className="text-deepPurple900 flex flex-col group hover:cursor-pointer w-[144px] flex-1"></div>
        </div>
      </div>
    </form>
  );
}
