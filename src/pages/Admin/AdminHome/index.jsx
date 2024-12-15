import React, { useState } from 'react';
import AdminLayout from '../../../Components/Layout/AdminLayout/index';
import SideMenu from '../../../Components/admin/SideMenu';
import MainContent from '../../../Components/admin/MainContent';
function AdminHome() {
    const [activeMenu, setActiveMenu] = useState('users');

  return (
    <AdminLayout>
      <div className="flex">
        <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <MainContent activeMenu={activeMenu} />
      </div>
    </AdminLayout>
  );
};
export default AdminHome;