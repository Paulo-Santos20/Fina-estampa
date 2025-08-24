import React, { useState } from 'react';
import { 
  FaUserShield, 
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaTimes,
  FaSearch,
  FaFilter,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt
} from 'react-icons/fa';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    isActive: true,
    password: ''
  });

  // Dados mockados
  const users = [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana@finaestampa.com',
      phone: '(11) 99999-1234',
      role: 'admin',
      isActive: true,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@finaestampa.com',
      phone: '(11) 99999-5678',
      role: 'manager',
      isActive: true,
      createdAt: '2024-01-18',
      lastLogin: '2024-01-19'
    },
    {
      id: 3,
      name: 'Julia Costa',
      email: 'julia@finaestampa.com',
      phone: '(11) 99999-9012',
      role: 'user',
      isActive: false,
      createdAt: '2024-01-20',
      lastLogin: '2024-01-18'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        password: ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        isActive: true,
        password: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setIsSubmitting(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular salvamento
    setTimeout(() => {
      alert(editingUser ? 'Usuário atualizado!' : 'Usuário criado!');
      closeModal();
    }, 1000);
  };

  const handleDelete = (userId, userName) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
      alert('Usuário excluído!');
    }
  };

  const toggleUserStatus = (userId) => {
    alert('Status do usuário alterado!');
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'user': return 'Usuário';
      default: return role;
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin': return styles.adminBadge;
      case 'manager': return styles.managerBadge;
      case 'user': return styles.userBadge;
      default: return styles.userBadge;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaUserShield />
            Gerenciar Usuários
          </h2>
          <p className={styles.pageSubtitle}>
            Gerencie usuários e suas permissões no sistema
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={() => openModal()}
            className={styles.primaryBtn}
          >
            <FaPlus /> Novo Usuário
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersSection}>
        <div className={styles.searchGroup}>
          <div className={styles.searchInput}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchField}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <FaFilter className={styles.filterIcon} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Todas as funções</option>
            <option value="admin">Administradores</option>
            <option value="manager">Gerentes</option>
            <option value="user">Usuários</option>
          </select>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className={styles.usersGrid}>
        {filteredUsers.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.userHeader}>
              <div className={styles.userAvatar}>
                <FaUser />
              </div>
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>{user.name}</h3>
                <span className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </div>
              {!user.isActive && (
                <span className={styles.inactiveBadge}>Inativo</span>
              )}
            </div>

            <div className={styles.userDetails}>
              <div className={styles.userContact}>
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <span>{user.email}</span>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone />
                  <span>{user.phone}</span>
                </div>
              </div>

              <div className={styles.userMeta}>
                <div className={styles.metaItem}>
                  <FaCalendarAlt />
                  <span>Criado em {user.createdAt}</span>
                </div>
                <div className={styles.metaItem}>
                  <span>Último acesso: {user.lastLogin}</span>
                </div>
              </div>
            </div>

            <div className={styles.userActions}>
              <button
                onClick={() => toggleUserStatus(user.id)}
                className={`${styles.actionBtn} ${user.isActive ? styles.activeBtn : styles.inactiveBtn}`}
                title={user.isActive ? 'Desativar usuário' : 'Ativar usuário'}
              >
                {user.isActive ? <FaEye /> : <FaEyeSlash />}
              </button>
              <button
                onClick={() => openModal(user)}
                className={`${styles.actionBtn} ${styles.editBtn}`}
                title="Editar usuário"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(user.id, user.name)}
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                title="Excluir usuário"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className={styles.emptyState}>
            <FaUserShield className={styles.emptyIcon} />
            <h3>Nenhum usuário encontrado</h3>
            <p>
              {searchTerm || roleFilter !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Comece adicionando o primeiro usuário'
              }
            </p>
            {!searchTerm && roleFilter === 'all' && (
              <button 
                onClick={() => openModal()}
                className={styles.primaryBtn}
              >
                <FaPlus /> Adicionar Usuário
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingUser ? '✏️ Editar Usuário' : '👤 Novo Usuário'}
              </h3>
              <button
                onClick={closeModal}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
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
                  placeholder="Nome completo do usuário"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Função *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className={styles.formSelect}
                  >
                    <option value="user">Usuário</option>
                    <option value="manager">Gerente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                {!editingUser && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Senha *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!editingUser}
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="Senha temporária"
                      minLength="6"
                    />
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <span>Usuário ativo</span>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeModal}
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
                  <FaSave /> {isSubmitting ? 'Salvando...' : (editingUser ? 'Atualizar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;