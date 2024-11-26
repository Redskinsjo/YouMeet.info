"use client";
import DetailComponent from "../DetailComponent";
import {
  SearchState,
  setPhoneFilter,
} from "@youmeet/global-config/features/search";
import { RootState } from "@youmeet/global-config/store";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function PhoneFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const phone = useSelector(
    (state: RootState) => (state.search as SearchState).phone
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
        label={t("me-profile-infos-label-phone")}
        value={
          <Checkbox
            className="text-purple500 dark:text-white checkedCheckbox dark:darkCheckedCheckbox"
            value={phone}
            checked={phone}
            onChange={(e: any) => {
              dispatch(setPhoneFilter(e.target.checked));
            }}
          />
        }
      />
    )
  );
}
