// src/components/common/Header/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useCMS } from '../../../contexts/CMSContext.jsx';
import { useCart } from '../../../contexts/CartContext.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
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

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
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

// Componente da barra superior com anúncio (controlado pelo CMS)
const TopBar = () => {
  const { headerTopAnnouncements, headerSettings } = useCMS();

  if (!headerSettings || !headerSettings.showTopAnnouncements || !headerTopAnnouncements || !headerTopAnnouncements[0]) {
    return null;
  }

  const announcement = headerTopAnnouncements[0];

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

// Componente de busca com sugestões (barra maior) - CORRIGIDO
const SearchBar = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { getActiveHeaderCategories } = useCMS();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchRef = useRef(null);

  const activeCategories = getActiveHeaderCategories();

  useOutsideClick([searchRef], () => {
    setShowSuggestions(false);
    setIsInputFocused(false);
  });

  // Filtrar sugestões baseadas na query
  const suggestions = useMemo(() => {
    if (!query.trim()) return { categories: [], products: [] };

    const searchTerm = query.toLowerCase().trim();
    
    // Filtrar categorias
    const categoryMatches = (activeCategories || [])
      .filter(cat => cat.name.toLowerCase().includes(searchTerm))
      .slice(0, 3);

    // Filtrar produtos
    const productMatches = (products || [])
      .filter(product => 
        (product.name && product.name.toLowerCase().includes(searchTerm)) ||
        (product.title && product.title.toLowerCase().includes(searchTerm)) ||
        (product.category && product.category.toLowerCase().includes(searchTerm))
      )
      .slice(0, 6);

    return { categories: categoryMatches, products: productMatches };
  }, [query, activeCategories, products]);

  // Mostrar sugestões sempre que há query e input está focado
  useEffect(() => {
    if (isInputFocused && query.trim()) {
      setShowSuggestions(true);
    } else if (!query.trim()) {
      setShowSuggestions(false);
    }
  }, [query, isInputFocused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setIsInputFocused(false);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Se há texto e input está focado, mostrar sugestões
    if (newQuery.trim() && isInputFocused) {
      setShowSuggestions(true);
    } else if (!newQuery.trim()) {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    // Se já há texto, mostrar sugestões imediatamente
    if (query.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = (e) => {
    // Pequeno delay para permitir cliques nas sugestões
    setTimeout(() => {
      // Verificar se o foco não foi para dentro do container de sugestões
      if (searchRef.current && !searchRef.current.contains(document.activeElement)) {
        setIsInputFocused(false);
        setShowSuggestions(false);
      }
    }, 150);
  };

  const handleSuggestionClick = (type, item) => {
    setShowSuggestions(false);
    setIsInputFocused(false);
    setQuery('');
    
    if (type === 'category') {
      navigate(`/catalog?category=${encodeURIComponent(item.slug)}`);
    } else if (type === 'product') {
      navigate(`/product/${item.id}`);
    }
  };

  const handleViewAllClick = () => {
    navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
    setShowSuggestions(false);
    setIsInputFocused(false);
  };

  // Determinar se deve mostrar sugestões
  const shouldShowSuggestions = showSuggestions && 
    isInputFocused && 
    query.trim() && 
    (suggestions.categories.length > 0 || suggestions.products.length > 0);

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <SearchIcon />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Buscar por vestidos, blusas, coleções..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          aria-label="Buscar produtos"
          autoComplete="off"
        />
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>

      {/* Sugestões com imagens dos produtos */}
      {shouldShowSuggestions && (
        <div className={styles.suggestionsPanel}>
          {suggestions.categories.length > 0 && (
            <div className={styles.suggestionSection}>
              <h4 className={styles.sectionTitle}>Categorias</h4>
              <div className={styles.categoryList}>
                {suggestions.categories.map(category => (
                  <button
                    key={category.id}
                    className={styles.categoryItem}
                    onMouseDown={(e) => e.preventDefault()} // Previne blur do input
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
                    onMouseDown={(e) => e.preventDefault()} // Previne blur do input
                    onClick={() => handleSuggestionClick('product', product)}
                  >
                    <div className={styles.productImage}>
                      <img
                        src={product.image || '/assets/products/placeholder.jpg'}
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
              onMouseDown={(e) => e.preventDefault()} // Previne blur do input
              onClick={handleViewAllClick}
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
  const { user, isLoggedIn, logout } = useAuth();
  const { getLogo } = useCMS();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const accountRef = useRef(null);

  const logoConfig = getLogo();

  useOutsideClick([accountRef], () => setShowAccountMenu(false));

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  const renderLogo = () => {
    if (logoConfig.type === 'text' || logoError) {
      return (
        <span className={styles.logoText}>
          <span className={styles.logoMain}>Fina</span>
          <span className={styles.logoAccent}>Estampa</span>
        </span>
      );
    }

    return (
      <>
        <img
          src={logoConfig.src}
          alt={logoConfig.alt || 'Fina Estampa'}
          style={{
            width: `${logoConfig.width}px`,
            height: `${logoConfig.height}px`,
            objectFit: 'contain'
          }}
          className={styles.logoImage}
          onError={handleLogoError}
        />
        {/* Fallback text logo (hidden by default) */}
        <span className={styles.logoText} style={{ display: 'none' }}>
          <span className={styles.logoMain}>Fina</span>
          <span className={styles.logoAccent}>Estampa</span>
        </span>
      </>
    );
  };

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

        {/* Logo - DINÂMICO BASEADO NO CMS */}
        <Link to="/" className={styles.logo}>
          {renderLogo()}
        </Link>

        {/* Busca - MAIOR */}
        <SearchBar />

        {/* Ações do usuário */}
        <div className={styles.userActions}>
          {/* Conta com dropdown - CONDICIONAL */}
          {isLoggedIn() ? (
            // Usuário logado - mostrar dropdown com opções
            <div className={styles.accountDropdown} ref={accountRef}>
              <button
                className={styles.actionButton}
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                aria-expanded={showAccountMenu}
              >
                <UserIcon />
                <span className={styles.actionText}>
                  Olá, {(user && user.name && user.name.split(' ')[0]) || 'Usuário'}
                </span>
                <ChevronDownIcon />
              </button>

              {showAccountMenu && (
                <div className={styles.dropdownMenu}>
                  <Link 
                    to="/dashboard" 
                    className={styles.dropdownItem}
                    onClick={() => setShowAccountMenu(false)}
                  >
                    Minha Conta
                  </Link>
                  <Link 
                    to="/orders" 
                    className={styles.dropdownItem}
                    onClick={() => setShowAccountMenu(false)}
                  >
                    Meus Pedidos
                  </Link>
                  <Link 
                    to="/favorites" 
                    className={styles.dropdownItem}
                    onClick={() => setShowAccountMenu(false)}
                  >
                    Favoritos
                  </Link>
                  <hr className={styles.dropdownDivider} />
                  <button 
                    onClick={handleLogout}
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  >
                    <LogoutIcon />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Usuário não logado - botão direto para login
            <button
              className={styles.actionButton}
              onClick={handleLoginClick}
            >
              <UserIcon />
              <span className={styles.actionText}>Entrar</span>
            </button>
          )}

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
              {isLoggedIn() ? (
                <>
                  <Link to="/dashboard" className={styles.mobileNavLink}>
                    Minha Conta
                  </Link>
                  <Link to="/orders" className={styles.mobileNavLink}>
                    Meus Pedidos
                  </Link>
                  <Link to="/favorites" className={styles.mobileNavLink}>
                    Favoritos
                  </Link>
                  <button onClick={handleLogout} className={styles.mobileNavLink}>
                    Sair
                  </button>
                </>
              ) : (
                <Link to="/login" className={styles.mobileNavLink}>
                  Entrar
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente da barra de categorias (controlado pelo CMS)
const CategoryBar = () => {
  const { getActiveHeaderCategories, headerSettings } = useCMS();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const megaMenuRef = useRef(null);

  const activeCategories = getActiveHeaderCategories();

  useOutsideClick([megaMenuRef], () => setShowMegaMenu(false));

  const activeCategory = useMemo(() => {
    if (activeCategories && activeCategories.length > 0) {
      return activeCategories.find(cat => cat.id === activeCategoryId) || activeCategories[0];
    }
    return null;
  }, [activeCategoryId, activeCategories]);

  if (!activeCategories || activeCategories.length === 0) return null;

  return (
    <div className={styles.categoryBar}>
      <div className={styles.categoryContainer}>
        {/* Botão "Todas as categorias" */}
        {headerSettings && headerSettings.showAllCategoriesButton && (
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
                    {activeCategories.map(category => (
                      <button
                        key={category.id}
                        className={`${styles.megaCategoryItem} ${
                          activeCategory && activeCategory.id === category.id ? styles.active : ''
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
                      {activeCategory ? activeCategory.name : ''}
                    </h4>
                    <div className={styles.subcategoryGrid}>
                      {activeCategory && activeCategory.children && activeCategory.children.length > 0 ? (
                        activeCategory.children.map(subcategory => (
                          <Link
                            key={subcategory.id}
                            to={`/catalog?category=${encodeURIComponent(subcategory.slug)}`}
                            className={styles.subcategoryLink}
                            onClick={() => setShowMegaMenu(false)}
                          >
                            {subcategory.name}
                          </Link>
                        ))
                      ) : (
                        <span className={styles.noSubcategories}>
                          Explore todos os produtos desta categoria
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Links diretos das categorias - DINÂMICO DO CMS */}
        <nav className={styles.categoryNav}>
          {activeCategories.map(category => (
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