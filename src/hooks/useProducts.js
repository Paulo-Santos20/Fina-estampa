import { useState, useEffect } from 'react';
import { allProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  // Carregar produtos do localStorage ou usar dados padrão
  useEffect(() => {
    const savedProducts = localStorage.getItem('finaEstampaProducts');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProducts(allProducts);
        localStorage.setItem('finaEstampaProducts', JSON.stringify(allProducts));
      }
    } else {
      setProducts(allProducts);
      localStorage.setItem('finaEstampaProducts', JSON.stringify(allProducts));
    }
  }, []);

  // Salvar produtos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('finaEstampaProducts', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now()
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (productId, productData) => {
    setProducts(prev => 
      prev.map(p => p.id === productId ? { ...productData, id: productId } : p)
    );
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const getProductById = (productId) => {
    return products.find(p => p.id === parseInt(productId));
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory
  };
};