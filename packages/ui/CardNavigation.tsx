"use client";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";

export default function CardNavigation({
  type,
  length,
}: {
  type: SuggestedMeetsType;
  length: number;
}) {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(search.get(`${type}-skip`));

  let sort = "asc";
  if (search.has(`${type}-skip`) && value) {
    const isNotNum = Number.isNaN(parseInt(value));
    if (isNotNum) return;
    if (!isNotNum) {
      if (length < 5) {
        if (parseInt(value) >= 1) sort = "desc";
      }
    }
  } else {
    if (length < 5) return;
  }
  return (
    <div className="w-[40px] xs:w-[49%] sm:w-[49%] h-[300px] flex justify-start">
      <form
        action={() => {
          const params = new URLSearchParams(search.toString());
          if (Number.isNaN(value)) return;
          if (value) {
            const toSet = `${
              sort === "asc" ? parseInt(value) + 1 : parseInt(value) - 1
            }`;
            params.set(`${type}-skip`, toSet);
            setValue(toSet);
          } else {
            params.set(`${type}-skip`, "1");
            setValue("1");
          }
          const query = params.toString();
          router.push(pathname + "?" + query, { scroll: false });
        }}
        className=" flex-center"
      >
        <button type="submit" className="outline-0 bg-transparent border-0">
          {sort === "asc" ? (
            <IoChevronForwardSharp className="cursor-pointer p-[6px] text-[30px]" />
          ) : (
            <IoChevronBackSharp className="cursor-pointer p-[6px] text-[30px]" />
          )}
        </button>
      </form>
    </div>
  );
}
