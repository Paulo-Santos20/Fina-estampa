import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../product/ProductCard/ProductCard';
import { allProducts } from '../../../data/products';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  // Garantir que temos produtos em destaque
  const featuredProducts = useMemo(() => {
    // Filtrar produtos com rating alto ou que são novos/promoção
    const featured = allProducts.filter(product => 
      product.rating >= 4.5 || product.isNew || product.isPromo
    ).slice(0, 8);
    
    // Se não tiver produtos suficientes, pegar os primeiros
    if (featured.length < 8) {
      return allProducts.slice(0, 8);
    }
    
    return featured;
  }, []);

  // Debug: verificar se temos produtos
  console.log('🛍️ Featured Products:', featuredProducts);
  console.log('📊 Total produtos:', featuredProducts.length);

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <section className={styles.featuredProducts}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Produtos em Destaque</h2>
            <p className={styles.subtitle}>
              Descubra as últimas tendências e ofertas especiais
            </p>
          </div>
          <div className={styles.emptyState}>
            <p>Nenhum produto encontrado.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Produtos em Destaque</h2>
          <p className={styles.subtitle}>
            Descubra as últimas tendências e ofertas especiais
          </p>
        </div>

        <div className={styles.productsGrid}>
          {featuredProducts.map((product, index) => {
            console.log(`🔍 Produto ${index + 1}:`, {
              id: product.id,
              name: product.name,
              image: product.image,
              price: product.price
            });
            
            return (
              <ProductCard 
                key={`featured-${product.id}`} 
                product={product} 
              />
            );
          })}
        </div>

        <div className={styles.viewMore}>
          <Link to="/busca" className={styles.viewMoreBtn}>
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;