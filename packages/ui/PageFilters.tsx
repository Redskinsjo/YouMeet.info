"use client";
import dynamic from "next/dynamic";
import DividerSection from "./_components/DividerSection";

const SearchFilter = dynamic(
  () => import("./offres/offresComponent/SearchFilterChild")
);
const LocationFilter = dynamic(
  () => import("./offres/offresComponent/LocationFilterChild")
);

export default function PageFilters() {
  return (
    <div>
      <div className="w-full flex-center items-start xs:flex-col sm:flex-col md:flex-col p-[8px] box-border border-[0.5px] border-solid border-grey500 bg-white dark:lightDarkBg">
        <div className="w-full max-h-[95px] z-50 relative box-border flex w-full xs:flex-col sm:flex-col">
          <SearchFilter />
          <DividerSection width="6px" />
          <LocationFilter />
        </div>
      </div>
    </div>
  );
}
