import { useState, useEffect } from 'react';

// Dados simulados das categorias
const initialCategories = [
  {
    id: 1,
    name: 'Vestidos',
    description: 'Vestidos para todas as ocasiões',
    slug: 'vestidos',
    order: 1,
    showInHeader: true,
    isActive: true,
    image: '/assets/categories/vestidos.jpg',
    productCount: 45
  },
  {
    id: 2,
    name: 'Blusas',
    description: 'Blusas casuais e sociais',
    slug: 'blusas',
    order: 2,
    showInHeader: true,
    isActive: true,
    image: '/assets/categories/blusas.jpg',
    productCount: 32
  },
  {
    id: 3,
    name: 'Calças',
    description: 'Calças jeans, sociais e casuais',
    slug: 'calcas',
    order: 3,
    showInHeader: true,
    isActive: true,
    image: '/assets/categories/calcas.jpg',
    productCount: 28
  },
  {
    id: 4,
    name: 'Saias',
    description: 'Saias midi, longas e curtas',
    slug: 'saias',
    order: 4,
    showInHeader: true,
    isActive: true,
    image: '/assets/categories/saias.jpg',
    productCount: 18
  },
  {
    id: 5,
    name: 'Acessórios',
    description: 'Bolsas, joias e acessórios',
    slug: 'acessorios',
    order: 5,
    showInHeader: true,
    isActive: true,
    image: '/assets/categories/acessorios.jpg',
    productCount: 24
  },
  {
    id: 6,
    name: 'Moda Praia',
    description: 'Biquínis, maiôs e saídas',
    slug: 'moda-praia',
    order: 6,
    showInHeader: false,
    isActive: true,
    image: '/assets/categories/moda-praia.jpg',
    productCount: 12
  }
];

export const useCategories = () => {
  const [categories, setCategories] = useState(initialCategories);

  // Carregar categorias do localStorage ou API
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Salvar categorias no localStorage
  const saveCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  // Atualizar ordem das categorias
  const updateCategoryOrder = (categoryId, newOrder) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, order: newOrder };
      }
      return cat;
    });
    
    // Reordenar todas as categorias
    updatedCategories.sort((a, b) => a.order - b.order);
    
    saveCategories(updatedCategories);
  };

  // Toggle categoria no header
  const toggleCategoryHeader = (categoryId) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, showInHeader: !cat.showInHeader };
      }
      return cat;
    });
    
    saveCategories(updatedCategories);
  };

  // Ativar/desativar categoria
  const toggleCategoryActive = (categoryId) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, isActive: !cat.isActive };
      }
      return cat;
    });
    
    saveCategories(updatedCategories);
  };

  // Adicionar nova categoria
  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: Date.now(),
      order: categories.length + 1,
      productCount: 0
    };
    
    const updatedCategories = [...categories, newCategory];
    saveCategories(updatedCategories);
  };

  // Atualizar categoria
  const updateCategory = (categoryId, categoryData) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, ...categoryData };
      }
      return cat;
    });
    
    saveCategories(updatedCategories);
  };

  // Deletar categoria
  const deleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    saveCategories(updatedCategories);
  };

  // Obter categorias do header
  const getHeaderCategories = (maxCategories = 6) => {
    return categories
      .filter(cat => cat.showInHeader && cat.isActive)
      .sort((a, b) => a.order - b.order)
      .slice(0, maxCategories);
  };

  return {
    categories,
    updateCategoryOrder,
    toggleCategoryHeader,
    toggleCategoryActive,
    addCategory,
    updateCategory,
    deleteCategory,
    getHeaderCategories
  };
};