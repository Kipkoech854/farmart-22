
import AuthForm from "../components/AuthForm";


import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Checkout } from "../Utils/Checkout";
import { ConfirmedOrders } from "../Orders/ConfirmedOrders";
import { LivestockPage } from '../pages/LivestockPage'
import { OverheadClassifiers}  from '../Orders/OverheadClassifiers'


const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/about", element: <About /> },
  {path: '/shop', element:<LivestockPage/>},
  {path:'/cart', element:<Cart/>},
  {path:'/Signin', element:<Login/>},
  {path:'/Signup', element:<Register/>},
  {path:'/checkout', element:<Checkout/>},
  {path: '/orders', element:<OverheadClassifiers/>},
  {path: '/ConfirmedOrders', element:<ConfirmedOrders/>}

];

export default appRoutes;

