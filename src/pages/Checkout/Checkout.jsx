import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaMapMarkerAlt, FaCreditCard, FaLock, 
  FaArrowLeft, FaWhatsapp, FaTicketAlt, FaCheck, FaTimes 
} from 'react-icons/fa';
// Remova import Layout se estiver usando
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { calculateDistance, calculateShippingCost, getOriginCoords } from '../../utils/freightCalculator';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  // Cupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Frete (cost null indica que ainda não foi calculado)
  const [shippingInfo, setShippingInfo] = useState({
    cost: null, 
    distance: null,
    method: ''
  });

  const items = Array.isArray(cart) ? cart : [];

  const [orderData, setOrderData] = useState({
    customer: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      cpf: ''
    },
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    },
    payment: {
      method: 'pix',
      installments: 1
    }
  });

  // --- LÓGICA DE CEP E FRETE CORRIGIDA ---
  const handleCepChange = async (e) => {
    let cep = e.target.value.replace(/\D/g, '');
    
    // Atualiza input visual
    updateOrderData('address', 'cep', cep);

    // Reseta frete se apagar o CEP
    if (cep.length < 8) {
      setShippingInfo({ cost: null, distance: null, method: '' });
    }

    if (cep.length === 8) {
      setIsSearchingCep(true);
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        
        if (!response.ok) throw new Error('CEP não encontrado');
        
        const data = await response.json();
        
        // Atualiza campos de endereço
        setOrderData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            street: data.street || '',
            neighborhood: data.neighborhood || '',
            city: data.city || '',
            state: data.state || '',
            cep: cep
          }
        }));

        // --- CÁLCULO DE FRETE SEGURO ---
        let finalCost = 0;
        let finalDistance = null;
        let methodText = '';

        // Tenta calcular via coordenadas (preciso)
        if (data.location && data.location.coordinates && data.location.coordinates.latitude) {
          const { latitude, longitude } = data.location.coordinates;
          const origin = getOriginCoords();
          
          finalDistance = calculateDistance(
            origin.lat, origin.lng, 
            parseFloat(latitude), parseFloat(longitude)
          );
          
          // Se calculateDistance retornar número válido
          if (finalDistance !== null && !isNaN(finalDistance)) {
             finalCost = calculateShippingCost(finalDistance);
             methodText = `Entrega (${finalDistance.toFixed(1)}km)`;
          }
        }

        // Se falhou o cálculo por coordenadas (NaN ou null), usa fallback por Estado
        if (finalDistance === null || isNaN(finalDistance) || isNaN(finalCost)) {
          if (data.state === 'PE') {
            finalCost = 15.00; // Fixo para Pernambuco
            methodText = 'Entrega Local (PE)';
          } else {
            finalCost = 45.00; // Fixo para outros estados
            methodText = 'Entrega Interestadual';
          }
          finalDistance = null; // Não exibe km se for fallback
        }

        setShippingInfo({
          cost: finalCost,
          distance: finalDistance,
          method: methodText
        });

      } catch (error) {
        console.error("Erro CEP:", error);
        // Em caso de erro na API, permite digitar manual mas define um frete padrão
        setShippingInfo({ cost: 25.00, distance: null, method: 'Frete Fixo' });
      } finally {
        setIsSearchingCep(false);
      }
    }
  };

  // --- LÓGICA DE CUPONS ---
  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    setCouponError('');

    const validCoupons = {
      'FINA10': { type: 'percent', value: 0.10, min: 0 },
      'BEMVINDO': { type: 'fixed', value: 20.00, min: 100 },
      'FRETEZERO': { type: 'shipping', value: 0, min: 200 }
    };

    const coupon = validCoupons[code];

    if (!coupon) {
      setCouponError('Cupom inválido ou expirado.');
      setAppliedCoupon(null);
      return;
    }

    if (subtotal < coupon.min) {
      setCouponError(`Válido apenas para compras acima de R$ ${coupon.min},00`);
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon({ code, ...coupon });
    setCouponCode('');
  };

  // --- TOTAIS ---
  const getTotals = () => {
    // Se cost for null, considera 0 para conta mas controlamos a exibição no render
    let currentShipping = shippingInfo.cost !== null ? shippingInfo.cost : 0;
    let discountAmount = 0;

    // Frete Grátis por valor
    if (subtotal >= 299.90) {
      currentShipping = 0;
    }

    // Cupons
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discountAmount = subtotal * appliedCoupon.value;
      } else if (appliedCoupon.type === 'fixed') {
        discountAmount = appliedCoupon.value;
      } else if (appliedCoupon.type === 'shipping') {
        currentShipping = 0;
        discountAmount = 0; 
      }
    }

    // PIX
    const pixDiscount = orderData.payment.method === 'pix' ? (subtotal - discountAmount) * 0.05 : 0;

    return {
      subtotal,
      shipping: currentShipping,
      couponDiscount: discountAmount,
      pixDiscount,
      total: Math.max(0, subtotal + currentShipping - discountAmount - pixDiscount)
    };
  };

  const totals = getTotals();

  // --- HELPERS ---
  const updateOrderData = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const validateStep = (step) => {
    const { customer, address } = orderData;
    if (step === 1) return customer.name && customer.email && customer.phone;
    if (step === 2) return address.street && address.number && address.cep.length >= 8;
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
    else alert("Por favor, preencha os campos obrigatórios.");
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

 const handleFinishOrder = async () => {
    setIsLoading(true);
    
    // Simula tempo de processamento
    setTimeout(() => {
      // 1. Monta a lista de produtos
      let productsList = "";
      items.forEach(item => {
        const variantInfo = [];
        if (item.size) variantInfo.push(item.size);
        if (item.color) variantInfo.push(item.color);
        const variantStr = variantInfo.length > 0 ? `(${variantInfo.join('/')})` : '';
        
        // Ex: • 2x Vestido Florido (M/Vermelho)
        productsList += `▪️ ${item.qty}x ${item.title} ${variantStr}\n`;
      });

      // 2. Monta a mensagem final
      const msg = 
        `🛍️ *NOVO PEDIDO - FINA ESTAMPA*\n\n` +
        `👤 *Cliente:* ${orderData.customer.name}\n` +
        `📱 *Contato:* ${orderData.customer.phone}\n\n` +
        `🛒 *RESUMO DO PEDIDO:*\n` +
        `${productsList}\n` +
        `📍 *Entrega:* ${orderData.address.street}, ${orderData.address.number} - ${orderData.address.neighborhood}\n` +
        `🏙️ ${orderData.address.city}/${orderData.address.state}\n` +
        (shippingInfo.distance ? `🚚 Distância: ${shippingInfo.distance}km\n` : '') +
        `\n💰 *TOTAL: ${formatCurrency(totals.total)}*\n` +
        `💳 Pagamento: ${orderData.payment.method === 'pix' ? 'PIX' : 'Cartão de Crédito'}`;
        
      // 3. Limpa o carrinho e redireciona
      clearCart();
      window.open(`https://wa.me/5581999999999?text=${encodeURIComponent(msg)}`, '_blank');
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  if (items.length === 0) return <div>Carrinho Vazio</div>;

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.simpleHeader}>
        <div className={styles.headerContent}>
          <span className={styles.logoText}>Fina Estampa<span className={styles.dot}>.</span></span>
          <div className={styles.secureBadge}><FaLock /> Checkout Seguro</div>
        </div>
      </header>

      <div className={styles.checkoutContainer}>
        {/* Steps Header mantido igual... */}
        <div className={styles.stepsHeader}>
          <div className={`${styles.step} ${currentStep >= 1 ? styles.activeStep : ''}`}><span>1</span> Identificação</div>
          <div className={`${styles.stepLine} ${currentStep >= 2 ? styles.lineActive : ''}`} />
          <div className={`${styles.step} ${currentStep >= 2 ? styles.activeStep : ''}`}><span>2</span> Entrega</div>
          <div className={`${styles.stepLine} ${currentStep >= 3 ? styles.lineActive : ''}`} />
          <div className={`${styles.step} ${currentStep >= 3 ? styles.activeStep : ''}`}><span>3</span> Pagamento</div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            {/* ... Steps 1 e 3 mantidos iguais ... */}
            
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Dados Pessoais</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Nome</label>
                    <input type="text" value={orderData.customer.name} onChange={e => updateOrderData('customer', 'name', e.target.value)} />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input type="email" value={orderData.customer.email} onChange={e => updateOrderData('customer', 'email', e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Telefone</label>
                      <input type="tel" value={orderData.customer.phone} onChange={e => updateOrderData('customer', 'phone', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className={styles.footerButtons}>
                  <button className={styles.secondaryBtn} onClick={() => navigate('/cart')}>Voltar</button>
                  <button className={styles.primaryBtn} onClick={nextStep}>Próximo</button>
                </div>
              </div>
            )}

            {/* STEP 2 - COM CEP */}
            {currentStep === 2 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Endereço de Entrega</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>CEP {isSearchingCep && <span style={{fontSize:'0.8rem', color:'#722F37'}}>(Buscando...)</span>}</label>
                      <input 
                        type="text" 
                        value={orderData.address.cep} 
                        onChange={handleCepChange} 
                        placeholder="00000-000"
                        maxLength={9}
                      />
                    </div>
                    <div className={styles.formGroup} style={{flex: 2}}>
                      <label>Cidade</label>
                      <input type="text" value={orderData.address.city} readOnly style={{backgroundColor: '#f9fafb'}} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>UF</label>
                      <input type="text" value={orderData.address.state} readOnly style={{backgroundColor: '#f9fafb'}} />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup} style={{flex: 3}}>
                      <label>Rua</label>
                      <input type="text" value={orderData.address.street} onChange={e => updateOrderData('address', 'street', e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Número</label>
                      <input type="text" value={orderData.address.number} onChange={e => updateOrderData('address', 'number', e.target.value)} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Bairro</label>
                    <input type="text" value={orderData.address.neighborhood} onChange={e => updateOrderData('address', 'neighborhood', e.target.value)} />
                  </div>
                </div>
                <div className={styles.footerButtons}>
                  <button className={styles.secondaryBtn} onClick={prevStep}>Voltar</button>
                  <button className={styles.primaryBtn} onClick={nextStep}>Próximo</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Pagamento</h2>
                <div className={styles.paymentOptions}>
                  <div 
                    className={`${styles.paymentOption} ${orderData.payment.method === 'pix' ? styles.selected : ''}`}
                    onClick={() => updateOrderData('payment', 'method', 'pix')}
                  >
                    <div className={styles.radio}></div>
                    <div className={styles.paymentText}>
                      <strong>PIX</strong>
                      <span>5% de desconto extra</span>
                    </div>
                  </div>
                  <div 
                    className={`${styles.paymentOption} ${orderData.payment.method === 'credit' ? styles.selected : ''}`}
                    onClick={() => updateOrderData('payment', 'method', 'credit')}
                  >
                    <div className={styles.radio}></div>
                    <div className={styles.paymentText}>
                      <strong>Cartão de Crédito</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.footerButtons}>
                  <button className={styles.secondaryBtn} onClick={prevStep}>Voltar</button>
                  <button className={styles.finishBtn} onClick={handleFinishOrder} disabled={isLoading}>
                    {isLoading ? 'Processando...' : <>Finalizar Pedido <FaWhatsapp /></>}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.summaryCard}>
              <h3>Resumo do Pedido</h3>
              
              <div className={styles.itemsList}>
                {items.map((item, idx) => (
                  <div key={idx} className={styles.miniItem}>
                    <span>{item.qty}x {item.title}</span>
                    <span>{formatCurrency(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.couponSection}>
                <div className={styles.couponInputWrapper}>
                  <FaTicketAlt className={styles.couponIcon} />
                  <input 
                    type="text" 
                    placeholder="Cupom de desconto" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <button className={styles.removeCouponBtn} onClick={() => setAppliedCoupon(null)}>
                      <FaTimes />
                    </button>
                  ) : (
                    <button className={styles.applyCouponBtn} onClick={handleApplyCoupon}>
                      Aplicar
                    </button>
                  )}
                </div>
                {couponError && <p className={styles.couponError}>{couponError}</p>}
                {appliedCoupon && (
                  <p className={styles.couponSuccess}>
                    <FaCheck /> Cupom <strong>{appliedCoupon.code}</strong> aplicado!
                  </p>
                )}
              </div>

              <div className={styles.divider} />

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>
                
                {/* --- AQUI: Só mostra a linha de frete se o CEP foi digitado e calculado --- */}
                {shippingInfo.cost !== null && (
                  <div className={styles.totalRow}>
                    <span>
                      Frete {shippingInfo.distance ? `(${shippingInfo.distance}km)` : ''}
                    </span>
                    <span>
                      {totals.shipping === 0 ? 'Grátis' : formatCurrency(totals.shipping)}
                    </span>
                  </div>
                )}

                {totals.couponDiscount > 0 && (
                  <div className={`${styles.totalRow} ${styles.discountRow}`}>
                    <span>Cupom ({appliedCoupon.code})</span>
                    <span>-{formatCurrency(totals.couponDiscount)}</span>
                  </div>
                )}

                {totals.pixDiscount > 0 && (
                  <div className={`${styles.totalRow} ${styles.discountRow}`}>
                    <span>Desconto PIX (5%)</span>
                    <span>-{formatCurrency(totals.pixDiscount)}</span>
                  </div>
                )}

                <div className={`${styles.totalRow} ${styles.finalRow}`}>
                  <span>Total</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;