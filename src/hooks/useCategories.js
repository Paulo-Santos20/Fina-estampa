import { useState, useEffect } from 'react';
import { defaultCategories } from '../data/categories';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  // Carregar categorias do localStorage ou usar dados padrão
  useEffect(() => {
    const savedCategories = localStorage.getItem('finaEstampaCategories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        setCategories(defaultCategories);
        localStorage.setItem('finaEstampaCategories', JSON.stringify(defaultCategories));
      }
    } else {
      setCategories(defaultCategories);
      localStorage.setItem('finaEstampaCategories', JSON.stringify(defaultCategories));
    }
  }, []);

  // Salvar categorias no localStorage sempre que a lista mudar
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('finaEstampaCategories', JSON.stringify(categories));
    }
  }, [categories]);

  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: Date.now(),
      slug: categoryData.name.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      order: categories.length + 1
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (categoryId, categoryData) => {
    setCategories(prev => 
      prev.map(c => c.id === categoryId ? { 
        ...categoryData, 
        id: categoryId,
        slug: categoryData.name.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      } : c)
    );
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  const toggleCategoryHeader = (categoryId) => {
    setCategories(prev => 
      prev.map(c => c.id === categoryId ? { ...c, showInHeader: !c.showInHeader } : c)
    );
  };

  const updateCategoryOrder = (categoryId, newOrder) => {
    setCategories(prev => 
      prev.map(c => c.id === categoryId ? { ...c, order: newOrder } : c)
    );
  };

  const getActiveCategories = () => {
    return categories.filter(c => c.isActive);
  };

  const getHeaderCategories = () => {
    return categories
      .filter(c => c.isActive && c.showInHeader)
      .sort((a, b) => a.order - b.order);
  };

  const getCategoryBySlug = (slug) => {
    return categories.find(c => c.slug === slug);
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryHeader,
    updateCategoryOrder,
    getActiveCategories,
    getHeaderCategories,
    getCategoryBySlug
  };
};