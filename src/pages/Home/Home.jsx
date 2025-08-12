// src/pages/Home/Home.jsx
import React from 'react';
import { useProducts } from '../../hooks/useProducts.js';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid.jsx';
import styles from './Home.module.css';

const Home = () => {
  const { 
    products, 
    loading, 
    error, 
    getNew, 
    getPromotional, 
    getBestSelling 
  } = useProducts();

  const newProducts = getNew().slice(0, 4);
  const promotionalProducts = getPromotional().slice(0, 4);
  const bestSellingProducts = getBestSelling(4);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bem-vinda à <span className={styles.accent}>Fina Estampa</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Moda feminina elegante e sofisticada para mulheres que sabem o que querem
          </p>
          <button className={styles.heroButton}>
            Descobrir Coleção
          </button>
        </div>
      </section>

      <div className={styles.container}>
        {/* Produtos Novos */}
        {newProducts.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>✨ Novidades</h2>
              <p className={styles.sectionSubtitle}>
                As últimas tendências chegaram na Fina Estampa
              </p>
            </div>
            <ProductGrid
              products={newProducts}
              loading={loading}
              error={error}
              showViewToggle={false}
              viewMode="grid"
            />
          </section>
        )}

        {/* Produtos em Promoção */}
        {promotionalProducts.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>🔥 Promoções</h2>
              <p className={styles.sectionSubtitle}>
                Ofertas especiais por tempo limitado
              </p>
            </div>
            <ProductGrid
              products={promotionalProducts}
              loading={loading}
              error={error}
              showViewToggle={false}
              viewMode="grid"
            />
          </section>
        )}

        {/* Mais Vendidos */}
        {bestSellingProducts.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>🏆 Mais Vendidos</h2>
              <p className={styles.sectionSubtitle}>
                Os favoritos das nossas clientes
              </p>
            </div>
            <ProductGrid
              products={bestSellingProducts}
              loading={loading}
              error={error}
              showViewToggle={false}
              viewMode="grid"
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;