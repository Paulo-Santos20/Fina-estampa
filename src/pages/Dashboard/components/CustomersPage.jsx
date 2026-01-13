import React, { useState } from 'react';
import { 
  FaUsers, FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, 
  FaShoppingBag, FaChartLine, FaSave, FaTimes, FaUser, 
  FaIdCard, FaVenusMars
} from 'react-icons/fa';
import { useCustomers } from '../../../hooks/useCustomers';
import { useToast } from '../../../components/ui/Toast';
import styles from './CustomersPage.module.css';

const CustomersPage = () => {
  const { 
    customers, loading, addCustomer, updateCustomer, 
    deleteCustomer, getCustomerStats 
  } = useCustomers();

  const { showSuccess, showError } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSegment, setFilterSegment] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', birthDate: '', gender: '', cpf: '',
    address: { street: '', neighborhood: '', city: '', state: '', zipCode: '' }
  });

  const getCustomerSegment = (totalSpent) => {
    if (totalSpent >= 1000) return { label: 'VIP', color: '#722F37', bg: '#FDF2F8' };
    if (totalSpent >= 500) return { label: 'Premium', color: '#8B5CF6', bg: '#F5F3FF' };
    if (totalSpent >= 200) return { label: 'Regular', color: '#3B82F6', bg: '#EFF6FF' };
    return { label: 'Novo', color: '#10B981', bg: '#ECFDF5' };
  };

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const stats = getCustomerStats();

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
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', phone: '', birthDate: '', gender: '', cpf: '',
      address: { street: '', neighborhood: '', city: '', state: '', zipCode: '' }
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
      address: { ...customer.address }
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
      showError('Preencha os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingCustomer) {
        const success = updateCustomer(editingCustomer.id, formData);
        if (success) { showSuccess('Cliente atualizado!'); closeAddModal(); }
        else showError('Erro ao atualizar.');
      } else {
        const newCustomer = addCustomer(formData);
        if (newCustomer) { showSuccess('Cliente cadastrado!'); closeAddModal(); }
        else showError('Erro ao cadastrar.');
      }
    } catch (err) { showError('Erro ao salvar.'); } 
    finally { setIsSubmitting(false); }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Excluir cliente "${name}"?`)) {
      const success = deleteCustomer(id);
      if (success) showSuccess('Cliente excluído.');
      else showError('Erro ao excluir.');
    }
  };

  if (loading) return <div className={styles.loading}>Carregando clientes...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Gerenciar Clientes</h2>
          <p className={styles.pageSubtitle}>Visualize e gerencie sua base de clientes ({filteredCustomers.length})</p>
        </div>
        <button onClick={openAddModal} className={styles.primaryBtn}>
          <FaPlus /> Novo Cliente
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}><FaUsers /></div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}><FaChartLine /></div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.active}</span>
            <span className={styles.statLabel}>Ativos</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}><FaShoppingBag /></div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{formatCurrency(stats.totalRevenue)}</span>
            <span className={styles.statLabel}>Receita</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}><FaChartLine /></div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{formatCurrency(stats.averageSpent)}</span>
            <span className={styles.statLabel}>Ticket Médio</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por nome, email ou telefone..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        <div className={styles.filterBox}>
          <FaFilter className={styles.filterIcon} />
          <select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)}>
            <option value="">Todos os segmentos</option>
            <option value="VIP">VIP</option>
            <option value="Premium">Premium</option>
            <option value="Regular">Regular</option>
            <option value="Novo">Novo</option>
          </select>
        </div>
      </div>

      {/* Customers Grid */}
      <div className={styles.customersList}>
        {filteredCustomers.length > 0 ? (
          <div className={styles.customersGrid}>
            {filteredCustomers.map((customer) => {
              const segment = getCustomerSegment(customer.totalSpent);
              return (
                <div key={customer.id} className={styles.customerCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>{customer.name.charAt(0).toUpperCase()}</div>
                    <div className={styles.headerInfo}>
                      <h4 className={styles.customerName}>{customer.name}</h4>
                      <span className={styles.segmentBadge} style={{ backgroundColor: segment.bg, color: segment.color }}>
                        {segment.label}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.infoRow}>
                      <FaEnvelope className={styles.icon} /> <span>{customer.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <FaPhone className={styles.icon} /> <span>{customer.phone}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <FaMapMarkerAlt className={styles.icon} /> 
                      <span className={styles.truncate}>{customer.address.city} - {customer.address.state}</span>
                    </div>
                  </div>

                  <div className={styles.cardStats}>
                    <div className={styles.miniStat}>
                      <strong>{customer.totalOrders}</strong>
                      <small>Pedidos</small>
                    </div>
                    <div className={styles.miniStat}>
                      <strong>{formatCurrency(customer.totalSpent)}</strong>
                      <small>Gasto</small>
                    </div>
                    <div className={styles.miniStat}>
                      <strong>{formatDate(customer.lastOrder).split('/')[0]}/{formatDate(customer.lastOrder).split('/')[1]}</strong>
                      <small>Último</small>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button onClick={() => openCustomerModal(customer)} className={styles.iconBtn} title="Ver">
                      <FaEye />
                    </button>
                    <button onClick={() => openEditModal(customer)} className={styles.iconBtn} title="Editar">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(customer.id, customer.name)} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Excluir">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaUsers />
            <h3>Nenhum cliente encontrado</h3>
            <p>Tente ajustar os filtros ou cadastre um novo cliente.</p>
          </div>
        )}
      </div>

      {/* --- MODAL DE CADASTRO/EDIÇÃO --- */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}</h3>
              <button onClick={closeAddModal} className={styles.closeBtn}><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className={styles.modalBody}>
              <h4 className={styles.formSectionTitle}><FaUser /> Dados Pessoais</h4>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nome Completo *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Telefone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Data Nasc.</label>
                  <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
                </div>
                <div className={styles.formGroup}>
                  <label>CPF</label>
                  <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} />
                </div>
                <div className={styles.formGroup}>
                  <label>Gênero</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Selecione</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <h4 className={styles.formSectionTitle}><FaMapMarkerAlt /> Endereço</h4>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Rua</label>
                  <input type="text" name="address.street" value={formData.address.street} onChange={handleInputChange} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Bairro</label>
                  <input type="text" name="address.neighborhood" value={formData.address.neighborhood} onChange={handleInputChange} />
                </div>
                <div className={styles.formGroup}>
                  <label>CEP</label>
                  <input type="text" name="address.zipCode" value={formData.address.zipCode} onChange={handleInputChange} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Cidade</label>
                  <input type="text" name="address.city" value={formData.address.city} onChange={handleInputChange} />
                </div>
                <div className={styles.formGroup}>
                  <label>UF</label>
                  <input type="text" name="address.state" value={formData.address.state} onChange={handleInputChange} maxLength="2" style={{textTransform: 'uppercase'}} />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={closeAddModal} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
                  <FaSave /> Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL DE DETALHES --- */}
      {showCustomerModal && selectedCustomer && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Detalhes do Cliente</h3>
              <button onClick={closeCustomerModal} className={styles.closeBtn}><FaTimes /></button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailHeader}>
                <div className={styles.detailAvatar}>{selectedCustomer.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h2 className={styles.detailName}>{selectedCustomer.name}</h2>
                  <span className={styles.detailSegment} 
                    style={{ 
                      backgroundColor: getCustomerSegment(selectedCustomer.totalSpent).bg, 
                      color: getCustomerSegment(selectedCustomer.totalSpent).color 
                    }}
                  >
                    Cliente {getCustomerSegment(selectedCustomer.totalSpent).label}
                  </span>
                </div>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailCard}>
                  <h4><FaUser /> Pessoal</h4>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Tel:</strong> {selectedCustomer.phone}</p>
                  <p><strong>CPF:</strong> {selectedCustomer.cpf || '-'}</p>
                  <p><strong>Nasc:</strong> {formatDate(selectedCustomer.birthDate)}</p>
                </div>
                <div className={styles.detailCard}>
                  <h4><FaMapMarkerAlt /> Endereço</h4>
                  <p>{selectedCustomer.address.street}</p>
                  <p>{selectedCustomer.address.neighborhood}</p>
                  <p>{selectedCustomer.address.city} - {selectedCustomer.address.state}</p>
                  <p>CEP: {selectedCustomer.address.zipCode}</p>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span>Pedidos</span>
                  <strong>{selectedCustomer.totalOrders}</strong>
                </div>
                <div className={styles.statBox}>
                  <span>Total Gasto</span>
                  <strong>{formatCurrency(selectedCustomer.totalSpent)}</strong>
                </div>
                <div className={styles.statBox}>
                  <span>Último Pedido</span>
                  <strong>{formatDate(selectedCustomer.lastOrder)}</strong>
                </div>
                <div className={styles.statBox}>
                  <span>Cliente Desde</span>
                  <strong>{formatDate(selectedCustomer.createdAt)}</strong>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={closeCustomerModal} className={styles.primaryBtn}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;