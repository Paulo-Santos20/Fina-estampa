import { useState, useEffect } from 'react';

// Dados iniciais simulados (Mock Data)
const INITIAL_COLORS = [
  { id: 1, name: 'Preto Clássico', hexCode: '#000000', description: 'Preto básico para todas as ocasiões', isActive: true },
  { id: 2, name: 'Branco Puro', hexCode: '#FFFFFF', description: 'Branco neve', isActive: true },
  { id: 3, name: 'Vinho', hexCode: '#722F37', description: 'Cor da marca', isActive: true },
  { id: 4, name: 'Nude', hexCode: '#E5D0B1', description: 'Tom pele suave', isActive: true },
];

const INITIAL_SIZES = [
  { id: 1, name: 'Pequeno', abbreviation: 'P', description: 'Veste 36-38', order: 1, isActive: true },
  { id: 2, name: 'Médio', abbreviation: 'M', description: 'Veste 40-42', order: 2, isActive: true },
  { id: 3, name: 'Grande', abbreviation: 'G', description: 'Veste 44-46', order: 3, isActive: true },
  { id: 4, name: 'Extra Grande', abbreviation: 'GG', description: 'Veste 48+', order: 4, isActive: false },
];

export const useAttributes = () => {
  // --- ESTADOS ---
  // Carrega do localStorage ou usa os dados iniciais
  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem('sana_colors');
    return saved ? JSON.parse(saved) : INITIAL_COLORS;
  });

  const [sizes, setSizes] = useState(() => {
    const saved = localStorage.getItem('sana_sizes');
    return saved ? JSON.parse(saved) : INITIAL_SIZES;
  });

  const [loading, setLoading] = useState(false);

  // --- PERSISTÊNCIA ---
  useEffect(() => {
    localStorage.setItem('sana_colors', JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    localStorage.setItem('sana_sizes', JSON.stringify(sizes));
  }, [sizes]);

  // ==========================
  // LÓGICA DE CORES
  // ==========================

  const addColor = (colorData) => {
    setLoading(true);
    try {
      const newColor = {
        ...colorData,
        id: Date.now(),
        isActive: true
      };
      setColors(prev => [...prev, newColor]);
      setLoading(false);
      return newColor;
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  const updateColor = (id, updatedData) => {
    setLoading(true);
    try {
      setColors(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const deleteColor = (id) => {
    setLoading(true);
    try {
      setColors(prev => prev.filter(c => c.id !== id));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const toggleColorStatus = (id) => {
    try {
      setColors(prev => prev.map(c => 
        c.id === id ? { ...c, isActive: !c.isActive } : c
      ));
      return true;
    } catch (error) {
      return false;
    }
  };

  // ==========================
  // LÓGICA DE TAMANHOS
  // ==========================

  const addSize = (sizeData) => {
    setLoading(true);
    try {
      const newSize = {
        ...sizeData,
        id: Date.now(),
        isActive: true
      };
      setSizes(prev => [...prev, newSize]);
      setLoading(false);
      return newSize;
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  const updateSize = (id, updatedData) => {
    setLoading(true);
    try {
      setSizes(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const deleteSize = (id) => {
    setLoading(true);
    try {
      setSizes(prev => prev.filter(s => s.id !== id));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  // --- A FUNÇÃO QUE FALTAVA ---
  const toggleSizeStatus = (id) => {
    try {
      setSizes(prev => prev.map(s => 
        s.id === id ? { ...s, isActive: !s.isActive } : s
      ));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    // Dados
    colors,
    sizes,
    loading,
    
    // Ações de Cores
    addColor,
    updateColor,
    deleteColor,
    toggleColorStatus,
    
    // Ações de Tamanhos
    addSize,
    updateSize,
    deleteSize,
    toggleSizeStatus // Agora exportada corretamente
  };
};