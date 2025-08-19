import React, { useState } from 'react';
import { 
  FaShoppingBag, 
  FaEye, 
  FaEdit, 
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import { useOrders } from '../../../hooks/useOrders';
import styles from './OrdersPage.module.css';

const OrdersPage = () => {
  const { 
    orders, 
    loading, 
    updateOrderStatus,
    getOrdersByStatus 
  } = useOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Status disponíveis
  const statusOptions = [
    { value: 'Pendente', label: 'Pendente', color: '#F59E0B', icon: FaClock },
    { value: 'Confirmado', label: 'Confirmado', color: '#3B82F6', icon: FaCheckCircle },
    { value: 'Enviado', label: 'Enviado', color: '#8B5CF6', icon: FaTruck },
    { value: 'Entregue', label: 'Entregue', color: '#10B981', icon: FaBox }
  ];

  // Filtrar pedidos
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
      // Toast notification
      const toast = document.createElement('div');
      toast.textContent = `✅ Status atualizado para: ${newStatus}`;
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #722F37;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
      `;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    } else {
      alert('❌ Erro ao atualizar status do pedido');
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <FaShoppingBag className={styles.loadingIcon} />
          <h3>Carregando pedidos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaShoppingBag />
            Gerenciar Pedidos ({filteredOrders.length})
          </h2>
          <p className={styles.pageSubtitle}>
            Acompanhe e gerencie todos os pedidos da sua loja
          </p>
        </div>
        
        <div className={styles.headerStats}>
          {statusOptions.map(status => {
            const count = getOrdersByStatus(status.value).length;
            return (
              <div key={status.value} className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: status.color }}>
                  <status.icon />
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{count}</span>
                  <span className={styles.statLabel}>{status.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por pedido, cliente ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterContainer}>
          <FaFilter className={styles.filterIcon} />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todos os status</option>
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className={styles.ordersSection}>
        {filteredOrders.length > 0 ? (
          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Pedido</div>
              <div className={styles.headerCell}>Cliente</div>
              <div className={styles.headerCell}>Itens</div>
              <div className={styles.headerCell}>Total</div>
              <div className={styles.headerCell}>Status</div>
              <div className={styles.headerCell}>Data</div>
              <div className={styles.headerCell}>Ações</div>
            </div>
            
            <div className={styles.tableBody}>
              {filteredOrders.map((order) => (
                <div key={order.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderNumber}>{order.orderNumber}</span>
                      <span className={styles.paymentMethod}>{order.paymentMethod}</span>
                    </div>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <div className={styles.customerInfo}>
                      <span className={styles.customerName}>{order.customer.name}</span>
                      <span className={styles.customerEmail}>{order.customer.email}</span>
                    </div>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <span className={styles.itemsCount}>
                      {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <span className={styles.orderTotal}>{formatCurrency(order.total)}</span>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`${styles.statusSelect} ${getStatusClass(order.status)}`}
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <div className={styles.dateInfo}>
                      <span className={styles.orderDate}>{formatDate(order.createdAt)}</span>
                      <span className={styles.orderTime}>{formatTime(order.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => openOrderModal(order)}
                        className={styles.actionBtn}
                        title="Ver detalhes"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaShoppingBag className={styles.emptyIcon} />
            <h3>Nenhum pedido encontrado</h3>
            <p>
              {searchQuery || selectedStatus 
                ? 'Tente ajustar os filtros de busca'
                : 'Quando os clientes fizerem pedidos, eles aparecerão aqui'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Pedido */}
      {showOrderModal && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                📦 Detalhes do Pedido {selectedOrder.orderNumber}
              </h3>
              <button
                onClick={closeOrderModal}
                className={styles.modalCloseBtn}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalContent}>
              {/* Informações do Cliente */}
              <div className={styles.orderSection}>
                <h4 className={styles.sectionTitle}>
                  <FaUser /> Informações do Cliente
                </h4>
                <div className={styles.customerDetails}>
                  <div className={styles.customerField}>
                    <FaUser className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>Nome:</span>
                      <span className={styles.fieldValue}>{selectedOrder.customer.name}</span>
                    </div>
                  </div>
                  
                  <div className={styles.customerField}>
                    <FaEnvelope className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>Email:</span>
                      <span className={styles.fieldValue}>{selectedOrder.customer.email}</span>
                    </div>
                  </div>
                  
                  <div className={styles.customerField}>
                    <FaPhone className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>Telefone:</span>
                      <span className={styles.fieldValue}>{selectedOrder.customer.phone}</span>
                    </div>
                  </div>
                  
                  <div className={styles.customerField}>
                    <FaMapMarkerAlt className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>Endereço:</span>
                      <span className={styles.fieldValue}>
                        {selectedOrder.customer.address.street}, {selectedOrder.customer.address.city} - {selectedOrder.customer.address.state}, {selectedOrder.customer.address.zipCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Itens do Pedido */}
              <div className={styles.orderSection}>
                <h4 className={styles.sectionTitle}>
                  <FaBox /> Itens do Pedido
                </h4>
                <div className={styles.orderItems}>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.name}</span>
                        <div className={styles.itemDetails}>
                          <span>Tamanho: {item.size}</span>
                          <span>Cor: {item.color}</span>
                          <span>Qtd: {item.quantity}</span>
                        </div>
                      </div>
                      <div className={styles.itemPrice}>
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className={styles.orderSection}>
                <h4 className={styles.sectionTitle}>
                  💰 Resumo do Pedido
                </h4>
                <div className={styles.orderSummary}>
                  <div className={styles.summaryLine}>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className={styles.summaryLine}>
                    <span>Frete:</span>
                    <span>{formatCurrency(selectedOrder.shipping)}</span>
                  </div>
                  <div className={styles.summaryLine}>
                    <span>Forma de Pagamento:</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className={`${styles.summaryLine} ${styles.totalLine}`}>
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Status e Datas */}
              <div className={styles.orderSection}>
                <h4 className={styles.sectionTitle}>
                  <FaCalendarAlt /> Informações do Pedido
                </h4>
                <div className={styles.orderTimeline}>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineLabel}>Status Atual:</span>
                    <span className={`${styles.timelineStatus} ${getStatusClass(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineLabel}>Pedido Criado:</span>
                    <span className={styles.timelineDate}>
                      {formatDate(selectedOrder.createdAt)} às {formatTime(selectedOrder.createdAt)}
                    </span>
                  </div>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineLabel}>Última Atualização:</span>
                    <span className={styles.timelineDate}>
                      {formatDate(selectedOrder.updatedAt)} às {formatTime(selectedOrder.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={closeOrderModal}
                className={styles.closeBtn}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;