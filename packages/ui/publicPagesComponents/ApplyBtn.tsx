"use client";
import { Button } from "@mui/material";
import { setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { setLogin } from "@youmeet/global-config/features/global";
import { useDispatch, useSelector } from "react-redux";
import { Offer } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import BoldText from "../BoldText";
import { useRouter } from "next/navigation";

export default function ApplyBtn({ offre }: { offre?: Offer }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user as UserState);
  const router = useRouter();
  router.prefetch("/se-connecter");

  const alreadyApplied = !!offre?.sharings?.find(
    (sharing) => sharing?.origin?.id === user.id
  );

  return (
    <Button
      className={
        alreadyApplied
          ? "h-fit min-h-[49px] xs:min-h-[33px] sm:min-h-[33px] w-fit bg-grey500 text-grey700 dark:darkBg dark:text-white"
          : user.videos.length > 0 && user.cvFile
          ? "h-fit min-h-[49px] xs:min-h-[33px] sm:min-h-[33px] w-fit dark:darkBg dark:text-white lightBg text-black"
          : "h-fit min-h-[49px] xs:min-h-[33px] sm:min-h-[33px] w-fit dark:darkBg dark:text-white"
      }
      disabled={alreadyApplied}
      onClick={async () => {
        if (!user.id) {
          dispatch(setLogin(true) as UnknownAction);
          return router.push("/se-connecter");
        }

        dispatch(
          setModal({
            display: "videoAdding",
            publicOffer: offre,
          }) as UnknownAction
        );
      }}
    >
      <BoldText
        text={
          alreadyApplied
            ? t("already-applied")
            : user.videos.length > 0 && user.cvFile
            ? t("apply-now")
            : t("apply-with-youmeet")
        }
        containerStyle={{
          margin: "0px",
          lineHeight: 1.4,
          fontWeight: "bold",
        }}
      />
    </Button>
  );
}
