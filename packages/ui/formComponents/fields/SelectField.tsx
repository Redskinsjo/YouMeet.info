"use client";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import GenericField from "./GenericField";
import {
  Exact,
  GetCompaniesDocument,
  GetCompetenciesDocument,
  GetJobsDocument,
  GetOneCompanyDocument,
  GetOneCompetencyDocument,
  GetOneJobDocument,
  GetOneTopSectorDocument,
  GetTopSectorsDocument,
} from "@youmeet/gql/generated";
import { client } from "@youmeet/gql/index";
import { TypedDocumentNode } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { blue } from "@mui/material/colors";
import TooltipedAsset from "../../TooltipedAsset";
import {
  Queries,
  QueriesDocuments,
  QueriesResponses,
  SelectFieldProps,
} from "@youmeet/types/form/fields/SelectFieldProps";
import { IoClose } from "react-icons/io5";
import { FormState } from "@youmeet/global-config/features/form";
import phoneCodes from "@youmeet/raw-data/phoneCodes.json";
import { PhoneCodes } from "@youmeet/types/form/fields/PhoneCodes";
import { UnknownAction } from "@reduxjs/toolkit";
import { setError } from "@youmeet/global-config/features/global";

const filter = createFilterOptions<string>();

const renderOption = (
  name: string,
  option: any,
  language: string | undefined,
  inputValue?: string
) => {
  if (option) {
    if (name === "phonecode") return option.name + " " + option.dial_code;
    if (name === "requirements") {
      return option.title[0].toUpperCase() + option.title.slice(1);
    }
    if (name === "job" || name === "sector") {
      if (!language)
        return option.title.fr.toLowerCase().includes(inputValue)
          ? option.title.fr
          : option.title.en;
      return option.title[language as "fr" | "en"];
    }
    if (name === "company") {
      return option.name;
    }
  }
  return "";
};

const names: {
  [name: string]: {
    [key in "multiple" | "single"]: {
      request: TypedDocumentNode<Queries, Exact<{ [key: string]: never }>>;
      response: QueriesResponses;
    };
  };
} = {
  requirements: {
    multiple: {
      request: GetCompetenciesDocument,
      response: "competencies",
    },
    single: {
      request: GetOneCompetencyDocument,
      response: "oneCompetency",
    },
  },
  sector: {
    multiple: {
      request: GetTopSectorsDocument,
      response: "topSectors",
    },
    single: {
      request: GetOneTopSectorDocument,
      response: "oneTopSector",
    },
  },
  job: {
    multiple: { request: GetJobsDocument, response: "jobs" },
    single: { request: GetOneJobDocument, response: "oneJob" },
  },
  company: {
    multiple: {
      request: GetCompaniesDocument,
      response: "companies",
    },
    single: { request: GetOneCompanyDocument, response: "oneCompany" },
  },
};

const SelectField = ({
  setValue,
  required,
  label,
  errors,
  placeholder,
  name,
  clearErrors,
  onChange,
  multiple,
  tags = 3,
  value,
  watch,
  location,
  type,
}: SelectFieldProps) => {
  const step = useSelector(
    (state: RootState) => (state.form as FormState).profileStep
  );
  const [data, setData] = useState<QueriesDocuments | PhoneCodes[]>([]);
  const dispatch = useDispatch();
  const [added, setAdded] = useState<string[] | undefined>([]);
  const {
    i18n: { language },
  } = useTranslation();
  const [idValue, setIdValue] = useState<any | { input: true; name: string }>(
    multiple ? [] : ""
  );

  const groupParams = {} as {
    groupBy?: (option: any) => string;
    renderGroup?: (params: any) => ReactElement;
  };
  if (name === "company") {
    groupParams.groupBy = (option) => option.location as string;
    groupParams.renderGroup = (params) => {
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
    };
  }

  const fetchData = useCallback(
    async (value: string) => {
      const variables = {} as any;

      if (name === "phonecode") return setData(phoneCodes);
      if (name === "job") {
        variables.data = { title: value };
      }
      if (name === "company") {
        variables.first = { take: 50 };
        variables.filters = { name: value };
      }
      try {
        const response = await client.query({
          query: names[name].multiple.request,
          variables,
        });
        const resData = response.data[names[name].multiple.response];
        if (resData) setData(resData as QueriesDocuments);
      } catch (e) {
        dispatch(setError("not-completed") as UnknownAction);
      }
    },
    [name]
  );

  // récupère la ou les options sélectionnées
  const fetchIdValues = useCallback(
    async (clicked?: string) => {
      const variables = {} as any;
      if (clicked) {
        variables.id = clicked;
      } else {
        if ((value as any)?.input) {
          return setIdValue(value as any);
        }

        if (value && multiple) variables.data = { in: value as never } as never;
        else if (value) variables.id = value as never;
        else if (added && typeof added === "string")
          variables.id = added as never;
      }
      if (name === "phonecode") return phoneCodes.find((c) => c.code === value);

      const response = await client.query({
        query: names[name][multiple ? "multiple" : "single"].request,
        variables,
      });
      const resData =
        response.data[names[name][multiple ? "multiple" : "single"].response];
      if (resData) setIdValue(resData as QueriesDocuments);
    },
    [value, added]
  );

  // récupère les options possibles et sélectionnées dès que la valeur en input, ou le secteur adjoint se modifie
  useEffect(() => {
    // fetchData();
    fetchIdValues();
  }, [value, added]);

  // met à jour la valeur du champ (Generic)
  useEffect(() => {
    if (watch && watch(location)) {
      setAdded(watch(location));
    }
  }, [watch ? watch(location) : undefined]);

  return (
    <div className="xs:fadeIn sm:fadeIn flex flex-col w-full min-w-[255px] xs:min-w-[125px] sm:min-w-[125px] md:min-w-[125px]">
      <Autocomplete
        isOptionEqualToValue={(option, value) => {
          if (name === "company" && value?.input) {
            return option.name.toLowerCase() === value?.name.toLowerCase();
          }
          return option.id === value.id;
        }}
        multiple={multiple}
        value={idValue}
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        onChange={async (event, value: any) => {
          if (clearErrors) clearErrors();
          if (value && value.inputValue && setValue) {
            // Create a new value from the user input
            setAdded({
              input: true,
              name: value.inputValue,
            } as any);
            setValue(location, {
              input: true,
              name: value.inputValue,
            });
            return;
          }
          const addedValues = multiple ? value.map((v: any) => v.id) : value.id;
          if (addedValues !== undefined) {
            if (setValue) {
              setAdded(addedValues);
              setValue(location, addedValues);
            }
            if (onChange) {
              setAdded(addedValues);
              onChange(addedValues);
            }
          }
        }}
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "initial",
        }}
        slotProps={{
          chip: {
            className: "dark:darkBg dark:text-white z-50",
            deleteIcon: (
              <IoClose className="dark:text-white dark:bg-grey200 rounded-full" />
            ),
          },
        }}
        limitTags={tags}
        disableCloseOnSelect={multiple}
        disableClearable
        filterOptions={(options, params) => {
          const filtered = filter(options, params) as any;

          if (name === "company") {
            const { inputValue } = params;
            const isExisting = options.some((option) =>
              renderOption(name, option, undefined, inputValue)
                .toLowerCase()
                .includes(inputValue)
            );

            if (inputValue !== "" && !isExisting) {
              options.push({
                inputValue,
                name: `Ajouter "${inputValue}"`,
              });
            }
          }
          return [...new Set(filtered)];
        }}
        renderOption={(props, option) => {
          return !option?.inputValue ? (
            <TooltipedAsset
              asset={renderOption(
                name,
                option,
                language === "fr" ? "en" : "fr"
              )}
              placement="right-end"
              key={option.id}
            >
              <li
                className="darkLi hover:bg-grey100 flex items-center cursor-pointer min-h-[48px] text-[16px] px-[12px] flex-bet"
                onClick={() => {
                  const addedValues =
                    name === "phonecode" ? option.code : option.id;
                  setAdded(
                    multiple && added ? [...added, addedValues] : addedValues
                  );
                  if (multiple) {
                    if (watch && setValue)
                      setValue(location, [...value, addedValues]);
                  } else {
                    if (setValue) {
                      if (name === "job" && option.topSector)
                        setValue("sector", option.topSector.id);
                      setValue(location, addedValues);
                    }
                  }
                }}
              >
                {renderOption(name, option, language)}
              </li>
            </TooltipedAsset>
          ) : (
            <li
              className="darkLi"
              style={{
                fontSize: 16,
                minHeight: 48,
              }}
              key={option.id}
            >
              {option.name}
            </li>
          );
        }}
        {...groupParams}
        popupIcon={<></>}
        className="dark:caret-white dark:bg-black"
        options={data}
        getOptionLabel={(option) => {
          return !option?.inputValue
            ? renderOption(name, option, language)
            : option.inputValue;
        }}
        renderInput={(params) => {
          return (
            <GenericField
              step={step}
              type={type}
              location={location}
              params={params}
              errors={errors}
              label={label}
              name={name}
              required={required}
              placeholder={placeholder}
              multiple={multiple}
              watch={watch}
              setValue={setValue}
              onChange={onChange}
              fetchData={fetchData}
            />
          );
        }}
      />
    </div>
  );
};

export default SelectField;
