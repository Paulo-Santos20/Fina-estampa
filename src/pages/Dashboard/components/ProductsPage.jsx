import React, { useState, useEffect } from 'react';
import { 
  FaBox, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, 
  FaSearch, FaFilter, FaStar, FaSave, FaTimes, FaImage,
  FaTh, FaList // Novos ícones importados
} from 'react-icons/fa';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { useToast } from '../../../components/ui/Toast';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const { 
    products, loading, addProduct, updateProduct, 
    deleteProduct, toggleProductStatus, toggleProductFeatured 
  } = useProducts();

  const { getActiveCategories } = useCategories();
  const activeCategories = getActiveCategories();
  const { showSuccess, showError } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // Estado para controlar a visualização (grid ou list)
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', originalPrice: '',
    category: '', stock: '', isNew: false, isPromo: false,
    image: '', sizes: [], colors: []
  });

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
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        originalPrice: product.originalPrice || '',
        category: product.category || '',
        stock: product.stock || 0,
        isNew: product.isNew || false,
        isPromo: product.isPromo || false,
        image: product.image || '',
        sizes: product.sizes || [],
        colors: product.colors || []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', description: '', price: '', originalPrice: '', 
        category: '', stock: '', isNew: false, isPromo: false, 
        image: '', sizes: [], colors: []
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
      showError('Preencha os campos obrigatórios.');
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
        const success = await updateProduct(editingProduct.id, productData);
        if (success) { showSuccess('Produto atualizado!'); closeModal(); } 
        else showError('Erro ao atualizar.');
      } else {
        const newProduct = await addProduct(productData);
        if (newProduct) { showSuccess('Produto criado!'); closeModal(); } 
        else showError('Erro ao criar.');
      }
    } catch (error) {
      console.error(error);
      showError('Erro ao salvar produto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Excluir "${name}"?`)) {
      const success = await deleteProduct(id);
      if (success) showSuccess('Produto excluído.');
      else showError('Erro ao excluir.');
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val));

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Gerenciar Produtos</h2>
          <p className={styles.pageSubtitle}>{filteredProducts.length} produtos cadastrados</p>
        </div>
        <button onClick={() => openModal()} className={styles.primaryBtn}>
          <FaPlus /> Novo Produto
        </button>
      </div>

      {/* Barra de Ferramentas (Filtros + View Mode) */}
      <div className={styles.filtersBar}>
        <div className={styles.filtersLeft}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterBox}>
            <FaFilter className={styles.filterIcon} />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Todas as Categorias</option>
              {activeCategories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Botões de Alternância de Visualização */}
        <div className={styles.viewToggle}>
          <button 
            className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.activeView : ''}`}
            onClick={() => setViewMode('grid')}
            title="Visualização em Grade"
          >
            <FaTh />
          </button>
          <button 
            className={`${styles.viewBtn} ${viewMode === 'list' ? styles.activeView : ''}`}
            onClick={() => setViewMode('list')}
            title="Visualização em Lista"
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Conteúdo (Renderização Condicional) */}
      {filteredProducts.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            // --- MODO GRID (CARDS) ---
            <div className={styles.productsGrid}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`${styles.productCard} ${!product.isActive ? styles.inactiveCard : ''}`}>
                  <div className={styles.imageWrapper}>
                    <img 
                      src={product.image || 'https://via.placeholder.com/300x300?text=Sem+Imagem'} 
                      alt={product.name} 
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300x300?text=Erro'}
                    />
                    <div className={styles.badges}>
                      {product.isNew && <span className={styles.badgeNew}>Novo</span>}
                      {product.isPromo && <span className={styles.badgePromo}>Promo</span>}
                      {!product.isActive && <span className={styles.badgeInactive}>Inativo</span>}
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <span className={styles.productCategory}>{product.category}</span>
                    </div>
                    
                    <div className={styles.priceRow}>
                      <span className={styles.price}>{formatCurrency(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className={styles.originalPrice}>{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>

                    <div className={styles.metaRow}>
                      <span>Estoque: <strong>{product.stock}</strong></span>
                      {product.isFeatured && <span className={styles.featuredTag}><FaStar /> Destaque</span>}
                    </div>

                    <div className={styles.actionsRow}>
                      <button onClick={() => toggleProductStatus(product.id)} className={styles.iconBtn} title={product.isActive ? 'Desativar' : 'Ativar'}>
                        {product.isActive ? <FaEye /> : <FaEyeSlash />}
                      </button>
                      <button onClick={() => toggleProductFeatured(product.id)} className={`${styles.iconBtn} ${product.isFeatured ? styles.activeStar : ''}`} title="Destacar">
                        <FaStar />
                      </button>
                      <button onClick={() => openModal(product)} className={styles.iconBtn} title="Editar">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(product.id, product.name)} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Excluir">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // --- MODO LISTA (TABELA) ---
            <div className={styles.tableContainer}>
              <table className={styles.listTable}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Status</th>
                    <th align="right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} className={!product.isActive ? styles.inactiveRow : ''}>
                      <td>
                        <div className={styles.productCell}>
                          <div className={styles.smallImage}>
                            <img 
                              src={product.image || 'https://via.placeholder.com/100'} 
                              alt={product.name} 
                              onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                            />
                          </div>
                          <div className={styles.productCellInfo}>
                            <span className={styles.productNameList}>{product.name}</span>
                            <div className={styles.listBadges}>
                              {product.isNew && <span className={styles.miniBadgeNew}>Novo</span>}
                              {product.isPromo && <span className={styles.miniBadgePromo}>Promo</span>}
                              {product.isFeatured && <span className={styles.miniBadgeStar}><FaStar /></span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <div className={styles.priceCell}>
                          <span className={styles.priceList}>{formatCurrency(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className={styles.originalPriceList}>{formatCurrency(product.originalPrice)}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.stockBadge} ${product.stock < 5 ? styles.lowStock : ''}`}>
                          {product.stock} un.
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${product.isActive ? styles.statusActive : styles.statusInactive}`}>
                          {product.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <div className={styles.listActions}>
                          <button onClick={() => toggleProductStatus(product.id)} className={styles.listActionBtn} title="Alterar Status">
                            {product.isActive ? <FaEye /> : <FaEyeSlash />}
                          </button>
                          <button onClick={() => toggleProductFeatured(product.id)} className={`${styles.listActionBtn} ${product.isFeatured ? styles.activeStar : ''}`} title="Destacar">
                            <FaStar />
                          </button>
                          <button onClick={() => openModal(product)} className={styles.listActionBtn} title="Editar">
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDelete(product.id, product.name)} className={`${styles.listActionBtn} ${styles.deleteBtnList}`} title="Excluir">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className={styles.emptyState}>
          <FaBox />
          <h3>Nenhum produto encontrado</h3>
          <p>Tente ajustar os filtros ou adicione um novo produto.</p>
        </div>
      )}

      {/* Modal permanece igual... */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h3>
              <button onClick={closeModal}><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className={styles.modalBody}>
              <div className={styles.formGrid}>
                {/* Lado Esquerdo */}
                <div className={styles.formColumn}>
                  <div className={styles.formGroup}>
                    <label>Nome do Produto *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Descrição</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>URL da Imagem</label>
                    <div className={styles.imageInput}>
                      <FaImage />
                      <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label>Categoria *</label>
                      <select name="category" value={formData.category} onChange={handleInputChange} required>
                        <option value="">Selecione</option>
                        {activeCategories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Estoque</label>
                      <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                {/* Lado Direito */}
                <div className={styles.formColumn}>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label>Preço (R$) *</label>
                      <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Preço Original</label>
                      <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} step="0.01" />
                    </div>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleInputChange} />
                      <span>Marcar como <strong>Novo</strong></span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input type="checkbox" name="isPromo" checked={formData.isPromo} onChange={handleInputChange} />
                      <span>Marcar como <strong>Promoção</strong></span>
                    </label>
                  </div>
                  <div className={styles.imagePreview}>
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display='none'} />
                    ) : (
                      <div className={styles.placeholderPreview}>Sem imagem</div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn} disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : <><FaSave /> Salvar Produto</>}
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