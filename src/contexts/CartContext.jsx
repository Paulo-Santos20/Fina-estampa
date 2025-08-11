// src/contexts/CartContext.jsx
// Contexto de Carrinho para Fina Estampa / Boutique Eleganza
// - Corrigido: inicialização segura do reducer para evitar cart = null
// - Persistência em localStorage
// - API completa: addItem, removeItem, updateItemQty, clearCart, useCart

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useContext,
} from 'react';

export const CartContext = createContext(null);

// Helpers
function makeItemKey({ id, size, color, variantId }) {
  const parts = [String(id ?? ''), String(variantId ?? ''), String(size ?? ''), String(color ?? '')];
  return parts.join('|').toLowerCase();
}

function safeJSONParse(str, fallback) {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

const CART_STORAGE_KEY = 'fe_cart_v1';
const CART_META_STORAGE_KEY = 'fe_cart_meta_v1';

// Reducer para o array de itens do carrinho
function cartReducer(state, action) {
  // ✅ Garantir que state sempre seja um array
  const currentState = Array.isArray(state) ? state : [];
  
  switch (action.type) {
    case 'SET_CART': {
      const arr = Array.isArray(action.payload) ? action.payload : [];
      return arr;
    }
    case 'ADD_ITEM': {
      const { item, qty } = action.payload;
      if (!item || !item.id) return currentState;
      
      const key = makeItemKey(item);
      const idx = currentState.findIndex((it) => makeItemKey(it) === key);
      
      if (idx >= 0) {
        const newState = [...currentState];
        const current = newState[idx];
        newState[idx] = { 
          ...current, 
          qty: (Number(current.qty) || 0) + (Number(qty) || 1) 
        };
        return newState;
      }
      
      return [
        ...currentState,
        {
          id: item.id,
          name: item.name ?? 'Produto',
          price: Number(item.price) || 0,
          qty: Math.max(1, Number(qty) || 1),
          size: item.size ?? null,
          color: item.color ?? null,
          variantId: item.variantId ?? null,
          image: item.image ?? item.thumbnail ?? null,
          sku: item.sku ?? null,
          category: item.category ?? null,
        },
      ];
    }
    case 'UPDATE_QTY': {
      const { id, options, qty } = action.payload;
      const key = makeItemKey({ id, ...options });
      const idx = currentState.findIndex((it) => makeItemKey(it) === key);
      
      if (idx < 0) return currentState;
      
      const newState = [...currentState];
      const normalizedQty = Number(qty) || 0;
      
      if (normalizedQty <= 0) {
        newState.splice(idx, 1);
        return newState;
      }
      
      newState[idx] = { ...newState[idx], qty: normalizedQty };
      return newState;
    }
    case 'REMOVE_ITEM': {
      const { id, options } = action.payload;
      const key = makeItemKey({ id, ...options });
      return currentState.filter((it) => makeItemKey(it) !== key);
    }
    case 'CLEAR': {
      return [];
    }
    default:
      return currentState;
  }
}

// ✅ Função de inicialização segura
function initializeCart() {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // ✅ Inicialização segura do reducer
  const [cart, dispatch] = useReducer(cartReducer, [], initializeCart);

  // Metadados: cupom, frete, drawer
  const [coupon, setCoupon] = useState(() => {
    if (typeof window === 'undefined') return null;
    
    try {
      const meta = JSON.parse(localStorage.getItem(CART_META_STORAGE_KEY) || '{}');
      return meta?.coupon || null;
    } catch {
      return null;
    }
  });

  const [shipping, setShipping] = useState(() => {
    if (typeof window === 'undefined') return { cep: '', amount: 0 };
    
    try {
      const meta = JSON.parse(localStorage.getItem(CART_META_STORAGE_KEY) || '{}');
      return meta?.shipping || { cep: '', amount: 0 };
    } catch {
      return { cep: '', amount: 0 };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistência
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const meta = { coupon, shipping };
      localStorage.setItem(CART_META_STORAGE_KEY, JSON.stringify(meta));
    }
  }, [coupon, shipping]);

  // Ações de carrinho
  const setCart = useCallback(
    (updater) => {
      if (typeof updater === 'function') {
        dispatch({ type: 'SET_CART', payload: updater(cart) });
      } else {
        dispatch({ type: 'SET_CART', payload: updater });
      }
    },
    [cart]
  );

  const addItem = useCallback((item, qty = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, qty } });
  }, []);

  const updateItemQty = useCallback((id, options = {}, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, options, qty } });
  }, []);

  const removeItem = useCallback((id, options = {}) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, options } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  // Drawer controls
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((v) => !v), []);

  // Cálculo de frete por CEP (exemplo simples)
  const calcShippingByCep = useCallback((cep, subtotal) => {
    const clean = String(cep || '').replace(/\D/g, '');
    if (!clean) return 0;
    const base = 15;
    if ((Number(subtotal) || 0) >= 300) return 0; // frete grátis a partir de R$300
    if (/^[0-2]/.test(clean)) return base + 5;
    if (/^[3-5]/.test(clean)) return base + 3;
    return base;
  }, []);

  // ✅ Totais seguros - sempre verifica se cart é array
  const totals = useMemo(() => {
    const safeCart = Array.isArray(cart) ? cart : [];
    
    const itemsCount = safeCart.reduce((acc, it) => {
      return acc + (Number(it?.qty) || 0);
    }, 0);
    
    const subtotal = safeCart.reduce((acc, it) => {
      const price = Number(it?.price) || 0;
      const qty = Number(it?.qty) || 0;
      return acc + (price * qty);
    }, 0);
    
    return { itemsCount, subtotal };
  }, [cart]);

  const value = useMemo(
    () => ({
      // dados
      cart: Array.isArray(cart) ? cart : [], // ✅ Sempre retorna array
      coupon,
      shipping,
      isCartOpen,
      // totais
      itemsCount: totals.itemsCount,
      subtotal: totals.subtotal,

      // setters / actions
      setCart,
      addItem,
      updateItemQty,
      removeItem,
      clearCart,

      setCoupon,
      setShipping,

      // drawer
      openCart,
      closeCart,
      toggleCart,

      // frete
      calcShippingByCep,
    }),
    [
      cart,
      coupon,
      shipping,
      isCartOpen,
      totals.itemsCount,
      totals.subtotal,
      setCart,
      addItem,
      updateItemQty,
      removeItem,
      clearCart,
      setCoupon,
      setShipping,
      openCart,
      closeCart,
      toggleCart,
      calcShippingByCep,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook useCart
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart deve ser usado dentro de <CartProvider>');
  }
  return ctx;
}

export default CartProvider;