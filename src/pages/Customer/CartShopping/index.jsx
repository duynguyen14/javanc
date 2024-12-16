import { Link } from "react-router-dom";
function CartShopping() {
    const user=JSON.parse(localStorage.getItem("user"));
    return (
        !user?(
        <div className="text-center flex justify-center items-center h-[500px] text-3xl">
            <p>
                Bạn chưa đăng nhập vui lòng <span>
                    <Link className="text-primary" to={"/login"}>
                        Đăng nhập
                    </Link>
                </span>
            </p>
        </div>)
        :(
        <div className="test">
            <p>
                hello
            </p>
        </div>
        )
     );
}

export default CartShopping;