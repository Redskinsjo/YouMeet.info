import { ModalState, setModal } from "@youmeet/global-config/features/modal";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { GetMyNotificationsDocument } from "@youmeet/gql/generated";
import { useQuery } from "@apollo/client";
import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function NotificationsIconComponent() {
  const notificationsContainerRef = useRef(null);
  const user = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();
  const modalDisplay = useSelector(
    (state: RootState) => (state.modal as ModalState).display
  );
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const { data, refetch } = useQuery(GetMyNotificationsDocument, {
    variables: {
      targetId: user.id,
      status: "pending",
      type: ["offer", "view", "like", "feedback", "refusal"],
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (modalDisplay !== "notifications") refetch();
  }, [modalDisplay]);

  return user?.id ? (
    <div>
      <div className="relative" ref={notificationsContainerRef}>
        {data?.myNotifications && data.myNotifications.length > 0 ? (
          <div
            className="flex-center cursor-pointer animate-pulse text-deepPurple500 hover:bg-deepPurple500 hover:text-white bg-grey100 rounded-xl h-[25px] w-[25px]"
            onClick={async () => {
              setDisplayNotifications(!displayNotifications);
              dispatch(
                setModal({
                  display: "notifications",
                }) as UnknownAction
              );
            }}
          >
            <MdNotifications className="w-full h-full" />
          </div>
        ) : (
          <div
            className="flex-center cursor-pointer text-grey400 bg-grey100 rounded-xl h-[25px] w-[25px]"
            onClick={async () => {
              setDisplayNotifications(!displayNotifications);
              dispatch(
                setModal({
                  display: "notifications",
                }) as UnknownAction
              );
            }}
          >
            <MdNotifications className="w-full h-full" />
          </div>
        )}
      </div>
    </div>
  ) : undefined;
}
