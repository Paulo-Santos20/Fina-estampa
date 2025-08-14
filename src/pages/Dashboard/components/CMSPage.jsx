import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CMSPage.module.css';
import { useCMS } from '../../../contexts/CMSContext.jsx';
import { useToast } from '../../../contexts/ToastContext.jsx';
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
  // Hooks
  const { showToast } = useToast();

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
    heroSlides: contextHeroSlides,
    setHeroSlides: setContextHeroSlides,
    carouselSettings: contextCarouselSettings,
    setCarouselSettings: setContextCarouselSettings,
    newProductsSettings: contextNewProductsSettings,
    setNewProductsSettings: setContextNewProductsSettings,
    categoriesShowcase: contextCategoriesShowcase,
    setCategoriesShowcase: setContextCategoriesShowcase,
    contact: contextContact,
    setContact: setContextContact,
    payment: contextPayment,
    setPayment: setContextPayment,
    saveAllData
  } = useCMS();

  // Estados locais que sincronizam com o contexto
  const [headerSettings, setHeaderSettings] = useState(contextHeaderSettings);
  const [headerCategories, setHeaderCategories] = useState(contextHeaderCategories);
  const [heroSlides, setHeroSlides] = useState(contextHeroSlides);
  const [carouselSettings, setCarouselSettings] = useState(contextCarouselSettings);
  const [newProductsSettings, setNewProductsSettings] = useState(contextNewProductsSettings);
  const [categoriesShowcase, setCategoriesShowcase] = useState(contextCategoriesShowcase);
  const [contact, setContact] = useState(contextContact);
  const [payment, setPayment] = useState(contextPayment);

  // Estados que ainda não estão no contexto (podem ser adicionados depois)
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
  const heroFileRefs = useRef({});
  const categoryFileRefs = useRef({});
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
    setHeroSlides(contextHeroSlides);
  }, [contextHeroSlides]);

  useEffect(() => {
    setCarouselSettings(contextCarouselSettings);
  }, [contextCarouselSettings]);

  useEffect(() => {
    setNewProductsSettings(contextNewProductsSettings);
  }, [contextNewProductsSettings]);

  useEffect(() => {
    setCategoriesShowcase(contextCategoriesShowcase);
  }, [contextCategoriesShowcase]);

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

  // === HANDLERS PARA HEADER ===

  // Logo handlers
  const handleLogoUpload = async (file) => {
    if (!file) return;
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        const newSettings = { 
          ...headerSettings, 
          logoType: 'image',
          logoImage: base64Image 
        };
        setHeaderSettings(newSettings);
        setContextHeaderSettings(newSettings);
        showToast('Logo atualizado com sucesso!', 'success');
      };
      reader.onerror = () => {
        showToast('Erro ao fazer upload do logo', 'error');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro no upload:', error);
      showToast('Erro ao fazer upload do logo', 'error');
    }
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
    showToast('Categoria adicionada ao header!', 'success');
  };

  const removeHeaderCategory = (id) => {
    const newCategories = headerCategories.filter(c => c.id !== id);
    setHeaderCategories(newCategories);
    setContextHeaderCategories(newCategories);
    showToast('Categoria removida do header!', 'success');
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

  // === HANDLERS PARA HERO ===
  const handleAddHeroSlide = () => {
    const nextOrder = (heroSlides[heroSlides.length - 1]?.order || 0) + 1;
    const newSlides = [
      ...heroSlides,
      {
        id: Date.now(),
        title: "Novo Slide",
        subtitle: "Subtítulo",
        description: "Descrição do slide",
        ctaText: "Ver Mais",
        ctaLink: "/catalog",
        backgroundImage: "",
        badge: "Novo",
        offer: "",
        active: true,
        order: nextOrder
      }
    ];
    setHeroSlides(newSlides);
    setContextHeroSlides(newSlides);
    showToast('Novo slide adicionado!', 'success');
  };

  const handleRemoveHeroSlide = (id) => {
    if (window.confirm('Tem certeza que deseja remover este slide?')) {
      const newSlides = heroSlides.filter(s => s.id !== id);
      
      // Reorganizar as ordens para evitar gaps
      const reorderedSlides = newSlides.map((slide, index) => ({
        ...slide,
        order: index + 1
      }));
      
      setHeroSlides(reorderedSlides);
      setContextHeroSlides(reorderedSlides);
      showToast('Slide removido com sucesso!', 'success');
    }
  };

  const handleMoveHeroSlide = (id, dir) => {
    const ordered = [...heroSlides].sort((a, b) => a.order - b.order);
    const idx = ordered.findIndex(s => s.id === id);
    
    if (idx < 0) return;
    
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= ordered.length) return;
    
    // Trocar as posições
    const temp = ordered[idx];
    ordered[idx] = ordered[swapIdx];
    ordered[swapIdx] = temp;
    
    // Reorganizar as ordens
    const reorderedSlides = ordered.map((slide, index) => ({
      ...slide,
      order: index + 1
    }));
    
    setHeroSlides(reorderedSlides);
    setContextHeroSlides(reorderedSlides);
  };

  const handleHeroSlideChange = (id, field, value) => {
    const newSlides = heroSlides.map(s => s.id === id ? { ...s, [field]: value } : s);
    setHeroSlides(newSlides);
    setContextHeroSlides(newSlides);
  };

  const handleHeroImageUpload = async (id, file) => {
    if (!file) return;
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        const newSlides = heroSlides.map(s => s.id === id ? { ...s, backgroundImage: base64Image } : s);
        setHeroSlides(newSlides);
        setContextHeroSlides(newSlides);
        showToast('Imagem do slide atualizada!', 'success');
      };
      reader.onerror = () => {
        showToast('Erro ao fazer upload da imagem', 'error');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro no upload:', error);
      showToast('Erro ao fazer upload da imagem', 'error');
    }
  };

  // === HANDLERS PARA CAROUSEL ===
  const handleCarouselSettingChange = (field, value) => {
    const newSettings = { ...carouselSettings, [field]: value };
    setCarouselSettings(newSettings);
    setContextCarouselSettings(newSettings);
  };

  const handleAddProductToCarousel = (productId) => {
    if (!carouselSettings.productIds.includes(productId)) {
      const newProductIds = [...carouselSettings.productIds, productId];
      handleCarouselSettingChange('productIds', newProductIds);
      showToast('Produto adicionado ao carousel!', 'success');
    }
  };

  const handleRemoveProductFromCarousel = (productId) => {
    const newProductIds = carouselSettings.productIds.filter(id => id !== productId);
    handleCarouselSettingChange('productIds', newProductIds);
    showToast('Produto removido do carousel!', 'success');
  };

  const handleMoveProductInCarousel = (productId, direction) => {
    const currentIndex = carouselSettings.productIds.indexOf(productId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= carouselSettings.productIds.length) return;
    
    const newProductIds = [...carouselSettings.productIds];
    [newProductIds[currentIndex], newProductIds[newIndex]] = [newProductIds[newIndex], newProductIds[currentIndex]];
    
    handleCarouselSettingChange('productIds', newProductIds);
  };

  // === HANDLERS PARA NOVOS PRODUTOS ===
  const handleNewProductsSettingChange = (field, value) => {
    const newSettings = { ...newProductsSettings, [field]: value };
    setNewProductsSettings(newSettings);
    setContextNewProductsSettings(newSettings);
  };

  const handleAddProductToNewProducts = (productId) => {
    if (!newProductsSettings.productIds.includes(productId)) {
      const newProductIds = [...newProductsSettings.productIds, productId];
      handleNewProductsSettingChange('productIds', newProductIds);
      showToast('Produto adicionado aos novos produtos!', 'success');
    }
  };

  const handleRemoveProductFromNewProducts = (productId) => {
    const newProductIds = newProductsSettings.productIds.filter(id => id !== productId);
    handleNewProductsSettingChange('productIds', newProductIds);
    showToast('Produto removido dos novos produtos!', 'success');
  };

  const handleMoveProductInNewProducts = (productId, direction) => {
    const currentIndex = newProductsSettings.productIds.indexOf(productId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= newProductsSettings.productIds.length) return;
    
    const newProductIds = [...newProductsSettings.productIds];
    [newProductIds[currentIndex], newProductIds[newIndex]] = [newProductIds[newIndex], newProductIds[currentIndex]];
    
    handleNewProductsSettingChange('productIds', newProductIds);
  };

  // === HANDLERS PARA CATEGORIAS SHOWCASE ===
  const handleAddCategoryShowcase = () => {
    const nextOrder = (categoriesShowcase[categoriesShowcase.length - 1]?.order || 0) + 1;
    const newCategories = [
      ...categoriesShowcase,
      {
        id: `cs${Date.now()}`,
        name: 'Nova Categoria',
        slug: 'nova-categoria',
        description: 'Descrição da categoria',
        image: '',
        active: true,
        order: nextOrder,
        showInHome: true
      }
    ];
    setCategoriesShowcase(newCategories);
    setContextCategoriesShowcase(newCategories);
    showToast('Nova categoria adicionada!', 'success');
  };

  const handleRemoveCategoryShowcase = (id) => {
    if (window.confirm('Tem certeza que deseja remover esta categoria?')) {
      const newCategories = categoriesShowcase.filter(c => c.id !== id);
      setCategoriesShowcase(newCategories);
      setContextCategoriesShowcase(newCategories);
      showToast('Categoria removida com sucesso!', 'success');
    }
  };

  const handleMoveCategoryShowcase = (id, dir) => {
    const ordered = [...categoriesShowcase].sort((a, b) => a.order - b.order);
    const idx = ordered.findIndex(c => c.id === id);
    if (idx < 0) return;
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= ordered.length) return;
    const tmp = ordered[idx].order;
    ordered[idx].order = ordered[swapIdx].order;
    ordered[swapIdx].order = tmp;
    setCategoriesShowcase(ordered);
    setContextCategoriesShowcase(ordered);
  };

  const handleCategoryShowcaseChange = (id, field, value) => {
    const newCategories = categoriesShowcase.map(c => c.id === id ? { ...c, [field]: value } : c);
    setCategoriesShowcase(newCategories);
    setContextCategoriesShowcase(newCategories);
    
    // Mostrar notificação para mudanças importantes
    if (field === 'name') {
      showToast('Nome da categoria atualizado', 'info', 2000);
    } else if (field === 'active') {
      showToast(`Categoria ${value ? 'ativada' : 'desativada'}`, 'info', 2000);
    } else if (field === 'showInHome') {
      showToast(`Categoria ${value ? 'adicionada à' : 'removida da'} home`, 'info', 2000);
    }
  };

  const handleCategoryImageUpload = async (id, file) => {
    if (!file) return;
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        const newCategories = categoriesShowcase.map(c => 
          c.id === id ? { ...c, image: base64Image } : c
        );
        setCategoriesShowcase(newCategories);
        setContextCategoriesShowcase(newCategories);
        showToast('Imagem da categoria atualizada com sucesso!', 'success');
      };
      reader.onerror = () => {
        showToast('Erro ao fazer upload da imagem', 'error');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro no upload:', error);
      showToast('Erro ao fazer upload da imagem', 'error');
    }
  };

  // Handlers de Contato
  const handleContactChange = (field, value) => {
    const newContact = { ...contact, [field]: value };
    setContact(newContact);
    setContextContact(newContact);
  };

  // Handlers de Pagamento
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
    if (modalPurpose === 'newArrivals') {
      setNewArrivalIds(prev => Array.from(new Set([...prev, product.id])));
      showToast('Produto adicionado às novidades!', 'success');
    }
    if (modalPurpose === 'specialOffers') {
      setSpecialOffers(prev => {
        const exists = prev.some(o => o.id === product.id);
        if (exists) return prev;
        showToast('Produto adicionado às ofertas!', 'success');
        return [...prev, { id: product.id, originalPrice: product.price, salePrice: product.price, active: true }];
      });
    }
    if (modalPurpose === 'carousel') {
      handleAddProductToCarousel(product.id);
    }
    if (modalPurpose === 'newProducts') {
      handleAddProductToNewProducts(product.id);
    }
    setShowProductModal(false);
  };

  const removeNewArrival = (id) => {
    setNewArrivalIds(prev => prev.filter(pid => pid !== id));
    showToast('Produto removido das novidades!', 'success');
  };

  const removeSpecialOffer = (id) => {
    setSpecialOffers(prev => prev.filter(o => o.id !== id));
    showToast('Oferta removida!', 'success');
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

  // Categorias disponíveis para adicionar no header
  const availableHeaderCategories = useMemo(() => {
    const usedIds = headerCategories.map(c => c.id);
    return allCategories.filter(c => !usedIds.includes(c.id));
  }, [allCategories, headerCategories]);

  // Save (MELHORADO PARA SALVAR TUDO)
  const handleSave = () => {
    try {
      const payload = {
        headerSettings,
        headerCategories,
        heroSlides,
        carouselSettings,
        newProductsSettings,
        categoriesShowcase,
        newArrivalIds,
        specialOffers,
        contact,
        payment
      };
      
      console.log('Salvando dados do CMS:', payload);
      
      // Salvar no contexto
      const success = saveAllData(payload);
      
      // Salvar também no localStorage diretamente para garantir persistência
      localStorage.setItem('finaEstampaCMS', JSON.stringify(payload));
      
      if (success) {
        showToast('✅ Configurações salvas com sucesso! As mudanças já estão visíveis no site.', 'success', 4000);
      } else {
        showToast('❌ Erro ao salvar configurações. Tente novamente.', 'error');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      showToast('❌ Erro ao salvar configurações. Tente novamente.', 'error');
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

  // === UI DO HERO ===
  const renderHero = () => {
    const ordered = [...heroSlides].sort((a, b) => a.order - b.order);
    return (
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaHome /> Slides do Hero ({heroSlides.length})
          </div>
          <button className={styles.addButton} onClick={handleAddHeroSlide}>
            <FaPlus /> Adicionar Slide
          </button>
        </div>

        {heroSlides.length > 0 ? (
          <div className={styles.heroGrid}>
            {ordered.map((slide, index) => (
              <div key={slide.id} className={styles.heroSlideItem}>
                <div className={styles.heroSlidePreview}>
                  {slide.backgroundImage ? (
                    <img src={slide.backgroundImage} alt={slide.title || 'Hero Slide'} />
                  ) : (
                    <div className={styles.heroPlaceholder}>
                      <FaImage />
                      <span>Sem imagem</span>
                    </div>
                  )}
                  <div className={styles.heroOverlay}>
                    <button
                      className={styles.heroIconBtn}
                      title="Enviar imagem"
                      onClick={() => heroFileRefs.current[slide.id]?.click()}
                      type="button"
                    >
                      <FaUpload />
                    </button>
                    <input
                      ref={(el) => (heroFileRefs.current[slide.id] = el)}
                      type="file"
                      accept="image/*"
                      className={styles.hiddenInput}
                      onChange={(e) => handleHeroImageUpload(slide.id, e.target.files[0])}
                    />
                    <button
                      className={styles.heroIconBtn}
                      title="Mover para cima"
                      onClick={() => handleMoveHeroSlide(slide.id, 'up')}
                      type="button"
                      disabled={index === 0}
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      className={styles.heroIconBtn}
                      title="Mover para baixo"
                      onClick={() => handleMoveHeroSlide(slide.id, 'down')}
                      type="button"
                      disabled={index === ordered.length - 1}
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      className={`${styles.heroIconBtn} ${styles.danger}`}
                      title="Remover slide"
                      onClick={() => handleRemoveHeroSlide(slide.id)}
                      type="button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className={styles.heroSlideForm}>
                  <div className={styles.heroFormRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><FaTag /> Título</label>
                      <input
                        className={styles.input}
                        value={slide.title}
                        onChange={(e) => handleHeroSlideChange(slide.id, 'title', e.target.value)}
                        placeholder="Ex.: Nova Coleção"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><FaEdit /> Subtítulo</label>
                      <input
                        className={styles.input}
                        value={slide.subtitle}
                        onChange={(e) => handleHeroSlideChange(slide.id, 'subtitle', e.target.value)}
                        placeholder="Ex.: Primavera/Verão 2024"
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                                       <label className={styles.inputLabel}><FaEdit /> Descrição</label>
                    <textarea
                      className={styles.textarea}
                      value={slide.description}
                      onChange={(e) => handleHeroSlideChange(slide.id, 'description', e.target.value)}
                      placeholder="Descrição do slide..."
                      rows="3"
                    />
                  </div>

                  <div className={styles.heroFormRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><FaTag /> Badge</label>
                      <input
                        className={styles.input}
                        value={slide.badge}
                        onChange={(e) => handleHeroSlideChange(slide.id, 'badge', e.target.value)}
                        placeholder="Ex.: Novo"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><FaPercent /> Oferta</label>
                      <input
                        className={styles.input}
                        value={slide.offer}
                        onChange={(e) => handleHeroSlideChange(slide.id, 'offer', e.target.value)}
                        placeholder="Ex.: Até 30% OFF"
                      />
                    </div>
                  </div>

                  <div className={styles.heroFormRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><FaLink /> Texto do Botão</label>
                      <input
                        className={styles.input}
                        value={slide.ctaText}
                        onChange={(e) => handleHeroSlideChange(slide.id, 'ctaText', e.target.value)}
                        placeholder="Ex.: Explorar Coleção"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><FaLink /> Link do Botão</label>
                      <input
                        className={styles.input}
                        value={slide.ctaLink}
                        onChange={(e) => handleHeroSlideChange(slide.id, 'ctaLink', e.target.value)}
                        placeholder="Ex.: /categoria/novidades"
                      />
                    </div>
                  </div>

                  <div className={styles.toggleRow}>
                    <span className={styles.toggleLabel}>
                      {slide.active ? <FaEye /> : <FaEyeSlash />} Visível
                    </span>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={slide.active}
                        onChange={(e) => handleHeroSlideChange(slide.id, 'active', e.target.checked)}
                      />
                      <span className={styles.switchSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaImage />
            <span>Nenhum slide adicionado ao hero</span>
            <button className={styles.addButton} onClick={handleAddHeroSlide}>
              <FaPlus /> Adicionar Primeiro Slide
            </button>
          </div>
        )}
      </div>
    );
  };

  // === UI DO CAROUSEL ===
  const renderCarousel = () => {
    const carouselProducts = carouselSettings.productIds
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean);

    return (
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaStar /> Carousel de Produtos
          </div>
          <button className={styles.addButton} onClick={() => openProductPicker('carousel')}>
            <FaPlus /> Adicionar Produto
          </button>
        </div>

        {/* Configurações Gerais */}
        <div className={styles.carouselConfig}>
          <div className={styles.configRow}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}><FaTag /> Título</label>
              <input
                className={styles.input}
                value={carouselSettings.title}
                onChange={(e) => handleCarouselSettingChange('title', e.target.value)}
                placeholder="Ex: Produtos em Destaque"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}><FaEdit /> Subtítulo</label>
              <input
                className={styles.input}
                value={carouselSettings.subtitle}
                onChange={(e) => handleCarouselSettingChange('subtitle', e.target.value)}
                placeholder="Ex: Descubra as peças mais desejadas"
              />
            </div>
          </div>

          <div className={styles.configRow}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {carouselSettings.autoPlay ? <FaEye /> : <FaEyeSlash />} Auto-play
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={carouselSettings.autoPlay}
                  onChange={(e) => handleCarouselSettingChange('autoPlay', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>

            {carouselSettings.autoPlay && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}><FaClock /> Intervalo (ms)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={carouselSettings.autoPlayInterval}
                  onChange={(e) => handleCarouselSettingChange('autoPlayInterval', parseInt(e.target.value) || 4000)}
                  min="1000"
                  max="10000"
                  step="500"
                />
              </div>
            )}
          </div>

          <div className={styles.configRow}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {carouselSettings.showArrows ? <FaEye /> : <FaEyeSlash />} Setas de Navegação
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={carouselSettings.showArrows}
                  onChange={(e) => handleCarouselSettingChange('showArrows', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>

            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {carouselSettings.showIndicators ? <FaEye /> : <FaEyeSlash />} Indicadores
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={carouselSettings.showIndicators}
                  onChange={(e) => handleCarouselSettingChange('showIndicators', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>
          </div>

          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              {carouselSettings.active ? <FaEye /> : <FaEyeSlash />} Carousel Ativo
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={carouselSettings.active}
                onChange={(e) => handleCarouselSettingChange('active', e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className={styles.carouselProductsList}>
          <h3 className={styles.subsectionTitle}>
            Produtos no Carousel ({carouselProducts.length})
          </h3>

          {carouselProducts.length > 0 ? (
            <div className={styles.carouselProductsGrid}>
              {carouselProducts.map((product, index) => (
                <div key={product.id} className={styles.carouselProductItem}>
                  <div className={styles.carouselProductImage}>
                    <img src={product.image} alt={product.name} />
                    <div className={styles.carouselProductOrder}>#{index + 1}</div>
                  </div>

                  <div className={styles.carouselProductInfo}>
                    <div className={styles.carouselProductName} title={product.name}>
                      {product.name}
                    </div>
                    <div className={styles.carouselProductMeta}>
                      <span>{product.category}</span>
                      <span className={styles.dot}>•</span>
                      <span className={styles.priceBlack}>{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  <div className={styles.carouselProductActions}>
                    <button
                      className={styles.moveButton}
                      onClick={() => handleMoveProductInCarousel(product.id, 'up')}
                      disabled={index === 0}
                      title="Mover para cima"
                      type="button"
                    >
                      <FaArrowUp />
                    </button>

                    <button
                      className={styles.moveButton}
                      onClick={() => handleMoveProductInCarousel(product.id, 'down')}
                      disabled={index === carouselProducts.length - 1}
                      title="Mover para baixo"
                      type="button"
                    >
                      <FaArrowDown />
                    </button>

                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveProductFromCarousel(product.id)}
                      title="Remover do carousel"
                      type="button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <FaStar />
              <span>Nenhum produto adicionado ao carousel</span>
              <button className={styles.addButton} onClick={() => openProductPicker('carousel')}>
                <FaPlus /> Adicionar Primeiro Produto
              </button>
            </div>
          )}
        </div>

        {/* Preview do Carousel */}
        <div className={styles.previewCard}>
          <div className={styles.previewTitle}><FaEye /> Pré-visualização</div>
          <div className={styles.carouselPreview}>
            <div className={styles.carouselPreviewHeader}>
              <h3>{carouselSettings.title}</h3>
              {carouselSettings.subtitle && <p>{carouselSettings.subtitle}</p>}
            </div>
            <div className={styles.carouselPreviewProducts}>
              {carouselProducts.slice(0, 4).map(product => (
                <div key={product.id} className={styles.carouselPreviewProduct}>
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </div>
              ))}
              {carouselProducts.length > 4 && (
                <div className={styles.carouselPreviewMore}>
                  +{carouselProducts.length - 4} mais
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // === UI DOS NOVOS PRODUTOS ===
  const renderNewProducts = () => {
    const newProductsProducts = newProductsSettings.productIds
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean);

    return (
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaGift /> Novos Produtos
          </div>
          <button className={styles.addButton} onClick={() => openProductPicker('newProducts')}>
            <FaPlus /> Adicionar Produto
          </button>
        </div>

        {/* Configurações Gerais */}
        <div className={styles.carouselConfig}>
          <div className={styles.configRow}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}><FaTag /> Título</label>
              <input
                className={styles.input}
                value={newProductsSettings.title}
                onChange={(e) => handleNewProductsSettingChange('title', e.target.value)}
                placeholder="Ex: Novos Produtos"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}><FaEdit /> Subtítulo</label>
              <input
                className={styles.input}
                value={newProductsSettings.subtitle}
                onChange={(e) => handleNewProductsSettingChange('subtitle', e.target.value)}
                placeholder="Ex: Confira as últimas novidades"
              />
            </div>
          </div>

          <div className={styles.configRow}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {newProductsSettings.autoPlay ? <FaEye /> : <FaEyeSlash />} Auto-play
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={newProductsSettings.autoPlay}
                  onChange={(e) => handleNewProductsSettingChange('autoPlay', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>

            {newProductsSettings.autoPlay && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}><FaClock /> Intervalo (ms)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={newProductsSettings.autoPlayInterval}
                  onChange={(e) => handleNewProductsSettingChange('autoPlayInterval', parseInt(e.target.value) || 5000)}
                  min="1000"
                  max="10000"
                  step="500"
                />
              </div>
            )}
          </div>

          <div className={styles.configRow}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {newProductsSettings.showArrows ? <FaEye /> : <FaEyeSlash />} Setas de Navegação
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={newProductsSettings.showArrows}
                  onChange={(e) => handleNewProductsSettingChange('showArrows', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>

            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {newProductsSettings.showIndicators ? <FaEye /> : <FaEyeSlash />} Indicadores
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={newProductsSettings.showIndicators}
                  onChange={(e) => handleNewProductsSettingChange('showIndicators', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>
          </div>

          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              {newProductsSettings.active ? <FaEye /> : <FaEyeSlash />} Seção Ativa
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={newProductsSettings.active}
                onChange={(e) => handleNewProductsSettingChange('active', e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className={styles.carouselProductsList}>
          <h3 className={styles.subsectionTitle}>
            Novos Produtos ({newProductsProducts.length})
          </h3>

          {newProductsProducts.length > 0 ? (
            <div className={styles.carouselProductsGrid}>
              {newProductsProducts.map((product, index) => (
                <div key={product.id} className={styles.carouselProductItem}>
                  <div className={styles.carouselProductImage}>
                    <img src={product.image} alt={product.name} />
                    <div className={styles.carouselProductOrder}>#{index + 1}</div>
                  </div>

                  <div className={styles.carouselProductInfo}>
                    <div className={styles.carouselProductName} title={product.name}>
                      {product.name}
                    </div>
                    <div className={styles.carouselProductMeta}>
                      <span>{product.category}</span>
                      <span className={styles.dot}>•</span>
                      <span className={styles.priceBlack}>{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  <div className={styles.carouselProductActions}>
                    <button
                      className={styles.moveButton}
                      onClick={() => handleMoveProductInNewProducts(product.id, 'up')}
                      disabled={index === 0}
                      title="Mover para cima"
                      type="button"
                    >
                      <FaArrowUp />
                    </button>

                    <button
                      className={styles.moveButton}
                      onClick={() => handleMoveProductInNewProducts(product.id, 'down')}
                      disabled={index === newProductsProducts.length - 1}
                      title="Mover para baixo"
                      type="button"
                    >
                      <FaArrowDown />
                    </button>

                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveProductFromNewProducts(product.id)}
                      title="Remover dos novos produtos"
                      type="button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <FaGift />
              <span>Nenhum produto adicionado aos novos produtos</span>
              <button className={styles.addButton} onClick={() => openProductPicker('newProducts')}>
                <FaPlus /> Adicionar Primeiro Produto
              </button>
            </div>
          )}
        </div>

        {/* Preview dos Novos Produtos */}
        <div className={styles.previewCard}>
          <div className={styles.previewTitle}><FaEye /> Pré-visualização</div>
          <div className={styles.carouselPreview}>
            <div className={styles.carouselPreviewHeader}>
              <h3>{newProductsSettings.title}</h3>
              {newProductsSettings.subtitle && <p>{newProductsSettings.subtitle}</p>}
            </div>
            <div className={styles.carouselPreviewProducts}>
              {newProductsProducts.slice(0, 4).map(product => (
                <div key={product.id} className={styles.carouselPreviewProduct}>
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </div>
              ))}
              {newProductsProducts.length > 4 && (
                <div className={styles.carouselPreviewMore}>
                  +{newProductsProducts.length - 4} mais
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // === UI DAS CATEGORIAS SHOWCASE ===
  const renderCategoriesShowcase = () => {
    const ordered = [...categoriesShowcase].sort((a, b) => a.order - b.order);
    return (
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <FaTag /> Categorias em Destaque
          </div>
          <button className={styles.addButton} onClick={handleAddCategoryShowcase}>
            <FaPlus /> Adicionar Categoria
          </button>
        </div>

        <div className={styles.categoriesGrid}>
          {ordered.map((category, index) => (
            <div key={category.id} className={styles.categoryShowcaseItem}>
              <div className={styles.categoryShowcasePreview}>
                {category.image ? (
                  <img src={category.image} alt={category.name || 'Categoria'} />
                ) : (
                  <div className={styles.categoryPlaceholder}>
                    <FaTag />
                    <span>Sem imagem</span>
                  </div>
                )}
                <div className={styles.categoryOverlay}>
                  <button
                    className={styles.categoryIconBtn}
                    title="Enviar imagem"
                    onClick={() => categoryFileRefs.current[category.id]?.click()}
                    type="button"
                  >
                    <FaUpload />
                  </button>
                  <input
                    ref={(el) => (categoryFileRefs.current[category.id] = el)}
                    type="file"
                    accept="image/*"
                    className={styles.hiddenInput}
                    onChange={(e) => handleCategoryImageUpload(category.id, e.target.files[0])}
                  />
                  <button
                    className={styles.categoryIconBtn}
                    title="Mover para cima"
                    onClick={() => handleMoveCategoryShowcase(category.id, 'up')}
                    type="button"
                    disabled={index === 0}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    className={styles.categoryIconBtn}
                    title="Mover para baixo"
                    onClick={() => handleMoveCategoryShowcase(category.id, 'down')}
                    type="button"
                    disabled={index === ordered.length - 1}
                  >
                    <FaArrowDown />
                  </button>
                  <button
                    className={`${styles.categoryIconBtn} ${styles.danger}`}
                    title="Remover categoria"
                    onClick={() => handleRemoveCategoryShowcase(category.id)}
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className={styles.categoryShowcaseForm}>
                <div className={styles.categoryFormRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}><FaTag /> Nome</label>
                    <input
                      className={styles.input}
                      value={category.name}
                      onChange={(e) => handleCategoryShowcaseChange(category.id, 'name', e.target.value)}
                      placeholder="Ex.: Vestidos"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}><FaLink /> Slug</label>
                    <input
                      className={styles.input}
                      value={category.slug}
                      onChange={(e) => handleCategoryShowcaseChange(category.id, 'slug', e.target.value)}
                      placeholder="Ex.: vestidos"
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}><FaEdit /> Descrição</label>
                  <textarea
                    className={styles.textarea}
                    value={category.description}
                    onChange={(e) => handleCategoryShowcaseChange(category.id, 'description', e.target.value)}
                    placeholder="Descrição da categoria..."
                    rows="2"
                  />
                </div>

                <div className={styles.categoryFormRow}>
                  <div className={styles.toggleRow}>
                    <span className={styles.toggleLabel}>
                      {category.active ? <FaEye /> : <FaEyeSlash />} Ativa
                    </span>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={category.active}
                        onChange={(e) => handleCategoryShowcaseChange(category.id, 'active', e.target.checked)}
                      />
                      <span className={styles.switchSlider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleRow}>
                    <span className={styles.toggleLabel}>
                      {category.showInHome ? <FaEye /> : <FaEyeSlash />} Mostrar na Home
                    </span>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={category.showInHome}
                        onChange={(e) => handleCategoryShowcaseChange(category.id, 'showInHome', e.target.checked)}
                      />
                      <span className={styles.switchSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categoriesShowcase.length === 0 && (
          <div className={styles.emptyState}>
            <FaTag />
            <span>Nenhuma categoria adicionada</span>
            <button className={styles.addButton} onClick={handleAddCategoryShowcase}>
              <FaPlus /> Adicionar Primeira Categoria
            </button>
          </div>
        )}

        {/* Preview das Categorias */}
        <div className={styles.previewCard}>
          <div className={styles.previewTitle}><FaEye /> Pré-visualização</div>
          <div className={styles.categoriesPreview}>
            {categoriesShowcase
              .filter(c => c.active && c.showInHome)
              .sort((a, b) => a.order - b.order)
              .slice(0, 4)
              .map(category => (
                <div key={category.id} className={styles.categoryPreviewCard}>
                  <div className={styles.categoryPreviewImage}>
                    {category.image ? (
                      <img src={category.image} alt={category.name} />
                    ) : (
                      <div className={styles.categoryPreviewPlaceholder}>
                        <FaTag />
                      </div>
                    )}
                  </div>
                  <div className={styles.categoryPreviewInfo}>
                    <h4>{category.name}</h4>
                    <p>{category.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

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

  // UI de Contato
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

  // UI de Pagamento
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

  // Tabs - COM NOVOS PRODUTOS
  const tabs = [
    { id: 'header', label: 'Header' },
    { id: 'hero', label: 'Hero' },
    { id: 'carousel', label: 'Carousel' },
    { id: 'newProducts', label: 'Novos Produtos' },
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
        {activeTab === 'hero' && renderHero()}
        {activeTab === 'carousel' && renderCarousel()}
        {activeTab === 'newProducts' && renderNewProducts()}
        {activeTab === 'categories' && renderCategoriesShowcase()}
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