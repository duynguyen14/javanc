import axios from "axios";
import { useEffect,useState } from "react";

function HomeProduct() {
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response= await axios.get("http://localhost:8080/api/products")
                console.log(response.data);
            }
            catch(error){
                console.log("Lỗi ",error)
            }
        }
        fetch()
    },[])
    return ( 
        <div>
            Home Product
        </div>
     );
}

export default HomeProduct;