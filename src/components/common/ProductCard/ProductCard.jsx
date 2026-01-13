import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const context = useCart();
  const navigate = useNavigate();

  // Tenta pegar as funções com nomes variados para evitar erro
  const addToCartFunc = context.addToCart || context.addItem;
  const openCartFunc = context.openCart || context.openDrawer || context.setIsCartOpen;

  const formatCurrency = (value) => {
    if (!value && value !== 0) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // --- CORREÇÃO DO PREÇO (Converter String para Number) ---
    let safePrice = 0;
    if (typeof product.price === 'number') {
      safePrice = product.price;
    } else if (typeof product.price === 'string') {
      // Remove 'R$', espaços e troca vírgula por ponto
      safePrice = parseFloat(product.price.replace(/[^\d,.-]/g, '').replace(',', '.'));
    }

    // --- CORREÇÃO DO OBJETO (Garantir ID e Name) ---
    const cartItem = {
      id: product.id || product._id, // Garante que o ID existe
      name: product.name || product.title || 'Produto sem nome', // Garante nome
      image: product.image || product.images?.[0], // Garante imagem
      price: safePrice || 0, // Garante preço numérico
      selectedSize: product.sizes?.[0] || 'UN',
      selectedColor: product.colors?.[0] || 'Padrão',
      quantity: 1
    };
    
    // Debug para você ver no console o que está sendo enviado
    console.log('Adicionando ao carrinho:', cartItem);

    if (typeof addToCartFunc === 'function') {
      try {
        addToCartFunc(cartItem);
        // Abre o carrinho após adicionar (opcional)
        if (typeof openCartFunc === 'function') {
           // Se for setIsCartOpen (useState), passa true. Se for função, chama direto.
           openCartFunc(true); 
        }
      } catch (error) {
        console.error("Erro ao adicionar:", error);
      }
    } else {
      console.error("Função addToCart não encontrada no Contexto. Verifique o CartContext.");
    }
  };

  // Funções de navegação e favoritos
  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Helper de imagem
  const getProductImage = () => {
    if (product.images && product.images.length > 0) return product.images[0];
    if (product.image) return product.image;
    return 'https://via.placeholder.com/400x600?text=Sem+Imagem';
  };

  const discountPercentage = (product.originalPrice && product.originalPrice > product.price) 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <div className={`${styles.productCard} ${styles[viewMode]}`}>
      <Link to={`/product/${product.id}`} className={styles.productLink}>
        <div className={styles.productImage}>
          <img src={getProductImage()} alt={product.name} onError={(e) => e.target.src = 'https://via.placeholder.com/400'} />
          
          {discountPercentage && <span className={styles.discountBadge}>-{discountPercentage}%</span>}
          {!product.inStock && <span className={styles.outOfStockBadge}>Esgotado</span>}

          <div className={styles.productActions}>
            <button onClick={handleAddToFavorites} className={styles.actionBtn}><FaHeart /></button>
            {product.inStock && (
              <button onClick={handleAddToCart} className={styles.actionBtn}><FaShoppingCart /></button>
            )}
            <button onClick={handleViewDetails} className={styles.actionBtn}><FaEye /></button>
          </div>
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name || product.title}</h3>
          <div className={styles.productPrice}>
             {product.originalPrice && <span className={styles.originalPrice}>{formatCurrency(product.originalPrice)}</span>}
             <span className={styles.currentPrice}>{formatCurrency(product.price)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;