import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';

function App() {
  console.log('🚀 App.jsx carregado');
  
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Rota dinâmica para categorias - CORRIGIDA */}
          <Route 
            path="/categoria/:categorySlug" 
            element={<Category />} 
          />
          
          {/* Outras rotas */}
          <Route path="/produto/:productId" element={<Product />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido-enviado" element={<OrderSuccess />} />
          <Route path="/contato" element={<Contact />} />
          
          {/* Página 404 - deve ser a última rota */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;