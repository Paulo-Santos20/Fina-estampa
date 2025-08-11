// src/components/CartDrawer/CartDrawer.jsx
import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartDrawer.module.css';
import { useCart } from '../../contexts/CartContext.jsx';

const money = (value) => {
  const n = Number(value) || 0;
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
  } catch {
    // Fallback simples
    return `R$ ${n.toFixed(2).replace('.', ',')}`;
  }
};

const placeholderImg = '/assets/products/placeholder.jpg'; // coloque uma imagem em public/assets/products/placeholder.jpg

const CartDrawer = () => {
  const {
    cart,
    isDrawerOpen,
    closeDrawer,
    clearCart,
    incrementItem,
    decrementItem,
    removeItem,
    subtotal,
  } = useCart();

  const navigate = useNavigate();
  const closeBtnRef = useRef(null);

  // Normaliza itens (evita erro de length)
  const items = useMemo(() => {
    if (Array.isArray(cart)) return cart;
    if (cart && Array.isArray(cart.items)) return cart.items;
    return [];
  }, [cart]);

  const itemsLen = items.length;

  // Bloquear rolagem do <body> quando aberto e focar o botão fechar
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add('no-scroll');
      // Foco acessível
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isDrawerOpen]);

  // Escape para fechar
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDrawerOpen, closeDrawer]);

  const handleOverlayClick = (e) => {
    // fecha apenas se clicar diretamente no overlay
    if (e.target.classList.contains(styles.overlay)) {
      closeDrawer();
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleGoToCart = () => {
    closeDrawer();
    navigate('/cart');
  };

  const handleInc = (it) => {
    incrementItem(it.id, { size: it.size, color: it.color });
  };

  const handleDec = (it) => {
    decrementItem(it.id, { size: it.size, color: it.color });
  };

  const handleRemove = (it) => {
    removeItem(it.id, { size: it.size, color: it.color });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isDrawerOpen ? styles.show : ''}`}
        onMouseDown={handleOverlayClick}
        aria-hidden={!isDrawerOpen}
      />

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartDrawerTitle"
      >
        <header className={styles.header}>
          <h2 id="cartDrawerTitle" className={styles.title}>
            Sua sacola
          </h2>
          <span className={styles.count} aria-live="polite">
            {itemsLen} {itemsLen === 1 ? 'item' : 'itens'}
          </span>
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={closeDrawer}
            aria-label="Fechar sacola"
          >
            ×
          </button>
        </header>

        <div className={styles.content}>
          {itemsLen === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon} aria-hidden="true">👜</div>
              <p>Sua sacola está vazia.</p>
              <button className={styles.primaryBtn} onClick={closeDrawer}>
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className={styles.list} role="list">
              {items.map((it) => {
                const lineTotal = (Number(it.price) || 0) * (Number(it.qty) || 0);
                return (
                  <li key={`${it.id}-${it.size || 's'}-${it.color || 'c'}`} className={styles.item}>
                    <img
                      className={styles.thumb}
                      src={it.image || placeholderImg}
                      alt={it.title || 'Produto'}
                      loading="lazy"
                    />
                    <div className={styles.meta}>
                      <div className={styles.rowTop}>
                        <h3 className={styles.name} title={it.title}>{it.title}</h3>
                        <button
                          className={styles.remove}
                          onClick={() => handleRemove(it)}
                          aria-label={`Remover ${it.title} da sacola`}
                          title="Remover"
                        >
                          Remover
                        </button>
                      </div>

                      <div className={styles.variants}>
                        {it.size ? <span className={styles.badge}>Tam: {String(it.size).toUpperCase()}</span> : null}
                        {it.color ? <span className={styles.badge}>Cor: {String(it.color)}</span> : null}
                      </div>

                      <div className={styles.rowBottom}>
                        <div className={styles.stepper} aria-label="Quantidade">
                          <button
                            className={styles.stepBtn}
                            onClick={() => handleDec(it)}
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span className={styles.qty} aria-live="polite">{it.qty}</span>
                          <button
                            className={styles.stepBtn}
                            onClick={() => handleInc(it)}
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.linePrice} aria-label="Preço total do item">
                          {money(lineTotal)}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className={styles.footer}>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <strong aria-live="polite">{money(subtotal)}</strong>
          </div>
          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={handleGoToCart}>
              Ir para o carrinho
            </button>
            <button className={styles.ghostBtn} onClick={handleClearCart}>
              Limpar carrinho
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
};

export default CartDrawer;