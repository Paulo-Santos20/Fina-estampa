export const categories = [
  {
    id: 1,
    name: 'Vestidos',
    slug: 'vestidos',
    image: '/assets/categories/vestidos.jpg',
    description: 'Elegância e sofisticação para todas as ocasiões',
    subcategories: ['Casuais', 'Festa', 'Trabalho', 'Longos', 'Midi']
  },
  {
    id: 2,
    name: 'Blusas & Camisas',
    slug: 'blusas',
    image: '/assets/categories/blusas.jpg',
    description: 'Estilo e conforto para o dia a dia',
    subcategories: ['Blusas Casuais', 'Camisas Sociais', 'Regatas', 'Cropped']
  },
  {
    id: 3,
    name: 'Calças & Shorts',
    slug: 'calcas',
    image: '/assets/categories/calcas.jpg',
    description: 'Versatilidade e modernidade',
    subcategories: ['Calças Sociais', 'Jeans', 'Leggings', 'Shorts']
  },
  {
    id: 4,
    name: 'Saias & Macacões',
    slug: 'saias',
    image: '/assets/categories/saias.jpg',
    description: 'Feminilidade e estilo únicos',
    subcategories: ['Saias Midi', 'Saias Longas', 'Macacões', 'Jardineiras']
  },
  {
    id: 5,
    name: 'Acessórios',
    slug: 'acessorios',
    image: '/assets/categories/acessorios.jpg',
    description: 'Detalhes que fazem toda a diferença',
    subcategories: ['Bolsas', 'Joias', 'Sapatos', 'Cintos', 'Lenços']
  },
  {
    id: 6,
    name: 'Coleções Especiais',
    slug: 'colecoes',
    image: '/assets/categories/colecoes.jpg',
    description: 'Peças exclusivas e limitadas',
    subcategories: ['Primavera/Verão', 'Outono/Inverno', 'Festa', 'Executiva']
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};