import React from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  const handleOnclickDX=()=>{
    if(window.confirm("Bạn có chắc chắn muốn đăng xuất")){
      alert("Đăng xuất thành công")
      localStorage.removeItem("user");
    }
  }
  return (
    <div className="w-full bg-gray-100 shadow-md flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold">Quản lý hệ thống</h1>
      <div className="flex items-center gap-4">
        <button className="text-gray-800 hover:text-blue-500">Cập nhật tài khoản</button>
        {
          user?(
            <button className="text-red-500 hover:text-red-700" 
            onClick={()=>handleOnclickDX()}
            >Đăng xuất</button>
          )
          :
          (
            <Link to={"/login"}>
              <button className="text-red-500 hover:text-red-700"
              >Đăng nhập</button>
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default HeaderAdmin;
