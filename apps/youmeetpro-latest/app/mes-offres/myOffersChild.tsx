import { BetaUser } from "@youmeet/gql/generated";
import NotificationsComponent from "@youmeet/app/dashboard/dashboardComponents/NotificationsComponent";

export default function MyOffersChild({ profil }: { profil: BetaUser }) {
  return (
    <div className="indent-4 text-justify px-[40px] py-[48px] xs:p-[12px] sm:p-[12px] md:p-[12px]">
      <NotificationsComponent
        notifications={profil.myOffers}
        offers
        unlockedUsers={[]}
        profil={profil}
      />
    </div>
  );
}
