import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { FaFilter, FaSearch, FaTh, FaBars, FaSort } from 'react-icons/fa';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { useAttributes } from '../../hooks/useAttributes';
import styles from './Catalog.module.css';

const Catalog = () => {
  const { category } = useParams(); // Para /catalog/vestidos
  const [searchParams, setSearchParams] = useSearchParams(); // Para ?category=vestidos
  const navigate = useNavigate();
  
  // Obter categoria da URL (prioridade: params > query > 'todos')
  const currentCategory = category || searchParams.get('category') || 'todos';
  
  const { products, loading: productsLoading, getProductsByCategory } = useProducts();
  const { colors, sizes, loading: attributesLoading } = useAttributes();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: currentCategory,
    search: searchParams.get('search') || '',
    priceRange: [0, 1000],
    selectedColors: [],
    selectedSizes: [],
    sortBy: 'name'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Categorias baseadas nos produtos reais
  const categories = [
    { 
      slug: 'todos', 
      name: 'Todos os Produtos', 
      count: products.length 
    },
    { 
      slug: 'vestidos', 
      name: 'Vestidos', 
      count: products.filter(p => p.category === 'vestidos').length 
    },
    { 
      slug: 'blusas', 
      name: 'Blusas & Camisas', 
      count: products.filter(p => p.category === 'blusas').length 
    },
    { 
      slug: 'calcas', 
      name: 'Calças & Shorts', 
      count: products.filter(p => p.category === 'calcas').length 
    },
    { 
      slug: 'saias', 
      name: 'Saias & Macacões', 
      count: products.filter(p => p.category === 'saias').length 
    },
    { 
      slug: 'acessorios', 
      name: 'Acessórios', 
      count: products.filter(p => p.category === 'acessorios').length 
    }
  ];

  // Atualizar filtros quando a URL mudar
  useEffect(() => {
    const newCategory = category || searchParams.get('category') || 'todos';
    const newSearch = searchParams.get('search') || '';
    
    setFilters(prev => ({
      ...prev,
      category: newCategory,
      search: newSearch
    }));
  }, [category, searchParams]);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...products];

    // Filtro por categoria
    if (filters.category && filters.category !== 'todos') {
      filtered = filtered.filter(product => 
        product.category === filters.category
      );
    }

    // Filtro por busca
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.subcategory?.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro por faixa de preço
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Filtro por cores (comparar com hex codes)
    if (filters.selectedColors.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.colors || product.colors.length === 0) return false;
        
        return product.colors.some(productColor => {
          // Verificar se a cor do produto está na lista de cores selecionadas
          const selectedColor = colors.find(c => c.id === filters.selectedColors.find(sc => sc === c.id));
          return selectedColor && productColor === selectedColor.hexCode;
        });
      });
    }

    // Filtro por tamanhos
    if (filters.selectedSizes.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.sizes || product.sizes.length === 0) return false;
        
        return product.sizes.some(productSize => {
          // Verificar se o tamanho do produto está na lista de tamanhos selecionados
          const selectedSize = sizes.find(s => s.id === filters.selectedSizes.find(ss => ss === s.id));
          return selectedSize && (
            productSize === selectedSize.abbreviation || 
            productSize.toLowerCase() === selectedSize.abbreviation.toLowerCase()
          );
        });
      });
    }

    // Filtro por produtos em estoque
    filtered = filtered.filter(product => product.inStock !== false);

    // Ordenação
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01');
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'discount':
          const aDiscount = a.discount || (a.originalPrice ? Math.round(((a.originalPrice - a.price) / a.originalPrice) * 100) : 0);
          const bDiscount = b.discount || (b.originalPrice ? Math.round(((b.originalPrice - b.price) / b.originalPrice) * 100) : 0);
          return bDiscount - aDiscount;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters, colors, sizes]);

  const handleCategoryChange = (categorySlug) => {
    if (categorySlug === 'todos') {
      navigate('/catalog');
    } else {
      navigate(`/catalog?category=${categorySlug}`);
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setFilters(prev => ({ ...prev, search: searchValue }));
    
    // Atualizar URL
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchValue) {
      newSearchParams.set('search', searchValue);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  const handleColorFilter = (colorId) => {
    setFilters(prev => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(colorId)
        ? prev.selectedColors.filter(id => id !== colorId)
        : [...prev.selectedColors, colorId]
    }));
  };

  const handleSizeFilter = (sizeId) => {
    setFilters(prev => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(sizeId)
        ? prev.selectedSizes.filter(id => id !== sizeId)
        : [...prev.selectedSizes, sizeId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: currentCategory,
      search: '',
      priceRange: [0, 1000],
      selectedColors: [],
      selectedSizes: [],
      sortBy: 'name'
    });
    
    // Limpar URL
    const newSearchParams = new URLSearchParams();
    if (currentCategory !== 'todos') {
      newSearchParams.set('category', currentCategory);
    }
    setSearchParams(newSearchParams);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getCurrentCategoryName = () => {
    const cat = categories.find(c => c.slug === currentCategory);
    return cat ? cat.name : 'Produtos';
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.selectedColors.length > 0) count += filters.selectedColors.length;
    if (filters.selectedSizes.length > 0) count += filters.selectedSizes.length;
    if (filters.priceRange[1] < 1000) count++;
    return count;
  };

  if (productsLoading || attributesLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className={styles.catalogContainer}>
      {/* Header do Catálogo */}
      <div className={styles.catalogHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.catalogTitle}>
            {getCurrentCategoryName()}
          </h1>
          <p className={styles.catalogSubtitle}>
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            {getActiveFiltersCount() > 0 && (
              <span className={styles.filtersActive}>
                {' '}• {getActiveFiltersCount()} filtro{getActiveFiltersCount() !== 1 ? 's' : ''} ativo{getActiveFiltersCount() !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={filters.search}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.viewControls}>
            <button
              onClick={() => setViewMode('grid')}
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              title="Visualização em grade"
            >
              <FaTh />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
              title="Visualização em lista"
            >
              <FaBars />
            </button>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${styles.filterToggle} ${getActiveFiltersCount() > 0 ? styles.hasActiveFilters : ''}`}
          >
            <FaFilter /> 
            Filtros
            {getActiveFiltersCount() > 0 && (
              <span className={styles.filterCount}>{getActiveFiltersCount()}</span>
            )}
          </button>
        </div>
      </div>

      <div className={styles.catalogContent}>
        {/* Sidebar de Filtros */}
        <aside className={`${styles.filterSidebar} ${showFilters ? styles.show : ''}`}>
          <div className={styles.filterHeader}>
            <h3>Filtros</h3>
            {getActiveFiltersCount() > 0 && (
              <button onClick={clearFilters} className={styles.clearFilters}>
                Limpar Filtros ({getActiveFiltersCount()})
              </button>
            )}
          </div>

          {/* Categorias */}
          <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Categorias</h4>
            <div className={styles.categoryList}>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`${styles.categoryItem} ${currentCategory === cat.slug ? styles.active : ''}`}
                  disabled={cat.count === 0}
                >
                  <span>{cat.name}</span>
                  <span className={styles.categoryCount}>({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Faixa de Preço */}
          <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Faixa de Preço</h4>
            <div className={styles.priceRange}>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: [0, parseInt(e.target.value)]
                }))}
                className={styles.priceSlider}
              />
              <div className={styles.priceLabels}>
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(filters.priceRange[1])}</span>
              </div>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [0, Math.min(1000, Math.max(0, parseInt(e.target.value) || 0))]
                  }))}
                  className={styles.priceInput}
                  placeholder="Máximo"
                />
              </div>
            </div>
          </div>

          {/* Cores */}
          {colors.length > 0 && (
            <div className={styles.filterSection}>
              <h4 className={styles.filterTitle}>
                Cores
                {filters.selectedColors.length > 0 && (
                  <span className={styles.filterCount}>({filters.selectedColors.length})</span>
                )}
              </h4>
              <div className={styles.colorFilters}>
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => handleColorFilter(color.id)}
                    className={`${styles.colorFilter} ${filters.selectedColors.includes(color.id) ? styles.selected : ''}`}
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                  >
                    {filters.selectedColors.includes(color.id) && (
                      <span className={styles.colorCheck}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tamanhos */}
          {sizes.length > 0 && (
            <div className={styles.filterSection}>
              <h4 className={styles.filterTitle}>
                Tamanhos
                {filters.selectedSizes.length > 0 && (
                  <span className={styles.filterCount}>({filters.selectedSizes.length})</span>
                )}
              </h4>
              <div className={styles.sizeFilters}>
                {sizes.sort((a, b) => a.order - b.order).map(size => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeFilter(size.id)}
                    className={`${styles.sizeFilter} ${filters.selectedSizes.includes(size.id) ? styles.selected : ''}`}
                    title={size.name}
                  >
                    {size.abbreviation}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtros Rápidos */}
          <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Filtros Rápidos</h4>
            <div className={styles.quickFilters}>
              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'featured' }))}
                className={`${styles.quickFilter} ${filters.sortBy === 'featured' ? styles.active : ''}`}
              >
                ⭐ Em Destaque
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'discount' }))}
                className={`${styles.quickFilter} ${filters.sortBy === 'discount' ? styles.active : ''}`}
              >
                🏷️ Com Desconto
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'newest' }))}
                className={`${styles.quickFilter} ${filters.sortBy === 'newest' ? styles.active : ''}`}
              >
                🆕 Novidades
              </button>
            </div>
          </div>
        </aside>

        {/* Lista de Produtos */}
        <main className={styles.productsMain}>
          {/* Barra de Ordenação */}
          <div className={styles.sortBar}>
            <div className={styles.sortGroup}>
              <FaSort className={styles.sortIcon} />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className={styles.sortSelect}
              >
                <option value="name">Nome (A-Z)</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="newest">Mais Recentes</option>
                <option value="featured">Em Destaque</option>
                <option value="discount">Maior Desconto</option>
              </select>
            </div>

            <div className={styles.resultsInfo}>
              Mostrando {filteredProducts.length} de {products.length} produtos
            </div>
          </div>

          {/* Grid de Produtos */}
          {filteredProducts.length > 0 ? (
            <div className={`${styles.productsGrid} ${styles[viewMode]}`}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>Nenhum produto encontrado</h3>
              <p>
                {filters.search 
                  ? `Não encontramos produtos para "${filters.search}"`
                  : getActiveFiltersCount() > 0
                  ? 'Nenhum produto corresponde aos filtros selecionados'
                  : 'Não há produtos disponíveis nesta categoria'
                }
              </p>
              {getActiveFiltersCount() > 0 ? (
                <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                  Limpar Filtros
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/catalog')} 
                  className={styles.clearFiltersBtn}
                >
                  Ver Todos os Produtos
                </button>
              )}
            </div>
          )}

          {/* Paginação (para implementação futura) */}
          {filteredProducts.length > 20 && (
            <div className={styles.pagination}>
              <p className={styles.paginationNote}>
                💡 Mostrando os primeiros {Math.min(20, filteredProducts.length)} produtos. 
                Use os filtros para refinar sua busca.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Overlay para mobile */}
      {showFilters && (
        <div 
          className={styles.filterOverlay}
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Catalog;