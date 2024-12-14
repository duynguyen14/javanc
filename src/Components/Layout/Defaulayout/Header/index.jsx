import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../../../Search";
function Header() {
  const titles_1 = [
    { title: "Sách kinh tế", link: "/" },
    { title: "Sách chuyên ngành", link: "/" },
    { title: "Sách giáo trình khoa học", link: "/" },
    { title: "Sách thiếu nhi", link: "/" },
    { title: "Sách ngoại ngữ", link: "/game" },
    { title: "Sách phát triển bản thân", link: "/about" },
  ];
  const titles_2 = [
    { title: "Giỏ hàng", link: "/cartshopping" },
    { title: "Tài khoản của tôi", link: "/" },
    { title: "Đăng xuất", link: "/" },
  ];
  const [ismenu, setIsmenu] = useState(false);
  return (
    <div>
      {/*upper navbar */}
      <div className="flex justify-between items-center px-6 py-3 lg:px-16 xl:px-32 relative">
        {/*Menu  */}
        <div className="block lg:hidden text-2xl font-bold text-primary ">
          <IoMenu onClick={() => setIsmenu(!ismenu)} />
        </div>
        {/*logo */}
        <div className="">
          <Link
            to="/"
            className="text-primary text-xl font-bold font-Montserrat"
          >
            Bookstore
          </Link>
        </div>
        <div className="hidden md:block lg:w-[40%]">
            <SearchInput/>
        </div>
        {/*contact and user */}
        <div className="flex justify-between items-center gap-x-4">
          {/* button sale */}
          {/* button sale */}
          <div className="">
            <button
              className="text-md font-Montserrat text-white 
                        font-bold cursor-pointer py-1 px-3 bg-gradient-to-r from-primary to-yellow-200
                        rounded-md hover:text-red-500
                        "
            >
              <Link to={"/saleproduct"}>Sale</Link>
            </button>
          </div>
          {/*other button */}
          <div className="hidden lg:flex justify-between items-center gap-x-5 xl:gap-x-10">
            <li className="flex justify-between items-center gap-x-2">
              <FaPhone className="text-yellow-600" />{" "}
              <p className="text-primary font-bold cursor-pointer hover:text-yellow-600">
                0123456789
              </p>
            </li>
            <li className="flex justify-between items-center gap-x-2">
              <IoTimeSharp className="text-yellow-600" />{" "}
              <p className="text-primary font-bold cursor-pointer hover:text-yellow-600">
                8:30-18:30
              </p>
            </li>
            <li className="list-none text-xl font-bold hover:text-primary relative group text-center">
              {/* <Link to={UserStatus ? "/profile" : "/login"}> */}
                <FaUser className=" text-center" />
                <div className="absolute text-xs whitespace-nowrap hidden group-hover:block cursor-pointer text-center w-full py-1">
                </div>
              {/* </Link> */}
            </li>
            <li className="list-none text-xl font-bold hover:text-primary relative group text-center">
              <Link to="/cartshopping">
                <FaShoppingCart className="w-full text-center" />
                <p className="absolute text-xs whitespace-nowrap hidden group-hover:block cursor-pointer text-center w-full py-1">
                  Giỏ hàng
                </p>
              </Link>
            </li>
          </div>
        </div>
      </div>
      {/*lower navbar */}
      <div className="bg-test1 py-2 text-center justify-center">
        <ul className="hidden text-center items-center gap-x-20  text-white font-Montserrat justify-center lg:flex">
          {titles_1.map((title_1, index) => {
            return (
              <li key={index} className="hover:text-yellow-300 transition-all duration-500">
                <Link to={title_1.link}>{title_1.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      {
        <div
          className={`absolute block justify-around items-start w-full 
                    transition-all transform duration-500 ease-in-out
                    h-auto bg-gray-50 top-[45px] ${
                      ismenu
                        ? " opacity-100  translate-x-0"
                        : " opacity-0 translate-x-full"
                    } lg:hidden z-10`}
        >
          <ul className="font-Montserrat font-semibold py-2 text-xs text-red-500 hover:bg-gray-50 w-full text-center uppercase border-b-slate-200 md:text-xl">
            <p className="decoration-red-500">Sản phẩm</p>
            {titles_1.map((title_1, index) => {
              return (
                <li
                  key={index}
                  className=" font-Montserrat font-semibold text-center uppercase text-gray-500 hover:text-white hover:bg-primary/50 py-2 transition-all duration-500 ease-in-out md:text-lg md:py-5"
                  onClick={() => setIsmenu(!ismenu)}
                >
                  <Link to={title_1.link}>{title_1.title}</Link>
                </li>
              );
            })}
          </ul>
          <ul className="font-Montserrat font-semibold py-2 text-xs text-red-500 hover:bg-gray-50 w-full text-center uppercase md:text-xl">
            Tài Khoản
            {titles_2.map((title_2, index) => {
              return (
                <li
                  key={index}
                  className=" font-Montserrat font-semibold text-center uppercase text-gray-500 hover:text-white hover:bg-primary/50 py-2 transition-all duration-500 ease-in-out md:text-lg md:py-5"
                  onClick={() => setIsmenu(!ismenu)}
                >
                  <Link to={title_2.link}>{title_2.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </div>
  );
}

export default Header;
