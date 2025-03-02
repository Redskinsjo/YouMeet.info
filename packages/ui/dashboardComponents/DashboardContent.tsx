import OtherOfferComponent from "../OtherOfferComponent";
import { BetaUser } from "@youmeet/gql/generated";
// import AffiliatesComponent from "./AffiliatesComponent";
import dynamic from "next/dynamic";
// import NewConsentComponent from "./NewConsentComponent";

// const DashboardFT = dynamic(() => import("./DashboardFTChild"));
const ProfileViewsComponent = dynamic(() => import("./ProfileViewsChild"));
const CustomTabPanel = dynamic(() => import("./CustomTabPanelChild"));
const NewTargetJobComponent = dynamic(() => import("./NewTargetJobChild"));
const PreferredLocationComponent = dynamic(
  () => import("./PreferredLocationChild")
);
const NewTargetContractTypeComponent = dynamic(
  () => import("./NewTargetContractTypeChild")
);
const NewVideoComponent = dynamic(() => import("./NewVideoChild"));
const SettingsComponent = dynamic(() => import("./SettingsChild"));
// const UserNotices = dynamic(() => import("./UserNoticesChild"));

export default function DashboardContent({ profil }: { profil: BetaUser }) {
  return (
    <div className="dark:extraLightDarkBg">
      <CustomTabPanel index={0}>
        <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
          <ProfileViewsComponent profil={profil} />
        </div>
        {/* <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
        <NewIsPublicComponent profil={profil} />
      </div> */}
        {/* <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
        <NewConsentComponent profil={profil} />
      </div> */}
      </CustomTabPanel>
      <CustomTabPanel index={1}>
        <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
          <NewTargetJobComponent profil={profil} />
        </div>
        <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
          <NewTargetContractTypeComponent profil={profil} />
        </div>
        <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
          <PreferredLocationComponent profil={profil} />
        </div>
        <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
          {profil.candidate?.suggestedOpportunities?.map((opp) => {
            return opp ? (
              <OtherOfferComponent
                key={opp?.id}
                offer={opp}
              ></OtherOfferComponent>
            ) : undefined;
          })}
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={2}>
        <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify">
          <NewVideoComponent profil={profil} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={3}>
        <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify">
          <SettingsComponent />
        </div>
      </CustomTabPanel>
      {/* <CustomTabPanel index={3}>
        <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify">
          <UserNotices />
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={4}>
        <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify">
          <AffiliatesComponent profil={profil} />
        </div>
      </CustomTabPanel> */}

      {/* <div className="indent-4 xs:indent-0 sm:indent-0 md:indent-0 text-justify border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
  <NewExperiencesDisplay profil={profil} />
</div> */}
    </div>
  );
}
