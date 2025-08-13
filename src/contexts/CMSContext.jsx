// src/contexts/CMSContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext();

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

const DEFAULT_BANNERS = [
  {
    id: 'b1',
    title: 'Coleção Inverno 2025',
    subtitle: 'Elegância e sofisticação para dias frios',
    link: '/catalog?colecao=inverno-2025',
    image: 'https://picsum.photos/seed/banner1/1200/450',
    active: true,
    order: 1
  },
  {
    id: 'b2',
    title: 'Vestidos Festa',
    subtitle: 'Brilhe com glamour em qualquer ocasião',
    link: '/catalog?categoria=vestidos-festa',
    image: 'https://picsum.photos/seed/banner2/1200/450',
    active: true,
    order: 2
  }
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
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [heroSlides, setHeroSlides] = useState(DEFAULT_HERO_SLIDES); // NOVO
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
        if (parsedData.banners) {
          setBanners(parsedData.banners);
        }
        if (parsedData.heroSlides) { // NOVO
          setHeroSlides(parsedData.heroSlides);
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
      banners,
      heroSlides, // NOVO
      contact,
      payment
    };

    try {
      localStorage.setItem('finaEstampaCMS', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Erro ao salvar dados do CMS:', error);
    }
  }, [headerSettings, headerCategories, banners, heroSlides, contact, payment]);

  // Função para salvar todos os dados
  const saveAllData = (data) => {
    try {
      if (data.headerSettings) setHeaderSettings(data.headerSettings);
      if (data.headerCategories) setHeaderCategories(data.headerCategories);
      if (data.banners) setBanners(data.banners);
      if (data.heroSlides) setHeroSlides(data.heroSlides); // NOVO
      if (data.contact) setContact(data.contact);
      if (data.payment) setPayment(data.payment);

      localStorage.setItem('finaEstampaCMS', JSON.stringify(data));
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

  // Função para obter banners ativos
  const getActiveBanners = () => {
    return banners
      .filter(banner => banner.active)
      .sort((a, b) => a.order - b.order);
  };

  // Função para obter slides do hero ativos - NOVO
  const getActiveHeroSlides = () => {
    return heroSlides
      .filter(slide => slide.active)
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
    banners,
    setBanners,
    heroSlides, // NOVO
    setHeroSlides, // NOVO
    contact,
    setContact,
    payment,
    setPayment,

    // Funções utilitárias
    getLogo,
    getActiveHeaderCategories,
    getActiveBanners,
    getActiveHeroSlides, // NOVO
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