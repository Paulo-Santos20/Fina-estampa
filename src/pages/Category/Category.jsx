import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Layout from '../../components/common/Layout/Layout';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import { allProducts, filterOptions, categories } from '../../data/products';
import styles from './Category.module.css';

const Category = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    gender: 'all',
    subcategory: 'all',
    brand: 'all',
    material: 'all',
    color: 'all',
    priceRange: 'all',
    customPriceMin: '',
    customPriceMax: ''
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    subcategory: true,
    price: true,
    brand: false,
    material: false,
    color: false
  });

  // Encontrar categoria atual
  const currentCategory = useMemo(() => {
    return categories.find(cat => cat.slug === categoria);
  }, [categoria]);

  // Mapear categoria para filtro de produtos
  const categoryMapping = useMemo(() => ({
    'vestidos': ['Vestidos'],
    'blusas': ['Blusas', 'Camisas'],
    'calcas': ['Calças', 'Shorts', 'Bermudas'],
    'saias': ['Saias', 'Macacões'],
    'acessorios': ['Acessórios'],
    'calcados': ['Calçados']
  }), []);

  // Produtos da categoria
  const categoryProducts = useMemo(() => {
    if (!categoria || !categoryMapping[categoria]) {
      return [];
    }

    const categoryNames = categoryMapping[categoria];
    return allProducts.filter(product => 
      categoryNames.includes(product.category)
    );
  }, [categoria, categoryMapping]);

  // Aplicar filtros
  const filteredResults = useMemo(() => {
    let results = [...categoryProducts];

    // Filtrar por gênero
    if (filters.gender !== 'all') {
      results = results.filter(product => 
        product.gender?.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    // Filtrar por subcategoria
    if (filters.subcategory !== 'all') {
      results = results.filter(product => 
        product.subcategory?.toLowerCase() === filters.subcategory.toLowerCase()
      );
    }

    // Filtrar por marca
    if (filters.brand !== 'all') {
      results = results.filter(product => 
        product.brand?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Filtrar por material
    if (filters.material !== 'all') {
      results = results.filter(product => 
        product.material?.toLowerCase() === filters.material.toLowerCase()
      );
    }

    // Filtrar por cor
    if (filters.color !== 'all') {
      results = results.filter(product => 
        product.colors?.some(color => 
          color.toLowerCase() === filters.color.toLowerCase()
        )
      );
    }

    // Filtrar por faixa de preço predefinida
    if (filters.priceRange !== 'all') {
      const range = filterOptions.priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        results = results.filter(product => {
          const price = product.salePrice || product.price;
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Filtrar por faixa de preço customizada
    if (filters.customPriceMin || filters.customPriceMax) {
      const min = filters.customPriceMin ? parseFloat(filters.customPriceMin) : 0;
      const max = filters.customPriceMax ? parseFloat(filters.customPriceMax) : Infinity;
      
      results = results.filter(product => {
        const price = product.salePrice || product.price;
        return price >= min && price <= max;
      });
    }

    return results;
  }, [categoryProducts, filters]);

  // Aplicar ordenação
  const sortedResults = useMemo(() => {
    if (filteredResults.length === 0) return [];

    const results = [...filteredResults];

    switch (sortBy) {
      case 'price-low':
        return results.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
      case 'price-high':
        return results.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
      case 'name':
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return results.sort((a, b) => b.id - a.id);
      default: // relevance
        return results;
    }
  }, [filteredResults, sortBy]);

  // Handlers
  const clearFilters = useCallback(() => {
    setFilters({
      gender: 'all',
      subcategory: 'all',
      brand: 'all',
      material: 'all',
      color: 'all',
      priceRange: 'all',
      customPriceMin: '',
      customPriceMax: ''
    });
    setSortBy('relevance');
  }, []);

  const toggleMobileFilters = useCallback(() => {
    setShowMobileFilters(prev => !prev);
  }, []);

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  // Estados computados
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== 'all' && value !== ''
  );
  const hasResults = sortedResults.length > 0;

  // Verificar se categoria existe
  if (!currentCategory) {
    return (
      <Layout>
        <div className={styles.categoryPage}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <h1>Categoria não encontrada</h1>
              <p>A categoria "{categoria}" não existe.</p>
              <button onClick={() => navigate('/')} className={styles.backBtn}>
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.categoryPage}>
        <div className={styles.container}>
          {/* Header da Página */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
              {currentCategory.name}
            </h1>
            <p className={styles.pageDescription}>
              {currentCategory.description}
            </p>
            
            <div className={styles.resultsInfo}>
              <span className={styles.resultsCount}>
                {sortedResults.length} produto{sortedResults.length !== 1 ? 's' : ''} encontrado{sortedResults.length !== 1 ? 's' : ''}
              </span>
              
              <div className={styles.controls}>
                <button 
                  className={styles.mobileFilterToggle}
                  onClick={toggleMobileFilters}
                  type="button"
                >
                  <FaFilter />
                  Filtros
                </button>
                
                <select 
                  value={sortBy} 
                  onChange={handleSortChange}
                  className={styles.sortSelect}
                >
                  <option value="relevance">Mais Relevante</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="name">Nome A-Z</option>
                  <option value="rating">Melhor Avaliado</option>
                  <option value="newest">Mais Recente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Layout Principal */}
          <div className={styles.mainLayout}>
            {/* Sidebar de Filtros */}
            <aside className={`${styles.filtersSidebar} ${showMobileFilters ? styles.showMobile : ''}`}>
              <div className={styles.filtersHeader}>
                <h3 className={styles.filtersTitle}>Filtros</h3>
                <button 
                  className={styles.closeMobileFilters}
                  onClick={toggleMobileFilters}
                  type="button"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className={styles.filtersContent}>
                {/* Filtro por Gênero */}
                <div className={styles.filterSection}>
                  <button 
                    className={styles.sectionToggle}
                    onClick={() => toggleSection('gender')}
                    type="button"
                  >
                    <span>Gênero</span>
                    {expandedSections.gender ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.gender && (
                    <div className={styles.filterGroup}>
                      <select 
                        value={filters.gender} 
                        onChange={(e) => handleFilterChange('gender', e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="all">Todos os Gêneros</option>
                        {filterOptions.genders.map(gender => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Filtro por Subcategoria */}
                <div className={styles.filterSection}>
                  <button 
                    className={styles.sectionToggle}
                    onClick={() => toggleSection('subcategory')}
                    type="button"
                  >
                    <span>Estilo</span>
                    {expandedSections.subcategory ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.subcategory && (
                    <div className={styles.filterGroup}>
                      <select 
                        value={filters.subcategory} 
                        onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="all">Todos os Estilos</option>
                        {filterOptions.subcategories.map(subcategory => (
                          <option key={subcategory} value={subcategory}>
                            {subcategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Filtro por Faixa de Preço */}
                <div className={styles.filterSection}>
                  <button 
                    className={styles.sectionToggle}
                    onClick={() => toggleSection('price')}
                    type="button"
                  >
                    <span>Preço</span>
                    {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.price && (
                    <div className={styles.filterGroup}>
                      <select 
                        value={filters.priceRange} 
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="all">Todas as Faixas</option>
                        {filterOptions.priceRanges.map(range => (
                          <option key={range.label} value={range.label}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                      
                      <div className={styles.customPriceRange}>
                        <span className={styles.customPriceLabel}>Ou defina:</span>
                        <div className={styles.priceInputs}>
                          <input
                            type="number"
                            placeholder="Mín"
                            value={filters.customPriceMin}
                            onChange={(e) => handleFilterChange('customPriceMin', e.target.value)}
                            className={styles.priceInput}
                            min="0"
                            step="0.01"
                          />
                          <span className={styles.priceSeparator}>até</span>
                          <input
                            type="number"
                            placeholder="Máx"
                            value={filters.customPriceMax}
                            onChange={(e) => handleFilterChange('customPriceMax', e.target.value)}
                            className={styles.priceInput}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Filtro por Marca */}
                <div className={styles.filterSection}>
                  <button 
                    className={styles.sectionToggle}
                    onClick={() => toggleSection('brand')}
                    type="button"
                  >
                    <span>Marca</span>
                    {expandedSections.brand ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.brand && (
                    <div className={styles.filterGroup}>
                      <select 
                        value={filters.brand} 
                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="all">Todas as Marcas</option>
                        {filterOptions.brands.map(brand => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Filtro por Material */}
                <div className={styles.filterSection}>
                  <button 
                    className={styles.sectionToggle}
                    onClick={() => toggleSection('material')}
                    type="button"
                  >
                    <span>Material</span>
                    {expandedSections.material ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.material && (
                    <div className={styles.filterGroup}>
                      <select 
                        value={filters.material} 
                        onChange={(e) => handleFilterChange('material', e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="all">Todos os Materiais</option>
                        {filterOptions.materials.map(material => (
                          <option key={material} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Filtro por Cor */}
                <div className={styles.filterSection}>
                  <button 
                    className={styles.sectionToggle}
                    onClick={() => toggleSection('color')}
                    type="button"
                  >
                    <span>Cor</span>
                    {expandedSections.color ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.color && (
                    <div className={styles.filterGroup}>
                      <select 
                        value={filters.color} 
                        onChange={(e) => handleFilterChange('color', e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="all">Todas as Cores</option>
                        {filterOptions.colors.map(color => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Botão Limpar Filtros */}
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters} 
                    className={styles.clearFiltersBtn}
                    type="button"
                  >
                    Limpar Todos os Filtros
                  </button>
                )}
              </div>
            </aside>

            {/* Área de Resultados */}
            <main className={styles.resultsArea}>
              {!hasResults ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>😔</div>
                  <h2>Nenhum produto encontrado</h2>
                  <p>Tente remover alguns filtros para ver mais produtos</p>
                  {hasActiveFilters && (
                    <button 
                      onClick={clearFilters} 
                      className={styles.clearFiltersBtn}
                      type="button"
                    >
                      Limpar Filtros
                    </button>
                  )}
                </div>
              ) : (
                <div className={styles.productsGrid}>
                  {sortedResults.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </main>
          </div>

          {/* Overlay para Mobile */}
          {showMobileFilters && (
            <div 
              className={styles.mobileFiltersOverlay}
              onClick={toggleMobileFilters}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Category;