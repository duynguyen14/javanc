import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { request } from "../../../../utils";

function Billdetail() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { billID } = useParams();
  const [billdetail, setBilldetail] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      if (user) {
        try {
          const response = await request.get(`billdetail/${user.id}/${billID}`);
          console.log(response.data);
          setBilldetail(response.data);
        } catch (error) {
          console.log("Lỗi", error);
        }
      } else {
        alert("Bạn chưa đăng nhập vui lòng đăng nhập");
        navigate("/login");
      }
    };
    fetch();
  }, []);
  const handleOnclickCancel=async()=>{
    if(window.confirm("Bạn xác nhận hủy đơn hàng này")){
        try{
            const response=await request.delete(`bill/${billID}`)
            if(response.status==200){
                alert("Hủy đơn hàng thành công")
                navigate("/bill")
            }
        }
        catch(e){
            console.log("Lỗi ",e)
        }

    }
  }
  return (
    <div className="test">
      {user ? (
        <div className="container mx-auto p-4">
          <div className=" mx-auto bg-white rounded-lg shadow-lg p-6 max-w-[800px]">
            <h2 className="text-2xl font-bold text-center mb-4">
              Chi tiết đơn hàng #{billID}
            </h2>

            <div className="mb-4 flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">Thông tin khách hàng</h3>
                <p>
                  <strong>Tên khách hàng:</strong> {user.userName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {user.phone}
                </p>
              </div>
              <div>
                <div className="mt-6 text-center">
                    <Link to={"/bill"}>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Quay lại danh sách hóa đơn
                        </button>
                    </Link>
                    <br />

                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 mt-5 mr-[-100px] "
                            onClick={()=>handleOnclickCancel()}
                        >
                            Hủy đơn hàng
                        </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Sản phẩm trong hóa đơn</h3>
              <table className="w-full table-auto border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Sản phẩm</th>
                    <th className="border p-2 text-left">Số lượng</th>
                    <th className="border p-2 text-left">Giá</th>
                    <th className="border p-2 text-left">Tổng</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {billdetail.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2 w-[400px] h-[400px] flex items-center justify-center">
                        <p className="my-5 font-semibold">
                          {item.product.productName}
                          <img src={item.product.productImage} alt="" className="h-[300px]"/>
                        </p>
                      </td>
                      <td className="border p-2">{item.billDetail.quantity}</td>
                      <td className="border p-2">{item.product.price}</td>
                      <td className="border p-2">{item.billDetail.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* // <div className="mt-4">
            //   <h3 className="text-xl font-semibold">
            //     Tổng tiền: {billdetail.totalAmount.toLocaleString()} VND
            //   </h3>
            // </div> */}
          </div>
        </div>
      ) : (
        <div>
          <p>
            Bạn chưa đăng nhập vui lòng quay lại trang{" "}
            <span>
              <Link className="text-primary">Đăng nhập</Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Billdetail;
