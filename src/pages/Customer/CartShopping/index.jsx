import { Link, useNavigate } from "react-router-dom";
import CartItem from "./cartItem";
import { useState, useEffect } from "react";
import { request } from "../../../utils/index.js";

function CartShopping() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (!user) {
        alert("Bạn chưa đăng nhập vui lòng đăng nhập");
        navigate("/login");
        return;
      }
      try {
        const response = await request.get(`cart/userID/${user.id}`);
        console.log(response);
        setCarts(response.data);
      } catch (error) {
        console.log("Lỗi khi tải giỏ hàng:", error);
      }
    };
    fetch();
  }, []);  // Thêm user và navigate vào dependencies để theo dõi sự thay đổi.

  const titles = ["Sản phẩm", "Giá", "Số lượng", "Thao tác"];

  const handleRemove = async (cartDetailID, productID) => {
    if (user) {
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        try {
          const response = await request.delete(`cartdetail/delete/${user.id}`, {
            data: productID,
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            const updatedCart = carts.filter(
              (item) =>
                !(item.product.id === productID && item.cartDetail.cartID === cartDetailID)
            );
            setCarts(updatedCart);
            alert("Xóa sản phẩm thành công");
          }
        } catch (error) {
          console.log("Lỗi khi xóa sản phẩm: ", error);
          alert("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");
        }
      }
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await request.patch(`cartdetail/patch/${user.id}`, {
        productId,
        quantity: newQuantity,
      });

      if (response.status === 200) {
        setCarts((prevItems) =>
          prevItems.map((item) =>
            item.product.id === productId
              ? { ...item, cartDetail: { ...item.cartDetail, quantity: newQuantity } }
              : item
          )
        );
      }
    } catch (error) {
      console.log("Error updating quantity:", error);
      alert("Có lỗi khi cập nhật số lượng. Vui lòng thử lại.");
    }
  };

  const totalPrice = carts.reduce(
    (total, item) => (item.product && item.cartDetail ? total + item.product.price * item.cartDetail.quantity : total),
    0
  );

  const handleOnclickDH = async () => {
    if (user) {
      if (window.confirm("Bạn xác nhận đặt đơn hàng này")) {
        const bills = carts.map((item) => ({
          id: item.product.id,
          productName:item.product.productName,
          productAuthor:item.product.productAuthor,
          price:item.product.price,
          quantity: item.cartDetail.quantity,
          productImage:item.product.productImage,
          productDescription:item.product.productDescription,
          categoryId:item.product.categoryId,
        }));

        try {
          const response = await request.post(
            `bill/add/${user.id}`,
            bills // Gửi mảng sản phẩm và số lượng
          );
          console.log(response);
          alert("Đặt hàng thành công!");
          // Sau khi đặt hàng thành công, bạn có thể chuyển hướng người dùng đến trang khác hoặc giỏ hàng trống
          setCarts([]); // Xóa giỏ hàng sau khi đặt hàng
        } catch (error) {
          console.log("Lỗi khi đặt hàng: ", error);
          alert("Có lỗi khi đặt hàng. Vui lòng thử lại.");
        }
      }
    }
  };

  return !user ? (
    <div className="text-center flex justify-center items-center h-[500px] text-3xl font-Montserrat">
      <p>
        Bạn chưa đăng nhập vui lòng{" "}
        <span>
          <Link className="text-primary" to={"/login"}>
            Đăng nhập
          </Link>
        </span>
      </p>
    </div>
  ) : (
    <div className="test">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold my-10 mx-10 ">Giỏ hàng của bạn</h1>
        <div className="grid grid-cols-4 gap-x-40 text-xl bg-white py-8 pl-28 text-blue-600 shadow-md rounded-xs font-semibold">
          {titles.map((item, index) => (
            <li key={index} className="list-none">
              {item}
            </li>
          ))}
        </div>
        <div className="p-4 rounded-lg shadow-md">
          {carts.length > 0 ? (
            carts.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={handleRemove}
                user={user}
                onQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Giỏ hàng của bạn trống.</p>
          )}
          <div className="text-right mt-4">
            {carts.length > 0 && (
              <h2 className="text-xl font-medium text-red-500 my-10">
                Tổng tiền: {totalPrice} VND
              </h2>
            )}
            <button
              className="button-primary text-white px-10 py-3 bg-red-500"
              onClick={handleOnclickDH}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartShopping;
