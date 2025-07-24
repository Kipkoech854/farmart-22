import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import appRoutes from "./Routes/Routes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {appRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
