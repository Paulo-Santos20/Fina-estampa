// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CMSProvider } from './contexts/CMSContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import Layout from './components/common/Layout/Layout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute.jsx';

// Páginas
import Home from './pages/Home/Home.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

// Estilos globais
import './styles/globals.css';
import './styles/variables.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CMSProvider>
          <CartProvider>
            <Layout>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Rotas protegidas - requer login */}
                <Route 
                  path="/dashboard/*" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <h1>Meus Pedidos</h1>
                        <p>Página em desenvolvimento...</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <ProtectedRoute>
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <h1>Favoritos</h1>
                        <p>Página em desenvolvimento...</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Rotas protegidas - requer admin */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Página 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </CartProvider>
        </CMSProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;