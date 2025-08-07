import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
  FaTags,
  FaTimes as FaClose,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaChevronDown,
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import CartDrawer from '../../cart/CartDrawer/CartDrawer';
import SearchMenu from '../SearchMenu/SearchMenu';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems, getTotalPrice } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoBar, setShowPromoBar] = useState(true);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

  // Estado para controlar a visibilidade do SearchMenu (overlay)
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  // NOVO: Estado para controlar a abertura/fechamento do dropdown do usuário
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Referência para o BOTÃO que abre o dropdown (para calcular sua posição)
  const userDropdownTriggerRef = useRef(null);
  // Referência para o CONTEÚDO do dropdown (para detectar cliques fora)
  const userDropdownContentRef = useRef(null);

  // Estado para armazenar as propriedades de estilo do portal (top, left, transform, zIndex)
  // Removendo 'visibility' e 'opacity' daqui, pois serão controlados por classe CSS.
  const [dropdownPortalStyle, setDropdownPortalStyle] = useState({});

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
    if (!isMobileMenuOpen && isSearchMenuOpen) {
      setIsSearchMenuOpen(false);
    }
  }, [isMobileMenuOpen, isSearchMenuOpen]);

  // Handler para o dropdown do usuário (clicável)
  const toggleUserDropdown = useCallback(() => {
    setIsUserDropdownOpen(prev => !prev);
  }, []);

  const toggleCartSidebar = useCallback((e) => {
    e.preventDefault();
    setIsCartSidebarOpen(prev => !prev);
  }, []);

  const closeCartSidebar = useCallback(() => {
    setIsCartSidebarOpen(false);
  }, []);

  const closePromoBar = useCallback(() => {
    setShowPromoBar(false);
  }, []);

  // Handlers para o SearchMenu overlay
  const handleSearchInputFocus = useCallback(() => {
    setIsSearchMenuOpen(true);
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
      setIsSearchMenuOpen(false); // Fecha o SearchMenu após a busca
      if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Fecha o menu mobile se a busca foi acionada por ele
    }
  }, [searchQuery, navigate, isMobileMenuOpen]);

  // Handler de Logout
  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false); // Fecha o dropdown ao fazer logout
  }, [logout, navigate]);

  // Função para navegar para categoria
  const navigateToCategory = useCallback((categorySlug, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const targetPath = `/categoria/${categorySlug}`;
    setIsMobileMenuOpen(false);
    navigate(targetPath, { replace: false });
  }, [navigate]);

  // Verificar se link de categoria está ativo
  const isActiveCategory = useCallback((categorySlug) => {
    return location.pathname === `/categoria/${categorySlug}`;
  }, [location.pathname]);

  // Efeito para calcular a posição do dropdown quando ele for aberto ou o layout mudar
  // Este useEffect só calcula a posição, não a visibilidade/opacidade
  useEffect(() => {
    if (isUserDropdownOpen && userDropdownTriggerRef.current) {
      const rect = userDropdownTriggerRef.current.getBoundingClientRect();
      setDropdownPortalStyle({
        position: 'fixed', // Posiciona o elemento em relação à viewport
        top: rect.bottom + window.scrollY + 8, // 8px de margem abaixo do botão, considerando o scroll
        left: rect.left + rect.width / 2, // Centraliza horizontalmente sobre o botão
        transform: 'translateX(-50%)', // Ajusta para centralização exata
        zIndex: 1005, // Um z-index alto para garantir que ele sobreponha outros elementos
      });
    }
  }, [isUserDropdownOpen]); // Recalcula a posição sempre que o dropdown abre/fecha

  // Efeito para fechar o dropdown do usuário ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownTriggerRef.current && !userDropdownTriggerRef.current.contains(event.target) &&
          userDropdownContentRef.current && !userDropdownContentRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);


  return (
    <>
      {/* Barra de Comunicados/Promoções */}
      {showPromoBar && (
        <div className={styles.promoBar}>
          <div className={styles.promoContent}>
            <FaTags className={styles.promoIcon} />
            <span className={styles.promoText}>
               FRETE GRÁTIS para compras acima de R\$ 199,90 | Use o cupom: FINAFRETE
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
            {/* Logo */}
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <span className={styles.logoText}>Fina</span>
                <span className={styles.logoAccent}>Estampa</span>
              </Link>
            </div>

            {/* Barra de Pesquisa (Desktop) */}
            <div className={`${styles.searchSection} ${styles.searchContainer}`}>
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
              {/* Carrinho com sidebar */}
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
                <div className={styles.cartTextWrapper}>
                  <span className={styles.cartLabel}>Carrinho</span>
                  {totalItems > 0 && (
                    <span className={styles.cartTotal}>{formatPrice(totalPrice)}</span>
                  )}
                </div>
              </button>

              {/* Login/Usuário Logado - POSICIONADO DEPOIS DO CARRINHO */}
              {isAuthenticated ? (
                <div className={styles.dropdown}>
                  <button
                    className={styles.actionButton}
                    onClick={toggleUserDropdown}
                    ref={userDropdownTriggerRef}
                  >
                    <FaUserCircle />
                    <span className={styles.actionText}>Olá, {user?.name?.split(' ')[0]}</span>
                    <FaChevronDown className={`${styles.dropdownArrow} ${isUserDropdownOpen ? styles.arrowOpen : ''}`} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className={styles.actionButton} aria-label="Minha Conta">
                  <FaUser />
                  <span className={styles.actionText}>Entrar</span>
                </Link>
              )}

              {/* Menu Hambúrguer para Mobile (visível apenas no mobile via CSS) */}
              <button
                className={styles.mobileMenuButton}
                onClick={toggleMobileMenu}
                aria-label="Abrir menu"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Navegação de Categorias (Barra Inferior) */}
        <nav className={styles.categoryNav}>
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

      {/* Renderiza o conteúdo do dropdown em um PORTAL quando isUserDropdownOpen for true */}
      {isUserDropdownOpen && ReactDOM.createPortal(
        <div
          // Aplicamos a classe 'active' para controlar a visibilidade e transição
          className={`${styles.dropdownContentPortal} ${isUserDropdownOpen ? styles.active : ''}`}
          style={{ // Apenas estilos de posicionamento (fixed, top, left, transform, zIndex)
            position: dropdownPortalStyle.position,
            top: dropdownPortalStyle.top,
            left: dropdownPortalStyle.left,
            transform: dropdownPortalStyle.transform,
            zIndex: dropdownPortalStyle.zIndex,
          }}
          ref={userDropdownContentRef}
        >
          <Link to="/dashboard" onClick={() => setIsUserDropdownOpen(false)}><FaTachometerAlt /> Dashboard</Link>
          <button onClick={handleLogout}><FaSignOutAlt /> Sair</button>
        </div>,
        document.body
      )}

      {/* Menu Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuHeader}>
            <div className={styles.mobileMenuLogo}>
              <span className={styles.logoText}>Fina</span>
              <span className={styles.logoAccent}>Estampa</span>
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
            {/* Busca Mobile */}
            <div className={styles.mobileSearch}>
              <form className={styles.searchForm} onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Ações do Usuário Mobile (sem favoritos) */}
            <div className={styles.mobileUserActions}>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className={styles.mobileActionLink} onClick={toggleMobileMenu}>
                    <FaTachometerAlt /> Dashboard
                  </Link>
                  <button className={styles.mobileActionLink} onClick={handleLogout}>
                    <FaSignOutAlt /> Sair
                  </button>
                </>
              ) : (
                <Link to="/login" className={styles.mobileActionLink} onClick={toggleMobileMenu}>
                  <FaUser /> Minha Conta
                </Link>
              )}

              {/* Botão de Carrinho no menu mobile */}
              <button
                className={styles.mobileActionLink}
                onClick={() => {
                  toggleMobileMenu();
                  setIsCartSidebarOpen(true);
                }}
              >
                <div className={styles.mobileCartInfo}>
                  <FaShoppingCart />
                  <span>Carrinho</span>
                  {totalItems > 0 && (
                    <div className={styles.mobileCartDetails}>
                      <span className={styles.mobileCartCount}>
                        ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                      </span>
                      <span className={styles.mobileCartTotal}>{formatPrice(totalPrice)}</span>
                    </div>
                  )}
                </div>
              </button>
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
                to="/about"
                className={styles.mobileExtraLink}
                onClick={toggleMobileMenu}
              >
                Sobre Nós
              </Link>
              <Link
                to="/contact"
                className={styles.mobileExtraLink}
                onClick={toggleMobileMenu}
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SearchMenu - Importante: fica FORA do <header> */}
      <SearchMenu
        isOpen={isSearchMenuOpen}
        onClose={handleSearchMenuClose}
        searchQuery={searchQuery}
        onSearchChange={handleSearchQueryChange}
        onSearchSubmit={handleSearch}
      />

      {/* Cart Sidebar - Importante: fica FORA do <header> */}
      <CartDrawer
        isOpen={isCartSidebarOpen}
        onClose={closeCartSidebar}
      />
    </>
  );
};

export default Header;