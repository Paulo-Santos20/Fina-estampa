import React, { useState } from 'react';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie,
  FaDownload,
  FaCalendarAlt,
  FaUsers,
  FaShoppingBag,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaEye
} from 'react-icons/fa';
import styles from './AnalyticsPage.module.css';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('sales');

  // Dados mockados para demonstração
  const stats = {
    totalSales: { value: 'R\$ 45.230', change: '+12.5%', trend: 'up' },
    totalOrders: { value: '324', change: '+8.3%', trend: 'up' },
    totalCustomers: { value: '89', change: '+15.2%', trend: 'up' },
    averageTicket: { value: 'R\$ 139.50', change: '-2.1%', trend: 'down' }
  };

  const salesData = [
    { period: 'Jan', sales: 12000, orders: 45 },
    { period: 'Fev', sales: 15000, orders: 52 },
    { period: 'Mar', sales: 18000, orders: 61 },
    { period: 'Abr', sales: 22000, orders: 73 },
    { period: 'Mai', sales: 25000, orders: 84 },
    { period: 'Jun', sales: 28000, orders: 92 }
  ];

  const topProducts = [
    { name: 'Vestido Floral Verão', sales: 45, revenue: 'R\$ 4.050' },
    { name: 'Blusa Social Elegante', sales: 38, revenue: 'R\$ 3.420' },
    { name: 'Calça Jeans Premium', sales: 32, revenue: 'R\$ 4.160' },
    { name: 'Blazer Feminino', sales: 28, revenue: 'R\$ 5.600' },
    { name: 'Vestido Midi Casual', sales: 24, revenue: 'R\$ 3.600' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const exportReport = () => {
    // Simular exportação
    alert('Relatório exportado com sucesso!');
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <FaArrowUp /> : <FaArrowDown />;
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaChartBar />
            Relatórios e Analytics
          </h2>
          <p className={styles.pageSubtitle}>
            Acompanhe o desempenho da sua loja com dados detalhados
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={styles.dateSelect}
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Último ano</option>
          </select>
          
          <button onClick={exportReport} className={styles.exportBtn}>
            <FaDownload /> Exportar
          </button>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaDollarSign />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.totalSales.value}</h3>
            <p className={styles.statLabel}>Vendas Totais</p>
            <span className={`${styles.statChange} ${styles[stats.totalSales.trend]}`}>
              {getTrendIcon(stats.totalSales.trend)}
              {stats.totalSales.change}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaShoppingBag />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.totalOrders.value}</h3>
            <p className={styles.statLabel}>Pedidos Totais</p>
            <span className={`${styles.statChange} ${styles[stats.totalOrders.trend]}`}>
              {getTrendIcon(stats.totalOrders.trend)}
              {stats.totalOrders.change}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.totalCustomers.value}</h3>
            <p className={styles.statLabel}>Clientes Únicos</p>
            <span className={`${styles.statChange} ${styles[stats.totalCustomers.trend]}`}>
              {getTrendIcon(stats.totalCustomers.trend)}
              {stats.totalCustomers.change}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaChartLine />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.averageTicket.value}</h3>
            <p className={styles.statLabel}>Ticket Médio</p>
            <span className={`${styles.statChange} ${styles[stats.averageTicket.trend]}`}>
              {getTrendIcon(stats.averageTicket.trend)}
              {stats.averageTicket.change}
            </span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              <FaChartLine /> Evolução de Vendas
            </h3>
            <div className={styles.chartControls}>
              <button 
                className={`${styles.metricBtn} ${selectedMetric === 'sales' ? styles.active : ''}`}
                onClick={() => setSelectedMetric('sales')}
              >
                Vendas
              </button>
              <button 
                className={`${styles.metricBtn} ${selectedMetric === 'orders' ? styles.active : ''}`}
                onClick={() => setSelectedMetric('orders')}
              >
                Pedidos
              </button>
            </div>
          </div>
          
          <div className={styles.chartContainer}>
            <div className={styles.chartMockup}>
              <div className={styles.chartBars}>
                {salesData.map((data, index) => {
                  const value = selectedMetric === 'sales' ? data.sales : data.orders;
                  const maxValue = selectedMetric === 'sales' ? 30000 : 100;
                  const height = (value / maxValue) * 100;
                  
                  return (
                    <div key={index} className={styles.chartBarContainer}>
                      <div 
                        className={styles.chartBar}
                        style={{ height: `${height}%` }}
                        title={`${data.period}: ${selectedMetric === 'sales' ? formatCurrency(value) : `${value} pedidos`}`}
                      />
                      <span className={styles.chartLabel}>{data.period}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              <FaChartPie /> Produtos Mais Vendidos
            </h3>
          </div>
          
          <div className={styles.topProductsList}>
            {topProducts.map((product, index) => (
              <div key={index} className={styles.productItem}>
                <div className={styles.productRank}>#{index + 1}</div>
                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{product.name}</h4>
                  <div className={styles.productStats}>
                    <span className={styles.productSales}>{product.sales} vendas</span>
                    <span className={styles.productRevenue}>{product.revenue}</span>
                  </div>
                </div>
                <div className={styles.productProgress}>
                  <div 
                    className={styles.progressBar}
                    style={{ width: `${(product.sales / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas Adicionais */}
      <div className={styles.additionalMetrics}>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>
            <FaEye /> Métricas de Engajamento
          </h3>
          <div className={styles.metricsList}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Taxa de Conversão:</span>
              <span className={styles.metricValue}>3.2%</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Tempo Médio no Site:</span>
              <span className={styles.metricValue}>4m 32s</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Páginas por Sessão:</span>
              <span className={styles.metricValue}>5.8</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Taxa de Rejeição:</span>
              <span className={styles.metricValue}>42.1%</span>
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>
            <FaUsers /> Dados dos Clientes
          </h3>
          <div className={styles.metricsList}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Novos Clientes:</span>
              <span className={styles.metricValue}>23</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Clientes Recorrentes:</span>
              <span className={styles.metricValue}>66</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Valor Médio por Cliente:</span>
              <span className={styles.metricValue}>R\$ 508,30</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Satisfação Média:</span>
              <span className={styles.metricValue}>4.7/5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className={styles.insightsSection}>
        <h3 className={styles.sectionTitle}>💡 Insights e Recomendações</h3>
        <div className={styles.insightsList}>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>📈</div>
            <div className={styles.insightContent}>
              <h4>Crescimento Acelerado</h4>
              <p>Suas vendas cresceram 12.5% no último mês. Continue investindo em marketing digital!</p>
            </div>
          </div>
          
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>👗</div>
            <div className={styles.insightContent}>
              <h4>Categoria em Alta</h4>
              <p>Vestidos estão com 35% mais vendas. Considere expandir essa categoria.</p>
            </div>
          </div>
          
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>🕐</div>
            <div className={styles.insightContent}>
              <h4>Horário de Pico</h4>
              <p>Mais vendas acontecem entre 19h-22h. Programe suas campanhas para esse horário.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;