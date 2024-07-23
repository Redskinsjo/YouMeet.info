import { Skeleton } from "@mui/material";
import React from "react";

export default function ProfilePartLoading() {
  return (
    <div className="flex flex-col w-[22%] xs:w-full sm:w-full md:w-full min-w-[390px] xs:min-w-full sm:min-w-full md:min-w-full h-auto gap-[12px] max-h-screen">
      <div className="h-[93.5px] flex-center flex-col shadow-custom">
        <Skeleton width={"40%"} height={24} />
        <Skeleton width={"20%"} height={14} />
      </div>
      <div className="h-[279px] flex-center flex-col shadow-custom">
        <Skeleton width={24} height={24} />
        <Skeleton width={158} height={158} />
        <Skeleton width={60} height={24} />
      </div>
      <div className="h-[140px] p-[6px] shadow-custom">
        <div className="flex-bet">
          <Skeleton width={60} height={18} />
          <Skeleton width={48} height={18} />
        </div>
        <div className="flex-bet">
          <Skeleton width={48} height={18} />
          <Skeleton width={60} height={18} />
        </div>
        <div className="flex-bet">
          <Skeleton width={60} height={18} />
          <Skeleton width={120} height={18} />
        </div>
        <div className="flex-bet">
          <Skeleton width={48} height={18} />
          <Skeleton width={48} height={18} />
        </div>
        <div className="flex-bet">
          <Skeleton width={48} height={18} />
          <Skeleton width={48} height={18} />
        </div>
        <div className="flex-bet">
          <Skeleton width={48} height={18} />
          <Skeleton width={96} height={18} />
        </div>
      </div>
      <div className="h-max p-[24px] shadow-custom flex-center flex-col">
        <div className="flex-center justify-end w-full mb-[24px]">
          <Skeleton width={"60%"} height={24} />
        </div>
        <div className="flex-center justify-end w-full mb-[12px]">
          <Skeleton width={"80%"} height={16} />
        </div>
        <div className="flex flex-col gap-[12px] w-full">
          <div className="rounded-xl border-[1px] border-solid border-grey100 w-full px-[12px] box-border">
            <div className="flex my-[6px] gap-[12px]">
              <Skeleton width={"40%"} height={16} />
              <Skeleton width={"20%"} height={16} />
            </div>
            <div>
              <div className="flex-bet my-[6px] gap-[12px]">
                <Skeleton width={"20%"} height={12} />
                <Skeleton width={"20%"} height={12} />
              </div>
              <div className="flex-bet my-[6px] gap-[12px]">
                <Skeleton width={"20%"} height={14} />
                <Skeleton width={16} height={20} />
              </div>
            </div>
          </div>
          <div className="rounded-xl border-[1px] border-solid border-grey100 w-full px-[12px] box-border">
            <div className="flex my-[6px] gap-[12px]">
              <Skeleton width={"40%"} height={16} />
              <Skeleton width={"20%"} height={16} />
            </div>
          </div>
          <div className="rounded-xl border-[1px] border-solid border-grey100 w-full px-[12px] box-border">
            <div className="flex my-[6px] gap-[12px]">
              <Skeleton width={"40%"} height={16} />
              <Skeleton width={"20%"} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
