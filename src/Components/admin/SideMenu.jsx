import { Home, LogOut, Key } from 'lucide-react';
import { Users, Settings, BookOpen, ShoppingBag, CreditCard, BarChart2 } from 'lucide-react';

const SideMenu = ({ activeMenu, setActiveMenu, adminName, onLogout }) => {
  const menuItems = [
    { key: 'users', icon: <Users />, label: 'Quản Lý Người Dùng' },
    { key: 'accounts', icon: <Settings />, label: 'Quản Lý Tài Khoản' },
    { key: 'categories', icon: <BookOpen />, label: 'Quản Lý Danh Mục' },
    { key: 'products', icon: <ShoppingBag />, label: 'Quản Lý Sản Phẩm' },
    { key: 'bills', icon: <CreditCard />, label: 'Quản Lý Hóa Đơn' },
    { key: 'revenue', icon: <BarChart2 />, label: 'Quản Lý Doanh Thu' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 p-4">
      <div className="text-xl font-semibold mb-6 text-center">
        Xin chào, {adminName || 'Admin'}
      </div>
      {menuItems.map(item => (
        <div
          key={item.key}
          onClick={() => setActiveMenu(item.key)}
          className={`flex items-center p-3 mb-2 cursor-pointer rounded ${
            activeMenu === item.key ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
          }`}
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </div>
      ))}
 
      <div
        onClick={() => setActiveMenu('change-password')}
        className="flex items-center p-3 mb-2 cursor-pointer rounded hover:bg-gray-700"
      >
        <Key />
        <span className="ml-3">Đổi Mật Khẩu</span>
      </div>
     
      <div
        onClick={onLogout}
        className="flex items-center p-3 cursor-pointer rounded hover:bg-gray-700"
      >
        <LogOut />
        <span className="ml-3">Đăng Xuất</span>
      </div>
    </div>
  );
};

export default SideMenu;
