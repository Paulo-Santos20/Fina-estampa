import React, { useState } from 'react';
import { 
  FaPercent, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, 
  FaTag, FaTags, FaCalendarAlt, FaSave, FaTimes, 
  FaTicketAlt, FaSearch, FaFilter
} from 'react-icons/fa';
import { useProducts } from '../../../hooks/useProducts';
import { useToast } from '../../../components/ui/Toast'; // Assuming you have this
import styles from './PromotionsPage.module.css';

const PromotionsPage = () => {
  const { products, updateProduct } = useProducts();
  const { showSuccess, showError } = useToast();
  
  const [activeTab, setActiveTab] = useState('coupons');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Coupons (Ideally this should come from a usePromotions hook)
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
    code: '', description: '', type: 'percentage', value: '',
    minValue: '', maxUses: '', expiresAt: '', isActive: true
  });

  // Filter Products for Tags Tab
  const filteredProducts = products.filter(p => 
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        code: item.code, description: item.description, type: item.type,
        value: item.value.toString(),
        minValue: item.minValue?.toString() || '',
        maxUses: item.maxUses?.toString() || '',
        expiresAt: item.expiresAt,
        isActive: item.isActive
      });
    } else {
      setEditingItem(null);
      setFormData({
        code: '', description: '', type: 'percentage', value: '',
        minValue: '', maxUses: '', expiresAt: '', isActive: true
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
      showError('Preencha os campos obrigatórios');
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
        setCoupons(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...couponData } : c));
        showSuccess('Cupom atualizado!');
      } else {
        const newCoupon = { id: `coupon-${Date.now()}`, ...couponData, usedCount: 0, createdAt: new Date().toISOString() };
        setCoupons(prev => [...prev, newCoupon]);
        showSuccess('Cupom criado!');
      }
      closeModal();
    } catch (err) {
      console.error(err);
      showError('Erro ao salvar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCoupon = (id, code) => {
    if (window.confirm(`Excluir cupom "${code}"?`)) {
      setCoupons(prev => prev.filter(c => c.id !== id));
      showSuccess('Cupom excluído.');
    }
  };

  const handleToggleCouponStatus = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleToggleProductTag = (productId, tag) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Simulate tag logic based on existing fields
    const updateData = { 
      isNew: tag === 'novo' ? !product.isNew : product.isNew,
      isPromo: tag === 'desconto' ? !product.isPromo : product.isPromo
    };

    updateProduct(productId, updateData);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
  const getUsagePercentage = (used, max) => !max ? 0 : Math.min((used / max) * 100, 100);

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Gerenciar Promoções</h2>
          <p className={styles.pageSubtitle}>Crie cupons e gerencie tags promocionais.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsWrapper}>
        <button 
          onClick={() => setActiveTab('coupons')} 
          className={`${styles.tabBtn} ${activeTab === 'coupons' ? styles.activeTab : ''}`}
        >
          <FaTicketAlt /> Cupons
        </button>
        <button 
          onClick={() => setActiveTab('tags')} 
          className={`${styles.tabBtn} ${activeTab === 'tags' ? styles.activeTab : ''}`}
        >
          <FaTags /> Tags de Produto
        </button>
      </div>

      {/* --- ABA DE CUPONS --- */}
      {activeTab === 'coupons' && (
        <div className={styles.tabContent}>
          <div className={styles.tabHeader}>
            <h3>Cupons Ativos ({coupons.length})</h3>
            <button onClick={() => openModal()} className={styles.primaryBtn}>
              <FaPlus /> Novo Cupom
            </button>
          </div>

          <div className={styles.couponsGrid}>
            {coupons.map((coupon) => (
              <div key={coupon.id} className={`${styles.couponCard} ${!coupon.isActive ? styles.inactiveCard : ''}`}>
                <div className={styles.couponTop}>
                  <div className={styles.codeBadge}>{coupon.code}</div>
                  <div className={`${styles.statusBadge} ${coupon.isActive ? styles.statusActive : styles.statusInactive}`}>
                    {coupon.isActive ? 'Ativo' : 'Inativo'}
                  </div>
                </div>

                <div className={styles.couponBody}>
                  <div className={styles.discountValue}>
                    {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `R$ ${coupon.value} OFF`}
                  </div>
                  <p className={styles.couponDesc}>{coupon.description}</p>
                  
                  {coupon.minValue > 0 && (
                    <div className={styles.condition}>Mínimo: {formatCurrency(coupon.minValue)}</div>
                  )}

                  {coupon.maxUses && (
                    <div className={styles.usageContainer}>
                      <div className={styles.usageLabels}>
                        <span>Uso: {coupon.usedCount}/{coupon.maxUses}</span>
                        <span>{getUsagePercentage(coupon.usedCount, coupon.maxUses).toFixed(0)}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${getUsagePercentage(coupon.usedCount, coupon.maxUses)}%` }} />
                      </div>
                    </div>
                  )}

                  <div className={styles.expiry}>
                    <FaCalendarAlt /> Expira em: {formatDate(coupon.expiresAt)}
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button 
                    onClick={() => handleToggleCouponStatus(coupon.id)} 
                    className={styles.iconBtn}
                    title={coupon.isActive ? 'Desativar' : 'Ativar'}
                  >
                    {coupon.isActive ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button onClick={() => openModal(coupon)} className={styles.iconBtn} title="Editar">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteCoupon(coupon.id, coupon.code)} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Excluir">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ABA DE TAGS --- */}
      {activeTab === 'tags' && (
        <div className={styles.tabContent}>
          <div className={styles.tabHeader}>
            <h3>Tags dos Produtos</h3>
            <div className={styles.searchBox}>
              <FaSearch />
              <input 
                type="text" 
                placeholder="Buscar produto..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productTagCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} onError={(e) => e.target.style.display='none'} />
                </div>
                
                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{product.name}</h4>
                  <span className={styles.productPrice}>{formatCurrency(product.price)}</span>
                </div>

                <div className={styles.tagControls}>
                  <label className={`${styles.tagOption} ${product.isNew ? styles.tagActive : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={product.isNew || false} 
                      onChange={() => handleToggleProductTag(product.id, 'novo')}
                    />
                    <FaTag /> Novo
                  </label>
                  
                  <label className={`${styles.tagOption} ${product.isPromo ? styles.tagActive : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={product.isPromo || false} 
                      onChange={() => handleToggleProductTag(product.id, 'desconto')}
                    />
                    <FaPercent /> Promoção
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODAL DE CUPOM --- */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingItem ? 'Editar Cupom' : 'Novo Cupom'}</h3>
              <button onClick={closeModal}><FaTimes /></button>
            </div>
            
            <form onSubmit={handleSubmitCoupon} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Código do Cupom *</label>
                <input 
                  type="text" 
                  name="code" 
                  value={formData.code} 
                  onChange={handleInputChange} 
                  placeholder="EX: VERAO2025" 
                  style={{ textTransform: 'uppercase' }}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Descrição</label>
                <input 
                  type="text" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Ex: 10% off na primeira compra" 
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Tipo</label>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Valor *</label>
                  <input type="number" name="value" value={formData.value} onChange={handleInputChange} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Valor Mín. Pedido</label>
                  <input type="number" name="minValue" value={formData.minValue} onChange={handleInputChange} placeholder="0.00" />
                </div>
                <div className={styles.formGroup}>
                  <label>Limite de Usos</label>
                  <input type="number" name="maxUses" value={formData.maxUses} onChange={handleInputChange} placeholder="Ilimitado" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Data de Expiração</label>
                <input type="date" name="expiresAt" value={formData.expiresAt} onChange={handleInputChange} required />
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
                  <span>Cupom Ativo</span>
                </label>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
                  <FaSave /> Salvar
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