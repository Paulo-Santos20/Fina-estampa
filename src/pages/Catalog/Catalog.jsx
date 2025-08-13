// src/pages/Catalog/Catalog.jsx
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts.js';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid.jsx';
import styles from './Catalog.module.css';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const { products, loading, error, filterProducts, sortProducts } = useProducts();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const genderFilter = searchParams.get('gender') || '';
  const subcategoryFilter = searchParams.get('subcategory') || '';

  // Filtrar produtos baseado nos parâmetros da URL
  const filteredProducts = useMemo(() => {
    const filters = {};

    if (searchQuery) filters.search = searchQuery;
    if (categoryFilter) filters.category = categoryFilter;
    if (genderFilter) filters.gender = genderFilter;
    if (subcategoryFilter) filters.subcategory = subcategoryFilter;

    const filtered = filterProducts(filters);
    return sortProducts(filtered, sortBy);
  }, [products, searchQuery, categoryFilter, genderFilter, subcategoryFilter, sortBy, filterProducts, sortProducts]);

  const pageTitle = useMemo(() => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`;
    }
    if (categoryFilter) {
      // Capitalizar primeira letra e remover hífens
      return categoryFilter
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    if (genderFilter) {
      return `Moda ${genderFilter}`;
    }
    return 'Todos os Produtos';
  }, [searchQuery, categoryFilter, genderFilter]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{pageTitle}</h1>
            {(searchQuery || categoryFilter || genderFilter) && (
              <p className={styles.subtitle}>
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Controles de ordenação */}
          <div className={styles.controls}>
            <div className={styles.sortControl}>
              <label htmlFor="sort" className={styles.sortLabel}>
                Ordenar por:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className={styles.sortSelect}
              >
                <option value="newest">Mais Recentes</option>
                <option value="popular">Mais Populares</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating-desc">Melhor Avaliação</option>
                <option value="name-asc">Nome A-Z</option>
                <option value="name-desc">Nome Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          error={error}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showViewToggle={true}
          emptyMessage={
            searchQuery 
              ? `Nenhum produto encontrado para "${searchQuery}"`
              : categoryFilter
                ? `Nenhum produto encontrado na categoria "${pageTitle}"`
                : 'Nenhum produto disponível'
          }
        />
      </div>
    </div>
  );
};

export default Catalog;