import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);
function RevenueManagement(){
const data = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [
    {
      label: "Doanh thu (triệu VNĐ)",
      data: [50, 65, 80, 70, 90, 100],
      borderColor: "#34D399",
      backgroundColor: "rgba(52, 211, 153, 0.2)",
      tension: 0.4, // Đường cong mượt
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: "Báo cáo doanh thu 6 tháng đầu năm",
      font: {
        size: 16,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Tháng",
      },
    },
    y: {
      title: {
        display: true,
        text: "Doanh thu (triệu VNĐ)",
      },
      min: 0,
      max: 120,
      ticks: {
        stepSize: 20,
      },
    },
  },
};
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueManagement;