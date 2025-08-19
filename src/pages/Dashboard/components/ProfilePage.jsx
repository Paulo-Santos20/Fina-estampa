import React, { useState } from 'react';
import { 
  FaUser, 
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaLock,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      // Validações básicas
      if (!profileData.name.trim()) {
        alert('❌ Nome é obrigatório');
        return;
      }
      
      if (!profileData.email.trim()) {
        alert('❌ Email é obrigatório');
        return;
      }

      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar usuário no contexto
      if (updateUser) {
        updateUser({
          ...user,
          ...profileData
        });
      }
      
      alert('✅ Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      alert('❌ Erro ao atualizar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setIsSaving(true);
    
    try {
      // Validações
      if (!passwordData.currentPassword) {
        alert('❌ Senha atual é obrigatória');
        return;
      }
      
      if (!passwordData.newPassword) {
        alert('❌ Nova senha é obrigatória');
        return;
      }
      
      if (passwordData.newPassword.length < 6) {
        alert('❌ Nova senha deve ter pelo menos 6 caracteres');
        return;
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('❌ Confirmação de senha não confere');
        return;
      }

      // Simular mudança de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('✅ Senha alterada com sucesso!');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert('❌ Erro ao alterar senha');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleProfileInputChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthDate: user?.birthDate || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    });
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
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
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>
      </div>

      <div className={styles.profileContent}>
        {/* Card do Perfil */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <h3 className={styles.cardTitle}>👤 Informações Pessoais</h3>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className={styles.editBtn}
              >
                <FaEdit /> Editar
              </button>
            ) : (
              <div className={styles.editActions}>
                <button 
                  onClick={cancelEdit}
                  className={styles.cancelBtn}
                  disabled={isSaving}
                >
                  <FaTimes /> Cancelar
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className={styles.saveBtn}
                  disabled={isSaving}
                >
                  <FaSave /> {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            )}
          </div>

          <div className={styles.profileBody}>
            {/* Avatar */}
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className={styles.avatarInput}
                    />
                    <div className={styles.avatarUploadIcon}>
                      <FaCamera />
                    </div>
                  </label>
                )}
              </div>
              
              <div className={styles.userInfo}>
                <h4 className={styles.userName}>{user?.name || 'Usuário'}</h4>
                <span className={styles.userRole}>
                  {user?.role === 'admin' ? 'Administradora' : 'Usuária'}
                </span>
              </div>
            </div>

            {/* Formulário */}
            <div className={styles.profileForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaUser /> Nome Completo
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleProfileInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaPhone /> Telefone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaCalendarAlt /> Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => handleProfileInputChange('birthDate', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleProfileInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows="3"
                    className={styles.formTextarea}
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Segurança */}
        <div className={styles.securityCard}>
          <div className={styles.securityHeader}>
            <h3 className={styles.cardTitle}>🔒 Segurança da Conta</h3>
            {!isChangingPassword ? (
              <button 
                onClick={() => setIsChangingPassword(true)}
                className={styles.changePasswordBtn}
              >
                <FaLock /> Alterar Senha
              </button>
            ) : (
              <div className={styles.editActions}>
                <button 
                  onClick={cancelPasswordChange}
                  className={styles.cancelBtn}
                  disabled={isSaving}
                >
                  <FaTimes /> Cancelar
                </button>
                <button 
                  onClick={handleChangePassword}
                  className={styles.saveBtn}
                  disabled={isSaving}
                >
                  <FaSave /> {isSaving ? 'Alterando...' : 'Alterar Senha'}
                </button>
              </div>
            )}
          </div>

          <div className={styles.securityBody}>
            {!isChangingPassword ? (
              <div className={styles.securityInfo}>
                <div className={styles.securityItem}>
                  <FaLock className={styles.securityIcon} />
                  <div className={styles.securityContent}>
                    <h4>Senha</h4>
                    <p>Última alteração há 30 dias</p>
                  </div>
                </div>
                
                <div className={styles.securityItem}>
                  <FaEnvelope className={styles.securityIcon} />
                  <div className={styles.securityContent}>
                    <h4>Email Verificado</h4>
                    <p>Seu email está verificado e seguro</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.passwordForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Senha Atual</label>
                  <div className={styles.passwordInput}>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
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
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                      className={styles.formInput}
                      placeholder="Digite sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={styles.passwordToggle}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <small className={styles.passwordHint}>
                    A senha deve ter pelo menos 6 caracteres
                  </small>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirmar Nova Senha</label>
                  <div className={styles.passwordInput}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                      className={styles.formInput}
                      placeholder="Confirme sua nova senha"
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
            )}
          </div>
        </div>

        {/* Card de Estatísticas */}
        <div className={styles.statsCard}>
          <h3 className={styles.cardTitle}>📊 Suas Estatísticas</h3>
          
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <FaCalendarAlt />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                </span>
                <span className={styles.statLabel}>Membro desde</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <FaUser />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>
                  {user?.role === 'admin' ? 'Administradora' : 'Usuária'}
                </span>
                <span className={styles.statLabel}>Nível de acesso</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <FaEnvelope />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>Verificado</span>
                <span className={styles.statLabel}>Status do email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;