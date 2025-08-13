// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { 
  allProducts,
  getProductById, 
  getProductsByCategory, 
  searchProducts,
  getPromotionProducts,
  getNewProducts,
  getSimilarProducts,
  featuredProducts,
  newArrivals,
  saleProducts
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

  // Funções auxiliares usando as funções do arquivo de dados
  const getProduct = (id) => {
    return getProductById(id);
  };

  const getByCategory = (categorySlug) => {
    return getProductsByCategory(categorySlug);
  };

  const search = (query) => {
    return searchProducts(query);
  };

  const getPromotional = () => {
    return getPromotionProducts();
  };

  const getNew = () => {
    return getNewProducts();
  };

  const getFeatured = () => {
    return featuredProducts;
  };

  const getNewArrivals = () => {
    return newArrivals;
  };

  const getSaleProducts = () => {
    return saleProducts;
  };

  const getBestSelling = (limit = 6) => {
    // Ordenar por número de reviews (mais vendidos)
    return [...allProducts]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  };

  const getRelated = (productId, limit = 4) => {
    return getSimilarProducts(productId, limit);
  };

  const filterProducts = (filters) => {
    let filtered = [...allProducts];

    // Filtrar por categoria
    if (filters.category) {
      filtered = getByCategory(filters.category);
    }

    // Filtrar por gênero
    if (filters.gender) {
      filtered = filtered.filter(product => 
        product.gender?.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    // Filtrar por subcategoria
    if (filters.subcategory) {
      filtered = filtered.filter(product => 
        product.subcategory?.toLowerCase() === filters.subcategory.toLowerCase()
      );
    }

    // Filtrar por marca
    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.brand?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Filtrar por cor
    if (filters.color) {
      filtered = filtered.filter(product => 
        product.colors?.some(color => 
          color.toLowerCase().includes(filters.color.toLowerCase())
        )
      );
    }

    // Filtrar por faixa de preço
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => {
        const price = product.salePrice || product.price;
        const min = filters.minPrice || 0;
        const max = filters.maxPrice || Infinity;
        return price >= min && price <= max;
      });
    }

    // Filtrar por promoção
    if (filters.isPromo) {
      filtered = filtered.filter(product => product.isPromo);
    }

    // Filtrar por novos
    if (filters.isNew) {
      filtered = filtered.filter(product => product.isNew);
    }

    // Busca por texto
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case 'price-desc':
        return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => b.isNew - a.isNew);
      case 'popular':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return sorted;
    }
  };

  return {
    products,
    loading,
    error,
    // Funções principais
    getProduct,
    getByCategory,
    search,
    getPromotional,
    getNew,
    getFeatured,
    getNewArrivals,
    getSaleProducts,
    getBestSelling,
    getRelated,
    filterProducts,
    sortProducts,
    // Aliases para compatibilidade
    getProductById: getProduct,
    getProductsByCategory: getByCategory,
    searchProducts: search,
    getSimilarProducts: getRelated
  };
};

export default useProducts;