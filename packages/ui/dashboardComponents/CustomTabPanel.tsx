"use client";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { GlobalState } from "@youmeet/global-config/features/global";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
}

export default function CustomTabPanel(props: TabPanelProps) {
  const tab = useSelector(
    (state: RootState) => (state.global as GlobalState).tab
  );
  const { children, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tab === index && <div className="p-[24px]">{children}</div>}
    </div>
  );
}
