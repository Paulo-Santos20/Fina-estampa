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
  FaBell,
  FaUserCircle, 
  FaStore, 
  FaPercent, 
  FaUserShield, 
  FaGlobe,
  FaPalette, 
  FaArrowUp, 
  FaArrowDown, 
  FaEye, 
  FaClipboardList,
  FaTag // <--- Adicionado para corrigir o erro
} from 'react-icons/fa';

import styles from './Dashboard.module.css';

// --- COMPONENTES REAIS (Já implementados) ---
import ProductsPage from './components/ProductsPage';
import CategoriesPage from './components/CategoriesPage';
import AttributesPage from './components/AttributesPage';
import OrdersPage from './components/OrdersPage';
import CustomersPage from './components/CustomersPage';
import PromotionsPage from './components/PromotionsPage';
import AnalyticsPage from './components/AnalyticsPage';

// --- COMPONENTES PLACEHOLDER (Para manter o visual enquanto não implementamos) ---
const PlaceholderPage = ({ title, icon: Icon }) => (
  <div style={{ padding: '1rem' }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem', 
      marginBottom: '1rem',
      borderBottom: '1px solid #E5E7EB',
      paddingBottom: '1rem'
    }}>
      {Icon && <Icon style={{ fontSize: '1.5rem', color: '#722F37' }} />}
      <h2 style={{ 
        fontFamily: "'Playfair Display', serif", 
        fontSize: '2rem', 
        color: '#722F37',
        margin: 0 
      }}>{title}</h2>
    </div>
    <div style={{ 
      padding: '4rem', 
      textAlign: 'center', 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      border: '2px dashed #E5E7EB',
      color: '#9CA3AF'
    }}>
      <h3>Módulo em Desenvolvimento</h3>
      <p>Esta funcionalidade estará disponível em breve.</p>
    </div>
  </div>
);

// Definição das páginas usando o Placeholder
const SettingsPage = () => <PlaceholderPage title="Configurações" icon={FaCog} />;
const ProfilePage = () => <PlaceholderPage title="Meu Perfil" icon={FaUserCircle} />;
const UsersPage = () => <PlaceholderPage title="Usuários do Sistema" icon={FaUserShield} />;
const CMSPage = () => <PlaceholderPage title="Editor do Site (CMS)" icon={FaGlobe} />;

// --- COMPONENTE DASHBOARD HOME (Tela Inicial) ---
const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Produtos', 
      value: '127', 
      change: '+12%',
      isPositive: true,
      icon: FaBoxOpen, 
      colorClass: 'blueCard',
      onClick: () => navigate('/dashboard/produtos')
    },
    { 
      title: 'Pedidos Hoje', 
      value: '23', 
      change: '-5%',
      isPositive: false,
      icon: FaShoppingBag, 
      colorClass: 'greenCard',
      onClick: () => navigate('/dashboard/pedidos')
    },
    { 
      title: 'Receita Mensal', 
      value: 'R$ 15.420', 
      change: '+28%',
      isPositive: true,
      icon: FaChartBar, 
      colorClass: 'purpleCard',
      onClick: () => navigate('/dashboard/relatorios')
    },
    { 
      title: 'Clientes', 
      value: '89', 
      change: '+4',
      isPositive: true,
      icon: FaUsers, 
      colorClass: 'orangeCard',
      onClick: () => navigate('/dashboard/clientes')
    }
  ];

  const recentOrders = [
    { id: '#1001', customer: 'Maria Silva', total: 'R$ 189,90', status: 'Pendente', date: 'Hoje, 14:30', items: 2 },
    { id: '#1002', customer: 'Ana Costa', total: 'R$ 299,80', status: 'Pago', date: 'Hoje, 10:15', items: 1 },
    { id: '#1003', customer: 'Julia Santos', total: 'R$ 159,90', status: 'Enviado', date: 'Ontem', items: 3 },
    { id: '#1004', customer: 'Carla Oliveira', total: 'R$ 89,90', status: 'Entregue', date: '07/01/2026', items: 1 },
    { id: '#1005', customer: 'Roberto Dias', total: 'R$ 450,00', status: 'Cancelado', date: '06/01/2026', items: 4 }
  ];

  const quickActions = [
    { title: 'Novo Produto', description: 'Add ao catálogo', icon: FaPlus, color: 'actionBlue', onClick: () => navigate('/dashboard/produtos') },
    { title: 'Ver Pedidos', description: 'Gerenciar pendências', icon: FaClipboardList, color: 'actionGreen', onClick: () => navigate('/dashboard/pedidos') },
    { title: 'Cupom', description: 'Criar desconto', icon: FaPercent, color: 'actionOrange', onClick: () => navigate('/dashboard/promocoes') },
    { title: 'Editar Site', description: 'Banners e vitrine', icon: FaGlobe, color: 'actionWine', onClick: () => navigate('/dashboard/cms'), adminOnly: true }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente': return styles.badgePending;
      case 'Pago': return styles.badgePaid;
      case 'Enviado': return styles.badgeShipped;
      case 'Entregue': return styles.badgeDelivered;
      case 'Cancelado': return styles.badgeCancelled;
      default: return styles.badgeDefault;
    }
  };

  const filteredQuickActions = quickActions.filter(action => 
    !action.adminOnly || user?.role === 'admin'
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.pageTitle}>Olá, {user?.name?.split(' ')[0] || 'Gestor'}!</h1>
          <p className={styles.pageSubtitle}>Aqui está o panorama da sua loja hoje.</p>
        </div>
        <div className={styles.dateBadge}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={`${styles.statCard} ${styles[stat.colorClass]}`} onClick={stat.onClick}>
            <div className={styles.statInfo}>
              <span className={styles.statTitle}>{stat.title}</span>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <span className={`${styles.statChange} ${stat.isPositive ? styles.positive : styles.negative}`}>
                {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />} {stat.change}
              </span>
            </div>
            <div className={styles.statIconWrapper}>
              <stat.icon />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Pedidos Recentes</h3>
              <button className={styles.linkBtn} onClick={() => navigate('/dashboard/pedidos')}>Ver todos</button>
            </div>
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className={styles.tdId}>{order.id}</td>
                      <td>
                        <div className={styles.customerCell}>
                          <div className={styles.avatarPlaceholder}>{order.customer.charAt(0)}</div>
                          <div>
                            <span className={styles.customerName}>{order.customer}</span>
                            <span className={styles.itemCount}>{order.items} itens</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.tdDate}>{order.date}</td>
                      <td className={styles.tdTotal}>{order.total}</td>
                      <td><span className={`${styles.badge} ${getStatusClass(order.status)}`}>{order.status}</span></td>
                      <td>
                        <button className={styles.iconActionBtn}><FaEye /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Acesso Rápido</h3>
            </div>
            <div className={styles.quickActionsList}>
              {filteredQuickActions.map((action, index) => (
                <button key={index} className={styles.quickActionBtn} onClick={action.onClick}>
                  <div className={`${styles.quickActionIconBox} ${styles[action.color]}`}>
                    <action.icon />
                  </div>
                  <div className={styles.quickActionInfo}>
                    <span className={styles.quickActionTitle}>{action.title}</span>
                    <span className={styles.quickActionDesc}>{action.description}</span>
                  </div>
                  <FaClipboardList className={styles.quickActionArrow} style={{transform: 'rotate(-90deg)', opacity: 0.5}}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LAYOUT PRINCIPAL DO DASHBOARD ---
const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const menuItems = [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Visão Geral', exact: true },
    { section: 'Catálogo' },
    { path: '/dashboard/produtos', icon: FaBoxOpen, label: 'Produtos' },
    { path: '/dashboard/categorias', icon: FaTag, label: 'Categorias' },
    { path: '/dashboard/attributes', icon: FaPalette, label: 'Atributos' },
    { section: 'Vendas' },
    { path: '/dashboard/pedidos', icon: FaShoppingBag, label: 'Pedidos' },
    { path: '/dashboard/clientes', icon: FaUsers, label: 'Clientes' },
    { path: '/dashboard/promocoes', icon: FaPercent, label: 'Promoções' },
    { section: 'Sistema' },
    { path: '/dashboard/relatorios', icon: FaChartBar, label: 'Relatórios' },
    { path: '/dashboard/cms', icon: FaGlobe, label: 'Editor do Site', adminOnly: true },
    { path: '/dashboard/usuarios', icon: FaUserShield, label: 'Usuários', adminOnly: true },
    { path: '/dashboard/configuracoes', icon: FaCog, label: 'Configurações' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  const activeRoute = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className={styles.dashboardLayout}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>Fina Estampa<span className={styles.dot}>.</span></div>
          {isMobile && <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}><FaTimes /></button>}
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.userSnippet}>
            <div className={styles.userAvatar}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user?.name || 'Admin'}</span>
              <span className={styles.userRole}>{user?.role === 'admin' ? 'Administrador' : 'Gerente'}</span>
            </div>
          </div>

          <nav className={styles.navMenu}>
            {menuItems.map((item, idx) => {
              if (item.adminOnly && user?.role !== 'admin') return null;
              
              if (item.section) {
                return <span key={idx} className={styles.menuSectionLabel}>{item.section}</span>;
              }

              return (
                <button
                  key={idx}
                  className={`${styles.menuItem} ${activeRoute(item.path, item.exact) ? styles.active : ''}`}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                >
                  <item.icon className={styles.menuIcon} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt /> Sair do Sistema
          </button>
        </div>
      </aside>

      {isMobile && isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />}

      <div className={styles.mainWrapper}>
        <header className={styles.topbar}>
          <button className={styles.toggleBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </button>
          
          <div className={styles.topbarRight}>
            <button className={styles.iconBtn} title="Ver Loja" onClick={() => window.open('/', '_blank')}>
              <FaStore />
            </button>
            <button className={styles.iconBtn}>
              <FaBell />
              <span className={styles.badge}>3</span>
            </button>
            <button className={styles.profileBtn} onClick={() => navigate('/dashboard/perfil')}>
              <FaUserCircle />
            </button>
          </div>
        </header>

        <div className={styles.contentArea}>
          <Routes>
            <Route index element={<DashboardHome />} />
            
            {/* Componentes Reais */}
            <Route path="produtos" element={<ProductsPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            
            {/* Componentes Placeholder (Para as demais rotas funcionarem) */}
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="attributes" element={<AttributesPage />} />
            <Route path="clientes" element={<CustomersPage />} />
            <Route path="promocoes" element={<PromotionsPage />} />
            <Route path="relatorios" element={<AnalyticsPage />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="configuracoes" element={<SettingsPage />} />
            <Route path="usuarios" element={<UsersPage />} />
            <Route path="cms" element={<CMSPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;