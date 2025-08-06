import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { allProducts, categories } from '../../../data/products';
import styles from './SearchMenu.module.css';

const SearchMenu = ({ isOpen, onClose, searchQuery, onSearchChange }) => {
  const navigate = useNavigate();

  // Palavras-chave para categorias
  const categoryKeywords = useMemo(() => ({
    'vestidos': ['vestido', 'dress', 'festa', 'social', 'longo', 'midi', 'curto'],
    'blusas': ['blusa', 'camisa', 'shirt', 'social', 'trabalho', 'manga'],
    'calcas': ['calça', 'short', 'bermuda', 'jeans', 'casual', 'social', 'legging'],
    'saias': ['saia', 'macacão', 'jumpsuit', 'elegante', 'midi', 'longa'],
    'acessorios': ['bolsa', 'colar', 'brinco', 'acessório', 'joia', 'anel'],
    'calcados': ['sapato', 'tênis', 'sandália', 'calçado', 'shoe', 'bota']
  }), []);

  // Sugestões de categorias baseadas na busca
  const categorySuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    
    return categories.filter(category => {
      if (category.name.toLowerCase().includes(query)) return true;
      
      const categoryWords = categoryKeywords[category.slug] || [];
      return categoryWords.some(word => 
        word.includes(query) || query.includes(word)
      );
    }).slice(0, 8);
  }, [searchQuery, categoryKeywords]);

  // Produtos sugeridos baseados na busca
  const productSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    
    const matchedProducts = allProducts.filter(product => {
      if (product.name.toLowerCase().includes(query)) return true;
      if (product.category.toLowerCase().includes(query)) return true;
      if (product.brand?.toLowerCase().includes(query)) return true;
      if (product.material?.toLowerCase().includes(query)) return true;
      if (product.colors?.some(color => 
        color.toLowerCase().includes(query)
      )) return true;

      return false;
    });

    return matchedProducts
      .sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().includes(query);
        const bNameMatch = b.name.toLowerCase().includes(query);
        
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return 0;
      })
      .slice(0, 6);
  }, [searchQuery]);

  // Termos sugeridos baseados na busca
  const termSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const suggestions = [];

    if (query.length > 2) {
      suggestions.push(query);
      
      const commonWords = ['feminina', 'masculina', 'infantil', 'casual', 'social', 'festa', 'verão', 'inverno'];
      commonWords.forEach(word => {
        if (!query.includes(word)) {
          suggestions.push(`${query} ${word}`);
        }
      });

      categorySuggestions.forEach(category => {
        const categoryWords = categoryKeywords[category.slug] || [];
        categoryWords.forEach(word => {
          if (word.includes(query) && word !== query) {
            suggestions.push(word);
          }
        });
      });
    }

    return [...new Set(suggestions)].slice(0, 8);
  }, [searchQuery, categorySuggestions, categoryKeywords]);

  // Handlers
  const handleCategoryClick = useCallback((categorySlug) => {
    navigate(`/categoria/${categorySlug}`);
    onClose();
  }, [navigate, onClose]);

  const handleProductClick = useCallback((productId) => {
    navigate(`/produto/${productId}`);
    onClose();
  }, [navigate, onClose]);

  const handleTermClick = useCallback((term) => {
    onSearchChange(term);
    navigate(`/busca?q=${encodeURIComponent(term)}`);
    onClose();
  }, [navigate, onClose, onSearchChange]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  }, [searchQuery, navigate, onClose]);

  // Formatação de preço
  const formatPrice = useCallback((price) => {
    if (!price) return 'R$ 0,00';
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Estados computados
  const hasQuery = Boolean(searchQuery.trim());
  const hasCategorySuggestions = categorySuggestions.length > 0;
  const hasProductSuggestions = productSuggestions.length > 0;
  const hasTermSuggestions = termSuggestions.length > 0;
  const hasAnySuggestions = hasCategorySuggestions || hasProductSuggestions || hasTermSuggestions;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />
      
      {/* Menu com barra de pesquisa em evidência */}
      <div className={styles.searchMenu}>
        {/* NOVO: Header com barra de pesquisa em evidência */}
        <div className={styles.searchHeader}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por produtos, marcas ou categorias..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
              <button
                type="button"
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Fechar busca"
              >
                <FaTimes />
              </button>
            </div>
          </form>
        </div>

        {/* Conteúdo das sugestões */}
        {hasQuery ? (
          <div className={styles.searchContent}>
            {/* Coluna da Esquerda - Termos e Categorias Sugeridas */}
            <div className={styles.leftColumn}>
              {/* Termos Sugeridos */}
              {hasTermSuggestions && (
                <div className={styles.suggestionsSection}>
                  <h3 className={styles.sectionTitle}>Termos sugeridos</h3>
                  <ul className={styles.termsList}>
                    {termSuggestions.map((term, index) => (
                      <li key={term} className={styles.termItem}>
                        <button
                          onClick={() => handleTermClick(term)}
                          className={styles.termButton}
                        >
                          <span className={styles.termText}>
                            {term.split(' ').map((word, wordIndex) => {
                              const isHighlighted = word.toLowerCase().includes(searchQuery.toLowerCase());
                              return (
                                <span 
                                  key={wordIndex}
                                  className={isHighlighted ? styles.highlighted : ''}
                                >
                                  {word}{wordIndex < term.split(' ').length - 1 ? ' ' : ''}
                                </span>
                              );
                            })}
                          </span>
                          <span className={styles.arrow}>›</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categorias Sugeridas */}
              {hasCategorySuggestions && (
                <div className={styles.suggestionsSection}>
                  <h3 className={styles.sectionTitle}>Categorias relacionadas</h3>
                  <ul className={styles.categoriesList}>
                    {categorySuggestions.map((category) => (
                      <li key={category.slug} className={styles.categoryItem}>
                        <button
                          onClick={() => handleCategoryClick(category.slug)}
                          className={styles.categoryButton}
                        >
                          <div className={styles.categoryInfo}>
                            <span className={styles.categoryName}>{category.name}</span>
                            <span className={styles.categoryDesc}>{category.description}</span>
                          </div>
                          <span className={styles.arrow}>›</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Coluna da Direita - Produtos Sugeridos */}
            <div className={styles.rightColumn}>
              {hasProductSuggestions && (
                <div className={styles.suggestionsSection}>
                  <h3 className={styles.sectionTitle}>Nossas sugestões de produtos</h3>
                  <div className={styles.productsGrid}>
                    {productSuggestions.map((product) => (
                      <div 
                        key={product.id} 
                        className={styles.productCard}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className={styles.productImage}>
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI0MCI+8J+RlzwvdGV4dD4KPHRleHQgeD0iNzUiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNjAwIj5GaW5hIEVzdGFtcGE8L3RleHQ+CjwvZz4KPC9zdmc+";
                            }}
                          />
                          {product.isPromo && product.discount && (
                            <div className={styles.discountBadge}>
                              -{product.discount}%
                            </div>
                          )}
                          {product.isNew && (
                            <div className={styles.newBadge}>Novo</div>
                          )}
                        </div>
                        <div className={styles.productInfo}>
                          <h4 className={styles.productName}>{product.name}</h4>
                          <div className={styles.productPricing}>
                            {product.isPromo && product.salePrice ? (
                              <>
                                <span className={styles.originalPrice}>
                                  {formatPrice(product.originalPrice || product.price)}
                                </span>
                                <span className={styles.salePrice}>
                                  {formatPrice(product.salePrice)}
                                </span>
                              </>
                            ) : (
                              <span className={styles.regularPrice}>
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>Digite algo para buscar</h3>
            <p className={styles.emptyDescription}>
              Encontre vestidos, blusas, calças e muito mais
            </p>
          </div>
        )}

        {hasQuery && !hasAnySuggestions && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>😔</div>
            <h3 className={styles.noResultsTitle}>Nenhum resultado encontrado</h3>
            <p className={styles.noResultsDescription}>
              Tente buscar com outros termos
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchMenu;