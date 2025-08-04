import React, { useEffect } from 'react';
import { FaTimes, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    cartItems = [],
    removeFromCart, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice,
    clearCart 
  } = useCart() || {};

  // Fechar drawer com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'R\$ 0,00';
    }
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleQuantityChange = (productId, size, color, newQuantity) => {
    if (!updateQuantity || !removeFromCart) return;

    if (newQuantity <= 0) {
      removeFromCart(productId, size, color);
    } else {
      updateQuantity(productId, size, color, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    try {
      const message = `🛍️ *NOVO PEDIDO - FINA ESTAMPA*\n\n`;
      const itemsText = cartItems.map(item => 
        `• ${item.name || 'Produto'} - Tam: ${item.size || 'N/A'} - Cor: ${item.color || 'N/A'} - Qtd: ${item.quantity || 1} - ${formatPrice((item.price || 0) * (item.quantity || 1))}`
      ).join('\n');
      
      const total = `\n\n💰 *TOTAL:* ${formatPrice(getTotalItems ? getTotalPrice() : 0)}`;
      const whatsappMessage = encodeURIComponent(message + itemsText + total);
      
      window.open(`https://wa.me/5511999999999?text=${whatsappMessage}`, '_blank');
      onClose();
    } catch (error) {
      console.error('Erro ao processar checkout:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    }
  };

  const totalItems = getTotalItems ? getTotalItems() : 0;
  const totalPrice = getTotalPrice ? getTotalPrice() : 0;

  // Se não estiver aberto, não renderizar
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay para fechar ao clicar fora */}
      <div 
        className={styles.overlay} 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer do Carrinho */}
      <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ''}`}>
        {/* Header do Carrinho */}
        <div className={styles.cartHeader}>
          <div className={styles.headerContent}>
            <FaShoppingBag className={styles.cartIcon} />
            <div className={styles.headerInfo}>
              <h3 className={styles.cartTitle}>Meu Carrinho</h3>
              <span className={styles.itemCount}>({totalItems} itens)</span>
            </div>
          </div>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <FaTimes />
          </button>
        </div>

        {/* Conteúdo do Carrinho */}
        <div className={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <FaShoppingBag className={styles.emptyIcon} />
              <h4 className={styles.emptyTitle}>Sua sacola ainda está vazia</h4>
              <p className={styles.emptyText}>Comece adicionando um produto</p>
              <button 
                className={styles.continueButton}
                onClick={onClose}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Lista de Itens */}
              <div className={styles.cartItems}>
                {cartItems.map((item, index) => {
                  const itemKey = item.id && item.size && item.color 
                    ? `${item.id}-${item.size}-${item.color}` 
                    : `item-${index}`;
                  
                  return (
                    <div key={itemKey} className={styles.cartItem}>
                      <div className={styles.itemImage}>
                        <img 
                          src={item.image || '/placeholder-image.jpg'} 
                          alt={item.name || 'Produto'}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik00MCAyMEM0Ni42Mjc0IDIwIDUyIDI1LjM3MjYgNTIgMzJDNTIgMzguNjI3NCA0Ni42Mjc0IDQ0IDQwIDQ0QzMzLjM3MjYgNDQgMjggMzguNjI3NCAyOCAzMkMyOCAyNS4zNzI2IDMzLjM3MjYgMjAgNDAgMjBaIiBmaWxsPSIjNkM3NTdEIi8+CjxwYXRoIGQ9Ik0yMCA1Nkw2MCA1NkM2MS4xMDQ2IDU2IDYyIDU2Ljg5NTQgNjIgNThDNjIgNTkuMTA0NiA2MS4xMDQ2IDYwIDYwIDYwTDIwIDYwQzE4Ljg5NTQgNjAgMTggNTkuMTA0NiAxOCA1OEMxOCA1Ni44OTU0IDE4Ljg5NTQgNTYgMjAgNTZaIiBmaWxsPSIjNkM3NTdEIi8+Cjwvc3ZnPgo=';
                          }}
                        />
                      </div>
                      
                      <div className={styles.itemDetails}>
                        <h5 className={styles.itemName}>{item.name || 'Produto'}</h5>
                        <div className={styles.itemVariants}>
                          <span className={styles.variant}>Tam: {item.size || 'N/A'}</span>
                          <span className={styles.variant}>Cor: {item.color || 'N/A'}</span>
                        </div>
                        <div className={styles.itemPrice}>
                          {formatPrice(item.price || 0)}
                        </div>
                        
                        <div className={styles.itemActions}>
                          <div className={styles.quantityControl}>
                            <button
                              className={styles.quantityBtn}
                              onClick={() => handleQuantityChange(item.id, item.size, item.color, (item.quantity || 1) - 1)}
                              aria-label="Diminuir quantidade"
                            >
                              <FaMinus />
                            </button>
                            <span className={styles.quantity}>{item.quantity || 1}</span>
                            <button
                              className={styles.quantityBtn}
                              onClick={() => handleQuantityChange(item.id, item.size, item.color, (item.quantity || 1) + 1)}
                              aria-label="Aumentar quantidade"
                            >
                              <FaPlus />
                            </button>
                          </div>
                          
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeFromCart && removeFromCart(item.id, item.size, item.color)}
                            aria-label="Remover item"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total e Checkout */}
              <div className={styles.cartFooter}>
                <div className={styles.totalSection}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal ({totalItems} itens):</span>
                    <span className={styles.subtotal}>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Frete:</span>
                    <span className={styles.shipping}>Grátis</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Total:</span>
                    <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                
                <div className={styles.actionButtons}>
                  <button 
                    className={styles.clearBtn}
                    onClick={() => clearCart && clearCart()}
                    disabled={cartItems.length === 0}
                  >
                    Limpar Carrinho
                  </button>
                  <button 
                    className={styles.checkoutBtn}
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;