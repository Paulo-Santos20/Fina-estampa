import React from 'react';
import { FaTag, FaPlus } from 'react-icons/fa';
import styles from '../Dashboard.module.css';

const PromotionsPage = ({ user, timeRange }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FaTag className={styles.sectionIcon} />
          Promoções e Cupons
        </h2>
        <button className={styles.viewAllButton}>
          <FaPlus /> Nova Promoção
        </button>
      </div>
      
      <div className={styles.chartPlaceholder}>
        <FaTag className={styles.chartIcon} />
        <p>Gerenciar Promoções</p>
        <small>Implementação em desenvolvimento</small>
      </div>
    </section>
  );
};

export default PromotionsPage;