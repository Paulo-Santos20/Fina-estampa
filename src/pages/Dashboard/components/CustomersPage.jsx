import React, { useState, useMemo } from 'react';
import { 
  FaUsers, 
  FaUserPlus, 
  FaSearch, 
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingBag,
  FaDollarSign,
  FaStar,
  FaDownload,
  FaUserCheck,
  FaUserTimes
} from 'react-icons/fa';
import styles from './CustomersPage.module.css';

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Dados simulados de clientes
  const allCustomers = useMemo(() => [
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-1234',
      address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
      registeredAt: '2024-01-15',
      lastOrder: '2024-12-20',
      totalOrders: 8,
      totalSpent: 1450.80,
      status: 'active',
      rating: 4.8,
      segment: 'VIP'
    },
    {
      id: 2,
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '(11) 98888-5678',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
      registeredAt: '2024-02-20',
      lastOrder: '2024-12-18',
      totalOrders: 5,
      totalSpent: 890.50,
      status: 'active',
      rating: 4.5,
      segment: 'Regular'
    },
    {
      id: 3,
      name: 'Julia Santos',
      email: 'julia.santos@email.com',
      phone: '(11) 97777-9012',
      address: 'Rua Augusta, 500 - Consolação, São Paulo - SP',
      registeredAt: '2024-03-10',
      lastOrder: '2024-12-15',
      totalOrders: 12,
      totalSpent: 2340.90,
      status: 'active',
      rating: 5.0,
      segment: 'VIP'
    },
    {
      id: 4,
      name: 'Carla Lima',
      email: 'carla.lima@email.com',
      phone: '(11) 96666-3456',
      address: 'Rua Oscar Freire, 200 - Jardins, São Paulo - SP',
      registeredAt: '2024-04-05',
      lastOrder: '2024-11-30',
      totalOrders: 3,
      totalSpent: 456.70,
      status: 'inactive',
      rating: 4.2,
      segment: 'Regular'
    },
    {
      id: 5,
      name: 'Fernanda Oliveira',
      email: 'fernanda.oliveira@email.com',
      phone: '(11) 95555-7890',
      address: 'Rua da Consolação, 800 - Centro, São Paulo - SP',
      registeredAt: '2024-05-12',
      lastOrder: '2024-12-19',
      totalOrders: 6,
      totalSpent: 1120.30,
      status: 'active',
      rating: 4.6,
      segment: 'Regular'
    },
    {
      id: 6,
      name: 'Beatriz Alves',
      email: 'beatriz.alves@email.com',
      phone: '(11) 94444-2468',
      address: 'Av. Faria Lima, 1500 - Itaim Bibi, São Paulo - SP',
      registeredAt: '2024-06-18',
      lastOrder: '2024-10-15',
      totalOrders: 2,
      totalSpent: 298.90,
      status: 'inactive',
      rating: 3.8,
      segment: 'Novo'
    }
  ], []);

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'active', label: 'Ativos' },
    { value: 'inactive', label: 'Inativos' }
  ];

  const segmentOptions = [
    { value: 'all', label: 'Todos os Segmentos' },
    { value: 'VIP', label: 'VIP' },
    { value: 'Regular', label: 'Regular' },
    { value: 'Novo', label: 'Novo' }
  ];

  const filteredCustomers = useMemo(() => {
    let filtered = [...allCustomers];

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    // Filtro por status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(customer => customer.status === filterStatus);
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        case 'totalOrders':
          return b.totalOrders - a.totalOrders;
        case 'lastOrder':
          return new Date(b.lastOrder) - new Date(a.lastOrder);
        case 'registeredAt':
          return new Date(b.registeredAt) - new Date(a.registeredAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allCustomers, searchTerm, filterStatus, sortBy]);

  // Estatísticas dos clientes
  const customerStats = useMemo(() => {
    const total = allCustomers.length;
    const active = allCustomers.filter(c => c.status === 'active').length;
    const vip = allCustomers.filter(c => c.segment === 'VIP').length;
    const totalRevenue = allCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue = totalRevenue / allCustomers.reduce((sum, c) => sum + c.totalOrders, 0);

    return { total, active, vip, totalRevenue, avgOrderValue };
  }, [allCustomers]);

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getSegmentColor = (segment) => {
    switch (segment) {
      case 'VIP': return '#D4AF37';
      case 'Regular': return '#10B981';
      case 'Novo': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#10B981' : '#EF4444';
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const handleExportCustomers = () => {
    alert('📊 Lista de clientes será exportada!');
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaUsers />
            Gerenciar Clientes ({customerStats.total})
          </h2>
          <p className={styles.pageSubtitle}>
            Visualize e gerencie informações dos seus clientes
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={handleExportCustomers}
            className={styles.secondaryBtn}
          >
            <FaDownload /> Exportar
          </button>
          
          <button className={styles.primaryBtn}>
            <FaUserPlus /> Novo Cliente
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{customerStats.total}</div>
            <div className={styles.statLabel}>Total de Clientes</div>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={styles.statIcon}>
            <FaUserCheck />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{customerStats.active}</div>
            <div className={styles.statLabel}>Clientes Ativos</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardGold}`}>
          <div className={styles.statIcon}>
            <FaStar />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{customerStats.vip}</div>
            <div className={styles.statLabel}>Clientes VIP</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardBlue}`}>
          <div className={styles.statIcon}>
            <FaDollarSign />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{formatCurrency(customerStats.totalRevenue)}</div>
            <div className={styles.statLabel}>Receita Total</div>
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
              placeholder="Buscar por nome, email ou telefone..."
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="name">Nome (A-Z)</option>
            <option value="totalSpent">Maior Gasto</option>
            <option value="totalOrders">Mais Pedidos</option>
            <option value="lastOrder">Último Pedido</option>
            <option value="registeredAt">Mais Recentes</option>
          </select>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className={styles.customersSection}>
        {filteredCustomers.length > 0 ? (
          <div className={styles.customersList}>
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className={styles.customerCard}>
                <div className={styles.customerHeader}>
                  <div className={styles.customerBasicInfo}>
                    <div className={styles.customerAvatar}>
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className={styles.customerInfo}>
                      <div className={styles.customerNameRow}>
                        <h4 className={styles.customerName}>{customer.name}</h4>
                        <div className={styles.customerBadges}>
                          <span 
                            className={styles.segmentBadge}
                            style={{ backgroundColor: getSegmentColor(customer.segment) }}
                          >
                            {customer.segment}
                          </span>
                          <span 
                            className={styles.statusBadge}
                            style={{ backgroundColor: getStatusColor(customer.status) }}
                          >                            {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>
                      
                      <div className={styles.customerContact}>
                        <span className={styles.contactItem}>
                          <FaEnvelope /> {customer.email}
                        </span>
                        <span className={styles.contactItem}>
                          <FaPhone /> {customer.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.customerStats}>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{customer.totalOrders}</div>
                      <div className={styles.statLabel}>Pedidos</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{formatCurrency(customer.totalSpent)}</div>
                      <div className={styles.statLabel}>Total Gasto</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>
                        <div className={styles.rating}>
                          <FaStar /> {customer.rating}
                        </div>
                      </div>
                      <div className={styles.statLabel}>Avaliação</div>
                    </div>
                  </div>
                </div>

                <div className={styles.customerDetails}>
                  <div className={styles.detailItem}>
                    <FaMapMarkerAlt />
                    <span>{customer.address}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FaCalendarAlt />
                    <span>Cliente desde {formatDate(customer.registeredAt)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FaShoppingBag />
                    <span>Último pedido: {formatDate(customer.lastOrder)}</span>
                  </div>
                </div>

                <div className={styles.customerActions}>
                  <button
                    onClick={() => handleViewCustomer(customer)}
                    className={styles.actionBtn}
                  >
                    <FaEye /> Ver Detalhes
                  </button>
                  
                  <button className={styles.actionBtn}>
                    <FaEdit /> Editar
                  </button>
                  
                  <button className={`${styles.actionBtn} ${styles.contactBtn}`}>
                    <FaEnvelope /> Contatar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaUsers className={styles.emptyIcon} />
            <h3>Nenhum cliente encontrado</h3>
            <p>
              {searchTerm || filterStatus !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Nenhum cliente cadastrado ainda'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Cliente */}
      {showModal && selectedCustomer && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                Detalhes do Cliente
              </h3>
              <button
                onClick={handleCloseModal}
                className={styles.modalCloseBtn}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.customerProfile}>
                <div className={styles.profileAvatar}>
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.profileInfo}>
                  <h4 className={styles.profileName}>{selectedCustomer.name}</h4>
                  <div className={styles.profileBadges}>
                    <span 
                      className={styles.segmentBadge}
                      style={{ backgroundColor: getSegmentColor(selectedCustomer.segment) }}
                    >
                      {selectedCustomer.segment}
                    </span>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(selectedCustomer.status) }}
                    >
                      {selectedCustomer.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailsSection}>
                  <h5 className={styles.sectionTitle}>Informações de Contato</h5>
                  <div className={styles.detailsList}>
                    <div className={styles.detailRow}>
                      <FaEnvelope />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <FaPhone />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <FaMapMarkerAlt />
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.detailsSection}>
                  <h5 className={styles.sectionTitle}>Estatísticas</h5>
                  <div className={styles.statsModalGrid}>
                    <div className={styles.modalStatItem}>
                      <div className={styles.modalStatValue}>{selectedCustomer.totalOrders}</div>
                      <div className={styles.modalStatLabel}>Total de Pedidos</div>
                    </div>
                    <div className={styles.modalStatItem}>
                      <div className={styles.modalStatValue}>{formatCurrency(selectedCustomer.totalSpent)}</div>
                      <div className={styles.modalStatLabel}>Total Gasto</div>
                    </div>
                    <div className={styles.modalStatItem}>
                      <div className={styles.modalStatValue}>
                        {formatCurrency(selectedCustomer.totalSpent / selectedCustomer.totalOrders)}
                      </div>
                      <div className={styles.modalStatLabel}>Ticket Médio</div>
                    </div>
                    <div className={styles.modalStatItem}>
                      <div className={styles.modalStatValue}>
                        <FaStar /> {selectedCustomer.rating}
                      </div>
                      <div className={styles.modalStatLabel}>Avaliação</div>
                    </div>
                  </div>
                </div>

                <div className={styles.detailsSection}>
                  <h5 className={styles.sectionTitle}>Histórico</h5>
                  <div className={styles.detailsList}>
                    <div className={styles.detailRow}>
                      <FaCalendarAlt />
                      <span>Cliente desde {formatDate(selectedCustomer.registeredAt)}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <FaShoppingBag />
                      <span>Último pedido: {formatDate(selectedCustomer.lastOrder)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button className={styles.modalActionBtn}>
                  <FaEdit /> Editar Cliente
                </button>
                <button className={`${styles.modalActionBtn} ${styles.contactModalBtn}`}>
                  <FaEnvelope /> Enviar Email
                </button>
                <button className={styles.modalActionBtn}>
                  <FaShoppingBag /> Ver Pedidos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;