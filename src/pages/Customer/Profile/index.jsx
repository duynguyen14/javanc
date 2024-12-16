import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../../utils";
import NavProfile from "../../../Components/NavProfile";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // Dùng navigate để điều hướng nếu người dùng chưa đăng nhập
  const [userData, setUserData] = useState({
    userName: user?.userName || "",
    password: user?.password || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    gender: "nam", // Giá trị mặc định cho gender
  });

//   useEffect(() => {
//     // Kiểm tra xem người dùng có đăng nhập chưa
//     if (!user) {
//       navigate("/login"); // Điều hướng về trang đăng nhập nếu chưa đăng nhập
//       return;
//     }

    // Nếu người dùng đã đăng nhập, lấy thông tin từ API
//     const fetchUserData = async () => {
//       try {
//         const response = await request.get(`user/${user.id}`);
//         setUserData(response.data);
//         // localStorage.setItem("user", JSON.stringify(response.data)); // Cập nhật thông tin người dùng vào localStorage
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu người dùng:", error);
//       }
//     };

//     fetchUserData();
//   }, [user]); // Chỉ chạy khi `user` thay đổi hoặc khi component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request.put(`user/update/${user.id}`, userData);
      console.log("Cập nhật thành công:", response);
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Cập nhật thông tin thành công")
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    !user?(<div className="flex justify-center items-center h-[500px]">
        <p className="text-xl font-Montserrat font-normal text-center">
            Bạn chưa đăng nhập vui lòng quay lại <span>
                <Link to={"/login"} className="text-primary">
                    Đăng nhập
                </Link>
            </span>
        </p>
    </div>)
    :(
    <div className="flex test font-Montserrat">
      <div className="basis-[25%]">
        <NavProfile />
      </div>
      <div className="basis-[75%] px-20 bg-gray-50 shadow-sm">
        <p className="text-center font-normal text-3xl my-10 text-primary">
          Cập nhật thông tin của bạn
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-2 gap-x-5">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tên đăng nhập"
                value={userData.userName}
                name="userName"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-x-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Địa chỉ Email"
                value={userData.email}
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mật khẩu"
                value={userData.password}
                name="password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-x-5">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại
              </label>
              <input
                id="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Số điện thoại"
                value={userData.phone}
                name="phone"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ
              </label>
              <input
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Địa chỉ "
                value={userData.address}
                name="address"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="text-white bg-primary hover:bg-primary/60 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
    )
  );
}

export default Profile;
