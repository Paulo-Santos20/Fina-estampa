import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useCMS } from '../../../contexts/CMSContext.jsx';
import { useCart } from '../../../contexts/CartContext.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useProducts } from '../../../hooks/useProducts.js';

// --- ÍCONES SVG ---
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
);
const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
);
const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
);

// --- TOP BAR ---
const TopBar = () => {
  const { headerTopAnnouncements, headerSettings } = useCMS();
  if (!headerSettings?.showTopAnnouncements || !headerTopAnnouncements?.[0]) return null;
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarContent}>
        <span className={styles.announcement}>{headerTopAnnouncements[0].text}</span>
      </div>
    </div>
  );
};

// --- SEARCH OVERLAY ---
const SearchOverlay = ({ isOpen, onClose }) => {
  const { products } = useProducts();
  const { getActiveHeaderCategories } = useCMS();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const activeCategories = getActiveHeaderCategories() || [];

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current.focus(), 100);
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return { products: products.slice(0, 4), categories: [] };
    const lowerQuery = query.toLowerCase();
    return {
      products: products.filter(p => p.name.toLowerCase().includes(lowerQuery)).slice(0, 5),
      categories: activeCategories.filter(c => c.name.toLowerCase().includes(lowerQuery)).slice(0, 3)
    };
  }, [query, products, activeCategories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.searchOverlayBackdrop} onClick={onClose}>
      <div className={styles.searchModal} onClick={e => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <div className={styles.searchHeaderTop}>
            <SearchIcon />
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input ref={inputRef} type="text" className={styles.searchInput} placeholder="Buscar..." value={query} onChange={e => setQuery(e.target.value)} />
            </form>
            <button className={styles.closeSearchButton} onClick={onClose}><CloseIcon /></button>
          </div>
          {(query ? suggestions.categories : activeCategories.slice(0, 3)).length > 0 && (
            <div className={styles.searchTags}>
              <span className={styles.tagLabel}>{query ? 'Sugestões' : 'Populares'}</span>
              <div className={styles.tagList}>
                {(query ? suggestions.categories : activeCategories.slice(0, 3)).map(cat => (
                  <button key={cat.id} className={styles.searchTag} onClick={() => { navigate(`/catalog?category=${cat.slug}`); onClose(); }}>{cat.name}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.searchResults}>
          <div className={styles.productGrid}>
            {suggestions.products.map(product => (
              <div key={product.id} className={styles.productCard} onClick={() => { navigate(`/product/${product.id}`); onClose(); }}>
                <div className={styles.productImage}>
                  <img src={product.image || '/placeholder.jpg'} alt={product.name} />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CART DRAWER CORRIGIDO ---
const CartDrawer = ({ isOpen, onClose }) => {
  const context = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { cart, incrementItem, decrementItem, removeItem, subtotal } = context;
  const cartItems = cart || [];

  // Formatação de moeda
  const formatMoney = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val) || 0);
  };

  // Funções de controle
  const handleIncrement = (e, id) => {
    e.preventDefault(); e.stopPropagation();
    incrementItem(id);
  };

  const handleDecrement = (e, id) => {
    e.preventDefault(); e.stopPropagation();
    decrementItem(id);
  };

  const handleRemove = (e, id) => {
    e.preventDefault(); e.stopPropagation();
    removeItem(id);
  };

  // Recalcular quantidade total para o badge do drawer
  const totalCount = cartItems.reduce((acc, item) => {
    const qty = item.quantity || item.qty || 1;
    return acc + Number(qty);
  }, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ''}`}>
        
        <div className={styles.cartHeader}>
          <button className={styles.closeDrawerButton} onClick={onClose}>
            <ChevronRightIcon />
          </button>
          {totalCount > 0 && <span className={styles.cartCountText}>Sacola ({totalCount})</span>}
        </div>

        <div className={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCartState}>
              <h2 className={styles.emptyTitle}>SUA SACOLA ESTÁ VAZIA.</h2>
              {!isLoggedIn() && (
                <p className={styles.emptySubtitle}>
                  Tem uma conta? <Link to="/login" onClick={onClose} className={styles.loginLink}>Entre</Link> para finalizar mais rápido.
                </p>
              )}
              <button className={styles.continueButton} onClick={() => { onClose(); navigate('/catalog'); }}>
                CONTINUAR COMPRANDO
              </button>
            </div>
          ) : (
            <div className={styles.cartItemsList}>
              {cartItems.map((item, index) => {
                // LÓGICA DE DADOS "DEFENSIVA"
                // Tenta pegar o dado da raiz ou de .product
                const productId = item.id || item.product?.id || index;
                const productName = item.name || item.product?.name || item.title || 'Produto sem nome';
                
                // Preço e Quantidade seguros
                const price = Number(item.price || item.product?.price || 0);
                const qty = Number(item.quantity || item.qty || 1);
                
                // Imagem segura
                const imgSource = item.image || item.product?.image || item.images?.[0] || item.product?.images?.[0];

                // Total desta linha específica
                const totalLinePrice = price * qty;

                return (
                  <div key={productId} className={styles.cartItemRow}>
                    <img 
                      src={imgSource} 
                      alt={productName} 
                      className={styles.cartItemImage}
                      onError={(e) => e.target.src = "https://via.placeholder.com/100x120?text=Foto"}
                    />
                    
                    <div className={styles.cartItemInfo}>
                      <p className={styles.cartItemName}>{productName}</p>
                      
                      <div className={styles.cartItemDetails}>
                        {/* Exibe se houver tamanho/cor */}
                        {(item.selectedSize || item.size) && <span>Tam: {item.selectedSize || item.size} </span>}
                        
                        {/* Preço Unitário para referência */}
                        <div className={styles.unitPriceDisplay}>
                          Unitário: {formatMoney(price)}
                        </div>
                      </div>

                      <div className={styles.cartItemControls}>
                        {/* SELETOR DE QUANTIDADE */}
                        <div className={styles.qtySelector}>
                          <button 
                            className={styles.qtyBtn} 
                            onClick={(e) => handleDecrement(e, item.id)}
                            disabled={qty <= 1}
                            type="button"
                          >
                            -
                          </button>
                          
                          {/* Exibe a quantidade atual do item */}
                          <span className={styles.qtyValue}>{qty}</span>
                          
                          <button 
                            className={styles.qtyBtn} 
                            onClick={(e) => handleIncrement(e, item.id)}
                            type="button"
                          >
                            +
                          </button>
                        </div>

                        {/* PREÇO TOTAL DA LINHA (Calculado agora) */}
                        <div style={{textAlign: 'right'}}>
                          <div className={styles.cartItemTotal}>{formatMoney(totalLinePrice)}</div>
                          <button 
                            className={styles.removeItemBtn} 
                            onClick={(e) => handleRemove(e, item.id)}
                            type="button"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className={styles.cartFooter}>
                <div className={styles.cartTotalRow}>
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <button className={styles.checkoutButton} onClick={() => { onClose(); navigate('/checkout'); }}>
                  FINALIZAR COMPRA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// --- MAIN HEADER ---
const MainHeader = () => {
  const context = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const { getActiveHeaderCategories } = useCMS();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Calcula badge com segurança (soma quantidades)
  const cartItems = context.cart || [];
  const badgeCount = cartItems.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = getActiveHeaderCategories() || [];

  return (
    <>
      <div className={styles.mainHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.leftSection}>
            <div className={styles.mobileControls}>
              <button className={styles.iconButton} onClick={() => setMobileMenuOpen(true)}><MenuIcon /></button>
              <button className={styles.iconButton} onClick={() => setSearchOpen(true)}><SearchIcon /></button>
            </div>
            <nav className={styles.desktopNav}>
              {categories.slice(0, 6).map((cat) => (
                <Link key={cat.id} to={`/catalog?category=${cat.slug}`} className={styles.navLink}>{cat.name.toUpperCase()}</Link>
              ))}
            </nav>
          </div>

          <div className={styles.centerSection}>
            <Link to="/" className={styles.logo}>Fina Estampa.</Link>
          </div>

          <div className={styles.rightSection}>
            <button className={`${styles.iconButton} ${styles.desktopOnly}`} onClick={() => setSearchOpen(true)}><SearchIcon /></button>
            
            <button className={styles.iconButton} onClick={() => setCartOpen(true)}>
              <BagIcon />
              {badgeCount > 0 && <span className={styles.cartBadge}>{badgeCount}</span>}
            </button>

            <div className={styles.userContainer} ref={dropdownRef}>
              {isLoggedIn() ? (
                <div className={styles.loggedInWrapper}>
                  <button className={styles.userButton} onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                    Olá, {user?.name?.split(' ')[0]} <ChevronDownIcon />
                  </button>
                  {userDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      <Link to="/dashboard" className={styles.dropdownItem} onClick={() => setUserDropdownOpen(false)}>Minha Conta</Link>
                      <div className={styles.dropdownDivider}></div>
                      <button className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={() => { logout(); setUserDropdownOpen(false); }}>Sair</button>
                    </div>
                  )}
                </div>
              ) : (
                <button className={styles.loginButton} onClick={() => navigate('/login')}>LOGIN</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <button className={styles.closeDrawerButton} onClick={() => setMobileMenuOpen(false)}><CloseIcon /></button>
        </div>
        <nav className={styles.drawerNav}>
          {categories.map((cat) => (
            <Link key={cat.id} to={`/catalog?category=${cat.slug}`} className={styles.drawerLink} onClick={() => setMobileMenuOpen(false)}>{cat.name} <ChevronRightIcon /></Link>
          ))}
          <div className={styles.drawerDivider}></div>
          {!isLoggedIn() && <Link to="/login" className={styles.drawerLink} onClick={() => setMobileMenuOpen(false)}>Login / Cadastrar</Link>}
        </nav>
      </div>
      {mobileMenuOpen && <div className={styles.backdrop} onClick={() => setMobileMenuOpen(false)} />}
    </>
  );
};

const Header = () => (
  <header className={styles.headerWrapper}>
    <TopBar />
    <MainHeader />
  </header>
);

export default Header;