"use client";
import { blue, grey, purple } from "@mui/material/colors";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import regions_departements from "@youmeet/raw-data/regions_departements.json";
import { ReactElement, useState } from "react";

const GenericField = dynamic(
  () =>
    import("../../formulaire-profil/formComponents/fields/GenericFieldChild")
);

type Department = { region: string; name: string; code: string };
type RegionList = Department[];
const filter = createFilterOptions<Department>();

const list = Object.entries(regions_departements).reduce(
  (acc, [key, value]) => {
    const list = value.map((v) => ({ ...v, region: key }));
    const concatenated = acc.concat(list);
    return concatenated;
  },
  [] as RegionList
);

export default function LocationFilter() {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const multiple = true;
  const location = search.get("l")?.split(",") || [];
  const [value, setValue] = useState(
    location.map((l) => list.find((d) => d.code === l)) as Department[]
  );

  const onClick = (option: Department) => {
    const found = value.find((v) => v.code === option.code);
    if (found) setValue(value.filter((o) => o.code !== found.code));
    else setValue([...value, option]);
  };

  const groupParams = {} as {
    groupBy?: (option: any) => string;
    renderGroup?: (params: any) => ReactElement;
  };

  groupParams.groupBy = (option) => option.region as string;
  groupParams.renderGroup = (params) => {
    return (
      <div key={params.key}>
        <div style={{ padding: "12px", background: blue[50] }}>
          {params.group}
        </div>
        <div>{params.children}</div>
      </div>
    );
  };

  return (
    <form
      action={() => {
        const codes = value.map((v) => v.code).join(",");
        const prm = "l";
        const params = new URLSearchParams(search.toString());
        params.set(prm, codes);
        const otherPrm = "all-skip";
        params.delete(otherPrm);
        const query = params.toString();
        router.push(pathname + "?" + query);
      }}
      className="flex flex-1 items-start justify-center gap-[12px] relative"
    >
      <Autocomplete
        isOptionEqualToValue={(option, value) => {
          return option.code === value.code;
        }}
        multiple={multiple}
        value={value}
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "initial",
        }}
        limitTags={3}
        renderTags={(value: Department[], getTagProps) =>
          value.map((option, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                variant="outlined"
                label={option.name}
                key={key}
                onDelete={() => {
                  const prm = "l";
                  const params = new URLSearchParams(search.toString());
                  params.delete(prm);
                  const otherPrm = "all-skip";
                  params.delete(otherPrm);
                  const query = params.toString();
                  router.push(pathname + "?" + query);
                  setValue(value.filter((v) => v.code !== option.code));
                }}
                className={tagProps.className}
                data-tag-index={tagProps["data-tag-index"]}
                disabled={tagProps.disabled}
                tabIndex={tagProps.tabIndex}
              />
            );
          })
        }
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          return [...new Set(filtered)];
        }}
        renderOption={(props, option: Department) => {
          return (
            <li
              className="darkLi hover:bg-grey200 dark:hover:bg-grey500 flex items-center px-4 cursor-pointer"
              style={{
                fontSize: 16,
                minHeight: 44,
                background: value.find((v) => v.code === option.code)
                  ? grey[100]
                  : "white",
              }}
              key={option.code}
              onClick={() => onClick(option)}
            >
              <span>{option.code}</span>
              <span className="px-[6px]">-</span>
              <span>{option.name}</span>
            </li>
          );
        }}
        {...groupParams}
        className="dark:caret-white dark:bg-black"
        options={list}
        getOptionLabel={(option) => {
          return `${option.code} - ${option.name}`;
        }}
        renderInput={(params) => {
          return (
            <GenericField
              type="text"
              params={params}
              name="location"
              location="location"
              placeholder="department-field-placeholder"
              label={"department"}
              border={`1px solid ${purple[500]}`}
              genericClasses="xs:w-screen sm:w-screen md:w-screen"
              fetchData={async (value) => {}}
              onChange={(value) => {}}
            />
          );
        }}
      />
    </form>
  );
}