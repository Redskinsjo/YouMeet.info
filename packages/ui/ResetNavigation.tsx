"use client";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoChevronForwardSharp } from "react-icons/io5";

const BoldText = dynamic(() => import("./TextChild"));

export default function CardNavigation({ type }: { type: SuggestedMeetsType }) {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <form
      action={() => {
        const value = search.has(`${type}-skip`);

        if (value) {
          const params = new URLSearchParams(search.toString());
          if (Number.isNaN(value)) return;
          params.delete(`${type}-skip`);
          const query = params.toString();
          router.push(pathname + "?" + query, { scroll: false });
        }
      }}
      className="h-fit w-full flex-col flex-center"
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
