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
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload,
  FaUserCircle,
  FaBell,
  FaHome,
  FaTag,
  FaImages,
  FaClipboardList,
  FaEnvelope,
  FaStore,
  FaPercent
} from 'react-icons/fa';

// IMPORTAR TODOS OS COMPONENTES
import ProductsPage from './components/ProductsPage';
import OrdersPage from './components/OrdersPage';
import CategoriesPage from './components/CategoriesPage';
import CustomersPage from './components/CustomersPage';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import PromotionsPage from './components/PromotionsPage';

import styles from './Dashboard.module.css';

// Componente da página inicial do dashboard
const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'Produtos Cadastrados', value: '127', icon: FaBoxOpen, color: 'blue' },
    { title: 'Pedidos Hoje', value: '23', icon: FaShoppingBag, color: 'green' },
    { title: 'Vendas do Mês', value: 'R\$ 15.420', icon: FaChartBar, color: 'purple' },
    { title: 'Clientes Ativos', value: '89', icon: FaUsers, color: 'orange' }
  ];

  const recentOrders = [
    { id: '#001', customer: 'Maria Silva', total: 'R\$ 189,90', status: 'Pendente', date: '2025-01-08' },
    { id: '#002', customer: 'Ana Costa', total: 'R\$ 299,80', status: 'Confirmado', date: '2025-01-08' },
    { id: '#003', customer: 'Julia Santos', total: 'R\$ 159,90', status: 'Enviado', date: '2025-01-07' },
    { id: '#004', customer: 'Carla Oliveira', total: 'R\$ 89,90', status: 'Entregue', date: '2025-01-07' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente': return styles.statusPending;
      case 'Confirmado': return styles.statusConfirmed;
      case 'Enviado': return styles.statusShipped;
      case 'Entregue': return styles.statusDelivered;
      default: return '';
    }
  };

  return (
    <div className={styles.dashboardHome}>
      <div className={styles.welcomeSection}>
        <h1>Bem-vinda, {user?.name || 'Administradora'}! 👋</h1>
        <p>Aqui está um resumo das atividades da sua loja hoje.</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
            <div className={styles.statIcon}>
              <stat.icon />
            </div>
            <div className={styles.statContent}>
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h3>Vendas dos Últimos 7 Dias</h3>
          <div className={styles.chartPlaceholder}>
            <p>📊 Gráfico de vendas será implementado aqui</p>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3>Produtos Mais Vendidos</h3>
          <div className={styles.topProducts}>
            <div className={styles.productItem}>
              <span>1. Vestido Florido Verão</span>
              <span>23 vendas</span>
            </div>
            <div className={styles.productItem}>
              <span>2. Blusa de Seda Elegance</span>
              <span>18 vendas</span>
            </div>
            <div className={styles.productItem}>
              <span>3. Calça Jeans Premium</span>
              <span>15 vendas</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recentOrdersSection}>
        <div className={styles.sectionHeader}>
          <h3>Pedidos Recentes</h3>
          <button 
            className={styles.viewAllBtn}
            onClick={() => navigate('/dashboard/pedidos')}
          >
            Ver Todos
          </button>
        </div>
        <div className={styles.ordersTable}>
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderId}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td className={styles.orderTotal}>{order.total}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.actionBtn} title="Ver detalhes">
                        <FaEye />
                      </button>
                      <button className={styles.actionBtn} title="Editar">
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Verificar se o usuário está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Menu items do dashboard
  const menuItems = [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard', exact: true },
    { path: '/dashboard/produtos', icon: FaBoxOpen, label: 'Produtos' },
    { path: '/dashboard/pedidos', icon: FaShoppingBag, label: 'Pedidos' },
    { path: '/dashboard/categorias', icon: FaTag, label: 'Categorias' },
    { path: '/dashboard/clientes', icon: FaUsers, label: 'Clientes' },
    { path: '/dashboard/promocoes', icon: FaPercent, label: 'Promoções' },
    { path: '/dashboard/relatorios', icon: FaChartBar, label: 'Relatórios' },
    { path: '/dashboard/configuracoes', icon: FaCog, label: 'Configurações' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
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
          </div>
          <span className={styles.adminBadge}>Admin</span>
        </div>

        <nav className={styles.sidebarNav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`${styles.navItem} ${
                    isActiveRoute(item.path, item.exact) ? styles.active : ''
                  }`}
                >
                  <item.icon className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={() => navigate('/')} className={styles.backToSite}>
            <FaHome />
            <span>Voltar ao Site</span>
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
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
            <h1 className={styles.pageTitle}>
              {menuItems.find(item => isActiveRoute(item.path, item.exact))?.label || 'Dashboard'}
            </h1>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.notificationBtn}>
              <FaBell />
              <span className={styles.notificationBadge}>3</span>
            </button>
            
            <div className={styles.userMenu}>
              <FaUserCircle className={styles.userAvatar} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user?.name || 'Admin'}</span>
                <span className={styles.userRole}>Administradora</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.pageWrapper}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="produtos" element={<ProductsPage />} />
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="clientes" element={<CustomersPage />} />
            <Route path="promocoes" element={<PromotionsPage />} />
            <Route path="relatorios" element={<AnalyticsPage />} />
            <Route path="configuracoes" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;