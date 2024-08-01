import {
  BetaUser,
  GetRecruiterQueuesFromProfileDocument,
} from "@youmeet/gql/generated";
import QueueAndThreadStatus from "./QueueAndThreadStatus";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import React from "react";

export default function ConversationsInProgress({
  profil,
}: {
  profil: BetaUser;
}) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const { data, loading } = useQuery(GetRecruiterQueuesFromProfileDocument, {
    variables: { originId: user.id, targetId: profil.id },
    fetchPolicy: "no-cache",
  });
  const queues = data?.recruiterQueuesFromProfile;
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-[120px] flex-center flex-col bg-grey50 dark:lightDarkBg text-[14px] italic font-extralight box-border">
      {!loading && queues && queues.length > 0
        ? queues.map((queue) => {
            if (queue)
              return <QueueAndThreadStatus key={queue.id} queue={queue} />;
            return undefined;
          })
        : t("no-data")}
    </div>
  );
}
