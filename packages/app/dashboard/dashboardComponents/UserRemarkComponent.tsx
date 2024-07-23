import GenericField from "@youmeet/app/formulaire-profil/formComponents/fields/GenericField";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "@youmeet/gql/index";
import { CreateUserRemarkDocument } from "@youmeet/gql/generated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { resetModal, setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { HiPencil } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";

export default function UserRemarkComponent() {
  const [content, setContent] = useState("");
  const [isValidated, setIsValidated] = useState(true);
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      {!isValidated ? (
        <div className="flex-bet gap-[12px] w-full">
          <div className="w-full flex-center gap-[24px]">
            <h3 className="font-light subItem my-0 dark:text-grey300">
              {t("what-remarks")}
            </h3>
            <div className="flex-center gap-[12px] xs:flex-col sm:flex-col md:flex-col w-full">
              <GenericField
                basic
                type="text"
                genericClasses="min-w-[300px] xs:min-w-full sm:min-w-full md:min-w-full"
                location="content"
                name="content"
                account
                label={t("remarks")}
                placeholder={t("what-remarks")}
                value={content}
                onChange={(value) => setContent(value)}
                multiline={3}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <TooltipedAsset asset={`${t("cancel")}`} placement="right">
              <div className="flex-center">
                <MdOutlineCancel
                  style={{ borderRadius: "100%" }}
                  className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                  onClick={() => setIsValidated(true)}
                />
              </div>
            </TooltipedAsset>
            <TooltipedAsset asset={`${t("validate")}`} placement="right">
              <div className="flex-center">
                <IoIosCheckmarkCircle
                  style={{ borderRadius: "100%" }}
                  className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                  onClick={async () => {
                    if (content) {
                      const res = await client.mutate({
                        mutation: CreateUserRemarkDocument,
                        variables: {
                          data: { content, userId: user.id as string },
                        },
                      });
                      const created = res.data?.createRemark;
                      if (created) {
                        dispatch(resetModal("ok") as UnknownAction);
                        dispatch(
                          setModal({
                            display: "backofficeConfirm",
                          }) as UnknownAction
                        );
                        setContent("");
                      }
                    }
                  }}
                />
              </div>
            </TooltipedAsset>
          </div>
        </div>
      ) : (
        <div className="w-full flex-center gap-[24px]">
          <h3 className="font-light subItem my-0 dark:text-grey300">
            {t("what-remarks")}
          </h3>
          <div className="flex-center gap-[12px]">
            <span>-</span>
            {isValidated ? (
              <div>
                <HiPencil
                  style={{ borderRadius: "100%" }}
                  className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 p-[4px] text-[18px] cursor-pointer"
                  onClick={() => setIsValidated(false)}
                />
              </div>
            ) : undefined}
          </div>
        </div>
      )}
    </div>
  );
}
