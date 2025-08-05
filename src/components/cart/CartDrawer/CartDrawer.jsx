import React from 'react';
import { 
  FaTimes, 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaTrash,
  FaWhatsapp 
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let message = `🛍️ *NOVO PEDIDO - FINA ESTAMPA*\n\n`;
    message += `👤 *Cliente:* [Nome do Cliente]\n`;
    message += `📱 *Telefone:* [Telefone do Cliente]\n`;
    message += `📍 *Endereço:* [Endereço do Cliente]\n\n`;
    message += `🛒 *PRODUTOS:*\n`;

    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `• ${item.name} - Tam: ${item.size} - Cor: ${item.color} - Qtd: ${item.quantity} - ${formatPrice(itemTotal)}\n`;
    });

    message += `\n💰 *TOTAL:* ${formatPrice(getTotalPrice())}\n`;
    message += `💳 *Pagamento:* A definir\n`;
    message += `📦 *Frete:* A calcular\n\n`;
    message += `🕐 *Data/Hora:* ${new Date().toLocaleString('pt-BR')}\n`;
    message += `🔗 *Pedido #:* ${Date.now()}`;

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuantityChange = (id, size, color, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, size, color);
    } else {
      updateQuantity(id, size, color, newQuantity);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className={styles.backdrop} 
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.title}>
            <FaShoppingCart />
            <span>Carrinho ({getTotalItems()})</span>
          </div>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <FaShoppingCart className={styles.emptyIcon} />
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione produtos para começar suas compras</p>
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className={styles.item}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <div className={styles.itemVariants}>
                        <span>Tamanho: {item.size}</span>
                        <span>Cor: {item.color}</span>
                      </div>
                      <div className={styles.itemPrice}>
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.quantityBtn}
                          onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                          className={styles.quantityBtn}
                          onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        aria-label="Remover item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summary}>
                <div className={styles.total}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalPrice}>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className={styles.actions}>
                  <button 
                    className={styles.clearBtn}
                    onClick={clearCart}
                  >
                    Limpar Carrinho
                  </button>
                  
                  <button 
                    className={styles.checkoutBtn}
                    onClick={handleWhatsAppOrder}
                  >
                    <FaWhatsapp />
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