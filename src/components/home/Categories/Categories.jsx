import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

const Categories = () => {
  const topBanners = [
    {
      id: 1,
      title: 'goal driven facials',
      buttonText: 'Book Your Glow',
      image: 'https://www.sanaskinstudio.com/cdn/shop/files/sana-banner-small-00003.png?v=1752525867&width=1650',
      link: '/categoria/facials'
    },
    {
      id: 2,
      title: 'real guidance',
      buttonText: 'Sana Membership',
      image: 'https://www.sanaskinstudio.com/cdn/shop/files/sana-banner-small-00002.png?v=1752525867&width=1800',
      link: '/categoria/membership'
    },
    {
      id: 3,
      title: 'clean skincare',
      buttonText: 'Shop Curation',
      image: 'https://www.sanaskinstudio.com/cdn/shop/files/sana-banner-small-00001.png?v=1752525867&width=1650',
      link: '/categoria/shop'
    }
  ];

  const bottomBannerData = {
    id: 'supermama',
    subtitle: 'meet our newest facial',
    title: 'THE SUPERMAMA FACIAL',
    buttonText: 'BOOK YOUR GLOW',
    image: 'https://www.sanaskinstudio.com/cdn/shop/files/SuperMama3893_2.jpg?v=1756374863&width=2500',
    link: '/colecao/supermama'
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* --- GRID SUPERIOR --- */}
        <div className={styles.topGrid}>
          {topBanners.map((banner) => (
            <Link to={banner.link} key={banner.id} className={styles.smallBannerCard}>
              {/* Wrapper da imagem para permitir o zoom sem estourar o card */}
              <div className={styles.imageWrapper}>
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className={styles.bannerImage} 
                />
              </div>
              
              <div className={styles.overlay}></div>
              
              <div className={styles.smallBannerContent}>
                <h3 className={styles.smallBannerTitle}>{banner.title}</h3>
                <span className={styles.smallBannerButton}>{banner.buttonText}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* --- BANNER INFERIOR --- */}
        <div className={styles.bottomWrapper}>
          <Link to={bottomBannerData.link} className={styles.largeBannerCard}>
            <div className={styles.largeImageWrapper}>
              <img 
                src={bottomBannerData.image} 
                alt={bottomBannerData.title} 
                className={styles.bannerImage} 
              />
            </div>

            <div className={styles.largeOverlay}></div>
            
            <div className={styles.largeBannerContent}>
              <span className={styles.largeSubtitle}>{bottomBannerData.subtitle}</span>
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