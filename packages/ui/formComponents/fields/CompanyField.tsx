"use client";
/* eslint-disable react/prop-types */
import { BetaCompany, GetCompaniesDocument } from "@youmeet/gql/generated";
import { TextField, useMediaQuery } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import id from "uid2";
import { CompanyFieldProps } from "@youmeet/types/form/fields";
import { client } from "@youmeet/gql/index";
import { blue, purple } from "@mui/material/colors";

const filter = createFilterOptions<string>();

const CompanyField = ({
  name,
  location,
  watch,
  setValue,
  clearErrors,
}: CompanyFieldProps) => {
  const [fieldVal, setFieldVal] = useState<string>("");
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width: 600px)");
  const sm = useMediaQuery("(max-width: 720px)");
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const [companies, setCompanies] = useState<
    (BetaCompany | null | undefined)[]
  >([]);

  const fetchCompanies = async (value: string | null = "") => {
    const response = await client.query({
      query: GetCompaniesDocument,
      variables: {
        filters: { name: value || undefined },
        first: { take: 50 },
      },
    });
    const comps = response.data?.companies as BetaCompany[];
    if (comps) setCompanies(comps);
  };

  useEffect(() => {
    if (watch(name)) {
      setFieldVal(watch(name));
    }
  }, [watch(name)]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Autocomplete
      className="col-start-2 w-full"
      sx={{ width: "100%" }}
      value={fieldVal}
      filterOptions={(options, params) => {
        const filtered = filter(options, params) as any;

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.name);

        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Ajouter "${inputValue}"`,
          });
        }

        return [...new Set(filtered)];
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={companies ? (companies?.filter((c) => c) as BetaCompany[]) : []}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if ((option as any).inputValue) {
          return (option as any).inputValue;
        }
        return option.name;
      }}
      renderOption={(props: any, option: any) => {
        const key = id(4);
        return (
          <li
            className="darkLi"
            style={{
              fontSize: 16,
              minHeight: 48,
            }}
            key={option + key}
          >
            {option?.name ?? option}
          </li>
        );
      }}
      freeSolo
      onChange={(event, newValue, reason) => {
        clearErrors();

        if (typeof newValue === "string") {
          setValue(location, {
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue(location, {
            input: true,
            name: newValue.inputValue,
          });
        } else {
          setValue(location, newValue);
        }
      }}
      groupBy={(option) => option.location}
      renderGroup={(params) => {
        return (
          <div key={params.key}>
            <div style={{ padding: "12px", background: blue[50] }}>
              {params.group
                ? params.group[0].toUpperCase() + params.group.slice(1)
                : ""}
            </div>
            <div>{params.children}</div>
          </div>
        );
      }}
      renderInput={(params) => (
        <TextField
          sx={{
            "& fieldset": {
              border: "1px solid !important",
              borderColor: purple[500] + " !important",
            },
          }}
          {...params}
          onChange={(e) => {
            if (timer) clearTimeout(timer);

            const timerId = setTimeout(() => {
              fetchCompanies(e.target.value as string | null);

              setTimer(undefined);
            }, 500);

            setTimer(timerId);
          }}
          required
          label={t("me-profile-infos-label-company")}
          className="col-span-2"
          placeholder={t("what-company")}
          InputLabelProps={{
            className: "subItem",
            sx: {
              "&.Mui-focused": {
                transform:
                  xs || sm
                    ? "translate(14px,-9px) scale(0.75)"
                    : "translate(14px,-9px) scale(1)",
              },
              "&:not(.Mui-focused)": {
                transform:
                  xs || sm
                    ? "translate(9px,2px) scale(0.75)"
                    : "translate(9px,2px) scale(1)",
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            className: "subItem h-[60px]",
          }}
        />
      )}
    />
  );
};

export default CompanyField;
