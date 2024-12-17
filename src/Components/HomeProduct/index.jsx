import axios from "axios";
import { useEffect,useState } from "react";
import {request} from "..//../utils/index.js"
import { Link } from "react-router-dom";
function HomeProduct() {
    const [product,setProduct]=useState([]);
    const [productSlice,setProductSlice]=useState([]);
    useEffect(()=>{
      const fetch=async()=>{
        try{
          const response=await request.get("products");
          console.log(response.data);
          setProduct(response.data);
        }
        catch(error){
          console.log("Lỗi ",error)
        }
      }
      fetch()
    },[])
    useEffect(() => {
      if (product && product.length > 0) {
        setProductSlice(product.slice(30, 45));
      }
    }, [product]);
    return (
        <div className="font-Montserrat">
            <div className="text-center font-medium text-3xl">
                Sách văn học
            </div>
            <div className="grid grid-books grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 my-10">
                {productSlice.map((item, index) => {
                return (
                    <Link to={`/product/${item.id}`} key={index}>
                    <div
                        className="group relative book-card bg-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-sm hover:cursor-pointer h-[400px]"
                    >
                        <img
                        src={item.productImage}
                        alt="Sách 1"
                        className="mx-auto mb-4 rounded-lg max-w-full h-[65%]"
                        />
                        <h3 className="font-bold text-base md:text-sm">{item.productName}</h3>
                        <p className="text-gray-600 mb-2 text-sm">{item.productAuthor}</p>
                        <div className="flex justify-between items-center">
                        <del className="text-gray-400 font-semibold">{item.price}</del>
                        <p className="text-red-500 font-semibold">{item.price}</p>
                        </div>
                        <div className="absolute px-2 py-1 bg-red-500 text-xs text-white font-semibold text-center top-[10%] left-[78%]">
                        <p>-20%</p>
                        </div>
                        <button className=" ml-[-16px] hidden group-hover:block absolute w-full py-2 bg-red-500 top-[85%] rounded-md text-white font-semibold">
                        Thêm vào giỏ hàng
                        </button>
                        {/* <button
                        className="hidden group-hover:block absolute bottom-[10px] left-0 w-full bg-blue-500 text-white font-bold py-2 text-center 
                            transform translate-y-full group-hover:translate-y-0 transition-all duration-500"
                        >
                        Mua Ngay
                        </button> */}
                    </div>
                    </Link>
                );
                })}
            </div>
        </div>
     );
}

export default HomeProduct;