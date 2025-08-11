// src/components/common/Header/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useCMS } from '../../../contexts/CMSContext.jsx';
import { useCart } from '../../../contexts/CartContext.jsx';
import { useProducts } from '../../../hooks/useProducts.js';

// Ícones SVG otimizados
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Hook para fechar dropdowns ao clicar fora
const useOutsideClick = (refs, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      const isOutside = refs.every(ref => 
        ref.current && !ref.current.contains(event.target)
      );
      if (isOutside) callback();
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [refs, callback]);
};

// Componente da barra superior com UM anúncio (controlado pelo CMS)
const TopBar = () => {
  const { headerTopAnnouncements, headerSettings } = useCMS();

  if (!headerSettings?.showTopAnnouncements || !headerTopAnnouncements?.[0]) {
    return null;
  }

  const announcement = headerTopAnnouncements[0]; // Apenas o primeiro anúncio

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarContent}>
        <span className={styles.announcement}>
          {announcement.text}
        </span>
      </div>
    </div>
  );
};

// Componente de busca com sugestões (barra maior)
const SearchBar = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { headerCategories } = useCMS();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useOutsideClick([searchRef], () => setShowSuggestions(false));

  // Filtrar sugestões baseadas na query
  const suggestions = useMemo(() => {
    if (!query.trim()) return { categories: [], products: [] };

    const searchTerm = query.toLowerCase().trim();
    
    // Filtrar categorias
    const categoryMatches = (headerCategories || [])
      .filter(cat => cat.name.toLowerCase().includes(searchTerm))
      .slice(0, 3);

    // Filtrar produtos
    const productMatches = (products || [])
      .filter(product => 
        product.name?.toLowerCase().includes(searchTerm) ||
        product.title?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm)
      )
      .slice(0, 6);

    return { categories: categoryMatches, products: productMatches };
  }, [query, headerCategories, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (type, item) => {
    setShowSuggestions(false);
    setQuery('');
    
    if (type === 'category') {
      navigate(`/catalog?category=${encodeURIComponent(item.slug)}`);
    } else if (type === 'product') {
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <SearchIcon />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Buscar por vestidos, blusas, coleções..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          aria-label="Buscar produtos"
        />
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>

      {/* Sugestões com imagens dos produtos */}
      {showSuggestions && (suggestions.categories.length > 0 || suggestions.products.length > 0) && (
        <div className={styles.suggestionsPanel}>
          {suggestions.categories.length > 0 && (
            <div className={styles.suggestionSection}>
              <h4 className={styles.sectionTitle}>Categorias</h4>
              <div className={styles.categoryList}>
                {suggestions.categories.map(category => (
                  <button
                    key={category.id}
                    className={styles.categoryItem}
                    onClick={() => handleSuggestionClick('category', category)}
                  >
                    <span className={styles.categoryName}>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions.products.length > 0 && (
            <div className={styles.suggestionSection}>
              <h4 className={styles.sectionTitle}>Produtos</h4>
              <div className={styles.productGrid}>
                {suggestions.products.map(product => (
                  <button
                    key={product.id}
                    className={styles.productItem}
                    onClick={() => handleSuggestionClick('product', product)}
                  >
                    <div className={styles.productImage}>
                      <img
                        src={product.images?.[0] || product.image || '/assets/products/placeholder.jpg'}
                        alt={product.name || product.title}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <span className={styles.productName}>
                        {product.name || product.title}
                      </span>
                      {product.price && (
                        <span className={styles.productPrice}>
                          R$ {Number(product.price).toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.suggestionFooter}>
            <button
              className={styles.viewAllButton}
              onClick={() => {
                navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
                setShowSuggestions(false);
              }}
            >
              Ver todos os resultados para "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente da barra principal
const MainHeader = () => {
  const { itemCount, openDrawer } = useCart();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accountRef = useRef(null);

  useOutsideClick([accountRef], () => setShowAccountMenu(false));

  return (
    <div className={styles.mainHeader}>
      <div className={styles.headerContainer}>
        {/* Menu mobile */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>
            <span className={styles.logoMain}>Fina</span>
            <span className={styles.logoAccent}>Estampa</span>
          </span>
        </Link>

        {/* Busca - MAIOR */}
        <SearchBar />

        {/* Ações do usuário */}
        <div className={styles.userActions}>
          {/* Conta com dropdown */}
          <div className={styles.accountDropdown} ref={accountRef}>
            <button
              className={styles.actionButton}
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              aria-expanded={showAccountMenu}
            >
              <UserIcon />
              <span className={styles.actionText}>Entrar</span>
              <ChevronDownIcon />
            </button>

            {showAccountMenu && (
              <div className={styles.dropdownMenu}>
                <Link to="/login" className={styles.dropdownItem}>
                  Fazer Login
                </Link>
                <Link to="/register" className={styles.dropdownItem}>
                  Criar Conta
                </Link>
                <hr className={styles.dropdownDivider} />
                <Link to="/account" className={styles.dropdownItem}>
                  Minha Conta
                </Link>
                <Link to="/orders" className={styles.dropdownItem}>
                  Meus Pedidos
                </Link>
                <Link to="/favorites" className={styles.dropdownItem}>
                  Favoritos
                </Link>
              </div>
            )}
          </div>

          {/* Sacola */}
          <button
            className={styles.cartButton}
            onClick={openDrawer}
            aria-label="Abrir sacola"
          >
            <div className={styles.cartIconWrapper}>
              <BagIcon />
              {itemCount > 0 && (
                <span className={styles.cartBadge}>{itemCount}</span>
              )}
            </div>
            <span className={styles.actionText}>Sacola</span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <SearchBar />
            <nav className={styles.mobileNav}>
              <Link to="/catalog" className={styles.mobileNavLink}>
                Todos os Produtos
              </Link>
              <Link to="/account" className={styles.mobileNavLink}>
                Minha Conta
              </Link>
              <Link to="/orders" className={styles.mobileNavLink}>
                Meus Pedidos
              </Link>
              <Link to="/favorites" className={styles.mobileNavLink}>
                Favoritos
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente da barra de categorias (controlado pelo CMS)
const CategoryBar = () => {
  const { headerCategories, headerSettings } = useCMS();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const megaMenuRef = useRef(null);

  useOutsideClick([megaMenuRef], () => setShowMegaMenu(false));

  const activeCategory = useMemo(() => {
    return headerCategories?.find(cat => cat.id === activeCategoryId) || headerCategories?.[0];
  }, [activeCategoryId, headerCategories]);

  if (!headerCategories?.length) return null;

  return (
    <div className={styles.categoryBar}>
      <div className={styles.categoryContainer}>
        {/* Botão "Todas as categorias" */}
        {headerSettings?.showAllCategoriesButton && (
          <div className={styles.megaMenuWrapper} ref={megaMenuRef}>
            <button
              className={styles.allCategoriesButton}
              onClick={() => setShowMegaMenu(!showMegaMenu)}
              aria-expanded={showMegaMenu}
            >
              Todas as categorias
              <ChevronDownIcon />
            </button>

            {showMegaMenu && (
              <div className={styles.megaMenu}>
                <div className={styles.megaMenuContent}>
                  <div className={styles.categoryColumn}>
                    {headerCategories.map(category => (
                      <button
                        key={category.id}
                        className={`${styles.megaCategoryItem} ${
                          activeCategory?.id === category.id ? styles.active : ''
                        }`}
                        onMouseEnter={() => setActiveCategoryId(category.id)}
                        onClick={() => setActiveCategoryId(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  
                  <div className={styles.subcategoryColumn}>
                    <h4 className={styles.subcategoryTitle}>
                      {activeCategory?.name}
                    </h4>
                    <div className={styles.subcategoryGrid}>
                      {activeCategory?.children?.map(subcategory => (
                        <Link
                          key={subcategory.id}
                          to={`/catalog?category=${encodeURIComponent(subcategory.slug)}`}
                          className={styles.subcategoryLink}
                          onClick={() => setShowMegaMenu(false)}
                        >
                          {subcategory.name}
                        </Link>
                      )) || (
                        <span className={styles.noSubcategories}>
                          Nenhuma subcategoria disponível
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Links diretos das categorias - CONTROLADO PELO CMS */}
        <nav className={styles.categoryNav}>
          {headerCategories.map(category => (
            <Link
              key={category.id}
              to={`/catalog?category=${encodeURIComponent(category.slug)}`}
              className={styles.categoryLink}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Componente principal do Header
const Header = () => {
  return (
    <header className={styles.header}>
      <TopBar />
      <MainHeader />
      <CategoryBar />
    </header>
  );
};

export default Header;