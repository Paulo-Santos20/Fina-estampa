// src/pages/Dashboard/components/CMSPage.jsx
import React, { useState } from 'react';
import styles from './CMSPage.module.css';
import {
  FaGlobe,
  FaSave,
  FaEye,
  FaImage,
  FaTag,
  FaHome,
  FaTruck,
  FaStar,
  FaPercent,
  FaPhone,
  FaCreditCard,
  FaSearch,
  FaPalette,
  FaCog,
  FaExchangeAlt,
  FaShoppingBag,
  FaUser,
  FaMoneyBillWave,
  FaBarcode
} from 'react-icons/fa';

// Componentes de seção específicos
import HeaderSettingsPanel from './components/HeaderSettingsPanel.jsx';
import BannerSettingsPanel from './components/BannerSettingsPanel.jsx';
import ProductsSettingsPanel from './components/ProductsSettingsPanel.jsx';
import CategoriesSettingsPanel from './components/CategoriesSettingsPanel.jsx';
import ContactSettingsPanel from './components/ContactSettingsPanel.jsx';
import PaymentSettingsPanel from './components/PaymentSettingsPanel.jsx';
import SEOSettingsPanel from './components/SEOSettingsPanel.jsx';
import ThemeSettingsPanel from './components/ThemeSettingsPanel.jsx';

import { useCMS } from '../../../contexts/CMSContext.jsx';

// Dados simulados para produtos
const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Blusa Social Elegante', price: 89.90, image: 'https://picsum.photos/seed/blusa1/400/480', category: 'Blusas & Camisas', active: true },
  { id: 'p2', name: 'Vestido Festa Velvet', price: 189.90, image: 'https://picsum.photos/seed/vestido2/400/480', category: 'Vestidos', active: true },
  { id: 'p3', name: 'Calça Alfaiataria Slim', price: 159.90, image: 'https://picsum.photos/seed/calca3/400/480', category: 'Calças & Shorts', active: true },
  { id: 'p4', name: 'Saia Midi Plissada', price: 129.90, image: 'https://picsum.photos/seed/saia4/400/480', category: 'Saias & Macacões', active: true },
  { id: 'p5', name: 'Camisa Seda Premium', price: 219.90, image: 'https://picsum.photos/seed/camisa5/400/480', category: 'Blusas & Camisas', active: true },
  { id: 'p6', name: 'Macacão Minimal Chic', price: 199.90, image: 'https://picsum.photos/seed/macacao6/400/480', category: 'Saias & Macacões', active: true },
  { id: 'p7', name: 'Bolsa Courino Dourada', price: 149.90, image: 'https://picsum.photos/seed/bolsa7/400/480', category: 'Acessórios', active: true },
  { id: 'p8', name: 'Sandália Salto Fino', price: 179.90, image: 'https://picsum.photos/seed/sandalia8/400/480', category: 'Acessórios', active: true },
  { id: 'p9', name: 'Blazer Tweed Clássico', price: 259.90, image: 'https://picsum.photos/seed/blazer9/400/480', category: 'Blusas & Camisas', active: true },
  { id: 'p10', name: 'Vestido Casual Summer', price: 129.90, image: 'https://picsum.photos/seed/vestido10/400/480', category: 'Vestidos', active: true },
  { id: 'p11', name: 'Short Linho Fresh', price: 99.90, image: 'https://picsum.photos/seed/short11/400/480', category: 'Calças & Shorts', active: true },
  { id: 'p12', name: 'Colar Pérolas Delicadas', price: 79.90, image: 'https://picsum.photos/seed/colar12/400/480', category: 'Acessórios', active: true }
];

const SAMPLE_CATEGORIES = [
  { id: 'c1', name: 'Vestidos' },
  { id: 'c2', name: 'Blusas & Camisas' },
  { id: 'c3', name: 'Calças & Shorts' },
  { id: 'c4', name: 'Saias & Macacões' },
  { id: 'c5', name: 'Acessórios' },
  { id: 'c6', name: 'Coleções Especiais' },
  { id: 'c7', name: 'Trabalho' },
  { id: 'c8', name: 'Festa' }
];

const CMSPage = () => {
  const { settings, updateSettings } = useCMS();
  const [activeTab, setActiveTab] = useState('header');
  const [isSaving, setIsSaving] = useState(false);

  // Save function
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  // Definição das abas
  const tabs = [
    { 
      id: 'header', 
      label: 'Cabeçalho', 
      icon: FaTag,
      description: 'Logo, navegação, busca e WhatsApp'
    },
    { 
      id: 'banners', 
      label: 'Banners', 
      icon: FaImage,
      description: 'Hero, promoções e destaques'
    },
    { 
      id: 'products', 
      label: 'Produtos', 
      icon: FaStar,
      description: 'Destaques, novidades e ofertas'
    },
    { 
      id: 'categories', 
      label: 'Categorias', 
      icon: FaHome,
      description: 'Categorias da página inicial'
    },
    { 
      id: 'contact', 
      label: 'Contato', 
      icon: FaPhone,
      description: 'Informações e redes sociais'
    },
    { 
      id: 'payment', 
      label: 'Pagamento', 
      icon: FaCreditCard,
      description: 'Métodos e configurações'
    },
    { 
      id: 'seo', 
      label: 'SEO', 
      icon: FaSearch,
      description: 'Meta tags e analytics'
    },
    { 
      id: 'theme', 
      label: 'Tema', 
      icon: FaPalette,
      description: 'Cores e tipografia'
    }
  ];

  return (
    <div className={styles.cmsWrapper}>
      <div className={styles.cmsHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>
            <FaGlobe />
            Gerenciar Conteúdo do Site
          </h1>
          <p className={styles.pageSubtitle}>
            Configure todas as seções e elementos da Fina Estampa
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={() => window.open('/', '_blank')}
            className={styles.previewBtn}
          >
            <FaEye /> Preview
          </button>
          <button 
            onClick={handleSave}
            className={styles.saveBtn}
            disabled={isSaving}
          >
            <FaSave /> {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            >
              <div className={styles.tabIcon}>
                <tab.icon />
              </div>
              <div className={styles.tabContent}>
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabDescription}>{tab.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'header' && (
          <HeaderSettingsPanel
            settings={settings.header}
            onChange={(newSettings) => updateSettings('header', newSettings)}
            allCategories={SAMPLE_CATEGORIES}
          />
        )}

        {activeTab === 'banners' && (
          <BannerSettingsPanel
            settings={settings.banners}
            onChange={(newSettings) => updateSettings('banners', newSettings)}
          />
        )}

        {activeTab === 'products' && (
          <ProductsSettingsPanel
            settings={settings.products}
            onChange={(newSettings) => updateSettings('products', newSettings)}
            allProducts={SAMPLE_PRODUCTS}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesSettingsPanel
            settings={settings.categories}
            onChange={(newSettings) => updateSettings('categories', newSettings)}
            allCategories={SAMPLE_CATEGORIES}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSettingsPanel
            settings={settings.contact}
            onChange={(newSettings) => updateSettings('contact', newSettings)}
          />
        )}

        {activeTab === 'payment' && (
          <PaymentSettingsPanel
            settings={settings.payment}
            onChange={(newSettings) => updateSettings('payment', newSettings)}
          />
        )}

        {activeTab === 'seo' && (
          <SEOSettingsPanel
            settings={settings.seo}
            onChange={(newSettings) => updateSettings('seo', newSettings)}
          />
        )}

        {activeTab === 'theme' && (
          <ThemeSettingsPanel
            settings={settings.theme}
            onChange={(newSettings) => updateSettings('theme', newSettings)}
          />
        )}
      </div>
    </div>
  );
};

export default CMSPage;