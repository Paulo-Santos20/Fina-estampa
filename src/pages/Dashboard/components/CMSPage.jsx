import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CMSPage.module.css';
import { useCMS } from '../../../contexts/CMSContext.jsx';
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
  FaUpload,
  FaTruck,
  FaStar,
  FaPercent,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaCreditCard,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGift,
  FaClock,
  FaSearch,
  FaExchangeAlt,
  FaShoppingBag,
  FaUser,
  FaMoneyBillWave,
  FaBarcode,
  FaBars,
  FaSort,
  FaGripVertical
} from 'react-icons/fa';

// Dados simulados (fallback)
const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Blusa Social Elegante', price: 89.90, image: 'https://picsum.photos/seed/blusa1/400/480', category: 'Blusas & Camisas', active: true },
  { id: 'p2', name: 'Vestido Festa Velvet', price: 189.90, image: 'https://picsum.photos/seed/vestido2/400/480', category: 'Vestidos', active: true },
  { id: 'p3', name: 'Calça Alfaiataria Slim', price: 159.90, image: 'https://picsum.photos/seed/calca3/400/480', category: 'Calças & Shorts', active: true },
  { id: 'p4', name: 'Saia Midi Plissada', price: 129.90, image: 'https://picsum.photos/seed/saia4/400/480', category: 'Saias & Macacões', active: true },
  { id: 'p5', name: 'Camisa Seda Premium', price: 219.90, image: 'https://picsum.photos/seed/camisa5/400/480', category: 'Blusas & Camisas', active: true },
  { id: 'p6', name: 'Macacão Minimal Chic', price: 199.90, image: 'https://picsum.photos/seed/macacao6/400/480', category: 'Saias & Macacões', active: true },
  { id: 'p7', name: 'Bolsa Courino Dourada', price: 149.90, image: 'https://picsum.photos/seed/bolsa7/400/480', category: 'Acessórios', active: true },
  { id: 'p8', name: 'Sandália Salto Fino', price: 179.90, image: 'https://picsum.photos/seed/sandalia8/400/480', category: 'Acessórios', active: true },
  { id: 'p9', name: 'Blazer Tweed Clássico', price: 259.90, image: 'https://picsum.photos/seed/blazer9/400/480', category: 'Blusas & Camisas', active: true },
  { id: 'p10', name: 'Vestido Casual Summer', price: 129.90, image: 'https://picsum.photos/seed/vestido10/400/480', category: 'Vestidos', active: true },
  { id: 'p11', name: 'Short Linho Fresh', price: 99.90, image: 'https://picsum.photos/seed/short11/400/480', category: 'Calças & Shorts', active: true },
  { id: 'p12', name: 'Colar Pérolas Delicadas', price: 79.90, image: 'https://picsum.photos/seed/colar12/400/480', category: 'Acessórios', active: true }
];

const SAMPLE_CATEGORIES = [
  { id: 'c1', name: 'Vestidos', slug: 'vestidos' },
  { id: 'c2', name: 'Blusas & Camisas', slug: 'blusas-camisas' },
  { id: 'c3', name: 'Calças & Shorts', slug: 'calcas-shorts' },
  { id: 'c4', name: 'Saias & Macacões', slug: 'saias-macacoes' },
  { id: 'c5', name: 'Acessórios', slug: 'acessorios' },
  { id: 'c6', name: 'Coleções Especiais', slug: 'colecoes-especiais' },
  { id: 'c7', name: 'Trabalho', slug: 'trabalho' },
  { id: 'c8', name: 'Festa', slug: 'festa' },
  { id: 'c9', name: 'Casual', slug: 'casual' },
  { id: 'c10', name: 'Inverno', slug: 'inverno' },
  { id: 'c11', name: 'Verão', slug: 'verao' },
  { id: 'c12', name: 'Primavera', slug: 'primavera' }
];

const formatPrice = (n) =>
  typeof n === 'number'
    ? `R$ ${n.toFixed(2).replace('.', ',')}`
    : 'R$ 0,00';

const CMSPage = () => {
  // Abas
  const [activeTab, setActiveTab] = useState('header');

  // Dados base (em produção: buscar via API/contexts)
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // === USAR DADOS DO CONTEXTO ===
  const {
    headerSettings: contextHeaderSettings,
    setHeaderSettings: setContextHeaderSettings,
    headerCategories: contextHeaderCategories,
    setHeaderCategories: setContextHeaderCategories,
    banners: contextBanners,
    setBanners: setContextBanners,
    contact: contextContact,
    setContact: setContextContact,
    payment: contextPayment,
    setPayment: setContextPayment,
    saveAllData
  } = useCMS();

  // Estados locais que sincronizam com o contexto
  const [headerSettings, setHeaderSettings] = useState(contextHeaderSettings);
  const [headerCategories, setHeaderCategories] = useState(contextHeaderCategories);
  const [banners, setBanners] = useState(contextBanners);
  const [contact, setContact] = useState(contextContact);
  const [payment, setPayment] = useState(contextPayment);

  // Estados que ainda não estão no contexto (podem ser adicionados depois)
  const [featuredProductIds, setFeaturedProductIds] = useState(['p2', 'p1', 'p3', 'p4']);
  const [homepageCategoryIds, setHomepageCategoryIds] = useState(['c1', 'c2', 'c5', 'c8']);
  const [newArrivalIds, setNewArrivalIds] = useState(['p10', 'p6', 'p5']);
  const [specialOffers, setSpecialOffers] = useState([
    { id: 'p2', originalPrice: 219.90, salePrice: 189.90, active: true },
    { id: 'p7', originalPrice: 169.90, salePrice: 149.90, active: true }
  ]);

  // Modais gerais
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showHeaderCategoryModal, setShowHeaderCategoryModal] = useState(false);
  const [modalPurpose, setModalPurpose] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  // Upload refs
  const bannerFileRefs = useRef({});
  const logoFileRef = useRef(null);

  // === SINCRONIZAÇÃO COM O CONTEXTO ===
  
  // Sincronizar estados locais com o contexto quando o contexto muda
  useEffect(() => {
    setHeaderSettings(contextHeaderSettings);
  }, [contextHeaderSettings]);

  useEffect(() => {
    setHeaderCategories(contextHeaderCategories);
  }, [contextHeaderCategories]);

  useEffect(() => {
    setBanners(contextBanners);
  }, [contextBanners]);

  useEffect(() => {
    setContact(contextContact);
  }, [contextContact]);

  useEffect(() => {
    setPayment(contextPayment);
  }, [contextPayment]);

  // Carregar dados do localStorage na montagem
  useEffect(() => {
    setAllProducts(SAMPLE_PRODUCTS);
    setAllCategories(SAMPLE_CATEGORIES);

    // Carregar dados salvos do localStorage
    try {
      const savedData = localStorage.getItem('finaEstampaCMS');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Restaurar estados que não estão no contexto ainda
        if (parsedData.featuredProductIds) {
          setFeaturedProductIds(parsedData.featuredProductIds);
        }
        if (parsedData.homepageCategoryIds) {
          setHomepageCategoryIds(parsedData.homepageCategoryIds);
        }
        if (parsedData.newArrivalIds) {
          setNewArrivalIds(parsedData.newArrivalIds);
        }
        if (parsedData.specialOffers) {
          setSpecialOffers(parsedData.specialOffers);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do CMS:', error);
    }
  }, []);

  // Computados
  const featuredProducts = useMemo(
    () => featuredProductIds
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean),
    [featuredProductIds, allProducts]
  );

  const homepageCategories = useMemo(
    () => homepageCategoryIds
      .map(id => allCategories.find(c => c.id === id))
      .filter(Boolean),
    [homepageCategoryIds, allCategories]
  );

  const newArrivals = useMemo(
    () => newArrivalIds
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean),
    [newArrivalIds, allProducts]
  );

  const specialOffersDetailed = useMemo(
    () => specialOffers.map(offer => {
      const product = allProducts.find(p => p.id === offer.id);
      const discount = offer.originalPrice && offer.salePrice
        ? Math.max(0, Math.round((1 - (offer.salePrice / offer.originalPrice)) * 100))
        : 0;
      return { ...offer, product, discount };
    }).filter(x => x.product),
    [specialOffers, allProducts]
  );

  // === HANDLERS PARA HEADER (ATUALIZADOS PARA USAR CONTEXTO) ===

  // Logo handlers
  const handleLogoUpload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newSettings = { 
      ...headerSettings, 
      logoType: 'image',
      logoImage: url 
    };
    setHeaderSettings(newSettings);
    setContextHeaderSettings(newSettings);
  };

  const handleLogoChange = (field, value) => {
    const newSettings = { ...headerSettings, [field]: value };
    setHeaderSettings(newSettings);
    setContextHeaderSettings(newSettings);
  };

  // Header categories handlers
  const openHeaderCategoryPicker = () => {
    setCategorySearch('');
    setShowHeaderCategoryModal(true);
  };

  const handlePickHeaderCategory = (category) => {
    const nextOrder = Math.max(...headerCategories.map(c => c.order), 0) + 1;
    const newCategory = {
      ...category,
      order: nextOrder,
      active: true
    };
    const newCategories = [...headerCategories, newCategory];
    setHeaderCategories(newCategories);
    setContextHeaderCategories(newCategories);
    setShowHeaderCategoryModal(false);
  };

  const removeHeaderCategory = (id) => {
    const newCategories = headerCategories.filter(c => c.id !== id);
    setHeaderCategories(newCategories);
    setContextHeaderCategories(newCategories);
  };

  const moveHeaderCategory = (id, direction) => {
    const sorted = [...headerCategories].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex(c => c.id === id);
    
    if (index < 0) return;
    
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;
    
    // Trocar as ordens
    const temp = sorted[index].order;
    sorted[index].order = sorted[swapIndex].order;
    sorted[swapIndex].order = temp;
    
    setHeaderCategories(sorted);
    setContextHeaderCategories(sorted);
  };

  const toggleHeaderCategory = (id) => {
    const newCategories = headerCategories.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    );
    setHeaderCategories(newCategories);
    setContextHeaderCategories(newCategories);
  };

  // Handlers de Banners (ATUALIZADOS PARA USAR CONTEXTO)
  const handleAddBanner = () => {
    const nextOrder = (banners[banners.length - 1]?.order || 0) + 1;
    const newBanners = [
      ...banners,
      {
        id: `b${Date.now()}`,
        title: 'Novo Banner',
        subtitle: '',
        link: '',
        image: '',
        active: true,
        order: nextOrder
      }
    ];
    setBanners(newBanners);
    setContextBanners(newBanners);
  };

  const handleRemoveBanner = (id) => {
    const newBanners = banners.filter(b => b.id !== id);
    setBanners(newBanners);
    setContextBanners(newBanners);
  };

  const handleMoveBanner = (id, dir) => {
    const ordered = [...banners].sort((a, b) => a.order - b.order);
    const idx = ordered.findIndex(b => b.id === id);
    if (idx < 0) return;
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= ordered.length) return;
    const tmp = ordered[idx].order;
    ordered[idx].order = ordered[swapIdx].order;
    ordered[swapIdx].order = tmp;
    setBanners(ordered);
    setContextBanners(ordered);
  };

  const handleBannerChange = (id, field, value) => {
    const newBanners = banners.map(b => b.id === id ? { ...b, [field]: value } : b);
    setBanners(newBanners);
    setContextBanners(newBanners);
  };

  const handleBannerUpload = (id, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newBanners = banners.map(b => b.id === id ? { ...b, image: url } : b);
    setBanners(newBanners);
    setContextBanners(newBanners);
  };

  // Handlers de Contato (ATUALIZADOS PARA USAR CONTEXTO)
  const handleContactChange = (field, value) => {
    const newContact = { ...contact, [field]: value };
    setContact(newContact);
    setContextContact(newContact);
  };

  // Handlers de Pagamento (ATUALIZADOS PARA USAR CONTEXTO)
  const handlePaymentChange = (field, value) => {
    const newPayment = { ...payment, [field]: value };
    setPayment(newPayment);
    setContextPayment(newPayment);
  };

  // Handlers de Destaques
  const openProductPicker = (purpose, index = null) => {
    setModalPurpose(purpose);
    setModalIndex(index);
    setProductSearch('');
    setShowProductModal(true);
  };

  const handlePickProduct = (product) => {
    if (modalPurpose === 'featured') {
      setFeaturedProductIds(prev => {
        const next = [...prev];
        if (modalIndex === null || modalIndex === undefined) {
          if (!next.includes(product.id)) next.push(product.id);
        } else {
          next[modalIndex] = product.id;
        }
        return Array.from(new Set(next));
      });
    }
    if (modalPurpose === 'newArrivals') {
      setNewArrivalIds(prev => Array.from(new Set([...prev, product.id])));
    }
    if (modalPurpose === 'specialOffers') {
      setSpecialOffers(prev => {
        const exists = prev.some(o => o.id === product.id);
        if (exists) return prev;
        return [...prev, { id: product.id, originalPrice: product.price, salePrice: product.price, active: true }];
      });
    }
    setShowProductModal(false);
  };

  const removeFeatured = (index) => {
    setFeaturedProductIds(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewArrival = (id) => {
    setNewArrivalIds(prev => prev.filter(pid => pid !== id));
  };

  const removeSpecialOffer = (id) => {
    setSpecialOffers(prev => prev.filter(o => o.id !== id));
  };

  // Handlers de Categorias
  const openCategoryPicker = () => {
    setCategorySearch('');
    setShowCategoryModal(true);
  };

  const handlePickCategory = (category) => {
    setHomepageCategoryIds(prev => Array.from(new Set([...prev, category.id])));
    setShowCategoryModal(false);
  };

  const removeHomepageCategory = (id) => {
    setHomepageCategoryIds(prev => prev.filter(cid => cid !== id));
  };

  // Search filters
  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [productSearch, allProducts]);

  const filteredCategories = useMemo(() => {
    const q = categorySearch.trim().toLowerCase();
    if (!q) return allCategories;
    return allCategories.filter(c => c.name.toLowerCase().includes(q));
  }, [categorySearch, allCategories]);

  // Categorias disponíveis para adicionar no header
  const availableHeaderCategories = useMemo(() => {
    const usedIds = headerCategories.map(c => c.id);
    return allCategories.filter(c => !usedIds.includes(c.id));
  }, [allCategories, headerCategories]);

  // Save (MELHORADO PARA SALVAR TUDO)
  const handleSave = () => {
    const payload = {
      headerSettings,
      headerCategories,
      banners,
      featuredProductIds,
      homepageCategoryIds,
      newArrivalIds,
      specialOffers,
      contact,
      payment
    };
    
    console.log('Salvando dados do CMS:', payload);
    
    // Salvar no contexto
    const success = saveAllData(payload);
    
    // Salvar também no localStorage diretamente para garantir persistência
    try {
      localStorage.setItem('finaEstampaCMS', JSON.stringify(payload));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
    
    if (success) {
      alert('Conteúdo salvo com sucesso! As mudanças já estão visíveis no site.');
    } else {
      alert('Erro ao salvar conteúdo. Tente novamente.');
    }
  };

  // === UI DO HEADER ===
  const renderHeader = () => (
    <div className={styles.sectionCard}>
      {/* Logo Section */}
      <div className={styles.headerSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaImage /> Logo da Loja
          </div>
        </div>

        <div className={styles.logoConfig}>
          <div className={styles.logoTypeSelector}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="logoType"
                value="text"
                checked={headerSettings.logoType === 'text'}
                onChange={(e) => handleLogoChange('logoType', e.target.value)}
              />
              <span className={styles.radioText}>Texto</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="logoType"
                value="image"
                checked={headerSettings.logoType === 'image'}
                onChange={(e) => handleLogoChange('logoType', e.target.value)}
              />
              <span className={styles.radioText}>Upload de Imagem</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="logoType"
                value="url"
                checked={headerSettings.logoType === 'url'}
                onChange={(e) => handleLogoChange('logoType', e.target.value)}
              />
              <span className={styles.radioText}>URL da Imagem</span>
            </label>
          </div>

          <div className={styles.logoConfigContent}>
            {headerSettings.logoType === 'text' && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Texto do Logo</label>
                <input
                  className={styles.input}
                  value={headerSettings.logoText}
                  onChange={(e) => handleLogoChange('logoText', e.target.value)}
                  placeholder="Ex: Fina Estampa"
                />
              </div>
            )}

            {headerSettings.logoType === 'image' && (
              <div className={styles.logoUploadSection}>
                <div className={styles.logoPreview}>
                  {headerSettings.logoImage ? (
                    <img src={headerSettings.logoImage} alt="Logo" />
                  ) : (
                    <div className={styles.logoPlaceholder}>
                      <FaImage />
                      <span>Nenhuma imagem</span>
                    </div>
                  )}
                </div>
                <button
                  className={styles.uploadButton}
                  onClick={() => logoFileRef.current?.click()}
                  type="button"
                >
                  <FaUpload /> Enviar Logo
                </button>
                <input
                  ref={logoFileRef}
                  type="file"
                  accept="image/*"
                  className={styles.hiddenInput}
                  onChange={(e) => handleLogoUpload(e.target.files[0])}
                />
              </div>
            )}

            {headerSettings.logoType === 'url' && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>URL da Imagem</label>
                <input
                  className={styles.input}
                  value={headerSettings.logoUrl}
                  onChange={(e) => handleLogoChange('logoUrl', e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>
            )}

            {(headerSettings.logoType === 'image' || headerSettings.logoType === 'url') && (
              <div className={styles.logoSizeConfig}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Largura (px)</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={headerSettings.logoWidth}
                    onChange={(e) => handleLogoChange('logoWidth', parseInt(e.target.value) || 180)}
                    min="50"
                    max="400"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Altura (px)</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={headerSettings.logoHeight}
                    onChange={(e) => handleLogoChange('logoHeight', parseInt(e.target.value) || 40)}
                    min="20"
                    max="200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview do Logo */}
        <div className={styles.previewCard}>
          <div className={styles.previewTitle}><FaEye /> Pré-visualização</div>
          <div className={styles.logoPreviewContainer}>
            {headerSettings.logoType === 'text' ? (
              <div className={styles.logoTextPreview}>
                <span className={styles.logoMain}>{headerSettings.logoText?.split(' ')[0] || 'Fina'}</span>
                <span className={styles.logoAccent}>{headerSettings.logoText?.split(' ')[1] || 'Estampa'}</span>
              </div>
            ) : (
              <div 
                className={styles.logoImagePreview}
                style={{
                  width: `${headerSettings.logoWidth}px`,
                  height: `${headerSettings.logoHeight}px`
                }}
              >
                {(headerSettings.logoImage || headerSettings.logoUrl) ? (
                  <img 
                    src={headerSettings.logoImage || headerSettings.logoUrl} 
                    alt="Logo Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <div className={styles.logoPlaceholder}>
                    <FaImage />
                    <span>Logo</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Anúncio Superior */}
      <div className={styles.headerSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaBars /> Anúncio Superior
          </div>
        </div>

        <div className={styles.announcementConfig}>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              {headerSettings.showTopAnnouncements ? <FaEye /> : <FaEyeSlash />} Mostrar Anúncio
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={headerSettings.showTopAnnouncements}
                onChange={(e) => handleLogoChange('showTopAnnouncements', e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>

          {headerSettings.showTopAnnouncements && (
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Texto do Anúncio</label>
              <input
                className={styles.input}
                value={headerSettings.topAnnouncement?.text || ''}
                onChange={(e) => {
                  const newSettings = {
                    ...headerSettings,
                    topAnnouncement: { 
                      ...headerSettings.topAnnouncement, 
                      text: e.target.value 
                    }
                  };
                  setHeaderSettings(newSettings);
                  setContextHeaderSettings(newSettings);
                }}
                placeholder="Ex: Frete grátis para pedidos acima de R$ 299,90! 🚚"
              />
            </div>
          )}
        </div>
      </div>

      {/* Categorias do Header */}
      <div className={styles.headerSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaTag /> Categorias do Header
          </div>
          <button className={styles.addButton} onClick={openHeaderCategoryPicker}>
            <FaPlus /> Adicionar Categoria
          </button>
        </div>

        <div className={styles.headerCategoriesList}>
          {headerCategories
            .sort((a, b) => a.order - b.order)
            .map((category, index) => (
              <div key={category.id} className={styles.headerCategoryItem}>
                <div className={styles.categoryDragHandle}>
                  <FaGripVertical />
                </div>
                
                <div className={styles.categoryInfo}>
                  <div className={styles.categoryName}>{category.name}</div>
                  <div className={styles.categorySlug}>/{category.slug}</div>
                </div>

                <div className={styles.categoryActions}>
                  <div className={styles.toggleRow}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={category.active}
                        onChange={() => toggleHeaderCategory(category.id)}
                      />
                      <span className={styles.switchSlider}></span>
                    </label>
                  </div>

                  <button
                    className={styles.moveButton}
                    onClick={() => moveHeaderCategory(category.id, 'up')}
                    disabled={index === 0}
                    title="Mover para cima"
                    type="button"
                  >
                    <FaArrowUp />
                  </button>

                  <button
                    className={styles.moveButton}
                    onClick={() => moveHeaderCategory(category.id, 'down')}
                    disabled={index === headerCategories.length - 1}
                    title="Mover para baixo"
                    type="button"
                  >
                    <FaArrowDown />
                  </button>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeHeaderCategory(category.id)}
                    title="Remover categoria"
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {headerCategories.length === 0 && (
          <div className={styles.emptyState}>
            <FaTag />
            <span>Nenhuma categoria adicionada ao header</span>
            <button className={styles.addButton} onClick={openHeaderCategoryPicker}>
              <FaPlus /> Adicionar Primeira Categoria
            </button>
          </div>
        )}

        {/* Configurações Gerais */}
        <div className={styles.headerGeneralConfig}>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              {headerSettings.showAllCategoriesButton ? <FaEye /> : <FaEyeSlash />} Botão "Todas as Categorias"
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={headerSettings.showAllCategoriesButton}
                onChange={(e) => handleLogoChange('showAllCategoriesButton', e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>
        </div>

        {/* Preview das Categorias */}
        <div className={styles.previewCard}>
          <div className={styles.previewTitle}><FaEye /> Pré-visualização do Header</div>
          <div className={styles.headerPreview}>
            <div className={styles.headerPreviewNav}>
              {headerSettings.showAllCategoriesButton && (
                <button className={styles.allCategoriesPreview}>
                  <FaBars /> Todas as categorias
                </button>
              )}
              {headerCategories
                .filter(c => c.active)
                .sort((a, b) => a.order - b.order)
                .map(category => (
                  <span key={category.id} className={styles.categoryPreviewLink}>
                    {category.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // UI de Banners (ATUALIZADA PARA USAR HANDLERS DO CONTEXTO)
  const renderBanners = () => {
    const ordered = [...banners].sort((a, b) => a.order - b.order);
    return (
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaHome /> Banners da Home
          </div>
          <button className={styles.addButton} onClick={handleAddBanner}>
            <FaPlus /> Adicionar Banner
          </button>
        </div>

        <div className={styles.bannerGrid}>
          {ordered.map((b, index) => (
            <div key={b.id} className={styles.bannerItem}>
              <div className={styles.bannerPreview}>
                {b.image ? (
                  <img src={b.image} alt={b.title || 'Banner'} />
                ) : (
                  <div className={styles.bannerPlaceholder}>
                    <FaImage />
                    <span>Sem imagem</span>
                  </div>
                )}
                <div className={styles.bannerOverlay}>
                  <button
                    className={styles.bannerIconBtn}
                    title="Enviar imagem"
                    onClick={() => bannerFileRefs.current[b.id]?.click()}
                    type="button"
                  >
                    <FaUpload />
                  </button>
                  <input
                    ref={(el) => (bannerFileRefs.current[b.id] = el)}
                    type="file"
                    accept="image/*"
                    className={styles.hiddenInput}
                    onChange={(e) => handleBannerUpload(b.id, e.target.files[0])}
                  />
                  <button
                    className={styles.bannerIconBtn}
                    title="Mover para cima"
                    onClick={() => handleMoveBanner(b.id, 'up')}
                    type="button"
                    disabled={index === 0}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    className={styles.bannerIconBtn}
                    title="Mover para baixo"
                    onClick={() => handleMoveBanner(b.id, 'down')}
                    type="button"
                    disabled={index === ordered.length - 1}
                  >
                    <FaArrowDown />
                  </button>
                  <button
                    className={`${styles.bannerIconBtn} ${styles.danger}`}
                    title="Remover banner"
                    onClick={() => handleRemoveBanner(b.id)}
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className={styles.bannerForm}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}><FaTag /> Título</label>
                  <input
                    className={styles.input}
                    value={b.title}
                    onChange={(e) => handleBannerChange(b.id, 'title', e.target.value)}
                    placeholder="Ex.: Coleção Inverno 2025"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}><FaEdit /> Subtítulo</label>
                  <input
                    className={styles.input}
                    value={b.subtitle}
                    onChange={(e) => handleBannerChange(b.id, 'subtitle', e.target.value)}
                    placeholder="Ex.: Elegância e sofisticação para dias frios"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}><FaLink /> Link</label>
                  <input
                    className={styles.input}
                    value={b.link}
                    onChange={(e) => handleBannerChange(b.id, 'link', e.target.value)}
                    placeholder="Ex.: /catalog?colecao=inverno-2025"
                  />
                </div>
                <div className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>
                    {b.active ? <FaEye /> : <FaEyeSlash />} Visível
                  </span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={b.active}
                      onChange={(e) => handleBannerChange(b.id, 'active', e.target.checked)}
                    />
                    <span className={styles.switchSlider}></span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // UI de Destaques
  const renderFeatured = () => (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <FaStar /> Produtos em Destaque
        </div>
        <button className={styles.addButton} onClick={() => openProductPicker('featured')}>
          <FaPlus /> Adicionar Destaque
        </button>
      </div>

      <div className={styles.productGrid}>
        {featuredProducts.map((p, i) => (
          <div key={`${p.id}-${i}`} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={p.image} alt={p.name} />
              <button
                className={styles.changeProductButton}
                onClick={() => openProductPicker('featured', i)}
                type="button"
                title="Trocar produto"
              >
                <FaExchangeAlt /> Trocar
              </button>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productName} title={p.name}>{p.name}</div>
              <div className={styles.productCategory} title={p.category}>{p.category}</div>
              <div className={styles.productPrice}>{formatPrice(p.price)}</div>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removeFeatured(i)}
              type="button"
              title="Remover dos destaques"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // UI de Categorias
  const renderCategories = () => (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <FaTag /> Categorias na Home
        </div>
        <button className={styles.addButton} onClick={openCategoryPicker}>
          <FaPlus /> Adicionar Categoria
        </button>
      </div>

      <div className={styles.categoryGrid}>
        {homepageCategories.map((c) => (
          <div key={c.id} className={styles.categoryCard}>
            <div className={styles.categoryIcon}><FaShoppingBag /></div>
            <div className={styles.categoryName} title={c.name}>{c.name}</div>
            <button
              className={styles.removeButton}
              onClick={() => removeHomepageCategory(c.id)}
              type="button"
              title="Remover da home"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // UI de Novidades
  const renderNewArrivals = () => (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <FaGift /> Novidades
        </div>
        <button className={styles.addButton} onClick={() => openProductPicker('newArrivals')}>
          <FaPlus /> Adicionar Novidade
        </button>
      </div>

      <div className={styles.list}>
        {newArrivals.map(p => (
          <div key={p.id} className={styles.listItem}>
            <div className={styles.listThumb}>
              <img src={p.image} alt={p.name} />
            </div>
            <div className={styles.listInfo}>
              <div className={styles.listTitle} title={p.name}>{p.name}</div>
              <div className={styles.listMeta}>
                <span>{p.category}</span>
                <span className={styles.dot}>•</span>
                <span className={styles.priceBlack}>{formatPrice(p.price)}</span>
              </div>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removeNewArrival(p.id)}
              type="button"
              title="Remover"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // UI de Ofertas Especiais
  const renderSpecialOffers = () => (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <FaPercent /> Ofertas Especiais
        </div>
        <button className={styles.addButton} onClick={() => openProductPicker('specialOffers')}>
          <FaPlus /> Adicionar Oferta
        </button>
      </div>

      <div className={styles.offerGrid}>
        {specialOffersDetailed.map((o) => (
          <div key={o.id} className={styles.offerCard}>
            <div className={styles.offerTop}>
              <div className={styles.offerThumb}>
                <img src={o.product.image} alt={o.product.name} />
              </div>
              <div className={styles.offerInfo}>
                <div className={styles.offerName} title={o.product.name}>{o.product.name}</div>
                <div className={styles.offerMeta}>
                  <span>{o.product.category}</span>
                </div>
                <div className={styles.offerPrices}>
                  <div className={styles.offerPriceRow}>
                    <span className={styles.priceLabel}>De</span>
                    <input
                      type="number"
                      step="0.01"
                      className={`${styles.priceInput} ${styles.blackText}`}
                      value={o.originalPrice}
                      onChange={(e) =>
                        setSpecialOffers(prev =>
                          prev.map(x => x.id === o.id ? { ...x, originalPrice: parseFloat(e.target.value || 0) } : x)
                        )
                      }
                    />
                  </div>
                  <div className={styles.offerPriceRow}>
                    <span className={styles.priceLabel}>Por</span>
                    <input
                      type="number"
                      step="0.01"
                      className={`${styles.priceInput} ${styles.blackText}`}
                      value={o.salePrice}
                      onChange={(e) =>
                        setSpecialOffers(prev =>
                          prev.map(x => x.id === o.id ? { ...x, salePrice: parseFloat(e.target.value || 0) } : x)
                        )
                      }
                    />
                  </div>
                </div>
                <div className={styles.discountBadge}>
                  {o.discount}% OFF
                </div>
              </div>
            </div>

            <div className={styles.offerBottom}>
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>
                  {o.active ? <FaEye /> : <FaEyeSlash />} Ativo
                </span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={o.active}
                    onChange={(e) =>
                      setSpecialOffers(prev =>
                        prev.map(x => x.id === o.id ? { ...x, active: e.target.checked } : x)
                                              )
                    }
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => removeSpecialOffer(o.id)}
                type="button"
                title="Remover oferta"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // UI de Contato (ATUALIZADA PARA USAR HANDLERS DO CONTEXTO)
  const renderContact = () => (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <FaPhone /> Contato e Endereço
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaPhone /> Telefone</label>
          <input
            className={styles.formInput}
            value={contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="+55 (11) 3333-2222"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaWhatsapp /> WhatsApp</label>
          <input
            className={styles.formInput}
            value={contact.whatsapp}
            onChange={(e) => handleContactChange('whatsapp', e.target.value)}
            placeholder="+55 (11) 99999-9999"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaEnvelope /> E-mail</label>
          <input
            className={styles.formInput}
            value={contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="contato@finaestampa.com.br"
          />
        </div>
        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
          <label className={styles.formLabel}><FaMapMarkerAlt /> Endereço</label>
          <input
            className={styles.formInput}
            value={contact.address}
            onChange={(e) => handleContactChange('address', e.target.value)}
            placeholder="Rua da Moda, 123 - São Paulo/SP"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaClock /> Horário</label>
          <input
            className={styles.formInput}
            value={contact.hours}
            onChange={(e) => handleContactChange('hours', e.target.value)}
            placeholder="Segunda a Sexta, 09:00 - 18:00"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaInstagram /> Instagram</label>
          <input
            className={styles.formInput}
            value={contact.instagram}
            onChange={(e) => handleContactChange('instagram', e.target.value)}
            placeholder="https://instagram.com/finaestampa"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaFacebook /> Facebook</label>
          <input
            className={styles.formInput}
            value={contact.facebook}
            onChange={(e) => handleContactChange('facebook', e.target.value)}
            placeholder="https://facebook.com/finaestampa"
          />
        </div>
      </div>

      <div className={styles.previewCard}>
        <div className={styles.previewTitle}><FaHome /> Pré-visualização</div>
        <div className={styles.contactPreview}>
          <div><FaPhone /> {contact.phone}</div>
          <div><FaWhatsapp /> {contact.whatsapp}</div>
          <div><FaEnvelope /> {contact.email}</div>
          <div><FaMapMarkerAlt /> {contact.address}</div>
          <div><FaClock /> {contact.hours}</div>
          <div><FaInstagram /> {contact.instagram}</div>
          <div><FaFacebook /> {contact.facebook}</div>
        </div>
      </div>
    </div>
  );

  // UI de Pagamento (ATUALIZADA PARA USAR HANDLERS DO CONTEXTO)
  const renderPayment = () => (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <FaCreditCard /> Pagamentos e Frete
        </div>
      </div>

      <div className={styles.paymentGrid}>
        <div className={styles.paymentCard}>
          <div className={styles.paymentHeader}><FaMoneyBillWave /> PIX</div>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>{payment.pixEnabled ? <FaEye /> : <FaEyeSlash />} Habilitar PIX</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={payment.pixEnabled}
                onChange={(e) => handlePaymentChange('pixEnabled', e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Chave PIX</label>
            <input
              className={styles.formInput}
              value={payment.pixKey}
              onChange={(e) => handlePaymentChange('pixKey', e.target.value)}
              placeholder="sua-chave-pix"
            />
          </div>
        </div>

        <div className={styles.paymentCard}>
          <div className={styles.paymentHeader}><FaCreditCard /> Cartão</div>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>{payment.cardEnabled ? <FaEye /> : <FaEyeSlash />} Habilitar Cartão</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={payment.cardEnabled}
                onChange={(e) => handlePaymentChange('cardEnabled', e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>
          <div className={styles.formHint}>Configurações avançadas de gateway podem ser adicionadas no admin.</div>
        </div>

        <div className={styles.paymentCard}>
          <div className={styles.paymentHeader}><FaBarcode /> Boleto</div>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>{payment.boletoEnabled ? <FaEye /> : <FaEyeSlash />} Habilitar Boleto</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={payment.boletoEnabled}
                onChange={(e) => handlePaymentChange('boletoEnabled', e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>
          <div className={styles.formHint}>Integração com bancos/PSPs conforme necessário.</div>
        </div>
      </div>

      <div className={styles.formGroup} style={{ marginTop: 16 }}>
        <label className={styles.formLabel}><FaTruck /> Observação de Frete</label>
        <input
          className={styles.formInput}
          value={payment.shippingNote}
          onChange={(e) => handlePaymentChange('shippingNote', e.target.value)}
          placeholder="Frete grátis para pedidos acima de R$ 299,90"
        />
      </div>

      <div className={styles.previewCard}>
        <div className={styles.previewTitle}><FaHome /> Pré-visualização</div>
        <div className={styles.paymentPreview}>
          {payment.pixEnabled && <span className={styles.payBadge}><FaMoneyBillWave /> PIX</span>}
          {payment.cardEnabled && <span className={styles.payBadge}><FaCreditCard /> Cartão</span>}
          {payment.boletoEnabled && <span className={styles.payBadge}><FaBarcode /> Boleto</span>}
          <div className={styles.shippingNote}><FaTruck /> {payment.shippingNote}</div>
        </div>
      </div>
    </div>
  );

  // Tabs - INCLUINDO A ABA HEADER
  const tabs = [
    { id: 'header', label: 'Header' },
    { id: 'banners', label: 'Banners' },
    { id: 'featured', label: 'Destaques' },
    { id: 'categories', label: 'Categorias' },
    { id: 'new', label: 'Novidades' },
    { id: 'offers', label: 'Ofertas Especiais' },
    { id: 'contact', label: 'Contato' },
    { id: 'payment', label: 'Pagamento' }
  ];

  return (
    <div className={styles.cmsContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <FaGlobe /> Conteúdo do Site
        </div>
        <div className={styles.headerActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <FaSave /> Salvar Conteúdo
          </button>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`${styles.tabButton} ${activeTab === t.id ? styles.active : ''}`}
            onClick={() => setActiveTab(t.id)}
            title={t.label}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.contentSection}>
        {activeTab === 'header' && renderHeader()}
        {activeTab === 'banners' && renderBanners()}
        {activeTab === 'featured' && renderFeatured()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'new' && renderNewArrivals()}
        {activeTab === 'offers' && renderSpecialOffers()}
        {activeTab === 'contact' && renderContact()}
        {activeTab === 'payment' && renderPayment()}
      </div>

      {/* Modal de Produtos */}
      {showProductModal && (
        <div className={styles.modalOverlay} onClick={() => setShowProductModal(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}><FaSearch /> Selecionar Produto</div>
              <button className={styles.modalClose} onClick={() => setShowProductModal(false)}><FaTimes /></button>
            </div>
            <div className={styles.modalSearchRow}>
              <input
                className={styles.searchInput}
                placeholder="Buscar por nome ou categoria..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
            <div className={styles.modalProductsGrid}>
              {filteredProducts.map(p => (
                <button
                  key={p.id}
                  className={styles.modalProductCard}
                  onClick={() => handlePickProduct(p)}
                  type="button"
                >
                  <img src={p.image} alt={p.name} />
                  <div className={styles.modalProductInfo}>
                    <div className={styles.modalProductName} title={p.name}>{p.name}</div>
                    <div className={styles.modalProductMeta}>
                      <span>{p.category}</span>
                      <span className={styles.dot}>•</span>
                      <span className={styles.blackText}>{formatPrice(p.price)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Categorias */}
      {showCategoryModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCategoryModal(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}><FaSearch /> Selecionar Categoria</div>
              <button className={styles.modalClose} onClick={() => setShowCategoryModal(false)}><FaTimes /></button>
            </div>
            <div className={styles.modalSearchRow}>
              <input
                className={styles.searchInput}
                placeholder="Buscar categoria..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
              />
            </div>
            <div className={styles.modalCategoriesGrid}>
              {filteredCategories.map(c => (
                <button
                  key={c.id}
                  className={styles.modalCategoryCard}
                  onClick={() => handlePickCategory(c)}
                  type="button"
                >
                  <div className={styles.modalCategoryIcon}><FaShoppingBag /></div>
                  <div className={styles.modalCategoryName} title={c.name}>{c.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Categorias do Header */}
      {showHeaderCategoryModal && (
        <div className={styles.modalOverlay} onClick={() => setShowHeaderCategoryModal(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}><FaSearch /> Adicionar Categoria ao Header</div>
              <button className={styles.modalClose} onClick={() => setShowHeaderCategoryModal(false)}><FaTimes /></button>
            </div>
            <div className={styles.modalSearchRow}>
              <input
                className={styles.searchInput}
                placeholder="Buscar categoria..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
              />
            </div>
            <div className={styles.modalCategoriesGrid}>
              {availableHeaderCategories
                .filter(c => 
                  categorySearch.trim() === '' || 
                  c.name.toLowerCase().includes(categorySearch.toLowerCase())
                )
                .map(c => (
                  <button
                    key={c.id}
                    className={styles.modalCategoryCard}
                    onClick={() => handlePickHeaderCategory(c)}
                    type="button"
                  >
                    <div className={styles.modalCategoryIcon}><FaShoppingBag /></div>
                    <div className={styles.modalCategoryName} title={c.name}>{c.name}</div>
                  </button>
                ))}
            </div>
            {availableHeaderCategories.length === 0 && (
              <div className={styles.emptyModalState}>
                <FaTag />
                <span>Todas as categorias já foram adicionadas ao header</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSPage;