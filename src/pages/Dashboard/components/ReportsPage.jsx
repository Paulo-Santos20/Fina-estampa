import React, { useState } from 'react';
import { 
  FaChartBar, 
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaChartLine,
  FaShoppingBag,
  FaUsers,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown 
} from 'react-icons/fa';
import { useOrders } from '../../../hooks/useOrders';
import { useCustomers } from '../../../hooks/useCustomers';
import { useProducts } from '../../../hooks/useProducts';
import styles from './ReportsPage.module.css';

const ReportsPage = () => {
  const { orders } = useOrders();
  const { customers } = useCustomers();
  const { products } = useProducts();

  const [dateFilter, setDateFilter] = useState('30days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Calcular estatísticas
  const calculateStats = () => {
    const now = new Date();
    let filterDate = new Date();

    switch (dateFilter) {
      case '7days':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        filterDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        filterDate.setDate(now.getDate() - 90);
        break;
      case 'custom':
        filterDate = startDate ? new Date(startDate) : new Date(0);
        break;
      default:
        filterDate = new Date(0);
    }

    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const endFilterDate = dateFilter === 'custom' && endDate ? new Date(endDate) : now;
      return orderDate >= filterDate && orderDate <= endFilterDate;
    });

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = filteredOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Vendas por dia
    const salesByDay = {};
    filteredOrders.forEach(order => {
      const day = new Date(order.createdAt).toDateString();
      if (!salesByDay[day]) {
        salesByDay[day] = { orders: 0, revenue: 0 };
      }
      salesByDay[day].orders += 1;
      salesByDay[day].revenue += order.total;
    });

    // Produtos mais vendidos
    const productSales = {};
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.name,
            quantity: 0,
            revenue: 0
          };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      salesByDay,
      topProducts,
      totalCustomers: customers.length,
      totalProducts: products.length
    };
  };

  const stats = calculateStats();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getDateRangeLabel = () => {
    switch (dateFilter) {
      case '7days': return 'Últimos 7 dias';
      case '30days': return 'Últimos 30 dias';
      case '90days': return 'Últimos 90 dias';
      case 'custom': return 'Período personalizado';
      default: return 'Todo período';
    }
  };

  const generateReport = () => {
    const reportData = {
      period: getDateRangeLabel(),
      generatedAt: new Date().toLocaleString('pt-BR'),
      stats,
      orders: orders.filter(order => {
        const now = new Date();
        let filterDate = new Date();
        
        switch (dateFilter) {
          case '7days':
            filterDate.setDate(now.getDate() - 7);
            break;
          case '30days':
            filterDate.setDate(now.getDate() - 30);
            break;
          case '90days':
            filterDate.setDate(now.getDate() - 90);
            break;
          case 'custom':
            filterDate = startDate ? new Date(startDate) : new Date(0);
            break;
          default:
            filterDate = new Date(0);
        }

        const orderDate = new Date(order.createdAt);
        const endFilterDate = dateFilter === 'custom' && endDate ? new Date(endDate) : now;
        return orderDate >= filterDate && orderDate <= endFilterDate;
      })
    };

    // Simular download do relatório
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-vendas-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('✅ Relatório baixado com sucesso!');
  };

  // Preparar dados do gráfico
  const chartData = Object.entries(stats.salesByDay)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .slice(-30); // Últimos 30 dias

  const maxRevenue = Math.max(...chartData.map(([, data]) => data.revenue));

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaChartBar />
            Relatórios de Vendas
          </h2>
          <p className={styles.pageSubtitle}>
            Analise o desempenho da sua loja com relatórios detalhados
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={generateReport}
            className={styles.downloadBtn}
          >
            <FaDownload /> Baixar Relatório
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <FaFilter className={styles.filterIcon} />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="90days">Últimos 90 dias</option>
            <option value="custom">Período personalizado</option>
          </select>
        </div>

        {dateFilter === 'custom' && (
          <div className={styles.dateRange}>
            <div className={styles.dateGroup}>
              <label>Data inicial:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <div className={styles.dateGroup}>
              <label>Data final:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas Principais */}
      <div className={styles.statsSection}>
        <h3 className={styles.sectionTitle}>
          📊 Resumo - {getDateRangeLabel()}
        </h3>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaDollarSign />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{formatCurrency(stats.totalRevenue)}</span>
              <span className={styles.statLabel}>Receita Total</span>
            </div>
            <div className={styles.statTrend}>
              <FaArrowUp className={styles.trendUp} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaShoppingBag />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stats.totalOrders}</span>
              <span className={styles.statLabel}>Total de Pedidos</span>
            </div>
            <div className={styles.statTrend}>
              <FaArrowUp className={styles.trendUp} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaChartLine />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{formatCurrency(stats.averageOrderValue)}</span>
              <span className={styles.statLabel}>Ticket Médio</span>
            </div>
            <div className={styles.statTrend}>
              <FaArrowUp className={styles.trendUp} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaUsers />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stats.totalCustomers}</span>
              <span className={styles.statLabel}>Total de Clientes</span>
            </div>
            <div className={styles.statTrend}>
              <FaArrowUp className={styles.trendUp} />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Vendas */}
      <div className={styles.chartSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              📈 Evolução das Vendas
            </h3>
            <p className={styles.chartSubtitle}>
              Receita diária no período selecionado
            </p>
          </div>
          
          <div className={styles.chartContainer}>
            {chartData.length > 0 ? (
              <div className={styles.chartArea}>
                {chartData.map(([date, data], index) => (
                  <div 
                    key={date}
                    className={styles.chartBar}
                    style={{ 
                      height: `${(data.revenue / maxRevenue) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                    title={`${formatDate(date)}: ${formatCurrency(data.revenue)} (${data.orders} pedidos)`}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noChartData}>
                <p>Nenhuma venda encontrada no período selecionado</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Produtos Mais Vendidos */}
      <div className={styles.topProductsSection}>
        <div className={styles.topProductsCard}>
          <div className={styles.topProductsHeader}>
            <h3 className={styles.topProductsTitle}>
              🏆 Produtos Mais Vendidos
            </h3>
            <p className={styles.topProductsSubtitle}>
              Ranking por quantidade vendida no período
            </p>
          </div>
          
          <div className={styles.topProductsList}>
            {stats.topProducts.length > 0 ? (
              stats.topProducts.map((product, index) => (
                <div key={product.id} className={styles.topProductItem}>
                  <div className={styles.productRank}>
                    <span className={styles.rankNumber}>{index + 1}</span>
                  </div>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <div className={styles.productStats}>
                      <span className={styles.productQuantity}>
                        {product.quantity} unidades vendidas
                      </span>
                      <span className={styles.productRevenue}>
                        {formatCurrency(product.revenue)} em vendas
                      </span>
                    </div>
                  </div>
                  <div className={styles.productPercentage}>
                    {((product.revenue / stats.totalRevenue) * 100).toFixed(1)}%
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noProducts}>
                <p>Nenhuma venda de produto encontrada no período</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumo Detalhado */}
      <div className={styles.summarySection}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>
            📋 Resumo Detalhado
          </h3>
          
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Período analisado:</span>
              <span className={styles.summaryValue}>{getDateRangeLabel()}</span>
            </div>
            
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total de produtos cadastrados:</span>
              <span className={styles.summaryValue}>{stats.totalProducts}</span>
            </div>
            
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Produtos vendidos:</span>
              <span className={styles.summaryValue}>{stats.topProducts.length}</span>
            </div>
            
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Taxa de conversão:</span>
              <span className={styles.summaryValue}>
                {stats.totalCustomers > 0 
                  ? ((stats.totalOrders / stats.totalCustomers) * 100).toFixed(1)
                  : 0
                }%
              </span>
            </div>
            
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Relatório gerado em:</span>
              <span className={styles.summaryValue}>
                {new Date().toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;