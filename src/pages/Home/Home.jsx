import React, { useMemo } from 'react';
// REMOVER: import Layout from '../../components/common/Layout/Layout'; // REMOVA esta linha
import Hero from '../../components/home/HeroSection/HeroSection'; // Ajustei o caminho do Hero
import Categories from '../../components/home/Categories/Categories'; // Ajustei o caminho do Categories
import ProductCarousel from '../../components/product/ProductCarousel/ProductCarousel';
import Newsletter from '../../components/home/Newsletter/Newsletter'; // Ajustei o caminho do Newsletter
import { useProducts } from '../../hooks/useProducts';

// Importe styles, se você tiver um styles para a página Home
import styles from './Home.module.css'; // Exemplo, crie se necessário

const Home = () => {
  const { products } = useProducts();

  // Filtrar produtos dinamicamente baseado nos dados reais
  const productSections = useMemo(() => {
    // Garante que 'products' é um array antes de tentar filtrar/mapear
    const safeProducts = products || [];

    // Produtos em destaque (produtos com maior preço ou em promoção)
    const featuredProducts = safeProducts
      .filter(product => product.isPromo || (product.price && product.price > 150))
      .slice(0, 8);

    // Novidades (produtos marcados como novos)
    const newArrivals = safeProducts
      .filter(product => product.isNew)
      .slice(0, 8);

    // Produtos em promoção
    const saleProducts = safeProducts
      .filter(product => product.isPromo && product.salePrice)
      .slice(0, 8);

    // Se não houver produtos suficientes em cada categoria, usar produtos aleatórios
    // Certifique-se que fallbackProducts sempre tenha produtos se safeProducts não estiver vazio
    const fallbackProducts = safeProducts.slice(0, 8); // Use products diretamente aqui, se safeProducts tiver items

    return {
      featured: featuredProducts.length > 0 ? featuredProducts : fallbackProducts,
      newArrivals: newArrivals.length > 0 ? newArrivals : fallbackProducts,
      saleProducts: saleProducts.length > 0 ? saleProducts : fallbackProducts
    };
  }, [products]); // A dependência agora é 'products'

  return (
    // REMOVER: <Layout> // REMOVA esta tag
    <div className={styles.homePage}> {/* Adicionei uma div wrapper, útil para estilos específicos da página */}
      {/* Hero Section */}
      <Hero />

      {/* Produtos em Destaque */}
      <ProductCarousel
        products={productSections.featured}
        title="Produtos em Destaque"
        subtitle="Peças selecionadas especialmente para você"
      />

      {/* Seção de Categorias com Fotos */}
      <Categories />

      {/* Novidades */}
      <ProductCarousel
        products={productSections.newArrivals}
        title="Novidades"
        subtitle="As últimas tendências da moda feminina"
      />

      {/* Promoções */}
      <ProductCarousel
        products={productSections.saleProducts}
        title="Ofertas Especiais"
        subtitle="Aproveite os melhores preços por tempo limitado"
      />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;