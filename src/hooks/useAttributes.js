import { useState, useEffect } from 'react';

// Cores baseadas nos produtos
const MOCK_COLORS = [
  { id: 'pink', name: 'Rosa', hexCode: '#FF69B4' },
  { id: 'purple', name: 'Roxo', hexCode: '#8A2BE2' },
  { id: 'black', name: 'Preto', hexCode: '#000000' },
  { id: 'white', name: 'Branco', hexCode: '#FFFFFF' },
  { id: 'blue', name: 'Azul', hexCode: '#4169E1' },
  { id: 'navy', name: 'Azul Marinho', hexCode: '#000080' },
  { id: 'lightblue', name: 'Azul Claro', hexCode: '#87CEEB' },
  { id: 'hotpink', name: 'Rosa Pink', hexCode: '#FF1493' },
  { id: 'green', name: 'Verde', hexCode: '#32CD32' },
  { id: 'gold', name: 'Dourado', hexCode: '#FFD700' },
  { id: 'brown', name: 'Marrom', hexCode: '#8B4513' },
  { id: 'red', name: 'Vermelho', hexCode: '#DC143C' }
];

// Tamanhos baseados nos produtos
const MOCK_SIZES = [
  { id: 'pp', name: 'Extra Pequeno', abbreviation: 'PP', order: 1 },
  { id: 'p', name: 'Pequeno', abbreviation: 'P', order: 2 },
  { id: 'm', name: 'Médio', abbreviation: 'M', order: 3 },
  { id: 'g', name: 'Grande', abbreviation: 'G', order: 4 },
  { id: 'gg', name: 'Extra Grande', abbreviation: 'GG', order: 5 },
  { id: '36', name: 'Tamanho 36', abbreviation: '36', order: 6 },
  { id: '38', name: 'Tamanho 38', abbreviation: '38', order: 7 },
  { id: '40', name: 'Tamanho 40', abbreviation: '40', order: 8 },
  { id: '42', name: 'Tamanho 42', abbreviation: '42', order: 9 },
  { id: '44', name: 'Tamanho 44', abbreviation: '44', order: 10 },
  { id: 'unico', name: 'Tamanho Único', abbreviation: 'Único', order: 11 }
];

export const useAttributes = () => {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAttributes = async () => {
      try {
        setLoading(true);
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Verificar se há atributos salvos no localStorage (CMS)
        const savedColors = localStorage.getItem('cmsColors');
        const savedSizes = localStorage.getItem('cmsSizes');
        
        if (savedColors) {
          const parsedColors = JSON.parse(savedColors);
          setColors([...MOCK_COLORS, ...parsedColors]);
        } else {
          setColors(MOCK_COLORS);
        }
        
        if (savedSizes) {
          const parsedSizes = JSON.parse(savedSizes);
          setSizes([...MOCK_SIZES, ...parsedSizes]);
        } else {
          setSizes(MOCK_SIZES);
        }
        
      } catch (err) {
        setError('Erro ao carregar atributos');
        console.error('Erro ao carregar atributos:', err);
        // Em caso de erro, usar dados mockados
        setColors(MOCK_COLORS);
        setSizes(MOCK_SIZES);
      } finally {
        setLoading(false);
      }
    };

    loadAttributes();
  }, []);

  // Função para obter cor por ID
  const getColorById = (id) => {
    return colors.find(color => color.id === id);
  };

  // Função para obter tamanho por ID
  const getSizeById = (id) => {
    return sizes.find(size => size.id === id);
  };

  return {
    colors,
    sizes,
    loading,
    error,
    getColorById,
    getSizeById
  };
};