import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaPlus, FaMinus, FaShoppingBag, FaLock } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id, item.size, item.color);
    } else {
      updateQuantity(item.id, item.size, item.color, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.size, item.color);
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const freeShippingThreshold = 199.90;
  const shippingCost = totalPrice >= freeShippingThreshold ? 0 : 15.00;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <FaShoppingBag className={styles.emptyIcon} />
            <h1 className={styles.emptyTitle}>Seu carrinho está vazio</h1>
            <p className={styles.emptyText}>
              Que tal dar uma olhada em nossos produtos incríveis?
            </p>
            <Link to="/" className={styles.continueShoppingButton}>
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        {/* Header da página */}
        <div className={styles.pageHeader}>
          <Link to="/" className={styles.backButton}>
            <FaArrowLeft />
            Continuar Comprando
          </Link>
          <h1 className={styles.pageTitle}>Meu Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</h1>
        </div>

        <div className={styles.cartContent}>
          {/* Lista de produtos */}
          <div className={styles.cartItems}>
            {items.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.color}-${index}`} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemVariants}>
                    <span className={styles.itemVariant}>Tamanho: {item.size}</span>
                    <span className={styles.itemVariant}>Cor: {item.color}</span>
                  </div>
                  
                  <div className={styles.itemPrice}>
                    {item.originalPrice && item.originalPrice > item.price ? (
                      <>
                        <span className={styles.originalPrice}>
                          {formatPrice(item.originalPrice)}
                        </span>
                        <span className={styles.salePrice}>
                          {formatPrice(item.price)}
                        </span>
                      </>
                    ) : (
                      <span className={styles.regularPrice}>
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      aria-label="Diminuir quantidade"
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className={styles.itemTotal}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveItem(item)}
                    aria-label="Remover item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.cartActions}>
              <button 
                className={styles.clearCartButton}
                onClick={clearCart}
              >
                Limpar Carrinho
              </button>
            </div>
          </div>

          {/* Resumo do pedido */}
          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
            
            <div className={styles.summaryContent}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Frete</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className={styles.freeShipping}>Grátis</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              {totalPrice < freeShippingThreshold && (
                <div className={styles.freeShippingAlert}>
                  <p>Faltam {formatPrice(freeShippingThreshold - totalPrice)} para frete grátis!</p>
                </div>
              )}

              <div className={styles.summaryDivider} />
              
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>

              <button className={styles.checkoutButton}>
                <FaLock />
                Finalizar Compra
              </button>

              <div className={styles.securityInfo}>
                <p>🔒 Compra 100% segura e protegida</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;