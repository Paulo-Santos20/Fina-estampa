// Produtos com imagens de repositórios públicos que funcionam
export const featuredProducts = [
  {
    id: 1,
    name: "Vestido Longo Festa Rosa",
    price: 299.90,
    originalPrice: 399.90,
    salePrice: 299.90,
    isPromo: true,
    discount: 25,
    isNew: false,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dress/3D/dress_3d.png",
    rating: 4.8,
    reviews: 124,
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Rosa", "Azul", "Preto"],
    category: "vestidos"
  },
  {
    id: 2,
    name: "Blusa Elegante Manga Longa",
    price: 159.90,
    isPromo: false,
    isNew: true,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Womans%20clothes/3D/womans_clothes_3d.png",
    rating: 4.6,
    reviews: 89,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Preto", "Bege"],
    category: "blusas"
  },
  {
    id: 3,
    name: "Calça Social Cintura Alta",
    price: 189.90,
    isPromo: false,
    isNew: false,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Jeans/3D/jeans_3d.png",
    rating: 4.7,
    reviews: 156,
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Preto", "Marinho", "Cinza"],
    category: "calcas"
  },
  {
    id: 4,
    name: "Saia Midi Plissada",
    price: 129.90,
    originalPrice: 179.90,
    salePrice: 129.90,
    isPromo: true,
    discount: 28,
    isNew: false,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dress/3D/dress_3d.png",
    rating: 4.5,
    reviews: 67,
    sizes: ["PP", "P", "M", "G"],
    colors: ["Vinho", "Preto", "Camel"],
    category: "saias"
  },
  {
    id: 5,
    name: "Blazer Estruturado",
    price: 249.90,
    isPromo: false,
    isNew: true,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Coat/3D/coat_3d.png",
    rating: 4.9,
    reviews: 203,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco", "Camel"],
    category: "blazers"
  },
  {
    id: 6,
    name: "Vestido Midi Floral",
    price: 199.90,
    originalPrice: 259.90,
    salePrice: 199.90,
    isPromo: true,
    discount: 23,
    isNew: false,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dress/3D/dress_3d.png",
    rating: 4.4,
    reviews: 98,
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Floral Rosa", "Floral Azul", "Floral Preto"],
    category: "vestidos"
  },
  {
    id: 7,
    name: "Macacão Longo Elegante",
    price: 279.90,
    isPromo: false,
    isNew: true,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Womans%20clothes/3D/womans_clothes_3d.png",
    rating: 4.6,
    reviews: 145,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Marinho", "Verde"],
    category: "macacoes"
  },
  {
    id: 8,
    name: "Cropped Tricot Delicado",
    price: 89.90,
    isPromo: false,
    isNew: false,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Womans%20clothes/3D/womans_clothes_3d.png",
    rating: 4.3,
    reviews: 76,
    sizes: ["PP", "P", "M", "G"],
    colors: ["Rosa", "Branco", "Bege", "Preto"],
    category: "blusas"
  }
];

export const newArrivals = [
  {
    id: 9,
    name: "Conjunto Duas Peças",
    price: 219.90,
    isPromo: false,
    isNew: true,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Womans%20clothes/3D/womans_clothes_3d.png",
    rating: 4.7,
    reviews: 54,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Bege", "Preto", "Branco"],
    category: "conjuntos"
  },
  {
    id: 10,
    name: "Camisa Oversized",
    price: 139.90,
    originalPrice: 189.90,
    salePrice: 139.90,
    isPromo: true,
    discount: 26,
    isNew: true,
    image: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Womans%20clothes/3D/womans_clothes_3d.png",
    rating: 4.5,
    reviews: 32,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Azul", "Listrado"],
    category: "camisas"
  }
];

export const bestSellers = [
  ...featuredProducts.slice(0, 6)
];

export const allProducts = [
  ...featuredProducts,
  ...newArrivals
];