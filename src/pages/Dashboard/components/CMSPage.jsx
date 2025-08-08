import React, { useState, useRef } from 'react';
import { 
  FaGlobe, 
  FaSave, 
  FaEdit, 
  FaEye, 
  FaEyeSlash,
  FaArrowUp,
  FaArrowDown,
  FaImage,
  FaTrash,
  FaPlus,
  FaTimes,
  FaCamera,
  FaLink,
  FaTag,
  FaHome,
  FaUpload
} from 'react-icons/fa';
import { useCategories } from '../../../hooks/useCategories';
import styles from './CMSPage.module.css';

const CMSPage = () => {
  const { categories, updateCategoryOrder, toggleCategoryHeader } = useCategories();
  const [activeTab, setActiveTab] = useState('header');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState('');
  const fileInputRef = useRef(null);

  // Estado para configurações do header
  const [headerConfig, setHeaderConfig] = useState({
    logo: '/assets/logo.png',
    showSearch: true,
    showCart: true,
    showLogin: true,
    maxCategories: 6,
    headerStyle: 'default'
  });

  // Estado para hero section
  const [heroConfig, setHeroConfig] = useState({
    mainBanner: {
      image: '/assets/hero-main.jpg',
      title: 'Moda Feminina Elegante',
      subtitle: 'Descubra as últimas tendências em roupas femininas',
      buttonText: 'Ver Coleção',
      buttonLink: '/produtos',
      isActive: true
    },
    secondaryBanners: [
      {
        id: 1,
        image: '/assets/banner-1.jpg',
        title: 'Vestidos de Verão',
        subtitle: 'Até 40% OFF',
        buttonText: 'Comprar Agora',
        buttonLink: '/categoria/vestidos',
        isActive: true
      },
      {
        id: 2,
        image: '/assets/banner-2.jpg',
        title: 'Nova Coleção',
        subtitle: 'Outono/Inverno 2025',
        buttonText: 'Explorar',
        buttonLink: '/categoria/nova-colecao',
        isActive: true
      }
    ],
    autoSlide: true,
    slideInterval: 5000,
    showIndicators: true,
    showArrows: true
  });

  const tabs = [
    { id: 'header', label: 'Header & Menu', icon: FaTag },
    { id: 'hero', label: 'Banner Principal', icon: FaImage },
    { id: 'homepage', label: 'Página Inicial', icon: FaHome }
  ];

  // Categorias visíveis no header
  const headerCategories = categories
    .filter(cat => cat.showInHeader && cat.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, headerConfig.maxCategories);

  const handleHeaderConfigChange = (field, value) => {
    setHeaderConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHeroConfigChange = (field, value) => {
    setHeroConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMainBannerChange = (field, value) => {
    setHeroConfig(prev => ({
      ...prev,
      mainBanner: {
        ...prev.mainBanner,
        [field]: value
      }
    }));
  };

  const handleSecondaryBannerChange = (bannerId, field, value) => {
    setHeroConfig(prev => ({
      ...prev,
      secondaryBanners: prev.secondaryBanners.map(banner =>
        banner.id === bannerId
          ? { ...banner, [field]: value }
          : banner
      )
    }));
  };

  const addSecondaryBanner = () => {
    const newBanner = {
      id: Date.now(),
      image: '/assets/placeholder-banner.jpg',
      title: 'Novo Banner',
      subtitle: 'Descrição do banner',
      buttonText: 'Clique Aqui',
      buttonLink: '/produtos',
      isActive: true
    };

    setHeroConfig(prev => ({
      ...prev,
      secondaryBanners: [...prev.secondaryBanners, newBanner]
    }));
  };

  const removeSecondaryBanner = (bannerId) => {
    if (window.confirm('Tem certeza que deseja remover este banner?')) {
      setHeroConfig(prev => ({
        ...prev,
        secondaryBanners: prev.secondaryBanners.filter(banner => banner.id !== bannerId)
      }));
    }
  };

  const handleImageUpload = (e, type, bannerId = null) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('❌ Tipo de arquivo não suportado. Use: JPG, PNG ou WEBP');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ Arquivo muito grande. Máximo 5MB');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        
        if (type === 'logo') {
          handleHeaderConfigChange('logo', imageUrl);
        } else if (type === 'mainBanner') {
          handleMainBannerChange('image', imageUrl);
        } else if (type === 'secondaryBanner' && bannerId) {
          handleSecondaryBannerChange(bannerId, 'image', imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openImageModal = (type, bannerId = null) => {
    setSelectedImageType(type);
    setShowImageModal(true);
    // Se for banner secundário, armazenar o ID
    if (bannerId) {
      setSelectedImageType(`secondaryBanner-${bannerId}`);
    }
  };

  const handleSaveChanges = () => {
    // Aqui você salvaria as configurações no backend
    alert('✅ Configurações salvas com sucesso!');
  };

  const previewSite = () => {
    // Abrir preview do site em nova aba
    window.open('/', '_blank');
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
            Configure o layout, banners e conteúdo das páginas
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={previewSite}
            className={styles.previewBtn}
          >
            <FaEye /> Preview do Site
          </button>
          <button 
            onClick={handleSaveChanges}
            className={styles.saveBtn}
          >
            <FaSave /> Salvar Alterações
          </button>
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
        {/* Aba Header & Menu */}
        {activeTab === 'header' && (
          <div className={styles.headerSection}>
            <div className={styles.sectionCard}>
              <h3 className={styles.cardTitle}>
                <FaTag /> Configurações do Header
              </h3>
              
              <div className={styles.configGrid}>
                {/* Logo */}
                <div className={styles.configItem}>
                  <label className={styles.configLabel}>Logo da Loja</label>
                  <div className={styles.logoUpload}>
                    <div className={styles.logoPreview}>
                      <img 
                        src={headerConfig.logo} 
                        alt="Logo" 
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIj5MT0dPPC90ZXh0Pgo8L3N2Zz4K";
                        }}
                      />
                      <button 
                        className={styles.changeLogoBtn}
                        onClick={() => openImageModal('logo')}
                      >
                        <FaCamera />
                      </button>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                    />
                  </div>
                </div>

                {/* Configurações do Header */}
                <div className={styles.configItem}>
                  <label className={styles.configLabel}>Máximo de Categorias no Menu</label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={headerConfig.maxCategories}
                    onChange={(e) => handleHeaderConfigChange('maxCategories', parseInt(e.target.value))}
                    className={styles.configInput}
                  />
                </div>

                <div className={styles.configItem}>
                  <label className={styles.configLabel}>Estilo do Header</label>
                  <select
                    value={headerConfig.headerStyle}
                    onChange={(e) => handleHeaderConfigChange('headerStyle', e.target.value)}
                    className={styles.configSelect}
                  >
                    <option value="default">Padrão</option>
                    <option value="minimal">Minimalista</option>
                    <option value="bold">Destacado</option>
                  </select>
                </div>
              </div>

              <div className={styles.togglesGrid}>
                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={headerConfig.showSearch}
                    onChange={(e) => handleHeaderConfigChange('showSearch', e.target.checked)}
                    className={styles.toggle}
                  />
                  <span className={styles.toggleText}>
                    🔍 Mostrar Barra de Pesquisa
                  </span>
                </label>

                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={headerConfig.showCart}
                    onChange={(e) => handleHeaderConfigChange('showCart', e.target.checked)}
                    className={styles.toggle}
                  />
                  <span className={styles.toggleText}>
                    🛒 Mostrar Carrinho
                  </span>
                </label>

                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={headerConfig.showLogin}
                    onChange={(e) => handleHeaderConfigChange('showLogin', e.target.checked)}
                    className={styles.toggle}
                  />
                  <span className={styles.toggleText}>
                    👤 Mostrar Login
                  </span>
                </label>
              </div>
            </div>

            {/* Categorias do Menu */}
            <div className={styles.sectionCard}>
              <h3 className={styles.cardTitle}>
                <FaTag /> Categorias no Menu Principal
              </h3>
              
              <div className={styles.categoriesInfo}>
                <p>
                  <strong>Categorias ativas no header:</strong> {headerCategories.length} de {headerConfig.maxCategories}
                </p>
                <p className={styles.infoText}>
                  As categorias são ordenadas automaticamente. Use a página de Categorias para ativar/desativar e reordenar.
                </p>
              </div>

              <div className={styles.categoriesList}>
                {headerCategories.map((category, index) => (
                  <div key={category.id} className={styles.categoryItem}>
                    <div className={styles.categoryOrder}>
                      {index + 1}
                    </div>
                    <div className={styles.categoryInfo}>
                      <span className={styles.categoryName}>{category.name}</span>
                      <span className={styles.categoryDesc}>{category.description}</span>
                    </div>
                    <div className={styles.categoryActions}>
                      <button
                        onClick={() => toggleCategoryHeader(category.id)}
                        className={styles.toggleBtn}
                        title="Remover do header"
                      >
                        <FaEyeSlash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {headerCategories.length === 0 && (
                <div className={styles.emptyCategories}>
                  <FaTag className={styles.emptyIcon} />
                  <p>Nenhuma categoria ativa no header</p>
                  <p className={styles.emptyText}>
                    Vá para a página de Categorias para ativar categorias no header
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Aba Hero Section */}
        {activeTab === 'hero' && (
          <div className={styles.heroSection}>
            {/* Banner Principal */}
            <div className={styles.sectionCard}>
              <h3 className={styles.cardTitle}>
                <FaImage /> Banner Principal
              </h3>
              
              <div className={styles.bannerEditor}>
                <div className={styles.bannerPreview}>
                  <img 
                    src={heroConfig.mainBanner.image} 
                    alt="Banner Principal"
                    className={styles.bannerImage}
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzIyRjM3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSI2MDAiPkJBTk5FUiBQUklOQ0lQQUw8L3RleHQ+Cjwvc3ZnPgo=";
                    }}
                  />
                  <div className={styles.bannerOverlay}>
                    <h2 className={styles.bannerTitle}>{heroConfig.mainBanner.title}</h2>
                    <p className={styles.bannerSubtitle}>{heroConfig.mainBanner.subtitle}</p>
                    <button className={styles.bannerButton}>
                      {heroConfig.mainBanner.buttonText}
                    </button>
                  </div>
                  <button 
                    className={styles.changeBannerBtn}
                    onClick={() => openImageModal('mainBanner')}
                  >
                    <FaCamera /> Alterar Imagem
                  </button>
                </div>

                <div className={styles.bannerForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Título Principal</label>
                    <input
                      type="text"
                      value={heroConfig.mainBanner.title}
                      onChange={(e) => handleMainBannerChange('title', e.target.value)}
                      className={styles.formInput}
                      placeholder="Digite o título principal"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Subtítulo</label>
                    <input
                      type="text"
                      value={heroConfig.mainBanner.subtitle}
                      onChange={(e) => handleMainBannerChange('subtitle', e.target.value)}
                      className={styles.formInput}
                      placeholder="Digite o subtítulo"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Texto do Botão</label>
                      <input
                        type="text"
                        value={heroConfig.mainBanner.buttonText}
                        onChange={(e) => handleMainBannerChange('buttonText', e.target.value)}
                        className={styles.formInput}
                        placeholder="Ex: Ver Coleção"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Link do Botão</label>
                      <input
                        type="text"
                        value={heroConfig.mainBanner.buttonLink}
                        onChange={(e) => handleMainBannerChange('buttonLink', e.target.value)}
                        className={styles.formInput}
                        placeholder="/produtos"
                      />
                    </div>
                  </div>

                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={heroConfig.mainBanner.isActive}
                      onChange={(e) => handleMainBannerChange('isActive', e.target.checked)}
                      className={styles.toggle}
                    />
                    <span className={styles.toggleText}>
                      ✅ Banner Ativo
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Banners Secundários */}
            <div className={styles.sectionCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <FaImage /> Banners Secundários
                </h3>
                <button 
                  onClick={addSecondaryBanner}
                  className={styles.addBtn}
                >
                  <FaPlus /> Adicionar Banner
                </button>
              </div>

              <div className={styles.secondaryBanners}>
                {heroConfig.secondaryBanners.map((banner, index) => (
                  <div key={banner.id} className={styles.secondaryBanner}>
                    <div className={styles.bannerHeader}>
                      <h4 className={styles.bannerNumber}>Banner {index + 1}</h4>
                      <button 
                        onClick={() => removeSecondaryBanner(banner.id)}
                        className={styles.removeBtn}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className={styles.bannerEditor}>
                      <div className={styles.bannerPreview}>
                        <img 
                          src={banner.image} 
                          alt={`Banner ${index + 1}`}
                          className={styles.bannerImage}
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTA1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzIyRjM3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiPkJBTk5FUjwvdGV4dD4KPC9zdmc+Cg==";
                          }}
                        />
                        <div className={styles.bannerOverlay}>
                          <h3 className={styles.bannerTitle}>{banner.title}</h3>
                          <p className={styles.bannerSubtitle}>{banner.subtitle}</p>
                          <button className={styles.bannerButton}>
                            {banner.buttonText}
                          </button>
                        </div>
                        <button 
                          className={styles.changeBannerBtn}
                          onClick={() => openImageModal('secondaryBanner', banner.id)}
                        >
                          <FaCamera />
                        </button>
                      </div>

                      <div className={styles.bannerForm}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Título</label>
                          <input
                            type="text"
                            value={banner.title}
                            onChange={(e) => handleSecondaryBannerChange(banner.id, 'title', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Subtítulo</label>
                          <input
                            type="text"
                            value={banner.subtitle}
                            onChange={(e) => handleSecondaryBannerChange(banner.id, 'subtitle', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Texto do Botão</label>
                            <input
                              type="text"
                              value={banner.buttonText}
                              onChange={(e) => handleSecondaryBannerChange(banner.id, 'buttonText', e.target.value)}
                              className={styles.formInput}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Link</label>
                            <input
                              type="text"
                              value={banner.buttonLink}
                              onChange={(e) => handleSecondaryBannerChange(banner.id, 'buttonLink', e.target.value)}
                              className={styles.formInput}
                            />
                          </div>
                        </div>

                        <label className={styles.toggleLabel}>
                          <input
                            type="checkbox"
                            checked={banner.isActive}
                            onChange={(e) => handleSecondaryBannerChange(banner.id, 'isActive', e.target.checked)}
                            className={styles.toggle}
                          />
                          <span className={styles.toggleText}>
                            ✅ Banner Ativo
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {heroConfig.secondaryBanners.length === 0 && (
                <div className={styles.emptyBanners}>
                  <FaImage className={styles.emptyIcon} />
                  <p>Nenhum banner secundário configurado</p>
                  <button 
                    onClick={addSecondaryBanner}
                    className={styles.addBtn}
                  >
                    <FaPlus /> Adicionar Primeiro Banner
                  </button>
                </div>
              )}
            </div>

            {/* Configurações do Slider */}
            <div className={styles.sectionCard}>
              <h3 className={styles.cardTitle}>
                ⚙️ Configurações do Slider
              </h3>

              <div className={styles.sliderConfig}>
                <div className={styles.configRow}>
                  <div className={styles.configItem}>
                    <label className={styles.configLabel}>Intervalo de Troca (segundos)</label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={heroConfig.slideInterval / 1000}
                      onChange={(e) => handleHeroConfigChange('slideInterval', parseInt(e.target.value) * 1000)}
                      className={styles.configInput}
                    />
                  </div>
                </div>

                <div className={styles.togglesGrid}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={heroConfig.autoSlide}
                      onChange={(e) => handleHeroConfigChange('autoSlide', e.target.checked)}
                      className={styles.toggle}
                    />
                    <span className={styles.toggleText}>
                      🔄 Troca Automática
                    </span>
                  </label>

                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={heroConfig.showIndicators}
                      onChange={(e) => handleHeroConfigChange('showIndicators', e.target.checked)}
                      className={styles.toggle}
                    />
                    <span className={styles.toggleText}>
                      ⚪ Mostrar Indicadores
                    </span>
                  </label>

                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={heroConfig.showArrows}
                      onChange={(e) => handleHeroConfigChange('showArrows', e.target.checked)}
                      className={styles.toggle}
                    />
                    <span className={styles.toggleText}>
                      ◀▶ Mostrar Setas
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba Página Inicial */}
        {activeTab === 'homepage' && (
          <div className={styles.homepageSection}>
            <div className={styles.sectionCard}>
              <h3 className={styles.cardTitle}>
                <FaHome /> Configurações da Página Inicial
              </h3>
              <div className={styles.comingSoon}>
                <FaHome className={styles.comingSoonIcon} />
                <h4>Em Desenvolvimento</h4>
                <p>Configurações para seções da página inicial em breve!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Upload de Imagem */}
      {showImageModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                <FaUpload /> Fazer Upload de Imagem
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className={styles.modalCloseBtn}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.uploadArea}>
                <FaUpload className={styles.uploadIcon} />
                <h4>Selecione uma imagem</h4>
                <p>JPG, PNG ou WEBP - Máximo 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (selectedImageType === 'logo') {
                      handleImageUpload(e, 'logo');
                    } else if (selectedImageType === 'mainBanner') {
                      handleImageUpload(e, 'mainBanner');
                    } else if (selectedImageType.startsWith('secondaryBanner-')) {
                      const bannerId = parseInt(selectedImageType.split('-')[1]);
                      handleImageUpload(e, 'secondaryBanner', bannerId);
                    }
                    setShowImageModal(false);
                  }}
                  className={styles.fileInput}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSPage;