import { useState, useEffect } from 'react';
import { allProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar produtos do localStorage ou usar dados iniciais
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        // Se não há produtos salvos ou está vazio, usar dados iniciais
        if (parsedProducts.length === 0) {
          const initialProducts = allProducts.map(product => ({
            ...product,
            id: product.id.toString(), // Garantir que ID seja string
            isActive: true,
            isFeatured: product.rating >= 4.5 || product.reviewCount >= 100,
            stock: Math.floor(Math.random() * 50) + 10, // Stock aleatório
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          setProducts(initialProducts);
          localStorage.setItem('products', JSON.stringify(initialProducts));
        } else {
          setProducts(parsedProducts);
        }
      } else {
        // Primeira vez - usar dados iniciais
        const initialProducts = allProducts.map(product => ({
          ...product,
          id: product.id.toString(),
          isActive: true,
          isFeatured: product.rating >= 4.5 || product.reviewCount >= 100,
          stock: Math.floor(Math.random() * 50) + 10,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        setProducts(initialProducts);
        localStorage.setItem('products', JSON.stringify(initialProducts));
      }
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos');
      // Em caso de erro, usar dados iniciais
      const initialProducts = allProducts.map(product => ({
        ...product,
        id: product.id.toString(),
        isActive: true,
        isFeatured: product.rating >= 4.5 || product.reviewCount >= 100,
        stock: Math.floor(Math.random() * 50) + 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setProducts(initialProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar produtos no localStorage
  const saveProducts = (newProducts) => {
    try {
      localStorage.setItem('products', JSON.stringify(newProducts));
      setProducts(newProducts);
      
      // Disparar evento para notificar outros componentes
      window.dispatchEvent(new CustomEvent('productsUpdated', {
        detail: { products: newProducts }
      }));
    } catch (err) {
      console.error('Erro ao salvar produtos:', err);
      setError('Erro ao salvar produtos');
    }
  };

  // Gerar slug
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Adicionar produto
  const addProduct = (productData) => {
    try {
      const newProduct = {
        id: `p${Date.now()}`,
        ...productData,
        slug: generateSlug(productData.name),
        isActive: true,
        isFeatured: false,
        rating: 0,
        reviews: 0,
        reviewCount: 0,
        stock: parseInt(productData.stock) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedProducts = [...products, newProduct];
      saveProducts(updatedProducts);
      return newProduct;
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      setError('Erro ao adicionar produto');
      return null;
    }
  };

  // Atualizar produto
  const updateProduct = (productId, updateData) => {
    try {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            ...updateData,
            slug: updateData.name ? generateSlug(updateData.name) : product.slug,
            updatedAt: new Date().toISOString()
          };
        }
        return product;
      });

      saveProducts(updatedProducts);
      return true;
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setError('Erro ao atualizar produto');
      return false;
    }
  };

  // Excluir produto
  const deleteProduct = (productId) => {
    try {
      const updatedProducts = products.filter(product => product.id !== productId);
      saveProducts(updatedProducts);
      return true;
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      setError('Erro ao excluir produto');
      return false;
    }
  };

  // Buscar produtos
  const searchProducts = (query) => {
    if (!query || !query.trim()) return products;
    
    const searchTerm = query.toLowerCase().trim();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      (product.colors && product.colors.some(color => 
        color.toLowerCase().includes(searchTerm)
      ))
    );
  };

  // Filtrar produtos por categoria
  const getProductsByCategory = (categoryName) => {
    if (!categoryName) return products;
    return products.filter(product => 
      product.category.toLowerCase() === categoryName.toLowerCase()
    );
  };

  // Obter produto por ID
  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  // Obter produtos ativos
  const getActiveProducts = () => {
    return products.filter(product => product.isActive);
  };

  // Obter produtos em destaque
  const getFeaturedProducts = () => {
    return products.filter(product => product.isFeatured);
  };

  // Obter produtos novos
  const getNewProducts = () => {
    return products.filter(product => product.isNew);
  };

  // Obter produtos em promoção
  const getSaleProducts = () => {
    return products.filter(product => product.isPromo);
  };

  // Toggle status ativo
  const toggleProductStatus = (productId) => {
    return updateProduct(productId, { 
      isActive: !products.find(p => p.id === productId)?.isActive 
    });
  };

  // Toggle destaque
  const toggleProductFeatured = (productId) => {
    return updateProduct(productId, { 
      isFeatured: !products.find(p => p.id === productId)?.isFeatured 
    });
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    getProductById,
    getActiveProducts,
    getFeaturedProducts,
    getNewProducts,
    getSaleProducts,
    toggleProductStatus,
    toggleProductFeatured
  };
};