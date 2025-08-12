// src/pages/Catalog/Catalog.jsx
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts.js';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid.jsx';
import styles from './Catalog.module.css';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const { products, loading, error, search, getByCategory } = useProducts();
  const [viewMode, setViewMode] = useState('grid');

  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  // Filtrar produtos baseado nos parâmetros da URL
  const filteredProducts = useMemo(() => {
    // Se há busca, usar função de busca
    if (searchQuery) {
      return search(searchQuery);
    }
    
    // Se há categoria, filtrar por categoria
    if (categoryFilter) {
      return getByCategory(categoryFilter);
    }
    
    // Caso contrário, retornar todos os produtos
    return products;
  }, [products, searchQuery, categoryFilter, search, getByCategory]);

  const pageTitle = useMemo(() => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`;
    }
    if (categoryFilter) {
      // Capitalizar primeira letra
      return categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
    }
    return 'Todos os Produtos';
  }, [searchQuery, categoryFilter]);

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{pageTitle}</h1>
          {(searchQuery || categoryFilter) && (
            <p className={styles.subtitle}>
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}
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
                ? `Nenhum produto encontrado na categoria "${categoryFilter}"`
                : 'Nenhum produto disponível'
          }
        />
      </div>
    </div>
  );
};

export default Catalog;