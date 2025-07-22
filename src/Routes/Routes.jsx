import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";

const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
];

export default appRoutes;