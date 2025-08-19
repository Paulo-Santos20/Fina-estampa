import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  FaBoxOpen,
  FaShoppingBag,
  FaChartLine,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa';
import styles from './DashboardHome.module.css';

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizar horário a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Dados simulados (em produção viriam de APIs)
  const stats = [
    { 
      title: 'Produtos Cadastrados', 
      value: '127', 
      change: '+5',
      changeType: 'increase',
      icon: FaBoxOpen, 
      color: 'blue',
      onClick: () => navigate('/dashboard/produtos')
    },
    { 
      title: 'Pedidos Hoje', 
      value: '23', 
      change: '+12',
      changeType: 'increase',
      icon: FaShoppingBag, 
      color: 'green',
      onClick: () => navigate('/dashboard/pedidos')
    },
    { 
      title: 'Vendas do Mês', 
      value: 'R$ 15.420', 
      change: '+8%',
      changeType: 'increase',
      icon: FaChartLine, 
      color: 'purple',
      onClick: () => navigate('/dashboard/relatorios')
    },
    { 
      title: 'Clientes', 
      value: '89', 
      change: '+3',
      changeType: 'increase',
      icon: FaUsers, 
      color: 'orange',
      onClick: () => navigate('/dashboard/clientes')
    }
  ];

  // Dados do gráfico de vendas (últimos 30 dias)
  const salesData = [
    { day: 1, sales: 450 },
    { day: 2, sales: 520 },
    { day: 3, sales: 380 },
    { day: 4, sales: 650 },
    { day: 5, sales: 720 },
    { day: 6, sales: 890 },
    { day: 7, sales: 1200 },
    { day: 8, sales: 980 },
    { day: 9, sales: 1150 },
    { day: 10, sales: 1050 },
    { day: 11, sales: 920 },
    { day: 12, sales: 1380 },
    { day: 13, sales: 1520 },
    { day: 14, sales: 1650 },
    { day: 15, sales: 1420 },
    { day: 16, sales: 1780 },
    { day: 17, sales: 1950 },
    { day: 18, sales: 1680 },
    { day: 19, sales: 1850 },
    { day: 20, sales: 2100 },
    { day: 21, sales: 2350 },
    { day: 22, sales: 2180 },
    { day: 23, sales: 2450 },
    { day: 24, sales: 2620 },
    { day: 25, sales: 2380 },
    { day: 26, sales: 2750 },
    { day: 27, sales: 2980 },
    { day: 28, sales: 2650 },
    { day: 29, sales: 2890 },
    { day: 30, sales: 3100 }
  ];

  // Produtos mais vendidos
  const topProducts = [
    { 
      id: 1, 
      name: 'Vestido Florido Verão', 
      sales: 23, 
      revenue: 'R$ 2.070',
      image: 'https://picsum.photos/seed/vestido1/60/60'
    },
    { 
      id: 2, 
      name: 'Blusa de Seda Elegance', 
      sales: 18, 
      revenue: 'R$ 1.620',
      image: 'https://picsum.photos/seed/blusa1/60/60'
    },
    { 
      id: 3, 
      name: 'Calça Jeans Premium', 
      sales: 15, 
      revenue: 'R$ 1.350',
      image: 'https://picsum.photos/seed/calca1/60/60'
    },
    { 
      id: 4, 
      name: 'Saia Midi Plissada', 
      sales: 12, 
      revenue: 'R$ 1.080',
      image: 'https://picsum.photos/seed/saia1/60/60'
    },
    { 
      id: 5, 
      name: 'Blazer Executivo', 
      sales: 10, 
      revenue: 'R$ 950',
      image: 'https://picsum.photos/seed/blazer1/60/60'
    }
  ];

  // Pedidos recentes
  const recentOrders = [
    { 
      id: '#001', 
      customer: 'Maria Silva', 
      total: 'R$ 189,90', 
      status: 'Pendente', 
      date: '2025-01-08',
      time: '14:30',
      items: 2
    },
    { 
      id: '#002', 
      customer: 'Ana Costa', 
      total: 'R$ 299,80', 
      status: 'Confirmado', 
      date: '2025-01-08',
      time: '13:15',
      items: 3
    },
    { 
      id: '#003', 
      customer: 'Julia Santos', 
      total: 'R$ 159,90', 
      status: 'Enviado', 
      date: '2025-01-07',
      time: '16:45',
      items: 1
    },
    { 
      id: '#004', 
      customer: 'Carla Oliveira', 
      total: 'R$ 89,90', 
      status: 'Entregue', 
      date: '2025-01-07',
      time: '11:20',
      items: 1
    },
    { 
      id: '#005', 
      customer: 'Beatriz Lima', 
      total: 'R$ 349,70', 
      status: 'Pendente', 
      date: '2025-01-06',
      time: '15:30',
      items: 4
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className={styles.dashboardHome}>
      {/* Header de Boas-vindas */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>
            Bem-vinda, {user?.name || 'Administradora'}! 👋
          </h1>
          <p className={styles.welcomeSubtitle}>
            Aqui está um resumo das atividades da sua loja hoje.
          </p>
        </div>
        <div className={styles.welcomeInfo}>
          <div className={styles.dateTime}>
            <div className={styles.date}>
              <FaCalendarAlt />
              <span>{currentTime.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className={styles.time}>
              <FaClock />
              <span>{currentTime.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${styles.statCard} ${styles[stat.color]}`}
              onClick={stat.onClick}
            >
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>
                  <stat.icon />
                </div>
                <div className={styles.statChange}>
                  <span className={`${styles.changeValue} ${styles[stat.changeType]}`}>
                    {stat.changeType === 'increase' ? <FaArrowUp /> : <FaArrowDown />}
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Principal com Gráfico e Produtos */}
      <div className={styles.mainSection}>
        {/* Gráfico de Vendas */}
        <div className={styles.chartSection}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartInfo}>
                <h3 className={styles.chartTitle}>📈 Vendas dos Últimos 30 Dias</h3>
                <p className={styles.chartSubtitle}>
                  Total: <strong>R$ 52.890</strong> | Média diária: <strong>R$ 1.763</strong>
                </p>
              </div>
              <button 
                className={styles.chartBtn}
                onClick={() => navigate('/dashboard/relatorios')}
              >
                Ver Relatório Completo
              </button>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.chartArea}>
                {salesData.map((data, index) => (
                  <div 
                    key={index}
                    className={styles.chartBar}
                    style={{ 
                      height: `${(data.sales / maxSales) * 100}%`,
                      animationDelay: `${index * 0.02}s`
                    }}
                    title={`Dia ${data.day}: ${formatCurrency(data.sales)}`}
                  />
                ))}
              </div>
              <div className={styles.chartLabels}>
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Mais Vendidos */}
        <div className={styles.topProductsSection}>
          <div className={styles.topProductsCard}>
            <div className={styles.topProductsHeader}>
              <h3 className={styles.topProductsTitle}>🏆 Produtos Mais Vendidos</h3>
              <button 
                className={styles.topProductsBtn}
                onClick={() => navigate('/dashboard/produtos')}
              >
                Ver Todos
              </button>
            </div>
            <div className={styles.topProductsList}>
              {topProducts.map((product, index) => (
                <div key={product.id} className={styles.productItem}>
                  <div className={styles.productRank}>
                    <span className={styles.rankNumber}>{index + 1}</span>
                  </div>
                  <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <div className={styles.productStats}>
                      <span className={styles.productSales}>{product.sales} vendas</span>
                      <span className={styles.productRevenue}>{product.revenue}</span>
                    </div>
                  </div>
                  <button 
                    className={styles.productAction}
                    onClick={() => navigate(`/dashboard/produtos/${product.id}`)}
                    title="Ver produto"
                  >
                    <FaEye />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pedidos Recentes */}
      <div className={styles.ordersSection}>
        <div className={styles.ordersCard}>
          <div className={styles.ordersHeader}>
            <h3 className={styles.ordersTitle}>📦 Pedidos Recentes</h3>
            <button 
              className={styles.ordersBtn}
              onClick={() => navigate('/dashboard/pedidos')}
            >
              Ver Todos os Pedidos
            </button>
          </div>
          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderCell}>Pedido</div>
              <div className={styles.tableHeaderCell}>Cliente</div>
              <div className={styles.tableHeaderCell}>Total</div>
              <div className={styles.tableHeaderCell}>Status</div>
              <div className={styles.tableHeaderCell}>Data/Hora</div>
              <div className={styles.tableHeaderCell}>Ações</div>
            </div>
            <div className={styles.tableBody}>
              {recentOrders.map((order) => (
                <div key={order.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <span className={styles.orderId}>{order.id}</span>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.customerInfo}>
                      <span className={styles.customerName}>{order.customer}</span>
                      <span className={styles.orderItems}>{order.items} {order.items === 1 ? 'item' : 'itens'}</span>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={styles.orderTotal}>{order.total}</span>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.dateTimeInfo}>
                      <span className={styles.orderDate}>{order.date}</span>
                      <span className={styles.orderTime}>{order.time}</span>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => navigate(`/dashboard/pedidos/${order.id}`)}
                        title="Ver detalhes"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => navigate(`/dashboard/pedidos/${order.id}/editar`)}
                        title="Editar pedido"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className={styles.quickActionsSection}>
        <h3 className={styles.quickActionsTitle}>⚡ Ações Rápidas</h3>
        <div className={styles.quickActionsGrid}>
          <button 
            className={styles.quickActionCard}
            onClick={() => navigate('/dashboard/produtos')}
          >
            <div className={styles.quickActionIcon}>
              <FaPlus />
            </div>
            <div className={styles.quickActionContent}>
              <h4>Novo Produto</h4>
              <p>Adicionar produto ao catálogo</p>
            </div>
          </button>
          
          <button 
            className={styles.quickActionCard}
            onClick={() => navigate('/dashboard/categorias')}
          >
            <div className={styles.quickActionIcon}>
              <FaPlus />
            </div>
            <div className={styles.quickActionContent}>
              <h4>Nova Categoria</h4>
              <p>Organizar produtos por categoria</p>
            </div>
          </button>
          
          <button 
            className={styles.quickActionCard}
            onClick={() => navigate('/dashboard/promocoes')}
          >
            <div className={styles.quickActionIcon}>
              <FaPlus />
            </div>
            <div className={styles.quickActionContent}>
              <h4>Nova Promoção</h4>
              <p>Criar cupom de desconto</p>
            </div>
          </button>
          
          <button 
            className={styles.quickActionCard}
            onClick={() => navigate('/dashboard/relatorios')}
          >
            <div className={styles.quickActionIcon}>
              <FaChartLine />
            </div>
            <div className={styles.quickActionContent}>
              <h4>Ver Relatórios</h4>
              <p>Analisar vendas e performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;