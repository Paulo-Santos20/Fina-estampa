import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaHeart, 
  FaShoppingCart,
  FaEye,
  FaStar,
  FaTag
} from 'react-icons/fa';
import styles from './Home.module.css';

const Home = () => {
  // Estado para o carrossel do hero
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dados dos banners do hero
  const heroBanners = [
    {
      id: 1,
      image: '/assets/banners/banner-1.jpg',
      title: 'Coleção Primavera/Verão',
      subtitle: 'Descubra as últimas tendências da moda feminina',
      buttonText: 'Ver Coleção',
      link: '/categoria/colecoes',
      overlay: 'rgba(114, 47, 55, 0.4)'
    },
    {
      id: 2,
      image: '/assets/banners/banner-2.jpg',
      title: 'Vestidos Elegantes',
      subtitle: 'Para todas as ocasiões especiais',
      buttonText: 'Comprar Agora',
      link: '/categoria/vestidos',
      overlay: 'rgba(0, 0, 0, 0.3)'
    },
    {
      id: 3,
      image: '/assets/banners/banner-3.jpg',
      title: 'Promoção Imperdível',
      subtitle: 'Até 50% OFF em peças selecionadas',
      buttonText: 'Aproveitar',
      link: '/promocoes',
      overlay: 'rgba(212, 175, 55, 0.4)'
    }
  ];

  // Produtos em promoção (dados mockados)
  const promoProducts = [
    {
      id: 1,
      name: 'Vestido Floral Elegante',
      originalPrice: 199.90,
      salePrice: 149.90,
      discount: 25,
      image: '/assets/products/vestido-1.jpg',
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      name: 'Blusa Sofisticada',
      originalPrice: 89.90,
      salePrice: 67.90,
      discount: 25,
      image: '/assets/products/blusa-1.jpg',
      rating: 4.6,
      reviews: 18
    },
    {
      id: 3,
      name: 'Calça Social Feminina',
      originalPrice: 159.90,
      salePrice: 119.90,
      discount: 25,
      image: '/assets/products/calca-1.jpg',
      rating: 4.9,
      reviews: 31
    },
    {
      id: 4,
      name: 'Saia Midi Clássica',
      originalPrice: 129.90,
      salePrice: 97.90,
      discount: 25,
      image: '/assets/products/saia-1.jpg',
      rating: 4.7,
      reviews: 22
    }
  ];

  // Categorias principais
  const categories = [
    {
      name: 'Vestidos',
      image: '/assets/categories/vestidos.jpg',
      link: '/categoria/vestidos',
      description: 'Elegância e sofisticação'
    },
    {
      name: 'Blusas',
      image: '/assets/categories/blusas.jpg',
      link: '/categoria/blusas',
      description: 'Estilo e conforto'
    },
    {
      name: 'Calças',
      image: '/assets/categories/calcas.jpg',
      link: '/categoria/calcas',
      description: 'Versatilidade moderna'
    },
    {
      name: 'Acessórios',
      image: '/assets/categories/acessorios.jpg',
      link: '/categoria/acessorios',
      description: 'Detalhes que fazem a diferença'
    }
  ];

  // Novos produtos
  const newProducts = [
    {
      id: 5,
      name: 'Vestido Longo Festa',
      price: 299.90,
      image: '/assets/products/vestido-2.jpg',
      isNew: true,
      rating: 5.0,
      reviews: 8
    },
    {
      id: 6,
      name: 'Blazer Executivo',
      price: 189.90,
      image: '/assets/products/blazer-1.jpg',
      isNew: true,
      rating: 4.8,
      reviews: 12
    },
    {
      id: 7,
      name: 'Conjunto Casual',
      price: 159.90,
      image: '/assets/products/conjunto-1.jpg',
      isNew: true,
      rating: 4.9,
      reviews: 15
    },
    {
      id: 8,
      name: 'Bolsa Premium',
      price: 249.90,
      image: '/assets/products/bolsa-1.jpg',
      isNew: true,
      rating: 4.7,
      reviews: 9
    }
  ];

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroBanners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={styles.starFilled} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className={styles.starHalf} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className={styles.starEmpty} />);
    }

    return stars;
  };

  return (
    <div className={styles.homePage}>
      {/* Seção Hero com Carrossel */}
      <section className={styles.heroSection}>
        <div className={styles.heroCarousel}>
          {heroBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`${styles.heroSlide} ${
                index === currentSlide ? styles.active : ''
              }`}
              style={{
                backgroundImage: `linear-gradient(${banner.overlay}, ${banner.overlay}), url(${banner.image})`
              }}
            >
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>{banner.title}</h1>
                <p className={styles.heroSubtitle}>{banner.subtitle}</p>
                <Link to={banner.link} className={styles.heroButton}>
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          ))}

          {/* Controles do carrossel */}
          <button
            className={`${styles.carouselControl} ${styles.prevControl}`}
            onClick={prevSlide}
            aria-label="Slide anterior"
          >
            <FaArrowLeft />
          </button>
          <button
            className={`${styles.carouselControl} ${styles.nextControl}`}
            onClick={nextSlide}
            aria-label="Próximo slide"
          >
            <FaArrowRight />
          </button>

          {/* Indicadores */}
          <div className={styles.carouselIndicators}>
            {heroBanners.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentSlide ? styles.active : ''
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Produtos em Promoção */}
      <section className={styles.promoSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FaTag className={styles.sectionIcon} />
              Produtos em Promoção
            </h2>
            <p className={styles.sectionSubtitle}>
              Aproveite nossas ofertas especiais com até 50% de desconto
            </p>
          </div>

          <div className={styles.productsGrid}>
            {promoProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <div className={styles.discountBadge}>
                    -{product.discount}%
                  </div>
                  <div className={styles.productActions}>
                    <button className={styles.actionButton} aria-label="Adicionar aos favoritos">
                      <FaHeart />
                    </button>
                    <button className={styles.actionButton} aria-label="Visualização rápida">
                      <FaEye />
                    </button>
                    <button className={styles.actionButton} aria-label="Adicionar ao carrinho">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productRating}>
                    <div className={styles.stars}>
                      {renderStars(product.rating)}
                    </div>
                    <span className={styles.reviewCount}>({product.reviews})</span>
                  </div>
                  <div className={styles.productPricing}>
                    <span className={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className={styles.salePrice}>
                      {formatPrice(product.salePrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sectionFooter}>
            <Link to="/promocoes" className={styles.viewAllButton}>
              Ver Todas as Promoções
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Categorias */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nossas Categorias</h2>
            <p className={styles.sectionSubtitle}>
              Descubra nossa coleção organizada por categoria
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className={styles.categoryCard}
              >
                <div className={styles.categoryImageWrapper}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.categoryImage}
                  />
                  <div className={styles.categoryOverlay}>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Novos Produtos */}
      <section className={styles.newProductsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Novos Produtos</h2>
            <p className={styles.sectionSubtitle}>
              As últimas tendências chegaram à nossa loja
            </p>
          </div>

          <div className={styles.productsGrid}>
            {newProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  {product.isNew && (
                    <div className={styles.newBadge}>Novo</div>
                  )}
                  <div className={styles.productActions}>
                    <button className={styles.actionButton} aria-label="Adicionar aos favoritos">
                      <FaHeart />
                    </button>
                    <button className={styles.actionButton} aria-label="Visualização rápida">
                      <FaEye />
                    </button>
                    <button className={styles.actionButton} aria-label="Adicionar ao carrinho">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productRating}>
                    <div className={styles.stars}>
                      {renderStars(product.rating)}
                    </div>
                    <span className={styles.reviewCount}>({product.reviews})</span>
                  </div>
                  <div className={styles.productPricing}>
                    <span className={styles.price}>
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sectionFooter}>
            <Link to="/novidades" className={styles.viewAllButton}>
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;