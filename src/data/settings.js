// src/data/settings.js
export const defaultSettings = {
  brand: {
    logo: {
      type: 'text', // 'text' ou 'image'
      textPrimary: 'Fina',
      textAccent: 'Estampa',
      imageUrl: '' // se type: 'image', coloque a URL aqui
    }
  },
  header: {
    showPromoBar: true,
    promoText: 'FRETE GRÁTIS para compras acima de R$ 199,90 | Use o cupom: FINAFRETE',
    navigationMode: 'dropdown', // preparado caso mude no futuro
    categories: [
      {
        name: 'Vestidos',
        slug: 'vestidos',
        children: [
          { name: 'Casuais', slug: 'vestidos-casuais' },
          { name: 'Festa', slug: 'vestidos-festa' },
          { name: 'Trabalho', slug: 'vestidos-trabalho' }
        ]
      },
      {
        name: 'Blusas & Camisas',
        slug: 'blusas',
        children: [
          { name: 'Básicas', slug: 'blusas-basicas' },
          { name: 'Sociais', slug: 'blusas-sociais' },
          { name: 'Estampadas', slug: 'blusas-estampadas' }
        ]
      },
      {
        name: 'Calças & Shorts',
        slug: 'calcas',
        children: [
          { name: 'Jeans', slug: 'jeans' },
          { name: 'Alfaiataria', slug: 'alfaiataria' },
          { name: 'Shorts', slug: 'shorts' }
        ]
      },
      {
        name: 'Saias & Macacões',
        slug: 'saias',
        children: [
          { name: 'Saias Midi', slug: 'saias-midi' },
          { name: 'Saias Longas', slug: 'saias-longas' },
          { name: 'Macacões', slug: 'macacoes' }
        ]
      },
      {
        name: 'Acessórios',
        slug: 'acessorios',
        children: [
          { name: 'Bolsas', slug: 'bolsas' },
          { name: 'Joias', slug: 'joias' },
          { name: 'Sapatos', slug: 'sapatos' }
        ]
      },
      {
        name: 'Coleções Especiais',
        slug: 'colecoes',
        children: [
          { name: 'Clássico', slug: 'classico' },
          { name: 'Moderno', slug: 'moderno' },
          { name: 'Boho', slug: 'boho' }
        ]
      }
    ]
  },
  whatsapp: {
    number: '+55 (11) 99999-9999'
  }
};