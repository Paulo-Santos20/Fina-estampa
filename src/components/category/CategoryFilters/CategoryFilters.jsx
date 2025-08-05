import React, { useState, useEffect } from 'react';
import { 
  FaFilter, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp,
  FaTag,
  FaRulerHorizontal,
  FaPalette,
  FaDollarSign,
  FaCheck,
  FaStar
} from 'react-icons/fa';
import styles from './CategoryFilters.module.css';

const CategoryFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  productCount,
  categorySlug,
  isLoading = false 
}) => {
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    sizes: true,
    colors: true,
    quick: true,
    rating: false
  });

  const [priceRange, setPriceRange] = useState([
    filters.priceRange[0], 
    filters.priceRange[1]
  ]);

  // Debounce para mudanças de preço
  useEffect(() => {
    const timer = setTimeout(() => {
      if (priceRange[0] !== filters.priceRange[0] || priceRange[1] !== filters.priceRange[1]) {
        onFilterChange({ priceRange });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange, filters.priceRange, onFilterChange]);

  // Opções de filtros baseadas na categoria
  const getFilterOptions = () => {
    const baseOptions = {
      sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG'],
      colors: [
        'Preto', 'Branco', 'Azul', 'Rosa', 'Vinho', 
        'Bege', 'Verde', 'Amarelo', 'Cinza', 'Marrom'
      ],
      brands: ['Fina Estampa', 'Premium', 'Casual', 'Elegance'],
      occasions: ['Casual', 'Trabalho', 'Festa', 'Esporte']
    };

    // Tamanhos específicos para calçados
    if (categorySlug === 'calcados') {
      baseOptions.sizes = ['35', '36', '37', '38', '39', '40', '41', '42'];
    }

    // Tamanhos específicos para calças
    if (categorySlug === 'calcas') {
      baseOptions.sizes = ['36', '38', '40', '42', '44', '46', '48'];
    }

    // Tamanhos para acessórios
    if (categorySlug === 'acessorios') {
      baseOptions.sizes = ['Único', 'P', 'M', 'G'];
    }

    return baseOptions;
  };

  const filterOptions = getFilterOptions();

  // Toggle seção expandida
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Manipular mudança de preço
  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(value) || 0;
    
    // Garantir que min <= max
    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    }
    if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }
    
    setPriceRange(newPriceRange);
  };

  // Manipular seleção múltipla
  const handleMultiSelect = (type, value) => {
    const currentValues = filters[type] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onFilterChange({ [type]: newValues });
  };

  // Manipular checkbox único
  const handleSingleToggle = (type, checked) => {
    onFilterChange({ [type]: checked });
  };

  // Verificar se há filtros ativos
  const hasActiveFilters = () => {
    return (
      filters.priceRange[0] > 0 || 
      filters.priceRange[1] < 1000 ||
      (filters.sizes && filters.sizes.length > 0) ||
      (filters.colors && filters.colors.length > 0) ||
      (filters.brands && filters.brands.length > 0) ||
      filters.inStock ||
      filters.onSale ||
      filters.freeShipping ||
      filters.rating > 0
    );
  };

  // Contar filtros ativos
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
       if (filters.sizes && filters.sizes.length > 0) count++;
    if (filters.colors && filters.colors.length > 0) count++;
    if (filters.brands && filters.brands.length > 0) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.freeShipping) count++;
    if (filters.rating > 0) count++;
    return count;
  };

  // Presets de preço rápidos
  const pricePresets = [
    { label: 'Até R\$ 50', min: 0, max: 50 },
    { label: 'R\$ 50 - R\$ 100', min: 50, max: 100 },
    { label: 'R\$ 100 - R\$ 200', min: 100, max: 200 },
    { label: 'R\$ 200 - R\$ 500', min: 200, max: 500 },
    { label: 'Acima de R\$ 500', min: 500, max: 1000 }
  ];

  // Aplicar preset de preço
  const applyPricePreset = (min, max) => {
    setPriceRange([min, max]);
    onFilterChange({ priceRange: [min, max] });
  };

  // Renderizar seção de filtro
  const renderFilterSection = (title, key, icon, children) => (
    <div className={styles.filterSection}>
      <button
        className={styles.sectionHeader}
        onClick={() => toggleSection(key)}
        aria-expanded={expandedSections[key]}
      >
        <div className={styles.sectionTitle}>
          {icon}
          <span>{title}</span>
        </div>
        {expandedSections[key] ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      
      <div className={`${styles.sectionContent} ${expandedSections[key] ? styles.expanded : ''}`}>
        {children}
      </div>
    </div>
  );

  return (
    <div className={styles.filtersContainer}>
      {/* Header dos Filtros */}
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>
          <FaFilter />
          Filtros
          {getActiveFiltersCount() > 0 && (
            <span className={styles.activeCount}>({getActiveFiltersCount()})</span>
          )}
        </h3>
        {hasActiveFilters() && (
          <button 
            onClick={onClearFilters}
            className={styles.clearAllBtn}
            disabled={isLoading}
          >
            <FaTimes />
            Limpar Tudo
          </button>
        )}
      </div>

      {/* Contador de Resultados */}
      <div className={styles.resultsCounter}>
        <span className={styles.counterText}>
          {isLoading ? 'Carregando...' : `${productCount} produtos encontrados`}
        </span>
      </div>

      {/* Filtros */}
      <div className={styles.filtersContent}>
        
        {/* Filtro de Preço */}
        {renderFilterSection(
          'Faixa de Preço',
          'price',
          <FaDollarSign />,
          <div className={styles.priceFilter}>
            {/* Presets de Preço */}
            <div className={styles.pricePresets}>
              {pricePresets.map((preset, index) => (
                <button
                  key={index}
                  className={`${styles.pricePreset} ${
                    priceRange[0] === preset.min && priceRange[1] === preset.max 
                      ? styles.active : ''
                  }`}
                  onClick={() => applyPricePreset(preset.min, preset.max)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Inputs de Preço */}
            <div className={styles.priceInputs}>
              <div className={styles.priceInputGroup}>
                <label>Mín</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  placeholder="0"
                  className={styles.priceInput}
                  min="0"
                  max="1000"
                />
              </div>
              
              <span className={styles.priceSeparator}>até</span>
              
              <div className={styles.priceInputGroup}>
                <label>Máx</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  placeholder="1000"
                  className={styles.priceInput}
                  min="0"
                  max="1000"
                />
              </div>
            </div>

            {/* Slider de Preço */}
            <div className={styles.priceSlider}>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className={styles.rangeSlider}
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className={styles.rangeSlider}
              />
            </div>
          </div>
        )}

        {/* Filtro de Tamanhos */}
        {renderFilterSection(
          'Tamanhos',
          'sizes',
          <FaRulerHorizontal />,
          <div className={styles.sizeFilter}>
            <div className={styles.sizeGrid}>
              {filterOptions.sizes.map(size => (
                <button
                  key={size}
                  className={`${styles.sizeBtn} ${
                    filters.sizes?.includes(size) ? styles.active : ''
                  }`}
                  onClick={() => handleMultiSelect('sizes', size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {filters.sizes?.length > 0 && (
              <div className={styles.selectedInfo}>
                {filters.sizes.length} tamanho{filters.sizes.length > 1 ? 's' : ''} selecionado{filters.sizes.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}

        {/* Filtro de Cores */}
        {renderFilterSection(
          'Cores',
          'colors',
          <FaPalette />,
          <div className={styles.colorFilter}>
            <div className={styles.colorGrid}>
              {filterOptions.colors.map(color => (
                <label key={color} className={styles.colorOption}>
                  <input
                    type="checkbox"
                    checked={filters.colors?.includes(color) || false}
                    onChange={(e) => handleMultiSelect('colors', color)}
                    className={styles.colorCheckbox}
                  />
                  <div 
                    className={styles.colorSwatch}
                    style={{ backgroundColor: getColorCode(color) }}
                    title={color}
                  />
                  <span className={styles.colorLabel}>{color}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Filtro de Avaliação */}
        {renderFilterSection(
          'Avaliação',
          'rating',
          <FaStar />,
          <div className={styles.ratingFilter}>
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className={styles.ratingOption}>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => onFilterChange({ rating })}
                  className={styles.ratingRadio}
                />
                <div className={styles.ratingStars}>
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < rating ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                  <span>e acima</span>
                </div>
              </label>
            ))}
            {filters.rating > 0 && (
              <button
                className={styles.clearRating}
                onClick={() => onFilterChange({ rating: 0 })}
              >
                Limpar avaliação
              </button>
            )}
          </div>
        )}

        {/* Filtros Rápidos */}
        {renderFilterSection(
          'Filtros Rápidos',
          'quick',
          <FaTag />,
          <div className={styles.quickFilters}>
            <label className={styles.quickOption}>
              <input
                type="checkbox"
                checked={filters.onSale || false}
                onChange={(e) => handleSingleToggle('onSale', e.target.checked)}
                className={styles.quickCheckbox}
              />
              <div className={styles.quickContent}>
                <span className={styles.quickIcon}>🏷️</span>
                <div>
                  <span className={styles.quickLabel}>Em Promoção</span>
                  <span className={styles.quickDescription}>Produtos com desconto</span>
                </div>
              </div>
            </label>
            
            <label className={styles.quickOption}>
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) => handleSingleToggle('inStock', e.target.checked)}
                className={styles.quickCheckbox}
              />
              <div className={styles.quickContent}>
                <span className={styles.quickIcon}>✅</span>
                <div>
                  <span className={styles.quickLabel}>Em Estoque</span>
                  <span className={styles.quickDescription}>Disponível para compra</span>
                </div>
              </div>
            </label>

            <label className={styles.quickOption}>
              <input
                type="checkbox"
                checked={filters.freeShipping || false}
                onChange={(e) => handleSingleToggle('freeShipping', e.target.checked)}
                className={styles.quickCheckbox}
              />
              <div className={styles.quickContent}>
                <span className={styles.quickIcon}>🚚</span>
                <div>
                  <span className={styles.quickLabel}>Frete Grátis</span>
                  <span className={styles.quickDescription}>Entrega sem custo</span>
                </div>
              </div>
            </label>

            <label className={styles.quickOption}>
              <input
                type="checkbox"
                checked={filters.isNew || false}
                onChange={(e) => handleSingleToggle('isNew', e.target.checked)}
                className={styles.quickCheckbox}
              />
              <div className={styles.quickContent}>
                <span className={styles.quickIcon}>🔥</span>
                <div>
                  <span className={styles.quickLabel}>Novidades</span>
                  <span className={styles.quickDescription}>Lançamentos recentes</span>
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Filtro de Marcas */}
        {renderFilterSection(
          'Marcas',
          'brands',
          <FaCheck />,
          <div className={styles.brandFilter}>
            {filterOptions.brands.map(brand => (
              <label key={brand} className={styles.brandOption}>
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(brand) || false}
                  onChange={(e) => handleMultiSelect('brands', brand)}
                  className={styles.brandCheckbox}
                />
                <span className={styles.brandLabel}>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Botão de Aplicar Filtros (Mobile) */}
      <div className={styles.mobileActions}>
        <button
          className={styles.applyFiltersBtn}
          onClick={() => {
            // Fechar modal de filtros no mobile
            document.body.classList.remove('filters-open');
          }}
        >
          Ver {productCount} Produtos
        </button>
      </div>
    </div>
  );
};

// Função auxiliar para converter nome da cor em código
const getColorCode = (colorName) => {
  const colorMap = {
    'Preto': '#000000',
    'Branco': '#FFFFFF',
    'Azul': '#0066CC',
    'Rosa': '#FF69B4',
    'Vinho': '#722F37',
    'Bege': '#F5F5DC',
    'Verde': '#228B22',
    'Amarelo': '#FFD700',
    'Cinza': '#808080',
    'Marrom': '#8B4513',
    'Roxo': '#800080',
    'Laranja': '#FF8C00'
  };
  
  return colorMap[colorName] || '#CCCCCC';
};

export default CategoryFilters;