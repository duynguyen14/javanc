import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:""
  });
  const handleOnchangeInput=(e)=>{
    const {name,value}=e.target;
    setUser({
        ...user,
        [name]:value
    })
  }
  const handleOnclickRegister=async()=>{
    try{
      const response=await axios.post("")
    }
    catch(error){
      console.log("lỗi ",error)
    }
  }
  return (
      <div className="container h-full py-8">
        <div className="flex h-full items-center justify-center ">
          <div className="md:w-8/12 lg:ms-6 lg:w-5/12 border-[0.5px] border-test/50  px-5 py-2 rounded-md bg-slate-50">
            <div className="w-full text-center pb-10 text-primary text-3xl font-semibold pt-2">
              <p>BookStore
                {/* <span className="text-red-500">Store</span> */}
                </p>
            </div>
            <form>
              {/* Email input */}
              <div className="relative mb-10 md:mb-16">
                <input
                  type="text"
                  className="input-form1"
                  id="name"
                  placeholder="Tên đăng nhập"
                  name="name"
                  value={user.name}
                  onChange={(e)=>handleOnchangeInput(e)}
                />
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute left-3 top-[-50px] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Tên đăng nhập
                </label>
              </div>
              <div className="relative mb-10 md:mb-16">
                <input
                  type="text"
                  className="input-form1"
                  id="email"
                  placeholder="Email address"
                  name="email"
                  value={user.email}
                  onChange={(e)=>handleOnchangeInput(e)}
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-3 top-[-50px] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Email
                </label>
              </div>

              {/* Password input */}
              <div className="relative mb-10 md:mb-16">
                <input
                  type="password"
                  className="input-form1"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={(e)=>handleOnchangeInput(e)}
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-3 top-[-50px] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="relative mb-10">
                <input
                  type="password"
                  className="input-form1"
                  id="confirmpassword"
                  placeholder="Xác nhận mật khẩu"
                  name="confirmpassword"
                  value={user.confirmpassword}
                  onChange={(e)=>handleOnchangeInput(e)}
                />
                <label
                  htmlFor="confirmpassword"
                  className="pointer-events-none absolute left-3 top-[-50px] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Xác nhận mật khẩu
                </label>
              </div>
              <button
                type="button"
                className="inline-block w-[100%] rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 dark:shadow-black/30 mb-10"
                onClick={()=>handleOnclickRegister()}
              >
                Đăng ký
              </button>

              {/* Social login buttons */}
              {/* <Link
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
              </Link> */}
              <div className="text-center text-md font-semibold text-primary ">
                <p>
                  Bạn đã có tài khoản? &ensp; <span className="cursor-pointer hover:text-red-500 transition-all duration-300"> <Link to={"/login"}>Đăng nhập</Link></span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Register;
