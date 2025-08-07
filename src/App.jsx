import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

// Importar componentes de layout comuns
import Header from './components/common/Header/Header.jsx';
import Footer from './components/common/Footer/Footer.jsx';

// Importar páginas principais
import Home from './pages/Home/Home.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';

// Importar páginas de autenticação
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

// Importar dashboard (poderá ser protegida)
import Dashboard from './pages/Dashboard/Dashboard.jsx';

// Importar páginas institucionais
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';

// Importar componente de página não encontrada
import NotFound from './pages/NotFound/NotFound.jsx';

// Componente ProtectedRoute (exemplo - você precisará implementar a lógica de verificação de autenticação)
const ProtectedRoute = ({ children }) => {
  // Lógica de proteção: por exemplo, verificar se o usuário está autenticado
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
};

// Importar estilos globais
import './styles/globals.css';

// Componente para páginas em desenvolvimento (mantido como está, com inline styles)
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

// NOVO COMPONENTE: AppContent
const AppContent = () => {
  const location = useLocation();

  // Verifica se a rota atual é do painel administrativo
  const isAdminRoute = location.pathname.startsWith('/dashboard') ||
                       location.pathname.startsWith('/painel') ||
                       location.pathname.startsWith('/minha-conta');

  // Verifica se a rota atual é de autenticação (login, register, etc.)
  const isAuthRoute = location.pathname.startsWith('/login') ||
                      location.pathname.startsWith('/register') ||
                      location.pathname.startsWith('/cadastro') ||
                      location.pathname.startsWith('/esqueci-senha') ||
                      location.pathname.startsWith('/recuperar-senha');

  // Não renderizar Header e Footer em rotas de admin ou autenticação
  const shouldShowHeaderFooter = !isAdminRoute && !isAuthRoute;

  return (
    <>
      {/* Renderiza o Header SOMENTE se NÃO for uma rota de administrador ou autenticação */}
      {shouldShowHeaderFooter && <Header />}

      {/* Onde as rotas serão renderizadas */}
      <div className="main-content-wrapper">
        <Routes>
          {/* ===== ROTAS PRINCIPAIS ===== */}
          <Route path="/" element={<Home />} />

          {/* Rotas de Catálogo e Busca, ambas apontando para o componente Catalog */}
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/categoria/:categorySlug" element={<Catalog />} />
          <Route path="/busca" element={<Catalog />} />

          <Route path="/produto/:id" element={<Product />} />

          <Route path="/carrinho" element={<Cart />} />
          <Route path="/finalizar" element={<Checkout />} />

          {/* ===== ROTAS DE AUTENTICAÇÃO (SEM HEADER/FOOTER) ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/register" element={<Register />} />

          {/* ===== ROTAS PROTEGIDAS (PAINEL ADMINISTRATIVO - SEM HEADER/FOOTER) ===== */}
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
          <Route path="/pedidos" element={<DevelopmentPage title="Meus Pedidos" icon="📦" description="Acompanhe seus pedidos, histórico de compras e status de entrega. Acesse através do seu painel de usuário." />} />
          <Route path="/favoritos" element={<DevelopmentPage title="Favoritos" icon="❤️" description="Em breve você poderá salvar seus produtos favoritos e acessá-los facilmente! Esta funcionalidade está sendo desenvolvida com muito carinho." />} />

          {/* ===== ROTAS INSTITUCIONAIS ===== */}
          <Route path="/sobre" element={
            <DevelopmentPage
              title="Sobre Nós"
              icon="👗"
              description="Conheça mais sobre a Fina Estampa, nossa história, missão e valores. Estamos preparando uma página especial para você conhecer melhor nossa marca!"
            />
          } />
          <Route path="/contato" element={
            <DevelopmentPage
              title="Contato"
              icon="📞"
              description="Entre em contato conosco! Estamos preparando uma página especial com formulário de contato e todas as formas de nos encontrar."
              showContact={true}
            />
          } />

          {/* ===== ROTAS DE FUNCIONALIDADES EM DESENVOLVIMENTO ===== */}
          <Route path="/lista-desejos" element={<DevelopmentPage title="Lista de Desejos" icon="💝" description="Crie sua lista de desejos e compartilhe com amigos e família! Funcionalidade em desenvolvimento." />} />
          <Route path="/recuperar-senha" element={<DevelopmentPage title="Recuperar Senha" icon="🔑" description="Em breve você poderá recuperar sua senha de forma fácil e segura através do seu email cadastrado!" />} />
          <Route path="/esqueci-senha" element={<DevelopmentPage title="Esqueci a Senha" icon="🔑" description="Em breve você poderá recuperar sua senha de forma fácil e segura através do seu email cadastrado!" />} />
          <Route path="/politica-privacidade" element={<DevelopmentPage title="Política de Privacidade" icon="🔒" description="Sua privacidade é importante para nós. Estamos preparando nossa política de privacidade detalhada." />} />
          <Route path="/termos-uso" element={<DevelopmentPage title="Termos de Uso" icon="📋" description="Conheça nossos termos de uso e condições de compra. Página em desenvolvimento." />} />
          <Route path="/entrega-frete" element={<DevelopmentPage title="Entrega e Frete" icon="🚚" description="Informações sobre prazos de entrega, frete grátis e políticas de envio. Em breve!" />} />
          <Route path="/trocas-devolucoes" element={<DevelopmentPage title="Trocas e Devoluções" icon="🔄" description="Política de trocas, devoluções e garantia. Estamos preparando todas as informações para você." />} />
          <Route path="/promocoes" element={<DevelopmentPage title="Promoções" icon="🔥" description="Não perca nossas promoções especiais! Página de ofertas em desenvolvimento." />} />
          <Route path="/newsletter" element={<DevelopmentPage title="Newsletter" icon="📧" description="Cadastre-se em nossa newsletter e receba novidades, promoções exclusivas e lançamentos!" />} />

          {/* ===== ROTA 404 - SEMPRE A ÚLTIMA ===== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Renderiza o Footer SOMENTE se NÃO for uma rota de administrador ou autenticação */}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

// Componente principal App
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Renderiza o novo componente AppContent, que está dentro do BrowserRouter */}
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;