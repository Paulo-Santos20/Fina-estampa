import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Crie o Contexto
const CartContext = createContext(null);

// Crie um provedor para o Contexto do Carrinho
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Tenta carregar os itens do carrinho do localStorage ao inicializar
    try {
      const storedItems = localStorage.getItem('cartItems');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to load cart items from localStorage", error);
      return [];
    }
  });

  // Salva os itens do carrinho no localStorage sempre que cartItems muda
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  // Função para adicionar item ao carrinho
  const addItem = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        // Item já existe, atualiza a quantidade
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Adiciona novo item
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  // Função para remover item do carrinho
  const removeItem = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  // Função para atualizar a quantidade de um item
  const updateItemQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Função para limpar o carrinho
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ******* FUNÇÕES QUE ESTAVAM FALTANDO/INCORRETAS *******
  
  // Função para obter o número total de itens únicos no carrinho
  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Função para obter o preço total dos itens no carrinho
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Função para obter a contagem de um item específico (se precisar, como em botões de "adicionar ao carrinho")
  const getItemCount = useCallback((productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  // O valor que será fornecido pelo contexto
  const contextValue = {
    cartItems,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getTotalItems,      // EXPOSTO
    getTotalPrice,      // EXPOSTO
    getItemCount,       // EXPOSTO (opcional, mas útil)
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para consumir o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};