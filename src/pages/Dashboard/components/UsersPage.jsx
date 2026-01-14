import React, { useState } from 'react';
import { 
  FaUserShield, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, 
  FaSave, FaTimes, FaSearch, FaFilter, FaUser, FaEnvelope, 
  FaPhone, FaCalendarAlt, FaCheck, FaLock
} from 'react-icons/fa';
import { useToast } from '../../../components/ui/Toast'; // Use se disponível
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const { showSuccess, showError } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Estado local para usuários (Mock)
  const [users, setUsers] = useState([
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
  ]);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'user', isActive: true, password: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
        password: '' // Senha vazia ao editar
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '', email: '', phone: '', role: 'user', isActive: true, password: ''
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
    
    // Validação simples
    if (!formData.name || !formData.email) {
      showError('Preencha os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      if (editingUser) {
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        showSuccess('Usuário atualizado!');
      } else {
        const newUser = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toLocaleDateString('en-CA'),
          lastLogin: '-'
        };
        setUsers(prev => [...prev, newUser]);
        showSuccess('Usuário criado!');
      }
      closeModal();
    }, 800);
  };

  const handleDelete = (userId, userName) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      showSuccess('Usuário excluído!');
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
  };

  const getRoleConfig = (role) => {
    switch (role) {
      case 'admin': return { label: 'Administrador', bg: '#FEE2E2', color: '#991B1B' };
      case 'manager': return { label: 'Gerente', bg: '#FEF3C7', color: '#92400E' };
      case 'user': return { label: 'Usuário', bg: '#EFF6FF', color: '#1E40AF' };
      default: return { label: role, bg: '#F3F4F6', color: '#374151' };
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
        <div>
          <h2 className={styles.pageTitle}>
            <FaUserShield />
            Gerenciar Usuários
          </h2>
          <p className={styles.pageSubtitle}>
            Controle de acesso e permissões da equipe ({filteredUsers.length} usuários).
          </p>
        </div>
        <button onClick={() => openModal()} className={styles.primaryBtn}>
          <FaPlus /> Novo Usuário
        </button>
      </div>

      {/* Filtros */}
      <div className={styles.filtersBar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterBox}>
          <FaFilter className={styles.filterIcon} />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">Todas as funções</option>
            <option value="admin">Administradores</option>
            <option value="manager">Gerentes</option>
            <option value="user">Usuários</option>
          </select>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className={styles.usersList}>
        {filteredUsers.length > 0 ? (
          <div className={styles.usersGrid}>
            {filteredUsers.map((user) => {
              const roleConfig = getRoleConfig(user.role);
              return (
                <div key={user.id} className={`${styles.userCard} ${!user.isActive ? styles.inactiveCard : ''}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className={styles.userName}>{user.name}</h3>
                        <span 
                          className={styles.roleBadge}
                          style={{ backgroundColor: roleConfig.bg, color: roleConfig.color }}
                        >
                          {roleConfig.label}
                        </span>
                      </div>
                    </div>
                    <div className={styles.statusDot} title={user.isActive ? "Ativo" : "Inativo"}>
                      <div className={`${styles.dot} ${user.isActive ? styles.dotActive : styles.dotInactive}`} />
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.infoRow}>
                      <FaEnvelope className={styles.icon} /> <span>{user.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <FaPhone className={styles.icon} /> <span>{user.phone || '-'}</span>
                    </div>
                    <div className={styles.metaRow}>
                      <small><FaCalendarAlt /> Cadastro: {user.createdAt}</small>
                      <small><FaCheck /> Último login: {user.lastLogin}</small>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={styles.iconBtn}
                      title={user.isActive ? 'Desativar acesso' : 'Ativar acesso'}
                    >
                      {user.isActive ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button
                      onClick={() => openModal(user)}
                      className={styles.iconBtn}
                      title="Editar dados"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className={`${styles.iconBtn} ${styles.deleteBtn}`}
                      title="Excluir usuário"
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
            <FaUserShield />
            <h3>Nenhum usuário encontrado</h3>
            <p>Tente ajustar os filtros ou adicione um novo membro à equipe.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h3>
              <button onClick={closeModal} className={styles.closeBtn}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: João Silva"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="joao@empresa.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Função *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="user">Usuário (Padrão)</option>
                    <option value="manager">Gerente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Senha {editingUser && '(Opcional)'}</label>
                  <div className={styles.passwordWrapper}>
                    <FaLock className={styles.fieldIcon} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={editingUser ? "Nova senha" : "Senha inicial"}
                      required={!editingUser}
                      minLength={6}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <span>Acesso Ativo ao Sistema</span>
                </label>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
                  <FaSave /> {isSubmitting ? 'Salvando...' : 'Salvar Usuário'}
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