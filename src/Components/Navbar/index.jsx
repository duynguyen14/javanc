import React from "react";
import { Link } from "react-router-dom";
const VerticalNav = () => {
  const categorys=[
    {name:" Sách khoa học và kĩ thuật", link:1},
    {name:" Sách khoa học tự nhiên và xã hội", link:2},
    {name:" Sách mỹ thuật kiến trúc", link:3},
    {name:" Sách sách tham khảo", link:4},
    {name:" Sách marketing-bán hàng", link:5},
    {name:" Sách tài chính tiền tệ", link:6},
    {name:" Sách nhân sự việc làm", link:7},
    {name:" Sách mỹ thuật, âm nhạc", link:8},
    {name:" Truyện tranh", link:9},
    {name:" Sách ngoại ngữ", link:10},
    {name:" Sách tin học", link:11},
    {name:" Sách học làm người", link:12},
    {name:" Sách danh nhân", link:13},
    {name:" Sách tâm lý và kĩ năng sống", link:14},
  ]
  return (
    <div className="w-64 h-full bg-white text-black flex flex-col font-Montserrat">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Thể loại sách
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4 font-medium">
          {
            categorys.map((item,index)=>{
              return(
                <li key={index}>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
              to={`/category/${item.link}`}
            >
              {item.name}
            </Link>
          </li>
              )
            })
          }
          {/* <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách Khoa học và kĩ thuật
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách Khoa học tự nhiên và xã hội
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách Mỹ thuật kiến trúc
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách tham khảo
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách Marketing-bán hàng
            </Link>
          </li>
          <li>
            <Link
              className="block px-1 py-2 rounded hover:text-primary transition-all duration-300  hover:bg-gray-100"
            >
              Sách Tài chính tiền tệ
            </Link>
          </li> */}
        </ul>
      </nav>
      <div className="">
        
      </div>
    </div>
  );
};

export default VerticalNav;
