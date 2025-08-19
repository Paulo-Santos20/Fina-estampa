import React, { useState } from 'react';
import { 
  FaUsers, 
  FaPlus,
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
  FaChartLine,
  FaSave,
  FaTimes,
  FaUser,
  FaIdCard,
  FaVenusMars
} from 'react-icons/fa';
import { useCustomers } from '../../../hooks/useCustomers';
import { useToast } from '../../../components/ui/Toast';
import styles from './CustomersPage.module.css';

const CustomersPage = () => {
  const { 
    customers, 
    loading, 
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getCustomerStats 
  } = useCustomers();

  const { showSuccess, showError, showWarning } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSegment, setFilterSegment] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    cpf: '',
    address: {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  // MOVER A FUNÇÃO PARA ANTES DE SEU USO
  const getCustomerSegment = (totalSpent) => {
    if (totalSpent >= 1000) return { label: 'VIP', color: '#722F37' };
    if (totalSpent >= 500) return { label: 'Premium', color: '#8B5CF6' };
    if (totalSpent >= 200) return { label: 'Regular', color: '#3B82F6' };
    return { label: 'Novo', color: '#10B981' };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const stats = getCustomerStats();

  // Filtrar clientes
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = !searchQuery || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    
    const segment = getCustomerSegment(customer.totalSpent);
    const matchesSegment = !filterSegment || segment.label === filterSegment;
    
    return matchesSearch && matchesSegment;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: '',
      cpf: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingCustomer(null);
    setShowAddModal(true);
  };

  const openEditModal = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      birthDate: customer.birthDate,
      gender: customer.gender,
      cpf: customer.cpf || '',
      address: {
        street: customer.address.street,
        neighborhood: customer.address.neighborhood,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode
      }
    });
    setEditingCustomer(customer);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setEditingCustomer(null);
    setIsSubmitting(false);
    resetForm();
  };

  const openCustomerModal = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const closeCustomerModal = () => {
    setSelectedCustomer(null);
    setShowCustomerModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);

    try {
      const customerData = {
        ...formData,
        status: 'Ativo',
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: null,
        createdAt: new Date().toISOString()
      };

      if (editingCustomer) {
        const success = updateCustomer(editingCustomer.id, customerData);
        if (success) {
          showSuccess('Cliente atualizado com sucesso!');
          closeAddModal();
        } else {
          showError('Erro ao atualizar cliente');
        }
      } else {
        const newCustomer = addCustomer(customerData);
        if (newCustomer) {
          showSuccess('Cliente cadastrado com sucesso!');
          closeAddModal();
        } else {
          showError('Erro ao cadastrar cliente');
        }
      }
    } catch (err) {
      console.error('Erro ao salvar cliente:', err);
      showError('Erro ao salvar cliente');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (customerId, customerName) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente "${customerName}"?`)) {
      const success = deleteCustomer(customerId);
      if (success) {
        showSuccess('Cliente excluído com sucesso!');
      } else {
        showError('Erro ao excluir cliente');
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <FaUsers className={styles.loadingIcon} />
          <h3>Carregando clientes...</h3>
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
            <FaUsers />
            Gerenciar Clientes ({filteredCustomers.length})
          </h2>
          <p className={styles.pageSubtitle}>
            Visualize, cadastre e gerencie sua base de clientes
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={openAddModal}
            className={styles.primaryBtn}
          >
            <FaPlus /> Novo Cliente
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total de Clientes</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaChartLine />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.active}</span>
            <span className={styles.statLabel}>Clientes Ativos</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaShoppingBag />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{formatCurrency(stats.totalRevenue)}</span>
            <span className={styles.statLabel}>Receita Total</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaChartLine />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{formatCurrency(stats.averageSpent)}</span>
            <span className={styles.statLabel}>Ticket Médio</span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterContainer}>
          <FaFilter className={styles.filterIcon} />
          <select
            value={filterSegment}
            onChange={(e) => setFilterSegment(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todos os segmentos</option>
            <option value="VIP">VIP</option>
            <option value="Premium">Premium</option>
            <option value="Regular">Regular</option>
            <option value="Novo">Novo</option>
          </select>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className={styles.customersSection}>
        {filteredCustomers.length > 0 ? (
          <div className={styles.customersGrid}>
            {filteredCustomers.map((customer) => {
              const segment = getCustomerSegment(customer.totalSpent);
              return (
                <div key={customer.id} className={styles.customerCard}>
                  <div className={styles.customerHeader}>
                    <div className={styles.customerAvatar}>
                      <span>{customer.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className={styles.customerInfo}>
                      <h4 className={styles.customerName}>{customer.name}</h4>
                      <span 
                        className={styles.customerSegment}
                        style={{ backgroundColor: segment.color }}
                      >
                        {segment.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.customerDetails}>
                    <div className={styles.customerField}>
                      <FaEnvelope className={styles.fieldIcon} />
                      <span className={styles.fieldValue}>{customer.email}</span>
                    </div>
                    
                    <div className={styles.customerField}>
                      <FaPhone className={styles.fieldIcon} />
                      <span className={styles.fieldValue}>{customer.phone}</span>
                    </div>
                    
                    <div className={styles.customerField}>
                      <FaMapMarkerAlt className={styles.fieldIcon} />
                      <span className={styles.fieldValue}>
                        {customer.address.city} - {customer.address.state}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.customerStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{customer.totalOrders}</span>
                      <span className={styles.statLabel}>Pedidos</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{formatCurrency(customer.totalSpent)}</span>
                      <span className={styles.statLabel}>Total Gasto</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{formatDate(customer.lastOrder)}</span>
                      <span className={styles.statLabel}>Último Pedido</span>
                    </div>
                  </div>
                  
                  <div className={styles.customerActions}>
                    <button
                      onClick={() => openCustomerModal(customer)}
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      title="Ver detalhes"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openEditModal(customer)}
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      title="Editar cliente"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id, customer.name)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      title="Excluir cliente"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaUsers className={styles.emptyIcon} />
            <h3>Nenhum cliente encontrado</h3>
            <p>
              {searchQuery || filterSegment
                ? 'Tente ajustar os filtros de busca'
                : 'Comece cadastrando seu primeiro cliente'
              }
            </p>
            {!searchQuery && !filterSegment && (
              <button 
                onClick={openAddModal}
                className={styles.primaryBtn}
                style={{ marginTop: 'var(--spacing-lg)' }}
              >
                <FaPlus /> Cadastrar Cliente
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal de Cadastro/Edição */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingCustomer ? '✏️ Editar Cliente' : '➕ Novo Cliente'}
              </h3>
              <button
                onClick={closeAddModal}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGrid}>
                {/* Informações Pessoais */}
                <div className={styles.formSection}>
                  <h4 className={styles.sectionTitle}>
                    <FaUser /> Informações Pessoais
                  </h4>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nome Completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="Ex: Maria Silva Santos"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="maria@email.com"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Telefone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Data de Nascimento</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Gênero</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={styles.formSelect}
                      >
                        <option value="">Selecione</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                        <option value="Prefiro não informar">Prefiro não informar</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>CPF</label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div className={styles.formSection}>
                  <h4 className={styles.sectionTitle}>
                    <FaMapMarkerAlt /> Endereço
                  </h4>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Rua/Avenida</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="Rua das Flores, 123"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Bairro</label>
                      <input
                        type="text"
                        name="address.neighborhood"
                        value={formData.address.neighborhood}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="Centro"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>CEP</label>
                      <input
                        type="text"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Cidade</label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="São Paulo"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Estado</label>
                      <select
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={styles.formSelect}
                      >
                        <option value="">Selecione</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={isSubmitting}
                  className={styles.cancelBtn}
                >
                  ❌ Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  <FaSave /> {isSubmitting ? 'Salvando...' : (editingCustomer ? 'Atualizar' : 'Cadastrar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Cliente */}
      {showCustomerModal && selectedCustomer && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                👤 Detalhes do Cliente
              </h3>
              <button
                onClick={closeCustomerModal}
                className={styles.modalCloseBtn}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalContent}>
              {/* Informações Pessoais */}
              <div className={styles.customerSection}>
                <h4 className={styles.sectionTitle}>
                  <FaUsers /> Informações Pessoais
                </h4>
                <div className={styles.customerProfile}>
                  <div className={styles.profileAvatar}>
                    <span>{selectedCustomer.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className={styles.profileInfo}>
                    <h5 className={styles.profileName}>{selectedCustomer.name}</h5>
                    <span 
                      className={styles.profileSegment}
                      style={{ backgroundColor: getCustomerSegment(selectedCustomer.totalSpent).color }}
                    >
                      Cliente {getCustomerSegment(selectedCustomer.totalSpent).label}
                    </span>
                  </div>
                </div>
                
                <div className={styles.personalDetails}>
                  <div className={styles.detailField}>
                    <FaEnvelope className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Email:</span>
                      <span className={styles.detailValue}>{selectedCustomer.email}</span>
                    </div>
                  </div>
                  
                  <div className={styles.detailField}>
                    <FaPhone className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Telefone:</span>
                      <span className={styles.detailValue}>{selectedCustomer.phone}</span>
                    </div>
                  </div>
                  
                  {selectedCustomer.birthDate && (
                    <div className={styles.detailField}>
                      <FaCalendarAlt className={styles.detailIcon} />
                      <div className={styles.detailContent}>
                        <span className={styles.detailLabel}>Data de Nascimento:</span>
                        <span className={styles.detailValue}>{formatDate(selectedCustomer.birthDate)}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedCustomer.gender && (
                    <div className={styles.detailField}>
                      <FaVenusMars className={styles.detailIcon} />
                      <div className={styles.detailContent}>
                        <span className={styles.detailLabel}>Gênero:</span>
                        <span className={styles.detailValue}>{selectedCustomer.gender}</span>
                      </div>
                    </div>
                  )}

                  {selectedCustomer.cpf && (
                    <div className={styles.detailField}>
                      <FaIdCard className={styles.detailIcon} />
                      <div className={styles.detailContent}>
                        <span className={styles.detailLabel}>CPF:</span>
                        <span className={styles.detailValue}>{selectedCustomer.cpf}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Endereço */}
              <div className={styles.customerSection}>
                <h4 className={styles.sectionTitle}>
                  <FaMapMarkerAlt /> Endereço
                </h4>
                <div className={styles.addressInfo}>
                  <p className={styles.addressLine}>{selectedCustomer.address.street}</p>
                  <p className={styles.addressLine}>{selectedCustomer.address.neighborhood}</p>
                  <p className={styles.addressLine}>
                    {selectedCustomer.address.city} - {selectedCustomer.address.state}
                  </p>
                  <p className={styles.addressLine}>CEP: {selectedCustomer.address.zipCode}</p>
                </div>
              </div>

              {/* Estatísticas de Compras */}
              <div className={styles.customerSection}>
                <h4 className={styles.sectionTitle}>
                  <FaShoppingBag /> Histórico de Compras
                </h4>
                <div className={styles.purchaseStats}>
                  <div className={styles.purchaseStat}>
                    <div className={styles.purchaseIcon}>
                      <FaShoppingBag />
                    </div>
                    <div className={styles.purchaseContent}>
                      <span className={styles.purchaseValue}>{selectedCustomer.totalOrders}</span>
                      <span className={styles.purchaseLabel}>Total de Pedidos</span>
                    </div>
                  </div>
                  
                  <div className={styles.purchaseStat}>
                    <div className={styles.purchaseIcon}>
                      <FaChartLine />
                    </div>
                    <div className={styles.purchaseContent}>
                      <span className={styles.purchaseValue}>{formatCurrency(selectedCustomer.totalSpent)}</span>
                      <span className={styles.purchaseLabel}>Total Gasto</span>
                    </div>
                  </div>
                  
                  <div className={styles.purchaseStat}>
                    <div className={styles.purchaseIcon}>
                      <FaCalendarAlt />
                    </div>
                    <div className={styles.purchaseContent}>
                      <span className={styles.purchaseValue}>{formatDate(selectedCustomer.lastOrder)}</span>
                      <span className={styles.purchaseLabel}>Último Pedido</span>
                    </div>
                  </div>
                  
                  <div className={styles.purchaseStat}>
                    <div className={styles.purchaseIcon}>
                      <FaChartLine />
                    </div>
                    <div className={styles.purchaseContent}>
                      <span className={styles.purchaseValue}>
                        {selectedCustomer.totalOrders > 0 
                          ? formatCurrency(selectedCustomer.totalSpent / selectedCustomer.totalOrders)
                          : formatCurrency(0)
                        }
                      </span>
                      <span className={styles.purchaseLabel}>Ticket Médio</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações de Cadastro */}
              <div className={styles.customerSection}>
                <h4 className={styles.sectionTitle}>
                  <FaCalendarAlt /> Informações de Cadastro
                </h4>
                <div className={styles.registrationInfo}>
                  <div className={styles.registrationField}>
                    <span className={styles.registrationLabel}>Cliente desde:</span>
                    <span className={styles.registrationValue}>{formatDate(selectedCustomer.createdAt)}</span>
                  </div>
                  <div className={styles.registrationField}>
                    <span className={styles.registrationLabel}>Status:</span>
                    <span className={`${styles.registrationValue} ${styles.statusActive}`}>
                      {selectedCustomer.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={closeCustomerModal}
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

export default CustomersPage;