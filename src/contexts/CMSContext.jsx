// src/contexts/CMSContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext();

// Dados padrão das categorias com imagens
const DEFAULT_CATEGORIES_SHOWCASE = [
  {
    id: 'c1',
    name: 'Vestidos',
    slug: 'vestidos',
    description: 'Elegância e sofisticação para todas as ocasiões',
    image: '',
    active: true,
    order: 1,
    showInHome: true
  },
  {
    id: 'c2',
    name: 'Blusas & Camisas',
    slug: 'blusas-camisas',
    description: 'Peças versáteis para o dia a dia',
    image: '',
    active: true,
    order: 2,
    showInHome: true
  },
  {
    id: 'c5',
    name: 'Acessórios',
    slug: 'acessorios',
    description: 'Complete seu look com estilo',
    image: '',
    active: true,
    order: 3,
    showInHome: true
  },
  {
    id: 'c8',
    name: 'Festa',
    slug: 'festa',
    description: 'Brilhe em ocasiões especiais',
    image: '',
    active: true,
    order: 4,
    showInHome: true
  }
];

// Dados padrão do carousel de produtos
const DEFAULT_CAROUSEL_SETTINGS = {
  title: 'Produtos em Destaque',
  subtitle: 'Descubra as peças mais desejadas da nossa coleção',
  productIds: ['p2', 'p1', 'p3', 'p4', 'p5', 'p6'],
  autoPlay: true,
  autoPlayInterval: 4000,
  showArrows: true,
  showIndicators: true,
  active: true
};

// Dados padrão dos novos produtos - NOVO
const DEFAULT_NEW_PRODUCTS_SETTINGS = {
  title: 'Novos Produtos',
  subtitle: 'Confira as últimas novidades que chegaram na nossa loja',
  productIds: ['p10', 'p9', 'p6', 'p4', 'p11', 'p12'],
  autoPlay: true,
  autoPlayInterval: 5000,
  showArrows: true,
  showIndicators: true,
  active: true
};

// Dados padrão do hero
const DEFAULT_HERO_SLIDES = [
  {
    id: 1,
    title: "Nova Coleção",
    subtitle: "Primavera/Verão 2024",
    description: "Descubra as últimas tendências em moda feminina com peças exclusivas que destacam sua elegância natural.",
    ctaText: "Explorar Coleção",
    ctaLink: "/categoria/novidades",
    backgroundImage: "",
    badge: "Novo",
    offer: "Até 30% OFF",
    active: true,
    order: 1
  },
  {
    id: 2,
    title: "Vestidos Elegantes",
    subtitle: "Para Todas as Ocasiões",
    description: "Do casual ao formal, encontre o vestido perfeito para cada momento especial da sua vida.",
    ctaText: "Ver Vestidos",
    ctaLink: "/categoria/vestidos",
    backgroundImage: "",
    badge: "Destaque",
    offer: "Frete Grátis",
    active: true,
    order: 2
  },
  {
    id: 3,
    title: "Estilo Profissional",
    subtitle: "Confiança & Sofisticação",
    description: "Peças versáteis que combinam conforto e elegância para a mulher moderna e determinada.",
    ctaText: "Shop Now",
    ctaLink: "/categoria/profissional",
    backgroundImage: "",
    badge: "Trending",
    offer: "2x sem juros",
    active: true,
    order: 3
  }
];

// Dados padrão do header
const DEFAULT_HEADER_SETTINGS = {
  logoType: 'text',
  logoText: 'Fina Estampa',
  logoImage: '',
  logoUrl: '',
  logoWidth: 180,
  logoHeight: 40,
  showTopAnnouncements: true,
  showAllCategoriesButton: true,
  topAnnouncement: {
    text: 'Frete grátis para pedidos acima de R$ 299,90! 🚚',
    active: true
  }
};

const DEFAULT_HEADER_CATEGORIES = [
  { id: 'c1', name: 'Vestidos', slug: 'vestidos', order: 1, active: true },
  { id: 'c2', name: 'Blusas & Camisas', slug: 'blusas-camisas', order: 2, active: true },
  { id: 'c5', name: 'Acessórios', slug: 'acessorios', order: 3, active: true },
  { id: 'c8', name: 'Festa', slug: 'festa', order: 4, active: true }
];

const DEFAULT_CONTACT = {
  phone: '+55 (11) 3333-2222',
  whatsapp: '+55 (11) 99999-9999',
  email: 'contato@finaestampa.com.br',
  address: 'Rua da Moda, 123 - São Paulo/SP',
  hours: 'Segunda a Sexta, 09:00 - 18:00',
  instagram: 'https://instagram.com/finaestampa',
  facebook: 'https://facebook.com/finaestampa'
};

const DEFAULT_PAYMENT = {
  pixEnabled: true,
  pixKey: 'finaestampa@pix.com.br',
  cardEnabled: true,
  boletoEnabled: true,
  shippingNote: 'Frete grátis para pedidos acima de R$ 299,90'
};

export const CMSProvider = ({ children }) => {
  // Estados principais
  const [headerSettings, setHeaderSettings] = useState(DEFAULT_HEADER_SETTINGS);
  const [headerCategories, setHeaderCategories] = useState(DEFAULT_HEADER_CATEGORIES);
  const [headerTopAnnouncements, setHeaderTopAnnouncements] = useState([]);
  const [heroSlides, setHeroSlides] = useState(DEFAULT_HERO_SLIDES);
  const [carouselSettings, setCarouselSettings] = useState(DEFAULT_CAROUSEL_SETTINGS);
  const [newProductsSettings, setNewProductsSettings] = useState(DEFAULT_NEW_PRODUCTS_SETTINGS); // NOVO
  const [categoriesShowcase, setCategoriesShowcase] = useState(DEFAULT_CATEGORIES_SHOWCASE);
  const [contact, setContact] = useState(DEFAULT_CONTACT);
  const [payment, setPayment] = useState(DEFAULT_PAYMENT);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('finaEstampaCMS');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        if (parsedData.headerSettings) {
          setHeaderSettings({ ...DEFAULT_HEADER_SETTINGS, ...parsedData.headerSettings });
        }
        if (parsedData.headerCategories) {
          setHeaderCategories(parsedData.headerCategories);
        }
        if (parsedData.heroSlides) {
          setHeroSlides(parsedData.heroSlides);
        }
        if (parsedData.carouselSettings) {
          setCarouselSettings({ ...DEFAULT_CAROUSEL_SETTINGS, ...parsedData.carouselSettings });
        }
        if (parsedData.newProductsSettings) { // NOVO
          setNewProductsSettings({ ...DEFAULT_NEW_PRODUCTS_SETTINGS, ...parsedData.newProductsSettings });
        }
        if (parsedData.categoriesShowcase) {
          setCategoriesShowcase(parsedData.categoriesShowcase);
        }
        if (parsedData.contact) {
          setContact({ ...DEFAULT_CONTACT, ...parsedData.contact });
        }
        if (parsedData.payment) {
          setPayment({ ...DEFAULT_PAYMENT, ...parsedData.payment });
        }

        // Configurar anúncios do header
        if (parsedData.headerSettings?.topAnnouncement?.text) {
          setHeaderTopAnnouncements([parsedData.headerSettings.topAnnouncement]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do CMS:', error);
    }
  }, []);

  // Salvar dados no localStorage sempre que houver mudanças
  useEffect(() => {
    const dataToSave = {
      headerSettings,
      headerCategories,
      heroSlides,
      carouselSettings,
      newProductsSettings, // NOVO
      categoriesShowcase,
      contact,
      payment
    };

    try {
      localStorage.setItem('finaEstampaCMS', JSON.stringify(dataToSave));
      console.log('Dados salvos no localStorage:', dataToSave);
    } catch (error) {
      console.error('Erro ao salvar dados do CMS:', error);
    }
  }, [headerSettings, headerCategories, heroSlides, carouselSettings, newProductsSettings, categoriesShowcase, contact, payment]);

  // Função para salvar todos os dados
  const saveAllData = (data) => {
    try {
      console.log('Salvando dados via saveAllData:', data);
      
      if (data.headerSettings) {
        setHeaderSettings(data.headerSettings);
        console.log('Header settings atualizados');
      }
      if (data.headerCategories) {
        setHeaderCategories(data.headerCategories);
        console.log('Header categories atualizadas');
      }
      if (data.heroSlides) {
        setHeroSlides(data.heroSlides);
        console.log('Hero slides atualizados:', data.heroSlides);
      }
      if (data.carouselSettings) {
        setCarouselSettings(data.carouselSettings);
        console.log('Carousel settings atualizados:', data.carouselSettings);
      }
      if (data.newProductsSettings) { // NOVO
        setNewProductsSettings(data.newProductsSettings);
        console.log('New products settings atualizados:', data.newProductsSettings);
      }
      if (data.categoriesShowcase) {
        setCategoriesShowcase(data.categoriesShowcase);
        console.log('Categories showcase atualizadas:', data.categoriesShowcase);
      }
      if (data.contact) {
        setContact(data.contact);
        console.log('Contato atualizado');
      }
      if (data.payment) {
        setPayment(data.payment);
        console.log('Pagamento atualizado');
      }

      localStorage.setItem('finaEstampaCMS', JSON.stringify(data));
      console.log('Dados persistidos no localStorage');
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  };

  // Função para obter logo configurado
  const getLogo = () => {
    if (headerSettings.logoType === 'image' && headerSettings.logoImage) {
      return {
        type: 'image',
        src: headerSettings.logoImage,
        alt: 'Logo da Loja',
        width: headerSettings.logoWidth || 180,
        height: headerSettings.logoHeight || 40
      };
    }
    
    if (headerSettings.logoType === 'url' && headerSettings.logoUrl) {
      return {
        type: 'image',
        src: headerSettings.logoUrl,
        alt: 'Logo da Loja',
        width: headerSettings.logoWidth || 180,
        height: headerSettings.logoHeight || 40
      };
    }
    
    return {
      type: 'text',
      text: headerSettings.logoText || 'Fina Estampa'
    };
  };

  // Função para obter categorias ativas do header
  const getActiveHeaderCategories = () => {
    return headerCategories
      .filter(category => category.active)
      .sort((a, b) => a.order - b.order);
  };

  // Função para obter slides do hero ativos
  const getActiveHeroSlides = () => {
    return heroSlides
      .filter(slide => slide.active)
      .sort((a, b) => a.order - b.order);
  };

  // Função para obter configurações do carousel
  const getCarouselSettings = () => {
    return carouselSettings;
  };

  // Função para obter configurações dos novos produtos - NOVO
  const getNewProductsSettings = () => {
    return newProductsSettings;
  };

  // Função para obter categorias ativas da showcase
  const getActiveCategoriesShowcase = () => {
    return categoriesShowcase
      .filter(category => category.active && category.showInHome)
      .sort((a, b) => a.order - b.order);
  };

  const contextValue = {
    // Estados
    headerSettings,
    setHeaderSettings,
    headerCategories,
    setHeaderCategories,
    headerTopAnnouncements,
    setHeaderTopAnnouncements,
    heroSlides,
    setHeroSlides,
    carouselSettings,
    setCarouselSettings,
    newProductsSettings, // NOVO
    setNewProductsSettings, // NOVO
    categoriesShowcase,
    setCategoriesShowcase,
    contact,
    setContact,
    payment,
    setPayment,

    // Funções utilitárias
    getLogo,
    getActiveHeaderCategories,
    getActiveHeroSlides,
    getCarouselSettings,
    getNewProductsSettings, // NOVO
    getActiveCategoriesShowcase,
    saveAllData
  };

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS deve ser usado dentro de um CMSProvider');
  }
  return context;
};

export default CMSContext;