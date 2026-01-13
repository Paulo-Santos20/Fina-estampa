import React, { useState } from 'react';
import { 
  FaShoppingBag, FaEye, FaSearch, FaFilter, FaCalendarAlt,
  FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBox,
  FaTruck, FaCheckCircle, FaClock, FaTimes
} from 'react-icons/fa';
import { useOrders } from '../../../hooks/useOrders';
import { useToast } from '../../../components/ui/Toast'; // Assuming you have this
import styles from './OrdersPage.module.css';

const OrdersPage = () => {
  const { 
    orders, 
    loading, 
    updateOrderStatus,
    getOrdersByStatus 
  } = useOrders();

  const { showSuccess, showError } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Status configuration for badges and icons
  const statusConfig = {
    'Pendente': { color: '#F59E0B', bg: '#FFFBEB', icon: FaClock, label: 'Pendente' },
    'Confirmado': { color: '#3B82F6', bg: '#EFF6FF', icon: FaCheckCircle, label: 'Confirmado' },
    'Enviado': { color: '#8B5CF6', bg: '#F5F3FF', icon: FaTruck, label: 'Enviado' },
    'Entregue': { color: '#10B981', bg: '#ECFDF5', icon: FaBox, label: 'Entregue' },
    'Cancelado': { color: '#EF4444', bg: '#FEF2F2', icon: FaTimes, label: 'Cancelado' }
  };

  // Filter logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    const success = updateOrderStatus(orderId, newStatus);
    if (success) {
      showSuccess(`Status atualizado para: ${newStatus}`);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } else {
      showError('Erro ao atualizar status');
    }
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setShowOrderModal(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className={styles.loading}>Carregando pedidos...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Gerenciar Pedidos</h2>
          <p className={styles.pageSubtitle}>
            Acompanhe e gerencie todos os pedidos da sua loja
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {Object.entries(statusConfig).map(([key, config]) => {
          if (key === 'Cancelado') return null; // Optional: hide cancelled stats
          const count = getOrdersByStatus(key).length;
          const Icon = config.icon;
          return (
            <div key={key} className={styles.statCard}>
              <div className={styles.statIconWrapper} style={{ backgroundColor: config.bg, color: config.color }}>
                <Icon />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{count}</span>
                <span className={styles.statLabel}>{config.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por pedido, cliente ou email..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        <div className={styles.filterBox}>
          <FaFilter className={styles.filterIcon} />
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">Todos os Status</option>
            {Object.keys(statusConfig).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className={styles.ordersList}>
        {filteredOrders.length > 0 ? (
          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const statusInfo = statusConfig[order.status] || statusConfig['Pendente'];
                  return (
                    <tr key={order.id}>
                      <td className={styles.orderIdCell}>
                        <span className={styles.orderNumber}>{order.orderNumber}</span>
                        <span className={styles.paymentInfo}>{order.items.length} itens</span>
                      </td>
                      <td>
                        <div className={styles.customerCell}>
                          <span className={styles.customerName}>{order.customer.name}</span>
                          <span className={styles.customerEmail}>{order.customer.email}</span>
                        </div>
                      </td>
                      <td className={styles.dateCell}>
                        <span>{formatDate(order.createdAt)}</span>
                        <small>{formatTime(order.createdAt)}</small>
                      </td>
                      <td className={styles.totalCell}>
                        {formatCurrency(order.total)}
                      </td>
                      <td>
                        <span 
                          className={styles.statusBadge} 
                          style={{ backgroundColor: statusInfo.bg, color: statusInfo.color }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => openOrderModal(order)} 
                          className={styles.iconBtn}
                          title="Ver Detalhes"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaShoppingBag />
            <h3>Nenhum pedido encontrado</h3>
            <p>Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Pedido {selectedOrder.orderNumber}</h3>
                <span className={styles.modalDate}>Realizado em {formatDate(selectedOrder.createdAt)}</span>
              </div>
              <button onClick={closeOrderModal} className={styles.closeBtn}><FaTimes /></button>
            </div>

            <div className={styles.modalBody}>
              {/* Status Bar */}
              <div className={styles.statusBar}>
                <label>Status do Pedido:</label>
                <select 
                  value={selectedOrder.status} 
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className={styles.statusSelect}
                  style={{ 
                    borderColor: statusConfig[selectedOrder.status]?.color,
                    color: statusConfig[selectedOrder.status]?.color
                  }}
                >
                  {Object.keys(statusConfig).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className={styles.detailsGrid}>
                {/* Customer Info */}
                <div className={styles.detailsCard}>
                  <h4><FaUser /> Cliente</h4>
                  <div className={styles.infoRow}>
                    <strong>Nome:</strong> <span>{selectedOrder.customer.name}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <strong>Email:</strong> <span>{selectedOrder.customer.email}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <strong>Tel:</strong> <span>{selectedOrder.customer.phone}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className={styles.detailsCard}>
                  <h4><FaMapMarkerAlt /> Entrega</h4>
                  <p className={styles.addressText}>
                    {selectedOrder.customer.address.street}<br/>
                    {selectedOrder.customer.address.city} - {selectedOrder.customer.address.state}<br/>
                    CEP: {selectedOrder.customer.address.zipCode}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className={styles.itemsSection}>
                <h4>Itens do Pedido</h4>
                <div className={styles.itemsList}>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className={styles.itemRow}>
                      <div className={styles.itemMain}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemMeta}>{item.size} / {item.color}</span>
                      </div>
                      <div className={styles.itemQty}>x{item.quantity}</div>
                      <div className={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className={styles.totalsSection}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Frete</span>
                  <span>{formatCurrency(selectedOrder.shipping)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                  <span>Total</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
                <div className={styles.paymentInfoBox}>
                  Pagamento via <strong>{selectedOrder.paymentMethod}</strong>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={closeOrderModal} className={styles.primaryBtn}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;