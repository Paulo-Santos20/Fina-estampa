import { useState, useEffect } from 'react';

// Dados iniciais de categorias
const INITIAL_CATEGORIES = [
  {
    id: 'c1',
    name: 'Vestidos',
    description: 'Vestidos para todas as ocasiões',
    image: 'https://picsum.photos/seed/vestidos/400/300',
    isActive: true,
    productCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'c2',
    name: 'Blusas & Camisas',
    description: 'Blusas e camisas femininas',
    image: 'https://picsum.photos/seed/blusas/400/300',
    isActive: true,
    productCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'c3',
    name: 'Calças & Shorts',
    description: 'Calças e shorts para o dia a dia',
    image: 'https://picsum.photos/seed/calcas/400/300',
    isActive: true,
    productCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'c4',
    name: 'Saias & Macacões',
    description: 'Saias e macacões elegantes',
    image: 'https://picsum.photos/seed/saias/400/300',
    isActive: true,
    productCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'c5',
    name: 'Acessórios',
    description: 'Bolsas, joias e acessórios',
    image: 'https://picsum.photos/seed/acessorios/400/300',
    isActive: true,
    productCount: 0,
    createdAt: new Date().toISOString()
  }
];

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar categorias do localStorage
  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem('categories');
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        setCategories(INITIAL_CATEGORIES);
        localStorage.setItem('categories', JSON.stringify(INITIAL_CATEGORIES));
      }
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      setCategories(INITIAL_CATEGORIES);
      setError('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar categorias no localStorage
  const saveCategories = (newCategories) => {
    try {
      localStorage.setItem('categories', JSON.stringify(newCategories));
      setCategories(newCategories);
      
      // Disparar evento para notificar outros componentes
      window.dispatchEvent(new CustomEvent('categoriesUpdated', {
        detail: { categories: newCategories }
      }));
    } catch (err) {
      console.error('Erro ao salvar categorias:', err);
      setError('Erro ao salvar categorias');
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

  // Adicionar categoria
  const addCategory = (categoryData) => {
    try {
      const newCategory = {
        id: `c${Date.now()}`,
        ...categoryData,
        slug: generateSlug(categoryData.name),
        productCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedCategories = [...categories, newCategory];
      saveCategories(updatedCategories);
      return newCategory;
    } catch (err) {
      console.error('Erro ao adicionar categoria:', err);
      setError('Erro ao adicionar categoria');
      return null;
    }
  };

  // Atualizar categoria
  const updateCategory = (categoryId, updateData) => {
    try {
      const updatedCategories = categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            ...updateData,
            slug: updateData.name ? generateSlug(updateData.name) : category.slug,
            updatedAt: new Date().toISOString()
          };
        }
        return category;
      });

      saveCategories(updatedCategories);
      return true;
    } catch (err) {
      console.error('Erro ao atualizar categoria:', err);
      setError('Erro ao atualizar categoria');
      return false;
    }
  };

  // Excluir categoria
  const deleteCategory = (categoryId) => {
    try {
      const updatedCategories = categories.filter(category => category.id !== categoryId);
      saveCategories(updatedCategories);
      return true;
    } catch (err) {
      console.error('Erro ao excluir categoria:', err);
      setError('Erro ao excluir categoria');
      return false;
    }
  };

  // Buscar categorias
  const searchCategories = (query) => {
    if (!query || !query.trim()) return categories;
    
    const searchTerm = query.toLowerCase().trim();
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm)
    );
  };

  // Obter categoria por ID
  const getCategoryById = (categoryId) => {
    return categories.find(category => category.id === categoryId);
  };

  // Obter categorias ativas - FUNÇÃO ADICIONADA
  const getActiveCategories = () => {
    return categories.filter(category => category.isActive);
  };

  // Obter todas as categorias
  const getAllCategories = () => {
    return categories;
  };

  // Toggle status ativo
  const toggleCategoryStatus = (categoryId) => {
    try {
      const updatedCategories = categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isActive: !category.isActive,
            updatedAt: new Date().toISOString()
          };
        }
        return category;
      });

      saveCategories(updatedCategories);
      return true;
    } catch (err) {
      console.error('Erro ao alterar status da categoria:', err);
      setError('Erro ao alterar status');
      return false;
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    searchCategories,
    getCategoryById,
    getActiveCategories, // FUNÇÃO EXPORTADA
    getAllCategories,
    toggleCategoryStatus
  };
};