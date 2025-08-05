import React from 'react';
import Layout from '../../components/common/Layout/Layout';
import Hero from '../../components/home/HeroSection';
import Categories from '../../components/home/Categories';
import ProductCarousel from '../../components/product/ProductCarousel/ProductCarousel';
import Newsletter from '../../components/home/Newsletter';
import FeaturedProducts from '../../components/sections/FeaturedProducts/FeaturedProducts';

import { featuredProducts, newArrivals, saleProducts } from '../../data/products';

const Home = () => {
  return (
    <Layout>
      {/* Hero Section - APENAS UMA */}
      <Hero />
               <FeaturedProducts />
       
      {/* Produtos em Destaque */}
      <ProductCarousel 
        products={featuredProducts}
        title="Produtos em Destaque"
        subtitle="Peças selecionadas especialmente para você"
      />

       {/* Seção de Categorias com Fotos */}
      <Categories />
      {/* Novidades */}
      <ProductCarousel 
        products={newArrivals}
        title="Novidades"
        subtitle="As últimas tendências da moda feminina"
      />
      
      {/* Promoções */}
      <ProductCarousel 
        products={saleProducts}
        title="Ofertas Especiais"
        subtitle="Aproveite os melhores preços por tempo limitado"
      />
      
      {/* Newsletter */}
      <Newsletter />
    </Layout>
  );
};

export default Home;