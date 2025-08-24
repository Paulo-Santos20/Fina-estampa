import React, { useState } from 'react';
import { 
  FaGlobe, 
  FaEdit,
  FaSave,
  FaTimes,
  FaImage,
  FaEye,
  FaCode,
  FaPalette,
  FaHome,
  FaImages,
  FaNewspaper,
  FaCog
} from 'react-icons/fa';
import styles from './CMSPage.module.css';

const CMSPage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Fina Estampa - Boutique Eleganza',
    heroSubtitle: 'Descubra a elegância em cada peça da nossa coleção exclusiva',
    heroButton: 'Ver Coleção',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    aboutTitle: 'Sobre a Fina Estampa',
    aboutText: 'Há mais de 10 anos trazendo elegância e sofisticação para o guarda-roupa feminino...',
    featuredProducts: true,
    newsletter: true
  });

  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Coleção Verão 2024',
      subtitle: 'Até 30% OFF',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      link: '/catalog',
      isActive: true
    },
    {
      id: 2,
      title: 'Frete Grátis',
      subtitle: 'Em compras acima de R\$ 200',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800',
      link: '/catalog',
      isActive: true
    }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    siteName: 'Fina Estampa',
    siteDescription: 'Boutique de moda feminina com elegância e sofisticação',
    logo: '',
    favicon: '',
    primaryColor: '#722F37',
    secondaryColor: '#F8E8E9',
    whatsapp: '5511999999999',
    instagram: '@finaestampa',
    facebook: 'finaestampa'
  });

  const handleHomeContentChange = (field, value) => {
    setHomeContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSiteSettingsChange = (field, value) => {
    setSiteSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Conteúdo salvo com sucesso!');
      setIsEditing(false);
    } catch (error) {
      alert('Erro ao salvar conteúdo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (activeTab === 'home') {
          handleHomeContentChange(field, e.target.result);
        } else if (activeTab === 'settings') {
          handleSiteSettingsChange(field, e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaGlobe />
            Gerenciar Conteúdo do Site
          </h2>
          <p className={styles.pageSubtitle}>
            Edite o conteúdo e configurações do seu site
          </p>
        </div>
        
        <div className={styles.headerActions}>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className={styles.editBtn}
            >
              <FaEdit /> Editar Conteúdo
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
              <button 
                onClick={handleSave}
                className={styles.saveBtn}
                disabled={isSubmitting}
              >
                <FaSave /> {isSubmitting ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('home')}
          className={`${styles.tabBtn} ${activeTab === 'home' ? styles.active : ''}`}
        >
          <FaHome /> Página Inicial
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`${styles.tabBtn} ${activeTab === 'banners' ? styles.active : ''}`}
        >
          <FaImages /> Banners
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.active : ''}`}
        >
          <FaCog /> Configurações
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <div className={styles.tabContent}>
        {/* Tab Página Inicial */}
        {activeTab === 'home' && (
          <div className={styles.homeContent}>
            <div className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>
                <FaNewspaper /> Seção Hero
              </h3>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Título Principal</label>
                <input
                  type="text"
                  value={homeContent.heroTitle}
                  onChange={(e) => handleHomeContentChange('heroTitle', e.target.value)}
                  disabled={!isEditing}
                  className={styles.formInput}
                  placeholder="Título da seção hero"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subtítulo</label>
                <textarea
                  value={homeContent.heroSubtitle}
                  onChange={(e) => handleHomeContentChange('heroSubtitle', e.target.value)}
                  disabled={!isEditing}
                  rows="2"
                  className={styles.formTextarea}
                  placeholder="Subtítulo da seção hero"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Texto do Botão</label>
                  <input
                    type="text"
                    value={homeContent.heroButton}
                    onChange={(e) => handleHomeContentChange('heroButton', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="Texto do botão"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Imagem Hero</label>
                  <div className={styles.imageUpload}>
                    {homeContent.heroImage && (
                      <img 
                        src={homeContent.heroImage} 
                        alt="Hero" 
                        className={styles.imagePreview}
                      />
                    )}
                    {isEditing && (
                      <label className={styles.uploadBtn}>
                        <FaImage /> Alterar Imagem
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('heroImage', e.target.files[0])}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>
                <FaNewspaper /> Seção Sobre
              </h3>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Título da Seção</label>
                <input
                  type="text"
                  value={homeContent.aboutTitle}
                  onChange={(e) => handleHomeContentChange('aboutTitle', e.target.value)}
                  disabled={!isEditing}
                  className={styles.formInput}
                  placeholder="Título da seção sobre"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Texto da Seção</label>
                <textarea
                  value={homeContent.aboutText}
                  onChange={(e) => handleHomeContentChange('aboutText', e.target.value)}
                  disabled={!isEditing}
                  rows="4"
                  className={styles.formTextarea}
                  placeholder="Texto da seção sobre a empresa"
                />
              </div>
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>
                <FaCog /> Seções Opcionais
              </h3>
              
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={homeContent.featuredProducts}
                    onChange={(e) => handleHomeContentChange('featuredProducts', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span>Exibir produtos em destaque</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={homeContent.newsletter}
                    onChange={(e) => handleHomeContentChange('newsletter', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span>Exibir seção de newsletter</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab Banners */}
        {activeTab === 'banners' && (
          <div className={styles.bannersContent}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaImages /> Gerenciar Banners
              </h3>
              {isEditing && (
                <button className={styles.addBtn}>
                  <FaImage /> Adicionar Banner
                </button>
              )}
            </div>

            <div className={styles.bannersGrid}>
              {banners.map((banner) => (
                <div key={banner.id} className={styles.bannerCard}>
                  <div className={styles.bannerImage}>
                    <img src={banner.image} alt={banner.title} />
                    {isEditing && (
                      <label className={styles.bannerUpload}>
                        <FaImage />
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                  
                  <div className={styles.bannerInfo}>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={banner.title}
                          className={styles.bannerInput}
                          placeholder="Título do banner"
                        />
                        <input
                          type="text"
                          value={banner.subtitle}
                          className={styles.bannerInput}
                          placeholder="Subtítulo do banner"
                        />
                        <input
                          type="text"
                          value={banner.link}
                          className={styles.bannerInput}
                          placeholder="Link do banner"
                        />
                      </>
                    ) : (
                      <>
                        <h4>{banner.title}</h4>
                        <p>{banner.subtitle}</p>
                        <span className={styles.bannerLink}>{banner.link}</span>
                      </>
                    )}
                  </div>

                  {isEditing && (
                    <div className={styles.bannerActions}>
                      <button className={styles.deleteBtn}>
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Configurações */}
        {activeTab === 'settings' && (
          <div className={styles.settingsContent}>
            <div className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>
                <FaCog /> Configurações Gerais
              </h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nome do Site</label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => handleSiteSettingsChange('siteName', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="Nome do seu site"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Descrição do Site</label>
                  <input
                    type="text"
                    value={siteSettings.siteDescription}
                    onChange={(e) => handleSiteSettingsChange('siteDescription', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="Descrição para SEO"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Logo</label>
                  <div className={styles.imageUpload}>
                    {siteSettings.logo && (
                      <img 
                        src={siteSettings.logo} 
                        alt="Logo" 
                        className={styles.logoPreview}
                      />
                    )}
                    {isEditing && (
                      <label className={styles.uploadBtn}>
                        <FaImage /> {siteSettings.logo ? 'Alterar Logo' : 'Upload Logo'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('logo', e.target.files[0])}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Favicon</label>
                  <div className={styles.imageUpload}>
                    {siteSettings.favicon && (
                      <img 
                        src={siteSettings.favicon} 
                        alt="Favicon" 
                        className={styles.faviconPreview}
                      />
                    )}
                    {isEditing && (
                      <label className={styles.uploadBtn}>
                        <FaImage /> {siteSettings.favicon ? 'Alterar Favicon' : 'Upload Favicon'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('favicon', e.target.files[0])}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
                        </div>

            <div className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>
                <FaPalette /> Cores do Site
              </h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Cor Primária</label>
                  <div className={styles.colorInput}>
                    <input
                      type="color"
                      value={siteSettings.primaryColor}
                      onChange={(e) => handleSiteSettingsChange('primaryColor', e.target.value)}
                      disabled={!isEditing}
                      className={styles.colorPicker}
                    />
                    <input
                      type="text"
                      value={siteSettings.primaryColor}
                      onChange={(e) => handleSiteSettingsChange('primaryColor', e.target.value)}
                      disabled={!isEditing}
                      className={styles.colorText}
                      placeholder="#722F37"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Cor Secundária</label>
                  <div className={styles.colorInput}>
                    <input
                      type="color"
                      value={siteSettings.secondaryColor}
                      onChange={(e) => handleSiteSettingsChange('secondaryColor', e.target.value)}
                      disabled={!isEditing}
                      className={styles.colorPicker}
                    />
                    <input
                      type="text"
                      value={siteSettings.secondaryColor}
                      onChange={(e) => handleSiteSettingsChange('secondaryColor', e.target.value)}
                      disabled={!isEditing}
                      className={styles.colorText}
                      placeholder="#F8E8E9"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>
                <FaGlobe /> Redes Sociais
              </h3>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>WhatsApp</label>
                <input
                  type="text"
                  value={siteSettings.whatsapp}
                  onChange={(e) => handleSiteSettingsChange('whatsapp', e.target.value)}
                  disabled={!isEditing}
                  className={styles.formInput}
                  placeholder="5511999999999"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Instagram</label>
                  <input
                    type="text"
                    value={siteSettings.instagram}
                    onChange={(e) => handleSiteSettingsChange('instagram', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="@finaestampa"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Facebook</label>
                  <input
                    type="text"
                    value={siteSettings.facebook}
                    onChange={(e) => handleSiteSettingsChange('facebook', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="finaestampa"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Button */}
      <div className={styles.previewSection}>
        <button className={styles.previewBtn}>
          <FaEye /> Visualizar Site
        </button>
      </div>
    </div>
  );
};

export default CMSPage;