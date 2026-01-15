import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeart, FaEye, FaStar, FaChevronLeft, FaChevronRight, FaShoppingCart
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import { useCMS } from '../../../contexts/CMSContext';
import styles from './ProductCarousel.module.css';

const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Blusa Social Elegante', price: 89.90, image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&q=80', category: 'Blusas', rating: 4.5, reviews: 124, sizes: ['P', 'M'], colors: ['Branco'] },
  { id: 'p2', name: 'Vestido Festa Velvet', price: 189.90, originalPrice: 219.90, isPromo: true, discount: 14, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80', category: 'Vestidos', rating: 4.8, reviews: 89, sizes: ['M', 'G'], colors: ['Vinho'] },
  { id: 'p3', name: 'Calça Alfaiataria Slim', price: 159.90, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80', category: 'Calças', rating: 4.3, reviews: 67, sizes: ['38', '40'], colors: ['Preto'] },
  { id: 'p4', name: 'Saia Midi Plissada', price: 129.90, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80', category: 'Saias', rating: 4.6, reviews: 156, isNew: true, sizes: ['P', 'M'], colors: ['Preto'] },
  { id: 'p5', name: 'Camisa Seda Premium', price: 219.90, image: 'https://images.unsplash.com/photo-1604176354204-9268737828fa?w=500&q=80', category: 'Blusas', rating: 4.9, reviews: 203, sizes: ['P', 'M'], colors: ['Nude'] },
  { id: 'p6', name: 'Macacão Minimal Chic', price: 199.90, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80', category: 'Macacões', rating: 4.4, reviews: 78, sizes: ['M'], colors: ['Preto'] },
];

const ProductCarousel = () => {
  // Lógica Infinita
  const [products, setProducts] = useState([...SAMPLE_PRODUCTS, ...SAMPLE_PRODUCTS, ...SAMPLE_PRODUCTS]);
  const [currentIndex, setCurrentIndex] = useState(SAMPLE_PRODUCTS.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(4);
  
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const context = useCart();
  const navigate = useNavigate();
  const { getCarouselSettings } = useCMS();

  const addToCartFunc = context.addToCart || context.addItem;
  const carouselSettings = getCarouselSettings();

  // --- ALTERAÇÃO AQUI: Lógica de Breakpoints Ajustada ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setItemsToShow(4);
      } else if (width > 768) {
        setItemsToShow(3);
      } else {
        // Agora mostra 2 itens em qualquer tela menor que 768px (Mobile)
        setItemsToShow(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveSlide = useCallback((direction) => {
    if (!isTransitioning) setIsTransitioning(true);
    setCurrentIndex(prev => prev + direction);
  }, [isTransitioning]);

  const handleTransitionEnd = () => {
    const originalLength = SAMPLE_PRODUCTS.length;
    if (currentIndex >= originalLength * 2) {
      setIsTransitioning(false);
      setCurrentIndex(originalLength);
    } else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(originalLength);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (carouselSettings.autoPlay) {
      autoPlayRef.current = setInterval(() => {
        moveSlide(1);
      }, carouselSettings.autoPlayInterval || 4000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [carouselSettings.autoPlay, moveSlide, carouselSettings.autoPlayInterval]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      selectedSize: product.sizes?.[0] || 'UN',
      selectedColor: product.colors?.[0] || 'Padrão',
      quantity: 1
    };
    if (typeof addToCartFunc === 'function') {
      addToCartFunc(cartItem);
      const btn = e.currentTarget;
      btn.classList.add(styles.adding);
      setTimeout(() => btn.classList.remove(styles.adding), 300);
    }
  };

  const formatPrice = (price) => price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) stars.push(<FaStar key={i} className={styles.starFilled} />);
      else stars.push(<FaStar key={i} className={styles.starEmpty} />);
    }
    return stars;
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{carouselSettings.title || 'Destaques'}</h2>
          {carouselSettings.subtitle && <p className={styles.sectionSubtitle}>{carouselSettings.subtitle}</p>}
        </div>

        <div className={styles.carouselWrapper}>
          {/* Setas aparecem mesmo no mobile se configurado, ou o autoplay cuida disso */}
          {carouselSettings.showArrows && (
            <>
              <button className={`${styles.navButton} ${styles.prevButton}`} onClick={() => moveSlide(-1)}>
                <FaChevronLeft />
              </button>
              <button className={`${styles.navButton} ${styles.nextButton}`} onClick={() => moveSlide(1)}>
                <FaChevronRight />
              </button>
            </>
          )}

          <div 
            className={styles.carouselContainer}
            ref={carouselRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-out' : 'none'
            }}
          >
            {products.map((product, index) => (
              <div 
                key={`${product.id}-${index}`} 
                className={styles.productCard}
                style={{ flex: `0 0 ${100 / itemsToShow}%` }} 
                onClick={() => navigate(`/produto/${product.id}`)}
              >
                <div className={styles.productCardInner}>
                  <div className={styles.productImageWrapper}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                    {product.isPromo && <div className={styles.discountBadge}>-{product.discount}%</div>}
                    {product.isNew && <div className={styles.newBadge}>Novo</div>}
                    <div className={styles.productActions}>
                      <button className={styles.actionButton} onClick={(e) => { e.stopPropagation(); }}>
                        <FaHeart />
                      </button>
                      <button className={styles.actionButton} onClick={(e) => { e.stopPropagation(); navigate(`/produto/${product.id}`); }}>
                        <FaEye />
                      </button>
                    </div>
                  </div>

                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <div className={styles.productRating}>
                      <div className={styles.stars}>{renderStars(product.rating)}</div>
                      <span className={styles.reviewCount}>({product.reviews})</span>
                    </div>
                    <div className={styles.productPricing}>
                      {product.isPromo ? (
                        <div className={styles.promoPrice}>
                          <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                          <div className={styles.currentPriceWrapper}>
                            <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                            <button className={styles.addToCartIcon} onClick={(e) => handleAddToCart(e, product)}>
                              <FaShoppingCart />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.regularPriceWrapper}>
                          <span className={styles.regularPrice}>{formatPrice(product.price)}</span>
                          <button className={styles.addToCartIcon} onClick={(e) => handleAddToCart(e, product)}>
                            <FaShoppingCart />
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
      </div>
    </section>
  );
};

export default ProductCarousel;