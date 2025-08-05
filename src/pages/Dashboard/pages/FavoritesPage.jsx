import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { allProducts } from '../../../data/products';
import styles from '../Dashboard.module.css';

const FavoritesPage = ({ user, timeRange }) => {
  const favoriteProducts = allProducts.slice(0, 8); // Simular favoritos

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FaHeart className={styles.sectionIcon} />
          Meus Produtos Favoritos ({favoriteProducts.length})
        </h2>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {favoriteProducts.map((product) => (
          <div key={product.id} style={{
            background: 'var(--cinza-claro)',
            borderRadius: 'var(--radius-medium)',
            padding: '1rem',
            border: '1px solid rgba(114, 47, 55, 0.1)',
            transition: 'all var(--transition-normal)'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-medium)',
                marginBottom: '1rem'
              }}
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTA1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzIyRjM3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI2MDAiPvCfkZc8L3RleHQ+CjwvZz4KPC9zdmc+";
              }}
            />
            <h4 style={{ 
              margin: '0 0 0.5rem 0', 
              color: 'var(--preto-secundario)', 
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              {product.name}
            </h4>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              {product.salePrice ? (
                <div>
                  <span style={{ 
                    textDecoration: 'line-through', 
                    color: 'var(--cinza-medio)', 
                    fontSize: '0.9rem',
                    marginRight: '0.5rem'
                  }}>
                    R\$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span style={{ 
                    color: 'var(--wine-destaque)', 
                    fontWeight: '700', 
                    fontSize: '1.1rem' 
                  }}>
                    R\$ {product.salePrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ) : (
                <span style={{ 
                  color: 'var(--wine-destaque)', 
                  fontWeight: '700', 
                  fontSize: '1.1rem' 
                }}>
                  R\$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className={styles.quickActionButton} style={{ 
                flex: 1, 
                flexDirection: 'row', 
                gap: '0.5rem',
                padding: '0.8rem'
              }}>
                <FaShoppingCart />
                <span>Adicionar ao Carrinho</span>
              </button>
              <button style={{
                background: '#EF4444',
                border: 'none',
                color: 'white',
                padding: '0.8rem',
                borderRadius: 'var(--radius-medium)',
                cursor: 'pointer'
              }}>
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;