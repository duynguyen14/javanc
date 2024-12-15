import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  PlusCircle, 
  Search 
} from 'lucide-react';

const UserManagement = () => {
  // Mock data for user and account tables
  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0901234567',
      address: 'Hà Nội',
      gender: 'Nam',
      dob: '1990-01-15',
      account: {
        username: 'nguyenvana',
        role: 'User'
      }
    },
    {
      id: 2,
      fullname: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0907654321',
      address: 'Hồ Chí Minh',
      gender: 'Nữ',
      dob: '1995-05-20',
      account: {
        username: 'tranthib',
        role: 'Admin'
      }
    }
  ]);

  // State for modal and search
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers for user operations
  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = (userData) => {
    const { username, role, ...userDetails } = userData;
    
    if (currentUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { 
              ...user, 
              ...userDetails,
              account: { username, role }
            } 
          : user
      ));
    } else {
      // Add new user
      const newUser = {
        ...userDetails,
        id: users.length + 1,
        account: { username, role }
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const UserModal = () => {
    const [formData, setFormData] = useState(currentUser ? {
      ...currentUser,
      username: currentUser.account.username,
      role: currentUser.account.role
    } : {
      fullname: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      dob: '',
      username: '',
      role: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">
            {currentUser ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng Mới'}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="fullname"
              placeholder="Họ và Tên"
              value={formData.fullname}
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
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Số Điện Thoại"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Địa Chỉ"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn Giới Tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            <input
              type="date"
              name="dob"
              value={formData.dob}
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
              <option value="Admin">Admin</option>
              <option value="User">User</option>
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
              onClick={() => handleSaveUser(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredUsers = users.filter(user => 
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.account.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input 
            type="text" 
            placeholder="Tìm kiếm người dùng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded"
          />
          <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>
        <button 
          onClick={handleAddUser}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <PlusCircle className="mr-2" /> Thêm Người Dùng
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Họ Tên</th>
              <th className="p-3 text-left">Tên Đăng Nhập</th>
              <th className="p-3 text-left">Vai Trò</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Số Điện Thoại</th>
              <th className="p-3 text-left">Địa Chỉ</th>
              <th className="p-3 text-left">Giới Tính</th>
              <th className="p-3 text-left">Ngày Sinh</th>
              <th className="p-3 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.fullname}</td>
                <td className="p-3">{user.account.username}</td>
                <td className="p-3">{user.account.role}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">{user.gender}</td>
                <td className="p-3">{user.dob}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800"
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
      {isModalOpen && <UserModal />}
    </div>
  );
};

export default UserManagement;