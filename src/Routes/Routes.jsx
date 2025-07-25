import AuthForm from "../components/AuthForm";
import Authmodal from "../components/Authmodal";

import {Home} from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import {About} from "../pages/About";
import Profile from "../pages/profileViewer";

import ProfileView from "../pages/Farmers/ProfileView";
import ProfileEdit from "../pages/Farmers/ProfileEdit";
import AnimalList from "../pages/Farmers/AnimalList";
import AnimalForm from "../pages/Farmers/AnimalForm";
import FarmerFeedback from "../pages/Farmers/FarmerFeedback";
import FarmerLogin from "../pages/Farmers/FarmerLogin";
import FarmerRegister from "../pages/Farmers/FarmerRegister";
import FarmerLogout from "../pages/Farmers/FarmerLogout";
import ResetPassword from "../pages/Farmers/ResetPassword";

import Login from "../pages/Login";
import Register from "../pages/Register";
import { Checkout } from "../Utils/Checkout";
import { ConfirmedOrders } from "../Orders/ConfirmedOrders";
import { LivestockPage } from '../pages/LivestockPage';
import { OverheadClassifiers } from '../Orders/OverheadClassifiers';


const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/about", element: <About /> },
  { path: "/shop", element: <LivestockPage /> },

  // General auth pages
  { path: "/signin", element: <Login /> },
  { path: "/signup", element: <Register /> },
  { path: "/login", element: <Login /> },       // Alias route
  { path: "/register", element: <Register /> }, // Alias route
  { path: "/checkout", element: <Checkout /> },

  // Farmer-specific routes
  { path: "/farmers/profile", element: <ProfileView /> },
  { path: "/farmers/edit", element: <ProfileEdit /> },
  { path: "/farmers/animals", element: <AnimalList /> },
  { path: "/farmers/animals/new", element: <AnimalForm /> },
  { path: "/farmers/feedback", element: <FarmerFeedback /> },
  { path: "/farmers/login", element: <FarmerLogin /> },
  { path: "/farmers/register", element: <FarmerRegister /> },
  { path: "/farmers/logout", element: <FarmerLogout /> },
  { path: "/reset-password", element: <ResetPassword /> },

  // Modal variant (if needed)
  { path: "/signin-modal", element: <Authmodal /> },

  // Customer Profile
  { path: "/profile", element: <Profile /> },

  // Orders
  { path: "/orders", element: <OverheadClassifiers /> },
  { path: "/confirmed-orders", element: <ConfirmedOrders /> },
];

export default appRoutes;


