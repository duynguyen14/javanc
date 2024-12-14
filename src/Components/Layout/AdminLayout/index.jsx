import FooterAdmin from "./Footer";
import HeaderAdmin from "./Header";

function Adminlayout({children}) {
    return ( 
        <div>
            <HeaderAdmin/>
            <div>
                {children}
            </div>
            <FooterAdmin/>
        </div>
     );
}

export default Adminlayout;