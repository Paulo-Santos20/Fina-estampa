// ===========================================
// DADOS DOS PRODUTOS - FINA ESTAMPA
// ===========================================

// Produtos base
export const allProducts = [
  {
    id: 1,
    name: "Vestido Longo Festa Rosa",
    price: 189.90,
    originalPrice: 229.90,
    salePrice: 189.90,
    isPromo: true,
    discount: 17,
    isNew: false,
    category: "Vestidos",
    subcategory: "Social",
    gender: "Feminino",
    brand: "Fina Estampa",
    material: "Seda",
    description: "Vestido longo elegante perfeito para ocasiões especiais. Tecido fluido e caimento impecável.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    rating: 4.8,
    reviews: 124,
    reviewCount: 124,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Rosa", "Azul", "Preto"]
  },
  {
    id: 2,
    name: "Blusa Social Branca Feminina",
    price: 89.90,
    isPromo: false,
    isNew: true,
    category: "Blusas",
    subcategory: "Social",
    gender: "Feminino",
    brand: "Elegance",
    material: "Algodão",
    description: "Blusa social clássica em algodão premium. Ideal para o ambiente corporativo.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center",
    rating: 4.5,
    reviews: 87,
    reviewCount: 87,
    sizes: ["PP", "P", "M", "G"],
    colors: ["Branco", "Azul", "Rosa"]
  },
  {
    id: 3,
    name: "Calça Jeans Skinny Feminina",
    price: 129.90,
    originalPrice: 159.90,
    salePrice: 129.90,
    isPromo: true,
    discount: 19,
    isNew: false,
    category: "Calças",
    subcategory: "Casual",
    gender: "Feminino",
    brand: "Denim Style",
    material: "Jeans",
    description: "Calça jeans skinny com elastano para maior conforto e modelagem perfeita.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop&crop=center",
    rating: 4.6,
    reviews: 203,
    reviewCount: 203,
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Azul", "Preto", "Cinza"]
  },
  {
    id: 4,
    name: "Biquíni Tropical Estampado",
    price: 79.90,
    isPromo: false,
    isNew: true,
    category: "Moda Praia",
    subcategory: "Praia",
    gender: "Feminino",
    brand: "Beach Life",
    material: "Lycra",
    description: "Biquíni com estampa tropical vibrante. Proteção UV e secagem rápida.",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop&crop=center",
    rating: 4.3,
    reviews: 156,
    reviewCount: 156,
    sizes: ["P", "M", "G"],
    colors: ["Verde", "Azul", "Rosa", "Amarelo"]
  },
  {
    id: 5,
    name: "Top Fitness Feminino",
    price: 59.90,
    isPromo: false,
    isNew: false,
    category: "Fitness",
    subcategory: "Fitness",
    gender: "Feminino",
    brand: "Active Wear",
    material: "Poliéster",
    description: "Top fitness com tecnologia dry-fit. Suporte médio e máximo conforto.",
    image: "https://images.unsplash.com/photo-1506629905607-45c0f5b72962?w=400&h=600&fit=crop&crop=center",
    rating: 4.7,
    reviews: 89,
    reviewCount: 89,
    sizes: ["PP", "P", "M", "G"],
    colors: ["Preto", "Rosa", "Azul", "Verde"]
  },
  {
    id: 6,
    name: "Camisa Polo Masculina",
    price: 99.90,
    isPromo: false,
    isNew: false,
    category: "Camisas",
    subcategory: "Casual",
    gender: "Masculino",
    brand: "Classic Men",
    material: "Algodão",
    description: "Camisa polo clássica em algodão pima. Conforto e elegância para o dia a dia.",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=600&fit=crop&crop=center",
    rating: 4.4,
    reviews: 67,
    reviewCount: 67,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Azul", "Preto", "Verde"]
  },
  {
    id: 7,
    name: "Vestido Infantil Florido",
    price: 69.90,
    isPromo: false,
    isNew: true,
    category: "Vestidos",
    subcategory: "Casual",
    gender: "Infantil",
    brand: "Kids Fashion",
    material: "Algodão",
    description: "Vestido infantil com estampa floral delicada. 100% algodão para pele sensível.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=600&fit=crop&crop=center",
    rating: 4.8,
    reviews: 45,
    reviewCount: 45,
    sizes: ["2", "4", "6", "8", "10"],
    colors: ["Rosa", "Azul", "Amarelo"]
  },
  {
    id: 8,
    name: "Shorts Jeans Feminino",
    price: 79.90,
    originalPrice: 99.90,
    salePrice: 79.90,
    isPromo: true,
    discount: 20,
    isNew: false,
    category: "Shorts",
    subcategory: "Casual",
    gender: "Feminino",
    brand: "Denim Style",
    material: "Jeans",
    description: "Shorts jeans com barra desfiada. Estilo despojado para o verão.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=center",
    rating: 4.2,
    reviews: 134,
    reviewCount: 134,
    sizes: ["36", "38", "40", "42"],
    colors: ["Azul", "Preto", "Branco"]
  },
  {
    id: 9,
    name: "Blazer Social Feminino",
    price: 199.90,
    isPromo: false,
    isNew: false,
    category: "Blazers",
    subcategory: "Social",
    gender: "Feminino",
    brand: "Executive",
    material: "Linho",
    description: "Blazer em linho com corte estruturado. Elegância para o ambiente profissional.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=center",
    rating: 4.6,
    reviews: 78,
    reviewCount: 78,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Azul", "Cinza"]
  },
  {
    id: 10,
    name: "Legging Fitness Feminina",
    price: 89.90,
    isPromo: false,
    isNew: true,
    category: "Leggings",
    subcategory: "Fitness",
    gender: "Feminino",
    brand: "Active Wear",
    material: "Poliéster",
    description: "Legging fitness com tecnologia anti-odor. Compressão graduada e costura plana.",
    image: "https://images.unsplash.com/photo-1506629905607-45c0f5b72962?w=400&h=600&fit=crop&crop=center",
    rating: 4.5,
    reviews: 167,
    reviewCount: 167,
    sizes: ["PP", "P", "M", "G"],
    colors: ["Preto", "Cinza", "Azul", "Verde"]
  },
  {
    id: 11,
    name: "Camiseta Básica Masculina",
    price: 39.90,
    isPromo: false,
    isNew: false,
    category: "Camisetas",
    subcategory: "Casual",
    gender: "Masculino",
    brand: "Basic Wear",
    material: "Algodão",
    description: "Camiseta básica em algodão 100%. Corte reto e modelagem confortável.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop&crop=center",
    rating: 4.3,
    reviews: 234,
    reviewCount: 234,
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: ["Branco", "Preto", "Cinza", "Azul", "Verde"]
  },
  {
    id: 12,
    name: "Saída de Praia Feminina",
    price: 119.90,
    isPromo: false,
    isNew: true,
    category: "Moda Praia",
    subcategory: "Praia",
    gender: "Feminino",
    brand: "Beach Life",
    material: "Viscose",
    description: "Saída de praia em viscose fluida. Proteção solar e estilo para a praia.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop&crop=center",
    rating: 4.4,
    reviews: 92,
    reviewCount: 92,
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Azul", "Verde", "Rosa"]
  },
  {
    id: 13,
    name: "Jaqueta Jeans Feminina",
    price: 149.90,
    originalPrice: 189.90,
    salePrice: 149.90,
    isPromo: true,
    discount: 21,
    isNew: false,
    category: "Jaquetas",
    subcategory: "Casual",
    gender: "Feminino",
    brand: "Denim Style",
    material: "Jeans",
    description: "Jaqueta jeans clássica com lavagem especial. Versátil para diversas ocasiões.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center",
    rating: 4.7,
    reviews: 156,
    reviewCount: 156,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul", "Preto", "Branco"]
  },
  {
    id: 14,
    name: "Conjunto Fitness Feminino",
    price: 129.90,
    isPromo: false,
    isNew: true,
    category: "Conjuntos",
    subcategory: "Fitness",
    gender: "Feminino",
    brand: "Active Wear",
    material: "Poliéster",
    description: "Conjunto fitness completo com top e legging. Tecnologia dry-fit avançada.",
    image: "https://images.unsplash.com/photo-1506629905607-45c0f5b72962?w=400&h=600&fit=crop&crop=center",
    rating: 4.6,
    reviews: 98,
    reviewCount: 98,
    sizes: ["PP", "P", "M", "G"],
    colors: ["Preto", "Rosa", "Azul", "Verde", "Cinza"]
  },
  {
    id: 15,
    name: "Bermuda Masculina",
    price: 69.90,
    isPromo: false,
    isNew: false,
    category: "Bermudas",
    subcategory: "Casual",
    gender: "Masculino",
    brand: "Classic Men",
    material: "Algodão",
    description: "Bermuda masculina em sarja de algodão. Conforto e praticidade para o dia a dia.",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=600&fit=crop&crop=center",
    rating: 4.2,
    reviews: 143,
    reviewCount: 143,
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: ["Azul", "Preto", "Cinza", "Verde"]
  },
  {
    id: 16,
    name: "Saia Midi Feminina",
    price: 99.90,
    originalPrice: 129.90,
    salePrice: 99.90,
    isPromo: true,
    discount: 23,
    isNew: false,
    category: "Saias",
    subcategory: "Social",
    gender: "Feminino",
    brand: "Elegance",
    material: "Viscose",
    description: "Saia midi em viscose com caimento fluido. Elegante e versátil para diversas ocasiões.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    rating: 4.5,
    reviews: 187,
    reviewCount: 187,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Azul", "Rosa", "Cinza"]
  },
  {
    id: 17,
    name: "Macacão Feminino",
    price: 159.90,
    originalPrice: 199.90,
    salePrice: 159.90,
    isPromo: true,
    discount: 20,
    isNew: true,
    category: "Macacões",
    subcategory: "Casual",
    gender: "Feminino",
    brand: "Fina Estampa",
    material: "Viscose",
    description: "Macacão feminino com amarração na cintura. Estilo moderno e confortável.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    rating: 4.7,
    reviews: 112,
    reviewCount: 112,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Verde", "Azul"]
  },
  {
    id: 18,
    name: "Tênis Feminino",
    price: 179.90,
    isPromo: false,
    isNew: true,
    category: "Calçados",
    subcategory: "Casual",
    gender: "Feminino",
    brand: "Sport Style",
    material: "Sintético",
    description: "Tênis feminino com design moderno. Solado anatômico e máximo conforto.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    rating: 4.4,
    reviews: 89,
    reviewCount: 89,
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Branco", "Preto", "Rosa"]
  },
  {
    id: 19,
    name: "Bolsa Feminina",
    price: 129.90,
    isPromo: false,
    isNew: false,
    category: "Acessórios",
    subcategory: "Social",
    gender: "Feminino",
    brand: "Elegance",
    material: "Couro Sintético",
    description: "Bolsa feminina em couro sintético. Design elegante com compartimentos organizadores.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    rating: 4.3,
    reviews: 156,
    reviewCount: 156,
    sizes: ["Único"],
    colors: ["Preto", "Marrom", "Bege"]
  },
  {
    id: 20,
    name: "Colar Feminino",
    price: 49.90,
    originalPrice: 69.90,
    salePrice: 49.90,
    isPromo: true,
    discount: 29,
    isNew: false,
    category: "Acessórios",
    subcategory: "Social",
    gender: "Feminino",
    brand: "Jewelry",
    material: "Metal",
    description: "Colar feminino dourado com pingente delicado. Acabamento premium e hipoalergênico.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    rating: 4.6,
    reviews: 234,
    reviewCount: 234,
    sizes: ["Único"],
    colors: ["Dourado", "Prateado"]
  }
];

// ===========================================
// CATEGORIAS
// ===========================================

export const categories = [
  {
    id: 1,
    name: "Vestidos",
    slug: "vestidos",
    description: "Vestidos elegantes para todas as ocasiões",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop",
    featured: true,
    itemCount: 0
  },
  {
    id: 2,
    name: "Blusas & Camisas",
    slug: "blusas",
    description: "Blusas e camisas para o dia a dia e trabalho",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
    featured: true,
    itemCount: 0
  },
  {
    id: 3,
    name: "Calças & Shorts",
    slug: "calcas",
    description: "Calças e shorts para todos os estilos",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop",
    featured: true,
    itemCount: 0
  },
  {
    id: 4,
    name: "Saias & Macacões",
    slug: "saias",
    description: "Saias e macacões modernos e elegantes",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop",
    featured: true,
    itemCount: 0
  },
  {
    id: 5,
    name: "Acessórios",
    slug: "acessorios",
    description: "Bolsas, joias e acessórios para completar o look",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop",
    featured: true,
    itemCount: 0
  },
  {
    id: 6,
    name: "Calçados",
    slug: "calcados",
    description: "Sapatos, sandálias e tênis femininos",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop",
    featured: true,
    itemCount: 0
  }
];

// ===========================================
// PRODUTOS ORGANIZADOS
// ===========================================

// Produtos em destaque (apenas uma declaração)
export const featuredProducts = allProducts.filter(product => 
  product.rating >= 4.5 || product.reviewCount >= 100
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
  blusas: allProducts.filter(p => p.category === "Blusas" || p.category === "Camisas"),
  calcas: allProducts.filter(p => p.category === "Calças" || p.category === "Shorts" || p.category === "Bermudas"),
  saias: allProducts.filter(p => p.category === "Saias" || p.category === "Macacões"),
  acessorios: allProducts.filter(p => p.category === "Acessórios"),
  calcados: allProducts.filter(p => p.category === "Calçados")
};

// Atualizar contagem de itens nas categorias
categories.forEach(category => {
  const categoryKey = category.slug;
  category.itemCount = productsByCategory[categoryKey]?.length || 0;
});

// ===========================================
// DADOS PARA FILTROS
// ===========================================

export const filterOptions = {
  genders: ["Feminino", "Masculino", "Infantil"],
  subcategories: ["Casual", "Social", "Fitness", "Praia"],
  brands: [
    "Fina Estampa", 
    "Elegance", 
    "Denim Style", 
    "Beach Life", 
    "Active Wear", 
    "Classic Men", 
    "Kids Fashion", 
    "Executive", 
    "Basic Wear",
    "Sport Style",
    "Jewelry"
  ],
  materials: ["Algodão", "Jeans", "Seda", "Lycra", "Poliéster", "Linho", "Viscose", "Sintético", "Couro Sintético", "Metal"],
  colors: ["Branco", "Preto", "Azul", "Rosa", "Verde", "Cinza", "Amarelo", "Marrom", "Bege", "Dourado", "Prateado"],
  priceRanges: [
    { label: "Até R$ 50", min: 0, max: 50 },
    { label: "R$ 51 - R$ 100", min: 51, max: 100 },
    { label: "R$ 101 - R$ 150", min: 101, max: 150 },
    { label: "R$ 151 - R$ 200", min: 151, max: 200 },
    { label: "Acima de R$ 200", min: 201, max: Infinity }
  ]
};

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
    'blusas': ['Blusas', 'Camisas'],
    'calcas': ['Calças', 'Shorts', 'Bermudas'],
    'saias': ['Saias', 'Macacões'],
    'acessorios': ['Acessórios'],
    'calcados': ['Calçados']
  };

  const categoryNames = categoryMapping[categorySlug] || [];
  return allProducts.filter(product => categoryNames.includes(product.category));
};

// Função para buscar produtos por subcategoria
export const getProductsBySubcategory = (subcategory) => {
  return allProducts.filter(product => 
    product.subcategory?.toLowerCase() === subcategory.toLowerCase()
  );
};

// Função para buscar produtos por gênero
export const getProductsByGender = (gender) => {
  return allProducts.filter(product => 
    product.gender?.toLowerCase() === gender.toLowerCase()
  );
};

// Função para buscar produtos em promoção
export const getPromotionProducts = () => {
  return allProducts.filter(product => product.isPromo);
};

// Função para buscar produtos novos
export const getNewProducts = () => {
  return allProducts.filter(product => product.isNew);
};

// Função para buscar produtos por faixa de preço
export const getProductsByPriceRange = (min, max) => {
  return allProducts.filter(product => {
    const price = product.salePrice || product.price;
    return price >= min && price <= max;
  });
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