import React from 'react';
import { FaUsers, FaUserPlus, FaSearch } from 'react-icons/fa';
import styles from '../Dashboard.module.css';

const CustomersPage = ({ user, timeRange }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FaUsers className={styles.sectionIcon} />
          Gerenciar Clientes
        </h2>
        <button className={styles.viewAllButton}>
          <FaUserPlus /> Novo Cliente
        </button>
      </div>
      
      <div className={styles.chartPlaceholder}>
        <FaUsers className={styles.chartIcon} />
        <p>Página de Clientes</p>
        <small>Implementação em desenvolvimento</small>
      </div>
    </section>
  );
};

export default CustomersPage;