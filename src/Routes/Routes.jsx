
import AuthForm from "../components/AuthForm";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Profile from "../pages/Profile";

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
  { path: "/shop", element: <Shop /> },
  { path: "/cart", element: <Cart /> },
  { path: "/about", element: <About /> },

  { path: "/signin", element: <AuthForm /> },
  { path: "/signup", element: <AuthForm /> },
  { path: "/profile", element: <Profile /> },

  {path: '/shop', element:<Shop/>},
  {path:'/cart', element:<Cart/>},
  {path:'/Signin', element:<Login/>},
  {path:'/Signup', element:<Register/>},
  {path:'/checkout', element:<Checkout/>}

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