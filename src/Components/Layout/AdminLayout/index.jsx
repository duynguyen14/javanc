import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold"></div>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
      </footer>
    </div>
  );
};

export default AdminLayout;
