import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign, 
  FaEye, 
  FaArrowUp,
  FaArrowDown,
  FaBox,
  FaHeart,
  FaSignOutAlt,
  FaCrown,
  FaUserTie,
  FaChartLine,
  FaCalendarAlt,
  FaUser,
  FaHome,
  FaCog,
  FaClipboardList,
  FaTag,
  FaBars,
  FaTimes,
  FaStore,
  FaFileAlt
} from 'react-icons/fa';
import { allProducts } from '../../data/products';

// Importar componentes das páginas
import DashboardHome from './pages/DashboardHome';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PromotionsPage from './pages/PromotionsPage';
import SettingsPage from './pages/SettingsPage';
import FavoritesPage from './pages/FavoritesPage';
import CouponsPage from './pages/CouponsPage';
import ProfilePage from './pages/ProfilePage';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Verificar se usuário está logado
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  // Menu items baseado no tipo de usuário
  const menuItems = useMemo(() => {
    if (user?.type === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
        { id: 'products', label: 'Produtos', icon: <FaBox /> },
        { id: 'orders', label: 'Pedidos', icon: <FaClipboardList /> },
        { id: 'customers', label: 'Clientes', icon: <FaUsers /> },
        { id: 'analytics', label: 'Relatórios', icon: <FaFileAlt /> },
        { id: 'promotions', label: 'Promoções', icon: <FaTag /> },
        { id: 'settings', label: 'Configurações', icon: <FaCog /> }
      ];
    } else {
      return [
        { id: 'dashboard', label: 'Minha Conta', icon: <FaUser /> },
        { id: 'orders', label: 'Meus Pedidos', icon: <FaClipboardList /> },
        { id: 'favorites', label: 'Favoritos', icon: <FaHeart /> },
        { id: 'coupons', label: 'Cupons', icon: <FaTag /> },
        { id: 'profile', label: 'Meu Perfil', icon: <FaCog /> }
      ];
    }
  }, [user]);

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false); // Fechar sidebar no mobile
  };

  // Renderizar conteúdo baseado na seção ativa
  const renderContent = () => {
    const commonProps = { user, timeRange };

    if (user?.type === 'admin') {
      switch (activeSection) {
        case 'dashboard':
          return <DashboardHome {...commonProps} />;
        case 'products':
          return <ProductsPage {...commonProps} />;
        case 'orders':
          return <OrdersPage {...commonProps} />;
        case 'customers':
          return <CustomersPage {...commonProps} />;
        case 'analytics':
          return <AnalyticsPage {...commonProps} />;
        case 'promotions':
          return <PromotionsPage {...commonProps} />;
        case 'settings':
          return <SettingsPage {...commonProps} />;
        default:
          return <DashboardHome {...commonProps} />;
      }
    } else {
      switch (activeSection) {
        case 'dashboard':
          return <DashboardHome {...commonProps} />;
        case 'orders':
          return <OrdersPage {...commonProps} />;
        case 'favorites':
          return <FavoritesPage {...commonProps} />;
        case 'coupons':
          return <CouponsPage {...commonProps} />;
        case 'profile':
          return <ProfilePage {...commonProps} />;
        default:
          return <DashboardHome {...commonProps} />;
      }
    }
  };

  if (!user) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Fina</span>
            <span className={styles.logoAccent}>Estampa</span>
          </div>
          <button 
            className={styles.closeSidebar}
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.id} className={styles.menuItem}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`${styles.menuButton} ${
                    activeSection === item.id ? styles.menuButtonActive : ''
                  }`}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              {user.type === 'admin' ? <FaCrown /> : <FaUserTie />}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userRole}>
                {user.type === 'admin' ? 'Administrador' : 'Cliente'}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={toggleSidebar} />
      )}

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.menuToggle}
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
            <h1 className={styles.pageTitle}>
              {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className={styles.headerRight}>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.timeSelect}
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
            </select>

            <div className={styles.headerActions}>
              <button 
                onClick={handleBackToSite}
                className={styles.actionButton}
                title="Voltar ao site"
              >
                <FaStore />
                <span>Loja</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className={styles.logoutButton}
                title="Sair"
              >
                <FaSignOutAlt />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className={styles.dashboardContent}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;