import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaEye,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaGift
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import { useCMS } from '../../../contexts/CMSContext';
import styles from './NewProductCarousel.module.css';

// Produtos simulados (fallback)
const SAMPLE_PRODUCTS = [
  { 
    id: 'p1', 
    name: 'Blusa Social Elegante', 
    price: 89.90, 
    image: 'https://picsum.photos/seed/blusa1/400/480', 
    category: 'Blusas & Camisas', 
    rating: 4.5,
    reviews: 124,
    isNew: true,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Branco', 'Preto', 'Azul']
  },
  { 
    id: 'p2', 
    name: 'Vestido Festa Velvet', 
    price: 189.90,
    originalPrice: 219.90,
    salePrice: 189.90,
    isPromo: true,
    discount: 14,
    image: 'https://picsum.photos/seed/vestido2/400/480', 
    category: 'Vestidos', 
    rating: 4.8,
    reviews: 89,
    isNew: true,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Vinho', 'Preto', 'Azul Marinho']
  },
  { 
    id: 'p3', 
    name: 'Calça Alfaiataria Slim', 
    price: 159.90, 
    image: 'https://picsum.photos/seed/calca3/400/480', 
    category: 'Calças & Shorts', 
    rating: 4.3,
    reviews: 67,
    isNew: true,
    sizes: ['36', '38', '40', '42'],
    colors: ['Preto', 'Cinza', 'Marinho']
  },
  { 
    id: 'p4', 
    name: 'Saia Midi Plissada', 
    price: 129.90, 
    image: 'https://picsum.photos/seed/saia4/400/480', 
    category: 'Saias & Macacões', 
    rating: 4.6,
    reviews: 156,
    isNew: true,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Camel', 'Preto', 'Vinho']
  },
  { 
    id: 'p5', 
    name: 'Camisa Seda Premium', 
    price: 219.90, 
    image: 'https://picsum.photos/seed/camisa5/400/480', 
    category: 'Blusas & Camisas', 
    rating: 4.9,
    reviews: 203,
    isNew: true,
    sizes: ['P', 'M', 'G'],
    colors: ['Branco', 'Nude', 'Preto']
  },
  { 
    id: 'p6', 
    name: 'Macacão Minimal Chic', 
    price: 199.90, 
    image: 'https://picsum.photos/seed/macacao6/400/480', 
    category: 'Saias & Macacões', 
    rating: 4.4,
    reviews: 78,
    isNew: true,
    sizes: ['P', 'M', 'G'],
    colors: ['Preto', 'Camel', 'Branco']
  },
  { 
    id: 'p7', 
    name: 'Bolsa Courino Dourada', 
    price: 149.90,
    originalPrice: 169.90,
    salePrice: 149.90,
    isPromo: true,
    discount: 12,
    image: 'https://picsum.photos/seed/bolsa7/400/480', 
    category: 'Acessórios', 
    rating: 4.2,
    reviews: 45,
    isNew: true,
    colors: ['Dourado', 'Preto', 'Camel']
  },
  { 
    id: 'p8', 
    name: 'Sandália Salto Fino', 
    price: 179.90, 
    image: 'https://picsum.photos/seed/sandalia8/400/480', 
    category: 'Acessórios', 
    rating: 4.7,
    reviews: 134,
    isNew: true,
    sizes: ['35', '36', '37', '38', '39'],
    colors: ['Nude', 'Preto', 'Dourado']
  },
  { 
    id: 'p9', 
    name: 'Blazer Tweed Clássico', 
    price: 259.90, 
    image: 'https://picsum.photos/seed/blazer9/400/480', 
    category: 'Blusas & Camisas', 
    rating: 4.8,
    reviews: 92,
    isNew: true,
    sizes: ['P', 'M', 'G'],
    colors: ['Tweed', 'Preto', 'Cinza']
  },
  { 
    id: 'p10', 
    name: 'Vestido Casual Summer', 
    price: 129.90, 
    image: 'https://picsum.photos/seed/vestido10/400/480', 
    category: 'Vestidos', 
    rating: 4.5,
    reviews: 167,
    isNew: true,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Floral', 'Liso', 'Estampado']
  },
  { 
    id: 'p11', 
    name: 'Short Linho Fresh', 
    price: 99.90, 
    image: 'https://picsum.photos/seed/short11/400/480', 
    category: 'Calças & Shorts', 
    rating: 4.1,
    reviews: 89,
    isNew: true,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Branco', 'Bege', 'Azul']
  },
  { 
    id: 'p12', 
    name: 'Colar Pérolas Delicadas', 
    price: 79.90, 
    image: 'https://picsum.photos/seed/colar12/400/480', 
    category: 'Acessórios', 
    rating: 4.6,
    reviews: 234,
    isNew: true,
    colors: ['Dourado', 'Prateado']
  }
];

const NewProductsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Obter configurações do CMS
  const { getNewProductsSettings } = useCMS();
  const newProductsSettings = getNewProductsSettings();

  // Filtrar produtos baseado nos IDs do CMS
  const products = SAMPLE_PRODUCTS.filter(product => 
    newProductsSettings.productIds.includes(product.id)
  ).sort((a, b) => {
    // Manter a ordem definida no CMS
    const indexA = newProductsSettings.productIds.indexOf(a.id);
    const indexB = newProductsSettings.productIds.indexOf(b.id);
    return indexA - indexB;
  });

  // Auto-play functionality (usando configurações do CMS)
  useEffect(() => {
    if (newProductsSettings.autoPlay && isAutoPlaying && !isDragging && products.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, newProductsSettings.autoPlayInterval || 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [newProductsSettings.autoPlay, newProductsSettings.autoPlayInterval, isAutoPlaying, isDragging, products.length]);

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

  // Não renderizar se não estiver ativo ou não há produtos
  if (!newProductsSettings.active || !products || products.length === 0) {
    return null;
  }

  return (
    <section className={styles.newProductsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FaGift className={styles.titleIcon} />
            {newProductsSettings.title}
          </h2>
          {newProductsSettings.subtitle && (
            <p className={styles.sectionSubtitle}>{newProductsSettings.subtitle}</p>
          )}
        </div>

        <div className={styles.carouselWrapper}>
          {/* Botões de navegação (se habilitados) */}
          {newProductsSettings.showArrows && (
            <>
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
            </>
          )}

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
                    
                    {/* Badge de novo produto - SEMPRE MOSTRAR */}
                    <div className={styles.newBadge}>
                      <FaGift /> Novo
                    </div>

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

        {/* Indicadores (se habilitados) */}
        {newProductsSettings.showIndicators && (
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
        )}
      </div>
    </section>
  );
};

export default NewProductsCarousel;