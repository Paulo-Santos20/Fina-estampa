import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign, 
  FaBox,
  FaHeart,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaTag,
  FaEye,
  FaEdit,
  FaPlus,
  FaCalendarAlt,
  FaStore,
  FaCrown,
  FaAward,
  FaClipboardList // ADICIONADO
} from 'react-icons/fa';
import { allProducts } from '../../../data/products';
import styles from '../Dashboard.module.css';

const DashboardHome = ({ user, timeRange }) => {
  const navigate = useNavigate();

  // Dados simulados baseados nos produtos reais
  const dashboardData = useMemo(() => {
    const totalProducts = allProducts.length;
    const promoProducts = allProducts.filter(p => p.isPromo).length;
    const newProducts = allProducts.filter(p => p.isNew).length;
    const totalValue = allProducts.reduce((sum, p) => sum + (p.salePrice || p.price), 0);
    const avgPrice = totalValue / totalProducts;

    if (user?.type === 'admin') {
      return {
        stats: [
          {
            title: 'Total de Produtos',
            value: totalProducts,
            icon: <FaBox />,
            color: 'primary',
            change: '+12%',
            trend: 'up',
            description: 'produtos cadastrados'
          },
          {
            title: 'Vendas do Mês',
            value: 'R$ 45.280',
            icon: <FaDollarSign />,
            color: 'success',
            change: '+8.5%',
            trend: 'up',
            description: 'faturamento dezembro'
          },
          {
            title: 'Novos Clientes',
            value: 127,
            icon: <FaUsers />,
            color: 'info',
            change: '+15%',
            trend: 'up',
            description: 'cadastros este mês'
          },
          {
            title: 'Pedidos Hoje',
            value: 23,
            icon: <FaShoppingCart />,
            color: 'warning',
            change: '-2%',
            trend: 'down',
            description: 'pedidos realizados'
          }
        ],
        recentOrders: [
          { 
            id: '#1234', 
            customer: 'Maria Silva', 
            product: 'Vestido Floral Midi', 
            value: 189.90, 
            status: 'Pago', 
            time: '14:30',
            avatar: 'MS'
          },
          { 
            id: '#1235', 
            customer: 'Ana Costa', 
            product: 'Blusa Social Branca', 
            value: 89.90, 
            status: 'Pendente', 
            time: '13:15',
            avatar: 'AC'
          },
          { 
            id: '#1236', 
            customer: 'Julia Santos', 
            product: 'Calça Jeans Skinny', 
            value: 159.90, 
            status: 'Enviado', 
            time: '12:45',
            avatar: 'JS'
          },
          { 
            id: '#1237', 
            customer: 'Carla Lima', 
            product: 'Saia Plissada Rosa', 
            value: 129.90, 
            status: 'Pago', 
            time: '11:20',
            avatar: 'CL'
          },
          { 
            id: '#1238', 
            customer: 'Fernanda Oliveira', 
            product: 'Macacão Elegante', 
            value: 249.90, 
            status: 'Entregue', 
            time: '10:15',
            avatar: 'FO'
          }
        ],
        topProducts: allProducts
          .filter(p => p.isPromo || p.isNew)
          .slice(0, 5)
          .map((p, index) => ({
            id: p.id,
            name: p.name,
            image: p.image,
            sales: Math.floor(Math.random() * 50) + 10,
            revenue: ((p.salePrice || p.price) * (Math.floor(Math.random() * 50) + 10)),
            growth: Math.floor(Math.random() * 30) + 5,
            rank: index + 1
          })),
        quickStats: {
          todayOrders: 23,
          pendingOrders: 8,
          lowStock: 12,
          newReviews: 5
        }
      };
    } else {
      return {
        stats: [
          {
            title: 'Pedidos Realizados',
            value: 8,
            icon: <FaShoppingCart />,
            color: 'primary',
            change: '+2',
            trend: 'up',
            description: 'pedidos este mês'
          },
          {
            title: 'Total Gasto',
            value: 'R$ 1.247,80',
            icon: <FaDollarSign />,
            color: 'success',
            change: '+R$ 189,90',
            trend: 'up',
            description: 'valor total investido'
          },
          {
            title: 'Produtos Favoritados',
            value: 15,
            icon: <FaHeart />,
            color: 'danger',
            change: '+3',
            trend: 'up',
            description: 'itens na lista de desejos'
          },
          {
            title: 'Cupons Disponíveis',
            value: 3,
            icon: <FaTag />,
            color: 'info',
            change: 'Novo',
            trend: 'up',
            description: 'cupons para usar'
          }
        ],
        recentOrders: [
          { 
            id: '#1234', 
            product: 'Vestido Floral Midi', 
            value: 189.90, 
            status: 'Entregue', 
            date: '15/12/2024',
            image: allProducts[0]?.image
          },
          { 
            id: '#1235', 
            product: 'Blusa Social Branca', 
            value: 89.90, 
            status: 'A caminho', 
            date: '18/12/2024',
            image: allProducts[1]?.image
          },
          { 
            id: '#1236', 
            product: 'Calça Jeans Skinny', 
            value: 159.90, 
            status: 'Preparando', 
            date: '20/12/2024',
            image: allProducts[2]?.image
          }
        ],
        favorites: allProducts.slice(0, 4),
        recommendations: allProducts.filter(p => p.isNew).slice(0, 3)
      };
    }
  }, [user, timeRange]);

  // Navegação para outras páginas
  const handleNavigate = (page) => {
    // Esta função seria usada para navegar entre seções do dashboard
    console.log(`Navegando para: ${page}`);
  };

  return (
    <>
      {/* Welcome Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--wine-destaque), var(--preto-secundario))',
        borderRadius: 'var(--radius-large)',
        padding: '2rem',
        marginBottom: '2rem',
        color: 'var(--white-principal)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ 
              margin: '0 0 0.5rem 0', 
              fontSize: '1.8rem', 
              fontWeight: '700' 
            }}>
              {user?.type === 'admin' ? '👑 Painel Administrativo' : '🛍️ Bem-vinda de volta!'}
            </h2>
            <p style={{ 
              margin: '0', 
              fontSize: '1.1rem', 
              opacity: 0.9 
            }}>
              {user?.type === 'admin' 
                ? `Gerencie sua loja com facilidade, ${user.name}` 
                : `Continue navegando pelas novidades, ${user.name}`
              }
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {user?.type === 'admin' ? (
              <>
                <button 
                  onClick={() => handleNavigate('products')}
                  style={{
                    background: 'var(--white-principal)',
                    color: 'var(--wine-destaque)',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: 'var(--radius-medium)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaPlus /> Novo Produto
                </button>
                <button 
                  onClick={() => handleNavigate('orders')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'var(--white-principal)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    padding: '0.8rem 1.5rem',
                    borderRadius: 'var(--radius-medium)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaClipboardList /> Ver Pedidos
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/')}
                  style={{
                    background: 'var(--white-principal)',
                    color: 'var(--wine-destaque)',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: 'var(--radius-medium)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaStore /> Continuar Comprando
                </button>
                <button 
                  onClick={() => handleNavigate('favorites')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'var(--white-principal)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    padding: '0.8rem 1.5rem',
                    borderRadius: 'var(--radius-medium)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaHeart /> Meus Favoritos
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {dashboardData.stats.map((stat, index) => (
            <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
              <div className={styles.statIcon}>
                {stat.icon}
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statTitle}>{stat.title}</p>
                <div className={`${styles.statChange} ${styles[stat.trend]}`}>
                  {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  <span>{stat.change}</span>
                </div>
                <small style={{ 
                  color: 'var(--cinza-medio)', 
                  fontSize: '0.8rem',
                  marginTop: '0.3rem',
                  display: 'block'
                }}>
                  {stat.description}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions for Admin */}
      {user?.type === 'admin' && (
        <section className={styles.section} style={{ marginBottom: '2rem' }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FaChartLine className={styles.sectionIcon} />
              Ações Rápidas
            </h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <div style={{
              background: 'var(--cinza-claro)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-medium)',
              textAlign: 'center',
              border: '2px solid transparent',
              cursor: 'pointer',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--wine-destaque)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              <div style={{ 
                background: '#F59E0B', 
                color: 'white', 
                width: '3rem', 
                height: '3rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.2rem'
              }}>
                {dashboardData.quickStats.todayOrders}
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--preto-secundario)' }}>
                Pedidos Hoje
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                Pedidos realizados hoje
              </p>
            </div>

            <div style={{
              background: 'var(--cinza-claro)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-medium)',
              textAlign: 'center',
              border: '2px solid transparent',
              cursor: 'pointer',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--wine-destaque)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              <div style={{ 
                background: '#EF4444', 
                color: 'white', 
                width: '3rem', 
                height: '3rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.2rem'
              }}>
                {dashboardData.quickStats.pendingOrders}
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--preto-secundario)' }}>
                Pedidos Pendentes
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                Aguardando processamento
              </p>
            </div>

            <div style={{
              background: 'var(--cinza-claro)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-medium)',
              textAlign: 'center',
              border: '2px solid transparent',
              cursor: 'pointer',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--wine-destaque)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              <div style={{ 
                background: 'var(--wine-destaque)', 
                color: 'white', 
                width: '3rem', 
                height: '3rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.2rem'
              }}>
                {dashboardData.quickStats.lowStock}
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--preto-secundario)' }}>
                Estoque Baixo
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                Produtos com pouco estoque
              </p>
            </div>

            <div style={{
              background: 'var(--cinza-claro)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-medium)',
              textAlign: 'center',
              border: '2px solid transparent',
              cursor: 'pointer',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--wine-destaque)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              <div style={{ 
                background: '#10B981', 
                color: 'white', 
                width: '3rem', 
                height: '3rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.2rem'
              }}>
                {dashboardData.quickStats.newReviews}
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--preto-secundario)' }}>
                Novas Avaliações
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                Avaliações para moderar
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Coluna Esquerda */}
        <div className={styles.leftColumn}>
          {/* Pedidos Recentes */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <FaClipboardList className={styles.sectionIcon} />
                {user.type === 'admin' ? 'Pedidos Recentes' : 'Meus Pedidos'}
              </h2>
              <button 
                className={styles.viewAllButton}
                onClick={() => handleNavigate('orders')}
              >
                Ver todos
              </button>
            </div>
            
            <div className={styles.ordersTable}>
              {dashboardData.recentOrders.map((order, index) => (
                <div key={index} className={styles.orderRow}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    {user.type === 'admin' ? (
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        background: 'var(--wine-destaque)',
                        color: 'var(--white-principal)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {order.avatar}
                      </div>
                    ) : (
                      <img
                        src={order.image}
                        alt={order.product}
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: 'var(--radius-medium)',
                          objectFit: 'cover',
                          border: '2px solid var(--cinza-claro)'
                        }}
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjI0IiB5PSIyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNjAwIj7wn5GXPC90ZXh0Pgo8L3N2Zz4K";
                        }}
                      />
                    )}
                    
                    <div className={styles.orderInfo}>
                      <span className={styles.orderId}>{order.id}</span>
                      {user.type === 'admin' && (
                        <span className={styles.customerName}>{order.customer}</span>
                      )}
                      <span className={styles.productName}>{order.product}</span>
                      {order.time && (
                        <span className={styles.orderDate}>Hoje às {order.time}</span>
                      )}
                      {order.date && (
                        <span className={styles.orderDate}>{order.date}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.orderDetails}>
                    <span className={styles.orderValue}>
                      R$ {order.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`${styles.orderStatus} ${styles[order.status.toLowerCase().replace(/\s+/g, '')]}`}>
                      {order.status}
                    </span>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--wine-destaque)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        marginTop: '0.3rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <FaEye /> Ver detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gráfico de Vendas (Admin) ou Cupons (Cliente) */}
          {user.type === 'admin' ? (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <FaChartLine className={styles.sectionIcon} />
                  Vendas por Categoria
                </h2>
                <button className={styles.viewAllButton}>
                  <FaEye /> Relatório Completo
                </button>
              </div>
              <div className={styles.chartPlaceholder}>
                <FaChartLine className={styles.chartIcon} />
                <p>Gráfico de vendas por categoria</p>
                <small>Implementação em desenvolvimento</small>
                <div style={{ 
                  marginTop: '1rem',
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    background: 'var(--wine-destaque)', 
                    color: 'white', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem'
                  }}>
                    Vestidos: 45%
                  </span>
                  <span style={{ 
                    background: 'var(--dourado-sutil)', 
                    color: 'var(--preto-secundario)', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem'
                  }}>
                    Blusas: 30%
                  </span>
                  <span style={{ 
                    background: 'var(--cinza-medio)', 
                    color: 'white', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem'
                  }}>
                    Outros: 25%
                  </span>
                </div>
              </div>
            </section>
          ) : (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <FaTag className={styles.sectionIcon} />
                  Cupons Disponíveis
                </h2>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => handleNavigate('coupons')}
                >
                  Ver todos
                </button>
              </div>
              <div className={styles.couponsGrid}>
                <div className={styles.couponCard}>
                  <h4>🚚 FRETE GRÁTIS</h4>
                  <p>Frete grátis em compras acima de R$ 199,90</p>
                  <span className={styles.couponCode}>FINAFRETE</span>
                </div>
                <div className={styles.couponCard}>
                  <h4>🎉 15% OFF</h4>
                  <p>Desconto em toda a coleção de vestidos</p>
                  <span className={styles.couponCode}>VESTIDO15</span>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Coluna Direita */}
        <div className={styles.rightColumn}>
          {/* Top Produtos (Admin) ou Favoritos (Cliente) */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {user.type === 'admin' ? (
                  <>
                    <FaAward className={styles.sectionIcon} />
                    Produtos Mais Vendidos
                  </>
                ) : (
                  <>
                    <FaHeart className={styles.sectionIcon} />
                    Meus Favoritos
                  </>
                )}
              </h2>
              <button 
                className={styles.viewAllButton}
                onClick={() => handleNavigate(user.type === 'admin' ? 'products' : 'favorites')}
              >
                Ver todos
              </button>
            </div>
            
            <div className={styles.productsList}>
              {user.type === 'admin' ? (
                dashboardData.topProducts.map((product, index) => (
                  <div key={index} className={styles.productItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <span className={styles.productRank}>#{product.rank}</span>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: 'var(--radius-medium)',
                          objectFit: 'cover',
                          border: '2px solid var(--cinza-claro)'
                        }}
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjI0IiB5PSIyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNjAwIj7wn5GXPC90ZXh0Pgo8L3N2Zz4K";
                        }}
                      />
                      <div className={styles.productDetails}>
                        <span className={styles.productName}>{product.name}</span>
                        <span className={styles.productStats}>
                          {product.sales} vendas • R$ {product.revenue.toLocaleString('pt-BR')}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                          <FaArrowUp style={{ color: '#10B981', fontSize: '0.8rem' }} />
                          <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: '600' }}>
                            +{product.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                dashboardData.favorites.map((product, index) => (
                  <div key={index} className={styles.favoriteItem}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={styles.favoriteImage}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjI4IiB5PSIzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNjAwIj7wn5GXPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                    <div className={styles.favoriteDetails}>
                      <span className={styles.favoriteName}>{product.name}</span>
                      <span className={styles.favoritePrice}>
                        {product.salePrice ? (
                          <>
                            <span className={styles.originalPrice}>
                              R$ {product.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span className={styles.salePrice}>
                              R$ {product.salePrice.toFixed(2).replace('.', ',')}
                            </span>
                          </>
                        ) : (
                          <span className={styles.regularPrice}>
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </span>
                    </div>
                    <button className={styles.favoriteAction}>
                      <FaShoppingCart />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Recomendações (Cliente) ou Ações Rápidas (Admin) */}
          {user.type === 'admin' ? (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <FaChartLine className={styles.sectionIcon} />
                  Ações Administrativas
                </h2>
              </div>
              
              <div className={styles.quickActions}>
                <button 
                  className={styles.quickActionButton}
                  onClick={() => handleNavigate('products')}
                >
                  <FaPlus />
                  <span>Adicionar Produto</span>
                </button>
                <button 
                  className={styles.quickActionButton}
                  onClick={() => handleNavigate('customers')}
                >
                  <FaUsers />
                  <span>Ver Clientes</span>
                </button>
                <button 
                  className={styles.quickActionButton}
                  onClick={() => handleNavigate('analytics')}
                >
                  <FaChartLine />
                  <span>Relatórios</span>
                </button>
                <button 
                  className={styles.quickActionButton}
                  onClick={() => handleNavigate('promotions')}
                >
                  <FaTag />
                  <span>Promoções</span>
                </button>
              </div>
            </section>
          ) : (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <FaCrown className={styles.sectionIcon} />
                  Recomendados para Você
                </h2>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => navigate('/')}
                >
                  Ver mais
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {dashboardData.recommendations.map((product, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'var(--cinza-claro)',
                    borderRadius: 'var(--radius-medium)',
                    border: '1px solid rgba(114, 47, 55, 0.1)',
                    transition: 'all var(--transition-normal)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--rosa-suave)';
                    e.currentTarget.style.borderColor = 'var(--wine-destaque)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--cinza-claro)';
                    e.currentTarget.style.borderColor = 'rgba(114, 47, 55, 0.1)';
                  }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: 'var(--radius-medium)',
                        objectFit: 'cover',
                        border: '2px solid var(--white-principal)'
                      }}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNjAwIj7wn5GXPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0 0 0.3rem 0', 
                        fontSize: '0.95rem',
                        color: 'var(--preto-secundario)',
                        fontWeight: '600'
                      }}>
                        {product.name}
                      </h4>
                      <p style={{ 
                        margin: '0 0 0.5rem 0', 
                        fontSize: '0.8rem',
                        color: 'var(--cinza-medio)'
                      }}>
                        {product.category}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {product.salePrice ? (
                          <>
                            <span style={{ 
                              textDecoration: 'line-through', 
                              color: 'var(--cinza-medio)', 
                              fontSize: '0.8rem' 
                            }}>
                              R$ {product.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span style={{ 
                              color: 'var(--wine-destaque)', 
                              fontWeight: '700', 
                              fontSize: '0.95rem' 
                            }}>
                              R$ {product.salePrice.toFixed(2).replace('.', ',')}
                            </span>
                          </>
                        ) : (
                          <span style={{ 
                            color: 'var(--wine-destaque)', 
                            fontWeight: '700', 
                            fontSize: '0.95rem' 
                          }}>
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                        {product.isNew && (
                          <span style={{
                            background: 'var(--dourado-sutil)',
                            color: 'var(--preto-secundario)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: 'var(--radius-small)',
                            fontSize: '0.7rem',
                            fontWeight: '600'
                          }}>
                            NOVO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardHome;