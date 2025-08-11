// src/hooks/useCategories.js
import { useMemo } from 'react';
import { useCMS } from '../contexts/CMSContext.jsx';

// Categorias padrão (fallback) — ajuste os slugs/imagens conforme seu projeto
const DEFAULT_CATEGORIES = [
  {
    id: 'vestidos',
    name: 'Vestidos',
    slug: 'vestidos',
    image: '/public/assets/categories/vestidos.jpg',
    children: [
      { id: 'casuais', name: 'Casuais', slug: 'vestidos-casuais' },
      { id: 'festa', name: 'Festa', slug: 'vestidos-festa' },
      { id: 'trabalho', name: 'Trabalho', slug: 'vestidos-trabalho' },
    ],
  },
  {
    id: 'blusas',
    name: 'Blusas & Camisas',
    slug: 'blusas',
    image: '/public/assets/categories/blusas.jpg',
    children: [
      { id: 'camisetas', name: 'Camisetas', slug: 'camisetas' },
      { id: 'camisas', name: 'Camisas', slug: 'camisas' },
      { id: 'croppeds', name: 'Croppeds', slug: 'croppeds' },
    ],
  },
  {
    id: 'calcas',
    name: 'Calças & Shorts',
    slug: 'calcas',
    image: '/public/assets/categories/calcas.jpg',
    children: [
      { id: 'jeans', name: 'Jeans', slug: 'jeans' },
      { id: 'alfaiataria', name: 'Alfaiataria', slug: 'alfaiataria' },
      { id: 'shorts', name: 'Shorts', slug: 'shorts' },
    ],
  },
  {
    id: 'saias-macacoes',
    name: 'Saias & Macacões',
    slug: 'saias-macacoes',
    image: '/public/assets/categories/saias.jpg',
    children: [
      { id: 'saias', name: 'Saias', slug: 'saias' },
      { id: 'macacoes', name: 'Macacões', slug: 'macacoes' },
    ],
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    slug: 'acessorios',
    image: '/public/assets/categories/acessorios.jpg',
    children: [
      { id: 'bolsas', name: 'Bolsas', slug: 'bolsas' },
      { id: 'joias', name: 'Joias', slug: 'joias' },
      { id: 'sapatos', name: 'Sapatos', slug: 'sapatos' },
    ],
  },
  {
    id: 'colecoes',
    name: 'Coleções Especiais',
    slug: 'colecoes',
    image: '/public/assets/categories/colecoes.jpg',
    children: [
      { id: 'novidades', name: 'Novidades', slug: 'novidades' },
      { id: 'basicos', name: 'Básicos', slug: 'basicos' },
      { id: 'premium', name: 'Premium', slug: 'premium' },
    ],
  },
];

// Hook principal
export function useCategories() {
  const { header, categories: cmsCategories } = useCMS() || {};

  // Decide a fonte das categorias: CMS (quando existir/for válido) ou fallback
  const categories = useMemo(() => {
    // Se o CMS já tiver categorias, use-as
    if (Array.isArray(cmsCategories) && cmsCategories.length > 0) {
      return cmsCategories;
    }
    // Alguns projetos armazenam dentro de header.categories
    if (header && Array.isArray(header.categories) && header.categories.length > 0) {
      return header.categories;
    }
    // Fallback
    return DEFAULT_CATEGORIES;
  }, [header, cmsCategories]);

  // Lista achatada de subcategorias (útil para sugestões de busca)
  const flatSubcategories = useMemo(() => {
    const flat = [];
    categories.forEach(cat => {
      if (Array.isArray(cat.children)) {
        cat.children.forEach(child => {
          flat.push({
            parentId: cat.id,
            parentName: cat.name,
            id: child.id,
            name: child.name,
            slug: child.slug,
            image: cat.image, // opcional: usar imagem da categoria pai
          });
        });
      }
    });
    return flat;
  }, [categories]);

  // Sugestões baseadas em termo e lista de produtos opcional
  const getSuggestions = (term = '', products = []) => {
    const q = term.trim().toLowerCase();
    if (!q) {
      return {
        categories: categories.slice(0, 6),
        subcategories: flatSubcategories.slice(0, 8),
        products: products.slice(0, 6),
      };
    }

    const match = (text) => String(text || '').toLowerCase().includes(q);

    const matchedCategories = categories.filter(
      (c) => match(c.name) || match(c.slug)
    );

    const matchedSubcategories = flatSubcategories.filter(
      (s) => match(s.name) || match(s.slug) || match(s.parentName)
    );

    const matchedProducts = Array.isArray(products)
      ? products.filter(
          (p) =>
            match(p.name) ||
            match(p.title) ||
            match(p.category) ||
            match(p.slug) ||
            match(p.color) ||
            match(p.size)
        )
      : [];

    return {
      categories: matchedCategories.slice(0, 6),
      subcategories: matchedSubcategories.slice(0, 8),
      products: matchedProducts.slice(0, 6),
    };
  };

  return {
    categories,
    flatSubcategories,
    getSuggestions,
  };
}

// Export default para compatibilidade com imports default existentes
export default useCategories;