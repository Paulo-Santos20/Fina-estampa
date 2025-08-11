// src/pages/Admin/Content/components/ProductsSettingsPanel.jsx
import React, { useState } from 'react';
import { FaStar, FaGift, FaPercent, FaPlus, FaTrash, FaExchangeAlt } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function ProductsSettingsPanel({ settings, onChange, allProducts }) {
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalSection, setModalSection] = useState('');
  const [modalIndex, setModalIndex] = useState(0);

  const updateSettings = (section, updates) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        ...updates
      }
    });
  };

  const openProductModal = (section, index = 0) => {
    setModalSection(section);
    setModalIndex(index);
    setShowProductModal(true);
  };

  const selectProduct = (productId) => {
    if (modalSection === 'featured') {
      const products = [...settings.featured.products];
      products[modalIndex] = productId;
      updateSettings('featured', { products });
    } else if (modalSection === 'newArrivals') {
      const products = [...settings.newArrivals.products];
      products[modalIndex] = productId;
      updateSettings('newArrivals', { products });
    }
    setShowProductModal(false);
  };

  const getProductById = (id) => allProducts.find(p => p.id === id);

  const addFeaturedProduct = () => {
    if (settings.featured.products.length < 8) {
      updateSettings('featured', {
        products: [...settings.featured.products, allProducts[0]?.id || 'p1']
      });
    }
  };

  const removeFeaturedProduct = (index) => {
    const products = settings.featured.products.filter((_, i) => i !== index);
    updateSettings('featured', { products });
  };

  const addNewArrival = () => {
    if (settings.newArrivals.products.length < 8) {
      updateSettings('newArrivals', {
        products: [...settings.newArrivals.products, allProducts[0]?.id || 'p1']
      });
    }
  };

  const removeNewArrival = (index) => {
    const products = settings.newArrivals.products.filter((_, i) => i !== index);
    updateSettings('newArrivals', { products });
  };

  const updateOffer = (index, updates) => {
    const products = settings.offers.products.map((offer, i) =>
      i === index ? { ...offer, ...updates } : offer
    );
    updateSettings('offers', { products });
  };

  const addOffer = () => {
    const newOffer = {
      id: allProducts[0]?.id || 'p1',
      originalPrice: 100.00,
      salePrice: 80.00
    };
    updateSettings('offers', {
      products: [...settings.offers.products, newOffer]
    });
  };

  const removeOffer = (index) => {
    const products = settings.offers.products.filter((_, i) => i !== index);
    updateSettings('offers', { products });
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Configurações de Produtos</h2>
      
      {/* Produtos em Destaque */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.featured.enabled}
                onChange={(e) => updateSettings('featured', { enabled: e.target.checked })}
              />
              <FaStar /> Produtos em Destaque
            </label>
          </h3>
          {settings.featured.enabled && (
            <button onClick={addFeaturedProduct} className={styles.addBtn}>
              <FaPlus /> Adicionar Produto
            </button>
          )}
        </div>

        {settings.featured.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Título da Seção</label>
              <input
                type="text"
                value={settings.featured.title}
                onChange={(e) => updateSettings('featured', { title: e.target.value })}
                className={styles.input}
                placeholder="Produtos em Destaque"
              />
            </div>

            <div className={styles.productGrid}>
              {settings.featured.products.map((productId, index) => {
                const product = getProductById(productId);
                return (
                  <div key={index} className={styles.productCard}>
                    <div className={styles.productImage}>
                      <img src={product?.image || 'https://via.placeholder.com/200'} alt={product?.name || 'Produto'} />
                      <button
                        onClick={() => openProductModal('featured', index)}
                        className={styles.changeProductBtn}
                      >
                        <FaExchangeAlt />
                      </button>
                    </div>
                    <div className={styles.productInfo}>
                      <h4>{product?.name || 'Produto não encontrado'}</h4>
                      <p>R$ {product?.price?.toFixed(2).replace('.', ',') || '0,00'}</p>
                    </div>
                    <button
                      onClick={() => removeFeaturedProduct(index)}
                      className={styles.deleteBtn}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Novidades */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.newArrivals.enabled}
                onChange={(e) => updateSettings('newArrivals', { enabled: e.target.checked })}
              />
              <FaGift /> Novidades
            </label>
          </h3>
          {settings.newArrivals.enabled && (
            <button onClick={addNewArrival} className={styles.addBtn}>
              <FaPlus /> Adicionar Produto
            </button>
          )}
        </div>

        {settings.newArrivals.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Título da Seção</label>
              <input
                type="text"
                value={settings.newArrivals.title}
                onChange={(e) => updateSettings('newArrivals', { title: e.target.value })}
                className={styles.input}
                placeholder="Novidades"
              />
            </div>

            <div className={styles.productGrid}>
              {settings.newArrivals.products.map((productId, index) => {
                const product = getProductById(productId);
                return (
                  <div key={index} className={styles.productCard}>
                    <div className={styles.productImage}>
                      <img src={product?.image || 'https://via.placeholder.com/200'} alt={product?.name || 'Produto'} />
                      <button
                        onClick={() => openProductModal('newArrivals', index)}
                        className={styles.changeProductBtn}
                      >
                        <FaExchangeAlt />
                      </button>
                    </div>
                    <div className={styles.productInfo}>
                      <h4>{product?.name || 'Produto não encontrado'}</h4>
                      <p>R$ {product?.price?.toFixed(2).replace('.', ',') || '0,00'}</p>
                    </div>
                    <button
                      onClick={() => removeNewArrival(index)}
                      className={styles.deleteBtn}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Ofertas Especiais */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.offers.enabled}
                onChange={(e) => updateSettings('offers', { enabled: e.target.checked })}
              />
              <FaPercent /> Ofertas Especiais
            </label>
          </h3>
          {settings.offers.enabled && (
            <button onClick={addOffer} className={styles.addBtn}>
              <FaPlus /> Adicionar Oferta
            </button>
          )}
        </div>

        {settings.offers.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Título da Seção</label>
              <input
                type="text"
                value={settings.offers.title}
                onChange={(e) => updateSettings('offers', { title: e.target.value })}
                className={styles.input}
                placeholder="Ofertas Especiais"
              />
            </div>

            <div className={styles.offersList}>
              {settings.offers.products.map((offer, index) => {
                const product = getProductById(offer.id);
                const discount = Math.round((1 - (offer.salePrice / offer.originalPrice)) * 100);
                
                return (
                  <div key={index} className={styles.offerCard}>
                    <div className={styles.productImage}>
                      <img src={product?.image || 'https://via.placeholder.com/200'} alt={product?.name || 'Produto'} />
                      <div className={styles.discountBadge}>{discount}% OFF</div>
                    </div>
                    
                    <div className={styles.offerInfo}>
                      <h4>{product?.name || 'Produto não encontrado'}</h4>
                      
                      <div className={styles.priceInputs}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Preço Original</label>
                          <input
                            type="number"
                            step="0.01"
                            value={offer.originalPrice}
                            onChange={(e) => updateOffer(index, { originalPrice: parseFloat(e.target.value) })}
                            className={styles.input}
                          />
                        </div>
                        
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Preço Promocional</label>
                          <input
                            type="number"
                            step="0.01"
                            value={offer.salePrice}
                            onChange={(e) => updateOffer(index, { salePrice: parseFloat(e.target.value) })}
                            className={styles.input}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeOffer(index)}
                      className={styles.deleteBtn}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Modal de Seleção de Produto */}
      {showProductModal && (
        <div className={styles.modalOverlay} onClick={() => setShowProductModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Selecionar Produto</h3>
              <button onClick={() => setShowProductModal(false)} className={styles.closeBtn}>×</button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.productGrid}>
                {allProducts.map((product) => (
                  <div
                    key={product.id}
                    className={styles.productCard}
                    onClick={() => selectProduct(product.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.productImage}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={styles.productInfo}>
                      <h4>{product.name}</h4>
                      <p>R$ {product.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}