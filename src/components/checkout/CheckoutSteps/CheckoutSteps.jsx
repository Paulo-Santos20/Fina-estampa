import React from 'react';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaCheck } from 'react-icons/fa';
import styles from './CheckoutSteps.module.css';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    {
      number: 1,
      title: 'Dados Pessoais',
      icon: FaUser,
      description: 'Informações básicas'
    },
    {
      number: 2,
      title: 'Endereço',
      icon: FaMapMarkerAlt,
      description: 'Local de entrega'
    },
    {
      number: 3,
      title: 'Pagamento',
      icon: FaCreditCard,
      description: 'Forma de pagamento'
    },
    {
      number: 4,
      title: 'Revisão',
      icon: FaCheck,
      description: 'Confirmar pedido'
    }
  ];

  return (
    <div className={styles.stepsContainer}>
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <div key={step.number} className={styles.stepItem}>
            {/* Linha conectora */}
            {index > 0 && (
              <div 
                className={`${styles.stepLine} ${
                  currentStep > step.number - 1 ? styles.completed : ''
                }`}
              />
            )}
            
            {/* Círculo do step */}
            <div 
              className={`${styles.stepCircle} ${
                currentStep === step.number ? styles.active :
                currentStep > step.number ? styles.completed : ''
              }`}
            >
              <step.icon className={styles.stepIcon} />
            </div>
            
            {/* Informações do step */}
            <div className={styles.stepInfo}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;