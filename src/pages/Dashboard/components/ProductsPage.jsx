import React, { useState, useEffect } from 'react';
import { 
  FaBox, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaEyeSlash,
  FaSearch,
  FaFilter,
  FaStar,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { useToast } from '../../../components/ui/Toast';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const { 
    products, 
    loading, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    searchProducts,
    toggleProductStatus,
    toggleProductFeatured
  } = useProducts();

  const { getActiveCategories } = useCategories();
  const activeCategories = getActiveCategories();

  // Toast hooks
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    isNew: false,
    isPromo: false,
    image: '',
    sizes: [],
    colors: []
  });

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Forçar re-render para atualizar classes CSS dos checkboxes
    if (type === 'checkbox') {
      setTimeout(() => {
        const labels = document.querySelectorAll(`.${styles.optionLabel}`);
        labels.forEach(label => {
          const checkbox = label.querySelector('input[type="checkbox"]');
          if (checkbox) {
            if (checkbox.checked) {
              label.classList.add(styles.checked);
            } else {
              label.classList.remove(styles.checked);
            }
          }
        });
      }, 0);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        category: product.category,
        stock: product.stock?.toString() || '0',
        isNew: product.isNew || false,
        isPromo: product.isPromo || false,
        image: product.image || '',
        sizes: product.sizes || [],
        colors: product.colors || []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        stock: '',
        isNew: false,
        isPromo: false,
        image: '',
        sizes: [],
        colors: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price) {
      showError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock) || 0
      };

      if (editingProduct) {
        const success = updateProduct(editingProduct.id, productData);
        if (success) {
          showSuccess('Produto atualizado com sucesso!');
          closeModal();
        } else {
          showError('Erro ao atualizar produto');
        }
      } else {
        const newProduct = addProduct(productData);
        if (newProduct) {
          showSuccess('Produto adicionado com sucesso!');
          closeModal();
        } else {
          showError('Erro ao adicionar produto');
        }
      }
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      showError('Erro ao salvar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${productName}"?`)) {
      const success = deleteProduct(productId);
      if (success) {
        showSuccess('Produto excluído com sucesso!');
      } else {
        showError('Erro ao excluir produto');
      }
    }
  };

  const handleToggleStatus = (productId) => {
    const success = toggleProductStatus(productId);
    if (success) {
      const product = products.find(p => p.id === productId);
      const newStatus = !product.isActive;
      showSuccess(`Produto ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
    } else {
      showError('Erro ao alterar status do produto');
    }
  };

  const handleToggleFeatured = (productId) => {
    const success = toggleProductFeatured(productId);
    if (success) {
      const product = products.find(p => p.id === productId);
      const newStatus = !product.isFeatured;
      showSuccess(`Produto ${newStatus ? 'adicionado aos' : 'removido dos'} destaques!`);
    } else {
      showError('Erro ao alterar destaque do produto');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Atualizar classes dos checkboxes quando o modal abrir
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        const labels = document.querySelectorAll(`.${styles.optionLabel}`);
        labels.forEach(label => {
          const checkbox = label.querySelector('input[type="checkbox"]');
          if (checkbox) {
            if (checkbox.checked) {
              label.classList.add(styles.checked);
            } else {
              label.classList.remove(styles.checked);
            }
          }
        });
      }, 100);
    }
  }, [showModal, formData.isNew, formData.isPromo]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <FaBox className={styles.loadingIcon} />
          <h3>Carregando produtos...</h3>
        </div>
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
            Gerenciar Produtos ({filteredProducts.length})
          </h2>
          <p className={styles.pageSubtitle}>
            Adicione, edite e organize os produtos da sua loja
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={() => openModal()}
            className={styles.primaryBtn}
          >
            <FaPlus /> Novo Produto
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar produtos por nome ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterContainer}>
          <FaFilter className={styles.filterIcon} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todas as categorias</option>
            {activeCategories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className={styles.productsSection}>
        {filteredProducts.length > 0 ? (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIyMCIgdmlld0JveD0iMCAwIDMyMCAyMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjIwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjNzIyRjM3Ij7wn5GXPC90ZXh0Pgo8L3N2Zz4=';
                    }}
                  />
                  
                  <div className={styles.productBadges}>
                    {product.isNew && (
                      <span className={styles.newBadge}>Novo</span>
                    )}
                    {product.isPromo && (
                      <span className={styles.saleBadge}>Promoção</span>
                    )}
                    {product.isFeatured && (
                      <span className={styles.featuredBadge}>Destaque</span>
                    )}
                    {!product.isActive && (
                      <span className={styles.inactiveBadge}>Inativo</span>
                    )}
                  </div>
                </div>
                
                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{product.name}</h4>
                  <p className={styles.productCategory}>{product.category}</p>
                  
                  <div className={styles.productPricing}>
                    <span className={styles.productPrice}>
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className={styles.originalPrice}>
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <div className={styles.productMeta}>
                    <span className={styles.productStock}>
                      Estoque: {product.stock || 0}
                    </span>
                    <div className={styles.productRating}>
                      <FaStar style={{ color: '#F59E0B' }} />
                      <span>{product.rating || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`${styles.productActions} ${styles.fourButtons}`}>
                  <button
                    onClick={() => handleToggleStatus(product.id)}
                    className={`${styles.actionBtn} ${product.isActive ? styles.activeBtn : styles.inactiveBtn}`}
                    title={product.isActive ? 'Desativar produto' : 'Ativar produto'}
                  >
                    {product.isActive ? <FaEye /> : <FaEyeSlash />}
                    {product.isActive ? 'Ativo' : 'Inativo'}
                  </button>
                  
                  <button
                    onClick={() => handleToggleFeatured(product.id)}
                    className={`${styles.actionBtn} ${product.isFeatured ? styles.featuredBtn : styles.notFeaturedBtn}`}
                    title={product.isFeatured ? 'Remover dos destaques' : 'Adicionar aos destaques'}
                  >
                    <FaStar />
                    {product.isFeatured ? 'Destaque' : 'Destacar'}
                  </button>
                  
                  <button
                    onClick={() => openModal(product)}
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    title="Editar produto"
                  >
                    <FaEdit />
                    Editar
                  </button>
                  
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    title="Excluir produto"
                  >
                    <FaTrash />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaBox className={styles.emptyIcon} />
            <h3>Nenhum produto encontrado</h3>
            <p>
              {searchQuery || selectedCategory 
                ? 'Tente ajustar os filtros de busca' 
                : 'Comece adicionando seu primeiro produto'
              }
            </p>
            {!searchQuery && !selectedCategory && (
              <button 
                onClick={() => openModal()}
                className={styles.primaryBtn}
                style={{ marginTop: 'var(--spacing-lg)' }}
              >
                <FaPlus /> Adicionar Produto
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal de Produto */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingProduct ? '✏️ Editar Produto' : '➕ Novo Produto'}
              </h3>
              <button
                onClick={closeModal}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGrid}>
                {/* Informações Básicas */}
                <div className={styles.formSection}>
                  <h4 className={styles.sectionTitle}>
                    📝 Informações Básicas
                  </h4>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nome do Produto *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="Ex: Vestido Longo Festa Rosa"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Descrição</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows="3"
                      className={styles.formTextarea}
                      placeholder="Descreva as características do produto..."
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Categoria *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={styles.formSelect}
                      >
                        <option value="">Selecione uma categoria</option>
                        {activeCategories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Estoque</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Preços */}
                <div className={styles.formSection}>
                  <h4 className={styles.sectionTitle}>
                    💰 Preços
                  </h4>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Preço Atual (R$) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        required
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="0,00"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Preço Original (R$)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        disabled={isSubmitting}
                        className={styles.formInput}
                        placeholder="0,00"
                      />
                      <small className={styles.formHint}>
                        Deixe vazio se não houver preço original
                      </small>
                    </div>
                  </div>
                </div>

                {/* Imagem */}
                <div className={styles.formSection}>
                  <h4 className={styles.sectionTitle}>
                    🖼️ Imagem
                  </h4>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>URL da Imagem</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                    <small className={styles.formHint}>
                      Cole a URL de uma imagem online
                    </small>
                  </div>
                </div>

                {/* Opções */}
                <div className={styles.formSection}>
                  <h4 className={styles.sectionTitle}>
                    ⚙️ Opções do Produto
                  </h4>
                  
                  <div className={styles.formOptions}>
                    <label 
                      className={`${styles.optionLabel} ${styles.newProduct} ${formData.isNew ? styles.checked : ''}`}
                    >
                      <div className={styles.customCheckbox}>
                        <input
                          type="checkbox"
                          name="isNew"
                          checked={formData.isNew}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className={styles.checkbox}
                        />
                        <div className={styles.checkboxVisual}></div>
                      </div>
                      
                      <div className={styles.optionContent}>
                        <div className={styles.optionTitle}>
                          <span className={styles.optionIcon}>🆕</span>
                          Produto Novo
                        </div>
                        <div className={styles.optionDescription}>
                          Marque esta opção para destacar o produto como novidade na loja
                        </div>
                      </div>
                      
                      <div className={styles.optionIndicator}></div>
                    </label>

                    <label 
                      className={`${styles.optionLabel} ${styles.promoProduct} ${formData.isPromo ? styles.checked : ''}`}
                    >
                      <div className={styles.customCheckbox}>
                        <input
                          type="checkbox"
                          name="isPromo"
                          checked={formData.isPromo}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className={styles.checkbox}
                        />
                        <div className={styles.checkboxVisual}></div>
                      </div>
                      
                      <div className={styles.optionContent}>
                        <div className={styles.optionTitle}>
                          <span className={styles.optionIcon}>🏷️</span>
                          Em Promoção
                        </div>
                        <div className={styles.optionDescription}>
                          Marque para indicar que o produto está em oferta especial
                        </div>
                      </div>
                      
                      <div className={styles.optionIndicator}></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className={styles.cancelBtn}
                >
                  ❌ Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  <FaSave /> {isSubmitting ? 'Salvando...' : (editingProduct ? 'Atualizar' : 'Salvar')}
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