import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
function NavProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("test",user)
  return (
    <div className="shadow-md rounded-md h-screen">
      <div className="mx-5 py-10 gap-y-5 pb-5 border-b-[1px] px-5">
        <div className="text-6xl text-center rounded-full bg-slate-50 h-[100px] w-[100px] flex items-center ml-16">
          <CiUser className="w-full"/>
        </div>
        <div className="font-normal hover:text-primary cursor-pointer text-center">
            {user?<div>{user.userName}</div>:<div></div>}
        </div>
    </div>
    <div className="px-10 text-xl ">
            <li className="list-none py-5">
                <Link to={"/profile"} className="hover:text-primary">
                    Tài khoản của tôi
                </Link>
            </li>
            <li className="list-none py-5">
                <Link to={"/productbought"} className="hover:text-primary">
                    Đơn mua
                </Link>
            </li>
      </div>
      </div>
  );
}

export default NavProfile;
