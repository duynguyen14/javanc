import Defautlayout from "../Components/Layout/Defaulayout";
import Adminlayout from "../Components/Layout/AdminLayout";
import Home from "./Customer/Home";
import Register from "./Customer/Register";
import Login from "./Login";
import Profile from "./Customer/Profile";
import AdminHome from "./Admin/AdminHome";
import ManaProduct from "./Admin/Product/ManageProduct";
import Product from "./Customer/Product";
import Category from "./Customer/Category";
import Catalog from "./Customer/Catalog";
import CartShopping from "./Customer/CartShopping";
const PublicPage=[
    {path:"/login",component: Login, layout: null},
    {path:"/register",component: Register, layout: null},
    {path:"/",component: Home, layout: Defautlayout},
    {path:"/profile",component: Profile, layout: Defautlayout},
    {path:"/product/:id",component: Product, layout: Defautlayout},
    {path:"/category/:id",component: Category, layout: Defautlayout},
    {path:"/catalog/:id",component: Catalog, layout: Defautlayout},
    {path:"/cartshopping",component: CartShopping, layout: Defautlayout},
    // {path:"/",component: Home, layout: Defautlayout},
    // {path:"/",component: Home, layout: Defautlayout},
    {path:"/admin/home", component: AdminHome, layout: Adminlayout},
    {path:"/admin/product", component: ManaProduct, layout: Adminlayout},
    {path:"/admin/home", component: AdminHome, layout: Adminlayout},
]
const PrivatePage=[
    
    {path:"/admin/product", component: ManaProduct, layout: Adminlayout},
]
export{PublicPage,PrivatePage}