import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CMSPage.module.css';
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
  FaBarcode
} from 'react-icons/fa';

// Dados simulados (fallback) — em produção, substitua por hooks/serviços reais
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
  { id: 'c1', name: 'Vestidos' },
  { id: 'c2', name: 'Blusas & Camisas' },
  { id: 'c3', name: 'Calças & Shorts' },
  { id: 'c4', name: 'Saias & Macacões' },
  { id: 'c5', name: 'Acessórios' },
  { id: 'c6', name: 'Coleções Especiais' },
  { id: 'c7', name: 'Trabalho' },
  { id: 'c8', name: 'Festa' }
];

const formatPrice = (n) =>
  typeof n === 'number'
    ? `R$ ${n.toFixed(2).replace('.', ',')}`
    : 'R$ 0,00';

const CMSPage = () => {
  // Abas
  const [activeTab, setActiveTab] = useState('banners');

  // Dados base (em produção: buscar via API/contexts)
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // Banners
  const [banners, setBanners] = useState([
    {
      id: 'b1',
      title: 'Coleção Inverno 2025',
      subtitle: 'Elegância e sofisticação para dias frios',
      link: '/catalog?colecao=inverno-2025',
      image: 'https://picsum.photos/seed/banner1/1200/450',
      active: true,
      order: 1
    },
    {
      id: 'b2',
      title: 'Vestidos Festa',
      subtitle: 'Brilhe com glamour em qualquer ocasião',
      link: '/catalog?categoria=vestidos-festa',
      image: 'https://picsum.photos/seed/banner2/1200/450',
      active: true,
      order: 2
    },
    {
      id: 'b3',
      title: 'Acessórios Exclusivos',
      subtitle: 'Detalhes que transformam seu look',
      link: '/catalog?categoria=acessorios',
      image: 'https://picsum.photos/seed/banner3/1200/450',
      active: false,
      order: 3
    }
  ]);

  // Destaques (produtos em destaque)
  const [featuredProductIds, setFeaturedProductIds] = useState(['p2', 'p1', 'p3', 'p4']);

  // Categorias iniciais
  const [homepageCategoryIds, setHomepageCategoryIds] = useState(['c1', 'c2', 'c5', 'c8']);

  // Novidades (lista de produtos)
  const [newArrivalIds, setNewArrivalIds] = useState(['p10', 'p6', 'p5']);

  // Ofertas especiais
  const [specialOffers, setSpecialOffers] = useState([
    { id: 'p2', originalPrice: 219.90, salePrice: 189.90, active: true },
    { id: 'p7', originalPrice: 169.90, salePrice: 149.90, active: true }
  ]);

  // Contato
  const [contact, setContact] = useState({
    phone: '+55 (11) 3333-2222',
    whatsapp: '+55 (11) 99999-9999',
    email: 'contato@finaestampa.com.br',
    address: 'Rua da Moda, 123 - São Paulo/SP',
    hours: 'Segunda a Sexta, 09:00 - 18:00',
    instagram: 'https://instagram.com/finaestampa',
    facebook: 'https://facebook.com/finaestampa'
  });

  // Pagamento
  const [payment, setPayment] = useState({
    pixEnabled: true,
    pixKey: 'finaestampa@pix.com.br',
    cardEnabled: true,
    boletoEnabled: true,
    shippingNote: 'Frete grátis para pedidos acima de R$ 299,90'
  });

  // Modais gerais
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [modalPurpose, setModalPurpose] = useState(null); // 'featured' | 'newArrivals' | 'specialOffers'
  const [modalIndex, setModalIndex] = useState(null); // índice do item a trocar
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  // Upload refs
  const bannerFileRefs = useRef({});

  // Carrega dados simulados na montagem
  useEffect(() => {
    setAllProducts(SAMPLE_PRODUCTS);
    setAllCategories(SAMPLE_CATEGORIES);
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

  // Handlers de Banners
  const handleAddBanner = () => {
    const nextOrder = (banners[banners.length - 1]?.order || 0) + 1;
    setBanners(prev => ([
      ...prev,
      {
        id: `b${Date.now()}`,
        title: 'Novo Banner',
        subtitle: '',
        link: '',
        image: '',
        active: true,
        order: nextOrder
      }
    ]));
  };

  const handleRemoveBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const handleMoveBanner = (id, dir) => {
    setBanners(prev => {
      const ordered = [...prev].sort((a, b) => a.order - b.order);
      const idx = ordered.findIndex(b => b.id === id);
      if (idx < 0) return prev;
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= ordered.length) return prev;
      const tmp = ordered[idx].order;
      ordered[idx].order = ordered[swapIdx].order;
      ordered[swapIdx].order = tmp;
      return ordered;
    });
  };

  const handleBannerChange = (id, field, value) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleBannerUpload = (id, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBanners(prev => prev.map(b => b.id === id ? { ...b, image: url } : b));
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
          // adicionar no final se não há index
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

  // Save (mock)
  const handleSave = () => {
    const payload = {
      banners,
      featuredProductIds,
      homepageCategoryIds,
      newArrivalIds,
      specialOffers,
      contact,
      payment
    };
    console.log('CMS salvo:', payload);
    alert('Conteúdo salvo com sucesso!');
  };

  // UI de Banners
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
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            placeholder="+55 (11) 3333-2222"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaWhatsapp /> WhatsApp</label>
          <input
            className={styles.formInput}
            value={contact.whatsapp}
            onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
            placeholder="+55 (11) 99999-9999"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaEnvelope /> E-mail</label>
          <input
            className={styles.formInput}
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            placeholder="contato@finaestampa.com.br"
          />
        </div>
        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
          <label className={styles.formLabel}><FaMapMarkerAlt /> Endereço</label>
          <input
            className={styles.formInput}
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            placeholder="Rua da Moda, 123 - São Paulo/SP"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaClock /> Horário</label>
          <input
            className={styles.formInput}
            value={contact.hours}
            onChange={(e) => setContact({ ...contact, hours: e.target.value })}
            placeholder="Segunda a Sexta, 09:00 - 18:00"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaInstagram /> Instagram</label>
          <input
            className={styles.formInput}
            value={contact.instagram}
            onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
            placeholder="https://instagram.com/finaestampa"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaFacebook /> Facebook</label>
          <input
            className={styles.formInput}
            value={contact.facebook}
            onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
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
                onChange={(e) => setPayment({ ...payment, pixEnabled: e.target.checked })}
              />
              <span className={styles.switchSlider}></span>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Chave PIX</label>
            <input
              className={styles.formInput}
              value={payment.pixKey}
              onChange={(e) => setPayment({ ...payment, pixKey: e.target.value })}
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
                onChange={(e) => setPayment({ ...payment, cardEnabled: e.target.checked })}
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
                onChange={(e) => setPayment({ ...payment, boletoEnabled: e.target.checked })}
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
          onChange={(e) => setPayment({ ...payment, shippingNote: e.target.value })}
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

  // Tabs
  const tabs = [
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
    </div>
  );
};

export default CMSPage;