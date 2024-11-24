"use client";

import { useQuery } from "@apollo/client";
import CustomIcon from "../CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import { giveTimeAgo } from "@youmeet/utils/basics/formatToDatetime";
import OneLineSkeleton from "../OneLineSkeleton";
import {
  GetMyNotificationsDocument,
  UpdateAllMyNotificationsDocument,
  Notification,
} from "@youmeet/gql/generated";
import { RootState } from "@youmeet/global-config/store";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "@youmeet/global-config/features/user";
import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { setName } from "@youmeet/utils/basics/setName";
import DetailComponent from "../DetailComponent";
import { resetModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { client } from "@youmeet/gql/index";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import LoginModalClose from "../login/LoginModalClose";

export default function NotificationsModalComponent(props: CustomModalProps) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const { data, refetch, loading } = useQuery(GetMyNotificationsDocument, {
    variables: {
      targetId: user.id,
      type: ["offer", "view", "like", "feedback", "refusal"],
    },
    fetchPolicy: "no-cache",
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <ModalWrapper>
      <>
        <div className="w-full h-full flex-col flex-center">
          <h3 className="item my-0">{t("my-notifications")}</h3>
          {!loading ? (
            <div className="w-full h-full flex items-center justify-between gap-[12px] box-border flex-col p-[8px] bg-grey200 rounded-[7px]">
              <div className="overflow-hidden overflow-y-scroll flex flex-col gap-[6px] w-full border-[0.5px] border-solid border-grey500 rounded-[7px]">
                {data?.myNotifications && data?.myNotifications.length ? (
                  (
                    data?.myNotifications.filter((not) => not) as Notification[]
                  ).map((notif) => (
                    <Accordion key={notif?.id}>
                      <AccordionSummary
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <span>
                          {notif?.type === "offer" ? (
                            <CustomIcon
                              name={CustomIconName.interview}
                              onlyIcon
                              newStyles={{ color: "black" }}
                            />
                          ) : undefined}
                        </span>
                        <span
                          className="text-[14px] break-normal"
                          style={{
                            textRendering: "geometricPrecision",
                          }}
                        >
                          {notif?.content}
                        </span>
                        <div className="flex-1 text-[12px] flex justify-end">
                          {giveTimeAgo(notif.createdAt)}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {notif.type === "feedback" ? (
                          <div>
                            <div className="mx-[3px] text-[14px]">
                              {notif.feedback?.content}
                            </div>

                            <div>
                              <span className="mx-[3px] text-[14px] text-grey700 dark:text-grey200">
                                {t("from2")}
                              </span>
                              {notif.origin?.company?.id ? (
                                <span className="mx-[3px] text-[14px]">
                                  {notif.origin?.company.name}
                                </span>
                              ) : setName(notif.origin) ? (
                                <span className="mx-[3px] text-[14px]">
                                  {setName(notif.origin)}
                                </span>
                              ) : undefined}
                            </div>
                          </div>
                        ) : notif.type === "like" ? (
                          <div>
                            <span className="mx-[3px] text-[14px] text-grey700 dark:text-grey200">
                              {t("from2")}
                            </span>
                            {notif.origin?.company?.id ? (
                              <span className="mx-[3px] text-[14px]">
                                {notif.origin?.company.name}
                              </span>
                            ) : setName(notif.origin) ? (
                              <span className="mx-[3px] text-[14px]">
                                {setName(notif.origin)}
                              </span>
                            ) : undefined}
                          </div>
                        ) : notif.type === "refusal" ? (
                          <div>
                            <div className="mx-[3px] text-[14px]">
                              {notif.refusal?.reason}
                            </div>
                            <DetailComponent
                              type="modal"
                              label={t("type")}
                              value={t(notif.refusal?.type as string)}
                            />

                            {(notif.origin?.company?.name ||
                              setName(notif.origin)) && (
                              <div>
                                <span className="mx-[3px] text-[14px] text-grey700 dark:text-grey200">
                                  {t("from2")}
                                </span>
                                {notif.origin?.company?.id ? (
                                  <span className="mx-[3px] text-[14px]">
                                    {notif.origin?.company.name}
                                  </span>
                                ) : setName(notif.origin) ? (
                                  <span className="mx-[3px] text-[14px]">
                                    {setName(notif.origin)}
                                  </span>
                                ) : undefined}
                              </div>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <div className="flex-center italic text-grey500 my-[24px] mx-0">
                    {t("no-data")}
                  </div>
                )}
              </div>

              <span
                className={
                  data?.myNotifications && data?.myNotifications.length > 0
                    ? "bottom-[4px] left-0 right-0 p-[4px] flex-center text-[14px] w-full hover:bg-grey300 cursor-pointer"
                    : "bottom-[4px] left-0 right-0 p-[4px] flex-center text-[14px] w-full hover:bg-transparent cursor-default"
                }
                onClick={async () => {
                  if (
                    data?.myNotifications &&
                    data?.myNotifications.length > 0
                  ) {
                    const response = await client.mutate({
                      mutation: UpdateAllMyNotificationsDocument,
                      variables: {
                        targetId: user.id as string,
                        status: "seen",
                      },
                    });
                    const updated = response.data?.updateAllMyNotifications;
                    if (updated) {
                      const response = await client.query({
                        query: GetMyNotificationsDocument,
                        variables: {
                          targetId: user?.id || "",
                          type: ["offer", "view"],
                        },
                        fetchPolicy: "no-cache",
                      });
                      const notifs = response.data?.myNotifications;
                      if (notifs) refetch();
                      dispatch(resetModal("ok") as UnknownAction);
                    }
                  }
                }}
              >
                {t("mark-all-read")}
              </span>
            </div>
          ) : (
            <OneLineSkeleton />
          )}
        </div>
        <LoginModalClose />
      </>
    </ModalWrapper>
  );
}
