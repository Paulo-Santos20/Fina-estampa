// ===========================================
// DADOS DOS PRODUTOS - FINA ESTAMPA
// ===========================================

// Produtos base
export const allProducts = [
  {
    id: 1,
    name: "Vestido Longo Festa Rosa",
    price: 189.90,
    salePrice: 149.90,
    image: "https://images.unsplash.com/photo-1566479179817-c0c8e7c5b1f3?w=400&h=500&fit=crop&crop=center",
    category: "Vestidos",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Rosa", "Azul", "Preto", "Branco"],
    rating: 4.8,
    reviewCount: 127,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: true,
    brand: "Fina Estampa",
    description: "Vestido longo elegante perfeito para festas e ocasiões especiais"
  },
  {
    id: 2,
    name: "Blusa Elegante Branca",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop&crop=center",
    category: "Blusas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Preto", "Bege"],
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Fina Estampa",
    description: "Blusa elegante para o dia a dia profissional"
  },
  {
    id: 3,
    name: "Calça Social Preta",
    price: 129.90,
    salePrice: 99.90,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop&crop=center",
    category: "Calças",
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Preto", "Marinho", "Cinza"],
    rating: 4.7,
    reviewCount: 156,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: false,
    brand: "Premium",
    description: "Calça social de alfaiataria com caimento perfeito"
  },
  {
    id: 4,
    name: "Saia Midi Floral",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d9e?w=400&h=500&fit=crop&crop=center",
    category: "Saias",
    sizes: ["PP", "P", "M", "G"],
    colors: ["Floral", "Rosa", "Azul"],
    rating: 4.5,
    reviewCount: 73,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Casual",
    description: "Saia midi com estampa floral romântica"
  },
  {
    id: 5,
    name: "Bolsa Couro Premium",
    price: 249.90,
    salePrice: 199.90,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&crop=center",
    category: "Acessórios",
    sizes: ["Único"],
    colors: ["Camel", "Preto", "Marrom"],
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: true,
    brand: "Premium",
    description: "Bolsa em couro legítimo com acabamento premium"
  },
  {
    id: 6,
    name: "Vestido Casual Azul",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&crop=center",
    category: "Vestidos",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul", "Verde", "Rosa"],
    rating: 4.4,
    reviewCount: 91,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Casual",
    description: "Vestido casual confortável para o dia a dia"
  },
  {
    id: 7,
    name: "Blazer Executivo",
    price: 199.90,
    salePrice: 159.90,
    image: "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=400&h=500&fit=crop&crop=center",
    category: "Blazers",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Marinho", "Bege"],
    rating: 4.8,
    reviewCount: 134,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: false,
    brand: "Elegance",
    description: "Blazer executivo de alfaiataria impecável"
  },
  {
    id: 8,
    name: "Macacão Elegante",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&crop=center",
    category: "Macacões",
    sizes: ["PP", "P", "M", "G"],
    colors: ["Preto", "Vinho", "Azul"],
    rating: 4.6,
    reviewCount: 67,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Fina Estampa",
    description: "Macacão elegante versátil para diversas ocasiões"
  },
  {
    id: 9,
    name: "Colar Dourado",
    price: 69.90,
    salePrice: 49.90,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop&crop=center",
    category: "Acessórios",
    sizes: ["Único"],
    colors: ["Dourado", "Prateado"],
    rating: 4.7,
    reviewCount: 89,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: false,
    brand: "Elegance",
    description: "Colar dourado delicado para complementar o look"
  },
  {
    id: 10,
    name: "Camisa Social Listrada",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop&crop=center",
    category: "Blusas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Listrada", "Branco", "Azul"],
    rating: 4.5,
    reviewCount: 112,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Premium",
    description: "Camisa social listrada clássica e atemporal"
  },
  {
    id: 11,
    name: "Sapato Salto Alto",
    price: 179.90,
    salePrice: 139.90,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop&crop=center",
    category: "Calçados",
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Preto", "Nude", "Vermelho"],
    rating: 4.8,
    reviewCount: 178,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: false,
    brand: "Elegance",
    description: "Sapato de salto alto elegante e confortável"
  },
  {
    id: 12,
    name: "Jaqueta Jeans",
    price: 139.90,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&crop=center",
    category: "Jaquetas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Jeans", "Preto", "Branco"],
    rating: 4.6,
    reviewCount: 95,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Casual",
    description: "Jaqueta jeans clássica para looks despojados"
  },
  {
    id: 13,
    name: "Vestido Midi Preto",
    price: 149.90,
    salePrice: 119.90,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&crop=center",
    category: "Vestidos",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Preto", "Marinho", "Vinho"],
    rating: 4.7,
    reviewCount: 145,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: false,
    brand: "Fina Estampa",
    description: "Vestido midi clássico para todas as ocasiões"
  },
  {
    id: 14,
    name: "Blusa Manga Longa",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1564257577-0b8b4b6b6b6b?w=400&h=500&fit=crop&crop=center",
    category: "Blusas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Preto", "Rosa", "Azul"],
    rating: 4.3,
    reviewCount: 67,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Casual",
    description: "Blusa manga longa básica e versátil"
  },
  {
    id: 15,
    name: "Calça Skinny Jeans",
    price: 109.90,
    salePrice: 89.90,
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=500&fit=crop&crop=center",
    category: "Calças",
    sizes: ["36", "38", "40", "42", "44", "46"],
    colors: ["Jeans", "Preto", "Branco"],
    rating: 4.5,
    reviewCount: 198,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: false,
    brand: "Casual",
    description: "Calça skinny jeans com elastano para maior conforto"
  },
  {
    id: 16,
    name: "Saia Longa Plissada",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&crop=center",
    category: "Saias",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Preto", "Bege", "Rosa", "Azul"],
    rating: 4.6,
    reviewCount: 87,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Elegance",
    description: "Saia longa plissada elegante e fluida"
  },
  {
    id: 17,
    name: "Óculos de Sol",
    price: 89.90,
    salePrice: 69.90,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop&crop=center",
    category: "Acessórios",
    sizes: ["Único"],
    colors: ["Preto", "Marrom", "Dourado"],
    rating: 4.4,
    reviewCount: 156,
    isNew: false,
    isPromo: true,
    inStock: true,
    freeShipping: false,
    brand: "Premium",
    description: "Óculos de sol com proteção UV e design moderno"
  },
  {
    id: 18,
    name: "Sandália Rasteirinha",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=500&fit=crop&crop=center",
    category: "Calçados",
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Nude", "Preto", "Camel", "Branco"],
    rating: 4.2,
    reviewCount: 234,
    isNew: true,
    isPromo: false,
    inStock: true,
    freeShipping: false,
    brand: "Casual",
    description: "Sandália rasteirinha confortável para o verão"
  }
];

// ===========================================
// CATEGORIAS
// ===========================================

export const categories = [
  {
    id: 1,
    name: 'Vestidos',
    slug: 'vestidos',
    description: 'Elegância em cada ocasião - do casual ao formal',
    image: 'https://images.unsplash.com/photo-1566479179817-c0c8e7c5b1f3?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: true
  },
  {
    id: 2,
    name: 'Blusas',
    slug: 'blusas',
    description: 'Sofisticação no dia a dia com muito estilo',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: true
  },
  {
    id: 3,
    name: 'Calças',
    slug: 'calcas',
    description: 'Conforto e estilo para todas as ocasiões',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: true
  },
  {
    id: 4,
    name: 'Saias',
    slug: 'saias',
    description: 'Feminilidade moderna em cada movimento',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d9e?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: false
  },
  {
    id: 5,
    name: 'Acessórios',
    slug: 'acessorios',
    description: 'Detalhes que fazem toda a diferença',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: true
  },
  {
    id: 6,
    name: 'Calçados',
    slug: 'calcados',
    description: 'Pisada com personalidade e conforto',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: false
  },
  {
    id: 7,
    name: 'Blazers',
    slug: 'blazers',
    description: 'Elegância profissional e casual',
    image: 'https://images.unsplash.com/photo-1544957992-20514f595d6f?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: false
  },
  {
    id: 8,
    name: 'Jaquetas',
    slug: 'jaquetas',
    description: 'Proteção com muito estilo',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop&crop=center',
    itemCount: 0, // Será calculado dinamicamente
    featured: false
  }
];

// ===========================================
// PRODUTOS ORGANIZADOS
// ===========================================

// Produtos em destaque
export const featuredProducts = allProducts.filter(product => 
  product.rating >= 4.7 || product.reviewCount >= 100
).slice(0, 8);

// Novidades (produtos novos)
export const newArrivals = allProducts.filter(product => 
  product.isNew === true
).slice(0, 6);

// Produtos em promoção
export const saleProducts = allProducts.filter(product => 
  product.isPromo === true && product.salePrice
).slice(0, 8);

// Produtos por categoria
export const productsByCategory = {
  vestidos: allProducts.filter(p => p.category === "Vestidos"),
  blusas: allProducts.filter(p => p.category === "Blusas"),
  calcas: allProducts.filter(p => p.category === "Calças"),
  saias: allProducts.filter(p => p.category === "Saias" || p.category === "Macacões"),
  acessorios: allProducts.filter(p => p.category === "Acessórios"),
  blazers: allProducts.filter(p => p.category === "Blazers"),
  jaquetas: allProducts.filter(p => p.category === "Jaquetas"),
  calcados: allProducts.filter(p => p.category === "Calçados")
};

// Atualizar contagem de itens nas categorias
categories.forEach(category => {
  const categoryKey = category.slug === 'saias' ? 'saias' : category.slug;
  category.itemCount = productsByCategory[categoryKey]?.length || 0;
});

// ===========================================
// FUNÇÕES HELPER
// ===========================================

// Função para buscar categoria por slug
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

// Função para buscar categorias em destaque
export const getFeaturedCategories = () => {
  return categories.filter(category => category.featured);
};

// Função para buscar todas as categorias
export const getAllCategories = () => {
  return categories;
};

// Função para buscar produto por ID
export const getProductById = (id) => {
  return allProducts.find(product => product.id === parseInt(id));
};

// Função para buscar produtos por categoria
export const getProductsByCategory = (categorySlug) => {
  const categoryMapping = {
    'vestidos': ['Vestidos'],
    'blusas': ['Blusas'],
    'calcas': ['Calças'],
    'saias': ['Saias', 'Macacões'],
    'acessorios': ['Acessórios'],
    'blazers': ['Blazers'],
    'jaquetas': ['Jaquetas'],
    'calcados': ['Calçados']
  };

  const categoryNames = categoryMapping[categorySlug] || [];
  return allProducts.filter(product => categoryNames.includes(product.category));
};

// Função para buscar produtos similares
export const getSimilarProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];

  return allProducts
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

// Função para buscar produtos por termo
export const searchProducts = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.colors.some(color => color.toLowerCase().includes(term))
  );
};

// ===========================================
// CONFIGURAÇÕES DO SITE
// ===========================================

export const siteConfig = {
  name: "Fina Estampa",
  description: "Moda feminina com elegância e sofisticação",
  whatsapp: "+5511999999999",
  email: "contato@finaestampa.com.br",
  instagram: "@finaestampa",
  facebook: "finaestampa",
  address: "Rua da Moda, 123 - São Paulo, SP",
  cep: "01234-567"
};

// Configurações de frete
export const shippingConfig = {
  freeShippingMinValue: 199.90,
  defaultShippingCost: 15.90,
  expressShippingCost: 25.90,
  deliveryDays: {
    standard: "5 a 10 dias úteis",
    express: "2 a 5 dias úteis"
  }
};

// Formas de pagamento
export const paymentMethods = [
  {
    id: "pix",
    name: "PIX",
    description: "Aprovação imediata",
    discount: 5,
    installments: false
  },
  {
    id: "credit",
    name: "Cartão de Crédito",
    description: "Até 12x sem juros",
    installments: true,
    maxInstallments: 12
  },
  {
    id: "debit",
    name: "Cartão de Débito",
    description: "Débito à vista",
    installments: false
  },
  {
    id: "boleto",
    name: "Boleto Bancário",
    description: "Vencimento em 3 dias úteis",
    installments: false
  }
];

// Tamanhos disponíveis por categoria
export const sizesByCategory = {
  roupas: ["PP", "P", "M", "G", "GG", "XG"],
  calcas: ["36", "38", "40", "42", "44", "46", "48"],
  calcados: ["35", "36", "37", "38", "39", "40", "41", "42"],
  acessorios: ["Único", "P", "M", "G"]
};

// Cores disponíveis
export const availableColors = [
  "Preto", "Branco", "Azul", "Rosa", "Vinho", 
  "Bege", "Verde", "Amarelo", "Cinza", "Marrom",
  "Roxo", "Laranja", "Nude", "Dourado", "Prateado",
  "Jeans", "Floral", "Listrada"
];

// Marcas disponíveis
export const availableBrands = [
  "Fina Estampa", "Premium", "Casual", "Elegance"
];

// Export default
export default allProducts;