import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaEye,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCarousel.module.css';

const ProductCarousel = ({ products, title, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isDragging && products.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isDragging, products.length]);

  // Touch/Mouse events for manual scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
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

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0] || 'Padrão';
    
    addToCart(product, defaultSize, defaultColor, 1);
    
    // Feedback visual
    const button = e.currentTarget;
    button.classList.add(styles.adding);
    setTimeout(() => {
      button.classList.remove(styles.adding);
    }, 300);
    
    console.log(`${product.name} adicionado ao carrinho!`);
  };

  // Função para navegar para o produto
  const handleProductClick = (productId) => {
    navigate(`/produto/${productId}`);
  };

  // Verificar se há produtos
  if (!products || products.length === 0) {
    return (
      <section className={styles.carouselSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
            <p className={styles.sectionSubtitle}>Carregando produtos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          {subtitle && (
            <p className={styles.sectionSubtitle}>{subtitle}</p>
          )}
        </div>

        <div className={styles.carouselWrapper}>
          {/* Botões de navegação */}
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Produto anterior"
          >
            <FaChevronLeft />
          </button>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextSlide}
            aria-label="Próximo produto"
          >
            <FaChevronRight />
          </button>

          {/* Container do carrossel */}
          <div 
            className={styles.carouselContainer}
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            style={{
              transform: `translateX(-${currentIndex * 20}%)`,
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {/* Renderizar produtos */}
            {products.map((product, index) => (
              <div 
                key={product.id || index} 
                className={styles.productCard}
                onClick={() => handleProductClick(product.id)}
              >
                <div className={styles.productCardInner}>
                  <div className={styles.productImageWrapper}>
                    <img
                      src={product.image}
                      alt={product.name || 'Produto'}
                      className={styles.productImage}
                      draggable={false}
                      loading="lazy"
                      onLoad={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      onError={(e) => {
                        // Fallback para emoji se a imagem falhar
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjYwIj7wn5GXPC90ZXh0Pgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5GaW5hIEVzdGFtcGE8L3RleHQ+Cjwvc3ZnPgo=";
                      }}
                      style={{ opacity: 0 }}
                    />
                    
                    {/* Badge de desconto para produtos em promoção */}
                    {product.isPromo && product.discount && (
                      <div className={styles.discountBadge}>
                        -{product.discount}%
                      </div>
                    )}
                    
                    {/* Badge de novo produto */}
                    {product.isNew && (
                      <div className={styles.newBadge}>Novo</div>
                    )}

                    {/* Ações do produto */}
                    <div className={styles.productActions}>
                      <button 
                        className={styles.actionButton} 
                        aria-label="Adicionar aos favoritos"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(`${product.name} adicionado aos favoritos!`);
                        }}
                      >
                        <FaHeart 
                          style={{ 
                            fontSize: '16px',
                            color: '#722F37',
                            display: 'block'
                          }} 
                        />
                      </button>
                      <button 
                        className={styles.actionButton} 
                        aria-label="Visualização rápida"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(`Visualização rápida: ${product.name}`);
                        }}
                      >
                        <FaEye 
                          style={{ 
                            fontSize: '16px',
                            color: '#722F37',
                            display: 'block'
                          }} 
                        />
                      </button>
                    </div>
                  </div>

                  <div className={styles.productInfo}>
                    <div className={styles.productLink}>
                      <h3 className={styles.productName}>{product.name || 'Produto sem nome'}</h3>
                    </div>
                    
                    <div className={styles.productRating}>
                      <div className={styles.stars}>
                        {renderStars(product.rating || 0)}
                      </div>
                      <span className={styles.reviewCount}>({product.reviews || 0})</span>
                    </div>
                    
                    {/* Preços reformulados */}
                    <div className={styles.productPricing}>
                      {product.isPromo ? (
                        <div className={styles.promoPrice}>
                          <span className={styles.originalPrice}>
                            {formatPrice(product.originalPrice || 0)}
                          </span>
                          <div className={styles.currentPriceWrapper}>
                            <span className={styles.currentPrice}>
                              {formatPrice(product.salePrice || 0)}
                            </span>
                            <button 
                              className={styles.addToCartIcon}
                              onClick={(e) => handleAddToCart(e, product)}
                              aria-label={`Adicionar ${product.name} ao carrinho`}
                            >
                              <FaShoppingCart 
                                style={{ 
                                  fontSize: '20px',
                                  color: 'white',
                                  display: 'block'
                                }} 
                              />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.regularPriceWrapper}>
                          <span className={styles.regularPrice}>
                            {formatPrice(product.price || 0)}
                          </span>
                          <button 
                            className={styles.addToCartIcon}
                            onClick={(e) => handleAddToCart(e, product)}
                            aria-label={`Adicionar ${product.name} ao carrinho`}
                          >
                            <FaShoppingCart 
                              style={{ 
                                fontSize: '20px',
                                color: 'white',
                                display: 'block'
                              }} 
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className={styles.indicators}>
          {products.slice(0, Math.min(products.length, 8)).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex % products.length ? styles.active : ''
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 4000);
              }}
              aria-label={`Ir para produto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;