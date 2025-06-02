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
  console.log("Tipe data:", tipeData);
  const temps = (tipeData as tipeDataType[]).map((doc) => doc.temperature.main);

  console.log(
    "(tipeData as tipeDataType[])[0].createdAt:",
    (tipeData as tipeDataType[])[0].createdAt
  );
  const t0 = new Date((tipeData as tipeDataType[])[0].createdAt).getTime();

  console.log("T0:", t0);

  const labels = (tipeData as tipeDataType[]).map((doc) => {
    const d = new Date(doc.createdAt);
    const ms = d.getTime() - t0;

    console.log("Label time:", ms);

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
        text: "Evolution de la température du CPU pour un algorithme de complexité linéaire",
      },
    },
  };
  return <Line data={data} options={options} />;
}
