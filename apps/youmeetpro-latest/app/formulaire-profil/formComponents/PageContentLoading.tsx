import { Skeleton } from "@mui/material";

export default function PageContentLoading() {
  return (
    <div className="flex-center flex-col w-full h-full">
      <div className="w-full flex flex-col gap-[24px]">
        <div className="p-[12px] w-full rounded-[14px] border-[0.5px] border-solid border-grey200 box-border">
          <Skeleton width={"100%"} height={22} className="dark:bg-white" />
        </div>
        <div className="flex justify-end">
          <div className="p-[12px] rounded-[14px] border-[0.5px] border-solid border-grey200">
            <Skeleton width={90} height={18} className="dark:bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
