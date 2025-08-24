import { useState, useEffect } from 'react';

// Produtos mockados baseados no sistema CMS
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Vestido Floral Elegante',
    description: 'Vestido midi com estampa floral delicada, perfeito para ocasiões especiais.',
    price: 189.90,
    originalPrice: 229.90,
    category: 'vestidos',
    subcategory: 'festa',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400'
    ],
    colors: ['#FF69B4', '#8A2BE2', '#000000'],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    inStock: true,
    featured: true,
    tags: ['elegante', 'festa', 'floral'],
    createdAt: '2024-01-15',
    discount: 17
  },
  {
    id: 2,
    name: 'Blusa Social Feminina',
    description: 'Blusa social em tecido premium, ideal para o ambiente de trabalho.',
    price: 89.90,
    originalPrice: null,
    category: 'blusas',
    subcategory: 'sociais',
    images: [
      'https://images.unsplash.com/photo-1564257577-4b0b4e9a6d3f?w=400',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'
    ],
    colors: ['#FFFFFF', '#000000', '#4169E1'],
    sizes: ['PP', 'P', 'M', 'G'],
    inStock: true,
    featured: false,
    tags: ['social', 'trabalho', 'elegante'],
    createdAt: '2024-01-18'
  },
  {
    id: 3,
    name: 'Calça Jeans Premium',
    description: 'Calça jeans de corte moderno, confeccionada em denim de alta qualidade.',
    price: 159.90,
    originalPrice: 199.90,
    category: 'calcas',
    subcategory: 'jeans',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400'
    ],
    colors: ['#4169E1', '#000080', '#87CEEB'],
    sizes: ['36', '38', '40', '42', '44'],
    inStock: true,
    featured: true,
    tags: ['jeans', 'casual', 'premium'],
    createdAt: '2024-01-20',
    discount: 20
  },
  {
    id: 4,
    name: 'Vestido Midi Casual',
    description: 'Vestido midi confortável para o dia a dia, em tecido macio e respirável.',
    price: 129.90,
    originalPrice: null,
    category: 'vestidos',
    subcategory: 'casuais',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
      'https://images.unsplash.com/photo-1583846112692-f4b6b4c8c3c7?w=400'
    ],
    colors: ['#FF1493', '#32CD32', '#FFD700'],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    inStock: true,
    featured: false,
    tags: ['casual', 'conforto', 'midi'],
    createdAt: '2024-01-22'
  },
  {
    id: 5,
    name: 'Saia Plissada Elegante',
    description: 'Saia plissada midi em tecido fluido, perfeita para looks sofisticados.',
    price: 119.90,
    originalPrice: 149.90,
    category: 'saias',
    subcategory: 'longas',
    images: [
      'https://images.unsplash.com/photo-1583846112692-f4b6b4c8c3c7?w=400',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'
    ],
    colors: ['#000000', '#8B4513', '#DC143C'],
    sizes: ['PP', 'P', 'M', 'G'],
    inStock: true,
    featured: true,
    tags: ['elegante', 'plissada', 'sofisticado'],
    createdAt: '2024-01-25',
    discount: 20
  },
  {
    id: 6,
    name: 'Bolsa de Couro Premium',
    description: 'Bolsa em couro legítimo com acabamento premium e design atemporal.',
    price: 299.90,
    originalPrice: 399.90,
    category: 'acessorios',
    subcategory: 'bolsas',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
    ],
    colors: ['#8B4513', '#000000', '#DC143C'],
    sizes: ['Único'],
    inStock: true,
    featured: true,
    tags: ['couro', 'premium', 'atemporal'],
    createdAt: '2024-01-28',
    discount: 25
  },
  {
    id: 7,
    name: 'Blusa Casual Estampada',
    description: 'Blusa casual com estampa moderna, ideal para looks descontraídos.',
    price: 69.90,
    originalPrice: null,
    category: 'blusas',
    subcategory: 'casuais',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      'https://images.unsplash.com/photo-1564257577-4b0b4e9a6d3f?w=400'
    ],
    colors: ['#FF69B4', '#32CD32', '#FFD700'],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    inStock: true,
    featured: false,
    tags: ['casual', 'estampada', 'moderna'],
    createdAt: '2024-01-30'
  },
  {
    id: 8,
    name: 'Macacão Feminino Elegante',
    description: 'Macacão de corte elegante, perfeito para ocasiões especiais.',
    price: 219.90,
    originalPrice: 279.90,
    category: 'saias',
    subcategory: 'macacoes',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
      'https://images.unsplash.com/photo-1583846112692-f4b6b4c8c3c7?w=400'
    ],
    colors: ['#000000', '#4169E1', '#DC143C'],
    sizes: ['PP', 'P', 'M', 'G'],
    inStock: true,
    featured: true,
    tags: ['elegante', 'macacão', 'especial'],
    createdAt: '2024-02-01',
    discount: 21
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular carregamento de produtos do CMS
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verificar se há produtos salvos no localStorage (CMS)
        const savedProducts = localStorage.getItem('cmsProducts');
        
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          // Combinar produtos do CMS com produtos mockados
          setProducts([...MOCK_PRODUCTS, ...parsedProducts]);
        } else {
          // Usar apenas produtos mockados
          setProducts(MOCK_PRODUCTS);
        }
        
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Erro ao carregar produtos:', err);
        // Em caso de erro, usar produtos mockados
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Função para obter produto por ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  // Função para obter produtos por categoria
  const getProductsByCategory = (category) => {
    if (category === 'todos' || !category) {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  // Função para obter produtos em destaque
  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  // Função para buscar produtos
  const searchProducts = (query) => {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  return {
    products,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts
  };
};