import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaTimes,
  FaExclamationTriangle
} from 'react-icons/fa';
import styles from './Toast.module.css';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Mostrar toast
    setIsVisible(true);

    // Auto-close timer
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      default:
        return <FaInfoCircle />;
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`
        ${styles.toast} 
        ${styles[type]} 
        ${styles[position]}
        ${isLeaving ? styles.leaving : styles.entering}
      `}
    >
      <div className={styles.toastIcon}>
        {getIcon()}
      </div>
      
      <div className={styles.toastContent}>
        <span className={styles.toastMessage}>{message}</span>
      </div>
      
      <button 
        onClick={handleClose}
        className={styles.toastClose}
        aria-label="Fechar notificação"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;