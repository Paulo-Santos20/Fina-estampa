import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaRegHeart, 
  FaShoppingCart, 
  FaStar, 
  FaEye,
  FaTag,
  FaFire,
  FaGift
} from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, viewMode = 'grid', showQuickView = true }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Calcular desconto
  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  // Preço atual
  const currentPrice = product.salePrice || product.price;

  // Verificar se produto é novo (últimos 30 dias)
  const isNew = product.isNew || false;

  // Gerar estrelas de avaliação
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

  // Adicionar aos favoritos
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    // Aqui você pode adicionar lógica para salvar no localStorage ou API
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(product.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  // Adicionar ao carrinho
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Verificar se tamanho foi selecionado (obrigatório para roupas)
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setShowSizeSelector(true);
      return;
    }

    setIsAddingToCart(true);

    try {
      const cartItem = {
        ...product,
        selectedSize: selectedSize || product.sizes?.[0] || 'Único',
        selectedColor: selectedColor || product.colors?.[0] || 'Padrão',
        quantity: 1
      };

      await addToCart(cartItem);
      
      // Feedback visual de sucesso
      setTimeout(() => {
        setIsAddingToCart(false);
        setShowSizeSelector(false);
      }, 1000);

    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setIsAddingToCart(false);
    }
  };

  // Seletor rápido de tamanho
  const renderQuickSizeSelector = () => {
    if (!showSizeSelector || !product.sizes) return null;

    return (
      <div className={styles.quickSizeSelector}>
        <div className={styles.sizeOptions}>
          <span className={styles.sizeLabel}>Tamanho:</span>
          {product.sizes.map(size => (
            <button
              key={size}
              className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedSize(size);
              }}
            >
              {size}
            </button>
          ))}
        </div>
        <button
          className={styles.confirmAddToCart}
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  };

  // Placeholder para imagem com erro
  const renderImagePlaceholder = () => (
    <div className={styles.imagePlaceholder}>
      <div className={styles.placeholderIcon}>👗</div>
      <span className={styles.placeholderText}>{product.name}</span>
    </div>
  );

  // Renderização em modo lista
  if (viewMode === 'list') {
    return (
      <div className={`${styles.productCard} ${styles.listView}`}>
        <Link to={`/produto/${product.id}`} className={styles.productLink}>
          {/* Imagem do produto */}
          <div className={styles.productImageContainer}>
            {imageError ? (
              renderImagePlaceholder()
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            )}

            {/* Badges */}
            <div className={styles.productBadges}>
              {isNew && (
                <span className={`${styles.badge} ${styles.newBadge}`}>
                  <FaFire />
                  Novo
                </span>
              )}
              {product.isPromo && (
                <span className={`${styles.badge} ${styles.promoBadge}`}>
                  <FaTag />
                  -{discountPercentage}%
                </span>
              )}
              {!product.inStock && (
                <span className={`${styles.badge} ${styles.outOfStockBadge}`}>
                  Esgotado
                </span>
              )}
            </div>
          </div>

          {/* Informações do produto */}
          <div className={styles.productInfo}>
            <div className={styles.productDetails}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              
              {/* Avaliação */}
              {product.rating && (
                <div className={styles.productRating}>
                  <div className={styles.stars}>
                    {renderStars(product.rating)}
                  </div>
                  <span className={styles.ratingText}>
                    ({product.reviewCount || 0} avaliações)
                  </span>
                </div>
              )}

              {/* Tamanhos disponíveis */}
              {product.sizes && (
                <div className={styles.availableSizes}>
                  <span>Tamanhos: {product.sizes.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Preços e ações */}
            <div className={styles.productActions}>
              <div className={styles.priceContainer}>
                {product.salePrice ? (
                  <>
                    <span className={styles.originalPrice}>
                      R\$ {product.price.toFixed(2)}
                    </span>
                    <span className={styles.salePrice}>
                      R\$ {product.salePrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className={styles.regularPrice}>
                    R\$ {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className={styles.actionButtons}>
                <button
                  className={styles.favoriteButton}
                  onClick={toggleFavorite}
                  aria-label="Adicionar aos favoritos"
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>

                <button
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                >
                  {isAddingToCart ? (
                    <div className={styles.loading}>
                      <div className={styles.spinner}></div>
                    </div>
                  ) : (
                    <>
                      <FaShoppingCart />
                      {product.inStock ? 'Adicionar' : 'Indisponível'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* Seletor de tamanho rápido */}
        {renderQuickSizeSelector()}
      </div>
    );
  }

  // Renderização em modo grid (padrão)
  return (
    <div className={`${styles.productCard} ${styles.gridView}`}>
      <Link to={`/produto/${product.id}`} className={styles.productLink}>
        {/* Container da imagem */}
        <div className={styles.productImageContainer}>
          {imageError ? (
            renderImagePlaceholder()
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}

          {/* Overlay com ações rápidas */}
          <div className={styles.productOverlay}>
            <div className={styles.quickActions}>
              {showQuickView && (
                <button
                  className={styles.quickViewButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Implementar quick view modal
                  }}
                  aria-label="Visualização rápida"
                >
                  <FaEye />
                </button>
              )}
              
              <button
                className={styles.favoriteButton}
                onClick={toggleFavorite}
                aria-label="Adicionar aos favoritos"
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
            >
              {isAddingToCart ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  Adicionando...
                </div>
              ) : (
                <>
                  <FaShoppingCart />
                  {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
                </>
              )}
            </button>
          </div>

          {/* Badges */}
          <div className={styles.productBadges}>
            {isNew && (
              <span className={`${styles.badge} ${styles.newBadge}`}>
                <FaFire />
                Novo
              </span>
            )}
            {product.isPromo && (
              <span className={`${styles.badge} ${styles.promoBadge}`}>
                <FaTag />
                -{discountPercentage}%
              </span>
            )}
            {product.freeShipping && (
              <span className={`${styles.badge} ${styles.shippingBadge}`}>
                <FaGift />
                Frete Grátis
              </span>
            )}
            {!product.inStock && (
              <span className={`${styles.badge} ${styles.outOfStockBadge}`}>
                Esgotado
              </span>
            )}
          </div>
        </div>

        {/* Informações do produto */}
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          
          {/* Avaliação */}
          {product.rating && (
            <div className={styles.productRating}>
              <div className={styles.stars}>
                {renderStars(product.rating)}
              </div>
              <span className={styles.ratingText}>
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Preços */}
          <div className={styles.priceContainer}>
            {product.salePrice ? (
              <>
                <span className={styles.originalPrice}>
                  R\$ {product.price.toFixed(2)}
                </span>
                <span className={styles.salePrice}>
                  R\$ {product.salePrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className={styles.regularPrice}>
                R\$ {product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Cores disponíveis */}
          {product.colors && product.colors.length > 1 && (
            <div className={styles.colorOptions}>
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: getColorCode(color) }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className={styles.moreColors}>
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Seletor de tamanho rápido */}
      {renderQuickSizeSelector()}
    </div>
  );
};

// Função auxiliar para converter nome da cor em código
const getColorCode = (colorName) => {
  const colorMap = {
    'Preto': '#000000',
    'Branco': '#FFFFFF',
    'Azul': '#0066CC',
    'Rosa': '#FF69B4',
    'Vinho': '#722F37',
    'Bege': '#F5F5DC',
    'Verde': '#228B22',
    'Amarelo': '#FFD700',
    'Cinza': '#808080',
    'Marrom': '#8B4513',
    'Roxo': '#800080',
    'Laranja': '#FF8C00'
  };
  
  return colorMap[colorName] || '#CCCCCC';
};

export default ProductCard;