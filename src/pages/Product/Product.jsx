import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaShare,
  FaStar,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
  FaExpand
} from 'react-icons/fa';
import Layout from '../../components/common/Layout/Layout.jsx';
import ProductCarousel from '../../components/product/ProductCarousel/ProductCarousel.jsx';
import { useCart } from '../../contexts/CartContext.jsx';
import { allProducts, featuredProducts } from '../../data/products.js';
import styles from './Product.module.css';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Estados do produto
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);

  // Buscar produto por ID
  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes?.[0] || '');
      setSelectedColor(foundProduct.colors?.[0] || '');
      
      // Simular múltiplas imagens (usando a mesma imagem como exemplo)
      const productImages = [
        foundProduct.image,
        foundProduct.image,
        foundProduct.image,
        foundProduct.image
      ];
      setProduct({...foundProduct, images: productImages});
    }
    setIsLoading(false);
  }, [id]);

  // Produtos relacionados
  const relatedProducts = featuredProducts.filter(p => 
    p.id !== parseInt(id) && p.category === product?.category
  ).slice(0, 4);

  // Funções de manipulação
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor, selecione o tamanho e a cor');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    
    // Feedback visual
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor, selecione o tamanho e a cor');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    
    // Redirecionar para WhatsApp
    const message = `Olá! Gostaria de comprar:\n\n${product.name}\nTamanho: ${selectedSize}\nCor: ${selectedColor}\nQuantidade: ${quantity}\nPreço: ${formatPrice(product.salePrice || product.price)}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando produto...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className={styles.notFound}>
          <h1>Produto não encontrado</h1>
          <p>O produto que você está procurando não existe ou foi removido.</p>
          <Link to="/" className={styles.backButton}>
            <FaArrowLeft /> Voltar à loja
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.productPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className={styles.container}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={`/categoria/${product.category}`}>{product.category}</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </div>

        {/* Produto Principal */}
        <div className={styles.productMain}>
          <div className={styles.container}>
            <div className={styles.productGrid}>
              {/* Galeria de Imagens */}
              <div className={styles.productGallery}>
                <div className={styles.mainImageWrapper}>
                  <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.name}
                    className={styles.mainImage}
                    onClick={() => setIsImageModalOpen(true)}
                  />
                  
                  {/* Badges */}
                  {product.isPromo && (
                    <div className={styles.discountBadge}>
                      -{product.discount}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className={styles.newBadge}>Novo</div>
                  )}
                  
                  {/* Navegação da galeria */}
                  {product.images.length > 1 && (
                    <>
                      <button 
                        className={`${styles.galleryNav} ${styles.prevBtn}`}
                        onClick={prevImage}
                      >
                        <FaChevronLeft />
                      </button>
                      <button 
                        className={`${styles.galleryNav} ${styles.nextBtn}`}
                        onClick={nextImage}
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                  
                  {/* Botão de expandir */}
                  <button 
                    className={styles.expandBtn}
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    <FaExpand />
                  </button>
                </div>
                
                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className={styles.thumbnails}>
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`${styles.thumbnail} ${
                          index === currentImageIndex ? styles.active : ''
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={image} alt={`${product.name} ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Informações do Produto */}
              <div className={styles.productInfo}>
                <div className={styles.productHeader}>
                  <h1 className={styles.productTitle}>{product.name}</h1>
                  
                  <div className={styles.productActions}>
                    <button 
                      className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <FaHeart />
                    </button>
                    <button className={styles.shareBtn}>
                      <FaShare />
                    </button>
                  </div>
                </div>

                {/* Avaliações */}
                <div className={styles.productRating}>
                  <div className={styles.stars}>
                    {renderStars(product.rating || 4.5)}
                  </div>
                  <span className={styles.ratingText}>
                    {product.rating || 4.5} ({product.reviews || 127} avaliações)
                  </span>
                </div>

                {/* Preços */}
                <div className={styles.productPricing}>
                  {product.salePrice ? (
                    <>
                      <span className={styles.originalPrice}>
                        {formatPrice(product.price)}
                      </span>
                      <span className={styles.salePrice}>
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className={styles.savings}>
                        Economize {formatPrice(product.price - product.salePrice)}
                      </span>
                    </>
                  ) : (
                    <span className={styles.regularPrice}>
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Seleção de Tamanho */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className={styles.sizeSelection}>
                    <h3>Tamanho:</h3>
                    <div className={styles.sizeOptions}>
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          className={`${styles.sizeOption} ${
                            selectedSize === size ? styles.selected : ''
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seleção de Cor */}
                {product.colors && product.colors.length > 0 && (
                  <div className={styles.colorSelection}>
                    <h3>Cor: <span>{selectedColor}</span></h3>
                    <div className={styles.colorOptions}>
                      {product.colors.map(color => (
                        <button
                          key={color}
                          className={`${styles.colorOption} ${
                            selectedColor === color ? styles.selected : ''
                          }`}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                        >
                          <span className={styles.colorSwatch} style={{
                            backgroundColor: color === 'Preto' ? '#000' :
                                           color === 'Branco' ? '#fff' :
                                           color === 'Azul' ? '#0066cc' :
                                           color === 'Rosa' ? '#ff69b4' :
                                           color === 'Vinho' ? '#722F37' :
                                           color === 'Bege' ? '#f5f5dc' :
                                           color === 'Cinza' ? '#808080' :
                                           color === 'Verde' ? '#008000' :
                                           color === 'Marinho' ? '#000080' :
                                           color === 'Camel' ? '#c19a6b' : '#ccc'
                          }}></span>
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantidade */}
                <div className={styles.quantitySelection}>
                  <h3>Quantidade:</h3>
                  <div className={styles.quantityControls}>
                    <button 
                      className={styles.quantityBtn}
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button 
                      className={styles.quantityBtn}
                      onClick={() => handleQuantityChange('increase')}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className={styles.actionButtons}>
                  <button 
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart />
                    Adicionar ao Carrinho
                  </button>
                  <button 
                    className={styles.buyNowBtn}
                    onClick={handleBuyNow}
                  >
                    <FaWhatsapp />
                    Comprar Agora
                  </button>
                </div>

                {/* Garantias e Benefícios */}
                <div className={styles.benefits}>
                  <div className={styles.benefit}>
                    <FaTruck />
                    <span>Frete grátis acima de R\$ 199</span>
                  </div>
                  <div className={styles.benefit}>
                    <FaShieldAlt />
                    <span>Garantia de qualidade</span>
                  </div>
                  <div className={styles.benefit}>
                    <FaExchangeAlt />
                    <span>Troca fácil em 30 dias</span>
                  </div>
                  <div className={styles.benefit}>
                    <FaCheck />
                    <span>Produto original</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Informações */}
        <div className={styles.productTabs}>
          <div className={styles.container}>
            <div className={styles.tabHeaders}>
              <button 
                className={`${styles.tabHeader} ${activeTab === 'description' ? styles.active : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Descrição
              </button>
              <button 
                className={`${styles.tabHeader} ${activeTab === 'details' ? styles.active : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Detalhes
              </button>
              <button 
                className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.active : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Avaliações ({product.reviews || 127})
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <div className={styles.description}>
                  <h3>Sobre este produto</h3>
                  <p>
                    {product.name} é uma peça exclusiva da coleção Fina Estampa, 
                    desenvolvida com materiais de alta qualidade e design sofisticado. 
                    Perfeita para mulheres que valorizam elegância e conforto em todas as ocasiões.
                  </p>
                  <ul>
                    <li>Tecido de alta qualidade</li>
                    <li>Corte moderno e elegante</li>
                    <li>Conforto garantido</li>
                    <li>Fácil manutenção</li>
                    <li>Design exclusivo</li>
                  </ul>
                </div>
              )}

              {activeTab === 'details' && (
                <div className={styles.details}>
                  <h3>Especificações</h3>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <strong>Categoria:</strong>
                      <span>{product.category}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Tamanhos disponíveis:</strong>
                      <span>{product.sizes?.join(', ') || 'Único'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Cores disponíveis:</strong>
                      <span>{product.colors?.join(', ') || 'Conforme imagem'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Material:</strong>
                      <span>Tecido premium</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Cuidados:</strong>
                      <span>Lavar à mão ou máquina (ciclo delicado)</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Origem:</strong>
                      <span>Nacional</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className={styles.reviews}>
                  <h3>Avaliações dos clientes</h3>
                  <div className={styles.reviewsSummary}>
                    <div className={styles.averageRating}>
                      <span className={styles.ratingNumber}>{product.rating || 4.5}</span>
                      <div className={styles.stars}>
                        {renderStars(product.rating || 4.5)}
                      </div>
                      <span>Baseado em {product.reviews || 127} avaliações</span>
                    </div>
                  </div>
                  
                  <div className={styles.reviewsList}>
                    {/* Exemplo de avaliações */}
                    <div className={styles.review}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.stars}>
                          {renderStars(5)}
                        </div>
                        <span className={styles.reviewDate}>15/03/2024</span>
                      </div>
                      <h4>Excelente qualidade!</h4>
                      <p>Produto de ótima qualidade, tecido macio e caimento perfeito. Recomendo!</p>
                      <span className={styles.reviewer}>- Maria S.</span>
                    </div>
                    
                    <div className={styles.review}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.stars}>
                          {renderStars(4)}
                        </div>
                        <span className={styles.reviewDate}>10/03/2024</span>
                      </div>
                      <h4>Muito bonito</h4>
                      <p>Adorei o modelo, muito elegante. O tamanho veio certinho.</p>
                      <span className={styles.reviewer}>- Ana P.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <ProductCarousel 
            products={relatedProducts}
            title="Produtos Relacionados"
            subtitle="Você também pode gostar"
          />
        )}

        {/* Modal de Imagem */}
        {isImageModalOpen && (
          <div className={styles.imageModal} onClick={() => setIsImageModalOpen(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button 
                className={styles.closeModal}
                onClick={() => setIsImageModalOpen(false)}
              >
                ×
              </button>
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className={styles.modalImage}
              />
              {product.images.length > 1 && (
                <>
                  <button 
                    className={`${styles.modalNav} ${styles.modalPrev}`}
                    onClick={prevImage}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    className={`${styles.modalNav} ${styles.modalNext}`}
                    onClick={nextImage}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Product;