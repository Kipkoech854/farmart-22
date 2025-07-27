
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

// ✅ Import your route definitions
import appRoutes from "./Routes/Routes";

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


// import Footer from "./components/Footer";

// import { CartProvider } from "./context/CartContext"; 


// function App() {
//   return (
//     <CartProvider>
//       <Navbar />
//       <Routes>
//         {appRoutes.map(({ path, element }, index) => (
//           <Route key={index} path={path} element={element} />
//         ))}
//       </Routes>

//       <Footer />
   

//     </CartProvider>

//   );
// }

// export default App;
