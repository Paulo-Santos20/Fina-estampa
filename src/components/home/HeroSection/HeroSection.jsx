import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaPlay, 
  FaStar, 
  FaShoppingBag,
  FaChevronLeft,
  FaChevronRight,
  FaHeart
} from 'react-icons/fa';
import styles from './HeroSection.module.css';
import { useCMS } from '../../../contexts/CMSContext.jsx';

// Imagem de fallback garantida
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { getActiveHeroSlides } = useCMS();
  const heroSlides = getActiveHeroSlides() || [];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (heroSlides.length || 1));
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + (heroSlides.length || 1)) % (heroSlides.length || 1));
  }, [heroSlides.length]);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && heroSlides.length > 1) {
      const interval = setInterval(nextSlide, 6000); 
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, heroSlides.length, nextSlide]);

  // Dados do slide ativo
  const activeSlide = heroSlides.length > 0 ? heroSlides[currentSlide] : {
    title: "Nova Coleção 2026",
    subtitle: "Elegância & Sofisticação",
    description: "Peças exclusivas que unem conforto e alta costura. Transforme seu guarda-roupa com nossa nova linha de alfaiataria.",
    image: FALLBACK_IMAGE,
    backgroundImage: FALLBACK_IMAGE,
    ctaText: "Ver Coleção",
    ctaLink: "/catalog",
    badge: "Lançamento",
    offer: "Frete Grátis"
  };

  const displayImage = activeSlide.image || activeSlide.backgroundImage || FALLBACK_IMAGE;

  return (
    <section className={styles.heroSection}>
      {/* Background Decorativo */}
      <div className={styles.heroBackground} />
      
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          
          {/* LADO ESQUERDO: TEXTO (Muda com o banner) */}
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeText}>{activeSlide.badge || 'Novo'}</span>
              {activeSlide.offer && (
                <span className={styles.offerText}>{activeSlide.offer}</span>
              )}
            </div>
            
            <h1 className={styles.heroTitle}>
              <span className={styles.titleSub}>{activeSlide.subtitle}</span>
              <span className={styles.titleMain}>{activeSlide.title}</span>
            </h1>
            
            <p className={styles.heroDescription}>
              {activeSlide.description}
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statIconBox}><FaStar /></div>
                <div className={styles.statText}>
                  <strong>4.9/5</strong>
                  <span>Avaliação</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIconBox}><FaShoppingBag /></div>
                <div className={styles.statText}>
                  <strong>+10k</strong>
                  <span>Clientes</span>
                </div>
              </div>
            </div>
            
            <div className={styles.heroActions}>
              <Link to={activeSlide.ctaLink || '/catalog'} className={styles.primaryButton}>
                {activeSlide.ctaText || 'Comprar Agora'}
                <FaArrowRight />
              </Link>
              
              <button className={styles.secondaryButton}>
                <FaPlay className={styles.playIcon} />
                <span>Vídeo</span>
              </button>
            </div>
          </div>
          
          {/* LADO DIREITO: IMAGEM (Fixa visualmente, muda src) */}
          <div className={styles.heroVisual}>
            <div className={styles.featuredCard}>
              <div className={styles.cardImageWrapper}>
                <img 
                  src={displayImage} 
                  alt={activeSlide.title}
                  className={styles.cardImage}
                />
                
                <div className={styles.floatingTag}>
                  <FaHeart />
                </div>
                
                <div className={styles.glassInfo}>
                  <div>
                    <h4>Peça Destaque</h4>
                    <p>R$ 299,90</p>
                  </div>
                  <div className={styles.miniFab}><FaArrowRight /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO: Setas */}
        {heroSlides.length > 1 && (
          <div className={styles.navContainer}>
            <button 
              className={styles.navButton} 
              onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </button>
            <button 
              className={styles.navButton} 
              onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
              aria-label="Próximo"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;