import { useState, useEffect } from 'react';

// Dados iniciais de cores
const INITIAL_COLORS = [
  { id: 'c1', name: 'Preto', hexCode: '#000000', description: 'Cor clássica e elegante', isActive: true },
  { id: 'c2', name: 'Branco', hexCode: '#FFFFFF', description: 'Cor neutra e versátil', isActive: true },
  { id: 'c3', name: 'Vinho', hexCode: '#722F37', description: 'Cor da marca Fina Estampa', isActive: true },
  { id: 'c4', name: 'Rosa', hexCode: '#F8E8E9', description: 'Cor suave e feminina', isActive: true },
  { id: 'c5', name: 'Azul Marinho', hexCode: '#1E3A8A', description: 'Azul escuro elegante', isActive: true }
];

// Dados iniciais de tamanhos
const INITIAL_SIZES = [
  { id: 's1', name: 'Extra Pequeno', abbreviation: 'PP', description: 'Tamanho extra pequeno', order: 0, isActive: true },
  { id: 's2', name: 'Pequeno', abbreviation: 'P', description: 'Tamanho pequeno', order: 1, isActive: true },
  { id: 's3', name: 'Médio', abbreviation: 'M', description: 'Tamanho médio', order: 2, isActive: true },
  { id: 's4', name: 'Grande', abbreviation: 'G', description: 'Tamanho grande', order: 3, isActive: true },
  { id: 's5', name: 'Extra Grande', abbreviation: 'GG', description: 'Tamanho extra grande', order: 4, isActive: true }
];

export const useAttributes = () => {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar atributos do localStorage
  useEffect(() => {
    try {
      // Carregar cores
      const savedColors = localStorage.getItem('colors');
      if (savedColors) {
        const parsedColors = JSON.parse(savedColors);
        if (parsedColors.length === 0) {
          setColors(INITIAL_COLORS);
          localStorage.setItem('colors', JSON.stringify(INITIAL_COLORS));
        } else {
          setColors(parsedColors);
        }
      } else {
        setColors(INITIAL_COLORS);
        localStorage.setItem('colors', JSON.stringify(INITIAL_COLORS));
      }

      // Carregar tamanhos
      const savedSizes = localStorage.getItem('sizes');
      if (savedSizes) {
        const parsedSizes = JSON.parse(savedSizes);
        if (parsedSizes.length === 0) {
          setSizes(INITIAL_SIZES);
          localStorage.setItem('sizes', JSON.stringify(INITIAL_SIZES));
        } else {
          setSizes(parsedSizes);
        }
      } else {
        setSizes(INITIAL_SIZES);
        localStorage.setItem('sizes