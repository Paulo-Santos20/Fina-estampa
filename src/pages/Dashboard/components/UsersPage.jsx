import React, { useState, useMemo } from 'react';
import { 
  FaUsers, 
  FaUserPlus, 
  FaSearch, 
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaTimes,
  FaKey,
  FaShieldAlt,
  FaExclamationTriangle
} from 'react-icons/fa';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create', 'edit', 'view'
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    permissions: []
  });

  // Dados simulados de usuários
  const allUsers = useMemo(() => [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@finaestampa.com',
      phone: '(11) 99999-1234',
      role: 'admin',
      status: 'active',
      avatar: '',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      createdAt: '2024-01-15',
      lastLogin: '2025-01-08 14:30',
      permissions: ['all'],
      orderCount: 0,
      totalSpent: 0
    },
    {
      id: 2,
      name: 'Carlos Santos',
      email: 'carlos.santos@finaestampa.com',
      phone: '(11) 98888-5678',
      role: 'manager',
      status: 'active',
      avatar: '',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      createdAt: '2024-02-20',
      lastLogin: '2025-01-07 16:45',
      permissions: ['products', 'orders', 'customers'],
      orderCount: 0,
      totalSpent: 0
    },
    {
      id: 3,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      phone: '(11) 97777-9012',
      role: 'user',
      status: 'active',
      avatar: '',
      address: 'Rua Augusta, 500',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000',
      createdAt: '2024-03-10',
      lastLogin: '2025-01-08 09:15',
      permissions: [],
      orderCount: 12,
      totalSpent: 2340.90
    },
    {
      id: 4,
      name: 'João Costa',
      email: 'joao.costa@email.com',
      phone: '(11) 96666-3456',
      role: 'user',
      status: 'inactive',
      avatar: '',
      address: 'Rua Oscar Freire, 200',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-000',
      createdAt: '2024-04-05',
      lastLogin: '2024-12-15 11:20',
      permissions: [],
      orderCount: 3,
      totalSpent: 456.70
    },
    {
      id: 5,
      name: 'Fernanda Lima',
      email: 'fernanda.lima@email.com',
      phone: '(11) 95555-7890',
      role: 'user',
      status: 'active',
      avatar: '',
      address: 'Rua da Consolação, 800',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01302-000',
      createdAt: '2024-05-12',
      lastLogin: '2025-01-06 13:30',
      permissions: [],
      orderCount: 6,
      totalSpent: 1120.30
    }
  ], []);

  const roleOptions = [
    { value: 'all', label: 'Todos os Cargos' },
    { value: 'admin', label: 'Administrador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'user', label: 'Usuário' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' }
  ];

  const permissionsList = [
    { id: 'products', label: 'Gerenciar Produtos', description: 'Criar, editar e excluir produtos' },
    { id: 'orders', label: 'Gerenciar Pedidos', description: 'Visualizar e gerenciar pedidos' },
    { id: 'customers', label: 'Gerenciar Clientes', description: 'Administrar contas de clientes' },
    { id: 'users', label: 'Gerenciar Usuários', description: 'Administrar contas de usuários' },
    { id: 'reports', label: 'Relatórios', description: 'Acesso a relatórios detalhados' },
    { id: 'settings', label: 'Configurações', description: 'Alterar configurações do sistema' }
  ];

  const filteredUsers = useMemo(() => {
    let filtered = [...allUsers];

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    // Filtro por cargo
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    // Filtro por status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'lastLogin':
          return new Date(b.lastLogin) - new Date(a.lastLogin);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allUsers, searchTerm, filterRole, filterStatus, sortBy]);

  // Estatísticas dos usuários
  const userStats = useMemo(() => {
    const total = allUsers.length;
    const active = allUsers.filter(u => u.status === 'active').length;
    const admins = allUsers.filter(u => u.role === 'admin').length;
    const customers = allUsers.filter(u => u.role === 'user').length;

    return { total, active, admins, customers };
  }, [allUsers]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'permissions') {
      setFormData(prev => ({
        ...prev,
        permissions: checked 
          ? [...prev.permissions, value]
          : prev.permissions.filter(p => p !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        permissions: user.permissions || []
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        status: 'active',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        permissions: []
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setModalType('create');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('❌ Por favor, preencha Nome e Email');
      return;
    }

    if (modalType === 'create') {
      alert('✅ Usuário criado com sucesso!');
    } else {
      alert('✅ Usuário atualizado com sucesso!');
    }
    
    closeModal();
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
      alert('✅ Usuário excluído com sucesso!');
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'ativado' : 'desativado';
    alert(`✅ Usuário ${action} com sucesso!`);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#D4AF37';
      case 'manager': return '#3B82F6';
      case 'user': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'user': return 'Usuário';
      default: return 'Usuário';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#10B981' : '#EF4444';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
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
            <FaUsers />
            Gerenciar Usuários ({userStats.total})
          </h2>
          <p className={styles.pageSubtitle}>
            Administre contas de usuários e permissões do sistema
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={() => openModal('create')}
            className={styles.primaryBtn}
          >
            <FaUserPlus /> Novo Usuário
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
            <div className={styles.statNumber}>{userStats.total}</div>
            <div className={styles.statLabel}>Total de Usuários</div>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={styles.statIcon}>
            <FaUserCheck />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{userStats.active}</div>
            <div className={styles.statLabel}>Usuários Ativos</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardGold}`}>
          <div className={styles.statIcon}>
            <FaUserShield />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{userStats.admins}</div>
            <div className={styles.statLabel}>Administradores</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardBlue}`}>
          <div className={styles.statIcon}>
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{userStats.customers}</div>
            <div className={styles.statLabel}>Clientes</div>
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
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={styles.filterSelect}
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

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
            <option value="email">Email (A-Z)</option>
            <option value="role">Cargo</option>
            <option value="created">Mais Recentes</option>
            <option value="lastLogin">Último Login</option>
          </select>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className={styles.usersSection}>
        {filteredUsers.length > 0 ? (
          <div className={styles.usersList}>
            {filteredUsers.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userHeader}>
                  <div className={styles.userBasicInfo}>
                    <div className={styles.userAvatar}>
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    
                    <div className={styles.userInfo}>
                      <div className={styles.userNameRow}>
                        <h4 className={styles.userName}>{user.name}</h4>
                        <div className={styles.userBadges}>
                          <span 
                            className={styles.roleBadge}
                            style={{ backgroundColor: getRoleColor(user.role) }}
                          >
                            <FaUserShield /> {getRoleLabel(user.role)}
                          </span>
                          <span 
                            className={styles.statusBadge}
                            style={{ backgroundColor: getStatusColor(user.status) }}
                          >
                            {user.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>
                      
                      <div className={styles.userContact}>
                        <span className={styles.contactItem}>
                          <FaEnvelope /> {user.email}
                        </span>
                        <span className={styles.contactItem}>
                          <FaPhone /> {user.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.userStats}>
                    {user.role === 'user' && (
                      <>
                        <div className={styles.statItem}>
                          <div className={styles.statValue}>{user.orderCount}</div>
                          <div className={styles.statLabel}>Pedidos</div>
                        </div>
                        <div className={styles.statItem}>
                          <div className={styles.statValue}>{formatCurrency(user.totalSpent)}</div>
                          <div className={styles.statLabel}>Total Gasto</div>
                        </div>
                      </>
                    )}
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{formatDate(user.createdAt)}</div>
                      <div className={styles.statLabel}>Membro desde</div>
                    </div>
                  </div>
                </div>

                <div className={styles.userDetails}>
                  <div className={styles.detailItem}>
                    <FaMapMarkerAlt />
                    <span>{user.address}, {user.city} - {user.state}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FaCalendarAlt />
                    <span>Último login: {new Date(user.lastLogin).toLocaleString('pt-BR')}</span>
                  </div>
                  {user.permissions.length > 0 && user.permissions[0] !== 'all' && (
                    <div className={styles.detailItem}>
                      <FaShieldAlt />
                      <span>Permissões: {user.permissions.length} concedidas</span>
                    </div>
                  )}
                </div>

                <div className={styles.userActions}>
                  <button
                    onClick={() => openModal('view', user)}
                    className={styles.actionBtn}
                  >
                    <FaEye /> Ver Detalhes
                  </button>
                  
                  <button
                    onClick={() => openModal('edit', user)}
                    className={styles.actionBtn}
                  >
                    <FaEdit /> Editar
                  </button>

                  <button
                    onClick={() => handleToggleStatus(user.id, user.status)}
                    className={`${styles.actionBtn} ${user.status === 'active' ? styles.deactivateBtn : styles.activateBtn}`}
                  >
                    {user.status === 'active' ? <FaUserTimes /> : <FaUserCheck />}
                    {user.status === 'active' ? 'Desativar' : 'Ativar'}
                  </button>
                  
                  <button
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  >
                    <FaTrash /> Excluir
                  </button>
                </div>
                            </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaUsers className={styles.emptyIcon} />
            <h3>Nenhum usuário encontrado</h3>
            <p>
              {searchTerm || filterRole !== 'all' || filterStatus !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Nenhum usuário cadastrado ainda'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de Usuário */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {modalType === 'create' && '👤 Novo Usuário'}
                {modalType === 'edit' && '✏️ Editar Usuário'}
                {modalType === 'view' && '👁️ Detalhes do Usuário'}
              </h3>
              <button
                onClick={closeModal}
                className={styles.modalCloseBtn}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              {modalType === 'view' ? (
                // Visualização do usuário
                <div className={styles.userView}>
                  <div className={styles.viewHeader}>
                    <div className={styles.viewAvatar}>
                      {selectedUser?.avatar ? (
                        <img src={selectedUser.avatar} alt={selectedUser.name} />
                      ) : (
                        selectedUser?.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className={styles.viewInfo}>
                      <h4 className={styles.viewName}>{selectedUser?.name}</h4>
                      <p className={styles.viewEmail}>{selectedUser?.email}</p>
                      <div className={styles.viewBadges}>
                        <span 
                          className={styles.roleBadge}
                          style={{ backgroundColor: getRoleColor(selectedUser?.role) }}
                        >
                          <FaUserShield /> {getRoleLabel(selectedUser?.role)}
                        </span>
                        <span 
                          className={styles.statusBadge}
                          style={{ backgroundColor: getStatusColor(selectedUser?.status) }}
                        >
                          {selectedUser?.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.viewDetails}>
                    <div className={styles.viewSection}>
                      <h5 className={styles.viewSectionTitle}>📞 Informações de Contato</h5>
                      <div className={styles.viewGrid}>
                        <div className={styles.viewItem}>
                          <strong>Telefone:</strong> {selectedUser?.phone || 'Não informado'}
                        </div>
                        <div className={styles.viewItem}>
                          <strong>CEP:</strong> {selectedUser?.zipCode || 'Não informado'}
                        </div>
                        <div className={styles.viewItem}>
                          <strong>Cidade:</strong> {selectedUser?.city || 'Não informado'}
                        </div>
                        <div className={styles.viewItem}>
                          <strong>Estado:</strong> {selectedUser?.state || 'Não informado'}
                        </div>
                        <div className={styles.viewItemFull}>
                          <strong>Endereço:</strong> {selectedUser?.address || 'Não informado'}
                        </div>
                      </div>
                    </div>

                    <div className={styles.viewSection}>
                      <h5 className={styles.viewSectionTitle}>📊 Estatísticas</h5>
                      <div className={styles.viewStatsGrid}>
                        <div className={styles.viewStatItem}>
                          <div className={styles.viewStatValue}>{formatDate(selectedUser?.createdAt)}</div>
                          <div className={styles.viewStatLabel}>Membro desde</div>
                        </div>
                        <div className={styles.viewStatItem}>
                          <div className={styles.viewStatValue}>
                            {new Date(selectedUser?.lastLogin).toLocaleDateString('pt-BR')}
                          </div>
                          <div className={styles.viewStatLabel}>Último login</div>
                        </div>
                        {selectedUser?.role === 'user' && (
                          <>
                            <div className={styles.viewStatItem}>
                              <div className={styles.viewStatValue}>{selectedUser?.orderCount}</div>
                              <div className={styles.viewStatLabel}>Pedidos realizados</div>
                            </div>
                            <div className={styles.viewStatItem}>
                              <div className={styles.viewStatValue}>
                                {formatCurrency(selectedUser?.totalSpent)}
                              </div>
                              <div className={styles.viewStatLabel}>Total gasto</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {selectedUser?.role !== 'user' && (
                      <div className={styles.viewSection}>
                        <h5 className={styles.viewSectionTitle}>🔐 Permissões</h5>
                        <div className={styles.permissionsView}>
                          {selectedUser?.permissions.includes('all') ? (
                            <div className={styles.allPermissions}>
                              <FaShieldAlt /> Todas as permissões (Administrador)
                            </div>
                          ) : (
                            <div className={styles.permissionsList}>
                              {permissionsList.map(permission => (
                                <div 
                                  key={permission.id} 
                                  className={`${styles.permissionItem} ${
                                    selectedUser?.permissions.includes(permission.id) ? styles.granted : styles.denied
                                  }`}
                                >
                                  <span className={styles.permissionIcon}>
                                    {selectedUser?.permissions.includes(permission.id) ? '✓' : '✗'}
                                  </span>
                                  <span>{permission.label}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Formulário de criação/edição
                <form onSubmit={handleSubmit} className={styles.userForm}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Nome Completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                        placeholder="Digite o nome completo"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                        placeholder="email@exemplo.com"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>CEP</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="01234-567"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Cargo</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                      >
                        <option value="user">Usuário</option>
                        <option value="manager">Gerente</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="São Paulo"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Estado</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                      >
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="PR">Paraná</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="BA">Bahia</option>
                        <option value="GO">Goiás</option>
                        <option value="PE">Pernambuco</option>
                        <option value="CE">Ceará</option>
                      </select>
                    </div>

                    <div className={styles.formGroupFull}>
                      <label className={styles.formLabel}>Endereço</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="Rua, número, bairro"
                      />
                    </div>
                  </div>

                  {/* Permissões (apenas para manager e admin) */}
                  {formData.role !== 'user' && (
                    <div className={styles.permissionsSection}>
                      <h4 className={styles.permissionsTitle}>
                        <FaShieldAlt /> Permissões do Sistema
                      </h4>
                      
                      {formData.role === 'admin' ? (
                        <div className={styles.adminPermissions}>
                          <div className={styles.adminNotice}>
                            <FaExclamationTriangle />
                            <span>Administradores têm acesso total ao sistema</span>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.permissionsGrid}>
                          {permissionsList.map(permission => (
                            <label key={permission.id} className={styles.permissionLabel}>
                              <input
                                type="checkbox"
                                name="permissions"
                                value={permission.id}
                                checked={formData.permissions.includes(permission.id)}
                                onChange={handleInputChange}
                                className={styles.permissionCheckbox}
                              />
                              <div className={styles.permissionContent}>
                                <span className={styles.permissionName}>{permission.label}</span>
                                <span className={styles.permissionDesc}>{permission.description}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.modalActions}>
                    <button
                      type="button"
                      onClick={closeModal}
                      className={styles.cancelBtn}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                    >
                      <FaSave /> {modalType === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;