import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

const Categories = () => {
  const topBanners = [
    {
      id: 1,
      title: 'goal driven facials',
      buttonText: 'Book Your Glow',
      // Imagem testada: Mulher, tons terrosos
      image: 'https://www.sanaskinstudio.com/cdn/shop/files/sana-banner-small-00003.png?v=1752525867&width=1650',
      link: '/categoria/facials'
    },
    {
      id: 2,
      title: 'real guidance',
      buttonText: 'Sana Membership',
      // Imagem testada: Close rosto, clean
      image: 'https://www.sanaskinstudio.com/cdn/shop/files/sana-banner-small-00002.png?v=1752525867&width=1800',
      link: '/categoria/membership'
    },
    {
      id: 3,
      title: 'clean skincare',
      buttonText: 'Shop Curation',
      // Imagem testada: Produto na mão
      image: 'https://www.sanaskinstudio.com/cdn/shop/files/sana-banner-small-00001.png?v=1752525867&width=1950',
      link: '/categoria/shop'
    }
  ];

  const bottomBannerData = {
    id: 'supermama',
    subtitle: 'meet our newest facial',
    title: 'THE SUPERMAMA FACIAL',
    buttonText: 'BOOK YOUR GLOW',
    // Imagem testada: Mulher gravida fundo infinito
    image: 'https://www.sanaskinstudio.com/cdn/shop/files/SuperMama3893_2.jpg?v=1756374863&width=2500',
    link: '/colecao/supermama'
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* --- GRID SUPERIOR --- */}
        <div className={styles.topGrid}>
          {topBanners.map((banner) => (
            <Link 
              to={banner.link} 
              key={banner.id} 
              className={styles.smallBannerCard}
              // APLICANDO IMAGEM DIRETO NO STYLE PARA GARANTIR EXIBIÇÃO
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className={styles.overlay}></div>
              <div className={styles.contentTop}>
                <h3 className={styles.smallTitle}>{banner.title}</h3>
                <span className={styles.smallButton}>{banner.buttonText}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* --- BANNER INFERIOR --- */}
        <div className={styles.bottomWrapper}>
          <Link 
            to={bottomBannerData.link} 
            className={styles.largeBannerCard}
            style={{ backgroundImage: `url(${bottomBannerData.image})` }}
          >
            <div className={styles.largeOverlay}></div>
            <div className={styles.contentBottom}>
              <span className={styles.subtitle}>{bottomBannerData.subtitle}</span>
              <h2 className={styles.largeTitle}>{bottomBannerData.title}</h2>
              <span className={styles.largeButton}>{bottomBannerData.buttonText}</span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Categories;