import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaEye,
  FaStar,
  FaShoppingCart,
  FaGift
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import { useCMS } from '../../../contexts/CMSContext';
import styles from './NewProductCarousel.module.css';

// Fallback sample products
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
];

const NewProductsCarousel = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { getNewProductsSettings } = useCMS();
  
  // Use CMS settings or default
  const newProductsSettings = getNewProductsSettings() || {
    title: 'Novidades',
    subtitle: 'Confira os últimos lançamentos',
    productIds: []
  };

  // Filter for new products. If CMS has IDs, prioritize those, otherwise filter SAMPLE_PRODUCTS by isNew
  let products = [];
  if (newProductsSettings.productIds && newProductsSettings.productIds.length > 0) {
     products = SAMPLE_PRODUCTS.filter(product => 
      newProductsSettings.productIds.includes(product.id)
    );
  } else {
     products = SAMPLE_PRODUCTS.filter(product => product.isNew);
  }

  // Limit to 4 for the initial view if needed, but the grid handles 4 per row naturally.
  // We'll show up to 8 items to fill two rows nicely, or stick to 4 as requested.
  // The request asked for a 4-column system. Showing 4 items makes one row.
  const displayProducts = products.slice(0, 4); 

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
    
    // Visual feedback
    const button = e.currentTarget;
    button.classList.add(styles.adding);
    setTimeout(() => {
      button.classList.remove(styles.adding);
    }, 300);
  };

  const handleProductClick = (productId) => {
    navigate(`/produto/${productId}`);
  };

  const handleSeeMore = () => {
    navigate('/novidades'); // Or whatever route lists all new products
  };

  if (!products || products.length === 0) {
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

        <div className={styles.productsGrid}>
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
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
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjYwIj7wn5GXPC90ZXh0Pgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5GaW5hIEVzdGFtcGE8L3RleHQ+Cjwvc3ZnPgo=";
                    }}
                    style={{ opacity: 0 }}
                  />
                  
                  {product.isPromo && product.discount && (
                    <div className={styles.discountBadge}>
                      -{product.discount}%
                    </div>
                  )}
                  
                  <div className={styles.newBadge}>
                    <FaGift /> Novo
                  </div>

                  <div className={styles.productActions}>
                    <button 
                      className={styles.actionButton} 
                      aria-label="Adicionar aos favoritos"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
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

        <div className={styles.seeMoreContainer}>
          <button className={styles.seeMoreButton} onClick={handleSeeMore}>
            Ver Mais Novidades
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewProductsCarousel;