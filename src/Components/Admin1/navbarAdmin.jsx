import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full bg-gray-800 h-screen text-white flex flex-col">
      <h2 className="text-2xl font-bold text-center py-4">Admin Dashboard</h2>
      <nav className="flex flex-col gap-4 px-4">
        <Link to="/admin/home" className="hover:bg-gray-700 px-4 py-2 rounded">
          Quản lý doanh thu
        </Link>
        <Link to="/admin/users" className="hover:bg-gray-700 px-4 py-2 rounded">
          Quản lý người dùng
        </Link>
        <Link to="/admin/product" className="hover:bg-gray-700 px-4 py-2 rounded">
          Quản lý sản phẩm
        </Link>
        <Link to="/admin/bills" className="hover:bg-gray-700 px-4 py-2 rounded">
          Quản lý đơn hàng
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
