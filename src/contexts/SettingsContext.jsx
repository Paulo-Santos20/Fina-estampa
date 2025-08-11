// src/contexts/SettingsContext.jsx
// Contexto de Configurações (CMS) para controlar Header, WhatsApp, Busca, Menu etc.
// - Persistência em localStorage
// - API simples de atualização por seções (header, promoBar, logo, menu...)
// - Funções utilitárias para editar categorias e posição do header

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'fe_settings_v1';

const defaultSettings = {
  header: {
    enabled: true,
    position: 'bottom', // 'top' | 'bottom'
    style: {
      background: '#FFFFFF',
      textColor: '#000000',
      accent: '#722F37',
      borderColor: 'rgba(0,0,0,0.06)',
    },
    promoBar: {
      enabled: true,
      text: 'Frete grátis a partir de R$ 300 em todo o Brasil!',
      bgColor: '#F8E8E9',
      textColor: '#722F37',
      closable: true,
    },
    logo: {
      type: 'text', // 'text' | 'image'
      text: 'Fina Estampa',
      url: '',
      alt: 'Fina Estampa - Boutique Eleganza',
      height: 36,
    },
    search: {
      enabled: true,
      placeholder: 'Busque por vestidos, blusas, calças...',
    },
    whatsapp: {
      enabled: true,
      number: '+55 (11) 99999-9999',
      message: 'Olá! Gostaria de saber mais sobre os produtos da Fina Estampa.',
    },
    menu: {
      categories: [
        { id: 'cat-vestidos', label: 'Vestidos', slug: '/catalog?cat=vestidos' },
        { id: 'cat-blusas', label: 'Blusas & Camisas', slug: '/catalog?cat=blusas' },
        { id: 'cat-calcas', label: 'Calças & Shorts', slug: '/catalog?cat=calcas' },
        { id: 'cat-saias', label: 'Saias & Macacões', slug: '/catalog?cat=saias' },
        { id: 'cat-acessorios', label: 'Acessórios', slug: '/catalog?cat=acessorios' },
        { id: 'cat-colecoes', label: 'Coleções Especiais', slug: '/catalog?cat=colecoes' },
      ],
    },
  },
};

function loadSettings() {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    // Mescla com defaults para evitar campos ausentes
    return deepMerge(defaultSettings, parsed);
  } catch {
    return defaultSettings;
  }
}

function saveSettings(settings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function deepMerge(base, override) {
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (typeof base === 'object' && base !== null) {
    const out = { ...base };
    for (const k of Object.keys(override || {})) {
      out[k] = deepMerge(base[k], override[k]);
    }
    return out;
  }
  return typeof override === 'undefined' ? base : override;
}

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => loadSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  // Persist automático com debounce leve
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        saveSettings(settings);
        setLastSavedAt(Date.now());
      } catch {
        // noop
      }
    }, 250);
    return () => clearTimeout(id);
  }, [settings]);

  // Ações genéricas
  const updateSettings = useCallback((updater) => {
    setSettings((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : deepMerge(prev, updater);
      return next;
    });
  }, []);

  const saveNow = useCallback(async () => {
    setIsSaving(true);
    try {
      saveSettings(settings);
      setLastSavedAt(Date.now());
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  const resetToDefaults = useCallback(() => {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
    setLastSavedAt(Date.now());
  }, []);

  // Ações específicas do header
  const setHeader = useCallback((partial) => {
    updateSettings((prev) => ({
      ...prev,
      header: deepMerge(prev.header, partial),
    }));
  }, [updateSettings]);

  const setHeaderPosition = useCallback((position) => {
    setHeader({ position });
  }, [setHeader]);

  const setPromoBar = useCallback((partial) => {
    setHeader({ promoBar: partial });
  }, [setHeader]);

  const setLogo = useCallback((partial) => {
    setHeader({ logo: partial });
  }, [setHeader]);

  const setSearch = useCallback((partial) => {
    setHeader({ search: partial });
  }, [setHeader]);

  const setWhatsapp = useCallback((partial) => {
    setHeader({ whatsapp: partial });
  }, [setHeader]);

  const setHeaderStyle = useCallback((partial) => {
    setHeader({ style: partial });
  }, [setHeader]);

  // Menu (categorias)
  const addCategory = useCallback((cat) => {
    setHeader({
      menu: {
        categories: [
          ...(settings.header.menu?.categories || []),
          {
            id: cat.id || `cat-${Date.now()}`,
            label: cat.label || 'Nova categoria',
            slug: cat.slug || '/catalog',
          },
        ],
      },
    });
  }, [setHeader, settings.header.menu]);

  const updateCategory = useCallback((id, partial) => {
    const list = settings.header.menu?.categories || [];
    const idx = list.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const next = [...list];
    next[idx] = { ...next[idx], ...partial };
    setHeader({ menu: { categories: next } });
  }, [settings.header.menu, setHeader]);

  const removeCategory = useCallback((id) => {
    const list = settings.header.menu?.categories || [];
    const next = list.filter((c) => c.id !== id);
    setHeader({ menu: { categories: next } });
  }, [settings.header.menu, setHeader]);

  const moveCategory = useCallback((id, direction) => {
    const list = settings.header.menu?.categories || [];
    const idx = list.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const next = [...list];
    const newIndex = direction === 'up' ? Math.max(0, idx - 1) : Math.min(next.length - 1, idx + 1);
    const [item] = next.splice(idx, 1);
    next.splice(newIndex, 0, item);
    setHeader({ menu: { categories: next } });
  }, [settings.header.menu, setHeader]);

  const value = useMemo(() => ({
    settings,
    isSaving,
    lastSavedAt,

    // ações
    updateSettings,
    saveNow,
    resetToDefaults,

    // header
    setHeader,
    setHeaderPosition,
    setPromoBar,
    setLogo,
    setSearch,
    setWhatsapp,
    setHeaderStyle,

    // menu
    addCategory,
    updateCategory,
    removeCategory,
    moveCategory,
  }), [
    settings,
    isSaving,
    lastSavedAt,
    updateSettings,
    saveNow,
    resetToDefaults,
    setHeader,
    setHeaderPosition,
    setPromoBar,
    setLogo,
    setSearch,
    setWhatsapp,
    setHeaderStyle,
    addCategory,
    updateCategory,
    removeCategory,
    moveCategory,
  ]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings deve ser usado dentro de <SettingsProvider>');
  return ctx;
}