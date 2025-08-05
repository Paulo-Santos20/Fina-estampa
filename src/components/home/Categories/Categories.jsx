import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import styles from './Categories.module.css';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Vestidos',
      description: 'Elegância em cada ocasião',
      image: 'https://i.imgur.com/8J2K9Qm.jpg', // Vestido elegante
      itemCount: 45,
      link: '/categoria/vestidos'
    },
    {
      id: 2,
      name: 'Blusas',
      description: 'Sofisticação no dia a dia',
      image: 'https://i.imgur.com/7H3L5Nm.jpg', // Blusa feminina
      itemCount: 38,
      link: '/categoria/blusas'
    },
    {
      id: 3,
      name: 'Calças',
      description: 'Conforto e estilo',
      image: 'https://i.imgur.com/9M4P6Ro.jpg', // Calça social
      itemCount: 32,
      link: '/categoria/calcas'
    },
    {
      id: 4,
      name: 'Saias',
      description: 'Feminilidade moderna',
      image: 'https://i.imgur.com/2N8Q7Ts.jpg', // Saia midi
      itemCount: 28,
      link: '/categoria/saias'
    },
    {
      id: 5,
      name: 'Acessórios',
      description: 'Detalhes que fazem a diferença',
      image: 'https://i.imgur.com/5K1R3Uv.jpg', // Bolsa e acessórios
      itemCount: 56,
      link: '/categoria/acessorios'
    },
    {
      id: 6,
      name: 'Calçados',
      description: 'Pisada com personalidade',
      image: 'https://i.imgur.com/4W9X2Yz.jpg', // Sapatos femininos
      itemCount: 24,
      link: '/categoria/calcados'
    }
  ];

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        {/* Header da Seção */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Nossas Categorias</h2>
          <p className={styles.sectionSubtitle}>
            Descubra peças únicas para cada momento da sua vida
          </p>
        </div>

        {/* Grid de Categorias */}
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.link}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageWrapper}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className={styles.categoryImage}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback para placeholder se a imagem falhar
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="600" height="400" fill="#F8E8E9"/>
                        <text x="300" y="180" text-anchor="middle" font-family="Arial" font-size="80">👗</text>
                        <text x="300" y="240" text-anchor="middle" fill="#722F37" font-family="Arial" font-size="24" font-weight="bold">${category.name}</text>
                        <text x="300" y="270" text-anchor="middle" fill="#722F37" font-family="Arial" font-size="16">Fina Estampa</text>
                      </svg>
                    `)}`;
                  }}
                />
                <div className={styles.categoryOverlay}>
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>{category.description}</p>
                    <div className={styles.categoryFooter}>
                      <span className={styles.itemCount}>{category.itemCount} produtos</span>
                      <div className={styles.arrowIcon}>
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;