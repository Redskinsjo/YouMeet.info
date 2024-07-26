"use client";
import DetailComponent from "@youmeet/components/DetailComponent";
import {
  SearchState,
  setLinkedinFilter,
} from "@youmeet/global-config/features/search";
import { RootState } from "@youmeet/global-config/store";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

export default function LinkedinFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const linkedin = useSelector(
    (state: RootState) => (state.search as SearchState).linkedin
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    !loading && (
      <DetailComponent
        name="filter"
        noPadding
        noLabelColon
        newClasses="rounded-[7px]"
        type="modal"
        newStyles={{ padding: "2px 8px" }}
        label={t("linkedin")}
        value={
          <Checkbox
            className="text-purple500 dark:text-white checkedCheckbox dark:darkCheckedCheckbox"
            value={linkedin}
            checked={linkedin}
            onChange={(e: any) => {
              dispatch(setLinkedinFilter(e.target.checked));
            }}
          />
        }
      />
    )
  );
}
