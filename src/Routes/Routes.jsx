import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import Authmodal from '../components/Authmodal'

const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  {path: '/shop', element:<Shop/>},
  {path:'/cart', element:<Cart/>},
  {path:'/Signin', element:<Authmodal/>},
  {path:'Signin', element:<Authmodal/>}
];

export default appRoutes;