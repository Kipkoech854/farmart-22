import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import Authmodal from '../components/Authmodal'
import AuthForm from '../components/AuthForm'; // Adjust path if different
import Login from '../pages/Login'; 
import Profile from '../pages/profileViewer'; // or wherever the file is located
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';
import { LivestockPage } from '../pages/LivestockPage';





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
  {path:'/Signin', element:<Authmodal/>},
  {path:'Signin', element:<Authmodal/>}
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

