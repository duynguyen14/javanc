import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:""
  });
  const [showpassword,setShowPassword]=useState(false);
  const [showconfirnpassword,setShowconfirnPassword]=useState(false);
  const [nameerror,setNameerror]=useState("");
  const [passworderror,setPassworderror]=useState("");
  const [confirnpassworderror,setconfirnPassworderror]=useState("");
  const [emailerror,setEmailerror]=useState("");
  const handleOnchangeInput=(e)=>{
    const {name,value}=e.target;
    setUser({
        ...user,
        [name]:value
    })
    checkInput(name,value);
  }
  let checkemail=/\w+@[a-zA-Z]\w+\.com$/;
    let validate=true;
    const checkInput = (name,value) => {
        switch(name){
            case "name":
                if(value===""){
                    setNameerror("Tên đăng nhập không được để trống");
                    validate=false;
                }
                else if(value.length<5){
                    setNameerror("Tên đăng nhập phải có từ 5 kí tự trở lên");
                    validate=false;
                }
                else{
                    setNameerror("");
                }
            break;
            case "password":
                if(value===""){
                    setPassworderror("Mật khẩu không được để trống")
                    validate=false;
                }
                else if(value.length<8){
                    setPassworderror("Mật khẩu phải có ít nhất 8 kí tự")
                    validate=false;
                }
                else{
                    setPassworderror("")
                }
            break;
            case "confirmpassword":
                if(value===""){
                    setconfirnPassworderror("Xác nhận mật khẩu không được để trống")
                    validate=false;
                }
                else if(value!==user.password){
                    setconfirnPassworderror("Xác nhận mật khẩu phải giống mật khẩu")
                    validate=false;
                }
                else {
                    setconfirnPassworderror("")
                }
            break;
            case "email":
                if(value===""){
                    setEmailerror("Email không được để trống");
                    validate=false;
                }
                else if(!checkemail.test(value)){
                    setEmailerror("Email không đúng định dạng");
                    validate=false;
                }
                else{
                    setEmailerror("")
                }
            break;
            default:
                break;
        }
        return validate;
    };
  const handleOnclickRegister=async()=>{
    const validatename=checkInput('name',user.name)
    const validateemail=checkInput('email',user.email)
    const validatepassdword=checkInput('password',user.password)
    const validateconfirmpassword=checkInput('confirmpassword',user.confirmpassword)
    if(validatename&&validateemail&&validatepassdword&&validateconfirmpassword){

      try{
        const response=await axios.post("http://localhost:8080/api/user/register",{
          email:user.email,
          password:user.password,
          userName:user.name,
        })
        console.log(response);
        if(response.status==400){
          alert("Email đã được đăng ký vui lòng đăng ký bằng email khác")
          return;
        }
        else if(response.status==201){
          alert("Đăng ký thành công");
          navigate("/login");
        }
      }
      catch(error){
        if (error.response) {
          // Lỗi có response từ server
          if (error.response.status === 400) {
            alert("Email đã được đăng ký, vui lòng đăng ký bằng email khác");
          } else {
            console.log("Lỗi khác: ", error.response.data);
          }
        } else if (error.request) {
          // Nếu không có response, lỗi từ request
          console.log("Không nhận được phản hồi từ server: ", error.request);
        } else {
          // Lỗi trong quá trình thiết lập request
          console.log("Lỗi cấu hình request: ", error.message);
        }
      }
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
                {nameerror&& <p className='absolute top-12 left-2 text-red-500 text-sm'>{nameerror}</p>}
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
                {emailerror&& <p className='absolute top-12 left-2 text-red-500 text-sm'>{emailerror}</p>}
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
                {passworderror&& <p className='absolute top-12 left-2 text-red-500 text-sm'>{passworderror}</p>}
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
                {confirnpassworderror&& <p className='absolute top-12 left-2 text-red-500 text-sm'>{confirnpassworderror}</p>}
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
