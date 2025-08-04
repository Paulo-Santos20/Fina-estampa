import React from 'react';
import Layout from '../../components/common/Layout/Layout';
import HeroSection from '../../components/home/HeroSection/HeroSection';
import ProductCarousel from '../../components/product/ProductCarousel/ProductCarousel';
import { 
  featuredProducts, 
  newArrivals, 
  bestSellers 
} from '../../data/products';
import styles from './Home.module.css';

const Home = () => {
  return (
    <Layout>
      <div className={styles.home}>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Produtos em Destaque */}
        <ProductCarousel 
          products={featuredProducts}
          title="Produtos em Destaque"
          subtitle="Descubra nossa seleção especial de peças exclusivas"
        />
        
        {/* Novidades */}
        <ProductCarousel 
          products={newArrivals}
          title="Novidades"
          subtitle="As últimas tendências da moda feminina"
        />
        
        {/* Mais Vendidos */}
        <ProductCarousel 
          products={bestSellers}
          title="Mais Vendidos"
          subtitle="Os favoritos das nossas clientes"
        />
        
        {/* Seção de Categorias */}
        <section className={styles.categoriesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Explore por Categoria</h2>
              <p className={styles.sectionSubtitle}>
                Encontre exatamente o que você procura
              </p>
            </div>
            
            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNTAgNTBRMTUwIDMwIDE3MCAzMEwyMzAgMzBRMjUwIDMwIDI1MCA1MEwyNDAgMTIwUTI0MCAxNTAgMjIwIDE1MEwxODAgMTUwUTE1MCAxNTAgMTUwIDEyMFoiIGZpbGw9IiM3MjJGMzciIG9wYWNpdHk9IjAuMyIvPgo8dGV4dCB4PSIxNTAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIj5WZXN0aWRvczwvdGV4dD4KPHN2Zz4K" 
                    alt="Vestidos"
                  />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>Vestidos</h3>
                  <p className={styles.categoryDescription}>
                    Elegância e sofisticação para todas as ocasiões
                  </p>
                  <button className={styles.categoryButton}>
                    Ver Coleção
                  </button>
                </div>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMDAgNjBRMTAwIDQwIDEyMCA0MEwxODAgNDBRMjAwIDQwIDIwMCA2MEwyMDAgMTAwUTIwMCAxMjAgMTgwIDEyMEwxMjAgMTIwUTEwMCAxMjAgMTAwIDEwMFoiIGZpbGw9IiNENEFGMzciIG9wYWNpdHk9IjAuMyIvPgo8Y2lyY2xlIGN4PSI4NSIgY3k9IjcwIiByPSI4IiBmaWxsPSIjRDRBRjM3IiBvcGFjaXR5PSIwLjUiLz4KPGNpcmNsZSBjeD0iMjE1IiBjeT0iNzAiIHI9IjgiIGZpbGw9IiNENEFGMzciIG9wYWNpdHk9IjAuNSIvPgo8dGV4dCB4PSIxNTAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0Q0QUYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIj5CbHVzYXM8L3RleHQ+Cjwvc3ZnPgo=" 
                    alt="Blusas"
                  />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>Blusas & Camisas</h3>
                  <p className={styles.categoryDescription}>
                    Versatilidade e estilo para o dia a dia
                  </p>
                  <button className={styles.categoryButton}>
                    Ver Coleção
                  </button>
                </div>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMjAgNjBMMTgwIDYwTDE3NSAxNDBMMTY1IDE0MEwxNjAgODBMMTQwIDgwTDEzNSAxNDBMMTI1IDE0MFoiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMyIvPgo8dGV4dCB4PSIxNTAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIj5DYWzDp2FzPC90ZXh0Pgo8L3N2Zz4K" 
                    alt="Calças"
                  />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>Calças & Shorts</h3>
                  <p className={styles.categoryDescription}>
                    Conforto e elegância em cada movimento
                  </p>
                  <button className={styles.categoryButton}>
                    Ver Coleção
                  </button>
                </div>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIxNSIgZmlsbD0iI0Q0QUYzNyIgb3BhY2l0eT0iMC40Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iMTAiIGZpbGw9IiM3MjJGMzciIG9wYWNpdHk9IjAuNCIvPgo8cmVjdCB4PSIxMjAiIHk9IjEwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjNkM3NTdEIiBvcGFjaXR5PSIwLjMiLz4KPHRleHQgeD0iMTUwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNENEFGMzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCI+QWNlc3PDsXJpb3M8L3RleHQ+Cjwvc3ZnPgo=" 
                    alt="Acessórios"
                  />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>Acessórios</h3>
                  <p className={styles.categoryDescription}>
                    Detalhes que fazem toda a diferença
                  </p>
                  <button className={styles.categoryButton}>
                    Ver Coleção
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Seção de Newsletter */}
        <section className={styles.newsletterSection}>
          <div className={styles.container}>
            <div className={styles.newsletterContent}>
              <div className={styles.newsletterText}>
                <h2 className={styles.newsletterTitle}>
                  Fique por dentro das novidades
                </h2>
                <p className={styles.newsletterSubtitle}>
                  Receba em primeira mão nossas promoções exclusivas e lançamentos
                </p>
              </div>
              
              <form className={styles.newsletterForm}>
                <div className={styles.inputGroup}>
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail"
                    className={styles.emailInput}
                    required
                  />
                  <button type="submit" className={styles.subscribeButton}>
                    Cadastrar
                  </button>
                </div>
                <p className={styles.privacyText}>
                  Ao se cadastrar, você concorda com nossa política de privacidade
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;