import React, { useState } from 'react';
import { 
  FaPercent, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaEyeSlash,
  FaTag,
  FaTags,
  FaCalendarAlt,
  FaSave,
  FaTimes,
  FaGift,
  FaTicketAlt
} from 'react-icons/fa';
import { useProducts } from '../../../hooks/useProducts';
import styles from './PromotionsPage.module.css';

const PromotionsPage = () => {
  const { products, updateProduct } = useProducts();
  
  const [activeTab, setActiveTab] = useState('coupons');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados para cupons
  const [coupons, setCoupons] = useState([
    {
      id: 'coupon-1',
      code: 'DESCONTO10',
      description: 'Desconto de 10% em toda loja',
      type: 'percentage',
      value: 10,
      minValue: 50,
      maxUses: 100,
      usedCount: 23,
      isActive: true,
      expiresAt: '2025-02-28',
      createdAt: '2025-01-01'
    },
    {
      id: 'coupon-2',
      code: 'FRETE15',
      description: 'R$ 15 de desconto no frete',
      type: 'fixed',
      value: 15,
      minValue: 100,
      maxUses: 50,
      usedCount: 8,
      isActive: true,
      expiresAt: '2025-03-15',
      createdAt: '2025-01-10'
    }
  ]);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage',
    value: '',
    minValue: '',
    maxUses: '',
    expiresAt: '',
    isActive: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openModal = (item = null, type = 'coupon') => {
    if (item) {
      setEditingItem({ ...item, type });
      if (type === 'coupon') {
        setFormData({
          code: item.code,
          description: item.description,
          type: item.type,
          value: item.value.toString(),
          minValue: item.minValue?.toString() || '',
          maxUses: item.maxUses?.toString() || '',
          expiresAt: item.expiresAt,
          isActive: item.isActive
        });
      }
    } else {
      setEditingItem(null);
      setFormData({
        code: '',
        description: '',
        type: 'percentage',
        value: '',
        minValue: '',
        maxUses: '',
        expiresAt: '',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setIsSubmitting(false);
  };

  const handleSubmitCoupon = async (e) => {
    e.preventDefault();
    
    if (!formData.code.trim() || !formData.value) {
      alert('❌ Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      const couponData = {
        ...formData,
        value: parseFloat(formData.value),
        minValue: parseFloat(formData.minValue) || 0,
        maxUses: parseInt(formData.maxUses) || null,
        code: formData.code.toUpperCase()
      };

      if (editingItem) {
        setCoupons(prev => prev.map(coupon => 
          coupon.id === editingItem.id 
            ? { ...coupon, ...couponData, updatedAt: new Date().toISOString() }
            : coupon
        ));
        alert('✅ Cupom atualizado com sucesso!');
      } else {
        const newCoupon = {
          id: `coupon-${Date.now()}`,
          ...couponData,
          usedCount: 0,
          createdAt: new Date().toISOString()
        };
        setCoupons(prev => [...prev, newCoupon]);
        alert('✅ Cupom criado com sucesso!');
      }
      
      closeModal();
    } catch (err) {
      console.error('Erro ao salvar cupom:', err);
      alert('❌ Erro ao salvar cupom');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCoupon = (couponId, couponCode) => {
    if (window.confirm(`⚠️ Tem certeza que deseja excluir o cupom "${couponCode}"?`)) {
      setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
      alert('✅ Cupom excluído com sucesso!');
    }
  };

  const handleToggleCouponStatus = (couponId) => {
    setCoupons(prev => prev.map(coupon => 
      coupon.id === couponId 
        ? { ...coupon, isActive: !coupon.isActive }
        : coupon
    ));
  };

  const handleToggleProductTag = (productId, tag) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const currentTags = product.tags || [];
    const hasTag = currentTags.includes(tag);
    
    const newTags = hasTag 
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];

    const updateData = { 
      tags: newTags,
      isNew: tag === 'novo' ? !hasTag : product.isNew,
      isOnSale: tag === 'desconto' ? !hasTag : product.isOnSale
    };

    updateProduct(productId, updateData);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getUsagePercentage = (used, max) => {
    if (!max) return 0;
    return Math.min((used / max) * 100, 100);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaPercent />
            Gerenciar Promoções
          </h2>
          <p className={styles.pageSubtitle}>
            Crie cupons de desconto e gerencie tags promocionais dos produtos
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`${styles.tab} ${activeTab === 'coupons' ? styles.activeTab : ''}`}
        >
          <FaTicketAlt /> Cupons de Desconto
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`${styles.tab} ${activeTab === 'tags' ? styles.activeTab : ''}`}
        >
          <FaTags /> Tags dos Produtos
        </button>
      </div>

      {/* Conteúdo das Abas */}
      {activeTab === 'coupons' && (
        <div className={styles.tabContent}>
          {/* Header dos Cupons */}
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              🎫 Cupons de Desconto ({coupons.length})
            </h3>
            <button 
              onClick={() => openModal()}
              className={styles.primaryBtn}
            >
              <FaPlus /> Novo Cupom
            </button>
          </div>

          {/* Lista de Cupons */}
          <div className={styles.couponsGrid}>
            {coupons.map((coupon) => (
              <div key={coupon.id} className={styles.couponCard}>
                <div className={styles.couponHeader}>
                  <div className={styles.couponCode}>{coupon.code}</div>
                  <div className={styles.couponActions}>
                    <button
                      onClick={() => handleToggleCouponStatus(coupon.id)}
                      className={`${styles.actionBtn} ${coupon.isActive ? styles.activeBtn : styles.inactiveBtn}`}
                      title={coupon.isActive ? 'Desativar cupom' : 'Ativar cupom'}
                    >
                      {coupon.isActive ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button
                      onClick={() => openModal(coupon, 'coupon')}
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      title="Editar cupom"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      title="Excluir cupom"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className={styles.couponContent}>
                  <p className={styles.couponDescription}>{coupon.description}</p>
                  
                  <div className={styles.couponDetails}>
                    <div className={styles.couponValue}>
                      {coupon.type === 'percentage' 
                        ? `${coupon.value}% de desconto`
                        : `${formatCurrency(coupon.value)} de desconto`
                      }
                    </div>
                    
                    {coupon.minValue > 0 && (
                      <div className={styles.couponCondition}>
                        Pedido mínimo: {formatCurrency(coupon.minValue)}
                      </div>
                    )}
                  </div>
                  
                  {coupon.maxUses && (
                    <div className={styles.couponUsage}>
                      <div className={styles.usageInfo}>
                        <span>Uso: {coupon.usedCount}/{coupon.maxUses}</span>
                        <span>{getUsagePercentage(coupon.usedCount, coupon.maxUses).toFixed(0)}%</span>
                      </div>
                      <div className={styles.usageBar}>
                        <div 
                          className={styles.usageProgress}
                          style={{ width: `${getUsagePercentage(coupon.usedCount, coupon.maxUses)}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.couponFooter}>
                    <div className={styles.couponExpiry}>
                      <FaCalendarAlt />
                      Expira em: {formatDate(coupon.expiresAt)}
                    </div>
                    <div className={`${styles.couponStatus} ${coupon.isActive ? styles.active : styles.inactive}`}>
                      {coupon.isActive ? 'Ativo' : 'Inativo'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {coupons.length === 0 && (
            <div className={styles.emptyState}>
              <FaTicketAlt className={styles.emptyIcon} />
              <h3>Nenhum cupom criado</h3>
              <p>Comece criando seu primeiro cupom de desconto</p>
              <button 
                onClick={() => openModal()}
                className={styles.primaryBtn}
              >
                <FaPlus /> Criar Primeiro Cupom
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'tags' && (
        <div className={styles.tabContent}>
          {/* Header das Tags */}
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              🏷️ Tags dos Produtos ({products.length})
            </h3>
            <p className={styles.sectionSubtitle}>
              Gerencie as tags "Novo" e "Desconto" dos seus produtos
            </p>
          </div>

          {/* Lista de Produtos */}
          <div className={styles.productsTagsGrid}>
            {products.map((product) => (
                         <div key={product.id} className={styles.productTagCard}>
                <div className={styles.productTagImage}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMCIgZmlsbD0iIzcyMkYzNyI+8J+RlzwvdGV4dD4KPC9zdmc+';
                    }}
                  />
                </div>
                
                <div className={styles.productTagInfo}>
                  <h4 className={styles.productTagName}>{product.name}</h4>
                  <p className={styles.productTagCategory}>{product.category}</p>
                  <p className={styles.productTagPrice}>{formatCurrency(product.price)}</p>
                </div>
                
                <div className={styles.productTagControls}>
                  <div className={styles.tagControl}>
                    <label className={styles.tagLabel}>
                      <input
                        type="checkbox"
                        checked={product.tags?.includes('novo') || product.isNew}
                        onChange={() => handleToggleProductTag(product.id, 'novo')}
                        className={styles.tagCheckbox}
                      />
                      <span className={styles.tagText}>
                        <FaTag className={styles.tagIcon} />
                        Novo
                      </span>
                    </label>
                  </div>
                  
                  <div className={styles.tagControl}>
                    <label className={styles.tagLabel}>
                      <input
                        type="checkbox"
                        checked={product.tags?.includes('desconto') || product.isOnSale}
                        onChange={() => handleToggleProductTag(product.id, 'desconto')}
                        className={styles.tagCheckbox}
                      />
                      <span className={styles.tagText}>
                        <FaPercent className={styles.tagIcon} />
                        Desconto
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className={styles.productTagStatus}>
                  {(product.tags?.includes('novo') || product.isNew) && (
                    <span className={styles.activeTag}>Novo</span>
                  )}
                  {(product.tags?.includes('desconto') || product.isOnSale) && (
                    <span className={styles.saleTag}>Desconto</span>
                  )}
                  {(!product.tags?.length && !product.isNew && !product.isOnSale) && (
                    <span className={styles.noTags}>Sem tags</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className={styles.emptyState}>
              <FaTags className={styles.emptyIcon} />
              <h3>Nenhum produto encontrado</h3>
              <p>Adicione produtos para gerenciar suas tags promocionais</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de Cupom */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingItem ? '✏️ Editar Cupom' : '🎫 Novo Cupom'}
              </h3>
              <button
                onClick={closeModal}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitCoupon} className={styles.modalForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Código do Cupom *</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="Ex: DESCONTO10"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <small className={styles.formHint}>
                    Use apenas letras e números, sem espaços
                  </small>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Descrição *</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="Ex: Desconto de 10% em toda loja"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tipo de Desconto *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className={styles.formSelect}
                    >
                      <option value="percentage">Porcentagem (%)</option>
                      <option value="fixed">Valor Fixo (R$)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Valor do Desconto * {formData.type === 'percentage' ? '(%)' : '(R$)'}
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      step={formData.type === 'percentage' ? '1' : '0.01'}
                      min="0"
                      max={formData.type === 'percentage' ? '100' : undefined}
                      required
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder={formData.type === 'percentage' ? '10' : '15.00'}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Valor Mínimo do Pedido (R$)</label>
                    <input
                      type="number"
                      name="minValue"
                      value={formData.minValue}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="0.00"
                    />
                    <small className={styles.formHint}>
                      Deixe vazio para não ter valor mínimo
                    </small>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Limite de Usos</label>
                    <input
                      type="number"
                      name="maxUses"
                      value={formData.maxUses}
                      onChange={handleInputChange}
                      min="1"
                      disabled={isSubmitting}
                      className={styles.formInput}
                      placeholder="100"
                    />
                    <small className={styles.formHint}>
                      Deixe vazio para uso ilimitado
                    </small>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Data de Expiração *</label>
                  <input
                    type="date"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className={styles.formInput}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.optionLabel}>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={styles.checkbox}
                    />
                    <span>✅ Cupom Ativo</span>
                  </label>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className={styles.cancelBtn}
                >
                  ❌ Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  <FaSave /> {isSubmitting ? 'Salvando...' : (editingItem ? 'Atualizar' : 'Salvar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsPage;