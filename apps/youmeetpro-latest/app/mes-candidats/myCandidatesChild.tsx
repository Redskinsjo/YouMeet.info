import NotificationsComponent from "@youmeet/app/dashboard/dashboardComponents/NotificationsComponent";
import { BetaUser, UnlockedUser } from "@youmeet/gql/generated";

export default function MyCandidatesChild({
  profil,
  unlockedUsers,
}: {
  profil: BetaUser;
  unlockedUsers: UnlockedUser[];
}) {
  return (
    <div className="indent-4 text-justify px-[40px] py-[48px] xs:p-[12px] sm:p-[12px] md:p-[12px]">
      <NotificationsComponent
        notifications={profil.company?.sharings}
        sharings
        profil={profil}
        unlockedUsers={unlockedUsers}
      />
    </div>
  );
}
