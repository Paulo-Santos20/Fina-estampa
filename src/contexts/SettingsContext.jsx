import React, { createContext, useContext, useState, useEffect } from 'react';

// Configurações padrão
const DEFAULT_SETTINGS = {
  brand: {
    name: 'Fina Estampa',
    logoUrl: '',
    description: 'Boutique de moda feminina com elegância e sofisticação'
  },
  header: {
    promoBar: {
      enabled: true,
      text: '🎉 Frete Grátis para todo Brasil em compras acima de R$ 200!'
    },
    search: {
      enabled: true,
      placeholder: 'Buscar produtos...'
    },
    whatsapp: {
      enabled: true,
      number: '5511999999999',
      message: 'Olá! Gostaria de saber mais sobre os produtos da Fina Estampa.'
    },
    menu: {
      categories: [
        {
          name: 'Vestidos',
          slug: 'vestidos',
          label: 'Vestidos',
          children: ['Casuais', 'Festa', 'Trabalho']
        },
        {
          name: 'Blusas',
          slug: 'blusas',
          label: 'Blusas & Camisas',
          children: ['Sociais', 'Casuais', 'Regatas']
        },
        {
          name: 'Calças',
          slug: 'calcas',
          label: 'Calças & Shorts',
          children: ['Jeans', 'Sociais', 'Shorts']
        },
        {
          name: 'Saias',
          slug: 'saias',
          label: 'Saias & Macacões',
          children: ['Curtas', 'Longas', 'Macacões']
        },
        {
          name: 'Acessórios',
          slug: 'acessorios',
          label: 'Acessórios',
          children: ['Bolsas', 'Joias', 'Sapatos']
        }
      ]
    }
  },
  footer: {
    enabled: true,
    social: {
      instagram: '@finaestampa',
      facebook: 'finaestampa',
      whatsapp: '5511999999999'
    },
    contact: {
      email: 'contato@finaestampa.com',
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP'
    }
  },
  theme: {
    primaryColor: '#722F37',
    secondaryColor: '#F8E8E9',
    accentColor: '#D4AF37'
  },
  seo: {
    title: 'Fina Estampa - Boutique Eleganza',
    description: 'Descubra a elegância em cada peça da nossa coleção exclusiva de moda feminina.',
    keywords: 'moda feminina, roupas, vestidos, blusas, elegância'
  }
};

// Criar contexto
const SettingsContext = createContext();

// Provider do contexto
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Carregar configurações do localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar configurações no localStorage
  const updateSettings = (newSettings) => {
    try {
      const updatedSettings = {
        ...settings,
        ...newSettings
      };
      setSettings(updatedSettings);
      localStorage.setItem('siteSettings', JSON.stringify(updatedSettings));
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      return false;
    }
  };

  // Função para obter link do WhatsApp
  const getWhatsAppLink = (customMessage = '') => {
    const whatsappConfig = settings?.header?.whatsapp;
    if (!whatsappConfig?.enabled || !whatsappConfig?.number) {
      return '#';
    }

    const message = customMessage || whatsappConfig.message || 'Olá!';
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappConfig.number}?text=${encodedMessage}`;
  };

  // Função para obter configurações de uma seção específica
  const getSectionSettings = (section) => {
    return settings?.[section] || {};
  };

  // Função para atualizar uma seção específica
  const updateSectionSettings = (section, sectionSettings) => {
    const newSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        ...sectionSettings
      }
    };
    return updateSettings(newSettings);
  };

  const value = {
    settings,
    loading,
    updateSettings,
    getWhatsAppLink,
    getSectionSettings,
    updateSectionSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook para usar o contexto
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings deve ser usado dentro de <SettingsProvider>');
  }
  return context;
};

export default SettingsContext;