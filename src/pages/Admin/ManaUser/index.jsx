

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Thêm axios để gọi API
import { Edit, Trash2, PlusCircle, Search } from 'lucide-react';

const Manauser = () => {
  const [users, setUsers] = useState([]); // Dữ liệu từ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users based on search term
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user');
      setUsers(response.data); // Gán dữ liệu từ API vào state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Search users based on the search term
  const searchUsers = async (term) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/search?name=${term}`);
      setUsers(response.data); // Update state with search results
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await axios.delete(`http://localhost:8080/api/user/delete/${userId}`);
        fetchUsers(); // Refresh danh sách sau khi xóa
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSaveUser = async (userData) => {
    if (currentUser) {
      // If updating user
      try {
        await axios.put(`http://localhost:8080/api/user/update/${currentUser.id}`, userData);
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      // If adding new user
      try {
        await axios.post('http://localhost:8080/api/user/registerAll', userData);
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
    setIsModalOpen(false);
  };

  const UserModal = () => {
    const [formData, setFormData] = useState(
      currentUser
        ? currentUser
        : {
            userName: '',
            email: '',
            phone: '',
            address: '',
            gender: '',
            password: '',
          }
    );

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
              name="userName"
              placeholder="Tên Đăng Nhập"
              value={formData.userName}
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
              type="password"
              name="password"
              placeholder="Mật Khẩu"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              searchUsers(e.target.value); // Trigger search API call
            }}
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
              <th className="p-3 text-left">Tên Đăng Nhập</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Số Điện Thoại</th>
              <th className="p-3 text-left">Địa Chỉ</th>
              <th className="p-3 text-left">Giới Tính</th>
              <th className="p-3 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.userName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">{user.gender}</td>
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

      {isModalOpen && <UserModal />}
    </div>
  );
};

export default Manauser;
