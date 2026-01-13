import { useState, useEffect, useCallback } from 'react';

// Dados iniciais simulados para não começar vazio
const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: 'Vestido Longo Floral', 
    category: 'Vestidos', 
    price: 299.90, 
    stock: 15, 
    isActive: true, 
    isFeatured: true,
    isNew: true,
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop'
  },
  { 
    id: 2, 
    name: 'Blusa de Seda Branca', 
    category: 'Blusas', 
    price: 159.90, 
    stock: 8, 
    isActive: true, 
    isFeatured: false,
    isNew: false,
    isPromo: true,
    originalPrice: 199.90,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=400&auto=format&fit=crop'
  },
  { 
    id: 3, 
    name: 'Calça Alfaiataria Bege', 
    category: 'Calças', 
    price: 229.90, 
    stock: 0, 
    isActive: false, 
    isFeatured: false,
    isNew: false,
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop'
  }
];

export const useProducts = () => {
  // Tenta carregar do localStorage ou usa o inicial
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sana_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [loading, setLoading] = useState(false);

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('sana_products', JSON.stringify(products));
  }, [products]);

  // --- AÇÕES ---

  const addProduct = (productData) => {
    setLoading(true);
    try {
      const newProduct = {
        ...productData,
        id: Date.now(), // ID único simples
        isActive: true, // Padrão ativo
        createdAt: new Date().toISOString()
      };
      setProducts(prev => [newProduct, ...prev]);
      setLoading(false);
      return newProduct;
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  const updateProduct = (id, updatedData) => {
    setLoading(true);
    try {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const deleteProduct = (id) => {
    setLoading(true);
    try {
      setProducts(prev => prev.filter(p => p.id !== id));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  // --- AQUI ESTÃO AS FUNÇÕES QUE FALTAVAM ---

  const toggleProductStatus = (id) => {
    try {
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, isActive: !p.isActive } : p
      ));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const toggleProductFeatured = (id) => {
    try {
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
      ));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Função simples de busca (já feita no frontend, mas útil ter no hook)
  const searchProducts = (query) => {
    if (!query) return products;
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,   // <--- Agora está sendo exportado
    toggleProductFeatured, // <--- Agora está sendo exportado
    searchProducts
  };
};