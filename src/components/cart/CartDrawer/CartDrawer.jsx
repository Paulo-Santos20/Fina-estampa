// src/components/cart/CartDrawer/CartDrawer.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext.jsx';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    itemsCount,
    subtotal,
    updateItemQty,
    removeItem,
    clearCart,
  } = useCart();

  // ...restante do componente
  return null;
}