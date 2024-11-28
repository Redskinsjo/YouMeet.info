import dynamic from "next/dynamic";
import DividerSection from "./_components/DividerSection";

const SearchFilter = dynamic(
  () => import("./offresComponent/SearchFilterChild")
);
const LocationFilter = dynamic(
  () => import("./offresComponent/LocationFilterChild")
);

export default function PageFilters() {
  return (
    <div>
      <div className="w-full flex-center items-start xs:flex-col sm:flex-col md:flex-col p-[8px] box-border border-[0.5px] border-solid border-grey500 bg-white dark:lightDarkBg">
        <div className="w-full box-border flex xs:flex-col sm:flex-col">
          <div className="flex-1">
            <SearchFilter />
          </div>
          <DividerSection width="6px" />
          <div className="flex-1">
            <LocationFilter />
          </div>
        </div>
      </div>
    </div>
  );
}
