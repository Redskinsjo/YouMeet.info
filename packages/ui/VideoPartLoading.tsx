import { Skeleton } from "@mui/material";

export default function VideoPartLoading({
  width,
}: {
  width: "full" | "600px";
}) {
  const w = width === "full" ? "w-full" : width === "600px" ? `w-[600px]` : "";
  const className = `flex flex-col gap-[6px] h-[400px] ${w} xs:w-screen sm:w-screen`;
  return (
    <div className={className}>
      <div className="indent-4 xs:indent-0 sm:indent-0 md:indent-0 text-justify p-[12px] h-[86px] box-border shadow-custom">
        <Skeleton width={"100%"} height={16} />
        <Skeleton width={"100%"} height={16} />
        <Skeleton width={"20%"} height={16} />
      </div>

      <div className="flex-center flex-col w-full h-full gap-[12px] md2:flex-col flex-wrap content-start p-[24px] box-border shadow-custom max-h-[550px]">
        <div className="w-full flex-center my-[24px]">
          <Skeleton width={180} height={18} />
        </div>
        <div className="w-full flex-center flex-1 h-full">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
      </div>
    </div>
  );
}
