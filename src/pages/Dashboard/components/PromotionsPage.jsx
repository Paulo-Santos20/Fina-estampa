import React, { useState } from 'react';
import { FaTag, FaPlus, FaEdit, FaTrash, FaPercent, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import styles from './PromotionsPage.module.css';

const PromotionsPage = () => {
  const [promotions] = useState([
    {
      id: 1,
      title: 'Black Friday 2024',
      description: 'Desconto especial para Black Friday',
      discount: 30,
      type: 'percentage',
      startDate: '2024-11-25',
      endDate: '2024-11-30',
      status: 'active',
      usageCount: 45
    },
    {
      id: 2,
      title: 'Frete Grátis Dezembro',
      description: 'Frete grátis em compras acima de R\$ 150',
      discount: 0,
      type: 'shipping',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'active',
      usageCount: 23
    }
  ]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaTag />
            Promoções e Cupons
          </h2>
          <p className={styles.pageSubtitle}>
            Gerencie promoções e cupons de desconto
          </p>
        </div>
        
        <button className={styles.primaryBtn}>
          <FaPlus /> Nova Promoção
        </button>
      </div>

      <div className={styles.promotionsGrid}>
        {promotions.map((promo) => (
          <div key={promo.id} className={styles.promoCard}>
            <div className={styles.promoHeader}>
              <h3 className={styles.promoTitle}>{promo.title}</h3>
              <span className={`${styles.promoStatus} ${styles[promo.status]}`}>
                {promo.status === 'active' ? 'Ativa' : 'Inativa'}
              </span>
            </div>
            
            <p className={styles.promoDescription}>{promo.description}</p>
            
            <div className={styles.promoDetails}>
              <div className={styles.promoStat}>
                <FaPercent />
                <span>{promo.discount}% OFF</span>
              </div>
              <div className={styles.promoStat}>
                <FaCalendarAlt />
                <span>{promo.startDate} - {promo.endDate}</span>
              </div>
              <div className={styles.promoStat}>
                <FaUsers />
                <span>{promo.usageCount} usos</span>
              </div>
            </div>

            <div className={styles.promoActions}>
              <button className={styles.editBtn}>
                <FaEdit /> Editar
              </button>
              <button className={styles.deleteBtn}>
                <FaTrash /> Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsPage;