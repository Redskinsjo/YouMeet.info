"use client";
import { ModalWrapper } from "../CustomModal";
import BoldText from "../BoldText";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import { ModalState } from "@youmeet/global-config/features/modal";
import Image from "next/image";
import NewTargetJobComponent from "../dashboard/dashboardComponents/NewTargetJobComponent";
import NewTargetContractTypeComponent from "../dashboard/dashboardComponents/NewTargetContractTypeComponent";
import AddVideo from "../AddVideo";

export default function FulfillModal({ type }: CustomModalProps) {
  const { t } = useTranslation();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  return (
    modal.user && (
      <ModalWrapper>
        <>
          <div className="w-full h-full flex-col flex-center gap-[12px]">
            <h3 className="dark:text-white font-semibold">{t("welcome")}</h3>
            <BoldText text={t("happy-to-see-you")} align="center" />
            <BoldText text={t("welcome-incentive")} />
            <Image
              src={
                "https://res.cloudinary.com/de822mdsy/image/upload/v1715768466/youmeet-official/misc/xkvsgrihhzwlkjqi6djw.webp"
              }
              width={300 * 1.5625}
              height={300}
              alt="travailler agréablement sur une table de jardin avec un ordinateur et un café"
            />
            <BoldText text={t("start-with-some-info")} />
            <div className="w-full bg-grey100  dark:extraLightDarkBg rounded-[14px] p-[6px] box-border">
              <NewTargetJobComponent profil={modal.user} />
            </div>
            <div className="w-full bg-grey100  dark:extraLightDarkBg rounded-[14px] p-[6px] box-border">
              <NewTargetContractTypeComponent profil={modal.user} />
            </div>
            <div className="w-full bg-grey100  dark:extraLightDarkBg rounded-[14px] p-[6px] box-border">
              <AddVideo profil={modal.user} />
            </div>
          </div>
        </>
      </ModalWrapper>
    )
  );
}
