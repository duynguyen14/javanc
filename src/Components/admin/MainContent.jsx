import React from 'react';
import UserManagement from './UserManagement';
import AccountManagement from './AccountManagement';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';
import BillManagement from './BillManagement';
import RevenueManagement from './RevenueManagement';

const MainContent = ({ activeMenu }) => {
  const renderContent = () => {
    switch (activeMenu) {
      case 'users': return <UserManagement />;
      case 'accounts': return <AccountManagement />;
      case 'categories': return <CategoryManagement />;
      case 'products': return <ProductManagement />;
      case 'bills': return <BillManagement />;
      case 'revenue': return <RevenueManagement />;
      default: return <UserManagement />;
    }
  };

  return (
    <div className="flex">
    <div 
      className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen"
      style={{ width: '100%', height: '600px', overflow: 'auto' }}
    >
      {renderContent()}
    </div>
  </div>
  
  );
};

export default MainContent;
