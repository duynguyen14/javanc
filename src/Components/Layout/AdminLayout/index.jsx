import React, { useEffect } from 'react';
import HeaderAdmin from './Header'; 
import FooterAdmin from './Footer';
import Sidebar from '../../Admin1/navbarAdmin';
import { Link } from 'react-router-dom';
import { request } from '../../../utils';
const AdminLayout = ({ children }) => {
  const user=JSON.parse(localStorage.getItem("user"));
  // useEffect(()=>{
  //   const fetch=async()=>{
  //     try{
  //       const response=await request.get("");
  //       console.log(response.data);
  //     }
  //     catch(e){
  //       console.log("Lỗi ",e)
  //     }
  //   }
  //   fetch()
  // },[])
  return (
    <div>
      {/* <header className="bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold"></div>
      </header> */}
      <HeaderAdmin/>
      {
        user?(
        <div className='flex'>
          <div className='basis-[20%]'>
            <Sidebar/>
          </div>
            <div className='basis-[80%]'>
              {children}
            </div> 
        </div>
        )
        :(
          <div className='flex justify-center items-center h-[500px] font-Montserrat'>
            <p className='text-2xl'>
              Bạn chưa đăng nhập vui lòng <span>
                <Link className='text-primary' to={"/login"}>
                  đăng nhập
                </Link>
              </span>
            </p>
          </div>

        )
      }
      <FooterAdmin/>
      {/* <footer className="bg-gray-800 text-white p-4 text-center">
      </footer> */}
    </div>
  );
};

export default AdminLayout;
