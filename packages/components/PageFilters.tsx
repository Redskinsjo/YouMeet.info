import { purple } from "@mui/material/colors";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from "react-icons/io";
import GenericField from "@youmeet/app/formulaire-profil/formComponents/fields/GenericField";

export default function PageFilters({
  setSearch,
  search,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="w-full flex-center items-start xs:flex-col sm:flex-col md:flex-col p-[8px] box-border border-[0.5px] border-solid border-grey500 bg-white dark:lightDarkBg rounded-lg">
      <div className="w-full max-h-[95px] z-50 relative box-border">
        {setSearch ? (
          <div className="flex items-start justify-center gap-[12px] relative">
            <GenericField
              type="text"
              name="search"
              location="search"
              label={t("search-by-job")}
              value={search}
              onChange={(value) => {
                setSearch(value);
              }}
              border={`1px solid ${purple[500]}`}
              genericClasses="w-[50vw] xs:w-screen sm:w-screen md:w-screen"
              basic
            />
            <div className="absolute h-full flex-center right-[12px]">
              <IoIosSearch className="item dark:text-white" />
            </div>
          </div>
        ) : undefined}
      </div>
    </div>
  );
}
