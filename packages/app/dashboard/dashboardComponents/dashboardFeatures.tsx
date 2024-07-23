import CreateOffer from "./CreateOffer";
import NewSubscriptionComponent from "./NewSubscriptionComponent";
import SeeMyOffers from "./SeeMyOffers";
import SeeMyFavorites from "./SeeMyFavorites";
import SeeMyCandidates from "./SeeMyCandidates";
import SeeMySearch from "./SeeMySearch";
import SeeMySearchTitle from "./SeeMySearchTitle";
import SeeMyCandidatesTitle from "./SeeMyCandidatesTitle";
import SeeMyOffersTitle from "./SeeMyOffersTitle";

export default function DashboardFeatures() {
  return (
    <div className="h-[60px] bg-grey50 dark:lightDarkBg flex-center py-[2px] flex-bet">
      <NewSubscriptionComponent />
      <div className="flex-center gap-[6px]">
        <div className="flex flex-col mx-[6px]">
          <SeeMySearchTitle />
          <div className="flex-center">
            <SeeMySearch />
          </div>
        </div>
        <hr className="bg-grey500 w-[1px] h-[20px]" />
        <div className="flex flex-col mx-[6px]">
          <SeeMyCandidatesTitle />
          <div className="flex-center">
            <SeeMyCandidates />
            <SeeMyFavorites />
          </div>
        </div>
        <hr className="bg-grey500 w-[1px] h-[20px]" />
        <div className="flex flex-col mx-[6px]">
          <SeeMyOffersTitle />
          <div className="flex-center">
            <SeeMyOffers />
            <CreateOffer />
          </div>
        </div>
      </div>
    </div>
  );
}
