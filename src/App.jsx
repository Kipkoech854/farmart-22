import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // ✅ Correct imports
import Home from './components/Home';
import About from './components/About';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>FARMART</h1>
      <Router>
        <nav className="w-full flex justify-between bg-green-500 p-4 text-white">
          {/* ✅ Use Link, not link */}
          <Link to="/" className="home">Home</Link>
          <Link to="/about" className="about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
