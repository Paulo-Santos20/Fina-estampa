import React, { useMemo } from 'react';
import Layout from '../../components/common/Layout/Layout';
import Hero from '../../components/home/HeroSection';
import Categories from '../../components/home/Categories';
import ProductCarousel from '../../components/product/ProductCarousel/ProductCarousel';
import Newsletter from '../../components/home/Newsletter';
import { useProducts } from '../../hooks/useProducts';

const Home = () => {
  const { products } = useProducts();

  // Filtrar produtos dinamicamente baseado nos dados reais
  const productSections = useMemo(() => {
    // Produtos em destaque (produtos com maior preço ou em promoção)
    const featuredProducts = products
      .filter(product => product.isPromo || product.price > 150)
      .slice(0, 8);

    // Novidades (produtos marcados como novos)
    const newArrivals = products
      .filter(product => product.isNew)
      .slice(0, 8);

    // Produtos em promoção
    const saleProducts = products
      .filter(product => product.isPromo && product.salePrice)
      .slice(0, 8);

    // Se não houver produtos suficientes em cada categoria, usar produtos aleatórios
    const fallbackProducts = products.slice(0, 8);

    return {
      featured: featuredProducts.length > 0 ? featuredProducts : fallbackProducts,
      newArrivals: newArrivals.length > 0 ? newArrivals : fallbackProducts,
      saleProducts: saleProducts.length > 0 ? saleProducts : fallbackProducts
    };
  }, [products]);

  return (
    <Layout>
      {/* Hero Section - APENAS UMA */}
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
    </Layout>
  );
};

export default Home;