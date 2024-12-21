import { useEffect, useState } from "react";
import {request} from "../../utils/index.js"
import { Link, useNavigate } from "react-router-dom";
function Search({search,setVisible,setSearch}) {
    const [product,setProduct]=useState([]);
    // console.log("ĐỘ dài",search.length)
    useEffect(()=>{
        const fetch=async()=>{
            try{
                if(search.length<=0){
                    return;
                }
                else{
                    const response=await request.get(`products/search/${search}`)
                    console.log("search ",response.data);
                    if(response.data.length>5){
                        const List=response.data.slice(0,4);
                        setProduct(List);
                    }
                    else{
                        setProduct(response.data);
                    }
                }
            }
            catch(e){
                console.log("Lỗi ",e)
            }
        }
        fetch()
    },[search])
    console.log("Sản phẩm",product)
    const navigate=useNavigate()
    const handleOnclick=(item)=>{
        setVisible(false)
        setSearch(item.productName)
        navigate(`/product/${item.id}`)
        
    }
    return ( 
        <div className=" pl-[-200px] w-[500px] bg-gray-50 shadow-sm">
            {
                product.map((item,index)=>{
                    return(
                        <li key={index} onClick={()=>handleOnclick(item)} className="list-none cursor-pointer">
                            <div className="flex py-2 border-b-[1px]">
                                <div className="h-[80px] px-10">
                                    <img src={item.productImage} alt="" className="h-full" />
                                </div>
                                <div>
                                    <p>
                                        {item.productName}
                                    </p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </div>
     );
}

export default Search;