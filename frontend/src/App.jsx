import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predict from './pages/Predict';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/about" element={<About />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CardioPredict. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
