import React, { useState, useMemo, useEffect } from 'react';
import { 
  FaClipboardList, 
  FaEye, 
  FaEdit, 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaPrint,
  FaWhatsapp,
  FaCheck,
  FaTimes,
  FaClock,
  FaTruck,
  FaBox,
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaShippingFast
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './OrdersPage.module.css';

const OrdersPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Dados simulados de pedidos mais completos
  const allOrders = useMemo(() => {
    const baseOrders = [
      {
        id: '#ORD-001',
        customer: {
          name: 'Maria Silva',
          email: 'maria.silva@email.com',
          phone: '(11) 99999-1234',
          address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP, 05435-000'
        },
        items: [
          { 
            id: 1, 
            name: 'Vestido Floral Midi', 
            color: 'Azul', 
            size: 'M', 
            quantity: 1, 
            price: 189.90,
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop'
          }
        ],
        subtotal: 189.90,
        shipping: 15.00,
        total: 204.90,
        status: 'Pago',
        paymentMethod: 'PIX',
        createdAt: '2024-12-20T14:30:00',
        updatedAt: '2024-12-20T14:35:00',
        trackingCode: 'BR123456789',
        notes: 'Cliente solicitou entrega rápida',
        priority: 'normal'
      },
      {
        id: '#ORD-002',
        customer: {
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          phone: '(11) 98888-5678',
          address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100'
        },
        items: [
          { 
            id: 2, 
            name: 'Blusa Social Branca', 
            color: 'Branco', 
            size: 'P', 
            quantity: 2, 
            price: 89.90,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop'
          },
          { 
            id: 3, 
            name: 'Calça Social Preta', 
            color: 'Preto', 
            size: 'P', 
            quantity: 1, 
            price: 159.90,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop'
          }
        ],
        subtotal: 339.70,
        shipping: 20.00,
        total: 359.70,
        status: 'Pendente',
        paymentMethod: 'Cartão de Crédito',
        createdAt: '2024-12-20T13:15:00',
        updatedAt: '2024-12-20T13:15:00',
        trackingCode: null,
        notes: '',
        priority: 'high'
      },
      {
        id: '#ORD-003',
        customer: {
          name: 'Julia Santos',
          email: 'julia.santos@email.com',
          phone: '(11) 97777-9012',
          address: 'Rua Augusta, 500 - Consolação, São Paulo - SP, 01305-000'
        },
        items: [
          { 
            id: 4, 
            name: 'Vestido Longo Festa', 
            color: 'Vinho', 
            size: 'G', 
            quantity: 1, 
            price: 299.90,
            image: 'https://images.unsplash.com/photo-1566479179817-c0e8e5e0c5e1?w=300&h=400&fit=crop'
          }
        ],
        subtotal: 299.90,
        shipping: 0.00,
        total: 299.90,
        status: 'Enviado',
        paymentMethod: 'PIX',
        createdAt: '2024-12-19T16:45:00',
        updatedAt: '2024-12-20T09:30:00',
        trackingCode: 'BR987654321',
        notes: 'Frete grátis por compra acima de R\$ 250',
        priority: 'normal'
      },
      {
        id: '#ORD-004',
        customer: {
          name: 'Carla Lima',
          email: 'carla.lima@email.com',
          phone: '(11) 96666-3456',
          address: 'Rua Oscar Freire, 200 - Jardins, São Paulo - SP, 01426-000'
        },
        items: [
          { 
            id: 5, 
            name: 'Saia Plissada Rosa', 
            color: 'Rosa', 
            size: 'M', 
            quantity: 1, 
            price: 129.90,
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=300&h=400&fit=crop'
          }
        ],
        subtotal: 129.90,
        shipping: 15.00,
        total: 144.90,
        status: 'Entregue',
        paymentMethod: 'Boleto',
        createdAt: '2024-12-19T10:20:00',
        updatedAt: '2024-12-20T14:00:00',
        trackingCode: 'BR456789123',
        notes: 'Entrega realizada com sucesso',
        priority: 'normal'
      },
      {
        id: '#ORD-005',
        customer: {
          name: 'Fernanda Oliveira',
          email: 'fernanda.oliveira@email.com',
          phone: '(11) 95555-7890',
          address: 'Rua da Consolação, 800 - Centro, São Paulo - SP, 01302-000'
        },
        items: [
          { 
            id: 6, 
            name: 'Macacão Elegante', 
            color: 'Preto', 
            size: 'P', 
            quantity: 1, 
            price: 249.90,
            image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop'
          }
        ],
        subtotal: 249.90,
        shipping: 18.00,
        total: 267.90,
        status: 'Preparando',
        paymentMethod: 'PIX',
        createdAt: '2024-12-18T11:30:00',
        updatedAt: '2024-12-19T08:15:00',
        trackingCode: null,
        notes: 'Produto em separação no estoque',
        priority: 'normal'
      },
      {
        id: '#ORD-006',
        customer: {
          name: 'Beatriz Alves',
          email: 'beatriz.alves@email.com',
          phone: '(11) 94444-2468',
          address: 'Av. Faria Lima, 1500 - Itaim Bibi, São Paulo - SP, 04538-132'
        },
        items: [
          { 
            id: 7, 
            name: 'Blazer Feminino', 
            color: 'Azul Marinho', 
            size: 'M', 
            quantity: 1, 
            price: 199.90,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop'
          }
        ],
        subtotal: 199.90,
        shipping: 15.00,
        total: 214.90,
        status: 'Cancelado',
        paymentMethod: 'Cartão de Crédito',
        createdAt: '2024-12-18T09:15:00',
        updatedAt: '2024-12-18T15:30:00',
        trackingCode: null,
        notes: 'Cancelado a pedido do cliente',
        priority: 'low'
      }
    ];

    // Se for cliente, filtrar apenas pedidos do usuário
    if (user?.role === 'customer') {
      return baseOrders.filter(order => order.customer.email === user.email);
    }

    return baseOrders;
  }, [user]);

  const statusOptions = [
    { value: 'all', label: 'Todos os Status', color: '#6B7280' },
    { value: 'Pendente', label: 'Pendente', color: '#F59E0B' },
    { value: 'Pago', label: 'Pago', color: '#10B981' },
    { value: 'Preparando', label: 'Preparando', color: '#3B82F6' },
    { value: 'Enviado', label: 'Enviado', color: '#8B5CF6' },
    { value: 'Entregue', label: 'Entregue', color: '#059669' },
    { value: 'Cancelado', label: 'Cancelado', color: '#EF4444' }
  ];

  const periodOptions = [
    { value: 'all', label: 'Todos os Períodos' },
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' },
    { value: 'quarter', label: 'Últimos 3 Meses' }
  ];

  const filteredOrders = useMemo(() => {
    let filtered = [...allOrders];

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filtro por status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    // Filtro por período
    if (filterPeriod !== 'all') {
      const now = new Date();
      const orderDate = new Date();
      
      filtered = filtered.filter(order => {
        const createdAt = new Date(order.createdAt);
        
        switch (filterPeriod) {
          case 'today':
            return createdAt.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return createdAt >= weekAgo;
          case 'month':
            return createdAt.getMonth() === now.getMonth() && 
                   createdAt.getFullYear() === now.getFullYear();
          case 'quarter':
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            return createdAt >= quarterAgo;
          default:
            return true;
        }
      });
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'value-high':
          return b.total - a.total;
        case 'value-low':
          return a.total - b.total;
        case 'customer':
          return a.customer.name.localeCompare(b.customer.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allOrders, searchTerm, filterStatus, filterPeriod, sortBy]);

  // Estatísticas calculadas
  const orderStats = useMemo(() => {
    const total = filteredOrders.length;
    const totalValue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const delivered = filteredOrders.filter(o => o.status === 'Entregue').length;
    const pending = filteredOrders.filter(o => ['Pendente', 'Preparando'].includes(o.status)).length;
    const avgOrderValue = total > 0 ? totalValue / total : 0;

    return { total, totalValue, delivered, pending, avgOrderValue };
  }, [filteredOrders]);

  // Handlers
  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Aqui você implementaria a lógica para atualizar o status do pedido
    console.log(`Alterando status do pedido ${orderId} para ${newStatus}`);
    setShowStatusModal(false);
    setEditingOrder(null);
  };

  const handleWhatsAppContact = (order) => {
    const message = `Olá ${order.customer.name}! Sobre seu pedido ${order.id}: `;
    const phone = order.customer.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleExportOrders = () => {
    // Implementar exportação para CSV/Excel
    console.log('Exportando pedidos...');
  };

  const handlePrintOrder = (order) => {
    // Implementar impressão do pedido
    console.log('Imprimindo pedido:', order.id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pendente': return <FaClock />;
      case 'Pago': return <FaCheckCircle />;
      case 'Preparando': return <FaBox />;
      case 'Enviado': return <FaTruck />;
      case 'Entregue': return <FaCheck />;
      case 'Cancelado': return <FaTimesCircle />;
      default: return <FaClipboardList />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'normal': return '#6B7280';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaClipboardList />
            {user?.role === 'admin' ? 'Gerenciar Pedidos' : 'Meus Pedidos'}
          </h2>
          <p className={styles.pageSubtitle}>
            {user?.role === 'admin' 
              ? 'Gerencie todos os pedidos da loja'
              : 'Acompanhe seus pedidos e histórico de compras'
            }
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={handleExportOrders}
            className={styles.secondaryBtn}
          >
            <FaDownload /> Exportar
          </button>
          
          {selectedOrders.length > 0 && (
            <button 
              className={styles.primaryBtn}
            >
              <FaEdit /> Ações em Lote ({selectedOrders.length})
            </button>
          )}
        </div>
      </div>

      {/* Estatísticas */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaClipboardList />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{orderStats.total}</div>
            <div className={styles.statLabel}>Total de Pedidos</div>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={styles.statIcon}>
            <FaDollarSign />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{formatCurrency(orderStats.totalValue)}</div>
            <div className={styles.statLabel}>Valor Total</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardBlue}`}>
          <div className={styles.statIcon}>
            <FaCheckCircle />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{orderStats.delivered}</div>
            <div className={styles.statLabel}>Pedidos Entregues</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardOrange}`}>
          <div className={styles.statIcon}>
            <FaClock />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{orderStats.pending}</div>
            <div className={styles.statLabel}>Pedidos Pendentes</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersRow}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por pedido, cliente ou produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className={styles.filterSelect}
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Mais Recentes</option>
            <option value="oldest">Mais Antigos</option>
            <option value="value-high">Maior Valor</option>
            <option value="value-low">Menor Valor</option>
            <option value="customer">Cliente (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Controles de Seleção */}
      {user?.role === 'admin' && filteredOrders.length > 0 && (
        <div className={styles.selectionControls}>
          <label className={styles.selectAllLabel}>
            <input
              type="checkbox"
              checked={selectedOrders.length === filteredOrders.length}
              onChange={handleSelectAllOrders}
              className={styles.checkbox}
            />
            Selecionar todos ({filteredOrders.length})
          </label>
          
          {selectedOrders.length > 0 && (
            <div className={styles.bulkActions}>
              <button className={styles.bulkBtn}>
                <FaCheck /> Marcar como Pago
              </button>
              <button className={styles.bulkBtn}>
                <FaTruck /> Marcar como Enviado
              </button>
              <button className={styles.bulkBtn}>
                <FaPrint /> Imprimir Selecionados
              </button>
            </div>
          )}
        </div>
      )}

      {/* Lista de Pedidos */}
      <div className={styles.ordersSection}>
        {filteredOrders.length > 0 ? (
          <div className={styles.ordersList}>
            {filteredOrders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                {/* Header do Pedido */}
                <div className={styles.orderHeader}>
                  <div className={styles.orderHeaderLeft}>
                    {user?.role === 'admin' && (
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className={styles.checkbox}
                      />
                    )}
                    
                    <div className={styles.orderBasicInfo}>
                      <div className={styles.orderIdRow}>
                        <span className={styles.orderId}>{order.id}</span>
                        <div 
                          className={styles.priorityIndicator}
                          style={{ backgroundColor: getPriorityColor(order.priority) }}
                        />
                      </div>
                      
                      <div className={styles.orderMeta}>
                        <span className={styles.orderDate}>
                          <FaCalendarAlt /> {formatDate(order.createdAt)}
                        </span>
                        <span className={styles.customerName}>
                          <FaUser /> {order.customer.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.orderHeaderRight}>
                    <div className={styles.orderValue}>
                      {formatCurrency(order.total)}
                    </div>
                    
                    <div 
                      className={styles.orderStatus}
                      style={{ 
                        backgroundColor: statusOptions.find(s => s.value === order.status)?.color || '#6B7280'
                      }}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>

                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className={styles.expandBtn}
                    >
                      {expandedOrder === order.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>

                {/* Detalhes Expandidos */}
                {expandedOrder === order.id && (
                  <div className={styles.orderDetails}>
                    {/* Informações do Cliente */}
                    <div className={styles.detailSection}>
                      <h4 className={styles.detailTitle}>
                        <FaUser /> Informações do Cliente
                      </h4>
                      <div className={styles.customerDetails}>
                        <div className={styles.customerInfo}>
                          <p><strong>Nome:</strong> {order.customer.name}</p>
                          <p><strong>Email:</strong> {order.customer.email}</p>
                          <p><strong>Telefone:</strong> {order.customer.phone}</p>
                        </div>
                        <div className={styles.addressInfo}>
                          <p><strong>Endereço:</strong></p>
                          <p>{order.customer.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Itens do Pedido */}
                    <div className={styles.detailSection}>
                      <h4 className={styles.detailTitle}>
                        <FaBox /> Itens do Pedido
                      </h4>
                      <div className={styles.orderItems}>
                        {order.items.map((item) => (
                          <div key={item.id} className={styles.orderItem}>
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className={styles.itemImage}
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop";
                              }}
                            />
                            <div className={styles.itemDetails}>
                              <h5 className={styles.itemName}>{item.name}</h5>
                              <p className={styles.itemVariations}>
                                Cor: {item.color} | Tamanho: {item.size}
                              </p>
                              <p className={styles.itemQuantity}>
                                Quantidade: {item.quantity}
                              </p>
                            </div>
                            <div className={styles.itemPrice}>
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resumo Financeiro */}
                    <div className={styles.detailSection}>
                      <h4 className={styles.detailTitle}>
                        <FaDollarSign /> Resumo Financeiro
                      </h4>
                      <div className={styles.financialSummary}>
                        <div className={styles.summaryRow}>
                          <span>Subtotal:</span>
                          <span>{formatCurrency(order.subtotal)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span>Frete:</span>
                          <span>{formatCurrency(order.shipping)}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                          <span>Total:</span>
                          <span>{formatCurrency(order.total)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span>Forma de Pagamento:</span>
                          <span>{order.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* Informações de Entrega */}
                    <div className={styles.detailSection}>
                      <h4 className={styles.detailTitle}>
                        <FaTruck /> Informações de Entrega
                      </h4>
                      <div className={styles.shippingInfo}>
                        {order.trackingCode ? (
                          <p><strong>Código de Rastreamento:</strong> {order.trackingCode}</p>
                        ) : (
                          <p>Código de rastreamento será fornecido após o envio</p>
                        )}
                        <p><strong>Última Atualização:</strong> {formatDate(order.updatedAt)}</p>
                        {order.notes && (
                          <div className={styles.orderNotes}>
                            <strong>Observações:</strong>
                            <p>{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ações do Pedido */}
                    <div className={styles.orderActions}>
                      {user?.role === 'admin' && (
                        <>
                          <button
                            onClick={() => {
                              setEditingOrder(order);
                              setShowStatusModal(true);
                            }}
                            className={styles.actionBtn}
                          >
                            <FaEdit /> Alterar Status
                          </button>
                          
                          <button
                            onClick={() => handleWhatsAppContact(order)}
                            className={`${styles.actionBtn} ${styles.whatsappBtn}`}
                          >
                            <FaWhatsapp /> Contatar Cliente
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handlePrintOrder(order)}
                        className={styles.actionBtn}
                      >
                        <FaPrint /> Imprimir
                      </button>
                      
                      <button className={styles.actionBtn}>
                        <FaDownload /> Baixar PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaClipboardList className={styles.emptyIcon} />
            <h3>Nenhum pedido encontrado</h3>
            <p>
              {searchTerm || filterStatus !== 'all' || filterPeriod !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : user?.role === 'admin' 
                  ? 'Nenhum pedido foi realizado ainda'
                  : 'Você ainda não fez nenhum pedido'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de Alteração de Status */}
      {showStatusModal && editingOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                Alterar Status do Pedido {editingOrder.id}
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className={styles.modalCloseBtn}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <p>Status atual: <strong>{editingOrder.status}</strong></p>
              
              <div className={styles.statusOptions}>
                {statusOptions.filter(s => s.value !== 'all').map(status => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(editingOrder.id, status.value)}
                    className={`${styles.statusOption} ${
                      status.value === editingOrder.status ? styles.currentStatus : ''
                    }`}
                    style={{ borderColor: status.color }}
                  >
                    {getStatusIcon(status.value)}
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;