import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Ações do reducer
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Estado inicial
const initialState = {
  items: []
};

// Reducer do carrinho
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, size, color, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        // Item já existe, atualizar quantidade
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      } else {
        // Novo item
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.isPromo ? product.salePrice : product.price,
          image: product.image,
          size,
          color,
          quantity
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { productId, size, color } = action.payload;
      const filteredItems = state.items.filter(
        item => !(item.id === productId && item.size === size && item.color === color)
      );
      return { ...state, items: filteredItems };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, size, color, quantity } = action.payload;
      const updatedItems = state.items.map(item => {
        if (item.id === productId && item.size === size && item.color === color) {
          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0);
      
      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload || [] };

    default:
      return state;
  }
};

// Criar contexto
const CartContext = createContext();

// Provider do contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('finaEstampaCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.warn('Erro ao carregar carrinho do localStorage:', error);
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem('finaEstampaCart', JSON.stringify(state.items));
    } catch (error) {
      console.warn('Erro ao salvar carrinho no localStorage:', error);
    }
  }, [state.items]);

  // Funções do carrinho
  const addToCart = (product, size, color, quantity = 1) => {
    if (!product || !product.id) {
      console.warn('Produto inválido para adicionar ao carrinho');
      return;
    }
    
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, size, color, quantity }
    });
  };

  const removeFromCart = (productId, size, color) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { productId, size, color }
    });
  };

  const updateQuantity = (productId, size, color, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, size, color, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getItemCount = (productId, size, color) => {
    const item = state.items.find(
      item => item.id === productId && item.size === size && item.color === color
    );
    return item ? item.quantity : 0;
  };

  const isInCart = (productId, size, color) => {
    return state.items.some(
      item => item.id === productId && item.size === size && item.color === color
    );
  };

  const value = {
    cartItems: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemCount,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error('useCart deve ser usado dentro de um CartProvider');
    return {
      cartItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getTotalItems: () => 0,
      getTotalPrice: () => 0,
      getItemCount: () => 0,
      isInCart: () => false
    };
  }
  return context;
};

export default CartContext;