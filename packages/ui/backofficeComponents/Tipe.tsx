"use client";
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
type tipeDataType = {
  temperature: { main: number; cores: number[]; max: number };
  createdAt: Date;
  updatedAt: Date;
};

export default function Tipe({ tipeData }: { tipeData: any[] }) {
  if (tipeData.length === 0) return <div>No data available</div>;
  const temps = (tipeData as tipeDataType[]).map((doc) => doc.temperature.main);

  const t0 = new Date((tipeData as tipeDataType[])[0].createdAt).getTime();

  const labels = (tipeData as tipeDataType[]).map((doc) => {
    const d = new Date(doc.createdAt);
    const ms = d.getTime() - t0;

    return `${ms / 1000} s`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.1, // Rend la ligne plus lisse
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
        text: "Evolution de la température du CPU pour un algorithme de complexité quadratique",
      },
    },
  };
  return <Line data={data} options={options} />;
}
