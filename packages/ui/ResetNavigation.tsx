"use client";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BoldText = dynamic(() => import("./TextChild"));

export default function CardNavigation({ type }: { type: SuggestedMeetsType }) {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <form
      action={() => {
        const skip = search.has(`${type}-skip`);

        const params = new URLSearchParams(search.toString());
        if (skip) params.delete(`${type}-skip`);
        if (type === "all") params.delete("l");
        const query = params.toString();
        router.push(pathname + "?" + query, { scroll: false });
      }}
      className="h-fit w-full flex-col flex-center gap-[12px]"
    >
      <BoldText text={"or"} align="center" />
      <button
        type="submit"
        className="outline-0 bg-transparent border-0 cursor-pointer"
      >
        <BoldText
          text={"reset-navigation"}
          fontSizeClass="w-max text-deepPurple700"
          align="center"
        />
      </button>
    </form>
  );
}
