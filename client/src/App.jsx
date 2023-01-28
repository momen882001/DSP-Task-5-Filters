import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allpass from './pages/Allpass';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/allpass" element={<Allpass/>} />
      </Routes>
    </Router>
  )
}

export default App
