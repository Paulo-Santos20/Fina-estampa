// src/contexts/SettingsContext.jsx
// Contexto de configurações controlado pelo CMS (Header, Banners, WhatsApp, etc.)
// - Exporta: SettingsContext, SettingsProvider, useSettings (named), e default SettingsProvider
// - Persistência em localStorage
// - updateSettings com deep merge

import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';

export const SettingsContext = createContext(null);

const STORAGE_KEY = 'fe_settings_v1';

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

// deepMerge simples para mesclar configs parcialmente (sem perder chaves não atualizadas)
function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) return source;
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (isObject(source[key])) {
      out[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

const defaultSettings = {
  brand: {
    name: 'Fina Estampa',
    tagline: 'Elegância e sofisticação',
    logoUrl: '/assets/logos/logo-fina-estampa.svg',
  },
  header: {
    promoBar: {
      enabled: true,
      text: 'Frete grátis acima de R$ 300 em todo o Brasil',
      background: '#722F37',
      color: '#FFFFFF',
    },
    whatsapp: {
      enabled: true,
      showFloatButton: true,
      number: '+55 (11) 99999-9999',
      message: 'Olá! Gostaria de fazer um pedido na Fina Estampa.',
    },
    search: {
      enabled: true,
      placeholder: 'Buscar produtos...',
    },
    menu: {
      categories: [
        { label: 'Vestidos', slug: 'vestidos', children: ['Casual', 'Festa', 'Trabalho'] },
        { label: 'Blusas & Camisas', slug: 'blusas' },
        { label: 'Calças & Shorts', slug: 'calcas-e-shorts' },
        { label: 'Saias & Macacões', slug: 'saias-macacoes' },
        { label: 'Acessórios', slug: 'acessorios', children: ['Bolsas', 'Joias', 'Sapatos'] },
        { label: 'Coleções Especiais', slug: 'colecoes' },
      ],
    },
  },
  banners: {
    home: [],
  },
  theme: {
    colors: {
      white: '#FFFFFF',
      wine: '#722F37',
      black: '#000000',
      grayLight: '#F8F9FA',
      gray: '#6C757D',
      pink: '#F8E8E9',
      gold: '#D4AF37',
    },
  },
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const stored = safeParse(localStorage.getItem(STORAGE_KEY), null);
    if (stored && typeof stored === 'object') return deepMerge(defaultSettings, stored);
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((patch) => {
    setSettings((prev) => deepMerge(prev, patch));
  }, []);

  const getWhatsAppLink = useCallback(
    (customMessage) => {
      const number = String(settings?.header?.whatsapp?.number || '').replace(/\D/g, '');
      const message =
        customMessage ||
        settings?.header?.whatsapp?.message ||
        'Olá! Gostaria de falar com a Fina Estampa.';
      const encoded = encodeURIComponent(message);
      if (!number) return `https://wa.me/?text=${encoded}`;
      return `https://wa.me/${number}?text=${encoded}`;
    },
    [settings]
  );

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
      getWhatsAppLink,
    }),
    [settings, updateSettings, getWhatsAppLink]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings deve ser usado dentro de <SettingsProvider>');
  }
  return ctx;
}

export default SettingsProvider;