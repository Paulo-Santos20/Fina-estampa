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
  FaPercent,
  FaUser,
  FaUserShield,
  FaChevronDown,
  FaGlobe
} from 'react-icons/fa';

// IMPORTAR TODOS OS COMPONENTES
import ProductsPage from './components/ProductsPage';
import OrdersPage from './components/OrdersPage';
import CategoriesPage from './components/CategoriesPage';
import CustomersPage from './components/CustomersPage';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import PromotionsPage from './components/PromotionsPage';
import ProfilePage from './components/ProfilePage';
import UsersPage from './components/UsersPage';
import CMSPage from './components/CMSPage';

import styles from './Dashboard.module.css';

// Componente da página inicial do dashboard
const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Produtos Cadastrados', 
      value: '127', 
      icon: FaBoxOpen, 
      color: 'blue',
      onClick: () => navigate('/dashboard/produtos')
    },
    { 
      title: 'Pedidos Hoje', 
      value: '23', 
      icon: FaShoppingBag, 
      color: 'green',
      onClick: () => navigate('/dashboard/pedidos')
    },
    { 
      title: 'Vendas do Mês', 
      value: 'R\$ 15.420', 
      icon: FaChartBar, 
      color: 'purple',
      onClick: () => navigate('/dashboard/relatorios')
    },
    { 
      title: 'Clientes Ativos', 
      value: '89', 
      icon: FaUsers, 
      color: 'orange',
      onClick: () => navigate('/dashboard/clientes')
    }
  ];

  const recentOrders = [
    { id: '#001', customer: 'Maria Silva', total: 'R\$ 189,90', status: 'Pendente', date: '2025-01-08' },
    { id: '#002', customer: 'Ana Costa', total: 'R\$ 299,80', status: 'Confirmado', date: '2025-01-08' },
    { id: '#003', customer: 'Julia Santos', total: 'R\$ 159,90', status: 'Enviado', date: '2025-01-07' },
    { id: '#004', customer: 'Carla Oliveira', total: 'R\$ 89,90', status: 'Entregue', date: '2025-01-07' }
  ];

  const quickActions = [
    { 
      title: 'Novo Produto', 
      description: 'Adicionar produto ao catálogo',
      icon: FaPlus, 
      color: 'blue',
      onClick: () => navigate('/dashboard/produtos')
    },
    { 
      title: 'Ver Pedidos', 
      description: 'Gerenciar pedidos pendentes',
      icon: FaShoppingBag, 
      color: 'green',
      onClick: () => navigate('/dashboard/pedidos')
    },
    { 
      title: 'Nova Promoção', 
      description: 'Criar cupom de desconto',
      icon: FaPercent, 
      color: 'purple',
      onClick: () => navigate('/dashboard/promocoes')
    },
    { 
      title: 'Editar Site', 
      description: 'Gerenciar conteúdo do site',
      icon: FaGlobe, 
      color: 'orange',
      onClick: () => navigate('/dashboard/cms'),
      adminOnly: true
    }
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

  // Filtrar ações rápidas baseado no role do usuário
  const filteredQuickActions = quickActions.filter(action => {
    if (action.adminOnly && user?.role !== 'admin') {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.dashboardHome}>
      {/* Seção de Boas-vindas */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>
            Bem-vinda, {user?.name || 'Administradora'}! 👋
          </h1>
          <p className={styles.welcomeSubtitle}>
            Aqui está um resumo das atividades da sua loja hoje.
          </p>
        </div>
        <div className={styles.welcomeDate}>
          <span>{new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${styles.statCard} ${styles[stat.color]}`}
            onClick={stat.onClick}
          >
            <div className={styles.statIcon}>
              <stat.icon />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.title}</p>
            </div>
            <div className={styles.statArrow}>
              <FaChevronDown />
            </div>
          </div>
        ))}
      </div>

      {/* Ações Rápidas */}
      <div className={styles.quickActionsSection}>
        <h2 className={styles.sectionTitle}>🚀 Ações Rápidas</h2>
        <div className={styles.quickActionsGrid}>
          {filteredQuickActions.map((action, index) => (
            <div 
              key={index} 
              className={`${styles.quickActionCard} ${styles[action.color]}`}
              onClick={action.onClick}
            >
              <div className={styles.quickActionIcon}>
                <action.icon />
              </div>
              <div className={styles.quickActionContent}>
                <h4 className={styles.quickActionTitle}>{action.title}</h4>
                <p className={styles.quickActionDescription}>{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Gráficos */}
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>📈 Vendas dos Últimos 7 Dias</h3>
            <button 
              className={styles.chartBtn}
              onClick={() => navigate('/dashboard/relatorios')}
            >
              Ver Detalhes
            </button>
          </div>
          <div className={styles.chartPlaceholder}>
            <div className={styles.chartMockup}>
              <div className={styles.chartBars}>
                {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
                  <div 
                    key={index} 
                    className={styles.chartBar}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className={styles.chartLabels}>
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => (
                  <span key={index} className={styles.chartLabel}>{day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>🏆 Produtos Mais Vendidos</h3>
            <button 
              className={styles.chartBtn}
              onClick={() => navigate('/dashboard/produtos')}
            >
              Ver Todos
            </button>
          </div>
          <div className={styles.topProducts}>
            <div className={styles.productItem}>
              <div className={styles.productRank}>1</div>
              <div className={styles.productInfo}>
                <span className={styles.productName}>Vestido Florido Verão</span>
                <span className={styles.productSales}>23 vendas</span>
              </div>
              <div className={styles.productValue}>R\$ 2.070</div>
            </div>
            <div className={styles.productItem}>
              <div className={styles.productRank}>2</div>
              <div className={styles.productInfo}>
                <span className={styles.productName}>Blusa de Seda Elegance</span>
                <span className={styles.productSales}>18 vendas</span>
              </div>
              <div className={styles.productValue}>R\$ 1.620</div>
            </div>
            <div className={styles.productItem}>
              <div className={styles.productRank}>3</div>
              <div className={styles.productInfo}>
                <span className={styles.productName}>Calça Jeans Premium</span>
                <span className={styles.productSales}>15 vendas</span>
              </div>
              <div className={styles.productValue}>R\$ 1.350</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pedidos Recentes */}
      <div className={styles.recentOrdersSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>📦 Pedidos Recentes</h3>
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
                  <td className={styles.customerName}>{order.customer}</td>
                  <td className={styles.orderTotal}>{order.total}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.orderDate}>{order.date}</td>
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

      {/* Resumo de Atividades */}
      <div className={styles.activitySummary}>
        <h2 className={styles.sectionTitle}>📊 Resumo de Hoje</h2>
        <div className={styles.activityGrid}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📈</div>
            <div className={styles.activityContent}>
              <span className={styles.activityValue}>+12%</span>
              <span className={styles.activityLabel}>Vendas vs ontem</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>👥</div>
            <div className={styles.activityContent}>
              <span className={styles.activityValue}>5</span>
              <span className={styles.activityLabel}>Novos clientes</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📦</div>
            <div className={styles.activityContent}>
              <span className={styles.activityValue}>18</span>
              <span className={styles.activityLabel}>Pedidos enviados</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>⭐</div>
            <div className={styles.activityContent}>
              <span className={styles.activityValue}>4.8</span>
              <span className={styles.activityLabel}>Avaliação média</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas e Notificações para Admins */}
      {user?.role === 'admin' && (
        <div className={styles.adminAlerts}>
          <h2 className={styles.sectionTitle}>⚠️ Alertas do Sistema</h2>
          <div className={styles.alertsGrid}>
            <div className={styles.alertCard}>
              <div className={styles.alertIcon}>🔧</div>
              <div className={styles.alertContent}>
                <h4 className={styles.alertTitle}>Site Desatualizado</h4>
                <p className={styles.alertText}>
                  Há 3 dias sem atualizar banners da página inicial
                </p>
                <button 
                  className={styles.alertBtn}
                  onClick={() => navigate('/dashboard/cms')}
                >
                  Atualizar Agora
                </button>
              </div>
            </div>

            <div className={styles.alertCard}>
              <div className={styles.alertIcon}>📊</div>
              <div className={styles.alertContent}>
                <h4 className={styles.alertTitle}>Backup Pendente</h4>
                <p className={styles.alertText}>
                  Último backup realizado há 7 dias
                </p>
                <button 
                  className={styles.alertBtn}
                  onClick={() => navigate('/dashboard/configuracoes')}
                >
                  Fazer Backup
                </button>
              </div>
            </div>

            <div className={styles.alertCard}>
              <div className={styles.alertIcon}>👥</div>
              <div className={styles.alertContent}>
                <h4 className={styles.alertTitle}>Novos Usuários</h4>
                <p className={styles.alertText}>
                  2 solicitações de acesso pendentes
                </p>
                <button 
                  className={styles.alertBtn}
                  onClick={() => navigate('/dashboard/usuarios')}
                >
                  Revisar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

  // Menu items do dashboard
  const menuItems = [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard', exact: true },
    { path: '/dashboard/produtos', icon: FaBoxOpen, label: 'Produtos' },
    { path: '/dashboard/pedidos', icon: FaShoppingBag, label: 'Pedidos' },
    { path: '/dashboard/categorias', icon: FaTag, label: 'Categorias' },
    { path: '/dashboard/clientes', icon: FaUsers, label: 'Clientes' },
    { 
      path: '/dashboard/usuarios', 
      icon: FaUserShield, 
      label: 'Usuários',
      adminOnly: true
    },
    { path: '/dashboard/promocoes', icon: FaPercent, label: 'Promoções' },
    { 
      path: '/dashboard/cms', 
      icon: FaGlobe, 
      label: 'Conteúdo do Site',
      adminOnly: true
    },
    { path: '/dashboard/relatorios', icon: FaChartBar, label: 'Relatórios' },
    { path: '/dashboard/configuracoes', icon: FaCog, label: 'Configurações' }
  ];

  // Filtrar menu baseado nas permissões do usuário
  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && user?.role !== 'admin') {
      return false;
    }
    return true;
  });

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
    const currentItem = filteredMenuItems.find(item => 
      isActiveRoute(item.path, item.exact)
    );
    return currentItem?.label || 'Dashboard';
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
          <span className={styles.adminBadge}>
            {user?.role === 'admin' ? 'Admin' : user?.role === 'manager' ? 'Gerente' : 'Usuário'}
          </span>
        </div>

        <nav className={styles.sidebarNav}>
          <ul>
            {filteredMenuItems.map((item) => (
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
          <button 
            onClick={() => navigate('/dashboard/perfil')} 
            className={styles.profileBtn}
          >
            <FaUser />
            <span>Meu Perfil</span>
          </button>
          <button 
            onClick={() => navigate('/')} 
            className={styles.backToSite}
          >
            <FaHome />
            <span>Voltar ao Site</span>
          </button>
          <button 
            onClick={handleLogout} 
            className={styles.logoutBtn}
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
            <h1 className={styles.pageTitle}>
              {getCurrentPageTitle()}
            </h1>
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
                  <span className={styles.userName}>{user?.name || 'Admin'}</span>
                  <span className={styles.userRole}>
                    {user?.role === 'admin' ? 'Administradora' : 
                     user?.role === 'manager' ? 'Gerente' : 'Usuária'}
                  </span>
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
                  {user?.role === 'admin' && (
                    <button 
                      onClick={() => {
                        navigate('/dashboard/cms');
                        setShowUserMenu(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      <FaGlobe /> Editar Site
                    </button>
                  )}
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
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="clientes" element={<CustomersPage />} />
            {user?.role === 'admin' && (
              <>
                <Route path="usuarios" element={<UsersPage />} />
                <Route path="cms" element={<CMSPage />} />
              </>
            )}
            <Route path="promocoes" element={<PromotionsPage />} />
            <Route path="relatorios" element={<AnalyticsPage />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="configuracoes" element={<SettingsPage />} />
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