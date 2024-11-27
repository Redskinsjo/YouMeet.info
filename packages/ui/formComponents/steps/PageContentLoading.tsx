import { Skeleton } from "@mui/material";

export default function PageContentLoading() {
  return (
    <div className="flex-center flex-col w-full">
      <div className="h-[212px]" />
      <div className="w-full flex flex-col gap-[24px]">
        <div className="p-[12px] w-full rounded-[14px] border-[0.5px] border-solid border-grey200 box-border">
          <Skeleton width={"100%"} height={22} />
        </div>
        <div className="flex justify-end">
          <div className="p-[12px] rounded-[14px] border-[0.5px] border-solid border-grey200">
            <Skeleton width={90} height={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
