import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Search from './pages/Search/Search';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<Product />} />
            <Route path="/busca" element={<Search />} />
            <Route path="/categoria/:categoria" element={<div>Categoria em desenvolvimento</div>} />
            <Route path="/login" element={<div>Login em desenvolvimento</div>} />
            <Route path="/favoritos" element={<div>Favoritos em desenvolvimento</div>} />
            <Route path="/sobre" element={<div>Sobre em desenvolvimento</div>} />
            <Route path="/contato" element={<div>Contato em desenvolvimento</div>} />
            {/* Rota 404 */}
            <Route path="*" element={
              <div style={{ 
                padding: '4rem 2rem', 
                textAlign: 'center',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <h1 style={{ fontSize: '3rem', color: '#722F37', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ fontSize: '1.5rem', color: '#000', marginBottom: '1rem' }}>Página não encontrada</h2>
                <p style={{ color: '#6C757D', marginBottom: '2rem' }}>A página que você está procurando não existe.</p>
                <a href="/" style={{ 
                  background: '#722F37', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  textDecoration: 'none', 
                  borderRadius: '8px',
                  fontWeight: '600'
                }}>
                  Voltar ao Início
                </a>
              </div>
            } />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;