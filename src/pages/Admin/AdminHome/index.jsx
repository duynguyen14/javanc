import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminHome = () => {
  // Dữ liệu doanh thu 12 tháng
  const data = {
    labels: [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ],
    datasets: [
      {
        label: "Doanh thu (triệu VNĐ)",
        data: [5, 7.5, 6, 9, 8, 10, 9.5, 8.5, 1.1, 1.2, 1.05, 1.15],
        backgroundColor: [
          "#4F46E5", "#6366F1", "#A78BFA", "#22C55E",
          "#F59E0B", "#EF4444", "#06B6D4", "#D97706",
          "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"
        ],
        borderColor: "#4F46E5",
        borderWidth: 1,
      },
    ],
  };

  // Tùy chỉnh biểu đồ
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
        text: "Báo cáo doanh thu 12 tháng trong năm",
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
        barPercentage: 0.6, // Độ rộng cột
        categoryPercentage: 0.8, // Khoảng cách giữa các cột
      },
      y: {
        title: {
          display: true,
          text: "Doanh thu (triệu VNĐ)",
        },
        min: 0,
        max: 20, // Giá trị tối đa trên trục y
        ticks: {
          stepSize: 20, // Khoảng cách giữa các giá trị trên trục y
        },
      },
    },
  };

  // Dữ liệu hiển thị trên các thẻ thông tin
  const todayRevenue = 200000; // Đơn vị triệu VNĐ
  const newRegistrations = 2; // Số người đăng ký mới
  const activeUsers = 3; // Số người đang hoạt động

  return (
    <div className="p-6 bg-white shadow-md rounded-lg h-full">
      {/* Thẻ thông tin */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 h-[150px]">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Doanh thu hôm nay</h3>
          <p className="text-2xl font-bold">{todayRevenue} nghìn VNĐ</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Số người đăng ký mới</h3>
          <p className="text-2xl font-bold">{newRegistrations}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Số người đang hoạt động</h3>
          <p className="text-2xl font-bold">{activeUsers}</p>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default AdminHome;
