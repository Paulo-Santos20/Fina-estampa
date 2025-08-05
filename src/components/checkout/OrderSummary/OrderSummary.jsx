import React from 'react';
import { FaTruck, FaGift, FaTag } from 'react-icons/fa';
import styles from './OrderSummary.module.css';

const OrderSummary = ({ 
  items, 
  subtotal, 
  shipping, 
  discount, 
  total, 
  paymentMethod 
}) => {
  
  return (
    <div className={styles.summaryContainer}>
      <h3 className={styles.summaryTitle}>Resumo do Pedido</h3>
      
      {/* Itens do pedido */}
      <div className={styles.itemsList}>
        {items.map((item) => (
          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className={styles.summaryItem}>
            <div className={styles.itemImage}>
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className={styles.itemDetails}>
              <h4 className={styles.itemName}>{item.name}</h4>
              <div className={styles.itemSpecs}>
                <span>Tam: {item.selectedSize}</span>
                <span>Cor: {item.selectedColor}</span>
                <span>Qtd: {item.quantity}</span>
              </div>
              <div className={styles.itemPrice}>
                {item.salePrice ? (
                  <>
                    <span className={styles.originalPrice}>
                      R\$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className={styles.salePrice}>
                      R\$ {(item.salePrice * item.quantity).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className={styles.regularPrice}>
                    R\$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totais */}
      <div className={styles.totalsSection}>
        <div className={styles.totalRow}>
          <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
          <span>R\$ {subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.totalRow}>
          <span className={styles.shippingLabel}>
            <FaTruck />
            Frete
            {shipping === 0 && (
              <span className={styles.freeShipping}>
                <FaGift />
                Grátis
              </span>
            )}
          </span>
          <span>
            {shipping === 0 ? 'Grátis' : `R\$ ${shipping.toFixed(2)}`}
          </span>
        </div>

        {discount > 0 && (
          <div className={styles.totalRow}>
            <span className={styles.discountLabel}>
              <FaTag />
              Desconto PIX (5%)
            </span>
            <span className={styles.discountValue}>
              - R\$ {discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className={styles.totalDivider}></div>

        <div className={`${styles.totalRow} ${styles.finalTotal}`}>
          <span>Total</span>
          <span>R\$ {total.toFixed(2)}</span>
        </div>

        {paymentMethod === 'credit' && (
          <div className={styles.installmentInfo}>
            <small>ou 12x de R\$ {(total / 12).toFixed(2)} sem juros</small>
          </div>
        )}
      </div>

      {/* Informações de entrega */}
      <div className={styles.deliveryInfo}>
        <h4 className={styles.deliveryTitle}>
          <FaTruck />
          Informações de Entrega
        </h4>
        <div className={styles.deliveryDetails}>
          <div className={styles.deliveryItem}>
            <strong>Prazo:</strong> 5 a 10 dias úteis
          </div>
          <div className={styles.deliveryItem}>
            <strong>Frete grátis:</strong> Acima de R\$ 199,00
          </div>
          <div className={styles.deliveryItem}>
            <strong>Rastreamento:</strong> Código enviado por WhatsApp
          </div>
        </div>
      </div>

      {/* Garantias */}
      <div className={styles.guarantees}>
        <div className={styles.guarantee}>
          <span className={styles.guaranteeIcon}>🔒</span>
          <span>Compra 100% segura</span>
        </div>
        <div className={styles.guarantee}>
          <span className={styles.guaranteeIcon}>↩️</span>
          <span>30 dias para trocar</span>
        </div>
        <div className={styles.guarantee}>
          <span className={styles.guaranteeIcon}>✅</span>
          <span>Garantia de qualidade</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;