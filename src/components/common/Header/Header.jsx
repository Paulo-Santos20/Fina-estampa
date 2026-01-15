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
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
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
            {suggestions.products.map(product => {
              const imgSource = product.image || (product.images && product.images[0]) || '/placeholder.jpg';
              return (
                <div key={product.id} className={styles.productCard} onClick={() => { navigate(`/product/${product.id}`); onClose(); }}>
                  <div className={styles.productImage}>
                    <img 
                      src={imgSource} 
                      alt={product.name} 
                      onError={(e) => e.target.src = "https://via.placeholder.com/100x120?text=Foto"}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.productPrice}>R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CART DRAWER ---
const CartDrawer = ({ isOpen, onClose }) => {
  const context = useCart();
  
  // CORREÇÃO: Usar isAuthenticated (boolean) ao invés de isLoggedIn (function)
  const { isAuthenticated } = useAuth(); 
  
  const navigate = useNavigate();

  const { cart, incrementItem, decrementItem, removeItem, subtotal } = context;
  const cartItems = cart || [];

  const formatMoney = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val) || 0);

  const handleIncrement = (e, id) => { e.preventDefault(); e.stopPropagation(); if(incrementItem) incrementItem(id); };
  const handleDecrement = (e, id) => { e.preventDefault(); e.stopPropagation(); if(decrementItem) decrementItem(id); };
  const handleRemove = (e, id) => { e.preventDefault(); e.stopPropagation(); if(removeItem) removeItem(id); };

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
          <button className={styles.closeDrawerButton} onClick={onClose}><ChevronRightIcon /></button>
          {totalCount > 0 && <span className={styles.cartCountText}>Sacola ({totalCount})</span>}
        </div>
        <div className={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCartState}>
              <h2 className={styles.emptyTitle}>SUA SACOLA ESTÁ VAZIA</h2>
              {/* CORREÇÃO: Verificação booleana direta */}
              {!isAuthenticated && <p className={styles.emptySubtitle}>Tem uma conta? <Link to="/login" onClick={onClose} className={styles.loginLink}>Entre</Link> para finalizar mais rápido.</p>}
              <button className={styles.continueButton} onClick={() => { onClose(); navigate('/catalog'); }}>CONTINUAR COMPRANDO</button>
            </div>
          ) : (
            <div className={styles.cartItemsList}>
              {cartItems.map((item, index) => {
                const itemId = item.id || (item.product ? item.product.id : index);
                const productName = item.name || item.title || (item.product ? (item.product.name || item.product.title) : 'Produto');
                const imgSource = item.image || (item.images && item.images[0]) || (item.product ? (item.product.image || (item.product.images && item.product.images[0])) : null);
                const price = Number(item.price || (item.product ? item.product.price : 0));
                const qty = Number(item.quantity || item.qty || 1);
                const totalLinePrice = price * qty;

                return (
                  <div key={itemId} className={styles.cartItemRow}>
                    <img src={imgSource} alt={productName} className={styles.cartItemImage} onError={(e) => e.target.src = "https://via.placeholder.com/100x120?text=Foto"} />
                    <div className={styles.cartItemInfo}>
                      <p className={styles.cartItemName}>{productName}</p>
                      <div className={styles.cartItemDetails}>
                        {(item.selectedSize || item.size) && <span>Tam: {item.selectedSize || item.size} </span>}
                        <div className={styles.unitPriceDisplay}>Unitário: {formatMoney(price)}</div>
                      </div>
                      <div className={styles.cartItemControls}>
                        <div className={styles.qtySelector}>
                          <button className={styles.qtyBtn} onClick={(e) => handleDecrement(e, item.id)} disabled={qty <= 1} type="button">-</button>
                          <span className={styles.qtyValue}>{qty}</span>
                          <button className={styles.qtyBtn} onClick={(e) => handleIncrement(e, item.id)} type="button">+</button>
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <div className={styles.cartItemTotal}>{formatMoney(totalLinePrice)}</div>
                          <button className={styles.removeItemBtn} onClick={(e) => handleRemove(e, item.id)} type="button">Remover</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={styles.cartFooter}>
                <div className={styles.cartTotalRow}><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
                <button className={styles.checkoutButton} onClick={() => { onClose(); navigate('/checkout'); }}>FINALIZAR COMPRA</button>
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
  
  // CORREÇÃO: Usar isAuthenticated (boolean) ao invés de isLoggedIn
  const { user, isAuthenticated, logout } = useAuth();
  
  const { getActiveHeaderCategories } = useCMS();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
          
          {/* ESQUERDA: Controles Mobile + Nav Desktop */}
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

          {/* CENTRO: Logo */}
          <div className={styles.centerSection}>
            <Link to="/" className={styles.logo}>Fina Estampa.</Link>
          </div>

          {/* DIREITA: Ícones */}
          <div className={styles.rightSection}>
            <button className={`${styles.iconButton} ${styles.desktopOnly}`} onClick={() => setSearchOpen(true)}><SearchIcon /></button>
            
            <button className={styles.iconButton} onClick={() => setCartOpen(true)}>
              <BagIcon />
              {badgeCount > 0 && <span className={styles.cartBadge}>{badgeCount}</span>}
            </button>

            {/* Container do Usuário (SÓ DESKTOP) */}
            <div className={styles.userContainer} ref={dropdownRef}>
              {/* CORREÇÃO: Verificação booleana direta */}
              {isAuthenticated ? (
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

      {/* --- MOBILE DRAWER (Menu Lateral) --- */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <button className={styles.closeDrawerButton} onClick={() => setMobileMenuOpen(false)}><CloseIcon /></button>
        </div>
        
        <nav className={styles.drawerNav}>
          {/* Links das Categorias */}
          <div className={styles.drawerLinksContainer}>
            {categories.map((cat) => (
              <Link key={cat.id} to={`/catalog?category=${cat.slug}`} className={styles.drawerLink} onClick={() => setMobileMenuOpen(false)}>
                {cat.name} <ChevronRightIcon />
              </Link>
            ))}
          </div>
          
          <div className={styles.drawerDivider}></div>
          
          {/* SEÇÃO DE USUÁRIO (MOBILE) - NO FINAL */}
          <div className={styles.mobileUserSection}>
            {/* CORREÇÃO: Verificação booleana direta */}
            {isAuthenticated ? (
              <>
                <div className={styles.mobileUserHeader}>
                  <span className={styles.mobileUserName}>Olá, {user?.name?.split(' ')[0]}</span>
                </div>
                <Link to="/dashboard" className={styles.drawerLink} onClick={() => setMobileMenuOpen(false)}>
                  Minha Conta
                </Link>
                <button className={`${styles.drawerLink} ${styles.mobileLogout}`} onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Sair da conta
                </button>
              </>
            ) : (
              <Link to="/login" className={styles.drawerLink} onClick={() => setMobileMenuOpen(false)}>
                <div className={styles.mobileLoginRow}>
                  <UserIcon />
                  <span>Entrar / Cadastrar</span>
                </div>
              </Link>
            )}
          </div>
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