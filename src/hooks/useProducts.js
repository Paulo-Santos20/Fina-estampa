// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { allProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useProducts: Iniciando carregamento...');
    console.log('allProducts importado:', allProducts);

    try {
      setLoading(true);

      // Verificar localStorage
      const savedProducts = localStorage.getItem('finaEstampaProducts');
      console.log('Produtos salvos no localStorage:', savedProducts);

      if (savedProducts && savedProducts !== 'undefined') {
        try {
          const parsedProducts = JSON.parse(savedProducts);
          console.log('Produtos parseados:', parsedProducts);
          setProducts(parsedProducts);
        } catch (parseError) {
          console.error('Erro ao fazer parse dos produtos salvos:', parseError);
          // Se der erro no parse, usar produtos padrão
          setProducts(allProducts);
          localStorage.setItem('finaEstampaProducts', JSON.stringify(allProducts));
        }
      } else {
        // Usar produtos padrão
        console.log('Usando produtos padrão');
        setProducts(allProducts);
        localStorage.setItem('finaEstampaProducts', JSON.stringify(allProducts));
      }

      setError(null);
    } catch (err) {
      console.error('Erro geral no useProducts:', err);
      setError(err.message);
      setProducts(allProducts); // Fallback
    } finally {
      setTimeout(() => {
        setLoading(false);
        console.log('useProducts: Carregamento finalizado');
      }, 1000);
    }
  }, []);

  const addProduct = (productData) => {
    console.log('Adicionando produto:', productData);
    try {
      const newProduct = {
        ...productData,
        id: Date.now(), // ID simples baseado em timestamp
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('finaEstampaProducts', JSON.stringify(updatedProducts));

      console.log('Produto adicionado com sucesso:', newProduct);
      return newProduct;
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      throw err;
    }
  };

  const updateProduct = (productId, productData) => {
    console.log('Atualizando produto:', productId, productData);
    try {
      const updatedProducts = products.map(product =>
        product.id === productId
          ? { ...product, ...productData, updatedAt: new Date().toISOString() }
          : product
      );

      setProducts(updatedProducts);
      localStorage.setItem('finaEstampaProducts', JSON.stringify(updatedProducts));

      console.log('Produto atualizado com sucesso');
      return updatedProducts.find(p => p.id === productId);
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      throw err;
    }
  };

  const deleteProduct = (productId) => {
    console.log('Removendo produto:', productId);
    try {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('finaEstampaProducts', JSON.stringify(updatedProducts));

      console.log('Produto removido com sucesso');
      return true;
    } catch (err) {
      console.error('Erro ao remover produto:', err);
      throw err;
    }
  };

  const clearAllProducts = () => {
    try {
      setProducts([]);
      localStorage.removeItem('finaEstampaProducts');
      console.log('Todos os produtos foram removidos');
      return true;
    } catch (err) {
      console.error('Erro ao limpar produtos:', err);
      throw err;
    }
  };

  const resetToDefault = () => {
    try {
      setProducts(allProducts);
      localStorage.setItem('finaEstampaProducts', JSON.stringify(allProducts));
      console.log('Produtos resetados para o padrão');
      return true;
    } catch (err) {
      console.error('Erro ao resetar produtos:', err);
      throw err;
    }
  };

  // Log do estado atual
  console.log('useProducts estado atual:', {
    products: products.length,
    loading,
    error
  });

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts,
    resetToDefault,
    totalProducts: products.length,
    productsInPromo: products.filter(p => p.isPromo).length,
    newProducts: products.filter(p => p.isNew).length
  };
};

// Adiciona export default para permitir: import useProducts from '.../useProducts.js'
export default useProducts;