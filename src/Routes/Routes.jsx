import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import Authmodal from '../components/Authmodal';
import ProfileView from '../pages/Farmers/ProfileView';
import ProfileEdit from '../pages/Farmers/ProfileEdit';
import AnimalList from '../pages/Farmers/AnimalList';
import AnimalForm from '../pages/Farmers/AnimalForm';
import FarmerFeedback from '../pages/Farmers/FarmerFeedback';
import FarmerLogin from "../pages/Farmers/FarmerLogin";
import FarmerRegister from "../pages/Farmers/FarmerRegister";
import FarmerLogout from "../pages/Farmers/FarmerLogout";


const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  {path: '/shop', element:<Shop/>},
  {path:'/cart', element:<Cart/>},
  {path:'/Signin', element:<Authmodal/>},
  {path:'Signin', element:<Authmodal/>},
  {path: "/farmers/profile",element: <ProfileView />},
  {path: "/farmers/edit",element: <ProfileEdit />},
  {path: "/farmers/animals",element: <AnimalList />},
  {path: "/farmers/animals/new",element: <AnimalForm />},
  {path: "/farmers/feedback",element: <FarmerFeedback />},
  {path: "/farmers/login",element: <FarmerLogin />},
  {path: "/farmers/register",element: <FarmerRegister />},
  {path: "/farmers/logout", element: <FarmerLogout /> },
];

export default appRoutes;