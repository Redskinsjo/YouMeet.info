"use client";
import GenericField from "../formComponents/fields/GenericField";
import {
  SearchState,
  setSearchInput,
} from "@youmeet/global-config/features/search";
import { RootState } from "@youmeet/global-config/store";
import { purple } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

export default function SearchComponentField() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const search = useSelector(
    (state: RootState) => (state.search as SearchState).search
  );
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <GenericField
        type="text"
        name="search"
        location="search"
        label={t("search-by-name-job")}
        value={search}
        onChange={(value) => {
          dispatch(setSearchInput(value));
        }}
        border={`1px solid ${purple[500]}`}
        genericClasses="w-[50vw] xs:w-screen sm:w-screen md:w-screen"
        basic
      />
    )
  );
}
