import FranceTravailConnect from "../backofficeComponents/FranceTravailConnect";
import DetailComponent from "../DetailComponent";
import { useTranslation } from "react-i18next";

export default function DashboardFT() {
  const { t } = useTranslation();
  return (
    <div className="border-[0.5px] border-solid border-grey300 dark:border-grey900 xs:max-w-full sm:max-w-full md:max-w-full w-full flex flex-col gap-[6px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] bg-white dark-extraLightDarkBg">
      <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
        <DetailComponent
          type="modal"
          noLabelColon
          noPadding
          labelFullWidth
          labelNoWrap
          account
          label={
            <h3 className="font-light subItem my-0 text-grey700 dark:text-grey300">
              {t("add-ft-experiences")}
            </h3>
          }
          value={<FranceTravailConnect />}
        />
      </div>
    </div>
  );
}
