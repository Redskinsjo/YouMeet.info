import { BetaDetails, BetaUser, Reference } from "@youmeet/gql/generated";
import Discussions from "@youmeet/ui/_homeComponents/Discussions";
import ProfilePartComponent from "@youmeet/ui/ProfilePartComponent";
import DashboardPartComponent from "@youmeet/ui/dashboardComponents/DashboardPartComponent";

export default function DashboardChild({
  profil,
  references,
}: {
  profil: BetaUser;
  references: Reference[];
}) {
  return (
    <div
      className="afterHeader flex flex-col gap-[6px]"
      data-testid="compte-container"
    >
      <div className="flex md:flex-wrap w-full gap-[3px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] xs:flex-col sm:flex-col md:flex-col lightBg">
        <ProfilePartComponent
          profil={profil}
          details={profil?.details as BetaDetails}
          account
          references={references}
        />

        <DashboardPartComponent profil={profil} />
      </div>

      <Discussions />
    </div>
  );
}
