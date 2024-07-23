import dynamic from "next/dynamic";
import VideoFilter from "./VideoFilter";
import PhoneFilter from "./PhoneFilter";
import LinkedinFilter from "./LinkedinFilter";
import MoreFiltersTitle from "./MoreFiltersTitle";

const SearchComponentField = dynamic(() => import("./SearchComponentField"));

export default function PageFilters() {
  return (
    <div className="w-full box-border min-w-[350px] max-w-[350px] xs:max-w-none sm:max-w-none md:max-w-none bg-grey50 dark:lightDarkBg afterHeaderAndMenu border-[0.5px] border-solid border-grey300 dark:border-grey900 p-[6px] m-[6px] xs:min-h-0 sm:min-h-0 md:min-h-0">
      <div className="h-fit sticky top-[6px] flex flex-col gap-[6px]">
        <div className="px-[6px] w-full box-border max-h-[95px]">
          <div className="flex flex-col items-start justify-center gap-[12px] py-[6px]">
            <SearchComponentField />
          </div>
        </div>
        <div className="flex flex-col mx-[6px] p-[6px] rounded-[3px] bg-white dark:lightDarkBg border-[1px] border-solid border-grey300">
          <MoreFiltersTitle />
          <div className="flex-center flex-col">
            <VideoFilter />
            <PhoneFilter />
            <LinkedinFilter />
          </div>
        </div>
      </div>
    </div>
  );
}
