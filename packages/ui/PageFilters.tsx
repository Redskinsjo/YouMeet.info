"use client";
import { purple } from "@mui/material/colors";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GenericField = dynamic(
  () => import("./formulaire-profil/formComponents/fields/GenericFieldChild")
);

export default function PageFilters() {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="w-full flex-center items-start xs:flex-col sm:flex-col md:flex-col p-[8px] box-border border-[0.5px] border-solid border-grey500 bg-white dark:lightDarkBg">
      <div className="w-full max-h-[95px] z-50 relative box-border">
        <form
          action={(formData: FormData) => {
            const value = formData.get("search") as string;
            const params = new URLSearchParams(search.toString());
            params.set("s", value);
            const query = params.toString();
            router.push(pathname + "?" + query);
          }}
          className="flex items-start justify-center gap-[12px] relative"
        >
          <GenericField
            type="text"
            name="search"
            location="search"
            label={"search-by-job"}
            border={`1px solid ${purple[500]}`}
            genericClasses="w-[50vw] xs:w-screen sm:w-screen md:w-screen"
          />
        </form>
      </div>
    </div>
  );
}
