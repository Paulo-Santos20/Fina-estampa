import React from 'react';
import { FaCreditCard, FaMoneyBillWave, FaBarcode, FaMobile } from 'react-icons/fa';
import styles from './PaymentMethods.module.css';

const PaymentMethods = ({ selectedMethod, installments, onUpdate, total }) => {
  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      icon: FaMobile,
      description: 'Aprovação imediata',
      discount: 5,
      installments: false,
      popular: true
    },
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      icon: FaCreditCard,
      description: 'Até 12x sem juros',
      discount: 0,
      installments: true,
      popular: false
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      icon: FaCreditCard,
      description: 'Débito à vista',
      discount: 0,
      installments: false,
      popular: false
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      icon: FaBarcode,
      description: 'Vencimento em 3 dias úteis',
      discount: 0,
      installments: false,
      popular: false
    }
  ];

  const handleMethodSelect = (methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    onUpdate({
      method: methodId,
      installments: method.installments ? installments : 1
    });
  };

  const handleInstallmentsChange = (value) => {
    onUpdate({ installments: parseInt(value) });
  };

  const calculateInstallmentValue = (installmentCount) => {
    return (total / installmentCount).toFixed(2);
  };

  const getDiscountedTotal = (discount) => {
    return (total * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className={styles.paymentContainer}>
      <h2 className={styles.paymentTitle}>Forma de Pagamento</h2>
      
      <div className={styles.paymentMethods}>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`${styles.paymentMethod} ${
              selectedMethod === method.id ? styles.selected : ''
            }`}
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className={styles.methodHeader}>
              <div className={styles.methodIcon}>
                <method.icon />
              </div>
              
              <div className={styles.methodInfo}>
                <div className={styles.methodName}>
                  {method.name}
                  {method.popular && (
                    <span className={styles.popularBadge}>Mais usado</span>
                  )}
                </div>
                <div className={styles.methodDescription}>
                  {method.description}
                </div>
              </div>

              <div className={styles.methodRadio}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedMethod === method.id}
                  onChange={() => handleMethodSelect(method.id)}
                  className={styles.radioInput}
                />
              </div>
            </div>

            {/* Detalhes do método selecionado */}
            {selectedMethod === method.id && (
              <div className={styles.methodDetails}>
                {method.discount > 0 && (
                  <div className={styles.discountInfo}>
                    <span className={styles.discountBadge}>
                      {method.discount}% de desconto
                    </span>
                    <div className={styles.discountCalculation}>
                      <span className={styles.originalPrice}>
                        De: R$ {total.toFixed(2)}
                      </span>
                      <span className={styles.discountedPrice}>
                        Por: R$ {getDiscountedTotal(method.discount)}
                      </span>
                    </div>
                  </div>
                )}

                {method.installments && (
                  <div className={styles.installmentsSection}>
                    <label className={styles.installmentsLabel}>
                      Parcelas:
                    </label>
                    <select
                      value={installments}
                      onChange={(e) => handleInstallmentsChange(e.target.value)}
                      className={styles.installmentsSelect}
                    >
                      {[...Array(12)].map((_, index) => {
                        const installmentCount = index + 1;
                        const installmentValue = calculateInstallmentValue(installmentCount);
                        return (
                          <option key={installmentCount} value={installmentCount}>
                            {installmentCount}x de R$ {installmentValue}
                            {installmentCount === 1 ? ' à vista' : ' sem juros'}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                {method.id === 'pix' && (
                  <div className={styles.pixInfo}>
                    <div className={styles.pixSteps}>
                      <h4>Como pagar com PIX:</h4>
                      <ol>
                        <li>Finalize seu pedido</li>
                        <li>Você receberá o código PIX no WhatsApp</li>
                        <li>Pague usando seu banco ou carteira digital</li>
                        <li>Pronto! Seu pedido será confirmado automaticamente</li>
                      </ol>
                    </div>
                  </div>
                )}

                {method.id === 'boleto' && (
                  <div className={styles.boletoInfo}>
                    <div className={styles.boletoWarning}>
                      ⚠️ O boleto vence em 3 dias úteis. Após o vencimento, 
                      será necessário gerar um novo pedido.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumo do pagamento */}
      {selectedMethod && (
        <div className={styles.paymentSummary}>
          <h3 className={styles.summaryTitle}>Resumo do Pagamento</h3>
          
          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Método escolhido:</span>
              <span className={styles.summaryValue}>
                {paymentMethods.find(m => m.id === selectedMethod)?.name}
              </span>
            </div>

            {selectedMethod === 'credit' && installments > 1 && (
              <div className={styles.summaryRow}>
                <span>Parcelas:</span>
                <span className={styles.summaryValue}>
                  {installments}x de R$ {calculateInstallmentValue(installments)}
                </span>
              </div>
            )}

            {selectedMethod === 'pix' && (
              <div className={styles.summaryRow}>
                <span>Desconto PIX:</span>
                <span className={styles.summaryDiscount}>
                  - R$ {(total * 0.05).toFixed(2)}
                </span>
              </div>
            )}

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total a pagar:</span>
              <span className={styles.totalValue}>
                R$ {selectedMethod === 'pix' ? getDiscountedTotal(5) : total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;