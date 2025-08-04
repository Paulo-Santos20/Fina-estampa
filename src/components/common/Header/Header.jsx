import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoBar, setShowPromoBar] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar lógica de busca
      console.log('Buscando por:', searchQuery);
    }
  };

  const closePromoBar = () => {
    setShowPromoBar(false);
  };

  // Categorias principais
  const categories = [
    { name: 'Vestidos', path: '/categoria/vestidos' },
    { name: 'Blusas & Camisas', path: '/categoria/blusas' },
    { name: 'Calças & Shorts', path: '/categoria/calcas' },
    { name: 'Saias & Macacões', path: '/categoria/saias' },
    { name: 'Acessórios', path: '/categoria/acessorios' },
    { name: 'Coleções Especiais', path: '/categoria/colecoes' }
  ];

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
            {/* Logo */}
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <span className={styles.logoText}>Fina</span>
                <span className={styles.logoAccent}>Estampa</span>
              </Link>
            </div>

            {/* Barra de Pesquisa */}
            <div className={styles.searchSection}>
              <form className={styles.searchForm} onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Buscar por produtos, marcas ou categorias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton} aria-label="Pesquisar">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Ações do Usuário */}
            <div className={styles.userActions}>
              <Link to="/login" className={styles.actionButton} aria-label="Minha Conta">
                <FaUser />
                <span className={styles.actionText}>Entrar</span>
              </Link>
              
              <button className={styles.actionButton} aria-label="Meus Favoritos">
                <FaHeart />
                <span className={styles.actionText}>Favoritos</span>
              </button>
              
              <Link to="/carrinho" className={styles.actionButton} aria-label="Meu Carrinho">
                <div className={styles.cartWrapper}>
                  <FaShoppingCart />
                  <span className={styles.cartCount}>2</span>
                </div>
                <span className={styles.actionText}>Carrinho</span>
              </Link>

              {/* Menu Hambúrguer para Mobile */}
              <button 
                className={styles.mobileMenuButton} 
                onClick={toggleMobileMenu} 
                aria-label="Abrir menu"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>

        {/* Navegação de Categorias */}
        <nav className={styles.categoryNav}>
          <div className={styles.container}>
            <ul className={styles.categoryList}>
              {categories.map((category, index) => (
                <li key={index} className={styles.categoryItem}>
                  <Link to={category.path} className={styles.categoryLink}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

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

            {/* Ações do Usuário Mobile */}
            <div className={styles.mobileUserActions}>
              <Link to="/login" className={styles.mobileActionLink} onClick={toggleMobileMenu}>
                <FaUser /> Minha Conta
              </Link>
              <Link to="/favoritos" className={styles.mobileActionLink} onClick={toggleMobileMenu}>
                <FaHeart /> Meus Favoritos
              </Link>
              <Link to="/carrinho" className={styles.mobileActionLink} onClick={toggleMobileMenu}>
                <FaShoppingCart /> Carrinho (2)
              </Link>
            </div>

            {/* Categorias Mobile */}
            <nav className={styles.mobileCategoryNav}>
              <h3 className={styles.mobileNavTitle}>Categorias</h3>
              <ul className={styles.mobileCategoryList}>
                {categories.map((category, index) => (
                  <li key={index} className={styles.mobileCategoryItem}>
                    <Link 
                      to={category.path} 
                      className={styles.mobileCategoryLink}
                      onClick={toggleMobileMenu}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Links Adicionais Mobile */}
            <div className={styles.mobileExtraLinks}>
              <Link to="/sobre" className={styles.mobileExtraLink} onClick={toggleMobileMenu}>
                Sobre Nós
              </Link>
              <Link to="/contato" className={styles.mobileExtraLink} onClick={toggleMobileMenu}>
                Contato
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;