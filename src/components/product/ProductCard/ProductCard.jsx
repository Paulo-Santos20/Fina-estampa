import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  // Função segura para formatar preço
  const formatPrice = useCallback((price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'R$ 0,00';
    }
    
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(numericPrice)) {
      return 'R$ 0,00';
    }
    
    return numericPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }, []);

  const renderStars = useCallback((rating) => {
    const stars = [];
    const safeRating = rating || 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={styles.starFilled} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className={styles.starHalf} />);
    }

    const emptyStars = 5 - Math.ceil(safeRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className={styles.starEmpty} />);
    }

    return stars;
  }, []);

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!addToCart) {
      console.error('❌ Função addToCart não disponível');
      return;
    }
    
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0] || 'Padrão';
    
    try {
      addToCart(product, defaultSize, defaultColor, 1);
    } catch (error) {
      console.error('❌ Erro ao adicionar produto:', error);
    }
  }, [product, addToCart]);

  const handleFavorite = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('❤️ Produto favoritado:', product.name);
  }, [product.name]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Verificar se o produto existe
  if (!product) {
    return (
      <div className={styles.productCard}>
        <div className={styles.errorState}>
          <p>Produto não encontrado</p>
        </div>
      </div>
    );
  }

  // Extrair preços de forma segura
  const originalPrice = product.originalPrice || product.price || 0;
  const salePrice = product.salePrice || 0;
  const regularPrice = product.price || 0;
  const isPromo = product.isPromo && salePrice > 0;

  // Fallback para imagem
  const fallbackImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgwIj7wn5GXPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjM0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNjAwIj5GaW5hIEVzdGFtcGE8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkM3NTdEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pgo8L3N2Zz4K";

  return (
    <div className={styles.productCard}>
      <Link to={`/produto/${product.id}`} className={styles.productLink}>
        <div className={styles.imageWrapper}>
          {/* Imagem principal ou fallback - SEM LOADING */}
          {!imageError ? (
            <img
              src={product.image || fallbackImage}
              alt={product.name || 'Produto'}
              className={styles.productImage}
              onError={handleImageError}
            />
          ) : (
            <div className={styles.imageFallback}>
              <div className={styles.fallbackIcon}>👗</div>
              <div className={styles.fallbackText}>
                <div className={styles.brandName}>Fina Estampa</div>
                <div className={styles.fallbackMessage}>Imagem não disponível</div>
              </div>
            </div>
          )}
          
          {/* Badges */}
          {isPromo && product.discount && (
            <div className={styles.discountBadge}>
              -{product.discount}%
            </div>
          )}
          {product.isNew && (
            <div className={styles.newBadge}>Novo</div>
          )}

          {/* Ações - SEMPRE VISÍVEIS */}
          <div className={styles.actions}>
            <button 
              className={styles.favoriteBtn}
              onClick={handleFavorite}
              aria-label={`Adicionar ${product.name || 'produto'} aos favoritos`}
              type="button"
              title="Adicionar aos favoritos"
            >
              <FaHeart />
            </button>
            <button 
              className={styles.cartBtn}
              onClick={handleAddToCart}
              aria-label={`Adicionar ${product.name || 'produto'} ao carrinho`}
              type="button"
              title="Adicionar ao carrinho"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productName}>
            {product.name || 'Produto sem nome'}
          </h3>
          
          {/* Informações adicionais */}
          {(product.brand || product.material) && (
            <div className={styles.productMeta}>
              {product.brand && (
                <span className={styles.brandName}>{product.brand}</span>
              )}
              {product.material && (
                <span className={styles.material}>{product.material}</span>
              )}
            </div>
          )}
          
          <div className={styles.rating}>
            <div className={styles.stars}>
              {renderStars(product.rating)}
            </div>
            <span className={styles.reviewCount}>
              ({product.reviews || product.reviewCount || 0})
            </span>
          </div>

          <div className={styles.pricing}>
            {isPromo ? (
              <>
                <span className={styles.originalPrice}>
                  {formatPrice(originalPrice)}
                </span>
                <div className={styles.priceWithCart}>
                  <span className={styles.salePrice}>
                    {formatPrice(salePrice)}
                  </span>
                  <button 
                    className={styles.priceCartBtn}
                    onClick={handleAddToCart}
                    aria-label={`Adicionar ${product.name || 'produto'} ao carrinho`}
                    type="button"
                    title="Adicionar ao carrinho"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.priceWithCart}>
                <span className={styles.regularPrice}>
                  {formatPrice(regularPrice)}
                </span>
                <button 
                  className={styles.priceCartBtn}
                  onClick={handleAddToCart}
                  aria-label={`Adicionar ${product.name || 'produto'} ao carrinho`}
                  type="button"
                  title="Adicionar ao carrinho"
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(ProductCard);