import React from 'react';
import { FaTag, FaPalette, FaRuler, FaDollarSign, FaFire, FaStar } from 'react-icons/fa';
import styles from './ProductFilters.module.css';

const ProductFilters = ({ filters, onFilterChange, filterOptions, categories }) => {
  const handleCategoryChange = (categoryName) => {
    onFilterChange({
      ...filters,
      category: filters.category === categoryName ? '' : categoryName
    });
  };

  const handleSizeChange = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    onFilterChange({
      ...filters,
      sizes: newSizes
    });
  };

  const handleColorChange = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    onFilterChange({
      ...filters,
      colors: newColors
    });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    onFilterChange({
      ...filters,
      priceRange: [filters.priceRange[0], value]
    });
  };

  const handleCheckboxChange = (field) => {
    onFilterChange({
      ...filters,
      [field]: !filters[field]
    });
  };

  return (
    <div className={styles.filters}>
      {/* Categorias */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>
          <FaTag className={styles.filterIcon} />
          Categorias
        </h4>
        <div className={styles.filterOptions}>
          {categories.filter(cat => cat.isActive).map(category => (
            <label key={category.id} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={filters.category === category.name}
                onChange={() => handleCategoryChange(category.name)}
                className={styles.filterCheckbox}
              />
              <span className={styles.filterLabel}>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>
          <FaDollarSign className={styles.filterIcon} />
          Preço até: R\$ {filters.priceRange[1]}
        </h4>
        <div className={styles.priceRange}>
          <input
            type="range"
            min="0"
            max={filterOptions.maxPrice}
            step="10"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className={styles.rangeSlider}
          />
          <div className={styles.priceLabels}>
            <span>R\$ 0</span>
            <span>R\$ {filterOptions.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Tamanhos */}
      {filterOptions.sizes.length > 0 && (
        <div className={styles.filterGroup}>
          <h4 className={styles.filterTitle}>
            <FaRuler className={styles.filterIcon} />
            Tamanhos
          </h4>
          <div className={styles.sizeOptions}>
            {filterOptions.sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`${styles.sizeButton} ${
                  filters.sizes.includes(size) ? styles.sizeButtonActive : ''
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cores */}
      {filterOptions.colors.length > 0 && (
        <div className={styles.filterGroup}>
          <h4 className={styles.filterTitle}>
            <FaPalette className={styles.filterIcon} />
            Cores
          </h4>
          <div className={styles.colorOptions}>
            {filterOptions.colors.map(color => (
              <label key={color} className={styles.colorOption}>
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className={styles.colorCheckbox}
                />
                <span className={styles.colorLabel}>
                  <span 
                    className={styles.colorSwatch}
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                  {color}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Filtros Especiais */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>
          <FaStar className={styles.filterIcon} />
          Filtros Especiais
        </h4>
        <div className={styles.specialFilters}>
          <label className={styles.specialOption}>
            <input
              type="checkbox"
              checked={filters.onlyPromo}
              onChange={() => handleCheckboxChange('onlyPromo')}
              className={styles.specialCheckbox}
            />
            <span className={styles.specialLabel}>
              <FaFire className={styles.specialIcon} />
              Apenas promoções
            </span>
          </label>
          
          <label className={styles.specialOption}>
            <input
              type="checkbox"
              checked={filters.onlyNew}
              onChange={() => handleCheckboxChange('onlyNew')}
              className={styles.specialCheckbox}
            />
            <span className={styles.specialLabel}>
              <FaStar className={styles.specialIcon} />
              Apenas novidades
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

// Função auxiliar para obter cores em hex
const getColorHex = (colorName) => {
  const colorMap = {
    'Preto': '#000000',
    'Branco': '#FFFFFF',
    'Azul': '#0066CC',
    'Vermelho': '#CC0000',
    'Rosa': '#FF69B4',
    'Verde': '#00AA00',
    'Amarelo': '#FFDD00',
    'Roxo': '#8A2BE2',
    'Marrom': '#8B4513',
    'Cinza': '#808080'
  };
  return colorMap[colorName] || '#CCCCCC';
};

export default ProductFilters;