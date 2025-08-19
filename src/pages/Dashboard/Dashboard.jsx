import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBell,
  FaHome,
  FaTag,
  FaClipboardList,
  FaPercent,
  FaUser,
  FaChevronDown
} from 'react-icons/fa';
import { resetProducts } from '../../utils/resetData';

// IMPORTAR COMPONENTES DAS PÁGINAS
import DashboardHome from './components/DashboardHome';
import ProductsPage from './components/ProductsPage';
import CategoriesPage from './components/CategoriesPage';
import OrdersPage from './components/OrdersPage';
import CustomersPage from './components/CustomersPage';
import PromotionsPage from './components/PromotionsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Verificar se o usuário está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Menu items do dashboard na ordem especificada
  const menuItems = [
    { 
      path: '/dashboard', 
      icon: FaTachometerAlt, 
      label: 'Dashboard', 
      exact: true,
      description: 'Visão geral da loja'
    },
    { 
      path: '/dashboard/produtos', 
      icon: FaBoxOpen, 
      label: 'Produtos',
      description: 'Gerenciar produtos, cores e tamanhos'
    },
    { 
      path: '/dashboard/categorias', 
      icon: FaTag, 
      label: 'Categorias',
      description: 'Organizar categorias e subcategorias'
    },
    { 
      path: '/dashboard/pedidos', 
      icon: FaShoppingBag, 
      label: 'Pedidos',
      description: 'Acompanhar status dos pedidos'
    },
    { 
      path: '/dashboard/clientes', 
      icon: FaUsers, 
      label: 'Clientes',
      description: 'Gerenciar base de clientes'
    },
    { 
      path: '/dashboard/promocoes', 
      icon: FaPercent, 
      label: 'Promoções',
      description: 'Cupons e tags promocionais'
    },
    { 
      path: '/dashboard/relatorios', 
      icon: FaChartBar, 
      label: 'Relatórios',
      description: 'Análises e relatórios de vendas'
    },
    { 
      path: '/dashboard/configuracoes', 
      icon: FaCog, 
      label: 'Configurações',
      description: 'Configurações gerais do sistema'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => 
      isActiveRoute(item.path, item.exact)
    );
    return currentItem?.label || 'Dashboard';
  };

  const getCurrentPageDescription = () => {
    const currentItem = menuItems.find(item => 
      isActiveRoute(item.path, item.exact)
    );
    return currentItem?.description || 'Painel administrativo';
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Fina</span>
            <span className={styles.logoAccent}>Estampa</span>
         {/* Botão temporário para resetar produtos */}
<button 
  onClick={resetProducts}
  style={{
    position: 'fixed',
    top: '10px',
    right: '10px',
    background: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    zIndex: 9999
  }}
>
  🔄 Resetar Produtos
</button>
          </div>
          <div className={styles.adminBadge}>
            <span className={styles.badgeText}>Painel Admin</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.path} className={styles.navListItem}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`${styles.navItem} ${
                    isActiveRoute(item.path, item.exact) ? styles.active : ''
                  }`}
                  title={item.description}
                >
                  <div className={styles.navItemIcon}>
                    <item.icon />
                  </div>
                  <div className={styles.navItemContent}>
                    <span className={styles.navLabel}>{item.label}</span>
                    <span className={styles.navDescription}>{item.description}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <button 
            onClick={() => {
              navigate('/dashboard/perfil');
              setIsSidebarOpen(false);
            }}
            className={styles.footerBtn}
          >
            <FaUser />
            <span>Meu Perfil</span>
          </button>
          <button 
            onClick={() => navigate('/')} 
            className={styles.footerBtn}
          >
            <FaHome />
            <span>Voltar ao Site</span>
          </button>
          <button 
            onClick={handleLogout} 
            className={`${styles.footerBtn} ${styles.logoutBtn}`}
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setIsSidebarOpen(false)}
        />
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
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className={styles.pageInfo}>
              <h1 className={styles.pageTitle}>
                {getCurrentPageTitle()}
              </h1>
              <p className={styles.pageDescription}>
                {getCurrentPageDescription()}
              </p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.notificationBtn}>
              <FaBell />
              <span className={styles.notificationBadge}>3</span>
            </button>
            
            <div className={styles.userMenuContainer}>
              <button 
                className={styles.userMenuBtn}
                onClick={toggleUserMenu}
              >
                <div className={styles.userAvatar}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user?.name || 'Administradora'}</span>
                  <span className={styles.userRole}>Administradora</span>
                </div>
                <FaChevronDown className={styles.userMenuArrow} />
              </button>

              {/* Dropdown do usuário */}
              {showUserMenu && (
                <div className={styles.userDropdown}>
                  <button 
                    onClick={() => {
                      navigate('/dashboard/perfil');
                      setShowUserMenu(false);
                    }}
                    className={styles.dropdownItem}
                  >
                    <FaUser /> Meu Perfil
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/dashboard/configuracoes');
                      setShowUserMenu(false);
                    }}
                    className={styles.dropdownItem}
                  >
                    <FaCog /> Configurações
                  </button>
                  <div className={styles.dropdownDivider}></div>
                  <button 
                    onClick={() => {
                      navigate('/');
                      setShowUserMenu(false);
                    }}
                    className={styles.dropdownItem}
                  >
                    <FaHome /> Voltar ao Site
                  </button>
                  <div className={styles.dropdownDivider}></div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  >
                    <FaSignOutAlt /> Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.pageWrapper}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="produtos" element={<ProductsPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="clientes" element={<CustomersPage />} />
            <Route path="promocoes" element={<PromotionsPage />} />
            <Route path="relatorios" element={<ReportsPage />} />
            <Route path="configuracoes" element={<SettingsPage />} />
            <Route path="perfil" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>

      {/* Overlay para fechar menus */}
      {showUserMenu && (
        <div 
          className={styles.menuOverlay}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;