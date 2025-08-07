import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Cria o contexto do carrinho
const CartContext = createContext();

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // É crucial que este erro seja disparado se o provedor não for encontrado.
    // Isso ajuda a depurar se o CartProvider não estiver no lugar certo.
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provedor do contexto do carrinho
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Tenta carregar os itens do carrinho do localStorage ao iniciar
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Failed to load cart items from localStorage:', error);
      return [];
    }
  });

  // Efeito para salvar os itens do carrinho no localStorage sempre que eles mudarem
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart items to localStorage:', error);
    }
  }, [cartItems]);

  // Adiciona um item ao carrinho
  const addToCart = useCallback((product, quantity = 1, selectedSize, selectedColor) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        // Atualiza a quantidade se o item já existe
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Adiciona um novo item se não existe
        return [...prevItems, { ...product, quantity, selectedSize, selectedColor }];
      }
    });
    // Retorna true para indicar sucesso (ou o item adicionado/atualizado)
    return true; 
  }, []);

  // Remove um item do carrinho
  const removeFromCart = useCallback((productId, size, color) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color))
    );
  }, []);

  // Atualiza a quantidade de um item no carrinho
  const updateQuantity = useCallback((productId, size, color, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0) // Remove se a quantidade for 0 ou menos
    );
  }, []);

  // Verifica se um item está no carrinho
  const isInCart = useCallback((productId, size, color) => {
    // Se size e color são undefined, verifica apenas pelo ID (útil para listagens gerais)
    if (size === undefined && color === undefined) {
      return cartItems.some(item => item.id === productId);
    }
    // Se size e color são especificados, verifica a combinação exata
    return cartItems.some(item => item.id === productId && item.selectedSize === size && item.selectedColor === color);
  }, [cartItems]);

  // Obtém um item do carrinho pela ID, tamanho e cor
  const getCartItem = useCallback((productId, size, color) => {
    // Se size e color são undefined, retorna o primeiro item com o ID
    if (size === undefined && color === undefined) {
      return cartItems.find(item => item.id === productId);
    }
    // Se size e color são especificados, retorna a combinação exata
    return cartItems.find(item => item.id === productId && item.selectedSize === size && item.selectedColor === color);
  }, [cartItems]);

  // Obtém o número total de itens (contagem de produtos distintos no carrinho)
  const getTotalItems = useCallback(() => {
    return cartItems.length;
  }, [cartItems]);

  // Obtém o preço total dos itens no carrinho
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Formata o preço (centralizado para evitar duplicidade e garantir consistência)
  const formatPrice = useCallback((price) => {
    if (typeof price !== 'number') {
      console.warn('formatPrice received a non-numeric value:', price);
      return 'R\$ 0,00'; // Retorna um valor padrão ou lança erro
    }
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }, []);

  // O objeto de valor que será provido para os consumidores do contexto
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,        // <-- CRUCIAL: 'isInCart' deve estar aqui e ser uma função
    getCartItem,     // <-- CRUCIAL: 'getCartItem' também deve estar aqui e ser uma função
    getTotalItems,
    getTotalPrice,
    formatPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};