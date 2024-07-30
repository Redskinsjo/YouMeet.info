import { setModal } from "@youmeet/global-config/features/modal";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import getOfferOrPreviewValues from "@youmeet/utils/getOfferOrPreviewValues";
import { UnknownAction } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Validation = ({ type, watch }: NewFieldProps & GenericFieldProps) => {
  const dispatch = useDispatch();
  const {
    i18n: { language },
  } = useTranslation();
  const companyId = useSelector(
    (state: RootState) => (state.user as UserState).company?.id
  );
  const pathname = usePathname();

  return type !== "hidden" ? (
    <div className="text-purple900 xs:sentences sm:sentences md:titles lg:titles xl:titles titles p-[8px] flex-center flex-col gap-[12px] dark:text-deepPurple200">
      Fin du formulaire
      {pathname === "/creer-offre" && (
        <div
          className="flex-center legend gap-[6px] text-green500 cursor-pointer"
          onClick={async () => {
            if (watch && companyId) {
              const values = await getOfferOrPreviewValues(
                watch(),
                language as "fr" | "en",
                companyId
              );

              dispatch(
                setModal({
                  display: "offer",
                  offerPreview: values,
                }) as UnknownAction
              );
            }
          }}
        >
          <div>Voir un aperçu</div>
          <AiOutlineEye />
        </div>
      )}
    </div>
  ) : undefined;
};

export default Validation;
