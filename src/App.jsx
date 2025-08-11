// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CMSProvider } from './contexts/CMSContext.jsx';
import { SettingsProvider } from './contexts/SettingsContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

import Header from './components/common/Header/Header.jsx';
import Footer from './components/common/Footer/Footer.jsx';

// Páginas principais
import Home from './pages/Home/Home.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';

// Autenticação
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard.jsx';

// CMS
import CMSPage from './pages/Admin/Content/CMSPage.jsx';

// Not Found
import NotFound from './pages/NotFound/NotFound.jsx';

// Estilos globais
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <CMSProvider>
        <SettingsProvider>
          <AuthProvider>
            <CartProvider>
              <div className="app">
                <Header />
                
                <main className="main-content">
                  <Routes>
                    {/* Páginas principais */}
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogo" element={<Catalog />} />
                    <Route path="/categoria/:categorySlug" element={<Catalog />} />
                    <Route path="/busca" element={<Catalog />} />
                    <Route path="/produto/:id" element={<Product />} />
                    <Route path="/carrinho" element={<Cart />} />
                    <Route path="/finalizar" element={<Checkout />} />

                    {/* Autenticação */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin/Dashboard */}
                    <Route path="/admin/cms" element={<CMSPage />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                                    </Routes>
                </main>

                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </SettingsProvider>
      </CMSProvider>
    </BrowserRouter>
  );
}

export default App;