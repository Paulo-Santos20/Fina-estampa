import React, { useState } from 'react';
import { 
  FaGlobe, FaEdit, FaSave, FaTimes, FaImage, FaEye, 
  FaHome, FaImages, FaNewspaper, FaCog, FaTrash, FaPlus, 
  FaPalette // <--- Adicionado aqui
} from 'react-icons/fa';
import { useToast } from '../../../components/ui/Toast'; 
import styles from './CMSPage.module.css';

const CMSPage = () => {
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- MOCK DATA ---
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
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      link: '/catalog',
      isActive: true
    },
    {
      id: 2,
      title: 'Frete Grátis',
      subtitle: 'Em compras acima de R$ 200',
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

  // --- HANDLERS ---
  const handleHomeContentChange = (field, value) => setHomeContent(prev => ({ ...prev, [field]: value }));
  const handleSiteSettingsChange = (field, value) => setSiteSettings(prev => ({ ...prev, [field]: value }));
  const handleBannerChange = (id, field, value) => setBanners(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess ? showSuccess('Conteúdo salvo com sucesso!') : alert('Salvo!');
      setIsEditing(false);
    } catch (error) {
      showError ? showError('Erro ao salvar') : alert('Erro!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (field, file, bannerId = null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (bannerId) handleBannerChange(bannerId, 'image', e.target.result);
        else if (activeTab === 'home') handleHomeContentChange(field, e.target.result);
        else if (activeTab === 'settings') handleSiteSettingsChange(field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteBanner = (id) => {
    if (window.confirm('Excluir este banner?')) setBanners(prev => prev.filter(b => b.id !== id));
  };

  const handleAddBanner = () => {
    const newBanner = {
      id: Date.now(),
      title: 'Novo Banner',
      subtitle: '',
      image: '',
      link: '',
      isActive: true
    };
    setBanners([...banners, newBanner]);
    setIsEditing(true);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>
            <FaGlobe /> Editor do Site (CMS)
          </h2>
          <p className={styles.pageSubtitle}>
            Personalize o conteúdo, banners e aparência da sua loja.
          </p>
        </div>
        
        <div className={styles.headerActions}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
              <FaEdit /> Editar Conteúdo
            </button>
          ) : (
            <div className={styles.editGroup}>
              <button onClick={() => setIsEditing(false)} className={styles.cancelBtn} disabled={isSubmitting}>
                <FaTimes /> Cancelar
              </button>
              <button onClick={handleSave} className={styles.saveBtn} disabled={isSubmitting}>
                <FaSave /> {isSubmitting ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsWrapper}>
        <button onClick={() => setActiveTab('home')} className={`${styles.tabBtn} ${activeTab === 'home' ? styles.activeTab : ''}`}>
          <FaHome /> Página Inicial
        </button>
        <button onClick={() => setActiveTab('banners')} className={`${styles.tabBtn} ${activeTab === 'banners' ? styles.activeTab : ''}`}>
          <FaImages /> Banners
        </button>
        <button onClick={() => setActiveTab('settings')} className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.activeTab : ''}`}>
          <FaCog /> Configurações
        </button>
      </div>

      {/* --- HOME TAB --- */}
      {activeTab === 'home' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaNewspaper /> Seção Hero (Topo)</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formColumn}>
                <div className={styles.formGroup}>
                  <label>Título Principal</label>
                  <input type="text" value={homeContent.heroTitle} onChange={(e) => handleHomeContentChange('heroTitle', e.target.value)} disabled={!isEditing} />
                </div>
                <div className={styles.formGroup}>
                  <label>Subtítulo</label>
                  <textarea value={homeContent.heroSubtitle} onChange={(e) => handleHomeContentChange('heroSubtitle', e.target.value)} disabled={!isEditing} rows="3" />
                </div>
                <div className={styles.formGroup}>
                  <label>Texto do Botão</label>
                  <input type="text" value={homeContent.heroButton} onChange={(e) => handleHomeContentChange('heroButton', e.target.value)} disabled={!isEditing} />
                </div>
              </div>
              <div className={styles.formColumn}>
                <label>Imagem Hero</label>
                <div className={styles.imagePreviewBox}>
                  {homeContent.heroImage ? <img src={homeContent.heroImage} alt="Hero" /> : <span>Sem Imagem</span>}
                  {isEditing && (
                    <label className={styles.uploadOverlay}>
                      <FaImage /> Alterar
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload('heroImage', e.target.files[0])} hidden />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaCog /> Seções Opcionais</h3>
            </div>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={homeContent.featuredProducts} onChange={(e) => handleHomeContentChange('featuredProducts', e.target.checked)} disabled={!isEditing} />
                <span>Exibir produtos em destaque</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={homeContent.newsletter} onChange={(e) => handleHomeContentChange('newsletter', e.target.checked)} disabled={!isEditing} />
                <span>Exibir seção de newsletter</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* --- BANNERS TAB --- */}
      {activeTab === 'banners' && (
        <div className={styles.tabContent}>
          <div className={styles.bannersHeader}>
            <h3>Gerenciar Banners</h3>
            {isEditing && (
              <button onClick={handleAddBanner} className={styles.primaryBtn}>
                <FaPlus /> Adicionar Banner
              </button>
            )}
          </div>
          <div className={styles.bannersList}>
            {banners.map((banner) => (
              <div key={banner.id} className={styles.bannerCard}>
                <div className={styles.bannerImage}>
                  {banner.image ? <img src={banner.image} alt="Banner" /> : <div className={styles.placeholderImg}>Sem Imagem</div>}
                  {isEditing && (
                    <label className={styles.uploadOverlay}>
                      <FaImage /> Alterar
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(null, e.target.files[0], banner.id)} hidden />
                    </label>
                  )}
                </div>
                <div className={styles.bannerInfo}>
                  {isEditing ? (
                    <div className={styles.bannerForm}>
                      <input type="text" value={banner.title} onChange={(e) => handleBannerChange(banner.id, 'title', e.target.value)} placeholder="Título" />
                      <input type="text" value={banner.subtitle} onChange={(e) => handleBannerChange(banner.id, 'subtitle', e.target.value)} placeholder="Subtítulo" />
                      <input type="text" value={banner.link} onChange={(e) => handleBannerChange(banner.id, 'link', e.target.value)} placeholder="Link" />
                    </div>
                  ) : (
                    <div>
                      <h4>{banner.title}</h4>
                      <p>{banner.subtitle}</p>
                      <small>{banner.link}</small>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button onClick={() => handleDeleteBanner(banner.id)} className={styles.deleteBtn}>
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SETTINGS TAB --- */}
      {activeTab === 'settings' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaCog /> Identidade Visual</h3>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Nome do Site</label>
                <input type="text" value={siteSettings.siteName} onChange={(e) => handleSiteSettingsChange('siteName', e.target.value)} disabled={!isEditing} />
              </div>
              <div className={styles.formGroup}>
                <label>Descrição SEO</label>
                <input type="text" value={siteSettings.siteDescription} onChange={(e) => handleSiteSettingsChange('siteDescription', e.target.value)} disabled={!isEditing} />
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaPalette /> Cores do Site</h3> {/* FaPalette agora está importado */}
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Cor Primária</label>
                <div className={styles.colorPicker}>
                  <input type="color" value={siteSettings.primaryColor} onChange={(e) => handleSiteSettingsChange('primaryColor', e.target.value)} disabled={!isEditing} />
                  <span>{siteSettings.primaryColor}</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Cor Secundária</label>
                <div className={styles.colorPicker}>
                  <input type="color" value={siteSettings.secondaryColor} onChange={(e) => handleSiteSettingsChange('secondaryColor', e.target.value)} disabled={!isEditing} />
                  <span>{siteSettings.secondaryColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Button */}
      <div className={styles.previewContainer}>
        <button className={styles.previewBtn} onClick={() => window.open('/', '_blank')}>
          <FaEye /> Ver Site
        </button>
      </div>
    </div>
  );
};

export default CMSPage;