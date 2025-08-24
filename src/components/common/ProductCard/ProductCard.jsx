import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Adicionar produto ao carrinho com configurações padrão
    const cartItem = {
      ...product,
      selectedSize: product.sizes?.[0] || null,
      selectedColor: product.colors?.[0] || null,
      quantity: 1
    };
    
    if (addToCart) {
      addToCart(cartItem);
    }
  };

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implementar lógica de favoritos
    console.log('Adicionar aos favoritos:', product);
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  // Obter primeira imagem do produto
  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    if (product.image) {
      return product.image;
    }
    // Imagem placeholder baseada na categoria
    const placeholders = {
      vestidos: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      blusas: 'https://images.unsplash.com/photo-1564257577-4b0b4e9a6d3f?w=400',
      calcas: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
      saias: 'https://images.unsplash.com/photo-1583846112692-f4b6b4c8c3c7?w=400',
      acessorios: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
    };
    return placeholders[product.category] || placeholders.vestidos;
  };

  // Calcular desconto
  const getDiscountPercentage = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return product.discount || null;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div className={`${styles.productCard} ${styles[viewMode]}`}>
      <Link to={`/product/${product.id}`} className={styles.productLink}>
        <div className={styles.productImage}>
          <img 
            src={getProductImage()} 
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400';
            }}
          />
          
          {discountPercentage && (
            <span className={styles.discountBadge}>
              -{discountPercentage}%
            </span>
          )}

          {!product.inStock && (
            <span className={styles.outOfStockBadge}>
              Esgotado
            </span>
          )}

          <div className={styles.productActions}>
            <button
              onClick={handleAddToFavorites}
              className={styles.actionBtn}
              title="Adicionar aos favoritos"
            >
              <FaHeart />
            </button>
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className={styles.actionBtn}
                title="Adicionar ao carrinho"
              >
                <FaShoppingCart />
              </button>
            )}
            <button
              onClick={handleViewDetails}
              className={styles.actionBtn}
              title="Ver detalhes"
            >
              <FaEye />
            </button>
          </div>
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          
          {viewMode === 'list' && product.description && (
            <p className={styles.productDescription}>
              {product.description.length > 100 
                ? `${product.description.substring(0, 100)}...`
                : product.description
              }
            </p>
          )}

          <div className={styles.productPrice}>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={styles.originalPrice}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className={styles.currentPrice}>
              {formatCurrency(product.price)}
            </span>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className={styles.productColors}>
              {product.colors.slice(0, 4).map((color, index) => (
                <span
                  key={index}
                  className={styles.colorDot}
                  style={{ backgroundColor: color }}
                  title={`Cor ${index + 1}`}
                />
              ))}
              {product.colors.length > 4 && (
                <span className={styles.moreColors}>
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.productSizes}>
              <span className={styles.sizesLabel}>Tamanhos:</span>
              <span className={styles.sizesText}>
                {product.sizes.slice(0, 3).join(', ')}
                {product.sizes.length > 3 && '...'}
              </span>
            </div>
          )}

          {product.featured && (
            <span className={styles.featuredBadge}>
              ⭐ Destaque
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;