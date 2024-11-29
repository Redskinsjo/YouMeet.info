import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const DashboardTabs = dynamic(() => import("./DashboardTabsChild"));
const DashboardContent = dynamic(() => import("./DashboardContentChild"));

export default function DashboardPartComponent({
  profil,
}: {
  profil: BetaUser;
}) {
  return (
    <div className="w-full flex flex-col gap-[6px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] bg-white dark:extraLightDarkBg">
      {/* <DashboardFT /> */}
      <div className="border-[0.5px] border-solid border-grey300 dark:border-grey900 xs:max-w-full sm:max-w-full md:max-w-full w-full flex flex-col gap-[6px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] bg-white dark-extraLightDarkBg">
        <DashboardTabs profil={profil} />
        <DashboardContent profil={profil} />
      </div>
    </div>
  );
}
