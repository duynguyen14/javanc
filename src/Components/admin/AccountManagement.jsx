import React, { useState } from 'react';
import { 
  Shield, 
  Edit, 
  Trash2, 
  PlusCircle, 
  Search 
} from 'lucide-react';

const AccountManagement = () => {
  // mmock data
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      userId: 1,
      username: 'nguyenvana',
      role: 'ADMIN',
      status: 'Hoạt Động',
      createdAt: '2024-01-15',
      lastLogin: '2024-06-20'
    },
    {
      id: 2,
      userId: 2,
      username: 'tranthib',
      role: 'USER',
      status: 'Hoạt Động',
      createdAt: '2024-02-20',
      lastLogin: '2024-06-18'
    }
  ]);

  const roles = ['USER', 'ADMIN', 'MANAGER'];

  // State quản lý modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // mở modal thêm tài khoản
  const handleAddAccount = () => {
    setCurrentAccount(null);
    setIsModalOpen(true);
  };

  // mở modal sửa tài khoản
  const handleEditAccount = (account) => {
    setCurrentAccount(account);
    setIsModalOpen(true);
  };

  //xóa tài khoản
  const handleDeleteAccount = (accountId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setAccounts(accounts.filter(account => account.id !== accountId));
    }
  };

  // lưu tài khoản
  const handleSaveAccount = (accountData) => {
    if (currentAccount) {
      // edit tt khoản
      setAccounts(accounts.map(account => 
        account.id === currentAccount.id 
          ? { ...account, ...accountData } 
          : account
      ));
    } else {
      // addadd mới
      const newAccount = {
        ...accountData,
        id: accounts.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'Hoạt Động'
      };
      setAccounts([...accounts, newAccount]);
    }
    setIsModalOpen(false);
  };

  // mmodal thêm sửa tài khoản
  const AccountModal = () => {
    const [formData, setFormData] = useState(currentAccount || {
      userId: '',
      username: '',
      role: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">
            {currentAccount ? 'Chỉnh Sửa Tài Khoản' : 'Thêm Tài Khoản Mới'}
          </h2>
          <div className="space-y-4">
            <input
              type="number"
              name="userId"
              placeholder="ID Người Dùng"
              value={formData.userId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Tên Đăng Nhập"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn Vai Trò</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Hủy
            </button>
            <button 
              onClick={() => handleSaveAccount(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
  };

  // lọc tài khoản theo từ khóa tìm kiếm
  const filteredAccounts = accounts.filter(account => 
    account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.userId.toString().includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input 
            type="text" 
            placeholder="Tìm kiếm tài khoản..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded"
          />
          <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>
        <button 
          onClick={handleAddAccount}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <PlusCircle className="mr-2" /> Thêm Tài Khoản
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID Người Dùng</th>
              <th className="p-3 text-left">Tên Đăng Nhập</th>
              <th className="p-3 text-left">Vai Trò</th>
              <th className="p-3 text-left">Trạng Thái</th>
              <th className="p-3 text-left">Ngày Tạo</th>
              <th className="p-3 text-left">Đăng Nhập Gần Nhất</th>
              <th className="p-3 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{account.userId}</td>
                <td className="p-3">{account.username}</td>
                <td className="p-3">
                  <span 
                    className={`
                      px-2 py-1 rounded text-sm 
                      ${account.role === 'ADMIN' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                      }
                    `}
                  >
                    {account.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    {account.status}
                  </span>
                </td>
                <td className="p-3">{account.createdAt}</td>
                <td className="p-3">{account.lastLogin}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditAccount(account)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Chỉnh sửa"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteAccount(account.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị Modal nếu isModalOpen là true */}
      {isModalOpen && <AccountModal />}
    </div>
  );
};

export default AccountManagement;