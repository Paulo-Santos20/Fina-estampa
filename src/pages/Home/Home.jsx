import React from 'react';
import Hero from '../../components/home/HeroSection/HeroSection';
import Categories from '../../components/home/Categories/Categories';
import ProductCarousel from '../../components/product/ProductCarousel/ProductCarousel';
import NewProductsCarousel from '../../components/home/NewProductCarousel/NewProductCarousel';
import Newsletter from '../../components/home/Newsletter/Newsletter';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.homeMain}>
      {/* Hero Section */}
      <Hero />

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Categories Showcase */}
      <Categories />

      {/* New Products Carousel */}
      <NewProductsCarousel />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
};

export default Home;