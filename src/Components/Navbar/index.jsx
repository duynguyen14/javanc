import React from "react";
import { Link } from "react-router-dom";
const VerticalNav = () => {
  return (
    <div className="w-64 h-screen bg-white text-black flex flex-col font-Montserrat">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Danh Mục
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4 font-medium">
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách kinh tế
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách chuyên ngành
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách giáo trình khoa học
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách thiếu nhi
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách ngoại ngữ
            </Link>
          </li><li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách phát triển bản thân
            </Link>
          </li>
        </ul>
      </nav>
      <div className="">
        
      </div>
    </div>
  );
};

export default VerticalNav;
