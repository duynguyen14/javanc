import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../../utils";
import NavProfile from "../../../Components/NavProfile";

function Bill() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // Dùng navigate để điều hướng nếu người dùng chưa đăng nhập
  const [bills, setbills] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const respose = await request.get(`bill/user/${user.id}`);
        console.log(respose.data);
        setbills(respose.data);
      } else {
        alert("Bạn chưa đăng nhập vui lòng quay lại đăng nhập");
        navigate("/login");
      }
    };
    fetch();
  }, []);
  return !user ? (
    <div className="flex justify-center items-center h-[500px]">
      <p className="text-xl font-Montserrat font-normal text-center">
        Bạn chưa đăng nhập vui lòng quay lại{" "}
        <span>
          <Link to={"/login"} className="text-primary">
            Đăng nhập
          </Link>
        </span>
      </p>
    </div>
  ) : (
    <div className="flex test font-Montserrat">
      <div className="basis-[25%]">
        <NavProfile />
      </div>
      <div className="basis-[75%] px-20 bg-gray-50 shadow-sm">
        {bills.length > 0 ? (
          <div>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold text-center mb-6">
                Đơn Hàng Đã Mua
              </h1>
              {bills.map((bill, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
                >
                  <div className="flex justify-between mb-2">
                    <h2 className="text-lg font-semibold">
                      Mã Đơn Hàng: #{bill.billID}
                    </h2>
                    <p className="text-gray-600">Ngày mua: {bill.date}</p>
                    <Link to={`/bill/billdetail/${bill.billID}`}>
                      <button className="button-primary bg-green-500 px-5 py-2 font-normal">
                        Xem chi tiết
                      </button>
                    </Link>
                  </div>
                  <div></div>
                  <div className="text-right">
                    <span className="font-semibold">Tổng tiền: </span>
                    <span className="text-red-500 font-semibold text-lg">
                      {bill.total.toLocaleString()} VND
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center items-center text-2xl font-normal py-[200px]">
            Bạn chưa có đơn hàng nào{" "}
            <span>
              <Link to={"/"} className="text-primary">
                mua hàng ngay
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bill;
