// src/contexts/CMSContext.jsx
import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

/**
 * Este CMSContext provê:
 * - headerTopAnnouncements: anúncios do topo (controlado pelo admin)
 * - headerCategories: categorias e subcategorias do header (controlado pelo admin)
 * - headerSettings: configs do header (ex.: mostrar botão "Todas as categorias")
 * - searchSettings: controla sugestões relacionadas (exibidas abaixo da barra de pesquisa)
 * Em produção, você pode substituir os dados por fetch do seu backend CMS (services/cms.js).
 */

const defaultCategories = [
  {
    id: 'vestidos',
    name: 'Vestidos',
    slug: 'vestidos',
    children: [
      { id: 'casuais', name: 'Casuais', slug: 'vestidos-casuais' },
      { id: 'festa', name: 'Festa', slug: 'vestidos-festa' },
      { id: 'trabalho', name: 'Trabalho', slug: 'vestidos-trabalho' },
    ],
  },
  {
    id: 'blusas',
    name: 'Blusas & Camisas',
    slug: 'blusas-e-camisas',
    children: [
      { id: 'básicas', name: 'Básicas', slug: 'blusas-basicas' },
      { id: 'sociais', name: 'Sociais', slug: 'camisas-sociais' },
    ],
  },
  {
    id: 'calcas',
    name: 'Calças & Shorts',
    slug: 'calcas-e-shorts',
    children: [
      { id: 'jeans', name: 'Jeans', slug: 'calcas-jeans' },
      { id: 'alfaiataria', name: 'Alfaiataria', slug: 'calcas-alfaiataria' },
      { id: 'shorts', name: 'Shorts', slug: 'shorts' },
    ],
  },
  {
    id: 'saias',
    name: 'Saias & Macacões',
    slug: 'saias-e-macacoes',
    children: [
      { id: 'saias-midi', name: 'Saias Midi', slug: 'saias-midi' },
      { id: 'macacoes', name: 'Macacões', slug: 'macacoes' },
    ],
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    slug: 'acessorios',
    children: [
      { id: 'bolsas', name: 'Bolsas', slug: 'bolsas' },
      { id: 'joias', name: 'Joias', slug: 'joias' },
      { id: 'sapatos', name: 'Sapatos', slug: 'sapatos' },
    ],
  },
  {
    id: 'colecoes',
    name: 'Coleções Especiais',
    slug: 'colecoes-especiais',
    children: [
      { id: 'inverno', name: 'Inverno', slug: 'colecao-inverno' },
      { id: 'verao', name: 'Verão', slug: 'colecao-verao' },
    ],
  },
];

const defaultAnnouncements = [
  {
    id: 'an1',
    text: 'Frete grátis acima de R$ 299 para Sul e Sudeste',
    link: null,
  },
  {
    id: 'an2',
    text: '10% OFF na primeira compra com o cupom BEMVINDA',
    link: null,
  },
  {
    id: 'an3',
    text: 'Troca fácil em até 30 dias',
    link: null,
  },
];

const CMSContext = createContext(null);

export const CMSProvider = ({ children }) => {
  const [headerCategories, setHeaderCategories] = useState(defaultCategories);
  const [headerTopAnnouncements, setHeaderTopAnnouncements] = useState(defaultAnnouncements);
  const [headerSettings, setHeaderSettings] = useState({
    showAllCategoriesButton: true,
    showTopAnnouncements: true,
  });
  const [searchSettings] = useState({
    showRelatedCategories: true,
    maxSuggestions: 6,
  });

  const updateHeaderCategories = useCallback((cats) => {
    setHeaderCategories(Array.isArray(cats) ? cats : []);
  }, []);
  const updateAnnouncements = useCallback((items) => {
    setHeaderTopAnnouncements(Array.isArray(items) ? items : []);
  }, []);
  const updateHeaderSettings = useCallback((patch) => {
    setHeaderSettings((prev) => ({ ...prev, ...(patch || {}) }));
  }, []);

  const value = useMemo(
    () => ({
      headerCategories,
      headerTopAnnouncements,
      headerSettings,
      searchSettings,
      updateHeaderCategories,
      updateAnnouncements,
      updateHeaderSettings,
    }),
    [
      headerCategories,
      headerTopAnnouncements,
      headerSettings,
      searchSettings,
      updateHeaderCategories,
      updateAnnouncements,
      updateHeaderSettings,
    ]
  );

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

export const useCMS = () => {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS deve ser usado dentro de <CMSProvider>');
  return ctx;
};

export default CMSContext;