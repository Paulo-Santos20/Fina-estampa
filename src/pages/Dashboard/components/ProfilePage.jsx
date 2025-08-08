import React, { useState, useRef } from 'react';
import { 
  FaUser, 
  FaSave, 
  FaEdit, 
  FaLock, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCalendarAlt,
  FaBell,
  FaKey,
  FaUserShield,
  FaHistory
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromotions: false,
    emailNewsletter: true,
    smsOrders: false,
    smsPromotions: false,
    pushNotifications: true
  });

  const userPermissions = [
    { name: 'Visualizar Dashboard', granted: true, description: 'Acesso ao painel administrativo' },
    { name: 'Gerenciar Produtos', granted: user?.role === 'admin', description: 'Criar, editar e excluir produtos' },
    { name: 'Gerenciar Pedidos', granted: user?.role === 'admin', description: 'Visualizar e gerenciar pedidos' },
    { name: 'Gerenciar Usuários', granted: user?.role === 'admin', description: 'Administrar contas de usuários' },
    { name: 'Configurações do Sistema', granted: user?.role === 'admin', description: 'Alterar configurações gerais' },
    { name: 'Relatórios Avançados', granted: user?.role === 'admin', description: 'Acesso a relatórios detalhados' }
  ];

  const loginHistory = [
    { date: '2025-01-08 14:30', device: 'Chrome - Windows', location: 'São Paulo, SP', status: 'Sucesso' },
    { date: '2025-01-07 09:15', device: 'Safari - iPhone', location: 'São Paulo, SP', status: 'Sucesso' },
    { date: '2025-01-06 16:45', device: 'Firefox - Windows', location: 'Rio de Janeiro, RJ', status: 'Sucesso' },
    { date: '2025-01-05 11:20', device: 'Chrome - Android', location: 'São Paulo, SP', status: 'Falha' },
    { date: '2025-01-04 13:10', device: 'Chrome - Windows', location: 'São Paulo, SP', status: 'Sucesso' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('❌ Tipo de arquivo não suportado. Use: JPG, PNG ou WEBP');
        return;
      }

      // Validar tamanho (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('❌ Arquivo muito grande. Máximo 2MB');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    try {
      updateUser(formData);
      setIsEditing(false);
      alert('✅ Perfil atualizado com sucesso!');
    } catch (error) {
      alert('❌ Erro ao atualizar perfil. Tente novamente.');
    }
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('❌ Preencha todos os campos de senha');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ Nova senha e confirmação não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('❌ Nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Simular alteração de senha
    alert('✅ Senha alterada com sucesso!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveNotifications = () => {
    alert('✅ Preferências de notificação salvas!');
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

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: FaUser },
    { id: 'security', label: 'Segurança', icon: FaLock },
    { id: 'notifications', label: 'Notificações', icon: FaBell },
    { id: 'permissions', label: 'Permissões', icon: FaShieldAlt },
    { id: 'history', label: 'Histórico', icon: FaHistory }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaUser />
            Meu Perfil
          </h2>
          <p className={styles.pageSubtitle}>
            Gerencie suas informações pessoais e configurações
          </p>
        </div>
      </div>

      {/* Profile Summary */}
      <div className={styles.profileSummary}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {formData.avatar ? (
              <img 
                src={formData.avatar} 
                alt="Avatar" 
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {formData.name.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <button 
              className={styles.avatarEditBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              <FaCamera />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{formData.name || 'Usuário'}</h3>
          <p className={styles.userEmail}>{formData.email}</p>
          <div className={styles.userBadges}>
            <span 
              className={styles.roleBadge}
              style={{ backgroundColor: getRoleColor(user?.role) }}
            >
              <FaUserShield /> {getRoleLabel(user?.role)}
            </span>
            <span className={styles.statusBadge}>
              ● Ativo
            </span>
          </div>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {new Date(user?.createdAt || Date.now()).toLocaleDateString('pt-BR')}
            </div>
            <div className={styles.statLabel}>Membro desde</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {new Date().toLocaleDateString('pt-BR')}
            </div>
            <div className={styles.statLabel}>Último acesso</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Aba Perfil */}
        {activeTab === 'profile' && (
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaUser /> Informações Pessoais
              </h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={styles.editBtn}
              >
                <FaEdit /> {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nome Completo</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                ) : (
                  <div className={styles.formValue}>{formData.name || 'Não informado'}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <div className={styles.formValue}>{formData.email}</div>
                <small className={styles.formHint}>O email não pode ser alterado</small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="(11) 99999-9999"
                  />
                ) : (
                  <div className={styles.formValue}>{formData.phone || 'Não informado'}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>CEP</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="01234-567"
                  />
                ) : (
                  <div className={styles.formValue}>{formData.zipCode || 'Não informado'}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cidade</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                ) : (
                  <div className={styles.formValue}>{formData.city || 'Não informado'}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Estado</label>
                {isEditing ? (
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
                ) : (
                  <div className={styles.formValue}>{formData.state || 'Não informado'}</div>
                )}
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Endereço</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Rua, número, bairro"
                  />
                ) : (
                  <div className={styles.formValue}>{formData.address || 'Não informado'}</div>
                )}
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Biografia</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    rows="3"
                    placeholder="Conte um pouco sobre você..."
                  />
                ) : (
                  <div className={styles.formValue}>{formData.bio || 'Não informado'}</div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className={styles.formActions}>
                <button 
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelBtn}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className={styles.saveBtn}
                >
                  <FaSave /> Salvar Alterações
                </button>
              </div>
            )}
          </div>
        )}

        {/* Aba Segurança */}
        {activeTab === 'security' && (
          <div className={styles.securitySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaLock /> Segurança da Conta
              </h3>
            </div>

            <div className={styles.securityCard}>
              <h4 className={styles.cardTitle}>
                <FaKey /> Alterar Senha
              </h4>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Senha Atual</label>
                  <div className={styles.passwordGroup}>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={styles.formInput}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={styles.passwordToggle}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nova Senha</label>
                  <div className={styles.passwordGroup}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={styles.formInput}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={styles.passwordToggle}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirmar Nova Senha</label>
                  <div className={styles.passwordGroup}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={styles.formInput}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={styles.passwordToggle}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleChangePassword}
                className={styles.changePasswordBtn}
              >
                <FaLock /> Alterar Senha
              </button>
            </div>

            <div className={styles.securityInfo}>
              <h4>🛡️ Dicas de Segurança</h4>
              <ul>
                <li>Use uma senha forte com pelo menos 8 caracteres</li>
                <li>Inclua letras maiúsculas, minúsculas, números e símbolos</li>
                <li>Não compartilhe sua senha com ninguém</li>
                <li>Altere sua senha regularmente</li>
              </ul>
            </div>
          </div>
        )}

        {/* Aba Notificações */}
        {activeTab === 'notifications' && (
          <div className={styles.notificationsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaBell /> Preferências de Notificação
              </h3>
              <button 
                onClick={handleSaveNotifications}
                className={styles.saveBtn}
              >
                <FaSave /> Salvar
              </button>
            </div>

            <div className={styles.notificationGroups}>
              <div className={styles.notificationGroup}>
                <h4 className={styles.groupTitle}>📧 Notificações por Email</h4>
                
                <label className={styles.notificationItem}>
                  <input
                    type="checkbox"
                    name="emailOrders"
                    checked={notifications.emailOrders}
                    onChange={handleNotificationChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.notificationContent}>
                    <span className={styles.notificationTitle}>Atualizações de Pedidos</span>
                    <span className={styles.notificationDescription}>
                      Receba emails sobre o status dos seus pedidos
                    </span>
                  </div>
                </label>

                <label className={styles.notificationItem}>
                  <input
                    type="checkbox"
                    name="emailPromotions"
                    checked={notifications.emailPromotions}
                    onChange={handleNotificationChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.notificationContent}>
                    <span className={styles.notificationTitle}>Ofertas e Promoções</span>
                    <span className={styles.notificationDescription}>
                      Receba ofertas especiais e cupons de desconto
                    </span>
                  </div>
                </label>

                <label className={styles.notificationItem}>
                  <input
                    type="checkbox"
                    name="emailNewsletter"
                    checked={notifications.emailNewsletter}
                    onChange={handleNotificationChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.notificationContent}>
                    <span className={styles.notificationTitle}>Newsletter</span>
                    <span className={styles.notificationDescription}>
                      Receba novidades e dicas sobre moda
                    </span>
                  </div>
                </label>
              </div>

              <div className={styles.notificationGroup}>
                <h4 className={styles.groupTitle}>📱 Notificações por SMS</h4>
                
                <label className={styles.notificationItem}>
                  <input
                    type="checkbox"
                    name="smsOrders"
                    checked={notifications.smsOrders}
                    onChange={handleNotificationChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.notificationContent}>
                    <span className={styles.notificationTitle}>Atualizações de Pedidos</span>
                    <span className={styles.notificationDescription}>
                      Receba SMS sobre entregas e atualizações importantes
                    </span>
                  </div>
                </label>

                <label className={styles.notificationItem}>
                  <input
                    type="checkbox"
                    name="smsPromotions"
                    checked={notifications.smsPromotions}
                    onChange={handleNotificationChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.notificationContent}>
                    <span className={styles.notificationTitle}>Ofertas Especiais</span>
                    <span className={styles.notificationDescription}>
                      Receba SMS com ofertas por tempo limitado
                    </span>
                  </div>
                </label>
              </div>

              <div className={styles.notificationGroup}>
                <h4 className={styles.groupTitle}>🔔 Notificações Push</h4>
                
                <label className={styles.notificationItem}>
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    checked={notifications.pushNotifications}
                    onChange={handleNotificationChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.notificationContent}>
                    <span className={styles.notificationTitle}>Notificações do Sistema</span>
                    <span className={styles.notificationDescription}>
                      Receba notificações importantes do sistema
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Aba Permissões */}
        {activeTab === 'permissions' && (
          <div className={styles.permissionsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaShieldAlt /> Minhas Permissões
              </h3>
            </div>

            <div className={styles.permissionsList}>
              {userPermissions.map((permission, index) => (
                <div key={index} className={styles.permissionItem}>
                  <div className={styles.permissionIcon}>
                    {permission.granted ? (
                      <div className={styles.permissionGranted}>✓</div>
                    ) : (
                      <div className={styles.permissionDenied}>✗</div>
                    )}
                  </div>
                  <div className={styles.permissionContent}>
                    <div className={styles.permissionName}>{permission.name}</div>
                    <div className={styles.permissionDescription}>{permission.description}</div>
                  </div>
                  <div className={styles.permissionStatus}>
                    <span className={`${styles.statusBadge} ${permission.granted ? styles.granted : styles.denied}`}>
                      {permission.granted ? 'Concedida' : 'Negada'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.permissionsNote}>
              <h4>ℹ️ Sobre Permissões</h4>
              <p>
                As permissões são definidas pelo administrador do sistema e determinam quais 
                funcionalidades você pode acessar. Se precisar de acesso adicional, entre em 
                contato com o administrador.
              </p>
            </div>
          </div>
        )}

        {/* Aba Histórico */}
        {activeTab === 'history' && (
          <div className={styles.historySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaHistory /> Histórico de Atividades
              </h3>
            </div>

            <div className={styles.historyCard}>
              <h4 className={styles.cardTitle}>🔐 Histórico de Login</h4>
              
              <div className={styles.historyList}>
                {loginHistory.map((login, index) => (
                  <div key={index} className={styles.historyItem}>
                    <div className={styles.historyIcon}>
                      <FaCalendarAlt />
                    </div>
                    <div className={styles.historyContent}>
                      <div className={styles.historyDate}>{login.date}</div>
                      <div className={styles.historyDetails}>
                        <span className={styles.historyDevice}>{login.device}</span>
                        <span className={styles.historyLocation}>{login.location}</span>
                      </div>
                    </div>
                    <div className={styles.historyStatus}>
                      <span className={`${styles.statusBadge} ${login.status === 'Sucesso' ? styles.success : styles.failure}`}>
                        {login.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.securityAlert}>
              <h4>⚠️ Atividade Suspeita?</h4>
              <p>
                Se você notar alguma atividade suspeita em sua conta, altere sua senha 
                imediatamente e entre em contato com o suporte.
              </p>
              <button className={styles.reportBtn}>
                🚨 Reportar Atividade Suspeita
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;