import Footer from "./Footer";
import Header from "./Header";

function Defautlayout({children}) {
    return ( 
        <div>
            <Header/>
            <div>
                {children}
            </div>
            <Footer/>
        </div>
     );
}

export default Defautlayout;