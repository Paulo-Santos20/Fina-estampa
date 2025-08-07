import React, { useState, useMemo } from 'react';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaDownload, 
  FaCalendarAlt,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaEye
} from 'react-icons/fa';
import styles from './AnalyticsPage.module.css';

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedChart, setSelectedChart] = useState('sales');

  // Dados simulados para demonstração
  const analyticsData = useMemo(() => {
    const baseData = {
      sales: {
        current: 45280.50,
        previous: 38920.30,
        growth: 16.3,
        transactions: 234,
        avgTicket: 193.42
      },
      visitors: {
        current: 12840,
        previous: 11230,
        growth: 14.3,
        bounceRate: 32.5,
        avgSession: '3m 24s'
      },
      products: {
        totalViews: 8940,
        addToCart: 1240,
        purchases: 234,
        conversionRate: 2.6
      },
      topProducts: [
        { name: 'Vestido Floral Midi', sales: 45, revenue: 8505.00, growth: 23.5 },
        { name: 'Blusa Social Elegante', sales: 38, revenue: 3420.00, growth: 18.2 },
        { name: 'Calça Jeans Premium', sales: 32, revenue: 5120.00, growth: -5.3 },
        { name: 'Saia Plissada Rosa', sales: 28, revenue: 3640.00, growth: 12.8 },
        { name: 'Macacão Executivo', sales: 24, revenue: 5976.00, growth: 8.7 }
      ],
      salesByCategory: [
        { category: 'Vestidos', value: 18500, percentage: 40.8 },
        { category: 'Blusas', value: 12300, percentage: 27.2 },
        { category: 'Calças', value: 8900, percentage: 19.6 },
        { category: 'Saias', value: 3580, percentage: 7.9 },
        { category: 'Acessórios', value: 2000, percentage: 4.4 }
      ],
      monthlyTrend: [
        { month: 'Jan', sales: 28500, orders: 145 },
        { month: 'Fev', sales: 32100, orders: 167 },
        { month: 'Mar', sales: 29800, orders: 152 },
        { month: 'Abr', sales: 35600, orders: 189 },
        { month: 'Mai', sales: 41200, orders: 218 },
        { month: 'Jun', sales: 45280, orders: 234 }
      ]
    };

    return baseData;
  }, [selectedPeriod]);

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatNumber = (value) => {
    return value.toLocaleString('pt-BR');
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? <FaArrowUp /> : <FaArrowDown />;
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? '#10B981' : '#EF4444';
  };

  const handleExportReport = () => {
    alert('📊 Relatório será exportado em breve!');
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaChartLine />
            Relatórios e Analytics
          </h2>
          <p className={styles.pageSubtitle}>
            Acompanhe o desempenho da sua loja com dados detalhados
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={styles.periodSelect}
          >
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="90days">Últimos 3 meses</option>
            <option value="365days">Último ano</option>
          </select>
          
          <button 
            onClick={handleExportReport}
            className={styles.exportBtn}
          >
            <FaDownload /> Exportar
          </button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaDollarSign />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>
              {formatCurrency(analyticsData.sales.current)}
            </div>
            <div className={styles.metricLabel}>Vendas Totais</div>
            <div 
              className={styles.metricGrowth}
              style={{ color: getGrowthColor(analyticsData.sales.growth) }}
            >
              {getGrowthIcon(analyticsData.sales.growth)}
              {Math.abs(analyticsData.sales.growth)}% vs período anterior
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaShoppingCart />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>
              {formatNumber(analyticsData.sales.transactions)}
            </div>
            <div className={styles.metricLabel}>Pedidos</div>
            <div className={styles.metricSubtext}>
              Ticket médio: {formatCurrency(analyticsData.sales.avgTicket)}
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaUsers />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>
              {formatNumber(analyticsData.visitors.current)}
            </div>
            <div className={styles.metricLabel}>Visitantes</div>
            <div 
              className={styles.metricGrowth}
              style={{ color: getGrowthColor(analyticsData.visitors.growth) }}
            >
              {getGrowthIcon(analyticsData.visitors.growth)}
              {Math.abs(analyticsData.visitors.growth)}% vs período anterior
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaChartLine />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>
              {analyticsData.products.conversionRate}%
            </div>
            <div className={styles.metricLabel}>Taxa de Conversão</div>
            <div className={styles.metricSubtext}>
              {analyticsData.products.purchases} de {analyticsData.products.totalViews} visitas
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className={styles.chartsSection}>
        {/* Gráfico de Vendas Mensais */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              <FaChartBar /> Evolução de Vendas
            </h3>
            <div className={styles.chartControls}>
              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className={styles.chartSelect}
              >
                <option value="sales">Vendas (R\$)</option>
                <option value="orders">Pedidos</option>
              </select>
            </div>
          </div>
          
          <div className={styles.chartContainer}>
            <div className={styles.chartPlaceholder}>
              <div className={styles.barChart}>
                {analyticsData.monthlyTrend.map((item, index) => (
                  <div key={index} className={styles.barGroup}>
                    <div 
                      className={styles.bar}
                      style={{
                        height: `${(item.sales / 50000) * 100}%`,
                        backgroundColor: '#722F37'
                      }}
                    />
                    <div className={styles.barLabel}>{item.month}</div>
                    <div className={styles.barValue}>
                      {selectedChart === 'sales' 
                        ? formatCurrency(item.sales)
                        : `${item.orders} pedidos`
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vendas por Categoria */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              <FaChartPie /> Vendas por Categoria
            </h3>
          </div>
          
          <div className={styles.pieChartContainer}>
            {analyticsData.salesByCategory.map((item, index) => (
              <div key={index} className={styles.categoryItem}>
                <div className={styles.categoryColor} style={{
                  backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)`
                }} />
                <div className={styles.categoryInfo}>
                  <div className={styles.categoryName}>{item.category}</div>
                  <div className={styles.categoryValue}>
                    {formatCurrency(item.value)} ({item.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Produtos */}
      <div className={styles.topProductsSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <FaArrowUp /> Produtos Mais Vendidos
          </h3>
        </div>
        
        <div className={styles.productsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>Produto</div>
            <div className={styles.tableCell}>Vendas</div>
            <div className={styles.tableCell}>Receita</div>
            <div className={styles.tableCell}>Crescimento</div>
          </div>
          
          {analyticsData.topProducts.map((product, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.tableCell}>
                <div className={styles.productRank}>#{index + 1}</div>
                <div className={styles.productName}>{product.name}</div>
              </div>
              <div className={styles.tableCell}>
                <div className={styles.salesCount}>{product.sales} unidades</div>
              </div>
              <div className={styles.tableCell}>
                <div className={styles.revenue}>{formatCurrency(product.revenue)}</div>
              </div>
              <div className={styles.tableCell}>
                <div 
                  className={styles.growth}
                  style={{ color: getGrowthColor(product.growth) }}
                >
                  {product.growth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(product.growth)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas Detalhadas */}
      <div className={styles.detailedMetrics}>
        <div className={styles.metricGroup}>
          <h4 className={styles.groupTitle}>📊 Métricas de Vendas</h4>
          <div className={styles.metricsList}>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Receita Média por Pedido:</span>
              <span className={styles.metricItemValue}>{formatCurrency(analyticsData.sales.avgTicket)}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Total de Transações:</span>
              <span className={styles.metricItemValue}>{formatNumber(analyticsData.sales.transactions)}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Crescimento vs Período Anterior:</span>
              <span 
                className={styles.metricItemValue}
                style={{ color: getGrowthColor(analyticsData.sales.growth) }}
              >
                {analyticsData.sales.growth >= 0 ? '+' : ''}{analyticsData.sales.growth}%
              </span>
            </div>
          </div>
        </div>

        <div className={styles.metricGroup}>
          <h4 className={styles.groupTitle}>👥 Métricas de Visitantes</h4>
          <div className={styles.metricsList}>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Taxa de Rejeição:</span>
              <span className={styles.metricItemValue}>{analyticsData.visitors.bounceRate}%</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Tempo Médio de Sessão:</span>
              <span className={styles.metricItemValue}>{analyticsData.visitors.avgSession}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Crescimento de Visitantes:</span>
              <span 
                className={styles.metricItemValue}
                style={{ color: getGrowthColor(analyticsData.visitors.growth) }}
              >
                {analyticsData.visitors.growth >= 0 ? '+' : ''}{analyticsData.visitors.growth}%
              </span>
            </div>
          </div>
        </div>

        <div className={styles.metricGroup}>
          <h4 className={styles.groupTitle}>🛒 Métricas de Produtos</h4>
          <div className={styles.metricsList}>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Visualizações de Produtos:</span>
              <span className={styles.metricItemValue}>{formatNumber(analyticsData.products.totalViews)}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Adições ao Carrinho:</span>
              <span className={styles.metricItemValue}>{formatNumber(analyticsData.products.addToCart)}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Taxa de Conversão:</span>
              <span className={styles.metricItemValue}>{analyticsData.products.conversionRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;