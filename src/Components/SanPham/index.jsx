import { useEffect, useState } from "react";
import demo from "../../assets/images/1.jpg";
import { Link } from "react-router-dom";
import { request } from "../../utils";
function ProductRelated() {
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
        setProductSlice(product.slice(20, 30));
      }
    }, [product]);
    return ( 
        <div>
            <div className="font-semibold text-xl text-center mb-10">
                <p>
                    Sản phẩm liên quan
                </p>
            </div>
            <div className="grid grid-books grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {productSlice.map((item, index) => {
          return (
            <Link to={`/product/${item.id}`} key={index}>
              <div
                className="group relative book-card bg-white rounded-xl p-4 text-center h-[400px] shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-sm hover:cursor-pointer"
              >
                <img
                  src={item.productImage}
                  alt="Sách 1"
                  className="mx-auto mb-4 rounded-lg max-w-full h-[65%]"
                />
                <p className="font-bold text-sm md:text-sm">{item.productName}</p>
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

export default ProductRelated;