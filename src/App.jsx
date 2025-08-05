import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Search from './pages/Search/Search';
import Category from './pages/Category/Category';
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
            <Route path="/categoria/:categoria" element={<Category />} />
            <Route path="/login" element={
              <div style={{ 
                padding: '4rem 2rem', 
                textAlign: 'center',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#F8F9FA'
              }}>
                <h1 style={{ fontSize: '2.5rem', color: '#722F37', marginBottom: '1rem' }}>🔐 Login</h1>
                <h2 style={{ fontSize: '1.5rem', color: '#000', marginBottom: '1rem' }}>Página em desenvolvimento</h2>
                <p style={{ color: '#6C757D', marginBottom: '2rem', maxWidth: '400px', lineHeight: '1.6' }}>
                  Estamos trabalhando na página de login. Em breve você poderá acessar sua conta!
                </p>
                <a href="/" style={{ 
                  background: '#722F37', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  textDecoration: 'none', 
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>
                  Voltar ao Início
                </a>
              </div>
            } />
            <Route path="/favoritos" element={
              <div style={{ 
                padding: '4rem 2rem', 
                textAlign: 'center',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#F8F9FA'
              }}>
                <h1 style={{ fontSize: '2.5rem', color: '#722F37', marginBottom: '1rem' }}>❤️ Favoritos</h1>
                <h2 style={{ fontSize: '1.5rem', color: '#000', marginBottom: '1rem' }}>Página em desenvolvimento</h2>
                <p style={{ color: '#6C757D', marginBottom: '2rem', maxWidth: '400px', lineHeight: '1.6' }}>
                  Em breve você poderá salvar seus produtos favoritos e acessá-los facilmente!
                </p>
                <a href="/" style={{ 
                  background: '#722F37', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  textDecoration: 'none', 
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>
                  Voltar ao Início
                </a>
              </div>
            } />
            <Route path="/sobre" element={
              <div style={{ 
                padding: '4rem 2rem', 
                textAlign: 'center',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#F8F9FA'
              }}>
                <h1 style={{ fontSize: '2.5rem', color: '#722F37', marginBottom: '1rem' }}>👗 Sobre Nós</h1>
                <h2 style={{ fontSize: '1.5rem', color: '#000', marginBottom: '1rem' }}>Página em desenvolvimento</h2>
                <p style={{ color: '#6C757D', marginBottom: '2rem', maxWidth: '400px', lineHeight: '1.6' }}>
                  Conheça mais sobre a Fina Estampa, nossa história e nossos valores. Página em construção!
                </p>
                <a href="/" style={{ 
                  background: '#722F37', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  textDecoration: 'none', 
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>
                  Voltar ao Início
                </a>
              </div>
            } />
            <Route path="/contato" element={
              <div style={{ 
                padding: '4rem 2rem', 
                textAlign: 'center',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#F8F9FA'
              }}>
                <h1 style={{ fontSize: '2.5rem', color: '#722F37', marginBottom: '1rem' }}>📞 Contato</h1>
                <h2 style={{ fontSize: '1.5rem', color: '#000', marginBottom: '1rem' }}>Página em desenvolvimento</h2>
                <p style={{ color: '#6C757D', marginBottom: '2rem', maxWidth: '400px', lineHeight: '1.6' }}>
                  Entre em contato conosco! Estamos preparando uma página especial para você nos encontrar.
                </p>
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ color: '#722F37', fontWeight: '600', marginBottom: '0.5rem' }}>
                    📱 WhatsApp: (11) 99999-9999
                  </p>
                  <p style={{ color: '#722F37', fontWeight: '600', marginBottom: '0.5rem' }}>
                    📧 Email: contato@finaestampa.com.br
                  </p>
                  <p style={{ color: '#722F37', fontWeight: '600' }}>
                    📍 São Paulo - SP
                  </p>
                </div>
                <a href="/" style={{ 
                  background: '#722F37', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  textDecoration: 'none', 
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>
                  Voltar ao Início
                </a>
              </div>
            } />
            {/* Rota 404 */}
            <Route path="*" element={
              <div style={{ 
                padding: '4rem 2rem', 
                textAlign: 'center',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#F8F9FA'
              }}>
                <h1 style={{ fontSize: '4rem', color: '#722F37', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ fontSize: '1.8rem', color: '#000', marginBottom: '1rem' }}>Página não encontrada</h2>
                <p style={{ color: '#6C757D', marginBottom: '2rem', maxWidth: '400px', lineHeight: '1.6' }}>
                  Ops! A página que você está procurando não existe ou foi movida.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href="/" style={{ 
                    background: '#722F37', 
                    color: 'white', 
                    padding: '1rem 2rem', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}>
                    🏠 Página Inicial
                  </a>
                  <a href="/busca" style={{ 
                    background: 'transparent', 
                    color: '#722F37', 
                    padding: '1rem 2rem', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontWeight: '600',
                    border: '2px solid #722F37',
                    transition: 'all 0.3s ease'
                  }}>
                    🔍 Buscar Produtos
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;