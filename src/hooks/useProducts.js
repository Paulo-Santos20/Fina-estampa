import { useState, useEffect } from 'react';
import { allProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar produtos do localStorage ou usar dados padrão
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const savedProducts = localStorage.getItem('finaEstampaProducts');
        
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(Array.isArray(parsedProducts) ? parsedProducts : allProducts);
        } else {
          // Inicializar com produtos padrão e salvar no localStorage
          setProducts(allProducts);
          localStorage.setItem('finaEstampaProducts', JSON.stringify(allProducts));
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setError('Erro ao carregar produtos');
        setProducts(allProducts); // Fallback para produtos padrão
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Salvar produtos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (products.length > 0 && !isLoading) {
      try {
        localStorage.setItem('finaEstampaProducts', JSON.stringify(products));
      } catch (error) {
        console.error('Erro ao salvar produtos:', error);
      }
    }
  }, [products, isLoading]);

  const addProduct = (productData) => {
    try {
      const newProduct = {
        ...productData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      setError('Erro ao adicionar produto');
      return null;
    }
  };

  const updateProduct = (productId, productData) => {
    try {
      setProducts(prev => 
        prev.map(p => p.id === productId ? { 
          ...productData, 
          id: productId,
          updatedAt: new Date().toISOString()
        } : p)
      );
      return true;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      setError('Erro ao atualizar produto');
      return false;
    }
  };

  const deleteProduct = (productId) => {
    try {
      setProducts(prev => prev.filter(p => p.id !== productId));
      return true;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      setError('Erro ao deletar produto');
      return false;
    }
  };

  const getProductById = (productId) => {
    try {
      const id = parseInt(productId);
      return products.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return null;
    }
  };

  const getProductsByCategory = (category) => {
    try {
      if (!category) return products;
      return products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    } catch (error) {
      console.error('Erro ao filtrar por categoria:', error);
      return [];
    }
  };

  const searchProducts = (searchTerm) => {
    try {
      if (!searchTerm) return products;
      
      const term = searchTerm.toLowerCase();
      return products.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  };

  const getPromoProducts = () => {
    try {
      return products.filter(p => p.isPromo && p.salePrice);
    } catch (error) {
      console.error('Erro ao buscar produtos em promoção:', error);
      return [];
    }
  };

  const getNewProducts = () => {
    try {
      return products.filter(p => p.isNew);
    } catch (error) {
      console.error('Erro ao buscar produtos novos:', error);
      return [];
    }
  };

  const getFeaturedProducts = (limit = 8) => {
    try {
      // Retorna produtos em promoção ou novos, limitado
      const featured = products.filter(p => p.isPromo || p.isNew);
      return featured.slice(0, limit);
    } catch (error) {
      console.error('Erro ao buscar produtos em destaque:', error);
      return products.slice(0, limit);
    }
  };

  return {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getPromoProducts,
    getNewProducts,
    getFeaturedProducts
  };
};