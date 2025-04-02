"use client";
import { purple } from "@mui/material/colors";
import {
  SearchState,
  setOffresSearch,
} from "@youmeet/global-config/features/search";
import { RootState } from "@youmeet/global-config/store";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const GenericField = dynamic(
  () => import("../formComponents/fields/GenericFieldChild")
);

export default function SearchFilter({ dashboard }: { dashboard?: boolean }) {
  const search = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const location = useSelector(
    (state: RootState) => state.search as SearchState
  );

  return (
    <form
      action={(formData: FormData) => {
        const value = formData.get("search") as string;
        const params = new URLSearchParams(search.toString());
        if (!value) {
          params.delete("s");
          dispatch(setOffresSearch({ ...location.offres, search: "" }));
        } else {
          params.set("s", value);
          dispatch(setOffresSearch({ ...location.offres, search: value }));
        }
        const otherPrm = "all-skip";
        params.delete(otherPrm);
        const query = params.toString();
        if (dashboard) router.push("/dashboard" + "?" + query);
        else router.push("/offres" + "?" + query);
      }}
      className="flex flex-1 items-start justify-center gap-[12px] relative"
    >
      <GenericField
        type="text"
        name="search"
        location="search"
        placeholder="search-by-job"
        label={"search"}
        border={`1px solid ${purple[500]}`}
        genericClasses="xs:w-screen sm:w-screen md:w-screen"
      />
    </form>
  );
}
