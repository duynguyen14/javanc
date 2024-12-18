import React from 'react';
import HeaderAdmin from './Header'; 
import FooterAdmin from './Footer';
import Sidebar from '../../Admin1/navbarAdmin';
const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* <header className="bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold"></div>
      </header> */}
      <HeaderAdmin/>
      <div className='flex'>
        <div className='basis-[20%]'>
          <Sidebar/>
        </div>
        <div className='basis-[80%]'>
          {children}
        </div>
      </div>
      <FooterAdmin/>
      {/* <footer className="bg-gray-800 text-white p-4 text-center">
      </footer> */}
    </div>
  );
};

export default AdminLayout;
