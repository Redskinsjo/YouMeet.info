"use client";

import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "react-i18next";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import { ModalState } from "@youmeet/global-config/features/modal";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import Image from "next/image";
import dynamic from "next/dynamic";
import NewTargetContractTypeComponent from "../dashboardComponents/NewTargetContractTypeComponent";
import AddVideo from "../AddVideo";
import ModalClose from "./ModalClose";

const BoldText = dynamic(() => import("@youmeet/ui/TextChild"), { ssr: false });
const NewTargetJobComponent = dynamic(
  () => import("../dashboardComponents/NewTargetJobComponent"),
  { ssr: false }
);
export default function FulfillModal({ type }: CustomModalProps) {
  const { t } = useTranslation();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  return (
    modal.user && (
      <ModalWrapper>
        <>
          <div className="w-full h-full flex-col flex-center gap-[12px] max-w-[600px]">
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
          <ModalClose />
        </>
      </ModalWrapper>
    )
  );
}
