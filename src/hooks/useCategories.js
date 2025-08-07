import { useState, useEffect } from 'react';
import { categories as defaultCategories } from '../data/products';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useCategories: Iniciando carregamento...');
    console.log('defaultCategories:', defaultCategories);
    
    try {
      setLoading(true);
      
      const savedCategories = localStorage.getItem('finaEstampaCategories');
      
      if (savedCategories && savedCategories !== 'undefined') {
        try {
          const parsedCategories = JSON.parse(savedCategories);
          setCategories(parsedCategories);
        } catch (parseError) {
          console.error('Erro ao fazer parse das categorias:', parseError);
          const formattedCategories = defaultCategories.map(cat => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            showInHeader: true,
            isActive: true
          }));
          setCategories(formattedCategories);
          localStorage.setItem('finaEstampaCategories', JSON.stringify(formattedCategories));
        }
      } else {
        const formattedCategories = defaultCategories.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          showInHeader: true,
          isActive: true
        }));
        setCategories(formattedCategories);
        localStorage.setItem('finaEstampaCategories', JSON.stringify(formattedCategories));
      }
      
      setError(null);
    } catch (err) {
      console.error('Erro no useCategories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = (categoryData) => {
    try {
      const newCategory = {
        ...categoryData,
        id: Date.now(),
        slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
        isActive: true,
        showInHeader: false
      };

      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('finaEstampaCategories', JSON.stringify(updatedCategories));
      
      return newCategory;
    } catch (err) {
      console.error('Erro ao adicionar categoria:', err);
      throw err;
    }
  };

  const getActiveCategories = () => {
    return categories.filter(cat => cat.isActive);
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    getActiveCategories,
    totalCategories: categories.length
  };
};