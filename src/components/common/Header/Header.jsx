import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaSearch, 
  FaHeart, 
  FaShoppingCart, 
  FaBars, 
  FaTimes, 
  FaUser,
  FaTags,
  FaTimes as FaClose
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import CartDrawer from '../../cart/CartDrawer/CartDrawer';
import SearchMenu from '../SearchMenu/SearchMenu';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoBar, setShowPromoBar] = useState(true);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  const { getTotalItems, getTotalPrice } = useCart();

  // Memoizar categorias para evitar recriação desnecessária
  const categories = useMemo(() => [
    { name: 'Vestidos', slug: 'vestidos' },
    { name: 'Blusas & Camisas', slug: 'blusas' },
    { name: 'Calças & Shorts', slug: 'calcas' },
    { name: 'Saias & Macacões', slug: 'saias' },
    { name: 'Acessórios', slug: 'acessorios' },
    { name: 'Calçados', slug: 'calcados' }
  ], []);

  // Memoizar valores do carrinho
  const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);
  const totalPrice = useMemo(() => getTotalPrice(), [getTotalPrice]);

  // Função para formatar preço
  const formatPrice = useCallback((price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }, []);

  // Handlers otimizados com useCallback
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    if (!isMobileMenuOpen) {
      setIsSearchMenuOpen(false);
      setIsCartSidebarOpen(false);
    }
  }, [isMobileMenuOpen]);

  const toggleCartSidebar = useCallback((e) => {
    e.preventDefault();
    setIsCartSidebarOpen(prev => !prev);
    setIsMobileMenuOpen(false);
    setIsSearchMenuOpen(false);
  }, []);

  const closeCartSidebar = useCallback(() => {
    setIsCartSidebarOpen(false);
  }, []);

  const closePromoBar = useCallback(() => {
    setShowPromoBar(false);
  }, []);

  // Handlers para o SearchMenu
  const handleSearchInputFocus = useCallback(() => {
    setIsSearchMenuOpen(true);
    setIsMobileMenuOpen(false);
    setIsCartSidebarOpen(false);
  }, []);

  const handleSearchMenuClose = useCallback(() => {
    setIsSearchMenuOpen(false);
  }, []);

  const handleSearchQueryChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  // Função de busca que também fecha o SearchMenu
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = `/busca?q=${encodeURIComponent(searchQuery.trim())}`;
      navigate(searchUrl);
      setSearchQuery('');
      setIsSearchMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [searchQuery, navigate]);

  // Função para navegar para categoria
  const navigateToCategory = useCallback((categorySlug, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const targetPath = `/categoria/${categorySlug}`;
    setIsMobileMenuOpen(false);
    setIsSearchMenuOpen(false);
    navigate(targetPath, { replace: false });
  }, [navigate]);

  // Verificar se link está ativo
  const isActiveCategory = useCallback((categorySlug) => {
    return location.pathname === `/categoria/${categorySlug}`;
  }, [location.pathname]);

  return (
    <>
      {/* Barra de Comunicados/Promoções */}
      {showPromoBar && (
        <div className={styles.promoBar}>
          <div className={styles.promoContent}>
            <FaTags className={styles.promoIcon} />
            <span className={styles.promoText}>
              🎉 FRETE GRÁTIS para compras acima de R\$ 199,90 | Use o cupom: FINAFRETE
            </span>
            <button 
              className={styles.closePromo} 
              onClick={closePromoBar}
              aria-label="Fechar comunicado"
            >
              <FaClose />
            </button>
          </div>
        </div>
      )}

      <header className={styles.header}>
        {/* Seção Principal do Header */}
        <div className={styles.mainHeader}>
          <div className={styles.container}>
            {/* Menu Hambúrguer Mobile - PRIMEIRO */}
            <button 
              className={styles.mobileMenuButton} 
              onClick={toggleMobileMenu} 
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo com Imagem */}
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <img 
                  src="/logo-fina-estampa.png" 
                  alt="Fina Estampa" 
                  className={styles.logoImage}
                  onError={(e) => {
                    // Fallback para texto se a imagem não carregar
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.logoText} style={{ display: 'none' }}>
                  <span className={styles.logoTextPrimary}>Fina</span>
                  <span className={styles.logoTextAccent}>Estampa</span>
                </div>
              </Link>
            </div>

            {/* Barra de Pesquisa - Desktop */}
            <div className={`${styles.searchSection} ${styles.searchContainer} ${styles.desktopOnly}`}>
              <form className={styles.searchForm} onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Buscar por produtos, marcas ou categorias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchInputFocus}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton} aria-label="Pesquisar">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Ações do Usuário */}
            <div className={styles.userActions}>
              {/* Login - Desktop */}
              <Link to="/login" className={`${styles.actionButton} ${styles.desktopOnly}`} aria-label="Minha Conta">
                <FaUser />
                <span className={styles.actionText}>Entrar</span>
              </Link>
              
              {/* Favoritos - Desktop */}
              <button className={`${styles.actionButton} ${styles.desktopOnly}`} aria-label="Meus Favoritos">
                <FaHeart />
                <span className={styles.actionText}>Favoritos</span>
              </button>
              
              {/* Carrinho */}
              <button 
                className={styles.cartButton} 
                onClick={toggleCartSidebar}
                aria-label="Meu Carrinho"
              >
                <div className={styles.cartIconWrapper}>
                  <FaShoppingCart className={styles.cartIcon} />
                  {totalItems > 0 && (
                    <span className={styles.cartCount}>{totalItems}</span>
                  )}
                </div>
                <div className={`${styles.cartTextWrapper} ${styles.desktopOnly}`}>
                  <span className={styles.cartLabel}>Carrinho</span>
                  {totalItems > 0 && (
                    <span className={styles.cartTotal}>{formatPrice(totalPrice)}</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa Mobile - NOVA SEÇÃO */}
        <div className={`${styles.mobileSearchSection} ${styles.mobileOnly}`}>
          <div className={styles.container}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchInputFocus}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton} aria-label="Pesquisar">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>

        {/* Navegação de Categorias - Desktop */}
        <nav className={`${styles.categoryNav} ${styles.desktopOnly}`}>
          <div className={styles.container}>
            <ul className={styles.categoryList}>
              {categories.map((category) => (
                <li key={category.slug} className={styles.categoryItem}>
                  <button
                    type="button"
                    onClick={(e) => navigateToCategory(category.slug, e)}
                    className={`${styles.categoryLink} ${
                      isActiveCategory(category.slug) ? styles.active : ''
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Menu Mobile Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <div className={styles.mobileMenuLogo}>
            <img 
              src="/logo-fina-estampa.png" 
              alt="Fina Estampa" 
              className={styles.logoImageMobile}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className={styles.logoText} style={{ display: 'none' }}>
              <span className={styles.logoTextPrimary}>Fina</span>
              <span className={styles.logoTextAccent}>Estampa</span>
            </div>
          </div>
          <button 
            className={styles.closeMobileMenu} 
            onClick={toggleMobileMenu} 
            aria-label="Fechar menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.mobileMenuContent}>
          {/* Ações do Usuário Mobile */}
          <div className={styles.mobileUserActions}>
            <Link 
              to="/login" 
              className={styles.mobileActionLink} 
              onClick={toggleMobileMenu}
            >
              <FaUser /> Minha Conta
            </Link>
            <Link 
              to="/favoritos" 
              className={styles.mobileActionLink} 
              onClick={toggleMobileMenu}
            >
              <FaHeart /> Meus Favoritos
            </Link>
          </div>

          {/* Categorias Mobile */}
          <nav className={styles.mobileCategoryNav}>
            <h3 className={styles.mobileNavTitle}>Categorias</h3>
            <ul className={styles.mobileCategoryList}>
              {categories.map((category) => (
                <li key={category.slug} className={styles.mobileCategoryItem}>
                  <button 
                    type="button"
                    onClick={(e) => navigateToCategory(category.slug, e)}
                    className={`${styles.mobileCategoryLink} ${
                      isActiveCategory(category.slug) ? styles.active : ''
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Links Adicionais Mobile */}
          <div className={styles.mobileExtraLinks}>
            <Link 
              to="/sobre" 
              className={styles.mobileExtraLink} 
              onClick={toggleMobileMenu}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contato" 
              className={styles.mobileExtraLink} 
              onClick={toggleMobileMenu}
            >
              Contato
            </Link>
          </div>
        </div>
      </div>

      {/* SearchMenu */}
      <SearchMenu
        isOpen={isSearchMenuOpen}
        onClose={handleSearchMenuClose}
        searchQuery={searchQuery}
        onSearchChange={handleSearchQueryChange}
      />

      {/* Cart Sidebar */}
      <CartDrawer 
        isOpen={isCartSidebarOpen} 
        onClose={closeCartSidebar} 
      />
    </>
  );
};

export default Header;