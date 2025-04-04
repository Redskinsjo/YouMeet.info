import React from "react";
import { BetaUser, ProfileView } from "@youmeet/gql/generated";
import DetailComponent from "../DetailComponent";
import { useTranslation } from "react-i18next";
import {
  getDatesBetween,
  getStockFromViews,
} from "@youmeet/utils/basics/getDatesBetween";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProfileViewsChartProps {
  viewsData: { date: string; views: number }[];
  profil: BetaUser;
}

export type AreaProps = {
  profil: BetaUser;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const monthsMapping = {
  "0": "january",
  "1": "february",
  "2": "march",
  "3": "april",
  "4": "may",
  "5": "june",
  "6": "july",
  "7": "august",
  "8": "september",
  "9": "october",
  "10": "november",
  "11": "december",
};

const ProfileViewsComponent: React.FC<ProfileViewsChartProps> = ({
  viewsData,
  profil,
}) => {
  const today = new Date();
  const startDate = new Date(today.getTime() - 2 * 30 * 24 * 3600 * 1000);
  const { t } = useTranslation();

  const dates = getDatesBetween(startDate, today);

  const res = getStockFromViews(
    dates,
    (profil.profileViews as ProfileView[]) || []
  );

  const views = res.map((item) => item.views).concat([10]); // Ajout de 0 pour le dernier jour

  const labels = res.map((item) => {
    const d = new Date(item.date);
    const day = d.getDate();
    const month = t((monthsMapping as any)[d.getMonth()]); // Les mois commencent à 0
    return `${day} ${month}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: t("profile-views-count"),
        data: views,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4, // Rend la ligne plus lisse
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("profile-views-evolution"),
      },
    },
  };

  return (
    <DetailComponent
      type="modal2"
      noLabelColon
      noPadding
      conversation
      labelNoWrap
      account
      label={
        <h3 className="font-light subItem my-0 text-grey700 dark:text-grey300">
          {t("profile-views")}
        </h3>
      }
      value={<Line data={data} options={options} />}
    />
  );
};

export default ProfileViewsComponent;
