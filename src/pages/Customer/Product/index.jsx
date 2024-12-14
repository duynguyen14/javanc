import { useParams } from "react-router-dom";
import Image1 from "../../../assets/images/1.jpg";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Introbook from "../../../Components/Introbook";
import ProductRelated from "../../../Components/SanPham";
function Product() {
    const product={
              id: 1,
              name: "Nhà Giả Kim",
              author: "Paulo Coelho",
              price: "120.000",
              image: Image1,
    }
    const {id} =useParams();
    const [number,setNumber]=useState(1);
    const handleOnclickSubtract=()=>{
        if(number<1){
            setNumber(0)
            return;
        }
        setNumber(number-1);
    }
    const handleOnclickPlus=()=>{
        setNumber(number+1);
    }
    useEffect(()=>{
        fetch=async()=>{
            try{
                
            }
            catch(error){
                console.log(error);
            }
        }
        fetch();
    },[])
    return ( 
        <div className="test bg-white pt-10 font-Montserrat">
            {/* Product {id} */}
            <div className="flex gap-x-5">
                <div className="flex basis-[75%]">
                    <div className="h-[500px]">
                        <img src={product.image} alt=""  className="h-full"/>
                    </div>
                    <div>
                        <div className="text-xl font-medium">
                            <p className="font-semibold text-2xl hover:text-test2 cursor-pointer  py-5">
                                {product.name}
                            </p>
                            <p className="pb-5">
                                Tác giả: {product.author}
                            </p>
                            <p className="text-red-500 mb-10">
                                {product.price} đ
                            </p>
                            <div className="grid grid-cols-3 font-normal text-base items-center mb-10 gap-x-[-20px]">
                                <RiSubtractFill className="text-xl cursor-pointer"
                                onClick={()=>handleOnclickSubtract()}/>
                                <p className="text-xl font-semibold">
                                    {number}
                                </p>
                                <FaPlus className="cursor-pointer"
                                onClick={()=>handleOnclickPlus()}/>
                            </div>
                            <div>
                                <div className="flex font-normal gap-x-10 text-sm">
                                    <button className="px-8 text-white rounded-md py-3 bg-red-500 button-primary hover:bg-red-600">                                       Mua ngay
                                    </button>
                                    <button className="px-8 text-white rounded-md py-3 bg-test2 button-primary hover:bg-orange-500">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-[1px] shadow-fuchsia-50 basis-[25%] mr-10 h-[400px] rounded-md grid grid-rows-5 gap-y-4">
                    <p className="py-2 bg-gray-100 flex items-center font-semibold px-2 text-center text-xl">
                        Chỉ có ở &ensp;<span className="text-primary"> BookStore</span>
                    </p>
                    <p className="flex justify-around items-center font-medium">
                        <AiFillCheckCircle className="text-3xl text-test2"/> Sản phẩm chính hãng 100%
                    </p>
                    <p className="flex justify-around items-center font-medium">
                        <AiFillCheckCircle className="text-3xl text-test2"/> Sản phẩm chính hãng 100%
                    </p>
                    <p className="flex justify-around items-center font-medium">
                        <AiFillCheckCircle className="text-3xl text-test2"/> Sản phẩm chính hãng 100%
                    </p>
                    <p className="flex justify-around items-center font-medium">
                        <AiFillCheckCircle className="text-3xl text-test2"/> Sản phẩm chính hãng 100%
                    </p>
                </div>
            </div>
            <div className="font-semibold text-xl my-10">
                <p className="hover:text-test2 cursor-pointer">
                    Giới thiệu sách

                </p>
                <Introbook/>
            </div>
            <div>
                <ProductRelated/>
            </div>
        </div>
     );
}

export default Product;