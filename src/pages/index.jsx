import Defautlayout from "../Components/Layout/Defaulayout";
import Adminlayout from "../Components/Layout/AdminLayout";
import Home from "./Customer/Home";
import Register from "./Customer/Register";
import Login from "./Login";
import Profile from "./Customer/Profile";
import AdminHome from "./Admin/AdminHome";
import ManaProduct from "./Admin/Product/ManageProduct";
import Product from "./Customer/Product";
const PublicPage=[
    {path:"/login",component: Login, layout: null},
    {path:"/register",component: Register, layout: null},
    {path:"/",component: Home, layout: Defautlayout},
    {path:"/profile",component: Profile, layout: Defautlayout},
    {path:"/product/:id",component: Product, layout: Defautlayout},
    // {path:"/",component: Home, layout: Defautlayout},
    // {path:"/",component: Home, layout: Defautlayout},
    {path:"/admin/home", component: AdminHome, layout: Adminlayout},
    {path:"/admin/product", component: ManaProduct, layout: Adminlayout},
]
const PrivatePage=[
    {path:"/admin/home", component: AdminHome, layout: Adminlayout},
    {path:"/admin/product", component: ManaProduct, layout: Adminlayout},
]
export{PublicPage,PrivatePage}