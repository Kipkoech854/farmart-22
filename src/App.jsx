import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import appRoutes from "./Routes/Routes";
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
    </CartProvider>
  );
}

export default App;
