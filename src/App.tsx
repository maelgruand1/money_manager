import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home'; // Assure-toi que Home est correctement importé
import Wallet from './components/Wallet';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home est la page d'accueil */}
        <Route path="/wallet" element={<Wallet setInitialMonth={() => {}} />} /> {/* Wallet est accessible via /wallet */}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
