"use client";
import DetailComponent from "@youmeet/components/DetailComponent";
import {
  SearchState,
  setVideoFilter,
} from "@youmeet/global-config/features/search";
import { RootState } from "@youmeet/global-config/store";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

export default function VideoFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const video = useSelector(
    (state: RootState) => (state.search as SearchState).video
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
        label={t("video")}
        value={
          <Checkbox
            className="text-purple500 dark:text-white checkedCheckbox dark:darkCheckedCheckbox"
            value={video}
            checked={video}
            onChange={(e: any) => {
              dispatch(setVideoFilter(e.target.checked));
            }}
          />
        }
      />
    )
  );
}
