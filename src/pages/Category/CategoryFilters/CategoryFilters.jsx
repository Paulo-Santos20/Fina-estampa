import React from 'react';
import { FaTimes, FaFilter } from 'react-icons/fa';
import styles from './CategoryFilters.module.css';

const CategoryFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  productCount,
  categorySlug 
}) => {
  
  // Opções de filtros baseadas na categoria
  const getFilterOptions = () => {
    const baseOptions = {
      sizes: ['PP', 'P', 'M', 'G', 'GG'],
      colors: ['Preto', 'Branco', 'Azul', 'Rosa', 'Vinho', 'Bege', 'Verde']
    };

    // Tamanhos específicos para calçados
    if (categorySlug === 'calcados') {
      baseOptions.sizes = ['35', '36', '37', '38', '39', '40', '41', '42'];
    }

    // Tamanhos específicos para calças
    if (categorySlug === 'calcas') {
      baseOptions.sizes = ['36', '38', '40', '42', '44', '46'];
    }

    return baseOptions;
  };

  const filterOptions = getFilterOptions();

  // Manipular mudança de preço
  const handlePriceChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(value);
    onFilterChange({ priceRange: newPriceRange });
  };

  // Manipular seleção múltipla
  const handleMultiSelect = (type, value) => {
    const currentValues = filters[type];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onFilterChange({ [type]: newValues });
  };

  // Verificar se há filtros ativos
  const hasActiveFilters = () => {
    return (
      filters.priceRange[0] > 0 || 
      filters.priceRange[1] < 500 ||
      filters.sizes.length > 0 ||
      filters.colors.length > 0 ||
      filters.inStock ||
      filters.onSale
    );
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>
          <FaFilter />
          Filtros
        </h3>
        {hasActiveFilters() && (
          <button 
            onClick={onClearFilters}
            className={styles.clearAllBtn}
          >
            <FaTimes />
            Limpar
          </button>
        )}
      </div>

      {/* Filtro de Preço */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Preço</h4>
        <div className={styles.priceFilter}>
          <div className={styles.priceInputs}>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              placeholder="Min"
              className={styles.priceInput}
            />
            <span>até</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              placeholder="Max"
              className={styles.priceInput}
            />
          </div>
          <div className={styles.priceRange}>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className={styles.rangeSlider}
            />
          </div>
        </div>
      </div>

      {/* Filtro de Tamanhos */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Tamanhos</h4>
        <div className={styles.sizeFilter}>
          {filterOptions.sizes.map(size => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${
                filters.sizes.includes(size) ? styles.active : ''
              }`}
              onClick={() => handleMultiSelect('sizes', size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro de Cores */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Cores</h4>
        <div className={styles.colorFilter}>
          {filterOptions.colors.map(color => (
            <label key={color} className={styles.colorOption}>
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => handleMultiSelect('colors', color)}
                className={styles.colorCheckbox}
              />
              <span className={styles.colorLabel}>{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtros Rápidos */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Filtros Rápidos</h4>
        <div className={styles.quickFilters}>
          <label className={styles.quickOption}>
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) => onFilterChange({ onSale: e.target.checked })}
              className={styles.quickCheckbox}
            />
            <span className={styles.quickLabel}>Em Promoção</span>
          </label>
          
          <label className={styles.quickOption}>
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange({ inStock: e.target.checked })}
              className={styles.quickCheckbox}
            />
            <span className={styles.quickLabel}>Em Estoque</span>
          </label>
        </div>
      </div>

      {/* Contador de Resultados */}
      <div className={styles.resultsCounter}>
        <span className={styles.counterText}>
          {productCount} produtos encontrados
        </span>
      </div>
    </div>
  );
};

export default CategoryFilters;