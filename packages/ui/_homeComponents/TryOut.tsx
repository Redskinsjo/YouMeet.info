"use client";
import { setLogin } from "@youmeet/global-config/features/global";
import { Button } from "@mui/material";
import { UnknownAction } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function TryOut() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Button
      href="/se-connecter"
      onClick={() => {
        dispatch(setLogin(true) as UnknownAction);
      }}
      title="Essayer l'application YouMeet.info et se connecter en se créant un profil"
      LinkComponent={"a"}
      role="link"
      className="w-[240px] bg-yellow500 text-white font-bold sentences xs:subItem sm:subItem rounded-2xl focus-visible:linear-gradient2"
    >
      {t("try")}
    </Button>
  );
}
