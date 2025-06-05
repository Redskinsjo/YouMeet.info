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
  amplitude: number;
  frequency: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function Tipe({ tipeData }: { tipeData: any[] }) {
  if (tipeData.length === 0) return <div>No data available</div>;

  const temps = (tipeData as tipeDataType[]).map((doc) => doc.amplitude);

  const t0 = new Date((tipeData as tipeDataType[])[0].frequency);

  const labels = (tipeData as tipeDataType[]).map((doc) => {
    return `${doc.frequency} Hz`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Amplitude",
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
        text: "Transformée de Fourier (FFT) des températures",
      },
    },
  };
  return <Line data={data} options={options} />;
}
