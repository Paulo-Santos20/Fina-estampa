import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import CheckoutSteps from '../../components/checkout/CheckoutSteps/CheckoutSteps';
import CheckoutForm from '../../components/checkout/CheckoutForm/CheckoutForm';
import OrderSummary from '../../components/checkout/OrderSummary/OrderSummary';
import PaymentMethods from '../../components/checkout/PaymentMethods/PaymentMethods';
import { useCart } from '../../contexts/CartContext';
import { generateWhatsAppMessage } from '../../services/whatsapp';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  // Estados do checkout
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    customer: {
      name: '',
      email: '',
      phone: '',
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
      navigate('/carrinho');
    }
  }, [cartItems, navigate]);

  // Calcular totais
  const subtotal = cartTotal;
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

      // Limpar carrinho
      clearCart();

      // Redirecionar para página de sucesso
      navigate('/pedido-enviado', { 
        state: { orderDetails } 
      });

    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.checkoutPage}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.checkoutHeader}>
            <h1 className={styles.pageTitle}>Finalizar Pedido</h1>
            <CheckoutSteps currentStep={currentStep} />
          </div>

          {/* Conteúdo Principal */}
          <div className={styles.checkoutContent}>
            {/* Formulário */}
            <div className={styles.checkoutForm}>
              {currentStep === 1 && (
                <CheckoutForm
                  title="Dados Pessoais"
                  data={orderData.customer}
                  onUpdate={(data) => updateOrderData('customer', data)}
                  type="customer"
                />
              )}

              {currentStep === 2 && (
                <CheckoutForm
                  title="Endereço de Entrega"
                  data={orderData.address}
                  onUpdate={(data) => updateOrderData('address', data)}
                  type="address"
                />
              )}

              {currentStep === 3 && (
                <PaymentMethods
                  selectedMethod={orderData.payment.method}
                  installments={orderData.payment.installments}
                  onUpdate={(data) => updateOrderData('payment', data)}
                  total={total}
                />
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
                        <p>{orderData.payment.installments}x de R\$ {(total / orderData.payment.installments).toFixed(2)}</p>
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
                    Voltar
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className={styles.nextButton}
                    disabled={!validateCurrentStep() || isLoading}
                  >
                    Continuar
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
                      'Finalizar Pedido'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className={styles.orderSummaryContainer}>
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shippingCost}
                discount={discount}
                total={total}
                paymentMethod={orderData.payment.method}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Função auxiliar para nome do método de pagamento
const getPaymentMethodName = (method) => {
  const methods = {
    'pix': 'PIX',
    'credit': 'Cartão de Crédito',
    'debit': 'Cartão de Débito',
    'boleto': 'Boleto Bancário'
  };
  return methods[method] || method;
};

export default Checkout;