"use client";
import { purple } from "@mui/material/colors";
import { setOffresSearch } from "@youmeet/global-config/features/search";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const GenericField = dynamic(
  () =>
    import("../../formulaire-profil/formComponents/fields/GenericFieldChild")
);

export default function SearchFilter() {
  const search = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <form
      action={(formData: FormData) => {
        const value = formData.get("search") as string;
        const params = new URLSearchParams(search.toString());
        if (!value) {
          params.delete("s");
          dispatch(setOffresSearch({ search: "" }));
        } else {
          params.set("s", value);
          dispatch(setOffresSearch({ search: value }));
        }
        const otherPrm = "all-skip";
        params.delete(otherPrm);
        const query = params.toString();
        router.push("/offres" + "?" + query);
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
