// src/components/ProductGrid/ProductGrid.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductGrid.module.css';

// Ícones SVG
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <rect x="3" y="4" width="2" height="2"/>
    <rect x="3" y="10" width="2" height="2"/>
    <rect x="3" y="16" width="2" height="2"/>
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

// Função para obter a melhor imagem disponível
const getProductImage = (product) => {
  // Prioridade: images[0] > image > placeholder
  if (product?.images && Array.isArray(product.images) && product.images[0]) {
    return product.images[0];
  }
  
  if (product?.image) {
    return product.image;
  }
  
  // Placeholder como fallback
  return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop';
};

// Componente do card de produto
const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addItem, cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Verificar se o produto está no carrinho
  const isInCart = useMemo(() => {
    if (!cart || !Array.isArray(cart) || !product?.id) return false;
    return cart.some(item => item.id === product.id);
  }, [cart, product?.id]);

  // Dados do produto com fallbacks
  const productData = {
    id: product?.id || '',
    name: product?.name || product?.title || 'Produto sem nome',
    price: Number(product?.price) || 0,
    originalPrice: Number(product?.originalPrice) || null,
    category: product?.category || '',
    isNew: product?.isNew || false,
    isPromo: product?.isPromo || false,
    discount: product?.discount || null,
    rating: product?.rating || 0,
    reviews: product?.reviews || 0,
    sizes: product?.sizes || ['P', 'M', 'G'],
    colors: product?.colors || []
  };

  // Imagem com fallback
  const productImage = useMemo(() => {
    if (imageError) {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop';
    }
    return getProductImage(product);
  }, [product, imageError]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading || !productData.id) return;
    
    setIsLoading(true);
    try {
      await addItem(productData, 1);
      console.log('Produto adicionado ao carrinho:', productData.name);
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = () => {
    if (productData.id) {
      navigate(`/product/${productData.id}`);
    }
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    console.log('Erro ao carregar imagem:', productImage);
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const discountPercentage = productData.originalPrice && productData.price < productData.originalPrice
    ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
    : null;

  if (viewMode === 'list') {
    return (
      <div className={styles.productCardList} onClick={handleProductClick}>
        <div className={styles.productImageList}>
          <img
            src={productImage}
            alt={productData.name}
            loading="lazy"
            onError={handleImageError}
            onLoad={() => setImageError(false)}
          />
          {productData.isNew && <span className={styles.badgeNew}>Novo</span>}
          {discountPercentage && <span className={styles.badgeDiscount}>-{discountPercentage}%</span>}
        </div>
        
        <div className={styles.productInfoList}>
          <div className={styles.productHeader}>
            <h3 className={styles.productName}>{productData.name}</h3>
            <button
              className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={handleToggleFavorite}
              aria-label="Adicionar aos favoritos"
            >
              <HeartIcon filled={isFavorite} />
            </button>
          </div>
          
          <p className={styles.productCategory}>{productData.category}</p>
          
          <div className={styles.productPricing}>
            <span className={styles.currentPrice}>{formatPrice(productData.price)}</span>
            {productData.originalPrice && productData.originalPrice > productData.price && (
              <span className={styles.originalPrice}>{formatPrice(productData.originalPrice)}</span>
            )}
          </div>
          
          <div className={styles.productMeta}>
            {productData.rating > 0 && (
              <div className={styles.rating}>
                <span className={styles.stars}>{'★'.repeat(Math.floor(productData.rating))}</span>
                <span className={styles.ratingText}>({productData.reviews})</span>
              </div>
            )}
            
            {productData.sizes.length > 0 && (
              <div className={styles.sizes}>
                <span>Tamanhos: {productData.sizes.join(', ')}</span>
              </div>
            )}
          </div>
          
          <button
            className={`${styles.addToCartBtn} ${isInCart ? styles.inCart : ''} ${isLoading ? styles.loading : ''}`}
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            <CartIcon />
            <span>
              {isLoading ? 'Adicionando...' : isInCart ? 'No Carrinho' : 'Adicionar'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productCard} onClick={handleProductClick}>
      <div className={styles.productImage}>
        <img
          src={productImage}
          alt={productData.name}
          loading="lazy"
          onError={handleImageError}
          onLoad={() => setImageError(false)}
        />
        
        <div className={styles.productBadges}>
          {productData.isNew && <span className={styles.badgeNew}>Novo</span>}
          {discountPercentage && <span className={styles.badgeDiscount}>-{discountPercentage}%</span>}
        </div>
        
        <div className={styles.productActions}>
          <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
            onClick={handleToggleFavorite}
            aria-label="Adicionar aos favoritos"
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>
        
        <div className={styles.productHover}>
          <button
            className={`${styles.addToCartBtn} ${isInCart ? styles.inCart : ''} ${isLoading ? styles.loading : ''}`}
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            <CartIcon />
            <span>
              {isLoading ? 'Adicionando...' : isInCart ? 'No Carrinho' : 'Adicionar'}
            </span>
          </button>
        </div>
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{productData.name}</h3>
        <p className={styles.productCategory}>{productData.category}</p>
        
        <div className={styles.productPricing}>
          <span className={styles.currentPrice}>{formatPrice(productData.price)}</span>
          {productData.originalPrice && productData.originalPrice > productData.price && (
            <span className={styles.originalPrice}>{formatPrice(productData.originalPrice)}</span>
          )}
        </div>
        
        {productData.rating > 0 && (
          <div className={styles.rating}>
            <span className={styles.stars}>{'★'.repeat(Math.floor(productData.rating))}</span>
            <span className={styles.ratingText}>({productData.reviews})</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal do grid
const ProductGrid = ({ 
  products = [], 
  loading = false, 
  error = null,
  viewMode = 'grid',
  onViewModeChange,
  showViewToggle = true,
  emptyMessage = 'Nenhum produto encontrado'
}) => {
  const [currentViewMode, setCurrentViewMode] = useState(viewMode);

  const handleViewModeChange = (mode) => {
    setCurrentViewMode(mode);
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  if (loading) {
    return (
      <div className={styles.productGrid}>
        {showViewToggle && (
          <div className={styles.gridHeader}>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${currentViewMode === 'grid' ? styles.active : ''}`}
                onClick={() => handleViewModeChange('grid')}
                aria-label="Visualização em grade"
              >
                <GridIcon />
              </button>
              <button
                className={`${styles.viewBtn} ${currentViewMode === 'list' ? styles.active : ''}`}
                onClick={() => handleViewModeChange('list')}
                aria-label="Visualização em lista"
              >
                <ListIcon />
              </button>
            </div>
          </div>
        )}
        
        <div className={`${styles.productsContainer} ${styles[currentViewMode]}`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.productSkeleton}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonCategory}></div>
                <div className={styles.skeletonPrice}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <h3>Erro ao carregar produtos</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryBtn}>
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Nenhum produto encontrado</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {showViewToggle && (
        <div className={styles.gridHeader}>
          <div className={styles.resultsCount}>
            {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </div>
          
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${currentViewMode === 'grid' ? styles.active : ''}`}
              onClick={() => handleViewModeChange('grid')}
              aria-label="Visualização em grade"
            >
              <GridIcon />
            </button>
            <button
              className={`${styles.viewBtn} ${currentViewMode === 'list' ? styles.active : ''}`}
              onClick={() => handleViewModeChange('list')}
              aria-label="Visualização em lista"
            >
              <ListIcon />
            </button>
          </div>
        </div>
      )}
      
      <div className={`${styles.productsContainer} ${styles[currentViewMode]}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id || Math.random()}
            product={product}
            viewMode={currentViewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;