import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import ProductFilters from '../../components/product/ProductFilters/ProductFilters';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { FaFilter, FaTimes, FaSort, FaThLarge, FaList } from 'react-icons/fa';
import styles from './Catalog.module.css';

const Catalog = () => {
  const { products } = useProducts();
  const { categories, getCategoryBySlug } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Estados do componente
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados dos filtros
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    sortBy: searchParams.get('sort') || 'name',
    onlyPromo: false,
    onlyNew: false
  });

  // Atualizar filtros quando os parâmetros da URL mudarem
  useEffect(() => {
    const newFilters = {
      ...filters,
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      sortBy: searchParams.get('sort') || 'name'
    };
    setFilters(newFilters);
  }, [searchParams]);

  // Obter categoria atual
  const currentCategory = useMemo(() => {
    if (filters.category) {
      return getCategoryBySlug(filters.category) || 
             categories.find(cat => cat.name.toLowerCase() === filters.category.toLowerCase());
    }
    return null;
  }, [filters.category, categories, getCategoryBySlug]);

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    setIsLoading(true);
    
    let filtered = [...products];

    // Filtro por busca
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
      );
    }

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(product => {
        const categoryMatch = product.category.toLowerCase() === filters.category.toLowerCase();
        const slugMatch = currentCategory && product.category.toLowerCase() === currentCategory.name.toLowerCase();
        return categoryMatch || slugMatch;
      });
    }

    // Filtro por tamanhos
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes && product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Filtro por cores
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors && product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Filtro por faixa de preço
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Filtro por promoção
    if (filters.onlyPromo) {
      filtered = filtered.filter(product => product.isPromo && product.salePrice);
    }

    // Filtro por novidades
    if (filters.onlyNew) {
      filtered = filtered.filter(product => product.isNew);
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setTimeout(() => setIsLoading(false), 300);
    return filtered;
  }, [products, filters, currentCategory]);

  // Obter todas as opções de filtro disponíveis
  const filterOptions = useMemo(() => {
    const sizes = [...new Set(products.flatMap(p => p.sizes || []))];
    const colors = [...new Set(products.flatMap(p => p.colors || []))];
    const maxPrice = Math.max(...products.map(p => p.salePrice || p.price));
    
    return {
      sizes: sizes.sort(),
      colors: colors.sort(),
      maxPrice: Math.ceil(maxPrice / 100) * 100
    };
  }, [products]);

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Atualizar URL
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.sortBy !== 'name') params.set('sort', newFilters.sortBy);
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      search: '',
      priceRange: [0, filterOptions.maxPrice],
      sizes: [],
      colors: [],
      sortBy: 'name',
      onlyPromo: false,
      onlyNew: false
    };
    setFilters(clearedFilters);
    setSearchParams({});
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  // Título da página
  const pageTitle = useMemo(() => {
    if (filters.search) {
      return `Resultados para "${filters.search}"`;
    }
    if (currentCategory) {
      return currentCategory.name;
    }
    return 'Todos os Produtos';
  }, [filters.search, currentCategory]);

  // Subtítulo da página
  const pageSubtitle = useMemo(() => {
    const count = filteredProducts.length;
    const itemText = count === 1 ? 'produto encontrado' : 'produtos encontrados';
    
    if (filters.search) {
      return `${count} ${itemText}`;
    }
    if (currentCategory) {
      return `${count} ${itemText} • ${currentCategory.description || 'Confira nossa seleção'}`;
    }
    return `${count} ${itemText} • Confira toda nossa coleção`;
  }, [filteredProducts.length, filters.search, currentCategory]);

  return (
    <Layout>
      <div className={styles.catalog}>
        <div className={styles.container}>
          {/* Header da página */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.titleSection}>
                <h1 className={styles.title}>{pageTitle}</h1>
                <p className={styles.subtitle}>{pageSubtitle}</p>
              </div>

              {/* Controles do header */}
              <div className={styles.headerControls}>
                {/* Ordenação */}
                <div className={styles.sortContainer}>
                  <label className={styles.sortLabel}>
                    <FaSort className={styles.sortIcon} />
                    Ordenar por:
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                    className={styles.sortSelect}
                  >
                    <option value="name">Nome (A-Z)</option>
                    <option value="price-low">Menor preço</option>
                    <option value="price-high">Maior preço</option>
                  </select>
                </div>

                {/* Modo de visualização */}
                <div className={styles.viewModeContainer}>
                  <button
                    className={`${styles.viewModeButton} ${viewMode === 'grid' ? styles.active : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Visualização em grade"
                  >
                    <FaThLarge />
                  </button>
                  <button
                    className={`${styles.viewModeButton} ${viewMode === 'list' ? styles.active : ''}`}
                    onClick={() => setViewMode('list')}
                    title="Visualização em lista"
                  >
                    <FaList />
                  </button>
                </div>

                {/* Botão de filtros mobile */}
                <button
                  className={styles.mobileFiltersButton}
                  onClick={toggleMobileFilters}
                >
                  <FaFilter />
                  Filtros
                </button>
              </div>
            </div>

            {/* Tags de filtros ativos */}
            {(filters.search || filters.category || filters.sizes.length > 0 || filters.colors.length > 0 || filters.onlyPromo || filters.onlyNew) && (
              <div className={styles.activeFilters}>
                <div className={styles.filterTags}>
                  {filters.search && (
                    <span className={styles.filterTag}>
                      Busca: "{filters.search}"
                      <button onClick={() => handleFilterChange({ ...filters, search: '' })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  
                  {filters.category && (
                    <span className={styles.filterTag}>
                      Categoria: {currentCategory?.name || filters.category}
                      <button onClick={() => handleFilterChange({ ...filters, category: '' })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  
                  {filters.sizes.map(size => (
                    <span key={size} className={styles.filterTag}>
                      Tamanho: {size}
                      <button onClick={() => handleFilterChange({ 
                        ...filters, 
                        sizes: filters.sizes.filter(s => s !== size) 
                      })}>
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                  
                  {filters.colors.map(color => (
                    <span key={color} className={styles.filterTag}>
                      Cor: {color}
                      <button onClick={() => handleFilterChange({ 
                        ...filters, 
                        colors: filters.colors.filter(c => c !== color) 
                      })}>
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                  
                  {filters.onlyPromo && (
                    <span className={styles.filterTag}>
                      Apenas promoções
                      <button onClick={() => handleFilterChange({ ...filters, onlyPromo: false })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  
                  {filters.onlyNew && (
                    <span className={styles.filterTag}>
                      Apenas novidades
                      <button onClick={() => handleFilterChange({ ...filters, onlyNew: false })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                </div>
                
                <button className={styles.clearFiltersButton} onClick={clearFilters}>
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          {/* Conteúdo principal */}
          <div className={styles.content}>
            {/* Sidebar com filtros */}
            <aside className={`${styles.sidebar} ${isMobileFiltersOpen ? styles.sidebarOpen : ''}`}>
              <div className={styles.filtersHeader}>
                <h3 className={styles.filtersTitle}>
                  <FaFilter />
                  Filtros
                </h3>
                <button
                  className={styles.closeMobileFilters}
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                filterOptions={filterOptions}
                categories={categories}
              />
            </aside>

            {/* Overlay para filtros mobile */}
            {isMobileFiltersOpen && (
              <div
                className={styles.mobileFiltersOverlay}
                onClick={() => setIsMobileFiltersOpen(false)}
              />
            )}

            {/* Grid de produtos */}
            <main className={styles.main}>
              {isLoading ? (
                <div className={styles.loading}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Carregando produtos...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <ProductGrid 
                  products={filteredProducts} 
                  viewMode={viewMode}
                />
              ) : (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>🔍</div>
                  <h3>Nenhum produto encontrado</h3>
                  <p>
                    {filters.search 
                      ? `Não encontramos produtos para "${filters.search}"`
                      : 'Não há produtos que correspondam aos filtros selecionados'
                    }
                  </p>
                  <div className={styles.noResultsActions}>
                    <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                      Limpar filtros
                    </button>
                    <a href="/catalog" className={styles.viewAllBtn}>
                      Ver todos os produtos
                    </a>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;