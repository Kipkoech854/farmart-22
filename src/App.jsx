import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import appRoutes from "./Routes/Routes";
<<<<<<< HEAD
import { CartProvider } from "./context/CartContext"; 
=======
import Footer from "./components/Footer";
>>>>>>> daf0b8a205dd01322067b6ba427879a126f3541a

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        {appRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
<<<<<<< HEAD
    </CartProvider>
=======
      <Footer />
    </>
>>>>>>> daf0b8a205dd01322067b6ba427879a126f3541a
  );
}

export default App;
