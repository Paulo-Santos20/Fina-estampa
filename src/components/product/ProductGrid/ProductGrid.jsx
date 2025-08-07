import React, { useState, useMemo, useEffect } from 'react'; // Adicione useEffect aqui
import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext'; // Importa o hook useCart
import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaStar,
  FaFire,
  FaTag,
  FaPlus,
  FaMinus // Mantive o FaMinus caso use para controle de quantidade
} from 'react-icons/fa';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, viewMode = 'grid' }) => {
  // Destrutura as funções do useCart. Se isInCart for undefined aqui,
  // significa que CartContext.js não está retornando-a ou o provedor não está no lugar.
  const { addToCart, isInCart, getCartItem } = useCart();
  const [favorites, setFavorites] = useState(new Set());
  const [loadingStates, setLoadingStates] = useState({});

  // Gerenciar favoritos
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      // Salvar no localStorage
      localStorage.setItem('finaEstampaFavorites', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  // Carregar favoritos do localStorage (useEffect para rodar uma vez)
  useEffect(() => {
    const savedFavorites = localStorage.getItem('finaEstampaFavorites');
    if (savedFavorites) {
      try {
        const favoritesArray = JSON.parse(savedFavorites);
        setFavorites(new Set(favoritesArray));
      } catch (error) {
        console.error('Erro ao carregar favoritos do localStorage:', error);
      }
    }
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

  // Adicionar ao carrinho com loading
  const handleAddToCart = async (product) => {
    setLoadingStates(prev => ({ ...prev, [product.id]: true }));

    try {
      // Chamada a addToCart do contexto. O CartContext agora retorna true em caso de sucesso.
      const success = addToCart(product);
      if (success) {
        // Feedback visual de sucesso
        setTimeout(() => {
          setLoadingStates(prev => ({ ...prev, [product.id]: false }));
        }, 800);
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    }
  };

  // Calcular desconto percentual
  const getDiscountPercentage = (originalPrice, salePrice) => {
    if (!salePrice || originalPrice <= 0) return 0; // Evita divisão por zero
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  // Renderizar estrelas de avaliação (simulado)
  const renderStars = (rating = 0) => { // Default para 0 caso não haja rating
    const stars = [];
    const normalizedRating = Math.max(0, Math.min(5, rating)); // Garante que o rating esteja entre 0 e 5
    const fullStars = Math.floor(normalizedRating);
    const hasHalfStar = normalizedRating % 1 !== 0 && normalizedRating % 1 >= 0.5; // Half star se >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={styles.starFilled} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className={styles.starHalf} />);
    }

    // Calcula estrelas vazias com base no número total de estrelas (5)
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i + fullStars + (hasHalfStar ? 1 : 0)}`} className={styles.starEmpty} />);
    }

    return stars;
  };

  // Componente do produto em modo grid
  const ProductCardGrid = ({ product }) => {
    const isInFavorites = favorites.has(product.id);
    // Chamada isInCart(product.id) - aqui o erro ocorre se isInCart não for uma função.
    // Isso é verificado pelo ProductGrid ao desestruturar useCart().
    const isInCartCheck = isInCart(product.id);
    const cartItem = getCartItem(product.id); // Pega o item para mostrar a quantidade
    const isLoading = loadingStates[product.id];
    const discountPercentage = getDiscountPercentage(product.price, product.salePrice);

    return (
      <div className={styles.productCard}>
        {/* Badges */}
        <div className={styles.badges}>
          {product.isNew && (
            <span className={styles.badgeNew}>
              <FaStar /> Novo
            </span>
          )}
          {product.isPromo && discountPercentage > 0 && (
            <span className={styles.badgeDiscount}>
              <FaFire /> -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Imagem do produto */}
        <div className={styles.imageContainer}>
          <Link to={`/product/${product.id}`} className={styles.imageLink}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgwIj7wn5GXPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNjAwIj5GaW5hIEVzdGFtcGE8L3RleHQ+Cjwvc3ZnPgo=";
              }}
            />
          </Link>

          {/* Overlay com ações */}
          <div className={styles.overlay}>
            <div className={styles.quickActions}>
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`${styles.actionButton} ${isInFavorites ? styles.favorited : ''}`}
                title={isInFavorites ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <FaHeart />
              </button>

              <Link
                to={`/product/${product.id}`}
                className={styles.actionButton}
                title="Ver detalhes"
              >
                <FaEye />
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={isLoading}
                className={`${styles.actionButton} ${isInCartCheck ? styles.inCart : ''}`}
                title={isInCartCheck ? 'No carrinho' : 'Adicionar ao carrinho'}
              >
                {isLoading ? (
                  <div className={styles.loadingSpinner}></div>
                ) : isInCartCheck ? (
                  <FaShoppingCart />
                ) : (
                  <FaPlus />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Informações do produto */}
        <div className={styles.productInfo}>
          <div className={styles.category}>
            <FaTag className={styles.categoryIcon} />
            {product.category}
          </div>

          <h3 className={styles.productName}>
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Avaliação */}
          <div className={styles.rating}>
            <div className={styles.stars}>
              {renderStars(product.rating || 0)} {/* Passa o rating do produto */}
            </div>
            <span className={styles.ratingText}>({product.rating?.toFixed(1) || '0.0'})</span> {/* Mostra o rating */}
          </div>

          {/* Preços */}
          <div className={styles.pricing}>
            {product.salePrice ? (
              <>
                <span className={styles.originalPrice}>
                  R\$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className={styles.salePrice}>
                  R\$ {product.salePrice.toFixed(2).replace('.', ',')}
                </span>
              </>
            ) : (
              <span className={styles.price}>
                R\$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {/* Tamanhos disponíveis */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.sizes}>
              <span className={styles.sizesLabel}>Tamanhos:</span>
              <div className={styles.sizesList}>
                {product.sizes.slice(0, 4).map(size => (
                  <span key={size} className={styles.sizeItem}>{size}</span>
                ))}
                {product.sizes.length > 4 && (
                  <span className={styles.sizeMore}>+{product.sizes.length - 4}</span>
                )}
              </div>
            </div>
          )}

          {/* Quantidade no carrinho */}
          {isInCartCheck && cartItem && (
            <div className={styles.cartQuantity}>
              <FaShoppingCart className={styles.cartIcon} />
              <span>{cartItem.quantity} no carrinho</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Componente do produto em modo lista
  const ProductCardList = ({ product }) => {
    const isInFavorites = favorites.has(product.id);
    const isInCartCheck = isInCart(product.id);
    const cartItem = getCartItem(product.id);
    const isLoading = loadingStates[product.id];
    const discountPercentage = getDiscountPercentage(product.price, product.salePrice);

    return (
      <div className={styles.productCardList}>
        {/* Imagem */}
        <div className={styles.listImageContainer}>
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.listImage}
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI0MCI+8J+RlzwvdGV4dD4KPHRleHQgeD0iNzUiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNjAwIj5GaW5hIEVzdGFtcGE8L2d0ZXh0Pgo8L3N2Zz4=";
              }}
            />
          </Link>

          {/* Badges */}
          <div className={styles.listBadges}>
            {product.isNew && (
              <span className={styles.badgeNew}>Novo</span>
            )}
            {product.isPromo && discountPercentage > 0 && (
              <span className={styles.badgeDiscount}>-{discountPercentage}%</span>
            )}
          </div>
        </div>

        {/* Informações */}
        <div className={styles.listInfo}>
          <div className={styles.listHeader}>
            <div className={styles.listCategory}>
              <FaTag className={styles.categoryIcon} />
              {product.category}
            </div>

            <h3 className={styles.listProductName}>
              <Link to={`/product/${product.id}`}>
                {product.name}
              </Link>
            </h3>

            {/* Avaliação */}
            <div className={styles.rating}>
              <div className={styles.stars}>
                {renderStars(product.rating || 0)}
              </div>
              <span className={styles.ratingText}>({product.rating?.toFixed(1) || '0.0'}) • {product.reviewCount || 0} avaliações</span>
            </div>
          </div>

          {/* Descrição */}
          {product.description && (
            <p className={styles.listDescription}>
              {product.description.length > 150
                ? `${product.description.substring(0, 150)}...`
                : product.description
              }
            </p>
          )}

          {/* Detalhes */}
          <div className={styles.listDetails}>
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.listSizes}>
                <span className={styles.detailLabel}>Tamanhos:</span>
                <span className={styles.detailValue}>
                  {product.sizes.join(', ')}
                </span>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className={styles.listColors}>
                <span className={styles.detailLabel}>Cores:</span>
                <span className={styles.detailValue}>
                  {product.colors.slice(0, 3).join(', ')}
                  {product.colors.length > 3 && ` +${product.colors.length - 3}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className={styles.listActions}>
          {/* Preços */}
          <div className={styles.listPricing}>
            {product.salePrice ? (
              <>
                <span className={styles.originalPrice}>
                  R\$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className={styles.salePrice}>
                  R\$ {product.salePrice.toFixed(2).replace('.', ',')}
                </span>
              </>
            ) : (
              <span className={styles.price}>
                R\$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {/* Quantidade no carrinho */}
          {isInCartCheck && cartItem && (
            <div className={styles.cartQuantity}>
              <FaShoppingCart className={styles.cartIcon} />
              <span>{cartItem.quantity} no carrinho</span>
            </div>
          )}

          {/* Botões de ação */}
          <div className={styles.listActionButtons}>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`${styles.listActionButton} ${isInFavorites ? styles.favorited : ''}`}
              title={isInFavorites ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <FaHeart />
            </button>

            <Link
              to={`/product/${product.id}`}
              className={styles.listActionButton}
              title="Ver detalhes"
            >
              <FaEye />
            </Link>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={isLoading}
              className={`${styles.listActionButton} ${styles.addToCartButton} ${isInCartCheck ? styles.inCart : ''}`}
              title={isInCartCheck ? 'No carrinho' : 'Adicionar ao carrinho'}
            >
              {isLoading ? (
                <div className={styles.loadingSpinner}></div>
              ) : (
                <>
                  <FaShoppingCart />
                  <span>{isInCartCheck ? 'No Carrinho' : 'Adicionar'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar produtos com base no modo de visualização
  const renderProducts = () => {
    if (!products || products.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>��️</div>
          <h3>Nenhum produto encontrado</h3>
          <p>Tente ajustar os filtros ou buscar por outros termos.</p>
        </div>
      );
    }

    if (viewMode === 'list') {
      return (
        <div className={styles.listContainer}>
          {products.map(product => (
            <ProductCardList key={product.id} product={product} />
          ))}
        </div>
      );
    }

    return (
      <div className={styles.gridContainer}>
        {products.map(product => (
          <ProductCardGrid key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className={`${styles.productGrid} ${styles[`viewMode${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}`]}`}>
      {renderProducts()}
    </div>
  );
};

export default ProductGrid;