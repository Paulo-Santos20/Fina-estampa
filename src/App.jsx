import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

// Importar páginas principais
import Home from './pages/Home/Home.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';

// Importar páginas de autenticação
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

// Importar dashboard
import Dashboard from './pages/Dashboard/Dashboard.jsx';

// Importar páginas institucionais
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';

// Importar componente de página não encontrada
import NotFound from './pages/NotFound/NotFound.jsx';

// Importar estilos globais
import './styles/globals.css';

// Componente para páginas em desenvolvimento
const DevelopmentPage = ({ title, icon, description, showContact = false }) => (
  <div style={{ 
    padding: '4rem 2rem', 
    textAlign: 'center',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'var(--cinza-claro)'
  }}>
    <h1 style={{ 
      fontSize: '2.5rem', 
      color: 'var(--wine-destaque)', 
      marginBottom: '1rem',
      fontFamily: 'Playfair Display, serif'
    }}>
      {icon} {title}
    </h1>
    <h2 style={{ 
      fontSize: '1.5rem', 
      color: 'var(--preto-secundario)', 
      marginBottom: '1rem',
      fontWeight: '600'
    }}>
      Página em desenvolvimento
    </h2>
    <p style={{ 
      color: 'var(--cinza-medio)', 
      marginBottom: '2rem', 
      maxWidth: '500px', 
      lineHeight: '1.6',
      fontSize: '1.1rem'
    }}>
      {description}
    </p>

    {showContact && (
      <div style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'var(--white-principal)',
        borderRadius: 'var(--radius-medium)',
        boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)'
      }}>
        <h3 style={{ 
          color: 'var(--wine-destaque)', 
          marginBottom: '1rem',
          fontSize: '1.2rem'
        }}>
          Entre em contato conosco:
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ 
            color: 'var(--preto-secundario)', 
            fontWeight: '600', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            📱 WhatsApp: (11) 99999-9999
          </p>
          <p style={{ 
            color: 'var(--preto-secundario)', 
            fontWeight: '600', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            📧 Email: contato@finaestampa.com.br
          </p>
          <p style={{ 
            color: 'var(--preto-secundario)', 
            fontWeight: '600', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            📍 São Paulo - SP
          </p>
        </div>
      </div>
    )}

    <div style={{ 
      display: 'flex', 
      gap: '1rem', 
      flexWrap: 'wrap', 
      justifyContent: 'center' 
    }}>
      <a href="/" style={{ 
        background: 'var(--wine-destaque)', 
        color: 'var(--white-principal)', 
        padding: '1rem 2rem', 
        textDecoration: 'none', 
        borderRadius: 'var(--radius-medium)',
        fontWeight: '600',
        transition: 'all var(--transition-normal)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🏠 Página Inicial
      </a>
      <a href="/catalog" style={{ 
        background: 'transparent', 
        color: 'var(--wine-destaque)', 
        padding: '1rem 2rem', 
        textDecoration: 'none', 
        borderRadius: 'var(--radius-medium)',
        fontWeight: '600',
        border: '2px solid var(--wine-destaque)',
        transition: 'all var(--transition-normal)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🛍️ Ver Produtos
      </a>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Routes>
              {/* ===== ROTAS PRINCIPAIS ===== */}
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/produto/:id" element={<Product />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/finalizar" element={<Checkout />} />

              {/* ===== ROTAS DE BUSCA E CATEGORIA ===== */}
              <Route path="/busca" element={<Catalog />} />
              <Route path="/search" element={<Catalog />} />
              <Route path="/categoria/:categoria" element={<Catalog />} />
              <Route path="/category/:categoria" element={<Catalog />} />

              {/* ===== ROTAS DE AUTENTICAÇÃO ===== */}
              <Route path="/login" element={<Login />} />
              <Route path="/entrar" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cadastro" element={<Register />} />

              {/* ===== ROTAS PROTEGIDAS ===== */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/painel" element={<Dashboard />} />
              <Route path="/conta" element={<Dashboard />} />
              <Route path="/minha-conta" element={<Dashboard />} />

              {/* ===== ROTAS INSTITUCIONAIS ===== */}
              <Route path="/about" element={<About />} />
              <Route path="/sobre" element={
                <DevelopmentPage 
                  title="Sobre Nós"
                  icon="👗"
                  description="Conheça mais sobre a Fina Estampa, nossa história, missão e valores. Estamos preparando uma página especial para você conhecer melhor nossa marca!"
                />
              } />

              <Route path="/contact" element={<Contact />} />
              <Route path="/contato" element={
                <DevelopmentPage 
                  title="Contato"
                  icon="📞"
                  description="Entre em contato conosco! Estamos preparando uma página especial com formulário de contato e todas as formas de nos encontrar."
                  showContact={true}
                />
              } />

              {/* ===== ROTAS DE FUNCIONALIDADES ===== */}
              <Route path="/favorites" element={
                <DevelopmentPage 
                  title="Favoritos"
                  icon="❤️"
                  description="Em breve você poderá salvar seus produtos favoritos e acessá-los facilmente! Esta funcionalidade está sendo desenvolvida com muito carinho."
                />
              } />
              <Route path="/favoritos" element={
                <DevelopmentPage 
                  title="Favoritos"
                  icon="❤️"
                  description="Em breve você poderá salvar seus produtos favoritos e acessá-los facilmente! Esta funcionalidade está sendo desenvolvida com muito carinho."
                />
              } />

              <Route path="/wishlist" element={
                <DevelopmentPage 
                  title="Lista de Desejos"
                  icon="💝"
                  description="Crie sua lista de desejos e compartilhe com amigos e família! Funcionalidade em desenvolvimento."
                />
              } />

              <Route path="/orders" element={
                <DevelopmentPage 
                  title="Meus Pedidos"
                  icon="📦"
                  description="Acompanhe seus pedidos, histórico de compras e status de entrega. Acesse através do seu painel de usuário."
                />
              } />
              <Route path="/pedidos" element={
                <DevelopmentPage 
                  title="Meus Pedidos"
                  icon="📦"
                  description="Acompanhe seus pedidos, histórico de compras e status de entrega. Acesse através do seu painel de usuário."
                />
              } />

              {/* ===== ROTAS DE RECUPERAÇÃO ===== */}
              <Route path="/forgot-password" element={
                <DevelopmentPage 
                  title="Recuperar Senha"
                  icon="🔑"
                  description="Em breve você poderá recuperar sua senha de forma fácil e segura através do seu email cadastrado!"
                />
              } />
              <Route path="/esqueci-senha" element={
                <DevelopmentPage 
                  title="Recuperar Senha"
                  icon="🔑"
                  description="Em breve você poderá recuperar sua senha de forma fácil e segura através do seu email cadastrado!"
                />
              } />

              {/* ===== ROTAS DE POLÍTICAS ===== */}
              <Route path="/privacy" element={
                <DevelopmentPage 
                  title="Política de Privacidade"
                  icon="🔒"
                  description="Sua privacidade é importante para nós. Estamos preparando nossa política de privacidade detalhada."
                />
              } />
              <Route path="/privacidade" element={
                <DevelopmentPage 
                  title="Política de Privacidade"
                  icon="🔒"
                  description="Sua privacidade é importante para nós. Estamos preparando nossa política de privacidade detalhada."
                />
              } />

              <Route path="/terms" element={
                <DevelopmentPage 
                  title="Termos de Uso"
                  icon="📋"
                  description="Conheça nossos termos de uso e condições de compra. Página em desenvolvimento."
                />
              } />
              <Route path="/termos" element={
                <DevelopmentPage 
                  title="Termos de Uso"
                  icon="📋"
                  description="Conheça nossos termos de uso e condições de compra. Página em desenvolvimento."
                />
              } />

              <Route path="/shipping" element={
                <DevelopmentPage 
                  title="Entrega e Frete"
                  icon="🚚"
                  description="Informações sobre prazos de entrega, frete grátis e políticas de envio. Em breve!"
                />
              } />
              <Route path="/entrega" element={
                <DevelopmentPage 
                  title="Entrega e Frete"
                  icon="🚚"
                  description="Informações sobre prazos de entrega, frete grátis e políticas de envio. Em breve!"
                />
              } />

              <Route path="/returns" element={
                <DevelopmentPage 
                  title="Trocas e Devoluções"
                  icon="🔄"
                  description="Política de trocas, devoluções e garantia. Estamos preparando todas as informações para você."
                />
              } />
              <Route path="/trocas" element={
                <DevelopmentPage 
                  title="Trocas e Devoluções"
                  icon="🔄"
                  description="Política de trocas, devoluções e garantia. Estamos preparando todas as informações para você."
                />
              } />

              {/* ===== ROTAS DE PROMOÇÕES ===== */}
              <Route path="/sale" element={
                <DevelopmentPage 
                  title="Promoções"
                  icon="🔥"
                  description="Não perca nossas promoções especiais! Página de ofertas em desenvolvimento."
                />
              } />
              <Route path="/promocoes" element={
                <DevelopmentPage 
                  title="Promoções"
                  icon="🔥"
                  description="Não perca nossas promoções especiais! Página de ofertas em desenvolvimento."
                />
              } />

              <Route path="/newsletter" element={
                <DevelopmentPage 
                  title="Newsletter"
                  icon="📧"
                  description="Cadastre-se em nossa newsletter e receba novidades, promoções exclusivas e lançamentos!"
                />
              } />

              {/* ===== ROTA 404 ===== */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;