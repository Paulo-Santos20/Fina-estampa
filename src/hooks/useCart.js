// src/hooks/useCart.js
// Hook de carrinho para a Fina Estampa / Boutique Eleganza
// - Exporta named e default (useCart) para evitar erros de import
// - API completa: addToCart, removeFromCart, updateQuantity, clearCart, getItem, isInCart
// - Totais: itemsCount, subtotal, discount, shipping, total
// - Integração: buildWhatsAppMessage e getWhatsAppLink
// - Requer <CartProvider> expondo cart/setCart ou ações equivalentes

import { useCallback, useContext, useMemo } from 'react';
import { CartContext } from '../contexts/CartContext.jsx';

function makeItemKey({ id, size, color, variantId }) {
  const parts = [String(id ?? ''), String(variantId ?? ''), String(size ?? ''), String(color ?? '')];
  return parts.join('|').toLowerCase();
}

function formatBRL(value) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  } catch {
    return `R$ ${(value || 0).toFixed(2).replace('.', ',')}`;
  }
}

function calcShippingByCepLocal(cep, subtotal) {
  if (!cep) return 0;
  const base = 15;
  if (subtotal >= 300) return 0;
  if (/^0|^1|^2/.test(String(cep))) return base + 5;
  if (/^3|^4|^5/.test(String(cep))) return base + 3;
  return base;
}

// Named export (garantido)
export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart deve ser usado dentro de <CartProvider> (CartContext).');
  }

  const {
    cart = [],
    setCart,
    addItem,
    removeItem,
    updateItemQty,
    clearCart: clearCartCtx,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    coupon,
    setCoupon,
    shipping: shippingFromCtx,
    setShipping,
    calcShippingByCep,
  } = ctx;

  const getItem = useCallback(
    (id, { size, color, variantId } = {}) => {
      const key = makeItemKey({ id, size, color, variantId });
      return cart.find((it) => makeItemKey(it) === key);
    },
    [cart]
  );

  const isInCart = useCallback(
    (id, options = {}) => Boolean(getItem(id, options)),
    [getItem]
  );

  const addToCart = useCallback(
    (item, qty = 1) => {
      if (!item || item.id == null) return;

      const normalizedQty = Math.max(1, Number(qty) || 1);
      const key = makeItemKey(item);

      const doUpdate = (prev) => {
        const arr = Array.isArray(prev) ? prev : [];
        const idx = arr.findIndex((it) => makeItemKey(it) === key);
        if (idx >= 0) {
          const clone = [...arr];
          const current = clone[idx];
          clone[idx] = { ...current, qty: (Number(current.qty) || 0) + normalizedQty };
          return clone;
        }
        return [
          ...arr,
          {
            id: item.id,
            name: item.name ?? 'Produto',
            price: Number(item.price) || 0,
            qty: normalizedQty,
            size: item.size ?? null,
            color: item.color ?? null,
            variantId: item.variantId ?? null,
            image: item.image ?? item.thumbnail ?? null,
            sku: item.sku ?? null,
            category: item.category ?? null,
          },
        ];
      };

      if (typeof addItem === 'function') {
        addItem(item, normalizedQty);
      } else if (typeof setCart === 'function') {
        setCart((prev) => doUpdate(prev));
      } else {
        throw new Error('CartContext não expõe addItem ou setCart.');
      }

      if (typeof openCart === 'function') openCart();
    },
    [addItem, openCart, setCart]
  );

  const updateQuantity = useCallback(
    (id, options = {}, qty) => {
      const normalizedQty = Math.max(0, Number(qty) || 0);
      const key = makeItemKey({ id, ...options });

      const doUpdate = (prev) => {
        const arr = Array.isArray(prev) ? prev : [];
        const idx = arr.findIndex((it) => makeItemKey(it) === key);
        if (idx < 0) return arr;
        const clone = [...arr];
        if (normalizedQty <= 0) {
          clone.splice(idx, 1);
          return clone;
        }
        clone[idx] = { ...clone[idx], qty: normalizedQty };
        return clone;
      };

      if (typeof updateItemQty === 'function') {
        updateItemQty(id, options, normalizedQty);
      } else if (typeof setCart === 'function') {
        setCart((prev) => doUpdate(prev));
      } else {
        throw new Error('CartContext não expõe updateItemQty ou setCart.');
      }
    },
    [setCart, updateItemQty]
  );

  const removeFromCart = useCallback(
    (id, options = {}) => {
      const key = makeItemKey({ id, ...options });

      const doUpdate = (prev) => {
        const arr = Array.isArray(prev) ? prev : [];
        return arr.filter((it) => makeItemKey(it) !== key);
      };

      if (typeof removeItem === 'function') {
        removeItem(id, options);
      } else if (typeof setCart === 'function') {
        setCart((prev) => doUpdate(prev));
      } else {
        throw new Error('CartContext não expõe removeItem ou setCart.');
      }
    },
    [removeItem, setCart]
  );

  const clearCart = useCallback(() => {
    if (typeof clearCartCtx === 'function') {
      clearCartCtx();
    } else if (typeof setCart === 'function') {
      setCart([]);
    } else {
      throw new Error('CartContext não expõe clearCart ou setCart.');
    }
  }, [clearCartCtx, setCart]);

  const { itemsCount, subtotal } = useMemo(() => {
    const count = cart.reduce((acc, it) => acc + (Number(it.qty) || 0), 0);
    const sub = cart.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
    return { itemsCount: count, subtotal: sub };
  }, [cart]);

  const discount = useMemo(() => {
    if (!coupon || !coupon.code) return 0;
    const code = String(coupon.code).toUpperCase().trim();
    if (code.endsWith('OFF')) {
      const pct = parseInt(code.replace('OFF', ''), 10);
      if (!isNaN(pct) && pct > 0 && pct < 100) return (subtotal * pct) / 100;
    }
    if (/^VALE(\d+)$/i.test(code)) {
      const val = Number(code.replace(/^VALE/i, ''));
      return isNaN(val) ? 0 : Math.min(val, subtotal);
    }
    return 0;
  }, [coupon, subtotal]);

  const shipping = useMemo(() => {
    if (typeof shippingFromCtx === 'number') return shippingFromCtx;
    if (shippingFromCtx && typeof shippingFromCtx.amount === 'number') return shippingFromCtx.amount;
    return 0;
  }, [shippingFromCtx]);

  const total = useMemo(() => {
    const t = subtotal - discount + shipping;
    return t < 0 ? 0 : t;
  }, [subtotal, discount, shipping]);

  const estimateShipping = useCallback(
    async (cep) => {
      const parsedCep = String(cep || '').replace(/\D/g, '');
      if (!parsedCep) return 0;

      const amount =
        typeof calcShippingByCep === 'function'
          ? await Promise.resolve(calcShippingByCep(parsedCep, subtotal))
          : calcShippingByCepLocal(parsedCep, subtotal);

      if (typeof setShipping === 'function') {
        setShipping({ cep: parsedCep, amount });
      }
      return amount;
    },
    [calcShippingByCep, setShipping, subtotal]
  );

  const buildWhatsAppMessage = useCallback(
    ({
      storeName = 'BOUTIQUE ELEGANZA',
      client = { name: '', phone: '', address: '' },
      payment = { method: 'PIX' },
      freight = { label: 'Frete', amount: shipping },
      orderId,
      date = new Date(),
    } = {}) => {
      const lines = [];
      lines.push('🛍️ *NOVO PEDIDO - ' + storeName + '*');
      lines.push('');
      lines.push(`👤 *Cliente:* ${client.name || '-'}`);
      lines.push(`📱 *Telefone:* ${client.phone || '-'}`);
      lines.push(`📍 *Endereço:* ${client.address || '-'}`);
      lines.push('');
      lines.push('🛒 *PRODUTOS:*');
      cart.forEach((it) => {
        const price = Number(it.price) || 0;
        const qty = Number(it.qty) || 1;
        const itemTotal = price * qty;
        const sizeLabel = it.size ? ` - Tam: [${it.size}]` : '';
        const colorLabel = it.color ? ` - Cor: [${it.color}]` : '';
        lines.push(`• ${it.name}${sizeLabel}${colorLabel} - Qtd: ${qty} - ${formatBRL(itemTotal)}`);
      });
      lines.push('');
      if (discount > 0) lines.push(`💸 *Desconto:* -${formatBRL(discount)}`);
      if (freight && typeof freight.amount === 'number')
        lines.push(`📦 *${freight.label || 'Frete'}:* ${formatBRL(freight.amount)}`);
      lines.push(`💰 *TOTAL:* ${formatBRL(total)}`);
      lines.push(`💳 *Pagamento:* ${payment.method || 'PIX'}`);
      const dateStr = date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      lines.push('');
      lines.push(`🕐 *Data/Hora:* ${dateStr}`);
      if (orderId) lines.push(`🔗 *Pedido #:* ${orderId}`);
      return lines.join('\n');
    },
    [cart, discount, shipping, total]
  );

  const getWhatsAppLink = useCallback((phoneNumber, message) => {
    const onlyDigits = String(phoneNumber || '').replace(/\D/g, '');
    const encoded = encodeURIComponent(message || '');
    if (!onlyDigits) return null;
    return `https://wa.me/${onlyDigits}?text=${encoded}`;
  }, []);

  return {
    cart,
    getItem,
    isInCart,
    itemsCount,
    subtotal,
    discount,
    shipping,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    coupon,
    setCoupon,
    estimateShipping,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    buildWhatsAppMessage,
    getWhatsAppLink,
    formatBRL,
  };
}

// Default export (também disponível)
export default useCart;