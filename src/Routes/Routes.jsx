import { Route } from "react-router-dom";
import AuthForm from "../components/AuthForm";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Profile from "../pages/profileViewer";
import Login from "../pages/Login";
import Register from "../pages/Register";


import { Checkout } from "../Utils/Checkout";
import { ConfirmedOrders } from "../Orders/ConfirmedOrders";
import { LivestockPage } from '../pages/LivestockPage'
import { OverheadClassifiers}  from '../Orders/OverheadClassifiers'


const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/about", element: <About /> },


  { path: "/signin", element: <AuthForm /> },
  { path: "/signup", element: <AuthForm /> },
  { path: "/profile", element: <Profile /> },

  { path: "/Signin", element: <Login /> },
  { path: "/Signup", element: <Register /> },
  { path: "/checkout", element: <Checkout /> },

  {path: '/shop', element:<LivestockPage/>},
  {path:'/cart', element:<Cart/>},
  {path:'/Signin', element:<Login/>},
  {path:'/Signup', element:<Register/>},
  {path:'/checkout', element:<Checkout/>},
  {path: '/orders', element:<OverheadClassifiers/>},
  {path: '/ConfirmedOrders', element:<ConfirmedOrders/>}


];

export default appRoutes;






































// import { Route } from "react-router-dom";
// import { Home } from "../pages/Home";
// import { About } from "../pages/About";
// import Shop from '../pages/Shop';
// import Cart from '../pages/Cart';
// import Authmodal from '../components/Authmodal'

// const appRoutes = [
//   { path: "/", element: <Home /> },
//   { path: "/about", element: <About /> },
//   {path: '/shop', element:<Shop/>},
//   {path:'/cart', element:<Cart/>},
//   {path:'/Signin', element:<Authmodal/>},
//   {path:'Signin', element:<Authmodal/>}
// ];

// export default appRoutes;

