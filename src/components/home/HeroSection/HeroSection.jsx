import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaPlay,
  FaStar,
  FaHeart,
  FaShoppingBag
} from 'react-icons/fa';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slides do hero
  const heroSlides = [
    {
      id: 1,
      title: "Nova Coleção",
      subtitle: "Primavera/Verão 2024",
      description: "Descubra as últimas tendências em moda feminina com peças exclusivas que destacam sua elegância natural.",
      ctaText: "Explorar Coleção",
      ctaLink: "/categoria/novidades",
      backgroundImage: generateHeroBackground("Coleção Primavera", "#722F37"),
      badge: "Novo",
      offer: "Até 30% OFF"
    },
    {
      id: 2,
      title: "Vestidos Elegantes",
      subtitle: "Para Todas as Ocasiões",
      description: "Do casual ao formal, encontre o vestido perfeito para cada momento especial da sua vida.",
      ctaText: "Ver Vestidos",
      ctaLink: "/categoria/vestidos",
      backgroundImage: generateHeroBackground("Vestidos Elegantes", "#D4AF37"),
      badge: "Destaque",
      offer: "Frete Grátis"
    },
    {
      id: 3,
      title: "Estilo Profissional",
      subtitle: "Confiança & Sofisticação",
      description: "Peças versáteis que combinam conforto e elegância para a mulher moderna e determinada.",
      ctaText: "Shop Now",
      ctaLink: "/categoria/profissional",
      backgroundImage: generateHeroBackground("Estilo Profissional", "#000000"),
      badge: "Trending",
      offer: "2x sem juros"
    }
  ];

  // Auto-play do slider
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, heroSlides.length]);

  // Função para gerar background SVG
  function generateHeroBackground(theme, primaryColor) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="1920" height="800" viewBox="0 0 1920 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heroGrad${theme.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:0.1" />
            <stop offset="50%" style="stop-color:#FFFFFF;stop-opacity:0.05" />
            <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:0.2" />
          </linearGradient>
          
          <pattern id="heroPattern${theme.replace(/\s/g, '')}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="${primaryColor}" opacity="0.1"/>
            <circle cx="25" cy="25" r="1" fill="${primaryColor}" opacity="0.05"/>
            <circle cx="75" cy="75" r="1" fill="${primaryColor}" opacity="0.05"/>
          </pattern>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1920" height="800" fill="#FFFFFF"/>
        <rect width="1920" height="800" fill="url(#heroGrad${theme.replace(/\s/g, '')})"/>
        <rect width="1920" height="800" fill="url(#heroPattern${theme.replace(/\s/g, '')})"/>
        
        <!-- Decorative Elements -->
        <g transform="translate(1400, 200)">
          <!-- Fashion silhouette -->
          <path d="M0 0 Q20 -30 40 0 L35 100 Q35 150 20 150 Q5 150 5 100 Z" 
                fill="${primaryColor}" opacity="0.15" filter="url(#glow)"/>
          
          <!-- Accessories -->
          <circle cx="60" cy="50" r="15" fill="${primaryColor}" opacity="0.1"/>
          <circle cx="60" cy="50" r="10" fill="${primaryColor}" opacity="0.2"/>
          <circle cx="60" cy="50" r="5" fill="${primaryColor}" opacity="0.3"/>
          
          <!-- Decorative lines -->
          <path d="M80 20 Q120 40 100 80 Q140 100 120 140" 
                stroke="${primaryColor}" stroke-width="2" fill="none" opacity="0.2"/>
        </g>
        
        <!-- Left side decoration -->
        <g transform="translate(100, 300)">
          <circle cx="0" cy="0" r="80" fill="${primaryColor}" opacity="0.05"/>
          <circle cx="0" cy="0" r="50" fill="${primaryColor}" opacity="0.1"/>
          <circle cx="0" cy="0" r="20" fill="${primaryColor}" opacity="0.2"/>
        </g>
        
        <!-- Bottom wave -->
        <path d="M0 700 Q480 650 960 700 T1920 700 V800 H0 Z" 
              fill="${primaryColor}" opacity="0.08"/>
              
        <!-- Floating elements -->
        <g opacity="0.1">
          <circle cx="300" cy="150" r="4" fill="${primaryColor}"/>
          <circle cx="800" cy="100" r="3" fill="${primaryColor}"/>
          <circle cx="1200" cy="200" r="5" fill="${primaryColor}"/>
          <circle cx="500" cy="600" r="3" fill="${primaryColor}"/>
          <circle cx="1500" cy="500" r="4" fill="${primaryColor}"/>
        </g>
      </svg>
    `)}`;
  }

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div 
        className={styles.heroBackground}
        style={{ backgroundImage: `url(${currentSlideData.backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className={styles.heroOverlay} />
      
      {/* Content Container */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Left Content */}
          <div className={styles.heroText}>
            {/* Badge */}
            <div className={styles.heroBadge}>
              <span className={styles.badgeText}>{currentSlideData.badge}</span>
              {currentSlideData.offer && (
                <span className={styles.offerText}>{currentSlideData.offer}</span>
              )}
            </div>
            
            {/* Main Title */}
            <h1 className={styles.heroTitle}>
              <span className={styles.titleMain}>{currentSlideData.title}</span>
              <span className={styles.titleSub}>{currentSlideData.subtitle}</span>
            </h1>
            
            {/* Description */}
            <p className={styles.heroDescription}>
              {currentSlideData.description}
            </p>
            
            {/* Statistics */}
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <FaStar className={styles.statIcon} />
                <div className={styles.statText}>
                  <span className={styles.statNumber}>4.9</span>
                  <span className={styles.statLabel}>Avaliação</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <FaHeart className={styles.statIcon} />
                <div className={styles.statText}>
                  <span className={styles.statNumber}>10k+</span>
                  <span className={styles.statLabel}>Clientes</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <FaShoppingBag className={styles.statIcon} />
                <div className={styles.statText}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Produtos</span>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className={styles.heroActions}>
              <Link 
                to={currentSlideData.ctaLink} 
                className={styles.primaryButton}
              >
                <span>{currentSlideData.ctaText}</span>
                <FaArrowRight className={styles.buttonIcon} />
              </Link>
              
              <button className={styles.secondaryButton}>
                <FaPlay className={styles.playIcon} />
                <span>Ver Lookbook</span>
              </button>
            </div>
          </div>
          
          {/* Right Content - Featured Product */}
          <div className={styles.heroVisual}>
            <div className={styles.featuredProduct}>
              <div className={styles.productCard}>
                <div className={styles.productImage}>
                  <img 
                    src={generateHeroBackground("Produto Destaque", "#722F37")}
                    alt="Produto em Destaque"
                    loading="lazy"
                  />
                  <div className={styles.productBadge}>Novo</div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>Vestido Elegante</h3>
                  <div className={styles.productRating}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span>(124)</span>
                  </div>
                  <div className={styles.productPrice}>
                    <span className={styles.salePrice}>R$ 299,90</span>
                    <span className={styles.originalPrice}>R$ 399,90</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className={styles.floatingElements}>
                <div className={styles.floatingCard} style={{ top: '10%', right: '10%' }}>
                  <FaHeart />
                  <span>Favorito</span>
                </div>
                <div className={styles.floatingCard} style={{ bottom: '20%', left: '10%' }}>
                  <span>✨</span>
                  <span>Tendência</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider Controls */}
      <div className={styles.sliderControls}>
        {/* Dots */}
        <div className={styles.sliderDots}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <div className={styles.sliderArrows}>
          <button 
            className={styles.prevArrow}
            onClick={() => {
              setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
            aria-label="Slide anterior"
          >
            ←
          </button>
          <button 
            className={styles.nextArrow}
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
            aria-label="Próximo slide"
          >
            →
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Role para baixo</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
};

export default HeroSection;