import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FaBox, FaPlus, FaEdit, FaTrash, FaSearch, FaSave, FaTimes, FaRedo, FaImage, FaDollarSign, FaPalette, FaRuler, FaUpload, FaLink, FaStar, FaFire } from 'react-icons/fa';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const { 
    products, 
    loading, 
    error, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetToDefault
  } = useProducts();
  
  const { categories, addCategory, getActiveCategories } = useCategories();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all'); // 'all', 'new', 'promo'
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [imageUploadMode, setImageUploadMode] = useState('url'); // 'url' ou 'upload'
  const fileInputRefs = useRef({});
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    basePrice: '',
    description: '',
    isNew: false,
    isPromo: false,
    colorVariations: [
      {
        id: Date.now(),
        color: '',
        images: [''],
        mainImage: 0
      }
    ],
    sizeVariations: [
      {
        id: Date.now() + 1,
        size: '',
        price: '',
        stock: 0
      }
    ]
  });

  const activeCategories = getActiveCategories();

  const filterCategories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  }, [products]);

  const availableSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', '34', '36', '38', '40', '42', '44', '46', 'Único'];
  const availableColors = ['Preto', 'Branco', 'Azul', 'Vermelho', 'Rosa', 'Verde', 'Amarelo', 'Roxo', 'Marrom', 'Cinza', 'Bege', 'Vinho', 'Dourado', 'Prateado', 'Navy', 'Coral', 'Turquesa', 'Nude', 'Off-White', 'Mostarda'];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    if (filterType !== 'all') {
      if (filterType === 'new') {
        filtered = filtered.filter(product => product.isNew);
      } else if (filterType === 'promo') {
        filtered = filtered.filter(product => product.isPromo);
      }
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-desc':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, filterCategory, filterType, sortBy]);

  // Estatísticas dos produtos
  const productStats = useMemo(() => {
    const total = products.length;
    const inPromo = products.filter(p => p.isPromo).length;
    const newProductsCount = products.filter(p => p.isNew).length;
    const categoriesCount = new Set(products.map(p => p.category)).size;

    return { total, inPromo, newProducts: newProductsCount, categoriesCount };
  }, [products]);

  // Função para upload de imagem
  const handleImageUpload = async (file, colorId, imageIndex) => {
    if (!file) return;

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

    try {
      // Criar nome único para o arquivo
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const fileName = `product_${timestamp}_${Math.random().toString(36).substr(2, 9)}.${extension}`;
      
      // Simular upload (em produção, você enviaria para um servidor)
      // Por enquanto, vamos usar URL.createObjectURL para preview local
      const imageUrl = URL.createObjectURL(file);
      
      // Em produção, você faria algo como:
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });
      // const { url } = await response.json();
      
      // Por enquanto, vamos simular um caminho local
      const localPath = `/images/products/${fileName}`;
      
      // Atualizar o estado com a nova imagem
      updateImageInColor(colorId, imageIndex, localPath);
      
      // Mostrar mensagem de sucesso
      alert(`✅ Imagem carregada! Caminho: ${localPath}`);
      
      // Limpar o input
      if (fileInputRefs.current[`${colorId}_${imageIndex}`]) {
        fileInputRefs.current[`${colorId}_${imageIndex}`].value = '';
      }
      
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('❌ Erro ao fazer upload da imagem');
    }
  };

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Gerenciar variações de cor
  const addColorVariation = () => {
    setFormData(prev => ({
      ...prev,
      colorVariations: [
        ...prev.colorVariations,
        {
          id: Date.now(),
          color: '',
          images: [''],
          mainImage: 0
        }
      ]
    }));
  };

  const removeColorVariation = (id) => {
    setFormData(prev => ({
      ...prev,
      colorVariations: prev.colorVariations.filter(variation => variation.id !== id)
    }));
  };

  const updateColorVariation = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      colorVariations: prev.colorVariations.map(variation =>
        variation.id === id ? { ...variation, [field]: value } : variation
      )
    }));
  };

  const addImageToColor = (colorId) => {
    setFormData(prev => ({
      ...prev,
      colorVariations: prev.colorVariations.map(variation =>
        variation.id === colorId 
          ? { ...variation, images: [...variation.images, ''] }
          : variation
      )
    }));
  };

  const removeImageFromColor = (colorId, imageIndex) => {
    setFormData(prev => ({
      ...prev,
      colorVariations: prev.colorVariations.map(variation =>
        variation.id === colorId 
          ? { 
              ...variation, 
              images: variation.images.filter((_, index) => index !== imageIndex),
              mainImage: variation.mainImage >= imageIndex && variation.mainImage > 0 
                ? variation.mainImage - 1 
                : variation.mainImage
            }
          : variation
      )
    }));
  };

  const updateImageInColor = (colorId, imageIndex, url) => {
    setFormData(prev => ({
      ...prev,
      colorVariations: prev.colorVariations.map(variation =>
        variation.id === colorId 
          ? { 
              ...variation, 
              images: variation.images.map((img, index) => 
                index === imageIndex ? url : img
              )
            }
          : variation
      )
    }));
  };

  const setMainImage = (colorId, imageIndex) => {
    setFormData(prev => ({
      ...prev,
      colorVariations: prev.colorVariations.map(variation =>
        variation.id === colorId 
          ? { ...variation, mainImage: imageIndex }
          : variation
      )
    }));
  };

  // Gerenciar variações de tamanho
  const addSizeVariation = () => {
    setFormData(prev => ({
      ...prev,
      sizeVariations: [
        ...prev.sizeVariations,
        {
          id: Date.now(),
          size: '',
          price: '',
          stock: 0
        }
      ]
    }));
  };

  const removeSizeVariation = (id) => {
    setFormData(prev => ({
      ...prev,
      sizeVariations: prev.sizeVariations.filter(variation => variation.id !== id)
    }));
  };

  const updateSizeVariation = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      sizeVariations: prev.sizeVariations.map(variation =>
        variation.id === id ? { ...variation, [field]: value } : variation
      )
    }));
  };

  const openModal = (product = null) => {
    console.log('🔥 Abrindo modal:', product);
    
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        basePrice: product.basePrice?.toString() || product.price?.toString() || '',
        description: product.description || '',
        isNew: product.isNew || false,
        isPromo: product.isPromo || false,
        colorVariations: product.colorVariations || [
          {
            id: Date.now(),
            color: product.colors?.[0] || '',
            images: [product.image || ''],
            mainImage: 0
          }
        ],
        sizeVariations: product.sizeVariations || [
          {
            id: Date.now() + 1,
            size: product.sizes?.[0] || '',
            price: product.price?.toString() || '',
            stock: 10
          }
        ]
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        basePrice: '',
        description: '',
        isNew: false,
        isPromo: false,
        colorVariations: [
          {
            id: Date.now(),
            color: '',
            images: [''],
            mainImage: 0
          }
        ],
        sizeVariations: [
          {
            id: Date.now() + 1,
            size: '',
            price: '',
            stock: 0
          }
        ]
      });
    }
    
    setActiveTab('basic');
    setImageUploadMode('url');
    setShowModal(true);
  };

  const closeModal = () => {
    console.log('🔥 Fechando modal');
    setShowModal(false);
    setEditingProduct(null);
    setActiveTab('basic');
    setImageUploadMode('url');
    fileInputRefs.current = {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      alert('❌ Por favor, preencha Nome e Categoria');
      return;
    }

    // Validar variações de cor
    const validColors = formData.colorVariations.filter(cv => 
      cv.color && cv.images.some(img => img.trim())
    );
    
    if (validColors.length === 0) {
      alert('❌ Adicione pelo menos uma cor com imagem');
      return;
    }

    // Validar variações de tamanho
    const validSizes = formData.sizeVariations.filter(sv => 
      sv.size && sv.price && parseFloat(sv.price) > 0
    );
    
    if (validSizes.length === 0) {
      alert('❌ Adicione pelo menos um tamanho com preço');
      return;
    }

    // Calcular preço mínimo e máximo
    const prices = validSizes.map(sv => parseFloat(sv.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Preparar dados do produto
    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      price: minPrice,
      basePrice: parseFloat(formData.basePrice) || minPrice,
      minPrice,
      maxPrice,
      description: formData.description.trim(),
      isNew: formData.isNew,
      isPromo: formData.isPromo,
      
      // Novo formato com variações
      colorVariations: validColors.map(cv => ({
        ...cv,
        images: cv.images.filter(img => img.trim())
      })),
      sizeVariations: validSizes.map(sv => ({
        ...sv,
        price: parseFloat(sv.price),
        stock: parseInt(sv.stock) || 0
      })),
      
      // Campos para compatibilidade
      image: validColors[0]?.images[validColors[0]?.mainImage] || validColors[0]?.images[0] || '',
      colors: validColors.map(cv => cv.color),
      sizes: validSizes.map(sv => sv.size),
      
      // Metadados
      brand: "Fina Estampa",
      material: "Algodão",
      subcategory: "Casual",
      gender: "Feminino",
      rating: editingProduct?.rating || 0,
      reviews: editingProduct?.reviews || 0,
      reviewCount: editingProduct?.reviewCount || 0,
      totalStock: validSizes.reduce((total, sv) => total + parseInt(sv.stock || 0), 0)
    };

    try {
      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
        alert('✅ Produto atualizado com sucesso!');
      } else {
        addProduct(productData);
        alert('✅ Produto adicionado com sucesso!');
      }
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('❌ Erro ao salvar produto. Tente novamente.');
    }
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Excluir "${productName}"?`)) {
      try {
        deleteProduct(productId);
        alert('✅ Produto excluído!');
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('❌ Erro ao excluir produto.');
      }
    }
  };

  // Função para obter preço de exibição do produto
  const getProductDisplayPrice = (product) => {
    if (product.minPrice && product.maxPrice && product.minPrice !== product.maxPrice) {
      return `R\$ ${product.minPrice.toFixed(2).replace('.', ',')} - R\$ ${product.maxPrice.toFixed(2).replace('.', ',')}`;
    }
    return `R\$ ${(product.price || product.minPrice || 0).toFixed(2).replace('.', ',')}`;
  };

  // Função para obter cores disponíveis do produto
  const getProductColors = (product) => {
    if (product.colorVariations && product.colorVariations.length > 0) {
      return product.colorVariations.map(cv => cv.color);
    }
    return product.colors || [];
  };

  // Função para obter tamanhos disponíveis do produto
  const getProductSizes = (product) => {
    if (product.sizeVariations && product.sizeVariations.length > 0) {
      return product.sizeVariations.map(sv => sv.size);
    }
    return product.sizes || [];
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h3>Carregando produtos...</h3>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>❌ Erro: {error}</h3>
        <button onClick={() => window.location.reload()}>Recarregar</button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaBox />
            Gerenciar Produtos ({productStats.total})
          </h2>
          <p className={styles.pageSubtitle}>
            Sistema avançado com variações de cor, tamanho e upload de imagens
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={() => openModal()}
            className={styles.primaryBtn}
          >
            <FaPlus /> Novo Produto
          </button>
          
          <button 
            onClick={resetToDefault}
            className={styles.secondaryBtn}
          >
            <FaRedo /> Restaurar
          </button>
        </div>
      </div>

      {/* Estatísticas Melhoradas */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaBox />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{productStats.total}</div>
            <div className={styles.statLabel}>Total de Produtos</div>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardGold}`}>
          <div className={styles.statIcon}>
            <FaStar />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{productStats.newProducts}</div>
            <div className={styles.statLabel}>Produtos Novos</div>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardRed}`}>
          <div className={styles.statIcon}>
            <FaFire />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{productStats.inPromo}</div>
            <div className={styles.statLabel}>Em Promoção</div>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={styles.statIcon}>
            <FaPalette />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{productStats.categoriesCount}</div>
            <div className={styles.statLabel}>Categorias</div>
          </div>
        </div>
      </div>

      {/* Filtros Melhorados */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersRow}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={styles.filterSelect}
          >
            {filterCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas Categorias' : cat}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Todos os Tipos</option>
            <option value="new">🌟 Produtos Novos</option>
            <option value="promo">🔥 Em Promoção</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="name">Nome (A-Z)</option>
            <option value="price">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="category">Categoria</option>
            <option value="newest">Mais Recentes</option>
          </select>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className={styles.productsSection}>
        {filteredProducts.length > 0 ? (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop";
                    }}
                  />
                  
                  {/* Badges Melhorados */}
                  <div className={styles.productBadges}>
                    {product.isNew && (
                      <span className={styles.badgeNew}>
                        <FaStar /> NOVO
                      </span>
                    )}
                    {product.isPromo && (
                      <span className={styles.badgePromo}>
                        <FaFire /> PROMOÇÃO
                      </span>
                    )}
                  </div>

                  {/* Indicador de variações */}
                  <div className={styles.variationIndicators}>
                    {getProductColors(product).length > 1 && (
                      <span className={styles.variationBadge}>
                        <FaPalette /> {getProductColors(product).length}
                      </span>
                    )}
                    {getProductSizes(product).length > 1 && (
                      <span className={styles.variationBadge}>
                        <FaRuler /> {getProductSizes(product).length}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{product.name}</h4>
                  <p className={styles.productCategory}>{product.category}</p>
                  
                  {product.description && (
                    <p className={styles.productDescription}>
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description
                      }
                    </p>
                  )}

                  {/* Variações de cor */}
                  {getProductColors(product).length > 0 && (
                    <div className={styles.productVariations}>
                      <div className={styles.variationLabel}>Cores disponíveis:</div>
                      <div className={styles.variationTags}>
                        {getProductColors(product).slice(0, 4).map((color, index) => (
                          <span key={index} className={styles.variationTag}>
                            {color}
                          </span>
                        ))}
                        {getProductColors(product).length > 4 && (
                          <span className={styles.variationTagMore}>
                            +{getProductColors(product).length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Variações de tamanho */}
                  {getProductSizes(product).length > 0 && (
                    <div className={styles.productVariations}>
                      <div className={styles.variationLabel}>Tamanhos disponíveis:</div>
                      <div className={styles.variationTags}>
                        {getProductSizes(product).slice(0, 6).map((size, index) => (
                          <span key={index} className={styles.variationTagSize}>
                            {size}
                          </span>
                        ))}
                        {getProductSizes(product).length > 6 && (
                          <span className={styles.variationTagMore}>
                            +{getProductSizes(product).length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Preço */}
                  <div className={styles.productPricing}>
                    <div className={styles.productPrice}>
                      {getProductDisplayPrice(product)}
                    </div>
                    {product.totalStock !== undefined && (
                      <div className={styles.productStock}>
                        Estoque total: {product.totalStock} unidades
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className={styles.productActions}>
                    <button
                      onClick={() => openModal(product)}
                      className={styles.editBtn}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className={styles.deleteBtn}
                    >
                      <FaTrash /> Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaBox className={styles.emptyIcon} />
            <h3>Nenhum produto encontrado</h3>
            <p>
              {searchTerm || filterCategory !== 'all' || filterType !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece adicionando seu primeiro produto'
              }
            </p>
            <button 
              onClick={() => openModal()}
              className={styles.primaryBtn}
            >
              <FaPlus /> Adicionar Primeiro Produto
            </button>
          </div>
        )}
      </div>

      {/* MODAL AVANÇADO COM UPLOAD */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            {/* Header do Modal */}
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingProduct ? '✏️ Editar Produto' : '➕ Novo Produto'}
              </h3>
              <button
                onClick={closeModal}
                className={styles.modalCloseBtn}
              >
                <FaTimes />
              </button>
            </div>

            {/* Abas de Navegação */}
            <div className={styles.modalTabs}>
              {[
                { id: 'basic', label: 'Informações Básicas', icon: FaBox },
                { id: 'colors', label: 'Cores e Imagens', icon: FaPalette },
                { id: 'sizes', label: 'Tamanhos e Preços', icon: FaRuler }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles.modalTab} ${activeTab === tab.id ? styles.modalTabActive : ''}`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Conteúdo das Abas */}
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              {/* ABA: Informações Básicas */}
              {activeTab === 'basic' && (
                <div className={styles.tabContent}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      📝 Nome do Produto *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={styles.formInput}
                      placeholder="Ex: Vestido Florido Verão"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      🏷️ Categoria *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className={styles.formSelect}
                    >
                      <option value="">Selecione uma categoria</option>
                      {activeCategories.map(cat => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      💰 Preço Base (Referência)
                    </label>
                    <input
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={styles.formInput}
                      placeholder="0,00"
                    />
                    <small className={styles.formHint}>
                      O preço final será definido nas variações de tamanho
                    </small>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      📄 Descrição
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className={styles.formTextarea}
                      placeholder="Descreva as características do produto..."
                    />
                  </div>

                  {/* Flags Melhoradas */}
                  <div className={styles.flagsGroup}>
                    <div className={styles.flagCard}>
                      <div className={styles.flagIcon}>
                        <FaStar />
                      </div>
                      <div className={styles.flagContent}>
                        <label className={styles.flagLabel}>
                          <input
                            type="checkbox"
                            name="isNew"
                            checked={formData.isNew}
                            onChange={handleInputChange}
                            className={styles.checkbox}
                          />
                          <span className={styles.flagTitle}>Produto Novo</span>
                        </label>
                        <span className={styles.flagDescription}>
                          Marca o produto como novidade na loja
                        </span>
                      </div>
                    </div>

                    <div className={styles.flagCard}>
                      <div className={styles.flagIcon}>
                        <FaFire />
                      </div>
                      <div className={styles.flagContent}>
                        <label className={styles.flagLabel}>
                          <input
                            type="checkbox"
                            name="isPromo"
                            checked={formData.isPromo}
                            onChange={handleInputChange}
                            className={styles.checkbox}
                          />
                          <span className={styles.flagTitle}>Em Promoção</span>
                        </label>
                        <span className={styles.flagDescription}>
                          Destaca o produto como oferta especial
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA: Cores e Imagens */}
              {activeTab === 'colors' && (
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <h4 className={styles.tabTitle}>
                      🎨 Variações de Cor
                    </h4>
                    <button
                      type="button"
                      onClick={addColorVariation}
                      className={styles.addBtn}
                    >
                      <FaPlus /> Adicionar Cor
                    </button>
                  </div>

                  {formData.colorVariations.map((colorVar, index) => (
                    <div key={colorVar.id} className={styles.variationCard}>
                      <div className={styles.variationHeader}>
                        <h5 className={styles.variationTitle}>
                          Cor {index + 1}
                        </h5>
                        {formData.colorVariations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeColorVariation(colorVar.id)}
                            className={styles.removeBtn}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          Nome da Cor *
                        </label>
                        <select
                          value={colorVar.color}
                          onChange={(e) => updateColorVariation(colorVar.id, 'color', e.target.value)}
                          required
                          className={styles.formSelect}
                        >
                          <option value="">Selecione uma cor</option>
                          {availableColors.map(color => (
                            <option key={color} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          🖼️ Imagens da Cor
                        </label>
                        
                        {/* Modo de Upload */}
                        <div className={styles.uploadModeSelector}>
                          <button
                            type="button"
                            onClick={() => setImageUploadMode('url')}
                            className={`${styles.modeBtn} ${imageUploadMode === 'url' ? styles.modeBtnActive : ''}`}
                          >
                            <FaLink /> URL
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageUploadMode('upload')}
                            className={`${styles.modeBtn} ${imageUploadMode === 'upload' ? styles.modeBtnActive : ''}`}
                          >
                            <FaUpload /> Upload
                          </button>
                        </div>

                        {colorVar.images.map((image, imageIndex) => (
                          <div key={imageIndex} className={styles.imageInputGroup}>
                            {imageUploadMode === 'url' ? (
                              <input
                                type="url"
                                value={image}
                                onChange={(e) => updateImageInColor(colorVar.id, imageIndex, e.target.value)}
                                className={styles.formInput}
                                placeholder="URL da imagem"
                              />
                            ) : (
                              <div className={styles.uploadGroup}>
                                <input
                                  type="file"
                                  ref={el => fileInputRefs.current[`${colorVar.id}_${imageIndex}`] = el}
                                  onChange={(e) => handleImageUpload(e.target.files[0], colorVar.id, imageIndex)}
                                  accept="image/*"
                                  className={styles.fileInput}
                                />
                                <span className={styles.uploadHint}>
                                  {image ? `Atual: ${image}` : 'Selecione uma imagem'}
                                </span>
                              </div>
                            )}
                            
                            <div className={styles.imageActions}>
                              <button
                                type="button"
                                onClick={() => setMainImage(colorVar.id, imageIndex)}
                                className={`${styles.imageBtn} ${colorVar.mainImage === imageIndex ? styles.imageBtnActive : ''}`}
                                title="Definir como imagem principal"
                              >
                                ⭐
                              </button>
                              {colorVar.images.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeImageFromColor(colorVar.id, imageIndex)}
                                  className={styles.imageBtn}
                                  title="Remover imagem"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => addImageToColor(colorVar.id)}
                          className={styles.addImageBtn}
                        >
                          <FaImage /> Adicionar Imagem
                        </button>
                      </div>

                      {/* Preview das imagens */}
                      {colorVar.images.some(img => img.trim()) && (
                        <div className={styles.imagePreview}>
                          <label className={styles.formLabel}>Preview:</label>
                          <div className={styles.imagePreviewGrid}>
                            {colorVar.images.map((image, imageIndex) => (
                              image.trim() && (
                                <div key={imageIndex} className={styles.imagePreviewItem}>
                                  <img
                                    src={image}
                                    alt={`${colorVar.color} - ${imageIndex + 1}`}
                                    className={styles.previewImage}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                  {colorVar.mainImage === imageIndex && (
                                    <div className={styles.mainImageBadge}>Principal</div>
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ABA: Tamanhos e Preços */}
              {activeTab === 'sizes' && (
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <h4 className={styles.tabTitle}>
                      �� Variações de Tamanho
                    </h4>
                    <button
                      type="button"
                      onClick={addSizeVariation}
                      className={styles.addBtn}
                    >
                      <FaPlus /> Adicionar Tamanho
                    </button>
                  </div>

                  {formData.sizeVariations.map((sizeVar, index) => (
                    <div key={sizeVar.id} className={styles.variationCard}>
                      <div className={styles.variationHeader}>
                        <h5 className={styles.variationTitle}>
                          Tamanho {index + 1}
                        </h5>
                        {formData.sizeVariations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSizeVariation(sizeVar.id)}
                            className={styles.removeBtn}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>

                      <div className={styles.sizeVariationGrid}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>
                            Tamanho *
                          </label>
                          <select
                            value={sizeVar.size}
                            onChange={(e) => updateSizeVariation(sizeVar.id, 'size', e.target.value)}
                            required
                            className={styles.formSelect}
                          >
                            <option value="">Selecione</option>
                            {availableSizes.map(size => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>
                            💰 Preço *
                          </label>
                          <input
                            type="number"
                            value={sizeVar.price}
                            onChange={(e) => updateSizeVariation(sizeVar.id, 'price', e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            className={styles.formInput}
                            placeholder="0,00"
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>
                            �� Estoque
                          </label>
                          <input
                            type="number"
                            value={sizeVar.stock}
                            onChange={(e) => updateSizeVariation(sizeVar.id, 'stock', e.target.value)}
                            min="0"
                            className={styles.formInput}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Resumo de preços */}
                  {formData.sizeVariations.some(sv => sv.price) && (
                    <div className={styles.pricesSummary}>
                      <h5 className={styles.summaryTitle}>📊 Resumo de Preços:</h5>
                      <div className={styles.summaryGrid}>
                        {formData.sizeVariations
                          .filter(sv => sv.size && sv.price)
                          .map(sv => (
                            <div key={sv.id} className={styles.summaryItem}>
                              <span className={styles.summarySize}>{sv.size}</span>
                              <span className={styles.summaryPrice}>
                                R\$ {parseFloat(sv.price || 0).toFixed(2).replace('.', ',')}
                              </span>
                              <span className={styles.summaryStock}>
                                {sv.stock || 0} un.
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Botões do Modal */}
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelBtn}
                >
                  ❌ Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                >
                  <FaSave /> {editingProduct ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;