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

const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  {path: '/shop', element:<LivestockPage/>},
  {path:'/cart', element:<Cart/>},
  {path:'/Signin', element:<Login/>},
  {path:'/Signup', element:<Register/>},
  {path:'/checkout', element:<Checkout/>},
  {path: '/ConfirmedOrders', element:<ConfirmedOrders/>}
];

export default appRoutes;