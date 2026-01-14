import React, { useState } from 'react';
import { 
  FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaEye, FaEyeSlash, 
  FaKey, FaBell, FaUserCog, FaEnvelope, FaPhone, FaLock
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth(); // Assume updateProfile exists in context
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Password State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@finaestampa.com',
    phone: user?.phone || '',
    role: user?.role || 'admin',
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

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (type) => {
    setProfileData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: !prev.notifications[type] }
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API
      if (updateProfile) updateProfile(profileData);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      alert('Senha alterada com sucesso!');
    } catch (error) {
      alert('Erro ao alterar senha');
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>
            <FaUser /> Meu Perfil
          </h2>
          <p className={styles.pageSubtitle}>
            Gerencie suas informações pessoais e configurações de segurança
          </p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Coluna Esquerda: Cartão de Perfil */}
        <div className={styles.leftColumn}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarWrapper}>
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="Avatar" className={styles.avatarImg} />
                ) : (
                  <div className={styles.avatarPlaceholder}><FaUser /></div>
                )}
                {isEditing && (
                  <label className={styles.avatarUploadBtn}>
                    <FaCamera />
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
                  </label>
                )}
              </div>
              <h3 className={styles.profileName}>{profileData.name}</h3>
              <span className={styles.roleBadge}>{getRoleLabel(profileData.role)}</span>
            </div>

            <div className={styles.profileDetails}>
              <div className={styles.detailItem}>
                <FaEnvelope /> {profileData.email}
              </div>
              <div className={styles.detailItem}>
                <FaPhone /> {profileData.phone || 'Sem telefone'}
              </div>
            </div>

            <div className={styles.profileActions}>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                  <FaEdit /> Editar Perfil
                </button>
              ) : (
                <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                  <FaTimes /> Cancelar
                </button>
              )}
            </div>
          </div>

          {/* Notificações */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaBell /> Notificações</h3>
            </div>
            <div className={styles.notificationList}>
              <div className={styles.notificationItem}>
                <div className={styles.notifInfo}>
                  <strong>Email</strong>
                  <p>Receber atualizações por email</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={profileData.notifications.email} 
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className={styles.slider} />
                </label>
              </div>
              
              <div className={styles.notificationItem}>
                <div className={styles.notifInfo}>
                  <strong>Push</strong>
                  <p>Notificações no navegador</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={profileData.notifications.push} 
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Formulários */}
        <div className={styles.rightColumn}>
          
          {/* Formulário de Dados Pessoais */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaUserCog /> Informações Pessoais</h3>
            </div>
            <form onSubmit={handleProfileSubmit} className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nome Completo</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={profileData.email} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Telefone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={profileData.phone} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Função (Apenas Leitura)</label>
                  <input 
                    type="text" 
                    value={getRoleLabel(profileData.role)} 
                    disabled 
                    className={`${styles.inputField} ${styles.disabledInput}`}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Biografia</label>
                <textarea 
                  name="bio" 
                  value={profileData.bio} 
                  onChange={handleInputChange} 
                  disabled={!isEditing} 
                  rows="3"
                  className={styles.textArea}
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              {isEditing && (
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
                    <FaSave /> {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Segurança e Senha */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaKey /> Segurança</h3>
              <button 
                onClick={() => setShowPasswordForm(!showPasswordForm)} 
                className={styles.toggleBtn}
              >
                {showPasswordForm ? 'Cancelar' : 'Alterar Senha'}
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
                <div className={styles.formGroup}>
                  <label>Senha Atual</label>
                  <div className={styles.passwordWrapper}>
                    <FaLock className={styles.fieldIcon} />
                    <input 
                      type={showCurrentPassword ? 'text' : 'password'} 
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className={styles.inputField}
                    />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className={styles.eyeBtn}>
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Nova Senha</label>
                    <div className={styles.passwordWrapper}>
                      <FaKey className={styles.fieldIcon} />
                      <input 
                        type={showNewPassword ? 'text' : 'password'} 
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength="6"
                        className={styles.inputField}
                      />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className={styles.eyeBtn}>
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Confirmar Nova Senha</label>
                    <div className={styles.passwordWrapper}>
                      <FaKey className={styles.fieldIcon} />
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength="6"
                        className={styles.inputField}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
                    {isSubmitting ? 'Alterando...' : 'Atualizar Senha'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;