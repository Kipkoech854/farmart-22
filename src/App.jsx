import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import appRoutes from './Routes/Routes'
import { Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext"; 


function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        {appRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>

      <Footer />
   

    </CartProvider>

  );
}

export default App;
