import { Skeleton } from "@mui/material";
import PageContentLoading from "./PageContentLoading";

export default function RightPartFormComponentLoading() {
  return (
    <div className="flex items-center flex-col w-[50vw] xs:w-screen sm:w-screen md:w-screen p-[40px] box-border dark:darkBg lightBg">
      <div className="flex-center flex-col gap-[24px] w-[280px] my-[36px]">
        <Skeleton width={180} height={28} className="dark:bg-white" />
        <div className="flex-center gap-[24px]">
          <Skeleton width={30} height={30} className="dark:bg-white" />
        </div>
      </div>
      <PageContentLoading />
    </div>
  );
}
