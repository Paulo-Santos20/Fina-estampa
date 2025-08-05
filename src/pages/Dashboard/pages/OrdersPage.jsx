import React, { useState, useMemo } from 'react';
import { FaClipboardList, FaEye, FaEdit, FaSearch, FaFilter } from 'react-icons/fa';
import styles from '../Dashboard.module.css';

const OrdersPage = ({ user, timeRange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dados simulados de pedidos
  const allOrders = useMemo(() => {
    if (user?.type === 'admin') {
      return [
        { id: '#1234', customer: 'Maria Silva', product: 'Vestido Floral Midi', value: 189.90, status: 'Pago', date: '2024-12-20', time: '14:30' },
        { id: '#1235', customer: 'Ana Costa', product: 'Blusa Social Branca', value: 89.90, status: 'Pendente', date: '2024-12-20', time: '13:15' },
        { id: '#1236', customer: 'Julia Santos', product: 'Calça Jeans Skinny', value: 159.90, status: 'Enviado', date: '2024-12-19', time: '16:45' },
        { id: '#1237', customer: 'Carla Lima', product: 'Saia Plissada Rosa', value: 129.90, status: 'Entregue', date: '2024-12-19', time: '10:20' },
        { id: '#1238', customer: 'Fernanda Oliveira', product: 'Macacão Elegante', value: 249.90, status: 'Pago', date: '2024-12-18', time: '11:30' },
        { id: '#1239', customer: 'Beatriz Alves', product: 'Vestido Longo Festa', value: 299.90, status: 'Preparando', date: '2024-12-18', time: '09:15' },
        { id: '#1240', customer: 'Camila Rocha', product: 'Blazer Feminino', value: 199.90, status: 'Enviado', date: '2024-12-17', time: '15:45' },
        { id: '#1241', customer: 'Daniela Martins', product: 'Conjunto Esportivo', value: 119.90, status: 'Entregue', date: '2024-12-17', time: '08:30' }
      ];
    } else {
      return [
        { id: '#1234', product: 'Vestido Floral Midi', value: 189.90, status: 'Entregue', date: '2024-12-15', time: '14:30' },
        { id: '#1235', product: 'Blusa Social Branca', value: 89.90, status: 'A caminho', date: '2024-12-18', time: '13:15' },
        { id: '#1236', product: 'Calça Jeans Skinny', value: 159.90, status: 'Preparando', date: '2024-12-20', time: '16:45' },
        { id: '#1237', product: 'Saia Plissada Rosa', value: 129.90, status: 'Entregue', date: '2024-12-10', time: '10:20' },
        { id: '#1238', product: 'Macacão Elegante', value: 249.90, status: 'Entregue', date: '2024-12-08', time: '11:30' }
      ];
    }
  }, [user]);

  const statusOptions = ['all', 'Pago', 'Pendente', 'Preparando', 'Enviado', 'A caminho', 'Entregue'];

  const filteredOrders = useMemo(() => {
    let filtered = allOrders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.customer && order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    return filtered.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
  }, [allOrders, searchTerm, filterStatus]);

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.value, 0);

  return (
    <>
      {/* Estatísticas */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.primary}`}>
            <div className={styles.statIcon}>
              <FaClipboardList />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{filteredOrders.length}</h3>
              <p className={styles.statTitle}>Total de Pedidos</p>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.success}`}>
            <div className={styles.statIcon}>
              <FaClipboardList />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>
                R\$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
              <p className={styles.statTitle}>Valor Total</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.info}`}>
            <div className={styles.statIcon}>
              <FaClipboardList />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>
                {filteredOrders.filter(o => o.status === 'Entregue').length}
              </h3>
              <p className={styles.statTitle}>Pedidos Entregues</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.warning}`}>
            <div className={styles.statIcon}>
              <FaClipboardList />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>
                {filteredOrders.filter(o => ['Pendente', 'Preparando'].includes(o.status)).length}
              </h3>
              <p className={styles.statTitle}>Pedidos Pendentes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros e Lista */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {user?.type === 'admin' ? 'Todos os Pedidos' : 'Meus Pedidos'}
          </h2>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid var(--cinza-claro)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.8rem',
              border: '2px solid var(--cinza-claro)',
              borderRadius: 'var(--radius-medium)',
              fontSize: '0.9rem',
              minWidth: '150px'
            }}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'Todos Status' : status}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de Pedidos */}
        <div className={styles.ordersTable}>
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderRow}>
              <div className={styles.orderInfo}>
                <span className={styles.orderId}>{order.id}</span>
                {user?.type === 'admin' && order.customer && (
                  <span className={styles.customerName}>{order.customer}</span>
                )}
                <span className={styles.productName}>{order.product}</span>
                <span className={styles.orderDate}>
                  {new Date(order.date).toLocaleDateString('pt-BR')} às {order.time}
                </span>
              </div>
              <div className={styles.orderDetails}>
                <span className={styles.orderValue}>
                  R\$ {order.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className={`${styles.orderStatus} ${styles[order.status.toLowerCase().replace(/\s+/g, '')]}`}>
                  {order.status}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    style={{
                      background: 'var(--wine-destaque)',
                      border: 'none',
                      color: 'white',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-medium)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <FaEye /> Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--cinza-medio)' 
          }}>
            <FaClipboardList style={{ fontSize: '3rem', marginBottom: '1rem' }} />
            <p>Nenhum pedido encontrado</p>
          </div>
        )}
      </section>
    </>
  );
};

export default OrdersPage;