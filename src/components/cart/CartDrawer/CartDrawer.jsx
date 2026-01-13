import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
// Importe o CSS onde você colou as classes acima. 
// Se estiver tudo no Header.module.css, importe de lá.
import styles from '../../common/Header/Header.module.css'; 

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function CartDrawer() {
  const {
    cart,          // Seu array de itens
    isCartOpen,    // Estado de abertura
    closeCart,     // Função para fechar
    itemsCount,    // Quantidade total
    subtotal,      // Valor total (number)
    updateItemQty, // Função (id, novaQtd)
    removeItem,    // Função (id)
  } = useCart();

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Função auxiliar para formatar preço
  const formatPrice = (value) => {
    return typeof value === 'number' 
      ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : 'R$ 0,00';
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={closeCart} />
      <div className={`${styles.cartDrawer} ${isCartOpen ? styles.open : ''}`}>
        
        {/* Header */}
        <div className={styles.cartHeader}>
          <button className={styles.closeDrawerButton} onClick={closeCart}>
            <ChevronRightIcon />
          </button>
          {itemsCount > 0 && <span style={{fontSize: '14px'}}>Sacola ({itemsCount})</span>}
        </div>

        {/* Conteúdo */}
        <div className={styles.cartContent}>
          {(!cart || cart.length === 0) ? (
            // === ESTADO VAZIO ===
            <div className={styles.emptyCartState}>
              <h2 className={styles.emptyTitle}>SUA SACOLA ESTÁ VAZIA</h2>
              
              {!isLoggedIn() && (
                <p className={styles.emptySubtitle}>
                  Tem uma conta? <Link to="/login" onClick={closeCart} className={styles.loginLink}>Entre</Link> para finalizar mais rápido.
                </p>
              )}
              
              <button 
                className={styles.continueButton} 
                onClick={() => { closeCart(); navigate('/catalog'); }}
              >
                CONTINUAR COMPRANDO
              </button>
            </div>
          ) : (
            // === LISTA DE ITENS ===
            <div className={styles.cartItemsList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItemRow}>
                  <img 
                    src={item.image || '/placeholder.jpg'} 
                    alt={item.name} 
                    className={styles.cartItemImage} 
                  />
                  
                  <div className={styles.cartItemInfo}>
                    <p className={styles.cartItemName}>{item.name}</p>
                    <div className={styles.cartItemDetails}>
                      {item.size && <span>Tam: {item.size} </span>}
                      {item.color && <span>| Cor: {item.color}</span>}
                    </div>

                    <div className={styles.cartItemControls}>
                      {/* Seletor de Quantidade */}
                      <div className={styles.qtySelector}>
                        <button 
                          className={styles.qtyBtn}
                          onClick={() => updateItemQty(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button 
                          className={styles.qtyBtn}
                          onClick={() => updateItemQty(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div style={{textAlign: 'right'}}>
                        <div className={styles.cartItemTotal}>
                           {formatPrice((item.price || 0) * item.quantity)}
                        </div>
                        <button 
                          className={styles.removeItemBtn}
                          onClick={() => removeItem(item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer com Totais */}
              <div className={styles.cartFooter}>
                <div className={styles.cartTotalRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <button 
                  className={styles.checkoutButton} 
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                >
                  FINALIZAR COMPRA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}