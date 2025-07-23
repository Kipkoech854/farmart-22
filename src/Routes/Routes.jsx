import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Checkout } from "../Utils/Checkout";

const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  {path: '/shop', element:<Shop/>},
  {path:'/cart', element:<Cart/>},
  {path:'/Signin', element:<Login/>},
  {path:'/Signup', element:<Register/>},
  {path:'/checkout', element:<Checkout/>}
];

export default appRoutes;