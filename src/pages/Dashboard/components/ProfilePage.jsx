import React, { useState } from 'react';
import { 
  FaUser, 
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaBell,
  FaUserCog
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'user',
    avatar: user?.avatar || '',
    bio: user?.bio || '',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular atualização
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (updateProfile) {
        updateProfile(profileData);
      }
      
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular mudança de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      alert('Senha alterada com sucesso!');
    } catch (error) {
      alert('Erro ao alterar senha');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
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

      <div className={styles.profileContent}>
        {/* Card do Perfil */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                {profileData.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt="Avatar" 
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FaUser />
                  </div>
                )}
                {isEditing && (
                  <label className={styles.avatarUpload}>
                    <FaCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>{profileData.name}</h3>
              <p className={styles.profileEmail}>{profileData.email}</p>
              <span className={`${styles.roleBadge} ${getRoleBadgeClass(profileData.role)}`}>
                <FaUserCog /> {getRoleLabel(profileData.role)}
              </span>
            </div>

            <div className={styles.profileActions}>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editBtn}
                >
                  <FaEdit /> Editar Perfil
                </button>
              ) : (
                <div className={styles.editActions}>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={styles.cancelBtn}
                    disabled={isSubmitting}
                  >
                    <FaTimes /> Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Formulário de Perfil */}
          <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
            <div className={styles.formSection}>
              <h4 className={styles.sectionTitle}>Informações Pessoais</h4>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing || isSubmitting}
                    className={styles.formInput}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing || isSubmitting}
                    className={styles.formInput}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing || isSubmitting}
                    className={styles.formInput}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Função</label>
                  <input
                    type="text"
                    value={getRoleLabel(profileData.role)}
                    disabled
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Biografia</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSubmitting}
                  rows="3"
                  className={styles.formTextarea}
                  placeholder="Conte um pouco sobre você..."
                />
              </div>
            </div>

            {isEditing && (
              <div className={styles.formActions}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.saveBtn}
                >
                  <FaSave /> {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Card de Segurança */}
        <div className={styles.securityCard}>
          <div className={styles.cardHeader}>
            <h4 className={styles.cardTitle}>
              <FaKey /> Segurança
            </h4>
          </div>

          <div className={styles.securityActions}>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className={styles.securityBtn}
            >
              <FaKey /> Alterar Senha
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Senha Atual</label>
                <div className={styles.passwordInput}>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="Digite sua senha atual"
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
                <div className={styles.passwordInput}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="Digite a nova senha"
                    minLength="6"
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
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  disabled={isSubmitting}
                  className={styles.formInput}
                  placeholder="Confirme a nova senha"
                  minLength="6"
                />
              </div>

              <div className={styles.passwordActions}>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className={styles.cancelBtn}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.saveBtn}
                >
                  {isSubmitting ? 'Alterando...' : 'Alterar Senha'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Card de Notificações */}
        <div className={styles.notificationsCard}>
          <div className={styles.cardHeader}>
            <h4 className={styles.cardTitle}>
              <FaBell /> Notificações
            </h4>
          </div>

          <div className={styles.notificationsList}>
            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Notificações por E-mail</h5>
                <p>Receba atualizações importantes por e-mail</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={profileData.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Notificações Push</h5>
                <p>Receba notificações no navegador</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={profileData.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Notificações por SMS</h5>
                <p>Receba alertas importantes por SMS</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={profileData.notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;