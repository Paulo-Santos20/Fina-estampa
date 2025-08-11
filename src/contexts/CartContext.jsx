// src/contexts/CartContext.jsx
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext
} from 'react';

const STORAGE_KEY = 'finaEstampaCart';

// Contexto com valor inicial seguro
export const CartContext = createContext({
  cart: [],
  isDrawerOpen: false,
  addItem: () => {},
  removeItem: () => {},
  incrementItem: () => {},
  decrementItem: () => {},
  clearCart: () => {},
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
  itemCount: 0,
  subtotal: 0
});

// Utilitário para garantir array
const ensureArray = (value) => (Array.isArray(value) ? value : []);

// Chave única para variantes (id + tamanho + cor)
const variantKeyOf = (item) => {
  const { id, size = '', color = '' } = item || {};
  return `${id}__${String(size).toLowerCase()}__${String(color).toLowerCase()}`;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw === 'undefined' || raw === 'null') return [];
      const parsed = JSON.parse(raw);
      return ensureArray(parsed);
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Persistência
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ensureArray(cart)));
  }, [cart]);

  // Ações
  const addItem = useCallback((product, qty = 1, options = {}) => {
    if (!product || !product.id) return;

    const safeQty = Number(qty) > 0 ? Number(qty) : 1;
    const newItem = {
      id: product.id,
      title: product.title || product.name || 'Produto',
      price: Number(product.price) || 0,
      image: product.image || (Array.isArray(product.images) ? product.images[0] : undefined),
      size: options.size || product.size || '',
      color: options.color || product.color || '',
      qty: safeQty
    };

    const newKey = variantKeyOf(newItem);

    setCart((prev) => {
      const list = ensureArray(prev);
      const idx = list.findIndex((it) => variantKeyOf(it) === newKey);
      if (idx >= 0) {
        const updated = [...list];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + safeQty };
        return updated;
      }
      return [...list, newItem];
    });
  }, []);

  const removeItem = useCallback((id, options = {}) => {
    setCart((prev) => {
      const list = ensureArray(prev);
      if (!id) return list;
      const keyToRemove = variantKeyOf({ id, size: options.size || '', color: options.color || '' });
      return list.filter((it) => variantKeyOf(it) !== keyToRemove);
    });
  }, []);

  const incrementItem = useCallback((id, options = {}) => {
    setCart((prev) => {
      const list = ensureArray(prev);
      const key = variantKeyOf({ id, size: options.size || '', color: options.color || '' });
      return list.map((it) => (variantKeyOf(it) === key ? { ...it, qty: it.qty + 1 } : it));
    });
  }, []);

  const decrementItem = useCallback((id, options = {}) => {
    setCart((prev) => {
      const list = ensureArray(prev);
      const key = variantKeyOf({ id, size: options.size || '', color: options.color || '' });
      return list
        .map((it) => {
          if (variantKeyOf(it) !== key) return it;
          const nextQty = it.qty - 1;
          return nextQty <= 0 ? null : { ...it, qty: nextQty };
        })
        .filter(Boolean);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Drawer
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((v) => !v), []);

  // Derivados
  const { itemCount, subtotal } = useMemo(() => {
    const list = ensureArray(cart);
    const itemCount = list.reduce((acc, it) => acc + (Number(it.qty) || 0), 0);
    const subtotal = list.reduce(
      (acc, it) => acc + (Number(it.qty) || 0) * (Number(it.price) || 0),
      0
    );
    return { itemCount, subtotal };
  }, [cart]);

  const value = useMemo(
    () => ({
      cart: ensureArray(cart),
      isDrawerOpen,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      itemCount,
      subtotal
    }),
    [
      cart,
      isDrawerOpen,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      itemCount,
      subtotal
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook exportado diretamente do contexto (para permitir import { useCart } from '.../CartContext')
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>');
  return ctx;
};

// Default export do Provider
export default CartProvider;