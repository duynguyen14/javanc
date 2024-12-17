import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";

function CartItem({ item,onRemove, onQuantityChange, user }) {
  const [number, setNumber] = useState(item.cartDetail.quantity);

  const handleOnclickPlus = () => {
    const newQuantity = number + 1;
    setNumber(newQuantity);
    if (user) {
      onQuantityChange(item.product.id, newQuantity); // Gọi callback với sản phẩm và số lượng mới
    }
  };

  const handleOnclickSubtract = () => {
    if (number > 1) {
      const newQuantity = number - 1;
      setNumber(newQuantity);
      if (user) {
        onQuantityChange(item.product.id, newQuantity); // Gọi callback với sản phẩm và số lượng mới
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-x-64 justify-between items-center border-b py-4 px-6 h-[300px] mt-4 font-Montserrat">
      {/* Phần ảnh và tên sản phẩm */}
      <div className="flex flex-col items-center w-[200px]">
        <img
          src={item.product.productImage}
          alt=""
          className="w-[80%] h-[200px] object-cover rounded"
        />
        <h3 className="font-medium text-center mt-2">{item.product.productName}</h3>
      </div>

      {/* Phần giá sản phẩm */}
      <div className="flex items-center">
        <p className="text-lg font-medium text-red-500 whitespace-nowrap">
          {item.product.price} VND
        </p>
      </div>

      {/* Phần số lượng và nút xóa */}
      <div className="grid grid-cols-3 gap-x-4 items-center font-semibold ">
        <FaPlus
          className="cursor-pointer"
          onClick={handleOnclickPlus}
        />
        <p className="text-lg">{number}</p>
        <RiSubtractFill
          className="text-xl font-bold cursor-pointer"
          onClick={handleOnclickSubtract}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onRemove(item.cartDetail.id, item.product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default CartItem;
