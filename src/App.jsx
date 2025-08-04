import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import './styles/globals.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:categoria" element={<div>Categoria em desenvolvimento</div>} />
        <Route path="/produto/:id" element={<div>Produto em desenvolvimento</div>} />
        <Route path="/login" element={<div>Login em desenvolvimento</div>} />
        <Route path="/favoritos" element={<div>Favoritos em desenvolvimento</div>} />
        <Route path="/sobre" element={<div>Sobre em desenvolvimento</div>} />
        <Route path="/contato" element={<div>Contato em desenvolvimento</div>} />
      </Routes>
    </div>
  );
}

export default App;