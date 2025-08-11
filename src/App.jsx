import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// ✅ IMPORTS CORRETOS - cada Provider do seu respectivo arquivo
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { SettingsProvider } from './contexts/SettingsContext.jsx'; // ✅ SettingsProvider vem do SettingsContext

// Componentes de layout
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

// Not Found
import NotFound from './pages/NotFound/NotFound.jsx';

// Estilos globais
import './styles/globals.css';

// Componente para scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Páginas em desenvolvimento (mantendo suas)
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
      <a href="/catalogo" style={{
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

// Rota protegida simples
const ProtectedRoute = ({ children }) => {
  // Quando implementar autenticação real:
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Conteúdo principal
const AppContent = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/painel') ||
    location.pathname.startsWith('/minha-conta') ||
    location.pathname.startsWith('/admin');

  const isAuthRoute = location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/cadastro') ||
    location.pathname.startsWith('/esqueci-senha') ||
    location.pathname.startsWith('/recuperar-senha');

  const shouldShowHeaderFooter = !isAdminRoute && !isAuthRoute;

  return (
    <>
      <ScrollToTop />
      
      {shouldShowHeaderFooter && <Header />}

      <div className="main-content-wrapper">
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
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/painel/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/minha-conta/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Institucionais */}
          <Route
            path="/sobre"
            element={
              <DevelopmentPage
                title="Sobre Nós"
                icon="👗"
                description="Conheça mais sobre a Fina Estampa, nossa história, missão e valores."
              />
            }
          />
          <Route
            path="/contato"
            element={
              <DevelopmentPage
                title="Contato"
                icon="📞"
                description="Entre em contato conosco! Em breve um formulário completo."
                showContact={true}
              />
            }
          />

          {/* Outras páginas */}
          <Route path="/lista-desejos" element={<DevelopmentPage title="Lista de Desejos" icon="💝" description="Em breve você poderá salvar seus produtos favoritos." />} />
          <Route path="/recuperar-senha" element={<DevelopmentPage title="Recuperar Senha" icon="🔑" description="Recupere sua senha de forma fácil e segura." />} />
          <Route path="/esqueci-senha" element={<DevelopmentPage title="Esqueci a Senha" icon="🔑" description="Recupere sua senha de forma fácil e segura." />} />
          <Route path="/politica-privacidade" element={<DevelopmentPage title="Política de Privacidade" icon="🔒" description="Sua privacidade é importante para nós." />} />
          <Route path="/termos-uso" element={<DevelopmentPage title="Termos de Uso" icon="📋" description="Conheça nossos termos e condições." />} />
          <Route path="/entrega-frete" element={<DevelopmentPage title="Entrega e Frete" icon="🚚" description="Prazos de entrega e políticas de envio." />} />
          <Route path="/trocas-devolucoes" element={<DevelopmentPage title="Trocas e Devoluções" icon="🔄" description="Política de trocas, devoluções e garantia." />} />
          <Route path="/promocoes" element={<DevelopmentPage title="Promoções" icon="🔥" description="Não perca nossas promoções especiais!" />} />
          <Route path="/newsletter" element={<DevelopmentPage title="Newsletter" icon="📧" description="Cadastre-se e receba novidades e ofertas." />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* ✅ ORDEM CORRETA DOS PROVIDERS */}
      <SettingsProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;