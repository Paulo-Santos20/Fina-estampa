// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { 
  getAllProducts, 
  getProductById, 
  getProductsByCategory, 
  searchProducts,
  getPromotionalProducts,
  getNewProducts,
  getBestSellingProducts,
  getRelatedProducts
} from '../data/products.js';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular carregamento dos dados
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular delay de API (opcional)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Carregar produtos dos dados
        const allProducts = getAllProducts();
        setProducts(allProducts);
        
        console.log('Produtos carregados:', allProducts.length);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Erro ao carregar produtos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Funções auxiliares
  const getProduct = (id) => {
    return getProductById(id);
  };

  const getByCategory = (category) => {
    return getProductsByCategory(category);
  };

  const search = (query) => {
    return searchProducts(query);
  };

  const getPromotional = () => {
    return getPromotionalProducts();
  };

  const getNew = () => {
    return getNewProducts();
  };

  const getBestSelling = (limit) => {
    return getBestSellingProducts(limit);
  };

  const getRelated = (productId, limit) => {
    return getRelatedProducts(productId, limit);
  };

  return {
    products,
    loading,
    error,
    getProduct,
    getByCategory,
    search,
    getPromotional,
    getNew,
    getBestSelling,
    getRelated,
    // Aliases para compatibilidade
    getProductById: getProduct,
    getProductsByCategory: getByCategory,
    searchProducts: search
  };
};

export default useProducts;