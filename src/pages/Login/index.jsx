import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
// import { request2 } from "../../utils/request";
import axios from "axios";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showmessage, setShowmessage] = useState(false);
  const handleOnchangeInput = (e) => {
    setShowmessage(false);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
    const navigate=useNavigate();
  // console.log(user)
  const handleOnclick = async () => {
    // e.preventDefault();
    if(user.email==""|| user.password==""){
      alert("Vui lòng điền đầy đủ thông tin đăng nhập")
      return;
    }
    try{
      const response = await axios.post("http://localhost:8080/api/user/login",{
        email:user.email,
        password:user.password
      })
      // console.log(response.data)
      if(response.status==200){
        alert("Đăng nhập thành công")
        if(response.data.account.role=="admin"){
          navigate("/admin/home")
        }
        else{
          navigate("/")
        }
        localStorage.setItem("user",JSON.stringify(response.data.user));
      }
      else if(response.status==400){
        setShowmessage(true)
      }
      else{
        alert("Có lỗi xảy ra vui lòng thử lại")
      }
    }
    catch(error){
      console.log(error)
    }
  };
  return (
    <div className="container h-full py-10">
      <div className="flex h-full items-center justify-center ">
        <div className="md:w-8/12 lg:ms-6 lg:w-5/12 border-[0.5px] border-test  px-5 py-2 rounded-md bg-slate-50">
          <div className="w-full text-center pb-20 text-primary text-3xl font-semibold pt-2">
            <p>
              BookStore
              {/* <span className="text-red-500">Store</span> */}
            </p>
          </div>
          <form>
            {/* Email input */}
            <div className="relative mb-10 md:mb-20">
              <input
                type="text"
                className="input-form1"
                id="email"
                placeholder="Email address"
                value={user.email}
                name="email"
                onChange={(e) => handleOnchangeInput(e)}
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute left-3 top-[-50px] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary dark:text-neutral-400 dark:peer-focus:text-primary"
              >
                Email
              </label>
              {showmessage && (
                <p className="absolute top-12 left-2 text-red-500 text-sm">
                  Mật khẩu hoặc tên đăng nhập không đúng
                </p>
              )}
            </div>

            {/* Password input */}
            <div className="relative mb-10">
              <input
                type="password"
                className="input-form1"
                id="password"
                placeholder="Password"
                value={user.password}
                name="password"
                onChange={(e) => handleOnchangeInput(e)}
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute left-3 top-[-50px] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary dark:text-neutral-400 dark:peer-focus:text-primary"
              >
                Password
              </label>
              {showmessage && (
                <p className="absolute top-12 left-2 text-red-500 text-sm">
                  Mật khẩu hoặc tên đăng nhập không đúng
                </p>
              )}
            </div>

            {/* Remember me checkbox */}
            <div className="mb-6 flex items-center justify-between w-[100%]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="relative float-left me-[6px] h-[1.125rem] w-[1.125rem] cursor-pointer"
                  id="rememberMe"
                />
                <label
                  htmlFor="rememberMe"
                  className="inline-block ps-[0.15rem] cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              {/* Forgot password Link */}
              <Link
                href="#!"
                className="text-primary focus:outline-none dark:text-primary-400 font-semibold hover:text-red-500 transition-all duration-300"
              >
                Quên mật khẩu
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="button"
              className="inline-block w-[100%] rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 dark:shadow-black/30 mb-10"
              onClick={() => handleOnclick()}
            >
              Đăng nhập
            </button>

            {/* Social login buttons */}
            <Link
              className="mb-3 flex  w-[100%] items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
            >
              Tiếp tục với Facebook
            </Link>
            <Link
              className="mb-3 flex  w-[100%] items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
            >
              Tiếp tục với Google
            </Link>
            <div className="text-center text-md font-semibold text-primary ">
              <p>
                Bạn chưa có tài khoản? &ensp;{" "}
                <span className="cursor-pointer hover:text-red-500 transition-all duration-300">
                  {" "}
                  <Link to={"/register"}>Đăng ký</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
