import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout.jsx';
import { useCart } from '../../contexts/CartContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  // Estados do checkout
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
      method: '',
      installments: 1
    },
    shipping: {
      method: 'standard',
      cost: 15.90
    }
  });

  // Verificar se há itens no carrinho
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Verificar se está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Calcular totais
  const subtotal = getCartTotal();
  const shippingCost = subtotal >= 199.90 ? 0 : orderData.shipping.cost;
  const discount = orderData.payment.method === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal + shippingCost - discount;

  // Atualizar dados do pedido
  const updateOrderData = (section, data) => {
    setOrderData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Validar etapa atual
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return orderData.customer.name && 
               orderData.customer.email && 
               orderData.customer.phone;
      case 2:
        return orderData.address.cep && 
               orderData.address.street && 
               orderData.address.number &&
               orderData.address.city &&
               orderData.address.state;
      case 3:
        return orderData.payment.method;
      default:
        return false;
    }
  };

  // Próxima etapa
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Etapa anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Gerar mensagem do WhatsApp
  const generateWhatsAppMessage = (orderDetails) => {
    let message = `🛍️ *NOVO PEDIDO - FINA ESTAMPA*\n\n`;
    
    message += `👤 *Cliente:* ${orderDetails.customer.name}\n`;
    message += `�� *Telefone:* ${orderDetails.customer.phone}\n`;
    message += `📧 *Email:* ${orderDetails.customer.email}\n\n`;
    
    message += `📍 *Endereço de Entrega:*\n`;
    message += `${orderDetails.address.street}, ${orderDetails.address.number}`;
    if (orderDetails.address.complement) {
      message += `, ${orderDetails.address.complement}`;
    }
    message += `\n${orderDetails.address.neighborhood} - ${orderDetails.address.city}/${orderDetails.address.state}\n`;
    message += `CEP: ${orderDetails.address.cep}\n\n`;
    
    message += `🛒 *PRODUTOS:*\n`;
    orderDetails.items.forEach(item => {
      message += `• ${item.name}`;
      if (item.size) message += ` - Tam: ${item.size}`;
      if (item.color) message += ` - Cor: ${item.color}`;
      message += ` - Qtd: ${item.quantity} - R\$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    message += `\n💰 *RESUMO:*\n`;
    message += `Subtotal: R\$ ${orderDetails.totals.subtotal.toFixed(2).replace('.', ',')}\n`;
    message += `Frete: R\$ ${orderDetails.totals.shipping.toFixed(2).replace('.', ',')}\n`;
    if (orderDetails.totals.discount > 0) {
      message += `Desconto PIX: -R\$ ${orderDetails.totals.discount.toFixed(2).replace('.', ',')}\n`;
    }
    message += `*TOTAL: R\$ ${orderDetails.totals.total.toFixed(2).replace('.', ',')}*\n\n`;
    
    message += `💳 *Pagamento:* ${getPaymentMethodName(orderDetails.payment.method)}\n`;
    if (orderDetails.payment.installments > 1) {
      message += `Parcelamento: ${orderDetails.payment.installments}x de R\$ ${(orderDetails.totals.total / orderDetails.payment.installments).toFixed(2).replace('.', ',')}\n`;
    }
    
    message += `\n🕐 *Data/Hora:* ${orderDetails.date}\n`;
    message += `🔗 *Pedido #:* ${orderDetails.id}`;
    
    return message;
  };

  // Finalizar pedido
  const finishOrder = async () => {
    if (!validateCurrentStep()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);

    try {
      // Gerar dados do pedido
      const orderDetails = {
        id: `FE${Date.now()}`,
        date: new Date().toLocaleString('pt-BR'),
        customer: orderData.customer,
        address: orderData.address,
        items: cartItems,
        payment: orderData.payment,
        shipping: orderData.shipping,
        totals: {
          subtotal,
          shipping: shippingCost,
          discount,
          total
        }
      };

      // Gerar mensagem do WhatsApp
      const whatsappMessage = generateWhatsAppMessage(orderDetails);
      
      // Abrir WhatsApp
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Salvar pedido no localStorage
      const savedOrders = JSON.parse(localStorage.getItem('finaEstampaOrders') || '[]');
      savedOrders.push(orderDetails);
      localStorage.setItem('finaEstampaOrders', JSON.stringify(savedOrders));

      // Limpar carrinho
      clearCart();

      // Mostrar sucesso e redirecionar
      alert('Pedido enviado com sucesso! Você será redirecionado para o WhatsApp.');
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função auxiliar para nome do método de pagamento
  const getPaymentMethodName = (method) => {
    const methods = {
      'pix': 'PIX (5% desconto)',
      'credit': 'Cartão de Crédito',
      'debit': 'Cartão de Débito',
      'boleto': 'Boleto Bancário'
    };
    return methods[method] || method;
  };

  if (cartItems.length === 0 || !isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.checkoutPage}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.checkoutHeader}>
            <h1 className={styles.pageTitle}>Finalizar Pedido</h1>
            
            {/* Steps */}
            <div className={styles.checkoutSteps}>
              <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
                <span className={styles.stepNumber}>1</span>
                <span className={styles.stepLabel}>Dados Pessoais</span>
              </div>
              <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
                <span className={styles.stepNumber}>2</span>
                <span className={styles.stepLabel}>Endereço</span>
              </div>
              <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
                <span className={styles.stepNumber}>3</span>
                <span className={styles.stepLabel}>Pagamento</span>
              </div>
              <div className={`${styles.step} ${currentStep >= 4 ? styles.active : ''}`}>
                <span className={styles.stepNumber}>4</span>
                <span className={styles.stepLabel}>Revisão</span>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className={styles.checkoutContent}>
            {/* Formulário */}
            <div className={styles.checkoutForm}>
              {currentStep === 1 && (
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>Dados Pessoais</h2>
                  
                  <div className={styles.inputGroup}>
                    <label>Nome completo *</label>
                    <input
                      type="text"
                      value={orderData.customer.name}
                      onChange={(e) => updateOrderData('customer', { name: e.target.value })}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label>Email *</label>
                      <input
                        type="email"
                        value={orderData.customer.email}
                        onChange={(e) => updateOrderData('customer', { email: e.target.value })}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Telefone *</label>
                      <input
                        type="tel"
                        value={orderData.customer.phone}
                        onChange={(e) => updateOrderData('customer', { phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>CPF</label>
                    <input
                      type="text"
                      value={orderData.customer.cpf}
                      onChange={(e) => updateOrderData('customer', { cpf: e.target.value })}
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>Endereço de Entrega</h2>
                  
                  <div className={styles.inputGroup}>
                    <label>CEP *</label>
                    <input
                      type="text"
                      value={orderData.address.cep}
                      onChange={(e) => updateOrderData('address', { cep: e.target.value })}
                      placeholder="00000-000"
                      required
                    />
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup} style={{ flex: 2 }}>
                      <label>Rua *</label>
                      <input
                        type="text"
                        value={orderData.address.street}
                        onChange={(e) => updateOrderData('address', { street: e.target.value })}
                        placeholder="Nome da rua"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Número *</label>
                      <input
                        type="text"
                        value={orderData.address.number}
                        onChange={(e) => updateOrderData('address', { number: e.target.value })}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Complemento</label>
                    <input
                      type="text"
                      value={orderData.address.complement}
                      onChange={(e) => updateOrderData('address', { complement: e.target.value })}
                      placeholder="Apartamento, bloco, etc."
                    />
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label>Bairro *</label>
                      <input
                        type="text"
                        value={orderData.address.neighborhood}
                        onChange={(e) => updateOrderData('address', { neighborhood: e.target.value })}
                        placeholder="Nome do bairro"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Cidade *</label>
                      <input
                        type="text"
                        value={orderData.address.city}
                        onChange={(e) => updateOrderData('address', { city: e.target.value })}
                        placeholder="Nome da cidade"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Estado *</label>
                      <select
                        value={orderData.address.state}
                        onChange={(e) => updateOrderData('address', { state: e.target.value })}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        <option value="MG">MG</option>
                        <option value="RS">RS</option>
                        <option value="PR">PR</option>
                        <option value="SC">SC</option>
                        {/* Adicionar outros estados conforme necessário */}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>Forma de Pagamento</h2>
                  
                  <div className={styles.paymentMethods}>
                    <div 
                      className={`${styles.paymentMethod} ${orderData.payment.method === 'pix' ? styles.selected : ''}`}
                      onClick={() => updateOrderData('payment', { method: 'pix', installments: 1 })}
                    >
                      <div className={styles.paymentIcon}>💳</div>
                      <div className={styles.paymentInfo}>
                        <h3>PIX</h3>
                        <p>5% de desconto • Aprovação imediata</p>
                        <span className={styles.paymentPrice}>R\$ {(total * 0.95).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>

                    <div 
                      className={`${styles.paymentMethod} ${orderData.payment.method === 'credit' ? styles.selected : ''}`}
                      onClick={() => updateOrderData('payment', { method: 'credit', installments: 1 })}
                    >
                      <div className={styles.paymentIcon}>💳</div>
                      <div className={styles.paymentInfo}>
                        <h3>Cartão de Crédito</h3>
                        <p>Parcelamento em até 12x</p>
                        <span className={styles.paymentPrice}>R\$ {total.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>

                    <div 
                      className={`${styles.paymentMethod} ${orderData.payment.method === 'debit' ? styles.selected : ''}`}
                      onClick={() => updateOrderData('payment', { method: 'debit', installments: 1 })}
                    >
                      <div className={styles.paymentIcon}>💳</div>
                      <div className={styles.paymentInfo}>
                        <h3>Cartão de Débito</h3>
                        <p>Aprovação imediata</p>
                        <span className={styles.paymentPrice}>R\$ {total.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>

                    <div 
                      className={`${styles.paymentMethod} ${orderData.payment.method === 'boleto' ? styles.selected : ''}`}
                      onClick={() => updateOrderData('payment', { method: 'boleto', installments: 1 })}
                    >
                      <div className={styles.paymentIcon}>📄</div>
                      <div className={styles.paymentInfo}>
                        <h3>Boleto Bancário</h3>
                        <p>Vencimento em 3 dias úteis</p>
                        <span className={styles.paymentPrice}>R\$ {total.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </div>

                  {orderData.payment.method === 'credit' && (
                    <div className={styles.installments}>
                      <label>Parcelamento:</label>
                      <select
                        value={orderData.payment.installments}
                        onChange={(e) => updateOrderData('payment', { installments: parseInt(e.target.value) })}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                          <option key={num} value={num}>
                            {num}x de R\$ {(total / num).toFixed(2).replace('.', ',')}
                            {num === 1 ? ' à vista' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className={styles.reviewOrder}>
                  <h2 className={styles.sectionTitle}>Revisar Pedido</h2>
                  
                  <div className={styles.reviewSection}>
                    <h3>Dados Pessoais</h3>
                    <div className={styles.reviewData}>
                      <p><strong>Nome:</strong> {orderData.customer.name}</p>
                      <p><strong>Email:</strong> {orderData.customer.email}</p>
                      <p><strong>Telefone:</strong> {orderData.customer.phone}</p>
                    </div>
                  </div>

                  <div className={styles.reviewSection}>
                    <h3>Endereço de Entrega</h3>
                    <div className={styles.reviewData}>
                      <p>
                        {orderData.address.street}, {orderData.address.number}
                        {orderData.address.complement && `, ${orderData.address.complement}`}
                      </p>
                      <p>{orderData.address.neighborhood} - {orderData.address.city}/{orderData.address.state}</p>
                      <p>CEP: {orderData.address.cep}</p>
                    </div>
                  </div>

                  <div className={styles.reviewSection}>
                    <h3>Forma de Pagamento</h3>
                    <div className={styles.reviewData}>
                      <p><strong>{getPaymentMethodName(orderData.payment.method)}</strong></p>
                      {orderData.payment.installments > 1 && (
                        <p>{orderData.payment.installments}x de R\$ {(total / orderData.payment.installments).toFixed(2).replace('.', ',')}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Botões de Navegação */}
              <div className={styles.navigationButtons}>
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className={styles.prevButton}
                    disabled={isLoading}
                  >
                    ← Voltar
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className={styles.nextButton}
                    disabled={!validateCurrentStep() || isLoading}
                  >
                    Continuar →
                  </button>
                ) : (
                  <button
                    onClick={finishOrder}
                    className={styles.finishButton}
                    disabled={!validateCurrentStep() || isLoading}
                  >
                    {isLoading ? (
                      <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        Processando...
                      </div>
                    ) : (
                      '📱 Finalizar via WhatsApp'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className={styles.orderSummaryContainer}>
              <div className={styles.orderSummary}>
                <h3>Resumo do Pedido</h3>
                
                <div className={styles.orderItems}>
                  {cartItems.map(item => (
                    <div key={item.id} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <span>👗</span>
                        )}
                      </div>
                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>
                        {item.size && <p>Tamanho: {item.size}</p>}
                        {item.color && <p>Cor: {item.color}</p>}
                        <p>Qtd: {item.quantity}</p>
                      </div>
                      <div className={styles.itemPrice}>
                        R\$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.orderTotals}>
                  <div className={styles.totalLine}>
                    <span>Subtotal:</span>
                    <span>R\$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className={styles.totalLine}>
                    <span>Frete:</span>
                    <span>{shippingCost === 0 ? 'Grátis' : `R\$ ${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className={styles.totalLine} style={{ color: '#059669' }}>
                      <span>Desconto PIX:</span>
                      <span>-R\$ {discount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className={styles.totalLine} style={{ fontWeight: 'bold', fontSize: '1.2rem', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
                    <span>Total:</span>
                    <span style={{ color: 'var(--wine-destaque)' }}>R\$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;