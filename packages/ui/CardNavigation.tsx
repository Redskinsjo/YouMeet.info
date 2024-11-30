"use client";
import {
  SearchState,
  setOffresSearch,
} from "@youmeet/global-config/features/search";
import { RootState } from "@youmeet/global-config/store";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function CardNavigation({
  type,
  length,
  sort = "asc",
}: {
  type: SuggestedMeetsType;
  length: number;
  sort?: string;
}) {
  const search = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState(search.get(`${type}-skip`));
  const location = useSelector(
    (state: RootState) => state.search as SearchState
  );

  useEffect(() => {
    setValue(search.get(`${type}-skip`));
  }, [search.get(`${type}-skip`)]);

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

  if (sort === "desc" && (value === "0" || !value)) return;

  return (
    <div className="w-[40px] xs:w-[49%] sm:w-[49%] flex-1 flex justify-start">
      <form
        action={() => {
          const params = new URLSearchParams(search.toString());
          if (Number.isNaN(value)) return;
          if (value) {
            const toSet = `${
              sort === "asc" ? parseInt(value) + 1 : parseInt(value) - 1
            }`;
            params.set(`${type}-skip`, toSet);
            dispatch(
              setOffresSearch({ ...location.offres, [`${type}-skip`]: toSet })
            );
            setValue(toSet);
          } else {
            params.set(`${type}-skip`, "1");
            dispatch(
              setOffresSearch({ ...location.offres, [`${type}-skip`]: 1 })
            );
            setValue("1");
          }
          const query = params.toString();
          router.push("/offres" + "?" + query, { scroll: false });
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
